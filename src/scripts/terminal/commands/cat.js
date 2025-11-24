/**
 * cat コマンド
 */

import { fileSystem, normalizePath } from '../fileSystem.js';
import { getProjectDetails } from '../../projectsData.js';
import { getSkillDetails } from '../../skillsData.js';

export const catCommand = {
  description: 'ファイル内容を表示 (例: cat about.txt)',
  execute: async (args) => {
    if (args.length === 0) {
      return 'cat: ファイル名を指定してください\n使用例: cat about.txt, cat README.md';
    }
    
    const targetPath = normalizePath(args[0]);
    
    if (!fileSystem[targetPath]) {
      // skills ディレクトリ内のファイル
      if (targetPath.startsWith('/home/visitor/portfolio/skills/')) {
        const skillId = targetPath.split('/').pop().replace('.txt', '');
        const skills = await getSkillDetails();
        const skill = skills[skillId];
        
        if (skill) {
          return `スキル: ${skill.name}
レベル: ${skill.level}
頻度: ${skill.frequency}

主な用途:
${skill.usage}

使用期間:
${skill.experience}

コメント:
${skill.comment}

リンク:
${skill.links.official ? `  公式: ${skill.links.official}` : ''}
${skill.links.github ? `  GitHub: ${skill.links.github}` : ''}`;
        }
      }
      
      // projects ディレクトリ内のファイル
      if (targetPath.startsWith('/home/visitor/portfolio/projects/')) {
        const projectId = targetPath.split('/').pop().replace('.txt', '');
        const projects = await getProjectDetails();
        const project = projects[projectId];
        
        if (project) {
          return `プロジェクト: ${project.title}

説明:
${project.description}

技術スタック:
${project.techStack ? project.techStack.join(', ') : 'N/A'}

GitHub: ${project.github || 'N/A'}`;
        }
      }
      
      return `cat: ${args[0]}: そのようなファイルやディレクトリはありません`;
    }
    
    if (fileSystem[targetPath].type === 'directory') {
      return `cat: ${args[0]}: ディレクトリです`;
    }
    
    return fileSystem[targetPath].content;
  }
};
