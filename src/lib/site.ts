export const SITE = {
  name: 'Brand',
  title: 'Brand — 한 줄 슬로건',
  description: '서비스를 한 문장으로 설명하는 메타 디스크립션을 적어주세요.',
  locale: 'ko_KR',
} as const;

export const NAV = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
] as const;
