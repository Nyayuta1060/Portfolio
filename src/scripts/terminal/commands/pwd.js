/**
 * pwd コマンド
 */

import { getCurrentDirectory } from '../fileSystem.js';

export const pwdCommand = {
  description: '現在のディレクトリを表示',
  execute: () => getCurrentDirectory()
};
