/**
 * インタラクティブターミナルモジュール
 * ヒーローセクションのターミナルでコマンド実行を可能にする
 */

import { COMMANDS } from './terminal/commands.js';
import { getCurrentDirectory, normalizePath, fileSystem, isDeleted } from './terminal/fileSystem.js';
import { sleep, escapeHtml, getCommonPrefix } from './terminal/utils.js';
import { getProjectDetails } from './projectsData.js';
import { getSkillDetails } from './skillsData.js';

// コマンド履歴
let commandHistory = [];
let historyIndex = -1;
// カーソル位置
let cursorPosition = 0;

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
 * Matrixアニメーションを再生
 */
async function playMatrixAnimation(terminalBody) {
  const chars = '日ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ012345789Z:・."=*+-<>¦╌ç';
  const lines = 15;
  const columns = 60;
  let frameCount = 0;
  const maxFrames = 30;
  
  // 初期状態の作成
  let matrix = Array(lines).fill(null).map(() => 
    Array(columns).fill(null).map(() => ({
      char: ' ',
      brightness: 0
    }))
  );
  
  // 各列の進行状況
  const columnProgress = Array(columns).fill(0).map(() => Math.floor(Math.random() * lines));
  
  const animate = () => {
    if (frameCount >= maxFrames) {
      displayOutput('<span style="color: #64ffda;">Matrix animation complete. Press Ctrl+C to stop (just kidding!)</span>', terminalBody);
      return;
    }
    
    // マトリックスを更新
    for (let col = 0; col < columns; col++) {
      // 列を進める
      if (Math.random() > 0.7) {
        columnProgress[col] = (columnProgress[col] + 1) % (lines + 5);
      }
      
      // 文字を更新
      for (let row = 0; row < lines; row++) {
        const distance = columnProgress[col] - row;
        
        if (distance === 0) {
          // 先頭は明るい緑
          matrix[row][col] = {
            char: chars[Math.floor(Math.random() * chars.length)],
            brightness: 2
          };
        } else if (distance > 0 && distance < 8) {
          // トレイルは徐々に暗く
          matrix[row][col].brightness = Math.max(0, matrix[row][col].brightness - 0.2);
        } else {
          // それ以外は暗くする
          matrix[row][col].brightness = Math.max(0, matrix[row][col].brightness - 0.1);
        }
        
        // ランダムに文字を変更
        if (matrix[row][col].brightness > 0 && Math.random() > 0.9) {
          matrix[row][col].char = chars[Math.floor(Math.random() * chars.length)];
        }
      }
    }
    
    // 描画
    let output = '';
    for (let row = 0; row < lines; row++) {
      for (let col = 0; col < columns; col++) {
        const cell = matrix[row][col];
        let color;
        if (cell.brightness >= 2) {
          color = '#ffffff'; // 白
        } else if (cell.brightness >= 1) {
          color = '#00ff00'; // 明るい緑
        } else if (cell.brightness >= 0.5) {
          color = '#008800'; // 中間の緑
        } else if (cell.brightness > 0) {
          color = '#004400'; // 暗い緑
        } else {
          color = '#000000'; // 黒
        }
        output += `<span style="color: ${color};">${cell.char}</span>`;
      }
      output += '\n';
    }
    
    displayOutput(output, terminalBody);
    
    frameCount++;
    
    if (frameCount < maxFrames) {
      setTimeout(animate, 100);
    }
  };
  
  displayOutput('<span style="color: #00ff00;">Starting Matrix animation... (30 frames)</span>\n', terminalBody);
  await sleep(500);
  animate();
  
  // アニメーション完了まで待機
  await sleep(maxFrames * 100 + 500);
}

/**
 * システムをシャットダウン
 */
async function shutdownSystem(terminalBody) {
  const shutdownMessages = [
    'Broadcast message from visitor@portfolio',
    '',
    'The system is going down for poweroff NOW!',
    '',
    'Stopping services...',
    '[  OK  ] Stopped target Multi-User System',
    '[  OK  ] Stopped portfolio services',
    '[  OK  ] Stopped network services',
    '',
    'Unmounting file systems...',
    '[  OK  ] Unmounted /home/visitor/portfolio',
    '',
    'Powering off...',
    ''
  ];

  for (const msg of shutdownMessages) {
    displayOutput(msg, terminalBody);
    await sleep(msg === '' ? 100 : 200);
  }

  await sleep(500);

  // 画面全体を暗転
  const shutdownScreen = document.createElement('div');
  shutdownScreen.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: #000000;
    z-index: 100000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #00ff00;
    font-family: 'JetBrains Mono', monospace;
    font-size: 1.2rem;
    opacity: 0;
    transition: opacity 1s ease;
  `;
  
  const message = document.createElement('div');
  message.style.cssText = `
    text-align: center;
    line-height: 2;
  `;
  message.innerHTML = `
    <div style="font-size: 3rem; margin-bottom: 2rem;">⏻</div>
    <div>System halted.</div>
    <div style="margin-top: 1rem; font-size: 0.9rem; color: #64ffda;">You can close this tab now.</div>
  `;
  
  shutdownScreen.appendChild(message);
  document.body.appendChild(shutdownScreen);
  
  // フェードイン
  requestAnimationFrame(() => {
    shutdownScreen.style.opacity = '1';
  });

  // タブを閉じようと試行（動作する環境でのみ動作）
  await sleep(2000);
  window.close();
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
 * ファイルを削除
 */
async function removeFile(itemId, itemType, terminalBody) {
  // 全削除の場合
  if (itemType === 'all') {
    displayOutput(`<span style="color: #ff6b6b;">⚠️  CRITICAL WARNING: Deleting all files...</span>`, terminalBody);
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
    
    displayOutput(`<span style="color: #10b981;">✓ All files have been removed</span>`, terminalBody);
    displayOutput(`<span style="color: #fbbf24;">💡 ヒント: 元に戻すには 'reboot' コマンドを実行してください</span>`, terminalBody);
    displayOutput(`<span style="color: #ff6b6b;">💀 System is now empty. Type 'reboot' to restore.</span>`, terminalBody);
    return;
  }
  
  // 静的ファイルの削除
  if (itemType === 'static') {
    const fileName = itemId.split('/').pop();
    displayOutput(`<span style="color: #ff6b6b;">⚠️  WARNING: Deleting file '${fileName}'...</span>`, terminalBody);
    await sleep(300);
    
    // about.txt の場合は About セクション全体を削除
    if (fileName === 'about.txt') {
      const section = document.querySelector('#about');
      if (section) {
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        section.style.opacity = '0';
        section.style.transform = 'translateY(-50px)';
        await sleep(800);
        section.remove();
      }
    }
    // contact.txt の場合は Contact セクション全体を削除
    else if (fileName === 'contact.txt') {
      const section = document.querySelector('#contact');
      if (section) {
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        section.style.opacity = '0';
        section.style.transform = 'translateY(-50px)';
        await sleep(800);
        section.remove();
      }
    }
    
    displayOutput(`<span style="color: #10b981;">✓ File '${fileName}' has been removed</span>`, terminalBody);
    displayOutput(`<span style="color: #fbbf24;">💡 ヒント: 元に戻すには 'reboot' コマンドを実行してください</span>`, terminalBody);
    return;
  }
  
  // スキルカードの削除
  if (itemType === 'skill') {
    displayOutput(`<span style="color: #ff6b6b;">⚠️  WARNING: Deleting skill '${itemId}'...</span>`, terminalBody);
    await sleep(300);
    
    // スキルカードを探して削除
    const skillCards = document.querySelectorAll('.skill-card');
    for (const card of skillCards) {
      const skillName = card.querySelector('.skill-name');
      if (skillName && skillName.textContent.toLowerCase().includes(itemId.toLowerCase())) {
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        card.style.opacity = '0';
        card.style.transform = 'scale(0.5) rotate(10deg)';
        await sleep(600);
        card.remove();
        break;
      }
    }
    
    displayOutput(`<span style="color: #10b981;">✓ Skill '${itemId}' has been removed</span>`, terminalBody);
    displayOutput(`<span style="color: #fbbf24;">💡 ヒント: 元に戻すには 'reboot' コマンドを実行してください</span>`, terminalBody);
    return;
  }
  
  // プロジェクトカードの削除
  if (itemType === 'project') {
    displayOutput(`<span style="color: #ff6b6b;">⚠️  WARNING: Deleting project '${itemId}'...</span>`, terminalBody);
    await sleep(300);
    
    // プロジェクトカードを探して削除
    const projectCards = document.querySelectorAll('.project-card');
    for (const card of projectCards) {
      const projectTitle = card.querySelector('.project-title');
      if (projectTitle && projectTitle.textContent.toLowerCase().includes(itemId.toLowerCase().replace('-', ' '))) {
        const cardParent = card.closest('.project-card-link') || card.parentElement;
        cardParent.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        cardParent.style.opacity = '0';
        cardParent.style.transform = 'scale(0.5) rotate(-10deg)';
        await sleep(600);
        cardParent.remove();
        break;
      }
    }
    
    displayOutput(`<span style="color: #10b981;">✓ Project '${itemId}' has been removed</span>`, terminalBody);
    displayOutput(`<span style="color: #fbbf24;">�� ヒント: 元に戻すには 'reboot' コマンドを実行してください</span>`, terminalBody);
    return;
  }
}

/**
 * カーソル位置を考慮して入力表示を更新
 */
function updateInputDisplay(inputTextElement, text, cursorPos) {
  const inputLine = inputTextElement.parentElement;
  
  // 既存のカーソルを削除
  const existingCursor = inputLine.querySelector('.terminal-cursor');
  if (existingCursor) {
    existingCursor.remove();
  }
  
  // テキストをカーソル位置で分割
  const beforeCursor = escapeHtml(text.slice(0, cursorPos));
  const afterCursor = escapeHtml(text.slice(cursorPos));
  
  // テキストとカーソルを設定
  if (afterCursor) {
    // カーソルが途中にある場合
    inputTextElement.innerHTML = beforeCursor + '<span class="terminal-cursor">_</span>' + afterCursor;
  } else {
    // カーソルが末尾にある場合
    inputTextElement.innerHTML = beforeCursor;
    // カーソルを別要素として追加
    const cursor = document.createElement('span');
    cursor.className = 'terminal-cursor';
    cursor.textContent = '_';
    inputTextElement.parentElement.appendChild(cursor);
  }
}

/**
 * プロンプトを表示
 */
function displayPrompt(terminalBody) {
  const promptLine = document.createElement('div');
  promptLine.className = 'terminal-line terminal-input-line';
  const promptPath = getCurrentDirectory().replace('/home/visitor/portfolio', '~');
  promptLine.innerHTML = `<span class="terminal-prompt">visitor@portfolio:${promptPath}$</span> <span class="terminal-input-text"></span><span class="terminal-cursor">_</span>`;
  terminalBody.appendChild(promptLine);
}

/**
 * ターミナルのイベントリスナーを設定
 */
function setupTerminalEventListeners(terminalBody) {
  let currentInput = '';

  // キーボード入力をキャプチャ
  document.addEventListener('keydown', async (e) => {
    const inputLine = terminalBody.querySelector('.terminal-input-line');
    if (!inputLine) return;

    const inputText = inputLine.querySelector('.terminal-input-text');
    if (!inputText) return;

    // Enter キー
    if (e.key === 'Enter') {
      e.preventDefault();
      
      if (currentInput.trim()) {
        // コマンド履歴に追加
        commandHistory.unshift(currentInput);
        historyIndex = -1;
        
        // コマンドを実行
        await executeCommand(currentInput, terminalBody);
      } else {
        // 空のコマンド - 新しいプロンプトのみ表示
        inputLine.classList.remove('terminal-input-line');
        const cursor = inputLine.querySelector('.terminal-cursor');
        if (cursor) cursor.remove();
        displayPrompt(terminalBody);
      }
      
      currentInput = '';
      cursorPosition = 0;
      
      // 最下部にスクロール
      terminalBody.scrollTop = terminalBody.scrollHeight;
      return;
    }

    // Backspace キー
    if (e.key === 'Backspace') {
      e.preventDefault();
      if (cursorPosition > 0) {
        currentInput = currentInput.slice(0, cursorPosition - 1) + currentInput.slice(cursorPosition);
        cursorPosition--;
        updateInputDisplay(inputText, currentInput, cursorPosition);
      }
      // 最下部にスクロール
      terminalBody.scrollTop = terminalBody.scrollHeight;
      return;
    }

    // 左矢印キー (カーソルを左に移動)
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      if (cursorPosition > 0) {
        cursorPosition--;
        updateInputDisplay(inputText, currentInput, cursorPosition);
      }
      return;
    }

    // 右矢印キー (カーソルを右に移動)
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      if (cursorPosition < currentInput.length) {
        cursorPosition++;
        updateInputDisplay(inputText, currentInput, cursorPosition);
      }
      return;
    }

    // 上矢印キー (履歴を遮る)
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        currentInput = commandHistory[historyIndex];
        cursorPosition = currentInput.length;
        inputText.textContent = currentInput;
      }
      return;
    }

    // 下矢印キー (履歴を進む)
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        historyIndex--;
        currentInput = commandHistory[historyIndex];
        cursorPosition = currentInput.length;
        inputText.textContent = currentInput;
      } else if (historyIndex === 0) {
        historyIndex = -1;
        currentInput = '';
        cursorPosition = 0;
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
      currentInput = currentInput.slice(0, cursorPosition) + e.key + currentInput.slice(cursorPosition);
      cursorPosition++;
      updateInputDisplay(inputText, currentInput, cursorPosition);
      // 最下部にスクロール
      terminalBody.scrollTop = terminalBody.scrollHeight;
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
      const result = await cmdInfo.execute(args, { COMMANDS, commandHistory });
      
      if (result === 'CLEAR_TERMINAL') {
        clearTerminal(terminalBody);
      } else if (result === 'MATRIX_ANIMATION') {
        await playMatrixAnimation(terminalBody);
      } else if (result === 'SHUTDOWN_SYSTEM') {
        await shutdownSystem(terminalBody);
        return; // shutdown後はプロンプトを表示しない
      } else if (result === 'REBOOT_SYSTEM') {
        await rebootSystem(terminalBody);
        return; // reboot後はプロンプトを表示しない
      } else if (result.startsWith('RM_FILE:')) {
        const parts = result.split(':');
        const itemId = parts[1];
        const itemType = parts[2];
        await removeFile(itemId, itemType, terminalBody);
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
    
    // rm コマンドの場合はファイル名を補完
    if (command === 'rm') {
      return await getPathCompletions(lastArg);
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
  let targetDir = getCurrentDirectory();
  let prefix = partial;
  
  // パスが含まれている場合
  if (partial.includes('/')) {
    const lastSlash = partial.lastIndexOf('/');
    const dirPart = partial.substring(0, lastSlash);
    prefix = partial.substring(lastSlash + 1);
    targetDir = normalizePath(dirPart);
  }
  
  // ディレクトリの内容を取得
  if (fileSystem[targetDir]) {
    let contents = [];
    
    // skills ディレクトリの動的コンテンツ
    if (targetDir === '/home/visitor/portfolio/skills') {
      const skills = await getSkillDetails();
      contents = Object.keys(skills)
        .filter(id => !isDeleted(id, 'skill'))
        .map(id => `${id}.txt`);
    }
    // projects ディレクトリの動的コンテンツ
    else if (targetDir === '/home/visitor/portfolio/projects') {
      const projects = await getProjectDetails();
      contents = Object.keys(projects)
        .filter(id => !isDeleted(id, 'project'))
        .map(id => `${id}.txt`);
    }
    // 静的ファイル・ディレクトリ
    else {
      contents = [...fileSystem[targetDir].contents].filter(item => {
        const fullPath = `${targetDir}/${item}`.replace(/\/+/g, '/');
        return !isDeleted(fullPath, 'file');
      });
    }
    
    // プレフィックスに一致するものをフィルタ
    const filtered = contents.filter(item => 
      item.toLowerCase().startsWith(prefix.toLowerCase())
    );
    
    // パスを再構築
    if (partial.includes('/')) {
      const dirPart = partial.substring(0, partial.lastIndexOf('/') + 1);
      suggestions.push(...filtered.map(item => dirPart + item));
    } else {
      suggestions.push(...filtered);
    }
  }
  
  return suggestions;
}
