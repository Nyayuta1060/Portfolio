/**
 * help コマンド
 */

export const helpCommand = {
  description: '利用可能なコマンド一覧を表示',
  execute: (args, { COMMANDS }) => {
    const commandList = Object.entries(COMMANDS)
      .map(([cmd, info]) => `  <span class="command-name">${cmd.padEnd(15)}</span> ${info.description}`)
      .join('\n');
    return `利用可能なコマンド:\n${commandList}\n\nヒント: Tab キーでオートコンプリート、↑↓ キーで履歴を参照できます`;
  }
};
