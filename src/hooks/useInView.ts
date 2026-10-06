import { useEffect, useState, type RefObject } from 'react';

/** True while the element is on screen and the tab is visible — used to pause canvas loops */
export default function useInView(ref: RefObject<Element | null>) {
  const [inView, setInView] = useState(false);
  const [tabVisible, setTabVisible] = useState(!document.hidden);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);

  useEffect(() => {
    const onChange = () => setTabVisible(!document.hidden);
    document.addEventListener('visibilitychange', onChange);
    return () => document.removeEventListener('visibilitychange', onChange);
  }, []);

  return inView && tabVisible;
}
