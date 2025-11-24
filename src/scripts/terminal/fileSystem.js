/**
 * ファイルシステム定義
 */

// 現在のディレクトリ
export let currentDirectory = '/home/visitor/portfolio';

export function setCurrentDirectory(dir) {
  currentDirectory = dir;
}

export function getCurrentDirectory() {
  return currentDirectory;
}

// ディレクトリ構造
export const fileSystem = {
  '/home/visitor/portfolio': {
    type: 'directory',
    contents: ['about.txt', 'contact.txt', 'README.md', 'skills', 'projects']
  },
  '/home/visitor/portfolio/skills': {
    type: 'directory',
    contents: [] // 動的に生成
  },
  '/home/visitor/portfolio/projects': {
    type: 'directory',
    contents: [] // 動的に生成
  },
  '/home/visitor/portfolio/about.txt': {
    type: 'file',
    content: `Name: Nyayuta
School: 大阪公立大学工業高等専門学校
Course: 知能情報コース 2年生

興味分野:
- Web開発 (Frontend/Backend)
- AI・機械学習
- データサイエンス

詳しくは 'cd skills' または 'cd projects' で確認できます。`
  },
  '/home/visitor/portfolio/contact.txt': {
    type: 'file',
    content: `📧 Contact Information

GitHub: https://github.com/Nyayuta1060
Twitter: https://twitter.com/Nyayuta0717

コマンド:
  github  - GitHubプロフィールを開く
  twitter - Twitterプロフィールを開く

お気軽にご連絡ください！`
  },
  '/home/visitor/portfolio/README.md': {
    type: 'file',
    content: `# Nyayuta's Portfolio

このポートフォリオサイトへようこそ！
Web開発とAI/機械学習に興味を持って学習しています。

## ディレクトリ構造
- about.txt    自己紹介
- contact.txt  連絡先情報
- skills/      習得スキル
- projects/    開発プロジェクト

## 便利なコマンド
- ls           ファイル一覧
- cd [dir]     ディレクトリ移動
- cat [file]   ファイル表示
- help         コマンド一覧`
  }
};

/**
 * パスを正規化
 */
export function normalizePath(path) {
  if (!path.startsWith('/')) {
    path = currentDirectory + '/' + path;
  }
  
  const parts = path.split('/').filter(p => p && p !== '.');
  const result = [];
  
  for (const part of parts) {
    if (part === '..') {
      result.pop();
    } else {
      result.push(part);
    }
  }
  
  return '/' + result.join('/');
}
