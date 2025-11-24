/**
 * cd コマンド
 */

import { getCurrentDirectory, setCurrentDirectory, fileSystem, normalizePath } from '../fileSystem.js';

export const cdCommand = {
  description: 'ディレクトリを移動 (例: cd skills, cd ..)',
  execute: (args) => {
    if (args.length === 0) {
      setCurrentDirectory('/home/visitor/portfolio');
      return '';
    }
    
    const targetPath = normalizePath(args[0]);
    
    if (fileSystem[targetPath] && fileSystem[targetPath].type === 'directory') {
      setCurrentDirectory(targetPath);
      return '';
    } else if (fileSystem[targetPath] && fileSystem[targetPath].type === 'file') {
      return `cd: ${args[0]}: Not a directory`;
    } else {
      return `cd: ${args[0]}: No such file or directory`;
    }
  }
};
