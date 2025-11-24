/**
 * reboot コマンド
 */

export const rebootCommand = {
  description: 'システムを再起動',
  execute: () => {
    return 'REBOOT_SYSTEM';
  }
};
