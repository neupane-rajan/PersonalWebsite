import { useEffect, useRef, useState, useCallback } from 'react';
import { Play, Pause, SkipForward, SkipBack, Shuffle } from 'lucide-react';

  // Expanded lofi BGM playlist - using reliable sources
  const playlist = [
    { title: 'Lofi Study', url: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Chad_Crouch/Arps/Chad_Crouch_-_Elipsis.mp3' },
    { title: 'Chill Abstract', url: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Chad_Crouch/Arps/Chad_Crouch_-_Algorithms.mp3' },
    { title: 'Ambient Relax', url: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Chad_Crouch/Arps/Chad_Crouch_-_Shipping_Lanes.mp3' },
    { title: 'Night Vibes', url: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Tours/Enthusiast/Tours_-_01_-_Enthusiast.mp3' },
  ];

  interface MusicPlayerProps {
    onAudioReady?: (audio: HTMLAudioElement) => void;
  }
  
  export default function MusicPlayer({ onAudioReady }: MusicPlayerProps) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isShuffle, setIsShuffle] = useState(false);
    const playedTracksRef = useRef<Set<number>>(new Set());
  
    // Helper to safely play audio and handle AbortError
    const safePlay = async () => {
      if (!audioRef.current) return;
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error: unknown) {
        // Ignore AbortError which happens when pausing quickly after playing
        if (error instanceof Error && error.name !== 'AbortError') {
          console.error('Playback failed:', error);
        }
      }
    };
  
    const playNext = useCallback(() => {
      if (!audioRef.current) return;
  
      let nextIndex: number;
      
      if (isShuffle) {
        // Shuffle mode: pick a random track that hasn't been played yet
        const unplayedTracks = playlist
          .map((_, idx) => idx)
          .filter(idx => idx !== currentTrackIndex && !playedTracksRef.current.has(idx));
        
        if (unplayedTracks.length === 0) {
          // All tracks played, reset
          playedTracksRef.current.clear();
          nextIndex = Math.floor(Math.random() * playlist.length);
        } else {
          nextIndex = unplayedTracks[Math.floor(Math.random() * unplayedTracks.length)];
        }
        
        playedTracksRef.current.add(nextIndex);
      } else {
        // Sequential mode
        nextIndex = (currentTrackIndex + 1) % playlist.length;
      }
  
      setCurrentTrackIndex(nextIndex);
      audioRef.current.src = playlist[nextIndex].url;
      safePlay();
    }, [currentTrackIndex, isShuffle]);
  
  // Initialize audio element once
  useEffect(() => {
    // Only initialize if not already done
    if (!audioRef.current) {
      // Check if playlist has items
      if (playlist.length > 0) {
        audioRef.current = new Audio(playlist[0].url);
        audioRef.current.crossOrigin = 'anonymous';
        audioRef.current.volume = 0.5;
        
        // Pass audio element to parent for visualizer
        if (onAudioReady) {
          onAudioReady(audioRef.current);
        }
      }
    }

    // Cleanup on unmount only
    return () => {
      // We don't pause here to allow background play if desired, 
      // but if unmounting means stop, then:
      if (audioRef.current) {
        audioRef.current.pause();
        // Don't clear src immediately to avoid "element has no supported sources" 
        // if play is attempted during unmount
      }
    };
  }, [onAudioReady]); // Run only when onAudioReady changes
  
    // Handle ended event separately
    useEffect(() => {
      const audio = audioRef.current;
      if (!audio) return;
  
      const handleEnded = () => {
        playNext();
      };
  
      audio.addEventListener('ended', handleEnded);
      return () => {
        audio.removeEventListener('ended', handleEnded);
      };
    }, [playNext]); // Re-bind listener when playNext changes

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      safePlay();
    }
  };

  const playPrevious = () => {
    if (!audioRef.current) return;

    const prevIndex = currentTrackIndex === 0 
      ? playlist.length - 1 
      : currentTrackIndex - 1;

    setCurrentTrackIndex(prevIndex);
    audioRef.current.src = playlist[prevIndex].url;
    safePlay();
  };

  const playTrack = (index: number) => {
    if (!audioRef.current || index === currentTrackIndex) return;

    setCurrentTrackIndex(index);
    audioRef.current.src = playlist[index].url;
    safePlay();

    if (isShuffle) {
      playedTracksRef.current.add(index);
    }
  };

  const toggleShuffle = () => {
    setIsShuffle(!isShuffle);
    if (!isShuffle) {
      playedTracksRef.current.clear();
      playedTracksRef.current.add(currentTrackIndex);
    }
  };

  return (
    <div className="h-full flex flex-col bg-ctp-base text-ctp-text font-mono text-xs p-3 overflow-hidden">
      {/* Controls */}
      <div className="flex items-center justify-center gap-3 mb-3 pb-3 border-b border-ctp-surface0">
        <button
          onClick={toggleShuffle}
          className={`p-1.5 rounded transition-colors ${
            isShuffle 
              ? 'bg-ctp-mauve text-ctp-base' 
              : 'hover:bg-ctp-surface0 text-ctp-overlay1'
          }`}
          aria-label="Shuffle"
        >
          <Shuffle className="w-3 h-3" />
        </button>
        
        <button
          onClick={playPrevious}
          className="p-1.5 rounded hover:bg-ctp-surface0 text-ctp-text transition-colors"
          aria-label="Previous"
        >
          <SkipBack className="w-3 h-3" />
        </button>
        
        <button
          onClick={togglePlay}
          className="p-2 rounded-full bg-ctp-mauve text-ctp-base hover:bg-ctp-mauve/80 transition-colors"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4" fill="currentColor" />
          ) : (
            <Play className="w-4 h-4 ml-0.5" fill="currentColor" />
          )}
        </button>
        
        <button
          onClick={playNext}
          className="p-1.5 rounded hover:bg-ctp-surface0 text-ctp-text transition-colors"
          aria-label="Next"
        >
          <SkipForward className="w-3 h-3" />
        </button>
      </div>

      {/* Playlist */}
      <div className="flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-ctp-surface0 scrollbar-track-transparent">
        <div className="text-ctp-overlay0 text-[9px] mb-2 uppercase tracking-wider">Playlist:</div>
        <div className="space-y-1">
          {playlist.map((track, index) => (
            <button
              key={index}
              onClick={() => playTrack(index)}
              className={`w-full text-left px-2 py-1.5 rounded transition-colors flex items-center gap-2 ${
                index === currentTrackIndex
                  ? 'bg-ctp-surface0 text-ctp-mauve'
                  : 'hover:bg-ctp-surface0/50 text-ctp-text'
              }`}
            >
              <span className="text-ctp-overlay0 text-[9px] w-5">{index + 1}.</span>
              <span className="truncate flex-grow">{track.title}</span>
              {index === currentTrackIndex && isPlaying && (
                <span className="text-ctp-mauve animate-pulse text-[9px]">♪</span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
