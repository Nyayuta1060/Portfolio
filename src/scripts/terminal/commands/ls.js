/**
 * ls コマンド
 */

import { getCurrentDirectory, fileSystem, normalizePath } from '../fileSystem.js';
import { getProjectDetails } from '../../projectsData.js';
import { getSkillDetails } from '../../skillsData.js';

export const lsCommand = {
  description: 'ファイルとディレクトリを一覧表示',
  execute: async (args) => {
    let targetPath = getCurrentDirectory();
    
    if (args.length > 0) {
      targetPath = normalizePath(args[0]);
    }
    
    if (!fileSystem[targetPath]) {
      return `ls: ${args[0] || targetPath}: そのようなファイルやディレクトリはありません`;
    }
    
    if (fileSystem[targetPath].type === 'file') {
      return args[0] || targetPath.split('/').pop();
    }
    
    let contents = [...fileSystem[targetPath].contents];
    
    // skills ディレクトリの場合、動的にスキル一覧を生成
    if (targetPath === '/home/visitor/portfolio/skills') {
      const skills = await getSkillDetails();
      contents = Object.keys(skills).map(id => `${id}.txt`);
    }
    
    // projects ディレクトリの場合、動的にプロジェクト一覧を生成
    if (targetPath === '/home/visitor/portfolio/projects') {
      const projects = await getProjectDetails();
      contents = Object.keys(projects).map(id => `${id}.txt`);
    }
    
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
