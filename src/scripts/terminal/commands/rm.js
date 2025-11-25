/**
 * rm コマンド
 */

import { fileSystem, normalizePath, markAsDeleted } from '../fileSystem.js';
import { getProjectDetails } from '../../projectsData.js';
import { getSkillDetails } from '../../skillsData.js';

export const rmCommand = {
  description: 'ファイルを削除 (例: rm about.txt, rm skills/html.txt)',
  execute: async (args) => {
    if (args.length === 0) {
      return 'rm: オペランドがありません\n使用例: rm about.txt, rm skills/html.txt, rm *';
    }
    
    const target = args[0];
    
    // rm * または rm -rf の場合は全削除
    if (target === '*' || args.join(' ').includes('-rf')) {
      return 'RM_FILE:*:all';
    }
    
    // パスを正規化
    const targetPath = normalizePath(target);
    
    // ファイルシステム上の静的ファイル
    if (fileSystem[targetPath]) {
      if (fileSystem[targetPath].type === 'directory') {
        return `rm: '${target}' を削除できません: ディレクトリです\nヒント: ディレクトリを削除するには 'rm -r ${target}' を使用してください`;
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
    
    return `rm: '${target}' を削除できません: そのようなファイルやディレクトリはありません`;
  }
};
