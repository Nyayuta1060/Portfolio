/**
 * cowsay コマンド - 牛が喋る
 */

export const cowsayCommand = {
  description: 'terminal.commands.cowsay.description',
  execute: (args) => {
    const message = args.length > 0 ? args.join(' ') : 'Moo!';
    const msgLength = message.length;
    const border = '-'.repeat(msgLength + 2);
    
    return `
 ${border}
< ${message} >
 ${border}
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`;
  }
};
