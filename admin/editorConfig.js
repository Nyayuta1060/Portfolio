function createId(prefix) {
	return `${prefix}-${Date.now().toString(36)}`;
}

export const DATASETS = {
	projects: {
		path: language => `../src/data/locales/${language}/projects.json`,
		entryLabel: entry => entry.name || entry.id,
		fields: [
			{ name: 'id', label: 'ID', type: 'text', required: true },
			{ name: 'name', label: '名前', type: 'text', required: true },
			{ name: 'description', label: '説明', type: 'textarea', required: true },
			{ name: 'type', label: '種類', type: 'select', options: [
				'web-app', 'desktop-app', 'mobile-app', 'cli-tool', 'library', 'automation', 'game', 'robot', 'ai-ml', 'other'
			], required: true },
			{ name: 'status', label: '状態', type: 'select', options: [
				'completed', 'in-progress', 'archived', 'planning'
			], required: true },
			{ name: 'featured', label: 'Featured', type: 'checkbox' },
			{ name: 'period', label: '期間', type: 'text', required: true },
			{ name: 'role', label: '役割', type: 'text' },
			{ name: 'developmentType', label: '開発形態', type: 'select', options: ['personal', 'team'], required: true },
			{ name: 'teamSize', label: 'チーム人数', type: 'number' },
			{ name: 'technologies', label: '技術', type: 'list', required: true },
			{ name: 'image.type', label: '画像タイプ', type: 'select', options: ['file', 'icon'], required: true },
			{ name: 'image.src', label: '画像パス', type: 'text' },
			{ name: 'image.alt', label: '画像Alt', type: 'text' },
			{ name: 'image.icon', label: 'Font Awesome Icon', type: 'text' },
			{ name: 'links.github', label: 'GitHub URL', type: 'url' },
			{ name: 'links.demo', label: 'Demo URL', type: 'url' },
			{ name: 'links.article', label: 'Article URL', type: 'url' },
			{ name: 'highlights', label: 'ハイライト', type: 'list' },
			{ name: 'modal.detailedDescription', label: '詳細説明', type: 'textarea' },
			{ name: 'modal.gallery', label: 'ギャラリー', type: 'gallery' }
		],
		create: () => ({
			id: createId('new-project'),
			name: 'New Project',
			description: '',
			type: 'web-app',
			status: 'planning',
			featured: false,
			period: '',
			role: null,
			developmentType: 'personal',
			teamSize: null,
			technologies: [],
			image: { type: 'icon', icon: 'fas fa-code' },
			links: { github: null, demo: null, article: null },
			highlights: []
		})
	},
	skills: {
		path: language => `../src/data/locales/${language}/skills.json`,
		entryLabel: entry => entry.name || entry.id,
		fields: [
			{ name: 'id', label: 'ID', type: 'text', required: true },
			{ name: 'name', label: '名前', type: 'text', required: true },
			{ name: 'category', label: 'カテゴリ', type: 'select', options: ['frontend', 'backend', 'ai-ml', 'tools'], required: true },
			{ name: 'level', label: 'レベル', type: 'text', required: true },
			{ name: 'frequency', label: '頻度', type: 'text', required: true },
			{ name: 'usage', label: '用途', type: 'textarea', required: true },
			{ name: 'experience', label: '経験', type: 'text', required: true },
			{ name: 'comment', label: 'コメント', type: 'textarea' },
			{ name: 'links.official', label: '公式URL', type: 'url' },
			{ name: 'links.github', label: 'GitHub URL', type: 'url' }
		],
		create: () => ({
			id: createId('new-skill'),
			name: 'New Skill',
			category: 'tools',
			level: '',
			frequency: '',
			usage: '',
			experience: '',
			comment: '',
			links: { official: null, github: null }
		})
	},
	career: {
		path: language => `../src/data/locales/${language}/career.json`,
		entryLabel: entry => `${entry.date || ''} ${entry.title || entry.id}`.trim(),
		fields: [
			{ name: 'id', label: 'ID', type: 'text', required: true },
			{ name: 'date', label: '日付', type: 'text', required: true },
			{ name: 'title', label: 'タイトル', type: 'text', required: true },
			{ name: 'description', label: '説明', type: 'textarea' },
			{ name: 'category', label: 'カテゴリ', type: 'select', options: ['education', 'club', 'award', 'project', 'other'], required: true }
		],
		create: () => ({
			id: createId('entry'),
			date: '',
			title: 'New Entry',
			description: '',
			category: 'other'
		})
	}
};


