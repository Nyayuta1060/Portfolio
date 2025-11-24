/**
 * github コマンド
 */

export const githubCommand = {
  description: 'GitHubプロフィールを開く',
  execute: () => {
    window.open('https://github.com/Nyayuta1060', '_blank');
    return 'GitHubプロフィールを開きました';
  }
};
