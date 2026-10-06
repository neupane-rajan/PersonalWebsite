import { useEffect, useRef, useState } from 'react';
import {
  Battery, BatteryCharging, BatteryFull, BatteryLow, BatteryMedium,
  Pause, Play, Volume1, Volume2, VolumeX, Wifi, WifiOff,
} from 'lucide-react';
import { SiArchlinux } from 'react-icons/si';
import { HYPR_FOCUS_EVENT } from './HyprWindow';
import { goToWorkspace, workspaces, type WorkspaceId } from '../data/workspaces';
import { playlist, useMusic } from '../state/MusicContext';

/*
 * A waybar config, rebuilt:
 *   modules-left   = custom/launcher, hyprland/workspaces, hyprland/window
 *   modules-center = clock
 *   modules-right  = mpris, pulseaudio, network, battery
 * Network and battery read the visitor's real status where the browser exposes it.
 */

const time12 = (d: Date) => d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
const longDate = (d: Date) => d.toLocaleDateString('en-US', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' });

/** waybar's clock tooltip: a month calendar with today highlighted */
function calendarHtml(d: Date) {
  const year = d.getFullYear();
  const month = d.getMonth();
  const first = new Date(year, month, 1).getDay();
  const days = new Date(year, month + 1, 0).getDate();
  const title = d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  let out = `${title.padStart(10 + Math.ceil(title.length / 2))}\nSu Mo Tu We Th Fr Sa\n${'   '.repeat(first)}`;
  for (let day = 1; day <= days; day++) {
    const cell = String(day).padStart(2);
    out += day === d.getDate() ? `<span class="cal-today">${cell}</span>` : cell;
    out += (first + day) % 7 === 0 ? '\n' : ' ';
  }
  return `<pre class="cal">${out.trimEnd()}</pre>`;
}

function Clock() {
  const [now, setNow] = useState(new Date());
  const [alt, setAlt] = useState(false);
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <button
      className="wb-module text-ctp-blue"
      onClick={() => setAlt((a) => !a)}
      data-bs-toggle="tooltip"
      data-bs-placement="bottom"
      data-bs-html="true"
      data-bs-title={calendarHtml(now)}
      aria-label={`${time12(now)}, ${longDate(now)}. Click to switch format.`}
    >
      <span className="font-semibold">{alt ? longDate(now) : time12(now)}</span>
    </button>
  );
}

/** mpris: what's playing, click to play/pause */
function Mpris() {
  const { index, isPlaying, toggle } = useMusic();
  const track = playlist[index];
  return (
    <button
      onClick={toggle}
      className="wb-module hidden max-w-[17rem] gap-2 text-ctp-green md:flex"
      aria-label={isPlaying ? `Pause ${track.title}` : `Play ${track.title}`}
    >
      {isPlaying ? <Pause className="h-3 w-3 shrink-0" fill="currentColor" /> : <Play className="h-3 w-3 shrink-0" fill="currentColor" />}
      <span className="truncate">{track.artist} - {track.title}</span>
    </button>
  );
}

/** pulseaudio: scroll to change the music volume, click to mute */
function Pulseaudio() {
  const { volume, muted, setVolume, toggleMute } = useMusic();
  const ref = useRef<HTMLButtonElement>(null);
  const volumeRef = useRef(volume);
  volumeRef.current = volume;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // non-passive so the page doesn't scroll while adjusting volume
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      setVolume(volumeRef.current + (e.deltaY < 0 ? 0.05 : -0.05));
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [setVolume]);

  const pct = Math.round(volume * 100);
  const Icon = muted || pct === 0 ? VolumeX : pct < 50 ? Volume1 : Volume2;
  return (
    <button
      ref={ref}
      onClick={toggleMute}
      className={`wb-module gap-1.5 ${muted ? 'text-ctp-overlay1' : 'text-ctp-maroon'}`}
      data-bs-toggle="tooltip"
      data-bs-placement="bottom"
      data-bs-title="Music volume. Scroll to change, click to mute."
      aria-label={muted ? 'Unmute music' : `Music volume ${pct}%. Click to mute.`}
    >
      <Icon className="h-3.5 w-3.5" />
      <span className="hidden sm:inline">{muted ? 'muted' : `${pct}%`}</span>
    </button>
  );
}

type NetworkInformation = { effectiveType?: string; addEventListener?: (t: string, f: () => void) => void; removeEventListener?: (t: string, f: () => void) => void };

function Network() {
  const read = () => ({
    online: navigator.onLine,
    type: (navigator as Navigator & { connection?: NetworkInformation }).connection?.effectiveType,
  });
  const [net, setNet] = useState(read);
  useEffect(() => {
    const update = () => setNet(read());
    const conn = (navigator as Navigator & { connection?: NetworkInformation }).connection;
    window.addEventListener('online', update);
    window.addEventListener('offline', update);
    conn?.addEventListener?.('change', update);
    return () => {
      window.removeEventListener('online', update);
      window.removeEventListener('offline', update);
      conn?.removeEventListener?.('change', update);
    };
  }, []);
  return (
    <span className={`wb-module hidden gap-1.5 sm:flex ${net.online ? 'text-ctp-teal' : 'text-ctp-red'}`}>
      {net.online ? <Wifi className="h-3.5 w-3.5" /> : <WifiOff className="h-3.5 w-3.5" />}
      <span>{net.online ? (net.type ?? 'online') : 'offline'}</span>
    </span>
  );
}

type BatteryManager = EventTarget & { level: number; charging: boolean };

/** battery: only shown when the browser exposes the Battery Status API */
function BatteryModule() {
  const [battery, setBattery] = useState<{ level: number; charging: boolean } | null>(null);
  useEffect(() => {
    const getBattery = (navigator as Navigator & { getBattery?: () => Promise<BatteryManager> }).getBattery;
    if (!getBattery) return;
    let manager: BatteryManager | null = null;
    const update = () => manager && setBattery({ level: manager.level, charging: manager.charging });
    getBattery.call(navigator).then((m) => {
      manager = m;
      update();
      m.addEventListener('levelchange', update);
      m.addEventListener('chargingchange', update);
    }).catch(() => {});
    return () => {
      manager?.removeEventListener('levelchange', update);
      manager?.removeEventListener('chargingchange', update);
    };
  }, []);

  if (!battery) return null;
  const pct = Math.round(battery.level * 100);
  const Icon = battery.charging ? BatteryCharging : pct > 80 ? BatteryFull : pct > 40 ? BatteryMedium : pct > 15 ? BatteryLow : Battery;
  const color = battery.charging ? 'text-ctp-green' : pct <= 15 ? 'text-ctp-red' : pct <= 30 ? 'text-ctp-peach' : 'text-ctp-yellow';
  return (
    <span className={`wb-module hidden gap-1.5 sm:flex ${color}`} aria-label={`Battery ${pct}%${battery.charging ? ', charging' : ''}`}>
      <Icon className="h-3.5 w-3.5" />
      <span>{pct}%</span>
    </span>
  );
}

export default function Navigation({ active }: { active: WorkspaceId }) {
  const [focusedTitle, setFocusedTitle] = useState<string | null>(null);

  // Windows announce themselves on hover/focus, like hyprland/window
  useEffect(() => {
    const onFocus = (e: Event) => setFocusedTitle((e as CustomEvent<string | null>).detail);
    window.addEventListener(HYPR_FOCUS_EVENT, onFocus);
    return () => window.removeEventListener(HYPR_FOCUS_EVENT, onFocus);
  }, []);

  const title = focusedTitle ?? workspaces.find((w) => w.id === active)?.title;

  return (
    <nav id="waybar" className="fixed inset-x-0 top-0 z-50 grid grid-cols-[1fr_auto] items-stretch text-[12.5px] lg:grid-cols-[1fr_auto_1fr]">
      <div className="flex min-w-0 items-stretch">
        <a href="#home" onClick={(e) => { e.preventDefault(); goToWorkspace('home'); }} className="wb-module text-ctp-blue hover:text-ctp-mauve" aria-label="Home">
          <SiArchlinux className="h-4 w-4" />
        </a>
        <div className="flex items-stretch" role="navigation" aria-label="Workspaces">
          {workspaces.map((ws, i) => (
            <a
              key={ws.id}
              href={`#${ws.id}`}
              onClick={(e) => {
                e.preventDefault();
                goToWorkspace(ws.id);
              }}
              className={`wb-ws${ws.id === active ? ' active' : ''}`}
              aria-current={ws.id === active ? 'page' : undefined}
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
              data-bs-title={`${ws.name} (${i + 1})`}
              aria-label={ws.name}
            >
              {i + 1}
            </a>
          ))}
        </div>
        <span className="wb-module hidden min-w-0 text-ctp-subtext0 lg:flex">
          <span className="truncate">{title}</span>
        </span>
      </div>

      <div className="hidden items-stretch justify-center lg:flex">
        <Clock />
      </div>

      <div className="flex items-stretch justify-end">
        <Mpris />
        <Pulseaudio />
        <Network />
        <BatteryModule />
        <span className="flex items-stretch lg:hidden">
          <Clock />
        </span>
      </div>
    </nav>
  );
}
