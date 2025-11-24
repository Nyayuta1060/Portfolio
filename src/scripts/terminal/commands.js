/**
 * コマンド定義
 */

import { helpCommand } from './commands/help.js';
import { clearCommand } from './commands/clear.js';
import { pwdCommand } from './commands/pwd.js';
import { cdCommand } from './commands/cd.js';
import { lsCommand } from './commands/ls.js';
import { catCommand } from './commands/cat.js';
import { echoCommand } from './commands/echo.js';
import { whoamiCommand } from './commands/whoami.js';
import { dateCommand } from './commands/date.js';
import { githubCommand } from './commands/github.js';
import { twitterCommand } from './commands/twitter.js';
import { historyCommand } from './commands/history.js';
import { bannerCommand } from './commands/banner.js';
import { neofetchCommand } from './commands/neofetch.js';
import { rebootCommand } from './commands/reboot.js';
import { rmCommand } from './commands/rm.js';
import { shutdownCommand } from './commands/shutdown.js';
import { matrixCommand } from './commands/matrix.js';
import { treeCommand } from './commands/tree.js';
import { cowsayCommand } from './commands/cowsay.js';
import { slCommand } from './commands/sl.js';

export const COMMANDS = {
  help: helpCommand,
  clear: clearCommand,
  pwd: pwdCommand,
  cd: cdCommand,
  ls: lsCommand,
  cat: catCommand,
  echo: echoCommand,
  whoami: whoamiCommand,
  date: dateCommand,
  github: githubCommand,
  twitter: twitterCommand,
  history: historyCommand,
  banner: bannerCommand,
  neofetch: neofetchCommand,
  reboot: rebootCommand,
  rm: rmCommand,
  shutdown: shutdownCommand,
  matrix: matrixCommand,
  tree: treeCommand,
  cowsay: cowsayCommand,
  sl: slCommand
};
