import { useEffect, useRef, useState } from 'react';
import useInView from '../../hooks/useInView';

const W = 46;
const H = 16;
const POT = [
  '   :___________./~~~\\.___________:   ',
  '    \\                           /    ',
  '     \\_________________________/     ',
  '     (_)                     (_)     ',
];

type Kind = 'trunk' | 'left' | 'right' | 'dying';
interface Branch {
  x: number;
  y: number;
  life: number;
  kind: Kind;
}
type Cell = { ch: string; leaf: boolean } | null;

const rand = (n: number) => Math.floor(Math.random() * n);

function branchChar(dx: number, dy: number, kind: Kind) {
  if (dy === 0) return kind === 'left' ? '\\_' [rand(2)] : '_/'[rand(2)];
  if (dx < 0) return '\\';
  if (dx > 0) return '/';
  return kind === 'trunk' ? '|' : '/|\\'[rand(3)];
}

/** A small port of cbonsai's growth rules: a trunk that sheds shoots, which die into leaves. */
function grow(): Cell[][][] {
  const grid: Cell[][] = Array.from({ length: H }, () => Array(W).fill(null));
  const frames: Cell[][][] = [];
  const queue: Branch[] = [{ x: Math.floor(W / 2), y: H - 1, life: 15, kind: 'trunk' }];
  const put = (x: number, y: number, cell: Cell) => {
    if (x >= 0 && x < W && y >= 0 && y < H && !(cell?.leaf && grid[y][x] && !grid[y][x]!.leaf)) grid[y][x] = cell;
  };

  // grow every live branch one step per frame, like cbonsai's live mode
  while (queue.length && frames.length < 400) {
    const alive = queue.splice(0);
    for (const b of alive) {
      b.life--;
      let dx = 0;
      let dy = 0;
      if (b.kind === 'trunk') {
        dy = rand(4) > 0 ? -1 : 0;
        dx = rand(5) === 0 ? rand(3) - 1 : 0;
        if (b.life < 12 && b.life % 2 === 0) queue.push({ ...b, life: 6 + rand(5), kind: rand(2) ? 'left' : 'right' });
      } else if (b.kind === 'left' || b.kind === 'right') {
        dx = (b.kind === 'left' ? -1 : 1) * (rand(4) > 0 ? 1 : 0);
        dy = rand(3) === 0 ? -1 : 0;
        if (b.life < 3) queue.push({ ...b, life: 3 + rand(4), kind: 'dying' });
      } else {
        dx = rand(3) - 1;
        dy = rand(3) - 1;
      }

      b.x = Math.min(W - 2, Math.max(1, b.x + dx));
      b.y = Math.min(H - 1, Math.max(0, b.y + dy));

      if (b.kind === 'dying') {
        put(b.x, b.y, { ch: '&', leaf: true });
        put(b.x + (rand(2) ? 1 : -1), b.y, { ch: '&', leaf: true });
      } else {
        put(b.x, b.y, { ch: branchChar(dx, dy, b.kind), leaf: false });
      }

      if (b.life > 0) queue.push(b);
      else if (b.kind === 'trunk') for (let i = 0; i < 5; i++) queue.push({ ...b, life: 4 + rand(4), kind: 'dying' });
      else if (b.kind !== 'dying') queue.push({ ...b, life: 3 + rand(3), kind: 'dying' });
    }
    frames.push(grid.map((row) => [...row]));
  }
  return frames;
}

/** cbonsai -l: grows a tree, waits, then grows a new one. */
export default function Bonsai() {
  const ref = useRef<HTMLDivElement>(null);
  const active = useInView(ref);
  const [frame, setFrame] = useState<Cell[][] | null>(null);
  const [seed, setSeed] = useState(0);

  useEffect(() => {
    if (!active) return;
    const frames = grow();
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setFrame(frames[frames.length - 1]);
      return;
    }
    let i = 0;
    const timer = setInterval(() => {
      if (i < frames.length) setFrame(frames[i++]);
      else if (i++ > frames.length + 60) setSeed((s) => s + 1); // ~5s pause, then regrow
    }, 80);
    return () => clearInterval(timer);
  }, [active, seed]);

  return (
    <div ref={ref} className="grid h-full cursor-pointer place-items-center overflow-hidden" onClick={() => setSeed((s) => s + 1)}>
      <pre className="m-0 select-none text-[11px] leading-[1.15]" aria-label="An ASCII bonsai tree">
        {(frame ?? Array.from({ length: H }, () => Array(W).fill(null))).map((row, y) => (
          <div key={y}>
            {row.map((cell, x) =>
              cell ? (
                <span key={x} className={cell.leaf ? 'text-ctp-green' : 'text-ctp-peach'}>{cell.ch}</span>
              ) : (
                ' '
              ),
            )}
          </div>
        ))}
        {POT.map((line, i) => (
          <div key={`pot${i}`} className="text-ctp-overlay1">{line.padStart((W + line.length) / 2).padEnd(W)}</div>
        ))}
      </pre>
    </div>
  );
}
