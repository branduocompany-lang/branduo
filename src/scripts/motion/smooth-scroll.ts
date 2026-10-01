import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let lenis: Lenis | null = null;

export const getLenis = () => lenis;

/** Lenis 관성 스크롤 + GSAP ticker 동기화 */
export function initSmoothScroll() {
  lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    autoRaf: false,
  });

  lenis.on('scroll', ScrollTrigger.update);

  // 페이지 내 앵커(#id) 클릭: 천천히 가속했다가 부드럽게 감속하며 이동
  const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const onAnchorClick = (e: MouseEvent) => {
    const link = (e.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
    const id = link?.getAttribute('href')?.slice(1);
    if (!link || !id) return;
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    e.stopPropagation();
    // 거리에 비례해 시간을 늘려, 가까우면 빠르게 멀면 여유 있게 이동
    const dist = Math.abs(target.getBoundingClientRect().top);
    const duration = Math.min(2.4, Math.max(0.9, dist / 1500));
    lenis?.scrollTo(target, { offset: 0, duration, easing: easeInOut });
    history.replaceState(null, '', `#${id}`);
  };
  document.addEventListener('click', onAnchorClick, true);

  const tick = (time: number) => lenis?.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  return () => {
    document.removeEventListener('click', onAnchorClick, true);
    gsap.ticker.remove(tick);
    lenis?.destroy();
    lenis = null;
  };
}
