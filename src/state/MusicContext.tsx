import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';

const IA = 'https://archive.org/download';
const BY4 = { name: 'CC BY 4.0', url: 'https://creativecommons.org/licenses/by/4.0/' };
const BY3 = { name: 'CC BY 3.0', url: 'https://creativecommons.org/licenses/by/3.0/' };
const BYSA3 = { name: 'CC BY-SA 3.0', url: 'https://creativecommons.org/licenses/by-sa/3.0/' };

/**
 * Creative Commons songs with vocals, streamed from the Internet Archive
 * (which sends the CORS headers the visualizer needs). The licenses require
 * crediting the artist, which the player does for the current track.
 */
// eslint-disable-next-line react-refresh/only-export-components
export const playlist = [
  { title: 'Half-Life', artist: 'Josh Woodward', license: BY4, source: 'https://archive.org/details/JoshWoodward-TheShadeFromOurTrees', url: `${IA}/JoshWoodward-TheShadeFromOurTrees/JoshWoodward-TheShadeFromOurTrees-02-HalfLife.mp3` },
  { title: 'Bad Sign', artist: 'Brad Sucks', license: BYSA3, source: 'https://archive.org/details/Out_Of_It-3406', url: `${IA}/Out_Of_It-3406/Brad_Sucks_-_04_-_Bad_Sign.mp3` },
  { title: 'Crown', artist: 'Kellee Maize', license: BY3, source: 'https://archive.org/details/jamendo-248340', url: `${IA}/jamendo-248340/01-1458876-Kellee%20Maize-Crown.mp3` },
  { title: 'My Favorite Regret', artist: 'Josh Woodward', license: BY4, source: 'https://archive.org/details/pandacd-706-addressed-to-the-stars', url: `${IA}/pandacd-706-addressed-to-the-stars/04%20-%20Josh%20Woodward%20-%20My%20Favorite%20Regret.mp3` },
  { title: 'Total Breakdown', artist: 'Brad Sucks', license: BYSA3, source: 'https://archive.org/details/Out_Of_It-3406', url: `${IA}/Out_Of_It-3406/Brad_Sucks_-_07_-_Total_Breakdown.mp3` },
  { title: 'Pompeii', artist: 'Josh Woodward', license: BY4, source: 'https://archive.org/details/JoshWoodward-Ashes', url: `${IA}/JoshWoodward-Ashes/JoshWoodward-Ashes-09-Pompeii.mp3` },
  { title: 'Release', artist: 'Josh Woodward', license: BY4, source: 'https://archive.org/details/pandacd-706-addressed-to-the-stars', url: `${IA}/pandacd-706-addressed-to-the-stars/01%20-%20Josh%20Woodward%20-%20Release.mp3` },
  { title: 'Let It In', artist: 'Josh Woodward', license: BY4, source: 'https://archive.org/details/JoshWoodward-Ashes', url: `${IA}/JoshWoodward-Ashes/JoshWoodward-Ashes-01-LetItIn.mp3` },
];

interface MusicState {
  audio: HTMLAudioElement | null;
  index: number;
  isPlaying: boolean;
  isShuffle: boolean;
  error: string | null;
  time: number;
  duration: number;
  volume: number;
  muted: boolean;
  setVolume: (v: number) => void;
  toggleMute: () => void;
  seek: (seconds: number) => void;
  toggle: () => void;
  next: () => void;
  previous: () => void;
  playTrack: (index: number) => void;
  toggleShuffle: () => void;
}

const MusicContext = createContext<MusicState | null>(null);

export function MusicProvider({ children }: { children: ReactNode }) {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(0.5);
  const [muted, setMuted] = useState(false);
  const played = useRef<Set<number>>(new Set());

  // One audio element for the whole site, so music survives workspace switches
  useEffect(() => {
    const el = new Audio(playlist[0].url);
    el.crossOrigin = 'anonymous';
    el.preload = 'none';
    el.volume = 0.5;
    const sync = () => setIsPlaying(!el.paused);
    const progress = () => {
      setTime(el.currentTime);
      setDuration(Number.isFinite(el.duration) ? el.duration : 0);
    };
    const levels = () => {
      setVolumeState(el.volume);
      setMuted(el.muted);
    };
    el.addEventListener('volumechange', levels);
    const events = ['play', 'pause'] as const;
    const progressEvents = ['timeupdate', 'durationchange', 'emptied'] as const;
    events.forEach((e) => el.addEventListener(e, sync));
    progressEvents.forEach((e) => el.addEventListener(e, progress));
    setAudio(el);
    return () => {
      el.pause();
      el.removeEventListener('volumechange', levels);
      events.forEach((e) => el.removeEventListener(e, sync));
      progressEvents.forEach((e) => el.removeEventListener(e, progress));
    };
  }, []);

  const play = useCallback(async () => {
    if (!audio) return;
    try {
      setError(null);
      await audio.play();
    } catch (err: unknown) {
      // AbortError just means play() was interrupted by a pause or track change
      if (err instanceof Error && err.name !== 'AbortError') {
        setError("Couldn't load this track. Try the next one.");
      }
    }
  }, [audio]);

  const load = useCallback((i: number) => {
    if (!audio) return;
    setIndex(i);
    audio.src = playlist[i].url;
    play();
  }, [audio, play]);

  const next = useCallback(() => {
    if (!isShuffle) return load((index + 1) % playlist.length);
    const unplayed = playlist.map((_, i) => i).filter((i) => i !== index && !played.current.has(i));
    if (unplayed.length === 0) played.current.clear();
    const pool = unplayed.length ? unplayed : playlist.map((_, i) => i).filter((i) => i !== index);
    const pick = pool[Math.floor(Math.random() * pool.length)];
    played.current.add(pick);
    load(pick);
  }, [index, isShuffle, load]);

  useEffect(() => {
    if (!audio) return;
    audio.addEventListener('ended', next);
    return () => audio.removeEventListener('ended', next);
  }, [audio, next]);

  const value = useMemo<MusicState>(() => ({
    audio,
    index,
    isPlaying,
    isShuffle,
    error,
    time,
    duration,
    volume,
    muted,
    setVolume: (v) => {
      if (!audio) return;
      audio.volume = Math.min(1, Math.max(0, v));
      audio.muted = false;
    },
    toggleMute: () => {
      if (audio) audio.muted = !audio.muted;
    },
    seek: (seconds) => {
      if (audio && Number.isFinite(audio.duration)) audio.currentTime = seconds;
    },
    toggle: () => (audio?.paused ? play() : audio?.pause()),
    next,
    previous: () => load(index === 0 ? playlist.length - 1 : index - 1),
    playTrack: (i) => {
      if (i === index) return audio?.paused ? void play() : audio?.pause();
      if (isShuffle) played.current.add(i);
      load(i);
    },
    toggleShuffle: () => {
      played.current = new Set([index]);
      setIsShuffle((s) => !s);
    },
  }), [audio, index, isPlaying, isShuffle, error, time, duration, volume, muted, play, next, load]);

  return <MusicContext.Provider value={value}>{children}</MusicContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error('useMusic must be used inside <MusicProvider>');
  return ctx;
}
