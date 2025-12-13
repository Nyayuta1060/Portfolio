/**
 * cd コマンド
 */

import { getCurrentDirectory, setCurrentDirectory, fileSystem, normalizePath } from '../fileSystem.js';
import i18n from '../../i18n.js';

export const cdCommand = {
  description: 'terminal.commands.cd.description',
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
      return `cd: ${args[0]}: ${i18n.t('terminal.commands.cd.notADirectory')}`;
    } else {
      return `cd: ${args[0]}: ${i18n.t('terminal.commands.cd.noSuchFileOrDirectory')}`;
    }
  }
};
