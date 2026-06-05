export function getValue(target, path) {
	return path.split('.').reduce((value, key) => value?.[key], target);
}

export function setValue(target, path, value) {
	const keys = path.split('.');
	const lastKey = keys.pop();
	const owner = keys.reduce((node, key) => {
		node[key] = node[key] && typeof node[key] === 'object' ? node[key] : {};
		return node[key];
	}, target);
	owner[lastKey] = value === '' ? null : value;
}

export function normalizeObjectToEntries(data) {
	return Object.entries(data).map(([id, entry]) => ({ id, ...entry }));
}

export function normalizeCareerToEntries(data) {
	return Array.isArray(data.timeline) ? data.timeline.filter(entry => !entry.isGroup) : [];
}

export function formatTextareaValue(field, value) {
	if (field.type === 'gallery') {
		return Array.isArray(value)
			? value.map(item => [item.type, item.src, item.alt, item.caption].filter(Boolean).join(' | ')).join('\n')
			: '';
	}
	return Array.isArray(value) ? value.join('\n') : value || '';
}

export function parseGalleryLine(line) {
	const parts = line.split('|').map(part => part.trim());
	if (!parts[1] && !parts[0]) return null;
	return {
		type: parts[0] || 'image',
		src: parts[1] || parts[0],
		alt: parts[2] || parts[1] || parts[0],
		caption: parts[3] || parts[2] || parts[1] || parts[0]
	};
}

export function validateEntries(entries, config) {
	const errors = [];
	const ids = new Set();

	entries.forEach((entry, index) => {
		const label = entry.id || `#${index + 1}`;
		if (!entry.id) errors.push(`${label}: IDが必要です。`);
		if (ids.has(entry.id)) errors.push(`${label}: IDが重複しています。`);
		ids.add(entry.id);

		config.fields.filter(field => field.required).forEach(field => {
			const value = getValue(entry, field.name);
			if (Array.isArray(value) && value.length === 0) {
				errors.push(`${label}: ${field.label}が必要です。`);
			} else if (value === null || value === undefined || value === '') {
				errors.push(`${label}: ${field.label}が必要です。`);
			}
		});
	});

	return errors;
}
