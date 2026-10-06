import { useEffect, useRef } from 'react';
import useInView from '../hooks/useInView';

// Half-width katakana + digits, like `cmatrix -c`
const GLYPHS = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789:.=*+-<>¦';
const randomGlyph = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

interface Stream {
  y: number;      // head position in rows (float)
  speed: number;  // rows per tick
  length: number; // trail length in rows
}

interface MatrixRainProps {
  fontSize?: number;
}

/**
 * cmatrix, done properly: every column keeps its own grid of glyphs, a bright
 * head leads a trail that fades from green to nothing, and glyphs inside the
 * trail flicker. Only runs while visible.
 */
export default function MatrixRain({ fontSize = 14 }: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const active = useInView(canvasRef);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx || !active) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let cols = 0;
    let rows = 0;
    let grid: string[][] = [];
    let streams: Stream[] = [];

    const newStream = (rows: number, scatter: boolean): Stream => ({
      y: scatter ? Math.random() * rows : -Math.random() * rows * 0.5,
      speed: 0.25 + Math.random() * 0.55,
      length: Math.floor(rows * (0.4 + Math.random() * 0.8)) + 4,
    });

    const setup = () => {
      const dpr = window.devicePixelRatio || 1;
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(width / (fontSize * 0.75));
      rows = Math.ceil(height / fontSize);
      grid = Array.from({ length: cols }, (_, c) => Array.from({ length: rows }, (_, r) => grid[c]?.[r] ?? randomGlyph()));
      streams = Array.from({ length: cols }, (_, c) => streams[c] ?? newStream(rows, true));
    };

    const draw = () => {
      const colW = fontSize * 0.75;
      ctx.fillStyle = '#11111b';
      ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
      ctx.font = `${fontSize}px "JetBrains Mono Variable", monospace`;
      ctx.textBaseline = 'top';

      for (let c = 0; c < cols; c++) {
        const s = streams[c];
        const head = Math.floor(s.y);
        for (let i = 0; i < s.length; i++) {
          const r = head - i;
          if (r < 0 || r >= rows) continue;
          if (i > 0 && Math.random() < 0.02) grid[c][r] = randomGlyph();
          if (i === 0) {
            ctx.fillStyle = '#f5f5ff';
            ctx.shadowColor = '#a6e3a1';
            ctx.shadowBlur = 8;
          } else {
            const fade = 1 - i / s.length;
            ctx.fillStyle = `rgba(166, 227, 161, ${(fade * fade * 0.95).toFixed(3)})`;
            ctx.shadowBlur = 0;
          }
          ctx.fillText(grid[c][r], c * colW, r * fontSize);
        }
        ctx.shadowBlur = 0;

        s.y += s.speed;
        if (head - s.length > rows) streams[c] = newStream(rows, false);
        // the head writes a fresh glyph as it moves, like the real thing
        if (head >= 0 && head < rows) grid[c][head] = randomGlyph();
      }
    };

    setup();
    const ro = new ResizeObserver(setup);
    ro.observe(canvas);

    if (reduceMotion) {
      draw();
      return () => ro.disconnect();
    }

    let raf = 0;
    let last = 0;
    const tick = (t: number) => {
      if (t - last > 1000 / 30) {
        draw();
        last = t;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [active, fontSize]);

  return <canvas ref={canvasRef} className="block h-full w-full bg-ctp-crust" aria-hidden="true" />;
}
