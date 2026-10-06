import { useEffect, useState, type ComponentType } from 'react';
import Navigation from './components/Navigation';
import Workspace from './components/workspaces/Workspace';
import HomeWorkspace from './components/workspaces/HomeWorkspace';
import AboutWorkspace from './components/workspaces/AboutWorkspace';
import ProjectsWorkspace from './components/workspaces/ProjectsWorkspace';
import SkillsWorkspace from './components/workspaces/SkillsWorkspace';
import ContactWorkspace from './components/workspaces/ContactWorkspace';
import ToysWorkspace from './components/workspaces/ToysWorkspace';
import EffectsLayer from './components/toys/EffectsLayer';
import { MusicProvider } from './state/MusicContext';
import { EffectsProvider } from './state/EffectsContext';
import { goToWorkspace, workspaces, type WorkspaceId } from './data/workspaces';
import useBootstrapTooltips from './hooks/useBootstrapTooltips';

const views: Record<WorkspaceId, ComponentType> = {
  home: HomeWorkspace,
  about: AboutWorkspace,
  projects: ProjectsWorkspace,
  skills: SkillsWorkspace,
  contact: ContactWorkspace,
  toys: ToysWorkspace,
};

const isTyping = (el: EventTarget | null) =>
  el instanceof HTMLElement && (el.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName));

function Desktop() {
  const [active, setActive] = useState<WorkspaceId>('home');
  useBootstrapTooltips();

  // The active workspace is the last one whose top has passed a line under waybar
  useEffect(() => {
    const update = () => {
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      const line = window.innerHeight * 0.35;
      const current = atBottom
        ? workspaces[workspaces.length - 1]
        : [...workspaces].reverse().find((ws) => (document.getElementById(ws.id)?.getBoundingClientRect().top ?? Infinity) <= line);
      const id = current?.id ?? 'home';
      setActive(id);
      // keep the URL shareable without adding history entries or jumping
      if (location.hash.slice(1) !== id) history.replaceState(null, '', id === 'home' ? location.pathname : `#${id}`);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  // 1–6 like SUPER+1..6
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey || isTyping(e.target)) return;
      const ws = /^[1-9]$/.test(e.key) ? workspaces[Number(e.key) - 1] : undefined;
      if (ws) {
        e.preventDefault();
        goToWorkspace(ws.id);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <Navigation active={active} />
      <main>
        {workspaces.map((ws) => {
          const View = views[ws.id];
          return (
            <Workspace key={ws.id} id={ws.id} name={ws.name}>
              <View />
            </Workspace>
          );
        })}
      </main>
      <EffectsLayer />
    </>
  );
}

export default function App() {
  return (
    <MusicProvider>
      <EffectsProvider>
        <Desktop />
      </EffectsProvider>
    </MusicProvider>
  );
}
