import { gsap } from 'gsap';

/**
 * 스크롤 패럴랙스
 *
 *   <div data-parallax="0.2">   양수: 스크롤보다 느리게(뒤), 음수: 빠르게(앞)
 */
export function initParallax() {
  gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
    const speed = Number(el.dataset.parallax || 0.2);
    gsap.fromTo(
      el,
      { yPercent: -speed * 50 },
      {
        yPercent: speed * 50,
        ease: 'none',
        scrollTrigger: {
          trigger: el.parentElement ?? el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      },
    );
  });
}
