/**
 * twitter コマンド
 */

export const twitterCommand = {
  description: 'Twitterプロフィールを開く',
  execute: () => {
    window.open('https://twitter.com/Nyayuta0717', '_blank');
    return 'Twitterプロフィールを開きました';
  }
};
