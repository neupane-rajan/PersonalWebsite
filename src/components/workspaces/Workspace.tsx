import type { ReactNode } from 'react';

interface WorkspaceProps {
  id: string;
  name: string;
  children: ReactNode;
}

/** One Hyprland workspace: a screen of tiled windows, stacked one after another down the page */
export default function Workspace({ id, name, children }: WorkspaceProps) {
  return (
    <section id={id} className="hypr-workspace" aria-label={name}>
      {children}
    </section>
  );
}
