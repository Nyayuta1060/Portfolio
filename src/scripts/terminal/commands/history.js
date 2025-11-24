/**
 * history コマンド
 */

export const historyCommand = {
  description: 'コマンド履歴を表示',
  execute: (args, { commandHistory }) => {
    if (commandHistory.length === 0) {
      return 'コマンド履歴はありません';
    }
    return commandHistory.map((cmd, i) => `  ${(i + 1).toString().padStart(4)} ${cmd}`).join('\n');
  }
};
