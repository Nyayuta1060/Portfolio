/**
 * echo コマンド
 */

export const echoCommand = {
  description: 'terminal.commands.echo.description',
  execute: (args) => args.join(' ')
};
