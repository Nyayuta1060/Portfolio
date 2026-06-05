import { access, readFile } from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const LANGUAGES = ['ja', 'en'];
const PROJECT_TYPES = new Set([
	'web-app',
	'desktop-app',
	'mobile-app',
	'cli-tool',
	'library',
	'automation',
	'game',
	'robot',
	'ai-ml',
	'other'
]);
const PROJECT_STATUSES = new Set(['completed', 'in-progress', 'archived', 'planning']);
const SKILL_CATEGORIES = new Set(['frontend', 'backend', 'ai-ml', 'tools']);

const errors = [];
const warnings = [];
const dataByLanguage = {};

function reportError(message) {
	errors.push(message);
}

function reportWarning(message) {
	warnings.push(message);
}

async function loadJson(relativePath) {
	const absolutePath = path.join(ROOT_DIR, relativePath);
	try {
		return JSON.parse(await readFile(absolutePath, 'utf8'));
	} catch (error) {
		reportError(`${relativePath}: failed to parse JSON (${error.message})`);
		return null;
	}
}

async function fileExists(relativePath) {
	try {
		await access(path.join(ROOT_DIR, relativePath), constants.R_OK);
		return true;
	} catch {
		return false;
	}
}

function isHttpUrl(value) {
	if (!value) return true;
	try {
		const url = new URL(value);
		return url.protocol === 'http:' || url.protocol === 'https:';
	} catch {
		return false;
	}
}

function compareKeys(dataset, leftLanguage, rightLanguage) {
	const left = dataByLanguage[leftLanguage]?.[dataset];
	const right = dataByLanguage[rightLanguage]?.[dataset];
	if (!left || !right) return;

	const leftKeys = new Set(Object.keys(left));
	const rightKeys = new Set(Object.keys(right));

	for (const key of leftKeys) {
		if (!rightKeys.has(key)) {
			reportError(`${dataset}: ${key} exists in ${leftLanguage} but not in ${rightLanguage}`);
		}
	}

	for (const key of rightKeys) {
		if (!leftKeys.has(key)) {
			reportError(`${dataset}: ${key} exists in ${rightLanguage} but not in ${leftLanguage}`);
		}
	}
}

async function validateProjects(language, projects) {
	if (!projects || typeof projects !== 'object' || Array.isArray(projects)) {
		reportError(`${language}/projects.json: root must be an object`);
		return;
	}

	for (const [id, project] of Object.entries(projects)) {
		const prefix = `${language}/projects.json:${id}`;
		for (const field of ['name', 'description', 'type', 'status', 'period', 'technologies', 'image', 'links']) {
			if (!(field in project)) reportError(`${prefix}: missing required field "${field}"`);
		}
		if (!PROJECT_TYPES.has(project.type)) reportError(`${prefix}: invalid project type "${project.type}"`);
		if (!PROJECT_STATUSES.has(project.status)) reportError(`${prefix}: invalid status "${project.status}"`);
		if (!Array.isArray(project.technologies) || project.technologies.length === 0) {
			reportError(`${prefix}: technologies must be a non-empty array`);
		}
		if (!project.links || !isHttpUrl(project.links.github) || !isHttpUrl(project.links.demo) || !isHttpUrl(project.links.article)) {
			reportError(`${prefix}: links must be valid http(s) URLs or null`);
		}
		if (project.image?.type === 'file') {
			const imagePath = String(project.image.src || '').replace(/^\.\//, '');
			if (!imagePath || !(await fileExists(imagePath))) {
				reportError(`${prefix}: image file not found (${project.image.src})`);
			}
		} else if (project.image?.type === 'icon') {
			if (!project.image.icon) reportError(`${prefix}: icon image requires image.icon`);
		} else {
			reportError(`${prefix}: image.type must be "file" or "icon"`);
		}
	}
}

async function validateSkills(language, skills) {
	if (!skills || typeof skills !== 'object' || Array.isArray(skills)) {
		reportError(`${language}/skills.json: root must be an object`);
		return;
	}

	for (const [id, skill] of Object.entries(skills)) {
		const prefix = `${language}/skills.json:${id}`;
		for (const field of ['name', 'category', 'level', 'frequency', 'usage', 'experience', 'links']) {
			if (!(field in skill)) reportError(`${prefix}: missing required field "${field}"`);
		}
		if (!SKILL_CATEGORIES.has(skill.category)) reportError(`${prefix}: invalid category "${skill.category}"`);
		if (!isHttpUrl(skill.links?.official) || !isHttpUrl(skill.links?.github)) {
			reportError(`${prefix}: links must be valid http(s) URLs or null`);
		}
		if (!(await fileExists(`src/assets/skillstocks/${id}.png`))) {
			reportWarning(`${prefix}: skill icon is missing (src/assets/skillstocks/${id}.png)`);
		}
	}
}

function validateCareer(language, career) {
	if (!career || !Array.isArray(career.timeline)) {
		reportError(`${language}/career.json: timeline must be an array`);
		return;
	}

	career.timeline.forEach((entry, index) => {
		const prefix = `${language}/career.json:timeline[${index}]`;
		if (!entry.id) reportError(`${prefix}: missing id`);
		if (!entry.date) reportError(`${prefix}: missing date`);
		if (entry.isGroup) {
			if (!Array.isArray(entry.items) || entry.items.length === 0) {
				reportError(`${prefix}: grouped entry requires items`);
			}
			return;
		}
		if (!entry.title) reportError(`${prefix}: missing title`);
		if (!entry.category) reportError(`${prefix}: missing category`);
	});
}

for (const language of LANGUAGES) {
	const projects = await loadJson(`src/data/locales/${language}/projects.json`);
	const skills = await loadJson(`src/data/locales/${language}/skills.json`);
	const career = await loadJson(`src/data/locales/${language}/career.json`);
	dataByLanguage[language] = { projects, skills, career };
	await validateProjects(language, projects);
	await validateSkills(language, skills);
	validateCareer(language, career);
}

compareKeys('projects', 'ja', 'en');
compareKeys('skills', 'ja', 'en');

if (warnings.length > 0) {
	console.warn('Warnings:');
	warnings.forEach(warning => console.warn(`- ${warning}`));
}

if (errors.length > 0) {
	console.error('Validation failed:');
	errors.forEach(error => console.error(`- ${error}`));
	process.exit(1);
}

console.log('Data validation passed.');
