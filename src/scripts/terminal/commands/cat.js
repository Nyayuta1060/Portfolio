/**
 * cat コマンド
 */

import { fileSystem, normalizePath } from '../fileSystem.js';
import { getProjectDetails } from '../../projectsData.js';
import { getSkillDetails } from '../../skillsData.js';
import i18n from '../../i18n.js';

export const catCommand = {
  description: 'terminal.commands.cat.description',
  execute: async (args) => {
    if (args.length === 0) {
      return `cat: ${i18n.t('terminal.commands.cat.noFileSpecified')}\n${i18n.t('terminal.commands.cat.usage')}`;
    }
    
    const targetPath = normalizePath(args[0]);
    
    // まず完全一致でファイルシステムをチェック
    if (!fileSystem[targetPath]) {
      // skills ディレクトリ内のファイル（.txt拡張子が必須）
      if (targetPath.startsWith('/home/visitor/portfolio/skills/') && targetPath.endsWith('.txt')) {
        const skillId = targetPath.split('/').pop().replace('.txt', '');
        const skills = await getSkillDetails();
        const skill = skills[skillId];
        
        if (skill) {
          return `${i18n.t('terminal.commands.cat.skill')}: ${skill.name}
${i18n.t('terminal.commands.cat.level')}: ${skill.level}
${i18n.t('terminal.commands.cat.frequency')}: ${skill.frequency}

${i18n.t('terminal.commands.cat.mainUsage')}:
${skill.usage}

${i18n.t('terminal.commands.cat.experience')}:
${skill.experience}

${i18n.t('terminal.commands.cat.comment')}:
${skill.comment}

${i18n.t('terminal.commands.cat.links')}:
${skill.links.official ? `  ${i18n.t('terminal.commands.cat.official')}: ${skill.links.official}` : ''}
${skill.links.github ? `  GitHub: ${skill.links.github}` : ''}`;
        }
      }
      
      // projects ディレクトリ内のファイル（.txt拡張子が必須）
      if (targetPath.startsWith('/home/visitor/portfolio/projects/') && targetPath.endsWith('.txt')) {
        const projectId = targetPath.split('/').pop().replace('.txt', '');
        const projects = await getProjectDetails();
        const project = projects[projectId];
        
        if (project) {
          return `${i18n.t('terminal.commands.cat.project')}: ${project.title}

${i18n.t('terminal.commands.cat.projectDescription')}:
${project.description}

${i18n.t('terminal.commands.cat.techStack')}:
${project.techStack ? project.techStack.join(', ') : 'N/A'}

GitHub: ${project.github || 'N/A'}`;
        }
      }
      
      return `cat: ${args[0]}: ${i18n.t('terminal.commands.cat.noSuchFileOrDirectory')}`;
    }
    
    if (fileSystem[targetPath].type === 'directory') {
      return `cat: ${args[0]}: Is a directory`;
    }
    
    return fileSystem[targetPath].content;
  }
};
