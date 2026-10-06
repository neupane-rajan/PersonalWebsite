import { useEffect, useRef, useState, type ReactNode } from 'react';
import { cowsay, cowNames, type CowName } from '../../lib/cowsay';
import { fortune } from '../../lib/fortunes';
import { goToWorkspace, workspaces, type WorkspaceId } from '../../data/workspaces';
import { useEffectsLayer } from '../../state/EffectsContext';
import { useMusic, playlist } from '../../state/MusicContext';

interface Entry {
  cmd: string;
  out: ReactNode;
}

const Lolcat = ({ text }: { text: string }) => (
  <>
    {text.split('\n').map((line, y) => (
      <div key={y}>
        {[...line].map((ch, x) => (
          <span key={x} style={{ color: `hsl(${(x * 7 + y * 14) % 360} 80% 75%)` }}>{ch}</span>
        ))}
      </div>
    ))}
  </>
);

const help: [string, string][] = [
  ['help', 'show this list'],
  ['ls', 'list workspaces'],
  ['ws <1-6|name>', 'switch workspace (also: cd)'],
  ['fortune', 'print a random fortune'],
  ['cowsay [-f cow] <text>', `a cow says it (cows: ${cowNames.join(', ')})`],
  ['xcowsay <text>', 'a cow says it, on your desktop'],
  ['sl', 'you meant ls, right?'],
  ['cmatrix', 'fullscreen matrix, Esc to quit'],
  ['neofetch', 'system info'],
  ['mpc [toggle|next|prev]', 'control the music'],
  ['lolcat', 'pipe into it: fortune | lolcat'],
  ['clear', 'clear the screen'],
];

const commandNames = ['help', 'ls', 'ws', 'cd', 'fortune', 'cowsay', 'xcowsay', 'sl', 'cmatrix', 'neofetch', 'mpc', 'lolcat', 'clear', 'whoami', 'date', 'echo', 'uname', 'history', 'sudo', 'exit'];

const neofetch = String.raw`       /\         rajan@arch
      /  \        ----------
     /\   \       OS: Arch Linux x86_64
    /      \      WM: Hyprland
   /   ,,   \     Shell: zsh
  /   |  |  -\    Editor: neovim
 /_-''    ''-_\   Location: Kailali, Nepal`;

export default function Shell() {
  const [entries, setEntries] = useState<Entry[]>([
    { cmd: 'neofetch', out: <span className="text-ctp-blue">{neofetch}</span> },
    { cmd: '', out: <span className="text-ctp-overlay1">Type <b className="text-ctp-text">help</b> to see what this shell can do. Try <b className="text-ctp-text">fortune | cowsay</b> or <b className="text-ctp-text">sl</b>.</span> },
  ]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { spawn } = useEffectsLayer();
  const music = useMusic();

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [entries]);

  /** Runs one command. `stdin` is the text output of the previous command in a pipe. */
  const run = (name: string, args: string[], stdin: string | null): { text?: string; node?: ReactNode } => {
    const joined = args.join(' ');
    switch (name) {
      case '':
        return {};
      case 'help':
        return {
          node: (
            <div className="grid grid-cols-[auto_1fr] gap-x-4">
              {help.map(([c, d]) => (
                <div key={c} className="contents">
                  <span className="text-ctp-green">{c}</span>
                  <span className="text-ctp-subtext0">{d}</span>
                </div>
              ))}
            </div>
          ),
        };
      case 'ls':
        return {
          node: (
            <div className="flex flex-wrap gap-x-4">
              {workspaces.map((w, i) => (
                <span key={w.id} className="text-ctp-blue">{i + 1}:{w.id}/</span>
              ))}
            </div>
          ),
        };
      case 'ws':
      case 'cd': {
        const target = args[0]?.toLowerCase().replace(/[~/.]/g, '') ?? '';
        const ws = workspaces[Number(target) - 1] ?? workspaces.find((w) => w.id === target);
        if (!ws) return { text: `${name}: no such workspace: ${args[0] ?? ''}. Try ls.` };
        setTimeout(() => goToWorkspace(ws.id as WorkspaceId), 150);
        return { text: `switching to workspace ${workspaces.indexOf(ws) + 1} (${ws.id})` };
      }
      case 'fortune':
        return { text: fortune() };
      case 'cowsay': {
        let cow: CowName = 'default';
        let rest = args;
        if (args[0] === '-f') {
          if (!cowNames.includes(args[1] as CowName)) return { text: `cowsay: unknown cow '${args[1] ?? ''}'. Available: ${cowNames.join(', ')}` };
          cow = args[1] as CowName;
          rest = args.slice(2);
        }
        return { text: cowsay(stdin ?? rest.join(' '), cow) };
      }
      case 'xcowsay':
        spawn({ kind: 'xcowsay', text: stdin ?? (joined || fortune()) });
        return {};
      case 'sl':
        spawn({ kind: 'sl' });
        return {};
      case 'cmatrix':
        spawn({ kind: 'cmatrix' });
        return {};
      case 'neofetch':
      case 'fastfetch':
        return { node: <span className="text-ctp-blue">{neofetch}</span>, text: neofetch };
      case 'lolcat': {
        const text = stdin ?? joined;
        return { node: <Lolcat text={text} />, text };
      }
      case 'mpc': {
        const sub = args[0] ?? 'status';
        if (sub === 'toggle' || sub === 'play' || sub === 'pause') music.toggle();
        else if (sub === 'next') music.next();
        else if (sub === 'prev') music.previous();
        else if (sub !== 'status') return { text: `mpc: unknown command '${sub}'. Try toggle, next or prev.` };
        const t = playlist[music.index];
        return { text: sub === 'status' ? `${t.artist} - ${t.title} [${music.isPlaying ? 'playing' : 'paused'}]` : `mpc ${sub}` };
      }
      case 'clear':
        return {};
      case 'whoami':
        return { text: 'rajan' };
      case 'date':
        return { text: new Date().toString() };
      case 'echo':
        return { text: stdin ?? joined };
      case 'uname':
        return { text: args.includes('-a') ? 'Linux arch 6.x-arch1 #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux' : 'Linux' };
      case 'history':
        return { text: history.map((h, i) => `${String(i + 1).padStart(4)}  ${h}`).join('\n') };
      case 'sudo':
        return { text: 'rajan is not in the sudoers file. This incident will be reported.' };
      case 'rm':
        return { text: joined.includes('-rf') ? 'Nice try.' : 'rm: refusing to remove anything on a portfolio.' };
      case 'vim':
      case 'nvim':
        setTimeout(() => goToWorkspace('about'), 150);
        return { text: 'opening ~/about/journey.md' };
      case 'exit':
        return { text: 'There is no escape. Try ws 1.' };
      default:
        return { text: `zsh: command not found: ${name}` };
    }
  };

  const submit = (line: string) => {
    const trimmed = line.trim();
    if (trimmed) setHistory((h) => [...h, trimmed]);
    setCursor(-1);
    setInput('');

    if (trimmed === 'clear') {
      setEntries([]);
      return;
    }

    let stdin: string | null = null;
    let result: { text?: string; node?: ReactNode } = {};
    for (const part of trimmed.split('|')) {
      const [name = '', ...args] = part.trim().split(/\s+/);
      // phones like to autocapitalise the first letter
      result = run(name.toLowerCase(), args, stdin);
      stdin = result.text ?? '';
    }
    setEntries((e) => [...e, { cmd: line, out: result.node ?? result.text }]);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') submit(input);
    else if (e.key === 'ArrowUp' && history.length) {
      e.preventDefault();
      const next = cursor < 0 ? history.length - 1 : Math.max(0, cursor - 1);
      setCursor(next);
      setInput(history[next]);
    } else if (e.key === 'ArrowDown' && cursor >= 0) {
      e.preventDefault();
      const next = cursor + 1;
      setCursor(next >= history.length ? -1 : next);
      setInput(next >= history.length ? '' : history[next]);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const word = input.split(/\s+/).pop() ?? '';
      const matches = commandNames.filter((c) => c.startsWith(word));
      if (word && matches.length === 1) setInput(input.slice(0, input.length - word.length) + matches[0] + ' ');
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setEntries([]);
    }
  };

  return (
    <div
      ref={scrollRef}
      className="h-full overflow-y-auto p-3 text-[13px] leading-relaxed"
      onClick={() => window.getSelection()?.isCollapsed && inputRef.current?.focus()}
    >
      {entries.map((entry, i) => (
        <div key={i} className="mb-1">
          {entry.cmd !== '' && (
            <div>
              <span className="text-ctp-green">❯</span> <span className="text-ctp-text">{entry.cmd}</span>
            </div>
          )}
          {entry.out != null && <div className="whitespace-pre-wrap break-words text-ctp-subtext1">{entry.out}</div>}
        </div>
      ))}
      <label className="flex items-center gap-2">
        <span className="text-ctp-green">❯</span>
        <span className="sr-only">Shell command</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          spellCheck={false}
          autoCapitalize="off"
          autoComplete="off"
          className="min-w-0 flex-1 bg-transparent text-ctp-text caret-ctp-rosewater outline-none focus-visible:outline-none"
        />
      </label>
    </div>
  );
}
