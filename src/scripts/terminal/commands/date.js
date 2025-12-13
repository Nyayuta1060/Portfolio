/**
 * date コマンド
 */

export const dateCommand = {
  description: 'terminal.commands.date.description',
  execute: () => new Date().toLocaleString('ja-JP')
};
