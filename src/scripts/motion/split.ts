import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

/**
 * 텍스트 분할 등장 애니메이션
 *
 *   <h1 data-split>                 단어 단위, 페이지 로드 시 즉시
 *   <h2 data-split="chars" data-split-scroll>   글자 단위, 스크롤 진입 시
 *
 * 한글은 글자 단위보다 단어(words)/줄(lines) 단위가 자연스러운 경우가 많습니다.
 */
export function initSplit() {
  gsap.utils.toArray<HTMLElement>('[data-split]').forEach((el) => {
    const type = (el.dataset.split || 'words') as 'words' | 'chars' | 'lines';
    const onScroll = el.hasAttribute('data-split-scroll');

    SplitText.create(el, {
      type: type === 'chars' ? 'words,chars' : type,
      mask: type === 'chars' ? 'words' : type,
      autoSplit: true,
      onSplit(self) {
        gsap.set(el, { visibility: 'visible' });
        const targets = self[type];
        return gsap.from(targets, {
          yPercent: 110,
          opacity: 0,
          duration: 1.1,
          ease: 'expo.out',
          stagger: type === 'chars' ? 0.02 : 0.06,
          delay: Number(el.dataset.delay ?? 0.1),
          scrollTrigger: onScroll ? { trigger: el, start: 'top 85%', once: true } : undefined,
        });
      },
    });
  });
}
