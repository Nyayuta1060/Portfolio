/**
 * shutdown コマンド
 */

export const shutdownCommand = {
  description: 'システムをシャットダウン',
  execute: () => {
    return 'SHUTDOWN_SYSTEM';
  }
};
