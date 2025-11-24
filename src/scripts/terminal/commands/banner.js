/**
 * banner コマンド
 */

export const bannerCommand = {
  description: 'ウェルカムバナーを表示',
  execute: () => {
    return `
╔═══════════════════════════════════════╗
║　　　　　　　　　　　　　　　　　　　║
║ Welcome to Nyayuta's Portfolio OS   ║
║　　　　　　　　　　　　　　　　　　　║
║　大阪公立大学工業高等専門学校　　　║
║　知能情報コース 2年生　　　　　　　║
║　　　　　　　　　　　　　　　　　　　║
╚═══════════════════════════════════════╝

Type 'help' to see available commands`;
  }
};
