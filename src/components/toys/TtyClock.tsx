import { useEffect, useState } from 'react';

// tty-clock's 3×5 block font, one row per string
const DIGITS: Record<string, string[]> = {
  '0': ['###', '#.#', '#.#', '#.#', '###'],
  '1': ['..#', '..#', '..#', '..#', '..#'],
  '2': ['###', '..#', '###', '#..', '###'],
  '3': ['###', '..#', '###', '..#', '###'],
  '4': ['#.#', '#.#', '###', '..#', '..#'],
  '5': ['###', '#..', '###', '..#', '###'],
  '6': ['###', '#..', '###', '#.#', '###'],
  '7': ['###', '..#', '..#', '..#', '..#'],
  '8': ['###', '#.#', '###', '#.#', '###'],
  '9': ['###', '#.#', '###', '..#', '###'],
  ':': ['.', '#', '.', '#', '.'],
};

function Glyph({ ch }: { ch: string }) {
  const rows = DIGITS[ch];
  return (
    <div className="grid gap-[2px]" style={{ gridTemplateColumns: `repeat(${rows[0].length}, 1fr)` }}>
      {rows.join('').split('').map((cell, i) => (
        // cells scale with the window width (cqw), so the clock fits any tile
        <span key={i} className={`aspect-[2/1] w-[min(3.1cqw,20px)] ${cell === '#' ? 'bg-ctp-mauve' : ''}`} />
      ))}
    </div>
  );
}

/** tty-clock -c -s -t: the big block clock, 12-hour */
export default function TtyClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const h = now.getHours();
  const pad = (n: number) => String(n).padStart(2, '0');
  const time = `${pad(h % 12 || 12)}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  const meridiem = h < 12 ? 'AM' : 'PM';
  const date = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <div
      className="flex h-full flex-col items-center justify-center gap-2 px-3 py-2 [container-type:inline-size]"
      role="timer"
      aria-label={`Local time ${time} ${meridiem}`}
    >
      <div className="flex items-end gap-[min(1.6cqw,10px)]" aria-hidden="true">
        {[...time].map((ch, i) => <Glyph key={i} ch={ch} />)}
        <span className="ml-1 text-xs font-bold leading-none text-ctp-mauve">{meridiem}</span>
      </div>
      <p className="m-0 text-[11px] text-ctp-overlay1">{date}</p>
    </div>
  );
}
