import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useEffectsLayer, type Effect } from '../../state/EffectsContext';
import MatrixRain from '../MatrixRain';

const TRAIN = String.raw`      ====        ________                ___________
  _D _|  |_______/        \__I_I_____===__|_________|
   |(_)---  |   H\________/ |   |        =|___ ___|      _________________
   /     |  |   H  |  |     |   |         ||_| |_||     _|                \_____A
  |      |  |   H  |__--------------------| [___] |   =|                        |
  | ________|___H__/__|_____/[][]~\_______|       |   -|                        |
  |/ |   |-----------I_____I [][] []  D   |=======|____|________________________|_
__/ =| o |=-~~\  /~~\  /~~\  /~~\ ____Y___________|__|__________________________|_
 |/-=|___|=    ||    ||    ||    |_____/~\___/          |_D__D__D_|  |_D__D__D_|`;

const WHEELS = [
  String.raw`  \_/      \O=====O=====O=====O_/      \_/               \_/   \_/    \_/   \_/`,
  String.raw`  \_/      \_O=====O=====O=====O/      \_/               \_/   \_/    \_/   \_/`,
];

/** sl: the steam locomotive you get for mistyping ls. Drives across, then leaves. */
function Sl({ onDone }: { onDone: () => void }) {
  const [frame, setFrame] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setFrame((f) => f + 1), 120);
    return () => clearInterval(t);
  }, []);
  const smoke = ['(  ) (@@) ( )  (@)  ()    @@    O     @', '(@@@)  (  )  (@@) ( )   (  )   @@   O'][frame % 2];

  return (
    <motion.pre
      className="pointer-events-none fixed bottom-[18vh] left-0 z-[60] m-0 whitespace-pre text-[12px] leading-tight text-ctp-text sm:text-[14px]"
      style={{ textShadow: '0 0 6px rgb(17 17 27)' }}
      initial={{ x: '100vw' }}
      animate={{ x: '-110%' }}
      transition={{ duration: 7, ease: 'linear' }}
      onAnimationComplete={onDone}
      aria-hidden="true"
    >
      <span className="text-ctp-overlay1">{'                ' + smoke}</span>
      {'\n' + TRAIN + '\n' + WHEELS[frame % 2]}
    </motion.pre>
  );
}

/** A side-view cartoon cow, in the spirit of xcowsay's */
const CowArt = () => (
  <svg viewBox="0 0 120 92" className="h-[92px] w-[120px]" aria-hidden="true">
    <g stroke="#11111b" strokeWidth="2.5" strokeLinejoin="round">
      <rect x="28" y="58" width="9" height="28" rx="3" fill="#f5e0dc" />
      <rect x="44" y="60" width="9" height="26" rx="3" fill="#f5e0dc" />
      <rect x="76" y="60" width="9" height="26" rx="3" fill="#f5e0dc" />
      <rect x="90" y="58" width="9" height="28" rx="3" fill="#f5e0dc" />
      <ellipse cx="64" cy="48" rx="44" ry="22" fill="#f5e0dc" />
      <path d="M38 34c8 2 12 10 6 16-6 5-14 0-14-7 0-5 3-9 8-9z" fill="#11111b" />
      <path d="M78 44c10-4 18 4 14 12-4 6-14 5-16-2-1-4 0-8 2-10z" fill="#11111b" />
      <path d="M107 44c4 0 8 8 4 16" fill="none" />
      <ellipse cx="22" cy="40" rx="17" ry="15" fill="#f5e0dc" />
      <ellipse cx="14" cy="49" rx="11" ry="8" fill="#f5c2e7" />
      <path d="M12 26l-4-9M30 26l4-9" fill="none" />
      <ellipse cx="38" cy="30" rx="7" ry="4" fill="#f5e0dc" />
    </g>
    <circle cx="17" cy="36" r="2.5" fill="#11111b" />
    <circle cx="27" cy="36" r="2.5" fill="#11111b" />
    <circle cx="11" cy="49" r="1.5" fill="#11111b" />
    <circle cx="17" cy="49" r="1.5" fill="#11111b" />
  </svg>
);

/** xcowsay: a cow appears somewhere on your desktop with a speech bubble. Drag it, click to dismiss. */
function Xcowsay({ text, onDone }: { text: string; onDone: () => void }) {
  const [pos] = useState(() => ({
    left: `${8 + Math.random() * 52}vw`,
    top: `${18 + Math.random() * 45}vh`,
  }));
  useEffect(() => {
    const t = setTimeout(onDone, 12000);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      drag
      dragMomentum={false}
      className="fixed z-[60] flex cursor-grab touch-none items-end gap-1 active:cursor-grabbing"
      style={pos}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, ease: [0.05, 0.9, 0.1, 1.05] }}
      onTap={onDone}
      role="status"
    >
      <CowArt />
      <div className="relative mb-16 max-w-[260px] rounded-2xl border-2 border-ctp-crust bg-ctp-rosewater px-3 py-2 font-sans text-sm text-ctp-crust shadow-lg">
        <span className="absolute -left-2.5 bottom-3 h-4 w-4 rotate-45 border-b-2 border-l-2 border-ctp-crust bg-ctp-rosewater" />
        {text}
      </div>
    </motion.div>
  );
}

/** cmatrix in fullscreen. Any key or click quits, like the real one. */
function FullMatrix({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    // Wait a tick: the Enter that ran `cmatrix` in the shell is still bubbling
    // and would otherwise close it straight away.
    const quit = () => onDone();
    const t = setTimeout(() => window.addEventListener('keydown', quit), 0);
    return () => {
      clearTimeout(t);
      window.removeEventListener('keydown', quit);
    };
  }, [onDone]);
  return (
    <motion.div
      className="fixed inset-0 z-[70] cursor-pointer bg-ctp-crust"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={onDone}
      role="dialog"
      aria-label="Fullscreen cmatrix. Press any key to quit."
    >
      <MatrixRain fontSize={18} />
      <p className="absolute bottom-3 right-4 rounded bg-ctp-crust/90 px-2 py-1 text-xs text-ctp-overlay1">press any key to quit</p>
    </motion.div>
  );
}

function EffectItem({ effect }: { effect: Effect }) {
  const { dismiss } = useEffectsLayer();
  // stable per effect, so timers inside the effect don't restart on every render
  const done = useCallback(() => dismiss(effect.id), [dismiss, effect.id]);
  switch (effect.kind) {
    case 'sl':
      return <Sl onDone={done} />;
    case 'xcowsay':
      return <Xcowsay text={effect.text} onDone={done} />;
    case 'cmatrix':
      return <FullMatrix onDone={done} />;
  }
}

export default function EffectsLayer() {
  const { effects } = useEffectsLayer();
  return <>{effects.map((e) => <EffectItem key={e.id} effect={e} />)}</>;
}
