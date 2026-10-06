import type { ReactNode } from 'react';
import HyprWindow from '../HyprWindow';

const Line = ({ children }: { children?: ReactNode }) => (
  <div className="nvim-line">
    <div>{children}</div>
  </div>
);

export default function AboutWorkspace() {
  return (
    <div className="row g-2 lg:h-full">
      <div className="col-lg-8 lg:h-full">
        <HyprWindow title="nvim — ~/about/journey.md">
          <div className="flex items-center gap-px bg-ctp-crust text-xs">
            <span className="bg-ctp-base px-3 py-1 text-ctp-text">journey.md</span>
          </div>

          <div className="nvim-buffer flex-1 content-start overflow-y-auto py-3 pr-4 text-sm leading-[1.6] text-ctp-subtext1">
            <Line><span className="font-bold text-ctp-mauve"># How I got here</span></Line>
            <Line />
            <Line>
              I taught myself to program. The first year and a half was rough: I was stuck in
              tutorial hell, hopping from one course to the next without building anything.
            </Line>
            <Line />
            <Line>
              Things changed when I stopped following along and started making my own projects.
              Small scripts first, then web apps, and the confidence came with them.
            </Line>
            <Line />
            <Line><span className="font-bold text-ctp-blue">## Off the keyboard</span></Line>
            <Line />
            <Line>
              <span className="text-ctp-peach">-</span> playing the ukulele
            </Line>
            <Line>
              <span className="text-ctp-peach">-</span> reading philosophy
            </Line>
            <Line>
              <span className="text-ctp-peach">-</span> trying out new tools and tech
            </Line>
            <Line />
            <Line>
              <span className="text-ctp-overlay1 italic">
                &gt; The only true wisdom is in knowing you know nothing. (Socrates)
              </span>
            </Line>
            <Line>
              <span className="nvim-cursor" />
            </Line>
          </div>

          {/* lualine */}
          <div className="flex items-center text-[11px]">
            <span className="bg-ctp-blue px-2.5 py-0.5 font-bold text-ctp-crust">NORMAL</span>
            <span className="bg-ctp-surface0 px-2.5 py-0.5 text-ctp-text">main</span>
            <span className="truncate px-2.5 py-0.5 text-ctp-subtext0">journey.md</span>
            <span className="ml-auto hidden px-2.5 py-0.5 text-ctp-overlay1 sm:inline">utf-8  markdown</span>
            <span className="bg-ctp-blue px-2.5 py-0.5 text-ctp-crust">14:1</span>
          </div>
        </HyprWindow>
      </div>

      <div className="col-lg-4 lg:h-full">
        <HyprWindow title="imv — pic.png" className="min-h-[360px]">
          <img
            src="/pic.png"
            alt="Rajan Neupane"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </HyprWindow>
      </div>
    </div>
  );
}
