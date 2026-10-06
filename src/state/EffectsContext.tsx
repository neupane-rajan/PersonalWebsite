import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

/** Things that draw over the whole desktop: floating cows, trains, fullscreen cmatrix */
export type Effect =
  | { id: number; kind: 'xcowsay'; text: string }
  | { id: number; kind: 'sl' }
  | { id: number; kind: 'cmatrix' };

type NewEffect = Effect extends infer E ? (E extends Effect ? Omit<E, 'id'> : never) : never;

interface EffectsState {
  effects: Effect[];
  spawn: (effect: NewEffect) => void;
  dismiss: (id: number) => void;
}

const EffectsContext = createContext<EffectsState | null>(null);
let nextId = 1;

export function EffectsProvider({ children }: { children: ReactNode }) {
  const [effects, setEffects] = useState<Effect[]>([]);

  const spawn = useCallback((effect: NewEffect) => {
    setEffects((list) => {
      // only one fullscreen matrix at a time
      if (effect.kind === 'cmatrix' && list.some((e) => e.kind === 'cmatrix')) return list;
      return [...list, { ...effect, id: nextId++ } as Effect];
    });
  }, []);

  const dismiss = useCallback((id: number) => {
    setEffects((list) => list.filter((e) => e.id !== id));
  }, []);

  const value = useMemo(() => ({ effects, spawn, dismiss }), [effects, spawn, dismiss]);
  return <EffectsContext.Provider value={value}>{children}</EffectsContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useEffectsLayer() {
  const ctx = useContext(EffectsContext);
  if (!ctx) throw new Error('useEffectsLayer must be used inside <EffectsProvider>');
  return ctx;
}
