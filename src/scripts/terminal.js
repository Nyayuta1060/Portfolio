/**
 * インタラクティブターミナルモジュール
 * ヒーローセクションのターミナルでコマンド実行を可能にする
 */

import { getProjectDetails } from './projectsData.js';
import { getSkillDetails } from './skillsData.js';

// コマンド履歴
let commandHistory = [];
let historyIndex = -1;

// 現在のディレクトリ
let currentDirectory = '/home/visitor/portfolio';

// ディレクトリ構造
const fileSystem = {
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
function normalizePath(path) {
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

/**
 * 利用可能なコマンドとその説明
 */
const COMMANDS = {
  help: {
    description: '利用可能なコマンド一覧を表示',
    execute: () => {
      const commandList = Object.entries(COMMANDS)
        .map(([cmd, info]) => `  <span class="command-name">${cmd.padEnd(15)}</span> ${info.description}`)
        .join('\n');
      return `利用可能なコマンド:\n${commandList}\n\nヒント: Tab キーでオートコンプリート、↑↓ キーで履歴を参照できます`;
    }
  },
  clear: {
    description: 'ターミナルをクリア',
    execute: () => 'CLEAR_TERMINAL'
  },
  pwd: {
    description: '現在のディレクトリを表示',
    execute: () => currentDirectory
  },
  cd: {
    description: 'ディレクトリを移動 (例: cd skills, cd ..)',
    execute: (args) => {
      if (args.length === 0) {
        currentDirectory = '/home/visitor/portfolio';
        return '';
      }
      
      const targetPath = normalizePath(args[0]);
      
      if (fileSystem[targetPath] && fileSystem[targetPath].type === 'directory') {
        currentDirectory = targetPath;
        return '';
      } else if (fileSystem[targetPath] && fileSystem[targetPath].type === 'file') {
        return `cd: ${args[0]}: ディレクトリではありません`;
      } else {
        return `cd: ${args[0]}: そのようなディレクトリはありません`;
      }
    }
  },
  ls: {
    description: 'ファイルとディレクトリを一覧表示',
    execute: async (args) => {
      let targetPath = currentDirectory;
      
      if (args.length > 0) {
        targetPath = normalizePath(args[0]);
      }
      
      if (!fileSystem[targetPath]) {
        return `ls: ${args[0] || targetPath}: そのようなファイルやディレクトリはありません`;
      }
      
      if (fileSystem[targetPath].type === 'file') {
        return args[0] || targetPath.split('/').pop();
      }
      
      let contents = [...fileSystem[targetPath].contents];
      
      // skills ディレクトリの場合、動的にスキル一覧を生成
      if (targetPath === '/home/visitor/portfolio/skills') {
        const skills = await getSkillDetails();
        contents = Object.keys(skills).map(id => `${id}.txt`);
      }
      
      // projects ディレクトリの場合、動的にプロジェクト一覧を生成
      if (targetPath === '/home/visitor/portfolio/projects') {
        const projects = await getProjectDetails();
        contents = Object.keys(projects).map(id => `${id}.txt`);
      }
      
      if (contents.length === 0) {
        return '(空のディレクトリ)';
      }
      
      return contents.map(item => {
        const fullPath = targetPath + '/' + item;
        const isDir = fileSystem[fullPath]?.type === 'directory' || 
                      targetPath === '/home/visitor/portfolio/skills' ||
                      targetPath === '/home/visitor/portfolio/projects';
        return isDir && !item.includes('.') ? `<span class="directory">${item}/</span>` : item;
      }).join('  ');
    }
  },
  cat: {
    description: 'ファイル内容を表示 (例: cat about.txt)',
    execute: async (args) => {
      if (args.length === 0) {
        return 'cat: ファイル名を指定してください\n使用例: cat about.txt, cat README.md';
      }
      
      const targetPath = normalizePath(args[0]);
      
      if (!fileSystem[targetPath]) {
        // skills ディレクトリ内のファイル
        if (targetPath.startsWith('/home/visitor/portfolio/skills/')) {
          const skillId = targetPath.split('/').pop().replace('.txt', '');
          const skills = await getSkillDetails();
          const skill = skills[skillId];
          
          if (skill) {
            return `スキル: ${skill.name}
レベル: ${skill.level}
頻度: ${skill.frequency}

主な用途:
${skill.usage}

使用期間:
${skill.experience}

コメント:
${skill.comment}

リンク:
${skill.links.official ? `  公式: ${skill.links.official}` : ''}
${skill.links.github ? `  GitHub: ${skill.links.github}` : ''}`;
          }
        }
        
        // projects ディレクトリ内のファイル
        if (targetPath.startsWith('/home/visitor/portfolio/projects/')) {
          const projectId = targetPath.split('/').pop().replace('.txt', '');
          const projects = await getProjectDetails();
          const project = projects[projectId];
          
          if (project) {
            return `プロジェクト: ${project.title}

説明:
${project.description}

技術スタック:
${project.techStack ? project.techStack.join(', ') : 'N/A'}

GitHub: ${project.github || 'N/A'}`;
          }
        }
        
        return `cat: ${args[0]}: そのようなファイルやディレクトリはありません`;
      }
      
      if (fileSystem[targetPath].type === 'directory') {
        return `cat: ${args[0]}: ディレクトリです`;
      }
      
      return fileSystem[targetPath].content;
    }
  },
  whoami: {
    description: '現在のユーザーを表示',
    execute: () => 'visitor'
  },
  date: {
    description: '現在の日時を表示',
    execute: () => new Date().toLocaleString('ja-JP')
  },
  echo: {
    description: 'テキストを出力 (例: echo Hello World)',
    execute: (args) => args.join(' ') || ''
  },
  github: {
    description: 'GitHub プロフィールを開く',
    execute: () => {
      window.open('https://github.com/Nyayuta1060', '_blank');
      return '✅ GitHubプロフィールを新しいタブで開きました';
    }
  },
  twitter: {
    description: 'Twitter プロフィールを開く',
    execute: () => {
      window.open('https://twitter.com/Nyayuta0717', '_blank');
      return '✅ Twitterプロフィールを新しいタブで開きました';
    }
  },
  history: {
    description: 'コマンド履歴を表示',
    execute: () => {
      if (commandHistory.length === 0) {
        return 'コマンド履歴はありません';
      }
      return `コマンド履歴:\n${commandHistory.map((cmd, i) => `  ${commandHistory.length - i}  ${cmd}`).join('\n')}`;
    }
  },
  banner: {
    description: 'ウェルカムバナーを表示',
    execute: () => {
      return `
╔═══════════════════════════════════════╗
║                                       ║
║ Welcome to Nyayuta's Portfolio OS     ║
║                                       ║
║ 大阪公立大学工業高等専門学校            　 ║
║ 知能情報コース 2年生                     ║
║                                       ║
╚═══════════════════════════════════════╝
Type 'help' to see available commands`;
    }
  },
  neofetch: {
    description: 'システム情報を表示',
    execute: () => {
      return `
      ___           visitor@portfolio
     (.. |          ─────────────────
     (<> |          OS: Portfolio v1.0
    / __  \\         Shell: interactive-terminal
   ( /  \\ /|        Browser: ${navigator.userAgent.split(' ').pop()}
  _/\\ __)/_)        Skills: ${Object.keys(COMMANDS).length} commands
  \\/-____\\/         Uptime: ${Math.floor(performance.now() / 1000)}s`;
    }
  },
  reboot: {
    description: 'システムを再起動',
    execute: () => {
      return 'REBOOT_SYSTEM';
    }
  },
  rm: {
    description: 'ページセクションを削除 (例: rm about, rm *, rm -rf /)',
    execute: (args) => {
      if (args.length === 0) {
        return 'rm: オペランドがありません\n使用例: rm about, rm skills, rm projects, rm contact, rm *';
      }
      
      const target = args[0].toLowerCase();
      const validTargets = ['about', 'skills', 'projects', 'contact'];
      
      // rm * または rm -rf / の場合は全削除
      if (target === '*' || args.join(' ').includes('-rf')) {
        return 'RM_SECTION:all';
      }
      
      if (!validTargets.includes(target)) {
        return `rm: '${args[0]}' を削除できません: そのようなセクションはありません\n有効なセクション: ${validTargets.join(', ')}, *`;
      }
      
      return `RM_SECTION:${target}`;
    }
  }
};

/**
 * ターミナルを初期化
 */
export function initializeTerminal() {
  console.log('🖥️ Initializing Interactive Terminal...');
  
  const terminalBody = document.querySelector('.terminal-body');
  
  if (!terminalBody) {
    console.warn('Terminal body not found');
    return;
  }

  // ウェルカムメッセージを表示
  displayWelcomeMessage(terminalBody);

  // 初期プロンプトを表示
  displayPrompt(terminalBody);

  // イベントリスナーを設定
  setupTerminalEventListeners(terminalBody);

  console.log('✅ Interactive Terminal initialized');
}

/**
 * ウェルカムメッセージを表示
 */
function displayWelcomeMessage(terminalBody) {
  const welcomeMessage = `<div class="terminal-line welcome-message">
Terminal ready. Type '<span class="command-highlight">help</span>' to see available commands.
</div>`;
  terminalBody.innerHTML = welcomeMessage;
}

/**
 * セクションを削除
 */
async function removeSection(sectionName, terminalBody) {
  // 全削除の場合
  if (sectionName === 'all') {
    displayOutput(`<span style="color: #ff6b6b;">⚠️  CRITICAL WARNING: Deleting all sections...</span>`, terminalBody);
    await sleep(500);
    displayOutput(`<span style="color: #ff6b6b;">rm: removing everything...</span>`, terminalBody);
    await sleep(500);
    
    const sections = ['#about', '#skills', '#projects', '#contact'];
    
    for (const selector of sections) {
      const section = document.querySelector(selector);
      if (section) {
        displayOutput(`rm: removing section '${selector.replace('#', '')}'`, terminalBody);
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        section.style.opacity = '0';
        section.style.transform = 'scale(0.8)';
        await sleep(300);
      }
    }
    
    await sleep(500);
    
    // 全て削除
    sections.forEach(selector => {
      const section = document.querySelector(selector);
      if (section) section.remove();
    });
    
    displayOutput(`<span style="color: #10b981;">✓ All sections have been removed</span>`, terminalBody);
    displayOutput(`<span style="color: #fbbf24;">💡 ヒント: 元に戻すには 'reboot' コマンドを実行してください</span>`, terminalBody);
    displayOutput(`<span style="color: #ff6b6b;">💀 System is now empty. Type 'reboot' to restore.</span>`, terminalBody);
    return;
  }
  
  // 個別削除
  const sectionMap = {
    'about': '#about',
    'skills': '#skills',
    'projects': '#projects',
    'contact': '#contact'
  };
  
  const sectionSelector = sectionMap[sectionName];
  const section = document.querySelector(sectionSelector);
  
  if (!section) {
    displayOutput(`エラー: セクション '${sectionName}' が見つかりません`, terminalBody);
    return;
  }
  
  // 警告メッセージを表示
  displayOutput(`<span style="color: #ff6b6b;">⚠️  WARNING: Deleting section '${sectionName}'...</span>`, terminalBody);
  await sleep(500);
  
  displayOutput(`rm: removing section '${sectionName}'`, terminalBody);
  await sleep(300);
  
  // セクションをフェードアウト
  section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
  section.style.opacity = '0';
  section.style.transform = 'translateY(-50px)';
  
  await sleep(800);
  
  // DOMから削除
  section.remove();
  
  displayOutput(`<span style="color: #10b981;">✓ Section '${sectionName}' has been removed</span>`, terminalBody);
  displayOutput(`<span style="color: #fbbf24;">💡 ヒント: 元に戻すには 'reboot' コマンドを実行してください</span>`, terminalBody);
}

/**
 * システムを再起動
 */
async function rebootSystem(terminalBody) {
  const shutdownMessages = [
    'Shutting down system...',
    'Stopping services',
    'Unmounting file systems',
    'System halted',
    ''
  ];

  for (const msg of shutdownMessages) {
    displayOutput(msg, terminalBody);
    await sleep(150);
  }

  await sleep(500);

  // ページをリロード
  window.location.reload();
}

/**
 * スリープ関数
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * プロンプトを表示
 */
function displayPrompt(terminalBody) {
  const promptLine = document.createElement('div');
  promptLine.className = 'terminal-line terminal-input-line';
  const promptPath = currentDirectory.replace('/home/visitor/portfolio', '~');
  promptLine.innerHTML = `<span class="terminal-prompt">visitor@portfolio:${promptPath}$</span> <span class="terminal-input-text"></span><span class="terminal-cursor">_</span>`;
  terminalBody.appendChild(promptLine);
  
  console.log('✅ Prompt displayed');
}

/**
 * ターミナルのイベントリスナーを設定
 */
function setupTerminalEventListeners(terminalBody) {
  let currentInput = '';

  // キーボード入力をキャプチャ
  document.addEventListener('keydown', async (e) => {
    // 他の入力フィールドにフォーカスがある場合は無視
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
      return;
    }

    // 最後の入力行を取得（最新のもの）
    const allInputLines = terminalBody.querySelectorAll('.terminal-input-line');
    if (allInputLines.length === 0) {
      console.warn('Input line not found');
      return;
    }
    const currentInputLine = allInputLines[allInputLines.length - 1];
    const inputText = currentInputLine.querySelector('.terminal-input-text');
    if (!inputText) {
      console.warn('Input text element not found');
      return;
    }

    // Enter キー
    if (e.key === 'Enter') {
      e.preventDefault();
      if (currentInput.trim()) {
        await executeCommand(currentInput.trim(), terminalBody);
        commandHistory.unshift(currentInput.trim());
        historyIndex = -1;
        currentInput = '';
      } else {
        // 空のコマンドの場合も新しいプロンプトを表示
        const cursor = currentInputLine.querySelector('.terminal-cursor');
        if (cursor) cursor.remove();
        currentInputLine.classList.remove('terminal-input-line');
        displayPrompt(terminalBody);
        currentInput = '';
      }
      return;
    }

    // Backspace キー
    if (e.key === 'Backspace') {
      e.preventDefault();
      currentInput = currentInput.slice(0, -1);
      inputText.textContent = currentInput;
      return;
    }

    // 上下矢印キー (履歴)
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        currentInput = commandHistory[historyIndex];
        inputText.textContent = currentInput;
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        historyIndex--;
        currentInput = commandHistory[historyIndex];
        inputText.textContent = currentInput;
      } else if (historyIndex === 0) {
        historyIndex = -1;
        currentInput = '';
        inputText.textContent = '';
      }
      return;
    }

    // Tab キー (オートコンプリート)
    if (e.key === 'Tab') {
      e.preventDefault();
      const suggestions = await autocomplete(currentInput);
      if (suggestions.length === 1) {
        // 1つだけの場合は補完
        const parts = currentInput.split(' ');
        if (parts.length === 1) {
          currentInput = suggestions[0] + ' ';
        } else {
          parts[parts.length - 1] = suggestions[0];
          currentInput = parts.join(' ');
          // ディレクトリの場合はスペースを追加しない
          const fullPath = normalizePath(suggestions[0]);
          if (!fileSystem[fullPath] || fileSystem[fullPath].type !== 'directory') {
            currentInput += ' ';
          }
        }
        inputText.textContent = currentInput;
      } else if (suggestions.length > 1) {
        // 複数の候補がある場合は共通部分まで補完
        const commonPrefix = getCommonPrefix(suggestions);
        if (commonPrefix && commonPrefix.length > currentInput.split(' ').pop().length) {
          const parts = currentInput.split(' ');
          parts[parts.length - 1] = commonPrefix;
          currentInput = parts.join(' ');
          inputText.textContent = currentInput;
        }
        // 候補を表示
        displayOutput(`\n${suggestions.join('  ')}`, terminalBody, false);
        // 最下部にスクロール
        terminalBody.scrollTop = terminalBody.scrollHeight;
      }
      return;
    }

    // 通常の文字入力
    if (e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
      e.preventDefault();
      currentInput += e.key;
      inputText.textContent = currentInput;
    }
  });

  // ターミナルエリアをクリックしたらフォーカスを示す
  terminalBody.addEventListener('click', () => {
    const cursor = terminalBody.querySelector('.terminal-cursor');
    if (cursor) {
      cursor.style.animation = 'none';
      cursor.offsetHeight; // リフロー
      cursor.style.animation = '';
    }
  });
}

/**
 * コマンドを実行
 */
async function executeCommand(input, terminalBody) {
  // 最後の入力行を取得
  const allInputLines = terminalBody.querySelectorAll('.terminal-input-line');
  if (allInputLines.length === 0) return;
  const currentInputLine = allInputLines[allInputLines.length - 1];

  // 入力内容を確定してカーソルを削除
  const inputText = currentInputLine.querySelector('.terminal-input-text');
  const cursor = currentInputLine.querySelector('.terminal-cursor');
  if (inputText) {
    inputText.textContent = input;
  }
  if (cursor) {
    cursor.remove();
  }
  
  // 入力行を通常の行に変換（ログとして保存）
  currentInputLine.classList.remove('terminal-input-line');

  const [command, ...args] = input.split(' ');
  const fullCommand = input.toLowerCase();

  // コマンドを検索（完全一致または部分一致）
  let cmdInfo = COMMANDS[fullCommand] || COMMANDS[command];

  if (cmdInfo) {
    try {
      const result = await cmdInfo.execute(args);
      
      if (result === 'CLEAR_TERMINAL') {
        clearTerminal(terminalBody);
      } else if (result === 'REBOOT_SYSTEM') {
        await rebootSystem(terminalBody);
        return; // reboot後はプロンプトを表示しない
      } else if (result.startsWith('RM_SECTION:')) {
        const sectionName = result.split(':')[1];
        await removeSection(sectionName, terminalBody);
      } else {
        displayOutput(result, terminalBody);
      }
    } catch (error) {
      displayOutput(`エラー: コマンドの実行に失敗しました`, terminalBody);
      console.error('Command execution error:', error);
    }
  } else {
    displayOutput(`コマンドが見つかりません: ${escapeHtml(command)}\n'help' でコマンド一覧を表示できます`, terminalBody);
  }

  // 新しいプロンプトを表示
  displayPrompt(terminalBody);
  
  // 最下部にスクロール
  terminalBody.scrollTop = terminalBody.scrollHeight;
}

/**
 * 出力を表示
 */
function displayOutput(text, terminalBody, addNewline = true) {
  const outputLine = document.createElement('div');
  outputLine.className = 'terminal-line terminal-output';
  outputLine.innerHTML = addNewline ? `${text}\n` : text;
  
  // 最後に追加（入力行は後から追加される）
  terminalBody.appendChild(outputLine);
}

/**
 * ターミナルをクリア
 */
function clearTerminal(terminalBody) {
  terminalBody.innerHTML = '';
}

/**
 * オートコンプリート
 */
async function autocomplete(input) {
  if (!input) return Object.keys(COMMANDS);
  
  const parts = input.split(' ');
  const command = parts[0];
  
  // コマンド名の補完
  if (parts.length === 1) {
    const suggestions = Object.keys(COMMANDS).filter(cmd => 
      cmd.toLowerCase().startsWith(input.toLowerCase())
    );
    return suggestions;
  }
  
  // ファイル/ディレクトリ名の補完
  if (parts.length >= 2) {
    const lastArg = parts[parts.length - 1];
    
    // cd, ls, cat コマンドの場合はファイル/ディレクトリを補完
    if (['cd', 'ls', 'cat'].includes(command)) {
      return await getPathCompletions(lastArg);
    }
    
    // rm コマンドの場合はセクション名を補完
    if (command === 'rm') {
      const sections = ['about', 'skills', 'projects', 'contact', '*', '-rf'];
      return sections.filter(sec => sec.startsWith(lastArg.toLowerCase()));
    }
  }
  
  return [];
}

/**
 * パスの補完候補を取得
 */
async function getPathCompletions(partial) {
  const suggestions = [];
  
  // 現在のディレクトリの内容を取得
  let targetDir = currentDirectory;
  let prefix = partial;
  
  // パスが含まれている場合
  if (partial.includes('/')) {
    const lastSlash = partial.lastIndexOf('/');
    const dirPart = partial.substring(0, lastSlash);
    prefix = partial.substring(lastSlash + 1);
    targetDir = normalizePath(dirPart);
  }
  
  // ディレクトリの内容を取得
  let contents = [];
  
  if (fileSystem[targetDir] && fileSystem[targetDir].type === 'directory') {
    contents = [...fileSystem[targetDir].contents];
    
    // skills ディレクトリの場合
    if (targetDir === '/home/visitor/portfolio/skills') {
      const skills = await getSkillDetails();
      contents = Object.keys(skills).map(id => `${id}.txt`);
    }
    
    // projects ディレクトリの場合
    if (targetDir === '/home/visitor/portfolio/projects') {
      const projects = await getProjectDetails();
      contents = Object.keys(projects).map(id => `${id}.txt`);
    }
  }
  
  // .. を追加
  if (targetDir !== '/home/visitor/portfolio') {
    contents.unshift('..');
  }
  
  // 前方一致でフィルター
  const matches = contents.filter(item => 
    item.toLowerCase().startsWith(prefix.toLowerCase())
  );
  
  // パスを再構築
  matches.forEach(match => {
    if (partial.includes('/')) {
      const dirPart = partial.substring(0, partial.lastIndexOf('/') + 1);
      suggestions.push(dirPart + match);
    } else {
      suggestions.push(match);
    }
  });
  
  return suggestions;
}

/**
 * 共通プレフィックスを取得
 */
function getCommonPrefix(strings) {
  if (strings.length === 0) return '';
  if (strings.length === 1) return strings[0];
  
  let prefix = strings[0];
  for (let i = 1; i < strings.length; i++) {
    while (strings[i].indexOf(prefix) !== 0) {
      prefix = prefix.substring(0, prefix.length - 1);
      if (prefix === '') return '';
    }
  }
  return prefix;
}

/**
 * HTMLエスケープ
 */
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
