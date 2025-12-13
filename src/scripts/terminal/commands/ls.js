/**
 * ls コマンド
 */

import { getCurrentDirectory, fileSystem, normalizePath, isDeleted } from '../fileSystem.js';
import { getProjectDetails } from '../../projectsData.js';
import { getSkillDetails } from '../../skillsData.js';
import i18n from '../../i18n.js';

export const lsCommand = {
  description: 'terminal.commands.ls.description',
  execute: async (args) => {
    let targetPath = getCurrentDirectory();
    
    if (args.length > 0) {
      targetPath = normalizePath(args[0]);
    }
    
    if (!fileSystem[targetPath]) {
      return `ls: cannot access '${args[0] || targetPath}': ${i18n.t('terminal.commands.ls.noSuchFileOrDirectory')}`;
    }
    
    if (fileSystem[targetPath].type === 'file') {
      return args[0] || targetPath.split('/').pop();
    }
    
    let contents = [...fileSystem[targetPath].contents];
    
    // skills ディレクトリの場合、動的にスキル一覧を生成
    if (targetPath === '/home/visitor/portfolio/skills') {
      const skills = await getSkillDetails();
      contents = Object.keys(skills)
        .filter(id => !isDeleted(id, 'skill'))
        .map(id => `${id}.txt`);
    }
    
    // projects ディレクトリの場合、動的にプロジェクト一覧を生成
    if (targetPath === '/home/visitor/portfolio/projects') {
      const projects = await getProjectDetails();
      contents = Object.keys(projects)
        .filter(id => !isDeleted(id, 'project'))
        .map(id => `${id}.txt`);
    }
    
    // 静的ファイルの削除チェック
    contents = contents.filter(item => {
      const fullPath = targetPath + '/' + item;
      return !isDeleted(fullPath, 'file');
    });
    
    if (contents.length === 0) {
      return '(空のディレクトリ)';
    }
    
    return contents.map(item => {
      const fullPath = targetPath + '/' + item;
      const isDir = fileSystem[fullPath]?.type === 'directory' || 
                    targetPath === '/home/visitor/portfolio/skills' ||
                    targetPath === '/home/visitor/portfolio/projects';
      return isDir && !item.includes('.') ? `<span class="directory">${item}/</span>` : item;
    }).join('  ');
  }
};
