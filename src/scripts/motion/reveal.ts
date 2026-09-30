import { gsap } from 'gsap';

/**
 * 스크롤 진입 시 등장 애니메이션
 *
 *   <div data-reveal>                 기본 (아래→위 페이드)
 *   <div data-reveal="left|right|scale|fade">
 *   <div data-reveal data-delay="0.2">
 *   <ul data-stagger>                 자식들이 순차 등장
 *   <ul data-stagger="0.12">          stagger 간격 지정
 */
const FROM: Record<string, gsap.TweenVars> = {
  up: { y: 48 },
  left: { x: -48 },
  right: { x: 48 },
  scale: { scale: 0.92 },
  fade: {},
};

export function initReveal() {
  gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
    const from = FROM[el.dataset.reveal || 'up'] ?? FROM.up;
    gsap.fromTo(
      el,
      { opacity: 0, ...from },
      {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        duration: 1,
        delay: Number(el.dataset.delay ?? 0),
        ease: 'expo.out',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      },
    );
  });

  gsap.utils.toArray<HTMLElement>('[data-stagger]').forEach((group) => {
    gsap.fromTo(
      group.children,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'expo.out',
        stagger: Number(group.dataset.stagger || 0.08),
        scrollTrigger: { trigger: group, start: 'top 85%', once: true },
      },
    );
  });
}
