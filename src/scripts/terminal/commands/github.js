/**
 * github コマンド
 */

export const githubCommand = {
  description: 'terminal.commands.github.description',
  execute: () => {
    window.open('https://github.com/Nyayuta1060', '_blank');
    return 'GitHubプロフィールを開きました';
  }
};
