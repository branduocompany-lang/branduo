/**
 * GitHub Pages 프로젝트 사이트는 /<repo>/ 하위에서 서빙되므로
 * 내부 링크와 public/ 에셋 경로는 항상 이 헬퍼를 거쳐야 합니다.
 *
 *   withBase('/')          → '/homepage/'
 *   withBase('about')      → '/homepage/about'
 *   withBase('/og.png')    → '/homepage/og.png'
 */
export function withBase(path = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${path.replace(/^\//, '')}`;
}

/** 현재 경로가 링크 경로와 같은지 (trailing slash 무시) */
export function isActive(current: string, href: string): boolean {
  const norm = (p: string) => p.replace(/\/$/, '') || '/';
  return norm(current) === norm(href);
}
