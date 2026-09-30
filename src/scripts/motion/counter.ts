import { gsap } from 'gsap';

/**
 * 숫자 카운트업
 *
 *   <span data-count="1200" data-suffix="+">0</span>
 *   <span data-count="99.9" data-decimals="1" data-suffix="%">0</span>
 */
export function initCounter({ instant = false } = {}) {
  gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
    const end = Number(el.dataset.count);
    const decimals = Number(el.dataset.decimals ?? 0);
    const suffix = el.dataset.suffix ?? '';
    const fmt = (n: number) =>
      n.toLocaleString('ko-KR', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }) + suffix;

    if (instant) {
      el.textContent = fmt(end);
      return;
    }

    const state = { v: 0 };
    el.textContent = fmt(0);
    gsap.to(state, {
      v: end,
      duration: 2,
      ease: 'power3.out',
      onUpdate: () => {
        el.textContent = fmt(state.v);
      },
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    });
  });
}
