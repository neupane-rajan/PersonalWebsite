import { useEffect, useRef } from 'react';

// Declare AudioMotion type for TypeScript
interface AudioMotionAnalyzerConstructor {
  new (container: HTMLElement | null, options?: Record<string, unknown>): AudioMotionAnalyzerInstance;
}

interface AudioMotionAnalyzerInstance {
  registerGradient: (name: string, options: Record<string, unknown>) => void;
  gradient: string;
  connectInput?: (element: HTMLMediaElement) => void;
  disconnectInput?: () => void;
  destroy?: () => void;
}

declare global {
  interface Window {
    AudioMotionAnalyzer: AudioMotionAnalyzerConstructor;
  }
}

interface AudioMotionVisualizerProps {
  audioElement?: HTMLAudioElement | null;
}

export default function AudioMotionVisualizer({ audioElement }: AudioMotionVisualizerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const analyzerRef = useRef<AudioMotionAnalyzerInstance | null>(null);
  const initializedRef = useRef(false);
  const connectedAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!containerRef.current || !audioElement) return;
    
    // Prevent duplicate initialization or re-connection to the same audio element
    if (initializedRef.current && connectedAudioRef.current === audioElement) return;
    
    // If we're connecting to a different audio element, clean up first
    if (analyzerRef.current && connectedAudioRef.current !== audioElement) {
      try {
        if (analyzerRef.current.disconnectInput) analyzerRef.current.disconnectInput();
        if (analyzerRef.current.destroy) analyzerRef.current.destroy();
        analyzerRef.current = null;
      } catch (error) {
        console.error('Error cleaning up previous AudioMotion instance:', error);
      }
      initializedRef.current = false;
    }

    // Wait for AudioMotion library to load
    const initAnalyzer = () => {
      if (!window.AudioMotionAnalyzer) {
        setTimeout(initAnalyzer, 100);
        return;
      }

      // Check again to prevent race conditions
      if (initializedRef.current && connectedAudioRef.current === audioElement) return;
      initializedRef.current = true;

      try {
        // Create AudioMotion Analyzer instance WITHOUT the audio source
        // We'll connect it manually to avoid the "already connected" error
        analyzerRef.current = new window.AudioMotionAnalyzer(containerRef.current, {
          // Don't pass source here - will connect manually
          
          // CAVA-style vertical bars
          mode: 5, // 1/6th octave bands
          barSpace: 0.1,
          gradient: 'rainbow', 
          
          // Smooth animation
          smoothing: 0.7,
          
          // Frequency range
          minFreq: 20,
          maxFreq: 16000,
          
          // Visual settings
          showScaleX: false,
          showScaleY: false,
          showPeaks: false,
          
          // Background
          bgAlpha: 0,
          overlay: true,
          
          // Performance
          fps: 60,
          
          // Responsiveness
          reflexRatio: 0,
          reflexAlpha: 0,
        });

        // Now register custom gradient matching Catppuccin theme
        analyzerRef.current.registerGradient('catppuccin', {
          bgColor: '#1e1e2e', // ctp-base
          colorStops: [
            { pos: 0, color: '#cba6f7' },    // ctp-mauve (bass)
            { pos: 0.5, color: '#89b4fa' },  // ctp-blue (mids)
            { pos: 1, color: '#94e2d5' }     // ctp-teal (treble)
          ]
        });

        // Apply the custom gradient
        analyzerRef.current.gradient = 'catppuccin';
        
        // Manually connect the audio source using connectInput
        // This is called on the analyzer's audioCtx, avoiding the duplicate connection issue
        if (analyzerRef.current?.connectInput && audioElement) {
          try {
            analyzerRef.current.connectInput(audioElement);
          } catch (err) {
            console.warn('Could not connect audio input, might already be connected:', err);
          }
        }
        
        // Track the connected audio element
        connectedAudioRef.current = audioElement;

      } catch (error) {
        console.error('Failed to initialize AudioMotion:', error);
        initializedRef.current = false;
        connectedAudioRef.current = null;
      }
    };

    initAnalyzer();

    return () => {
      if (analyzerRef.current) {
        try {
          if (analyzerRef.current.disconnectInput) analyzerRef.current.disconnectInput();
          if (analyzerRef.current.destroy) analyzerRef.current.destroy();
          analyzerRef.current = null;
        } catch (error) {
          console.error('Error cleaning up AudioMotion:', error);
        }
      }
      initializedRef.current = false;
      connectedAudioRef.current = null;
    };
  }, [audioElement]);

  return (
    <div className="relative w-full h-full">
      {/* Visualizer container */}
      <div
        ref={containerRef}
        className="absolute inset-0 w-full h-full"
        style={{ backgroundColor: '#1e1e2e' }}
      />
    </div>
  );
}
