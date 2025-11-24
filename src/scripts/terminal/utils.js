/**
 * ターミナルユーティリティ関数
 */

/**
 * スリープ関数
 */
export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * HTMLエスケープ
 */
export function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

/**
 * 共通プレフィックスを取得
 */
export function getCommonPrefix(strings) {
  if (strings.length === 0) return '';
  if (strings.length === 1) return strings[0];
  
  let prefix = '';
  const firstString = strings[0];
  
  for (let i = 0; i < firstString.length; i++) {
    const char = firstString[i];
    if (strings.every(str => str[i] === char)) {
      prefix += char;
    } else {
      break;
    }
  }
  
  return prefix;
}
