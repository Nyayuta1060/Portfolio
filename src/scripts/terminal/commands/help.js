/**
 * help コマンド
 */

import i18n from '../../i18n.js';

export const helpCommand = {
  description: 'terminal.commands.help.description',
  execute: (args, { COMMANDS }) => {
    const commandList = Object.entries(COMMANDS)
      .map(([cmd, info]) => {
        const desc = info.description.startsWith('terminal.') 
          ? i18n.t(info.description) 
          : info.description;
        return `  <span class="command-name">${cmd.padEnd(15)}</span> ${desc}`;
      })
      .join('\n');
    return `${i18n.t('terminal.commands.help.output')}\n${commandList}\n\n${i18n.t('terminal.commands.help.hint')}`;
  }
};
