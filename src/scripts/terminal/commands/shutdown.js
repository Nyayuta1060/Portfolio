/**
 * shutdown コマンド
 */

export const shutdownCommand = {
  description: 'terminal.commands.shutdown.description',
  execute: () => {
    return 'SHUTDOWN_SYSTEM';
  }
};
