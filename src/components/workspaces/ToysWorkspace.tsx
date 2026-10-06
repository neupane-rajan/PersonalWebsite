import HyprWindow from '../HyprWindow';
import Shell from '../toys/Shell';
import Bonsai from '../toys/Bonsai';
import CowsayWindow from '../toys/CowsayWindow';
import MatrixRain from '../MatrixRain';
import { useEffectsLayer } from '../../state/EffectsContext';

export default function ToysWorkspace() {
  const { spawn } = useEffectsLayer();

  return (
    <div className="row g-2 lg:h-full">
      <div className="col-lg-6 lg:h-full">
        <HyprWindow title="kitty — zsh" className="h-[420px] lg:h-full">
          <Shell />
        </HyprWindow>
      </div>

      <div className="col-lg-6 flex flex-col gap-2 lg:h-full">
        <HyprWindow title="kitty — fortune | cowsay" className="h-auto lg:min-h-0 lg:flex-[1.2]">
          <CowsayWindow />
        </HyprWindow>
        <div className="grid gap-2 sm:grid-cols-2 lg:min-h-0 lg:flex-1">
          <HyprWindow title="cmatrix — double-click for fullscreen" className="h-[260px] lg:h-full">
            <button
              className="h-full w-full cursor-zoom-in"
              onDoubleClick={() => spawn({ kind: 'cmatrix' })}
              aria-label="Open cmatrix in fullscreen (double-click)"
            >
              <MatrixRain />
            </button>
          </HyprWindow>
          <HyprWindow title="kitty — cbonsai -l (click to regrow)" className="h-[300px] lg:h-full">
            <Bonsai />
          </HyprWindow>
        </div>
      </div>
    </div>
  );
}
