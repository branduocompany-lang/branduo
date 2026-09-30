import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * 헤더: 스크롤 내리면 숨김 / 올리면 표시, 상단을 벗어나면 배경 표시
 * 모바일 메뉴 토글도 여기서 처리 (페이지 전환마다 DOM 이 교체되므로 매번 바인딩)
 */
export function initHeader() {
  const header = document.querySelector<HTMLElement>('[data-header]');
  if (!header) return () => {};

  const st = ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate(self) {
      header.classList.toggle('is-scrolled', self.scroll() > 8);
      header.classList.toggle('is-hidden', self.direction === 1 && self.scroll() > 200);
    },
  });

  const toggle = header.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const nav = header.querySelector<HTMLElement>('nav');
  const setOpen = (open: boolean) => {
    header.classList.toggle('is-open', open);
    toggle?.setAttribute('aria-expanded', String(open));
    document.documentElement.classList.toggle('menu-open', open);
  };
  const onToggle = () => setOpen(!header.classList.contains('is-open'));
  const onNavClick = (e: Event) => {
    if ((e.target as HTMLElement).closest('a')) setOpen(false);
  };
  toggle?.addEventListener('click', onToggle);
  nav?.addEventListener('click', onNavClick);

  return () => {
    st.kill();
    toggle?.removeEventListener('click', onToggle);
    nav?.removeEventListener('click', onNavClick);
    document.documentElement.classList.remove('menu-open');
  };
}
