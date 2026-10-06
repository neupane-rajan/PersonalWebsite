import { useEffect, useRef } from 'react';
import { useMusic } from '../state/MusicContext';
import useInView from '../hooks/useInView';

// A media element can only be wrapped by one MediaElementSourceNode for its whole
// lifetime, so the audio graph is built once per element and reused across remounts.
const graphs = new WeakMap<HTMLAudioElement, { ctx: AudioContext; analyser: AnalyserNode }>();

function getGraph(audio: HTMLAudioElement) {
  let graph = graphs.get(audio);
  if (!graph) {
    const ctx = new AudioContext();
    const source = ctx.createMediaElementSource(audio);
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 4096;
    analyser.smoothingTimeConstant = 0.5;
    source.connect(analyser);
    source.connect(ctx.destination); // keep the music audible
    graph = { ctx, analyser };
    graphs.set(audio, graph);
  }
  return graph;
}

// cava's config, in spirit:
//   bar_width = 2, bar_spacing = 1, lower_cutoff_freq = 50, higher_cutoff_freq = 10000
//   gradient = 1, gradient_color_1..6 (bottom → top)
const CELL_W = 7;
const CELL_H = 12;
const BAR_W = 2;
const BAR_GAP = 1;
const LOW_HZ = 50;
const HIGH_HZ = 10000;
const GRADIENT = ['#94e2d5', '#89dceb', '#74c7ec', '#89b4fa', '#b4befe', '#cba6f7', '#f5c2e7'];

/** cava: solid block bars that rise fast, fall with gravity, and pull their neighbours up (monstercat smoothing). */
export default function Cava() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const visible = useInView(canvasRef);
  const { audio, isPlaying } = useMusic();

  // Route the music through the analyser as soon as the player exists, so it never
  // gets rerouted mid-song. Browsers keep the context suspended until a user gesture.
  useEffect(() => {
    if (!audio) return;
    const { ctx } = getGraph(audio);
    const resume = () => ctx.resume();
    audio.addEventListener('play', resume);
    return () => audio.removeEventListener('play', resume);
  }, [audio]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx2d = canvas?.getContext('2d');
    if (!canvas || !ctx2d || !audio || !visible) return;

    const { ctx, analyser } = getGraph(audio);

    const freq = new Uint8Array(analyser.frequencyBinCount);
    let bars: number[] = [];
    let fall: number[] = [];
    let cols = 0;
    let rows = 0;
    let edges: number[] = [];

    const setup = () => {
      const dpr = window.devicePixelRatio || 1;
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx2d.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.floor(width / CELL_W);
      rows = Math.max(1, Math.floor(height / CELL_H));
      const count = Math.max(1, Math.floor((cols + BAR_GAP) / (BAR_W + BAR_GAP)));
      bars = Array(count).fill(0);
      fall = Array(count).fill(0);
      // log-spaced frequency edges, like cava's cut-off calculation
      const binHz = ctx.sampleRate / analyser.fftSize;
      edges = Array.from({ length: count + 1 }, (_, i) =>
        Math.max(1, Math.round((LOW_HZ * Math.pow(HIGH_HZ / LOW_HZ, i / count)) / binHz)),
      );
    };

    const draw = () => {
      analyser.getByteFrequencyData(freq);
      const count = bars.length;
      const raw = new Array<number>(count);
      for (let i = 0; i < count; i++) {
        const from = edges[i];
        const to = Math.max(from + 1, edges[i + 1]);
        let sum = 0;
        for (let b = from; b < to; b++) sum += freq[b] ?? 0;
        // treble is quieter; tilt it up the way cava's eq does
        const tilt = 0.75 + (i / count) * 0.6;
        raw[i] = Math.min(1, (sum / (to - from) / 255) * tilt * 1.15);
      }

      // monstercat: each bar lifts its neighbours, fading with distance
      for (let i = 0; i < count; i++) {
        for (let j = 0; j < count; j++) {
          if (i !== j) raw[j] = Math.max(raw[j], raw[i] / Math.pow(1.6, Math.abs(i - j)));
        }
      }

      // gravity: rise instantly, fall with acceleration
      for (let i = 0; i < count; i++) {
        if (raw[i] >= bars[i]) {
          bars[i] = raw[i];
          fall[i] = 0;
        } else {
          fall[i] += 0.004;
          bars[i] = Math.max(raw[i], bars[i] - fall[i]);
        }
      }

      const h = canvas.clientHeight;
      ctx2d.clearRect(0, 0, canvas.clientWidth, h);
      const offsetX = Math.floor((canvas.clientWidth - (count * (BAR_W + BAR_GAP) - BAR_GAP) * CELL_W) / 2);

      for (let i = 0; i < count; i++) {
        // quantise to eighths of a cell, like ▁▂▃▄▅▆▇█
        const eighths = Math.round(bars[i] * rows * 8);
        const x = offsetX + i * (BAR_W + BAR_GAP) * CELL_W;
        for (let r = 0; r * 8 < eighths; r++) {
          const part = Math.min(8, eighths - r * 8);
          const cellTop = h - (r + 1) * CELL_H;
          ctx2d.fillStyle = GRADIENT[Math.min(GRADIENT.length - 1, Math.floor((r / rows) * GRADIENT.length))];
          ctx2d.fillRect(x, cellTop + CELL_H * (1 - part / 8), BAR_W * CELL_W, (CELL_H * part) / 8);
        }
      }
    };

    setup();
    const ro = new ResizeObserver(setup);
    ro.observe(canvas);
    let raf = 0;
    const tick = () => {
      draw();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [audio, visible]);

  return (
    <>
      <canvas ref={canvasRef} className="absolute inset-x-2 bottom-1 top-2 block h-[calc(100%-0.75rem)] w-[calc(100%-1rem)]" aria-hidden="true" />
      {!isPlaying && (
        <p className="absolute inset-0 grid place-items-center text-xs text-ctp-overlay0">
          Play a track to start cava
        </p>
      )}
    </>
  );
}
