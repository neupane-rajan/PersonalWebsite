export const fortunes = [
  'There is no place like 127.0.0.1',
  'It works on my machine.',
  'I use Arch, by the way.',
  'Talk is cheap. Show me the code. — Linus Torvalds',
  'First, solve the problem. Then, write the code. — John Johnson',
  'Simplicity is prerequisite for reliability. — Edsger W. Dijkstra',
  'Programs must be written for people to read, and only incidentally for machines to execute. — Harold Abelson',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand. — Martin Fowler',
  'There are only two hard things in computer science: cache invalidation and naming things. — Phil Karlton',
  'The best way to get a project done faster is to start sooner. — Jim Highsmith',
  'To exit vim, first remember why you opened it.',
  'sudo make me a sandwich.',
  'Read the manual. Then read it again. Then run man man.',
  'Have you tried turning it off and on again?',
  'Your dotfiles are never finished.',
  'A tutorial watched is not a project shipped.',
  'Today is a good day to rm -rf node_modules.',
  'Unix is user-friendly. It is just picky about who its friends are.',
];

export const fortune = () => fortunes[Math.floor(Math.random() * fortunes.length)];
