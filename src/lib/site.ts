export const SITE = {
  name: '브랜듀오',
  title: '브랜듀오 | 병원 마케팅·브랜딩, 대표가 직접 상담합니다',
  description:
    '광고만 해주는 마케팅이 아닌, 브랜드를 이해하고 성과를 만드는 병원 마케팅. 네이버 콘텐츠·플레이스·AI 최적화·의료광고 심의대행까지 대표가 직접 상담합니다.',
  locale: 'ko_KR',
  phone: '+82-507-1308-3454',
  email: 'brand_duo@naver.com',
  address: '경기 남양주시 순화궁로 249 C동 232호',
  ogImage: '/og.png',
} as const;

export const NAV = [
  { label: '대표 인사말', href: '/#message' },
  { label: '상품소개', href: '/#services' },
  { label: '프로세스', href: '/#process' },
  { label: '성과', href: '/#cases' },
  { label: '소식', href: '/#news' },
] as const;
