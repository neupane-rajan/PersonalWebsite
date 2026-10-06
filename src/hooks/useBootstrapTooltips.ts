import { useEffect } from 'react';
import Tooltip from 'bootstrap/js/dist/tooltip';

/** Wires up every [data-bs-toggle="tooltip"] element rendered by the app. */
export default function useBootstrapTooltips() {
  useEffect(() => {
    const tooltips = Array.from(
      document.querySelectorAll<HTMLElement>('[data-bs-toggle="tooltip"]'),
      (el) => new Tooltip(el, { container: 'body', animation: false }),
    );
    return () => tooltips.forEach((t) => t.dispose());
  }, []);
}
