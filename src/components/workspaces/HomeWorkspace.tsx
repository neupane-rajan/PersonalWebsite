import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import HyprWindow from '../HyprWindow';
import Cava from '../Cava';
import TtyClock from '../toys/TtyClock';
import MusicPlayer from '../MusicPlayer';
import { socials } from '../../data/socials';

// bezier = myBezier, 0.05, 0.9, 0.1, 1.05 — the curve from Hyprland's default config
const hyprBezier = [0.05, 0.9, 0.1, 1.05] as const;

/** animation = windows, 1, 7, myBezier, popin 80% */
function PopIn({ order, className = '', children }: { order: number; className?: string; children: ReactNode }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: hyprBezier, delay: 0.08 * order }}
    >
      {children}
    </motion.div>
  );
}

export default function HomeWorkspace() {
  return (
    <div className="row g-2 lg:h-full">
      <div className="col-lg-8 lg:h-full">
        <PopIn order={0} className="h-full">
          <HyprWindow title="imv — hero.jpeg" className="min-h-[320px]">
            <img src="/hero-image.jpeg" alt="Rajan Neupane" className="absolute inset-0 h-full w-full object-cover" />
          </HyprWindow>
        </PopIn>
      </div>

      <div className="col-lg-4 flex flex-col gap-2 lg:h-full">
        <PopIn order={1}>
          <HyprWindow title="kitty — ~" className="p-4 text-sm">
            <p className="text-ctp-subtext0">
              <span className="text-ctp-green">❯</span> whoami
            </p>
            <h1 className="mb-3 mt-1 text-[2rem] font-extrabold leading-tight tracking-tight text-ctp-text">
              Rajan Neupane
            </h1>
            <p className="text-ctp-subtext0">
              <span className="text-ctp-green">❯</span> cat role.txt
            </p>
            <p className="mb-4 mt-1 leading-relaxed text-ctp-subtext1">
              Web developer and Python mentor in Kailali, Nepal. I run Arch, by the way.
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <a href="#projects" className="rounded-md bg-ctp-mauve px-3 py-1.5 text-xs font-bold text-ctp-crust hover:bg-ctp-lavender">
                ./projects
              </a>
              <a href="#toys" className="rounded-md border border-ctp-surface1 px-3 py-1.5 text-xs text-ctp-text hover:border-ctp-overlay0">
                ./toys
              </a>
              <span className="ml-auto flex gap-1">
                {socials.map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    data-bs-toggle="tooltip"
                    data-bs-title={label}
                    className="rounded-md p-1.5 text-ctp-overlay1 hover:bg-ctp-surface0 hover:text-ctp-text"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </span>
            </div>
          </HyprWindow>
        </PopIn>

        <PopIn order={2} className="h-[96px] shrink-0">
          <HyprWindow title="tty-clock -c -s -t">
            <TtyClock />
          </HyprWindow>
        </PopIn>

        <PopIn order={3}>
          <HyprWindow title="ncmpcpp">
            <MusicPlayer />
          </HyprWindow>
        </PopIn>

        <PopIn order={4} className="min-h-[130px] flex-1">
          <HyprWindow title="cava">
            <Cava />
          </HyprWindow>
        </PopIn>
      </div>
    </div>
  );
}
