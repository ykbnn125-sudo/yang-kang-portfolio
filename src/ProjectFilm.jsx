import React, { useEffect, useRef } from 'react';

export default function ProjectFilm({src, label}) {
  const ref = useRef(null);
  useEffect(() => {
    const video = ref.current;
    let visible = true;
    let suspended = false;
    let resume = !matchMedia('(prefers-reduced-motion: reduce)').matches;
    const sync = () => {
      const active = visible && !document.hidden;
      if (!active && !suspended) {
        resume = !video.paused;
        suspended = true;
        video.pause();
      } else if (active && suspended) {
        suspended = false;
        if (resume) video.play().catch(() => {});
      }
    };
    const observer = new IntersectionObserver(([entry]) => {visible = entry.isIntersecting; sync();});
    observer.observe(video);
    document.addEventListener('visibilitychange', sync);
    return () => {observer.disconnect(); document.removeEventListener('visibilitychange', sync); video.pause();};
  }, [src]);
  return <div className="project-film"><video ref={ref} src={src} controls playsInline muted loop autoPlay={!matchMedia('(prefers-reduced-motion: reduce)').matches} preload="metadata" aria-label={label}/><div className="film-grain" aria-hidden="true"/></div>;
}
