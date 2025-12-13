/**
 * pwd コマンド
 */

import { getCurrentDirectory } from '../fileSystem.js';

export const pwdCommand = {
  description: 'terminal.commands.pwd.description',
  execute: () => getCurrentDirectory()
};
