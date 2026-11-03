import { useEffect, useState } from 'react';

// Mount expensive resources shortly before they enter the viewport.
export default function useNearViewport(ref, margin = '400px') {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        setReady(true);
        observer.disconnect();
      }
    }, { rootMargin: margin });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, margin]);
  return ready;
}
