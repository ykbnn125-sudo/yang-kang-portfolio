import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './motion.css';

gsap.registerPlugin(ScrollTrigger);

export default function MotionDirector() {
  const curtain = useRef(null);
  const opening = useRef(null);
  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    let cancelled = false;
    let safety;
    const start = () => {
      if (cancelled) return;
      media.add('(prefers-reduced-motion: no-preference)', () => {
        const ease = 'power4.inOut';
        const deepLink = location.hash && location.hash !== '#home';
        const intro = gsap.timeline({ defaults: { ease }, onComplete: () => {
          curtain.current?.setAttribute('hidden', '');
          ScrollTrigger.refresh();
        }});
        opening.current = intro;
        if (!deepLink && scrollY < 100) {
          gsap.set(curtain.current, { display: 'flex' });
          intro.fromTo('.opening-word', { yPercent: 115, scaleY: .75 }, { yPercent: 0, scaleY: 1, duration: 1.25 }, 0)
            .to('.opening-word', { yPercent: -120, duration: .85 }, 1.7)
            .to(curtain.current, { clipPath: 'inset(0 0 100% 0)', duration: 1.55 }, 1.85)
            .from('.hero-grain', { scale: 1.16, duration: 2.7 }, 1.9)
            .from('.hero-warp-heading .warp-text', { yPercent: 115, scaleY: .38, scaleX: .86, rotation: 4, transformOrigin: '0% 100%', duration: 2.05, clearProps: 'transform' }, 2.15)
            .from('.hero .eyebrow,.hero .hello', { y: 45, clipPath: 'inset(100% 0 0 0)', duration: 1.35, stagger: .15, clearProps: 'all' }, 2.35)
            .from('.hero-manifesto', { y: 100, clipPath: 'inset(100% 0 0 0)', duration: 1.7, clearProps: 'all' }, 2.65)
            .from('.nav > *', { y: -65, duration: 1.5, stagger: .12, clearProps: 'transform' }, 2.65)
            .from('.hero .pill', { y: 55, scale: .88, autoAlpha: 0, duration: 1.25, clearProps: 'transform,opacity,visibility' }, 3.1)
            .from('.hero-disciplines > div,.hero-bottom', { y: 55, autoAlpha: 0, duration: 1.4, stagger: .1, clearProps: 'transform,opacity,visibility' }, 3.2);
        } else {
          curtain.current.hidden = true;
        }

        gsap.from('.brand-strip > *', { scrollTrigger: { trigger: '.brand-strip', start: 'top 94%', once: true }, y: 65, clipPath: 'inset(100% 0 0 0)', duration: 1.4, stagger: .1, ease: 'power3.out', clearProps: 'transform,clipPath' });
        document.querySelectorAll('main > .section').forEach(section => {
          const heading = section.querySelector('h2');
          const label = section.querySelector('.section-label');
          const tl = gsap.timeline({ scrollTrigger: { trigger: heading, start: 'top 92%', once: true }, defaults: { ease: 'power4.out' } });
          // FoldText owns its letter animation; do not move or scale its heading.
          if (!heading.classList.contains('fold-heading')) tl.from(heading, { y: 145, rotation: 3, scaleY: .55, transformOrigin: '0% 100%', clipPath: 'inset(100% 0 0 0)', duration: 1.9, clearProps: 'transform,clipPath' }, 0);
          tl.from(label, { clipPath: 'inset(0 100% 0 0)', duration: 1.6, clearProps: 'clipPath' }, .15);
          const supporting = section.querySelectorAll('.bio-text,.stats > div,.bio-links,.section-heading > p,.contact-main > p,.mail,.copy');
          if (supporting.length) tl.from(supporting, { y: 65, autoAlpha: 0, duration: 1.2, stagger: .12, clearProps: 'transform,opacity,visibility' }, .65);
        });

        const portrait = document.querySelector('.portrait-wrap');
        gsap.from(portrait, { scrollTrigger: { trigger: '.bio h2', start: 'top 92%', once: true }, clipPath: 'inset(0 0 100% 0 round 25px)', y: 70, duration: 2, delay: .45, ease, clearProps: 'transform,clipPath' });
        gsap.fromTo('.portrait-wrap img', { scale: 1.13, yPercent: -4 }, { scale: 1.04, yPercent: 3, ease: 'none', scrollTrigger: { trigger: portrait, start: 'top bottom', end: 'bottom top', scrub: 1.6 } });

        const cards = gsap.utils.toArray('.project');
        for (let i = 0; i < cards.length; i += 2) {
          const row = cards.slice(i, i + 2);
          gsap.from(row, { scrollTrigger: { trigger: row[0], start: 'top 96%', once: true }, y: 150, rotation: 2, scale: .94, clipPath: 'inset(0 0 100% 0 round 28px)', duration: 1.85, delay: i === 0 ? .45 : .1, stagger: .24, ease, clearProps: 'transform,clipPath' });
        }
        cards.forEach(card => {
          gsap.fromTo(card.querySelector('.cover-stage svg'), { yPercent: -4, scale: 1.08 }, { yPercent: 4, scale: 1.02, ease: 'none', scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: 1.8 } });
        });
        ['.skills article', '.journey > div', '.contact-details > *'].forEach(selector => {
          const targets = gsap.utils.toArray(selector);
          gsap.from(targets, { scrollTrigger: { trigger: targets[0], start: 'top 94%', once: true }, y: 100, clipPath: 'inset(100% 0 0 0)', duration: 1.65, stagger: .18, delay: .35, ease, clearProps: 'transform,clipPath' });
        });
        // Keyboard navigation must never leave a focused control behind a reveal mask.
        const revealFocus = event => {
          const card = event.target.closest('.project');
          if (card) { gsap.killTweensOf(card); gsap.set(card, { clearProps: 'transform,clipPath' }); }
        };
        document.addEventListener('focusin', revealFocus);
        ScrollTrigger.refresh();
        return () => document.removeEventListener('focusin', revealFocus);
      });
    };
    // Wait for font metrics, with a bounded fallback so the entrance never blocks content.
    let started = false;
    const ready = () => { if (!started) { started = true; start(); } };
    document.fonts.ready.then(ready);
    safety = setTimeout(ready, 900);
    return () => { cancelled = true; clearTimeout(safety); media.revert(); opening.current = null; };
  }, []);
  return <div ref={curtain} className="opening-curtain" aria-hidden="true">
    <div className="opening-landscape"/>
    <div className="opening-frost"/>
    <div className="opening-lockup"><div className="opening-mask"><span className="opening-word">yangkang</span></div></div>
  </div>;
}
