/**
 * サイト全体のブートシーケンス演出
 */

/**
 * ブートスクリーンを作成
 */
function createBootScreen() {
  // boot-readyクラスを追加してメインコンテンツのレンダリングを許可（裏で）
  document.body.classList.add('boot-ready');

  const bootScreen = document.createElement('div');
  bootScreen.id = 'boot-screen';
  bootScreen.className = 'boot-screen active';

  const bootTerminal = document.createElement('div');
  bootTerminal.className = 'boot-terminal';

  bootScreen.appendChild(bootTerminal);
  document.body.appendChild(bootScreen);

  return bootTerminal;
}

/**
 * ブートメッセージを表示
 */
async function displayBootMessages(container) {
  const bootMessages = [
    { text: '[  0.000000] Portfolio OS v1.0 booting...', delay: 50 },
    { text: '[  0.123456] Initializing system components', delay: 80 },
    { text: '[  0.234567] Loading kernel modules', delay: 60 },
    { text: '[  0.345678] Mounting file systems', delay: 70 },
    { text: '[  0.456789] Starting network services', delay: 90 },
    { text: '[  0.567890] Checking dependencies', delay: 60 },
    { text: '[  0.678901] Loading user interface', delay: 100 },
    { text: '[  0.789012] Initializing graphics', delay: 80 },
    { text: '[  0.890123] Starting web services', delay: 70 },
    { text: '[  0.901234] Loading portfolio data', delay: 90 },
    { text: '[  1.012345] System ready', delay: 100 },
    { text: '', delay: 200 },
    { text: '╔═══════════════════════════════════════╗', },
    { text: '║                                       ║', },
    { text: '║ Welcome to Nyayuta\'s Portfolio OS     ║', },
    { text: '║                                       ║', },
    { text: '║ 大阪公立大学工業高等専門学校              ║', },
    { text: '║ 知能情報コース 3年生                     ║', },
    { text: '║                                       ║', },
    { text: '╚═══════════════════════════════════════╝', },
    { text: '', delay: 300 },
    { text: 'Press any key to continue...', delay: 0 }
  ];

  for (const message of bootMessages) {
    const line = document.createElement('div');
    line.className = 'boot-line';
    line.textContent = message.text;
    container.appendChild(line);

    // 最下部にスクロール
    container.scrollTop = container.scrollHeight;

    if (message.delay > 0) {
      await sleep(message.delay);
    }
  }

  // 最後の行を点滅させる
  const lastLine = container.lastElementChild;
  if (lastLine) {
    lastLine.classList.add('blink');
  }
}

/**
 * ブートスクリーンを削除
 */
function removeBootScreen() {
  const bootScreen = document.getElementById('boot-screen');
  if (bootScreen) {
    bootScreen.classList.add('fade-out');
    setTimeout(() => {
      bootScreen.remove();
      // メインコンテンツを表示
      document.body.classList.remove('booting');
    }, 500);
  }
}

/**
 * スリープ関数
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * ブートシーケンスを初期化
 */
export async function initializeBootSequence() {
  console.log('🚀 Starting boot sequence...');

  // ブートスクリーンを作成
  const bootTerminal = createBootScreen();

  // ブートメッセージを表示
  await displayBootMessages(bootTerminal);

  // キー入力またはクリックで続行
  return new Promise((resolve) => {
    const continueHandler = () => {
      document.removeEventListener('keydown', continueHandler);
      document.removeEventListener('click', continueHandler);
      removeBootScreen();
      setTimeout(resolve, 500);
    };

    document.addEventListener('keydown', continueHandler);
    document.addEventListener('click', continueHandler);
  });
}
