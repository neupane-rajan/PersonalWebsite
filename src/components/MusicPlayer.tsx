import { Play, Pause, SkipForward, SkipBack, Shuffle } from 'lucide-react';
import { playlist, useMusic } from '../state/MusicContext';

const clock = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

export default function MusicPlayer() {
  const { index, isPlaying, isShuffle, error, time, duration, seek, toggle, next, previous, playTrack, toggleShuffle } = useMusic();
  const track = playlist[index];
  const iconBtn = 'rounded p-1.5 text-ctp-subtext0 hover:bg-ctp-surface0 hover:text-ctp-text';

  return (
    <div className="flex flex-col p-3 text-xs">
      {/* now playing, with the credit the CC licenses ask for */}
      <div className="mb-2 flex items-baseline gap-2">
        <span className="truncate text-sm font-bold text-ctp-text">{track.title}</span>
        <span className="truncate text-ctp-subtext0">{track.artist}</span>
        <a
          href={track.source}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto shrink-0 text-[10px] text-ctp-overlay1 underline decoration-ctp-surface2 underline-offset-2 hover:text-ctp-text"
          title={`${track.title} by ${track.artist}, licensed ${track.license.name}`}
        >
          {track.license.name}
        </a>
      </div>

      <div className="mb-2 flex items-center gap-2 text-[10px] text-ctp-overlay1">
        <span className="w-8 tabular-nums">{clock(time)}</span>
        <input
          type="range"
          min={0}
          max={duration || 1}
          step={1}
          value={Math.min(time, duration || 1)}
          onChange={(e) => seek(Number(e.target.value))}
          disabled={!duration}
          className="h-1 flex-1 cursor-pointer accent-ctp-mauve disabled:cursor-default"
          aria-label="Seek"
        />
        <span className="w-8 text-right tabular-nums">{duration ? clock(duration) : '-:--'}</span>
      </div>

      <div className="mb-2 flex items-center gap-1">
        <button onClick={previous} className={iconBtn} aria-label="Previous track">
          <SkipBack className="h-3.5 w-3.5" />
        </button>
        <button
          onClick={toggle}
          className="rounded-md bg-ctp-mauve p-1.5 text-ctp-crust hover:bg-ctp-lavender"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause className="h-3.5 w-3.5" fill="currentColor" /> : <Play className="h-3.5 w-3.5" fill="currentColor" />}
        </button>
        <button onClick={next} className={iconBtn} aria-label="Next track">
          <SkipForward className="h-3.5 w-3.5" />
        </button>
        <button
          onClick={toggleShuffle}
          className={`${iconBtn} ml-auto ${isShuffle ? 'text-ctp-mauve' : ''}`}
          aria-label="Shuffle"
          aria-pressed={isShuffle}
        >
          <Shuffle className="h-3.5 w-3.5" />
        </button>
      </div>

      {error && <p className="mb-2 px-1.5 text-ctp-red">{error}</p>}

      <ol className="m-0 max-h-[6.25rem] list-none space-y-0.5 overflow-y-auto border-t border-ctp-surface0 p-0 pt-2">
        {playlist.map((t, i) => {
          const isCurrent = i === index;
          return (
            <li key={t.url}>
              <button
                onClick={() => playTrack(i)}
                className={`flex w-full gap-2 rounded px-1.5 py-0.5 text-left ${
                  isCurrent ? 'bg-ctp-surface0 text-ctp-mauve' : 'text-ctp-subtext1 hover:bg-ctp-surface0/60'
                }`}
              >
                <span className="w-4 shrink-0 text-ctp-overlay0">{isCurrent && isPlaying ? '▶' : i + 1}</span>
                <span className="truncate">{t.title}</span>
                <span className="ml-auto shrink-0 text-ctp-overlay0">{t.artist}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
