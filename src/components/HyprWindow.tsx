import type { ReactNode } from 'react';

export const HYPR_FOCUS_EVENT = 'hypr:focus';

interface HyprWindowProps {
  /** Shown in waybar while this window is active, like Hyprland's window title */
  title: string;
  className?: string;
  children: ReactNode;
}

const announce = (title: string | null) =>
  window.dispatchEvent(new CustomEvent(HYPR_FOCUS_EVENT, { detail: title }));

export default function HyprWindow({ title, className = '', children }: HyprWindowProps) {
  return (
    <div
      className={`hypr-window ${className}`}
      onMouseEnter={() => announce(title)}
      onMouseLeave={() => announce(null)}
      onFocus={() => announce(title)}
      onBlur={() => announce(null)}
    >
      {children}
    </div>
  );
}
