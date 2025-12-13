/**
 * banner コマンド
 */

export const bannerCommand = {
  description: 'terminal.commands.banner.description',
  execute: () => {
    return `<span class="banner-text">
╔═══════════════════════════════════════╗
║                                       ║
║ Welcome to Nyayuta's Portfolio OS     ║
║                                       ║
║  大阪公立大学工業高等専門学校              ║
║  知能情報コース 2年生                    ║
║                                       ║
╚═══════════════════════════════════════╝</span>

Type 'help' to see available commands`;
  }
};
