/**
 * twitter コマンド
 */

export const twitterCommand = {
  description: 'terminal.commands.twitter.description',
  execute: () => {
    window.open('https://twitter.com/Nyayuta0717', '_blank');
    return 'Twitterプロフィールを開きました';
  }
};
