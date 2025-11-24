/**
 * インタラクティブターミナルモジュール
 * ヒーローセクションのターミナルでコマンド実行を可能にする
 */

import { getProjectDetails } from './projectsData.js';
import { getSkillDetails } from './skillsData.js';

// コマンド履歴
let commandHistory = [];
let historyIndex = -1;

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
  'ls projects': {
    description: 'プロジェクト一覧を表示',
    execute: async () => {
      const projects = await getProjectDetails();
      const projectList = Object.entries(projects)
        .map(([id, project]) => {
          const techStack = project.techStack ? project.techStack.join(', ') : 'N/A';
          return `  📁 <span class="project-name">${project.title}</span>\n     ${project.description}\n     技術: ${techStack}`;
        })
        .join('\n\n');
      return `プロジェクト一覧 (全${Object.keys(projects).length}件):\n\n${projectList}`;
    }
  },
  'cat skills': {
    description: 'スキル一覧を表示',
    execute: async () => {
      const skills = await getSkillDetails();
      const categories = {
        frontend: { title: 'Frontend Development', skills: [] },
        backend: { title: 'Backend Development', skills: [] },
        'ai-ml': { title: 'AI & Machine Learning', skills: [] },
        tools: { title: 'Development Tools', skills: [] }
      };

      Object.entries(skills).forEach(([id, skill]) => {
        if (categories[skill.category]) {
          categories[skill.category].skills.push(`${skill.name} (${skill.level})`);
        }
      });

      const categoryList = Object.values(categories)
        .filter(cat => cat.skills.length > 0)
        .map(cat => `  <span class="category-name">${cat.title}</span>\n    ${cat.skills.join(', ')}`)
        .join('\n\n');

      return `スキル一覧:\n\n${categoryList}`;
    }
  },
  contact: {
    description: '連絡先情報を表示',
    execute: () => {
      return `📧 連絡先情報:\n\n  GitHub:  <a href="https://github.com/Nyayuta1060" target="_blank" rel="noopener noreferrer">@Nyayuta1060</a>\n  Twitter: <a href="https://twitter.com/Nyayuta0717" target="_blank" rel="noopener noreferrer">@Nyayuta0717</a>\n\n  または、ページ下部のContactセクションからお問い合わせください`;
    }
  },
  about: {
    description: '自己紹介を表示',
    execute: () => {
      return `👤 Nyayuta\n\n大阪公立大学工業高等専門学校\n知能情報コース/2年生\n\nWeb開発、AI/機械学習に興味を持ち、日々学習を続けています。\n詳細は About セクションをご覧ください！`;
    }
  },
  whoami: {
    description: '現在のユーザーを表示',
    execute: () => 'visitor@portfolio'
  },
  date: {
    description: '現在の日時を表示',
    execute: () => new Date().toLocaleString('ja-JP')
  },
  echo: {
    description: 'テキストを出力 (例: echo Hello World)',
    execute: (args) => args.join(' ') || ''
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
Welcome to Nyayuta's Portfolio Terminal!
Type '<span class="command-highlight">help</span>' to see available commands.
</div>`;
  terminalBody.innerHTML = welcomeMessage;
}

/**
 * プロンプトを表示
 */
function displayPrompt(terminalBody) {
  const promptLine = document.createElement('div');
  promptLine.className = 'terminal-line terminal-input-line';
  promptLine.innerHTML = `<span class="terminal-prompt">visitor@portfolio:~$</span> <span class="terminal-input-text"></span><span class="terminal-cursor">_</span>`;
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
      const suggestions = autocomplete(currentInput);
      if (suggestions.length === 1) {
        currentInput = suggestions[0];
        inputText.textContent = currentInput;
      } else if (suggestions.length > 1) {
        displayOutput(`\n${suggestions.join('  ')}`, terminalBody, false);
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
function autocomplete(input) {
  if (!input) return Object.keys(COMMANDS);
  
  const suggestions = Object.keys(COMMANDS).filter(cmd => 
    cmd.toLowerCase().startsWith(input.toLowerCase())
  );
  
  return suggestions;
}

/**
 * HTMLエスケープ
 */
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
