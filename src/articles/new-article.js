#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const config = require('./config.js');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const articlesDir = path.join(__dirname, 'data');
const templatePath = path.join(__dirname, 'templates/article-template.md');

function question(text) {
    return new Promise((resolve) => {
        rl.question(text, resolve);
    });
}

function generateSlug(title) {
    return title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .substring(0, 50);
}

function getTodayDate() {
    return new Date().toISOString().split('T')[0];
}

function displayCategories() {
    console.log('\n📂 利用可能なカテゴリ:');
    config.metadata.categories.forEach((cat, index) => {
        console.log(`  ${index + 1}. ${cat}`);
    });
    console.log('');
}

async function main() {
    console.log('📝 新しい記事を作成します\n');

    try {
        const title = await question('記事タイトル: ');
        
        displayCategories();
        const categoryInput = await question('カテゴリを選択してください (番号 または カテゴリ名): ');
        
        let category;
        if (/^\d+$/.test(categoryInput)) {
            const categoryIndex = parseInt(categoryInput) - 1;
            if (categoryIndex >= 0 && categoryIndex < config.metadata.categories.length) {
                category = config.metadata.categories[categoryIndex];
            } else {
                throw new Error('無効な番号です');
            }
        } else {
            if (config.metadata.categories.includes(categoryInput)) {
                category = categoryInput;
            } else {
                throw new Error(`カテゴリ "${categoryInput}" は存在しません。利用可能なカテゴリから選択してください。`);
            }
        }
        
        const tags = await question('タグ (カンマ区切り): ');
        const excerpt = await question('記事の要約: ');
        const readTime = await question('読了時間 (例: 5分): ') || '5分';

        const slug = generateSlug(title);
        const date = getTodayDate();
        const fileName = `${date}-${slug}.md`;
        const filePath = path.join(articlesDir, fileName);

        // テンプレートを読み込み
        let template = fs.readFileSync(templatePath, 'utf8');

        // Front Matterを置換
        template = template
            .replace('title: "記事タイトルをここに入力"', `title: "${title}"`)
            .replace('date: "2025-09-18"', `date: "${date}"`)
            .replace('category: "Programming"', `category: "${category}"`)
            .replace('tags: ["JavaScript", "Web Development"]', `tags: [${tags.split(',').map(tag => `"${tag.trim()}"`).join(', ')}]`)
            .replace('excerpt: "記事の要約を2-3文で記述してください。読者が興味を持つようなキャッチーな内容にしましょう。"', `excerpt: "${excerpt}"`)
            .replace('readTime: "5分"', `readTime: "${readTime}"`)
            .replace('# 記事タイトル', `# ${title}`);

        // ファイルを作成
        fs.writeFileSync(filePath, template, 'utf8');

        console.log(`\n✅ 記事ファイルを作成しました:`);
        console.log(`📁 ${filePath}`);
        console.log(`\n次のステップ:`);
        console.log(`1. エディタで記事を編集してください`);
        console.log(`2. 記事完成後、build-news.jsを実行してください`);
        console.log(`3. Gitでコミット・プッシュしてください`);

    } catch (error) {
        console.error('❌ エラー:', error.message);
    } finally {
        rl.close();
    }
}

if (require.main === module) {
    main();
}