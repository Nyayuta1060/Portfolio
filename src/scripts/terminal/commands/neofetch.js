/**
 * neofetch コマンド
 */

export const neofetchCommand = {
  description: 'システム情報を表示',
  execute: (args, { COMMANDS }) => {
    return `
      ___           visitor@portfolio
     (.. |          ─────────────────
     (<> |          OS: Portfolio v1.0
    / __  \\         Shell: interactive-terminal
   ( /  \\ /|        Browser: ${navigator.userAgent.split(' ').pop()}
  _/\\ __)/_)        Skills: ${Object.keys(COMMANDS).length} commands
  \\/-____\\/         Uptime: ${Math.floor(performance.now() / 1000)}s`;
  }
};
