const cows = {
  default: String.raw`
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||`,
  tux: String.raw`
   \
    \
        .--.
       |o_o |
       |:_/ |
      //   \ \
     (|     | )
    /'\_   _/'\
    \___)=(___/`,
  dragon: String.raw`
      \                    / \  //\
       \    |\___/|      /   \//  \\
            /0  0  \__  /    //  | \ \
           /     /  \/_/    //   |  \  \
           @_^_@'/   \/_   //    |   \   \
           //_^_/     \/_ //     |    \    \
        ( //) |        \///      |     \     \
      ( / /) _|_ /   )  //       |      \     _\
    ( // /) '/,_ _ _/  ( ; -.    |    _ _\.-~        .-~~~^-.
  (( / / )) ,-{        _      '-.|.-~-.           .~         '.
 (( // / ))  '/\      /                 ~-. _ .-~      .-~^-.  \
 (( /// ))      '.   {            }                   /      \  \
  (( / ))     .----~-.\        \-'                 .~         \  '. \^-.
             ///.----..>        \             _ -~             '.  ^-'  ^-_
               ///-._ _ _ _ _ _ _}^ - - - - ~                     ~-- ,.-~
                                                                  /.-~`,
};

export type CowName = keyof typeof cows;
export const cowNames = Object.keys(cows) as CowName[];

function wrap(text: string, width: number) {
  const lines: string[] = [];
  for (const paragraph of text.split('\n')) {
    let line = '';
    for (const word of paragraph.split(/\s+/).filter(Boolean)) {
      if (line && line.length + word.length + 1 > width) {
        lines.push(line);
        line = '';
      }
      line = line ? `${line} ${word}` : word;
      while (line.length > width) {
        lines.push(line.slice(0, width));
        line = line.slice(width);
      }
    }
    lines.push(line);
  }
  return lines;
}

/** Same bubble rules as the real cowsay: < > for one line, / | \ for more */
export function cowsay(text: string, cow: CowName = 'default', width = 38) {
  const lines = wrap(text || 'Moo.', width);
  const w = Math.max(...lines.map((l) => l.length));
  const pad = (l: string) => l + ' '.repeat(w - l.length);
  const body =
    lines.length === 1
      ? [`< ${pad(lines[0])} >`]
      : lines.map((l, i) => {
          const [a, b] = i === 0 ? ['/', '\\'] : i === lines.length - 1 ? ['\\', '/'] : ['|', '|'];
          return `${a} ${pad(l)} ${b}`;
        });
  return [` ${'_'.repeat(w + 2)}`, ...body, ` ${'-'.repeat(w + 2)}`].join('\n') + cows[cow];
}
