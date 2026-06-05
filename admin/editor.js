import { DATASETS } from './editorConfig.js';
import {
	formatTextareaValue,
	getValue,
	normalizeCareerToEntries,
	normalizeObjectToEntries,
	parseGalleryLine,
	setValue,
	validateEntries
} from './editorUtils.js';

const state = {
	language: 'ja',
	dataset: 'projects',
	data: {},
	entries: [],
	selectedId: null,
	originalTimeline: []
};

const elements = {
	language: document.getElementById('language-select'),
	dataset: document.getElementById('dataset-select'),
	load: document.getElementById('load-button'),
	file: document.getElementById('file-input'),
	download: document.getElementById('download-button'),
	add: document.getElementById('add-button'),
	delete: document.getElementById('delete-button'),
	status: document.getElementById('status-message'),
	validation: document.getElementById('validation-list'),
	list: document.getElementById('entry-list'),
	form: document.getElementById('editor-form'),
	formTitle: document.getElementById('form-title')
};

function loadEntriesFromData() {
	state.originalTimeline = state.dataset === 'career' && Array.isArray(state.data.timeline)
		? state.data.timeline
		: [];
	state.entries = state.dataset === 'career'
		? normalizeCareerToEntries(state.data)
		: normalizeObjectToEntries(state.data);
	state.selectedId = state.entries[0]?.id || null;
}

function writeEntriesToData() {
	if (state.dataset === 'career') {
		const editedEntries = new Map(state.entries.map(entry => [entry.id, entry]));
		const originalIds = new Set(state.originalTimeline.map(entry => entry.id));
		const timeline = state.originalTimeline.flatMap(entry => {
			if (entry.isGroup) return [entry];
			return editedEntries.has(entry.id) ? [editedEntries.get(entry.id)] : [];
		});

		state.entries.forEach(entry => {
			if (!originalIds.has(entry.id)) timeline.push(entry);
		});

		state.data.timeline = timeline;
		state.data.stats = state.data.stats || {};
		state.data.certifications = state.data.certifications || [];
		return;
	}

	state.data = state.entries.reduce((result, entry) => {
		const { id, ...payload } = entry;
		result[id] = payload;
		return result;
	}, {});
}

async function loadDataset() {
	state.language = elements.language.value;
	state.dataset = elements.dataset.value;
	const config = DATASETS[state.dataset];

	try {
		const response = await fetch(config.path(state.language), { cache: 'no-store' });
		if (!response.ok) {
			throw new Error(`Failed to load data: ${response.status}`);
		}
		state.data = await response.json();
		loadEntriesFromData();
		render();
		setStatus('データを読み込みました。');
	} catch (error) {
		setStatus('データの読み込みに失敗しました。ローカルサーバー経由で開いてください。');
		console.error('Failed to load editor data:', error);
	}
}

function render() {
	renderEntryList();
	renderForm();
	renderValidation();
}

function renderEntryList() {
	const config = DATASETS[state.dataset];
	elements.list.innerHTML = '';

	state.entries.forEach(entry => {
		const button = document.createElement('button');
		button.type = 'button';
		button.className = `entry-button${entry.id === state.selectedId ? ' active' : ''}`;
		button.textContent = config.entryLabel(entry);
		button.addEventListener('click', () => {
			state.selectedId = entry.id;
			render();
		});
		elements.list.appendChild(button);
	});
}

function renderForm() {
	const config = DATASETS[state.dataset];
	const entry = state.entries.find(item => item.id === state.selectedId);
	elements.form.innerHTML = '';
	elements.formTitle.textContent = entry ? config.entryLabel(entry) : '編集フォーム';
	elements.delete.disabled = !entry;

	if (!entry) {
		elements.form.innerHTML = '<p class="help-text">編集する項目を追加してください。</p>';
		return;
	}

	config.fields.forEach(field => {
		const wrapper = document.createElement('div');
		wrapper.className = `field ${field.type === 'textarea' || field.type === 'list' ? 'full' : ''}`;
		if (field.type === 'checkbox') wrapper.classList.add('checkbox-field');

		const input = createInput(field, getValue(entry, field.name));
		input.addEventListener('input', () => updateEntryValue(entry, field, input));
		input.addEventListener('change', () => updateEntryValue(entry, field, input));

		if (field.type === 'checkbox') {
			const label = document.createElement('label');
			label.appendChild(input);
			label.append(` ${field.label}`);
			wrapper.appendChild(label);
		} else {
			const label = document.createElement('label');
			label.textContent = field.label;
			wrapper.appendChild(label);
			wrapper.appendChild(input);
		}

		if (field.type === 'list' || field.type === 'gallery') {
			const help = document.createElement('p');
			help.className = 'help-text';
			help.textContent = field.type === 'gallery'
				? '1行につき type | src | alt | caption の順で入力します。'
				: '1行につき1項目として保存されます。';
			wrapper.appendChild(help);
		}

		elements.form.appendChild(wrapper);
	});
}


function createInput(field, value) {
	if (field.type === 'textarea' || field.type === 'list' || field.type === 'gallery') {
		const textarea = document.createElement('textarea');
		textarea.value = formatTextareaValue(field, value);
		textarea.required = Boolean(field.required);
		return textarea;
	}

	if (field.type === 'select') {
		const select = document.createElement('select');
		field.options.forEach(optionValue => {
			const option = document.createElement('option');
			option.value = optionValue;
			option.textContent = optionValue;
			select.appendChild(option);
		});
		select.value = value || field.options[0];
		return select;
	}

	const input = document.createElement('input');
	input.type = field.type === 'checkbox' ? 'checkbox' : field.type || 'text';
	input.required = Boolean(field.required);
	if (field.type === 'checkbox') {
		input.checked = Boolean(value);
	} else {
		input.value = value ?? '';
	}
	return input;
}


function updateEntryValue(entry, field, input) {
	const oldId = entry.id;
	let value = input.type === 'checkbox' ? input.checked : input.value;
	if (field.type === 'number') {
		value = value === '' ? null : Number(value);
	}
	if (field.type === 'list') {
		value = input.value.split('\n').map(item => item.trim()).filter(Boolean);
	}
	if (field.type === 'gallery') {
		value = input.value.split('\n').map(parseGalleryLine).filter(Boolean);
	}
	setValue(entry, field.name, value);
	if (field.name === 'id' && oldId === state.selectedId) {
		state.selectedId = entry.id;
	}
	writeEntriesToData();
	renderEntryList();
	renderValidation();
}

function addEntry() {
	const entry = DATASETS[state.dataset].create();
	state.entries.push(entry);
	state.selectedId = entry.id;
	writeEntriesToData();
	render();
	setStatus('項目を追加しました。');
}

function deleteEntry() {
	if (!state.selectedId) return;
	state.entries = state.entries.filter(entry => entry.id !== state.selectedId);
	state.selectedId = state.entries[0]?.id || null;
	writeEntriesToData();
	render();
	setStatus('項目を削除しました。');
}

function renderValidation() {
	const errors = validateEntries(state.entries, DATASETS[state.dataset]);
	elements.validation.innerHTML = '';
	if (errors.length === 0) {
		return;
	}
	const list = document.createElement('ul');
	list.className = 'validation-list';
	errors.forEach(error => {
		const item = document.createElement('li');
		item.textContent = error;
		list.appendChild(item);
	});
	elements.validation.appendChild(list);
}

function downloadData() {
	writeEntriesToData();
	const errors = validateEntries(state.entries, DATASETS[state.dataset]);
	if (errors.length > 0) {
		setStatus('未入力または重複があります。修正してから保存してください。');
		renderValidation();
		return;
	}

	const blob = new Blob([`${JSON.stringify(state.data, null, 2)}\n`], { type: 'application/json' });
	const url = URL.createObjectURL(blob);
	const link = document.createElement('a');
	link.href = url;
	link.download = `${state.dataset}.json`;
	link.click();
	URL.revokeObjectURL(url);
	setStatus('JSONを書き出しました。対象ファイルに反映してください。');
}

async function importFile(event) {
	const file = event.target.files[0];
	if (!file) return;

	try {
		state.data = JSON.parse(await file.text());
		loadEntriesFromData();
		render();
		setStatus('JSONファイルを読み込みました。');
	} catch (error) {
		setStatus('JSONファイルの読み込みに失敗しました。');
		console.error('Failed to import JSON:', error);
	}
}

function setStatus(message) {
	elements.status.textContent = message;
}

elements.load.addEventListener('click', loadDataset);
elements.language.addEventListener('change', loadDataset);
elements.dataset.addEventListener('change', loadDataset);
elements.file.addEventListener('change', importFile);
elements.download.addEventListener('click', downloadData);
elements.add.addEventListener('click', addEntry);
elements.delete.addEventListener('click', deleteEntry);

loadDataset();
