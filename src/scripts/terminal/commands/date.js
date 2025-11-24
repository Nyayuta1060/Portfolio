/**
 * date コマンド
 */

export const dateCommand = {
  description: '現在の日時を表示',
  execute: () => new Date().toLocaleString('ja-JP')
};
