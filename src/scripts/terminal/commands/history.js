/**
 * history コマンド
 */

export const historyCommand = {
  description: 'terminal.commands.history.description',
  execute: (args, { commandHistory }) => {
    if (commandHistory.length === 0) {
      return 'コマンド履歴はありません';
    }
    return commandHistory.map((cmd, i) => `  ${(i + 1).toString().padStart(4)} ${cmd}`).join('\n');
  }
};
