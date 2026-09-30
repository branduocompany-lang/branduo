import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

import { initSmoothScroll } from './smooth-scroll';
import { initReveal } from './reveal';
import { initSplit } from './split';
import { initParallax } from './parallax';
import { initCounter } from './counter';
import { initMagnetic } from './magnetic';
import { initTilt } from './tilt';
import { initHeader } from './header';

gsap.registerPlugin(ScrollTrigger, SplitText);

export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const canHover = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;

type Cleanup = () => void;

/**
 * 페이지마다 한 번 호출 (astro:page-load).
 * 반환된 cleanup 을 astro:before-swap 에서 호출해 트윈/리스너/ScrollTrigger 를 정리합니다.
 */
export function initMotion(): Cleanup {
  const reduce = prefersReducedMotion();
  const cleanups: Cleanup[] = [];

  // gsap.context 안에서 만든 트윈/ScrollTrigger/SplitText 는 ctx.revert() 한 번으로 정리됩니다.
  const ctx = gsap.context(() => {
    if (reduce) {
      gsap.set('[data-reveal], [data-stagger] > *, [data-split]', {
        opacity: 1,
        visibility: 'visible',
      });
      initCounter({ instant: true });
      return;
    }

    initReveal();
    initSplit();
    initParallax();
    initCounter();
  });

  if (!reduce) cleanups.push(initSmoothScroll());
  cleanups.push(initHeader());

  if (!reduce && canHover()) {
    cleanups.push(initMagnetic(), initTilt());
  }

  // 폰트/이미지 로드 후 트리거 위치 재계산
  document.fonts?.ready.then(() => ScrollTrigger.refresh());

  return () => {
    cleanups.forEach((fn) => fn());
    ctx.revert();
  };
}
