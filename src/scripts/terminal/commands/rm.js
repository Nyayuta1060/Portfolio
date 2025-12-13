/**
 * rm コマンド
 */

import { fileSystem, normalizePath, markAsDeleted } from '../fileSystem.js';
import { getProjectDetails } from '../../projectsData.js';
import { getSkillDetails } from '../../skillsData.js';
import i18n from '../../i18n.js';

export const rmCommand = {
  description: 'terminal.commands.rm.description',
  execute: async (args) => {
    if (args.length === 0) {
      return `rm: ${i18n.t('terminal.commands.rm.noOperand')}\n${i18n.t('terminal.commands.rm.usage')}`;
    }
    
    // -rフラグをチェック
    const hasRecursiveFlag = args.includes('-r') || args.includes('-rf') || args.includes('-fr');
    const target = args.find(arg => !arg.startsWith('-')) || args[args.length - 1];
    
    // rm * または rm -rf の場合は全削除
    if (target === '*' || (hasRecursiveFlag && args.length === 2 && !target)) {
      return 'RM_FILE:*:all';
    }
    
    // パスを正規化
    const targetPath = normalizePath(target);
    
    // ファイルシステム上の静的ファイル
    if (fileSystem[targetPath]) {
      if (fileSystem[targetPath].type === 'directory') {
        if (!hasRecursiveFlag) {
          return `rm: '${target}' ${i18n.t('terminal.commands.rm.cannotRemoveDirectory')}\n${i18n.t('terminal.commands.rm.hint').replace('{0}', target)}`;
        }
        // -rフラグがある場合はディレクトリを削除
        markAsDeleted(targetPath, 'directory');
        
        // skillsディレクトリの場合は特別な処理
        if (targetPath === '/home/visitor/portfolio/skills') {
          return 'RM_FILE:skills:directory';
        }
        // projectsディレクトリの場合は特別な処理
        if (targetPath === '/home/visitor/portfolio/projects') {
          return 'RM_FILE:projects:directory';
        }
        
        return `RM_FILE:${targetPath}:static`;
      }
      markAsDeleted(targetPath, 'file');
      return `RM_FILE:${targetPath}:static`;
    }
    
    // skills ディレクトリ内のファイル
    if (targetPath.startsWith('/home/visitor/portfolio/skills/')) {
      const fileName = targetPath.split('/').pop();
      const skillId = fileName.endsWith('.txt') ? fileName.slice(0, -4) : fileName;
      const skills = await getSkillDetails();
      if (skills[skillId]) {
        markAsDeleted(skillId, 'skill');
        return `RM_FILE:${skillId}:skill`;
      }
    }
    
    // projects ディレクトリ内のファイル
    if (targetPath.startsWith('/home/visitor/portfolio/projects/')) {
      const fileName = targetPath.split('/').pop();
      const projectId = fileName.endsWith('.txt') ? fileName.slice(0, -4) : fileName;
      const projects = await getProjectDetails();
      if (projects[projectId]) {
        markAsDeleted(projectId, 'project');
        return `RM_FILE:${projectId}:project`;
      }
    }
    
    return `rm: '${target}' ${i18n.t('terminal.commands.rm.noSuchFileOrDirectory')}`;
  }
};
