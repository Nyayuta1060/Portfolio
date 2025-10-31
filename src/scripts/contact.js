 // ========== コンタクト機能 ==========

/**
 * メールアドレスのスパム対策付き初期化
 * メールアドレスを動的に生成してスクレイピングボットから保護
 */
export function initializeContactProtection() {
  console.log('📧 Initializing Contact Protection...');
  try {
    // メールアドレスデータ(難読化)
    const emailData = [
      {
        id: 'school-email',
        user: 'rp24149r',
        domain: 'st.omu.ac.jp',
        label: '学校用メール'
      },
      {
        id: 'personal-email',
        user: 'nyayuta.works',
        domain: 'gmail.com',
        label: '個人用メール'
      }
    ];

    // 各メールアドレスを初期化
    emailData.forEach(data => {
      initializeEmailAddress(data);
    });

    console.log('✅ Contact protection initialized');
  } catch (error) {
    console.error('❌ Contact protection error:', error);
    // エラーがあっても他の機能は動作するように、エラーを握りつぶす
  }
}

/**
 * メールアドレスセクション全体を初期化
 * @param {Object} data - メールアドレスデータ
 */
function initializeEmailAddress(data) {
  const container = document.querySelector(`[data-email-container="${data.id}"]`);
  if (!container) {
    console.warn(`Container not found for ${data.id}`);
    return;
  }

  // アクションボタンが既に存在する場合はスキップ
  if (container.querySelector('.email-actions')) {
    return;
  }

  const email = `${data.user}@${data.domain}`;
  const emailLinkElement = container.querySelector(`[data-email-id="${data.id}"]`);
  
  if (!emailLinkElement) {
    console.warn(`Email link element not found for ${data.id}`);
    return;
  }
  
  // メールアドレスを設定
  emailLinkElement.textContent = email;
  emailLinkElement.className = 'email-address';
  emailLinkElement.removeAttribute('href');
  emailLinkElement.setAttribute('role', 'button');
  emailLinkElement.setAttribute('tabindex', '0');
  emailLinkElement.setAttribute('aria-label', `${data.label}: ${email}`);
  
  // 親要素を取得
  const parent = emailLinkElement.parentElement;
  
  // メールアドレス表示エリアを作成
  const emailDisplay = document.createElement('div');
  emailDisplay.className = 'contact-email-display';
  
  const emailIcon = document.createElement('i');
  emailIcon.className = 'fas fa-at email-icon';
  
  emailDisplay.appendChild(emailIcon);
  emailDisplay.appendChild(emailLinkElement);
  
  // クリックでコピー
  emailLinkElement.addEventListener('click', (e) => {
    e.preventDefault();
    copyToClipboard(email, emailLinkElement);
  });
  
  // Enterキーでもコピー
  emailLinkElement.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      copyToClipboard(email, emailLinkElement);
    }
  });
  
  // アクションボタンのコンテナを作成
  const actionsWrapper = document.createElement('div');
  actionsWrapper.className = 'email-actions';
  
  // メーラーで開くボタン
  const mailtoButton = document.createElement('button');
  mailtoButton.className = 'email-action-btn email-mailto-btn';
  mailtoButton.setAttribute('aria-label', 'メールアプリで開く');
  mailtoButton.innerHTML = '<i class="fas fa-envelope"></i><span>メーラー</span>';
  mailtoButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = `mailto:${email}`;
    showTooltip(mailtoButton, 'メーラーを開きました');
  });
  
  // コピーボタンを作成
  const copyButton = document.createElement('button');
  copyButton.className = 'email-action-btn email-copy-btn';
  copyButton.setAttribute('aria-label', 'メールアドレスをコピー');
  copyButton.innerHTML = '<i class="fas fa-copy"></i><span>コピー</span>';
  copyButton.addEventListener('click', (e) => {
    e.preventDefault();
    copyToClipboard(email, copyButton);
  });

  // ボタンを追加
  actionsWrapper.appendChild(mailtoButton);
  actionsWrapper.appendChild(copyButton);
  
  // 新しい構造を追加
  parent.innerHTML = '';
  parent.appendChild(emailDisplay);
  parent.appendChild(actionsWrapper);
}

/**
 * クリップボードにコピー
 * @param {string} text - コピーするテキスト
 * @param {HTMLElement} button - クリックされたボタン要素
 */
async function copyToClipboard(text, button) {
  try {
    await navigator.clipboard.writeText(text);
    showCopyFeedback(button, true);
  } catch (error) {
    // フォールバック: 古いブラウザ用
    const success = fallbackCopyToClipboard(text);
    showCopyFeedback(button, success);
  }
}

/**
 * フォールバック: 古いブラウザ向けコピー機能
 * @param {string} text - コピーするテキスト
 * @returns {boolean} 成功したかどうか
 */
function fallbackCopyToClipboard(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  textArea.style.top = '-999999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  
  try {
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch (error) {
    document.body.removeChild(textArea);
    return false;
  }
}

/**
 * コピー成功のフィードバックを表示
 * @param {HTMLElement} button - ボタン要素
 * @param {boolean} success - 成功したかどうか
 */
function showCopyFeedback(button, success) {
  const originalHTML = button.innerHTML;
  
  if (success) {
    button.innerHTML = '<i class="fas fa-check"></i>';
    button.classList.add('copied');
    
    // フィードバックツールチップを表示
    showTooltip(button, 'コピーしました!');
    
    // 2秒後に元に戻す
    setTimeout(() => {
      button.innerHTML = originalHTML;
      button.classList.remove('copied');
    }, 2000);
  } else {
    button.innerHTML = '<i class="fas fa-times"></i>';
    button.classList.add('copy-error');
    
    showTooltip(button, 'コピーに失敗しました');
    
    setTimeout(() => {
      button.innerHTML = originalHTML;
      button.classList.remove('copy-error');
    }, 2000);
  }
}

/**
 * ツールチップを表示
 * @param {HTMLElement} element - 表示する要素
 * @param {string} message - メッセージ
 */
function showTooltip(element, message) {
  // 既存のツールチップを削除
  const existingTooltip = document.querySelector('.email-tooltip');
  if (existingTooltip) {
    existingTooltip.remove();
  }

  // ツールチップを作成
  const tooltip = document.createElement('div');
  tooltip.className = 'email-tooltip';
  tooltip.textContent = message;
  
  // 位置を計算
  const rect = element.getBoundingClientRect();
  tooltip.style.position = 'fixed';
  tooltip.style.top = `${rect.top - 40}px`;
  tooltip.style.left = `${rect.left + rect.width / 2}px`;
  tooltip.style.transform = 'translateX(-50%)';
  
  document.body.appendChild(tooltip);
  
  // アニメーション
  requestAnimationFrame(() => {
    tooltip.classList.add('show');
  });
  
  // 2秒後に削除
  setTimeout(() => {
    tooltip.classList.remove('show');
    setTimeout(() => tooltip.remove(), 300);
  }, 2000);
}

/**
 * メールアドレスの難読化(追加の保護層)
 * ROT13エンコーディングを使用
 * @param {string} email - メールアドレス
 * @returns {string} エンコードされたメールアドレス
 */
export function encodeEmail(email) {
  return email.replace(/[a-zA-Z]/g, (char) => {
    const start = char <= 'Z' ? 65 : 97;
    return String.fromCharCode(start + (char.charCodeAt(0) - start + 13) % 26);
  });
}

/**
 * エンコードされたメールアドレスをデコード
 * @param {string} encodedEmail - エンコードされたメールアドレス
 * @returns {string} デコードされたメールアドレス
 */
export function decodeEmail(encodedEmail) {
  return encodeEmail(encodedEmail); // ROT13は対称なので同じ関数
}
