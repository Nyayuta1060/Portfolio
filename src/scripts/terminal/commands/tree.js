/**
 * tree コマンド - ディレクトリ構造をツリー表示
 */

import { getCurrentDirectory, fileSystem } from '../fileSystem.js';
import { getProjectDetails } from '../../projectsData.js';
import { getSkillDetails } from '../../skillsData.js';

export const treeCommand = {
  description: 'terminal.commands.tree.description',
  execute: async (args) => {
    const startDir = getCurrentDirectory();
    let output = startDir + '\n';
    
    // ディレクトリのツリーを再帰的に構築
    const buildTree = async (path, prefix = '', isLast = true) => {
      let result = '';
      
      if (!fileSystem[path]) return result;
      
      const contents = [...fileSystem[path].contents];
      
      // skills ディレクトリの動的コンテンツ
      if (path === '/home/visitor/portfolio/skills') {
        const skills = await getSkillDetails();
        contents.push(...Object.keys(skills).map(id => `${id}.txt`));
      }
      
      // projects ディレクトリの動的コンテンツ
      if (path === '/home/visitor/portfolio/projects') {
        const projects = await getProjectDetails();
        contents.push(...Object.keys(projects).map(id => `${id}.txt`));
      }
      
      for (let i = 0; i < contents.length; i++) {
        const item = contents[i];
        const isLastItem = i === contents.length - 1;
        const fullPath = path + '/' + item;
        const connector = isLastItem ? '└── ' : '├── ';
        const newPrefix = prefix + (isLastItem ? '    ' : '│   ');
        
        const isDir = fileSystem[fullPath]?.type === 'directory';
        const displayName = isDir ? `<span class="directory">${item}</span>` : item;
        
        result += prefix + connector + displayName + '\n';
        
        // ディレクトリの場合は再帰的に展開
        if (isDir) {
          result += await buildTree(fullPath, newPrefix, isLastItem);
        }
      }
      
      return result;
    };
    
    output += await buildTree(startDir);
    
    return output;
  }
};
