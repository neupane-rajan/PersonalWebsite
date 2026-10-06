import { useState } from 'react';
import { cowsay, cowNames, type CowName } from '../../lib/cowsay';
import { fortune } from '../../lib/fortunes';
import { useEffectsLayer } from '../../state/EffectsContext';

/** fortune | cowsay, with buttons for the things you'd retype */
export default function CowsayWindow() {
  const [text, setText] = useState(fortune);
  const [cow, setCow] = useState<CowName>('default');
  const { spawn } = useEffectsLayer();
  const btn = 'rounded-md border border-ctp-surface1 px-2.5 py-1 text-xs text-ctp-text hover:border-ctp-overlay0';

  return (
    <div className="flex h-full flex-col p-3 text-xs">
      <p className="mb-2 text-ctp-subtext0">
        <span className="text-ctp-green">❯</span> fortune | cowsay{cow !== 'default' && ` -f ${cow}`}
      </p>
      <pre className="m-0 flex-1 overflow-auto text-[11px] leading-[1.25] text-ctp-text">{cowsay(text, cow)}</pre>
      <div className="mt-2 flex flex-wrap gap-1.5">
        <button className={btn} onClick={() => setText(fortune())}>New fortune</button>
        <button className={btn} onClick={() => setCow(cowNames[(cowNames.indexOf(cow) + 1) % cowNames.length])}>
          Change cow
        </button>
        <button className={btn} onClick={() => spawn({ kind: 'xcowsay', text })}>xcowsay it</button>
        <button className={btn} onClick={() => spawn({ kind: 'sl' })}>sl</button>
      </div>
    </div>
  );
}
