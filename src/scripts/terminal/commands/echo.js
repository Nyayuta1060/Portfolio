/**
 * echo コマンド
 */

export const echoCommand = {
  description: 'テキストを表示 (例: echo Hello)',
  execute: (args) => args.join(' ')
};
