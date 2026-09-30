// @ts-check
import { defineConfig } from 'astro/config';

/**
 * GitHub Pages 배포 설정
 *
 * - 프로젝트 페이지:  https://<USER>.github.io/<REPO>/  → base = '/<REPO>'
 * - 사용자 페이지:    https://<USER>.github.io/         → base = '/'  (레포 이름이 <USER>.github.io 인 경우)
 *
 * CI(.github/workflows/deploy.yml)에서 GITHUB_OWNER / GITHUB_REPO 환경변수를 넘겨주므로
 * 보통은 이 파일을 건드릴 필요가 없습니다. 커스텀 도메인을 쓰면 SITE_URL을 지정하고 base는 '/'로 두세요.
 */
const owner = process.env.GITHUB_OWNER;
const repo = process.env.GITHUB_REPO;
const isUserSite = !!repo && repo.toLowerCase() === `${owner?.toLowerCase()}.github.io`;

const site = process.env.SITE_URL ?? (owner ? `https://${owner}.github.io` : 'http://localhost:4321');
const base = process.env.SITE_URL || !repo || isUserSite ? '/' : `/${repo}`;

export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  build: {
    // GitHub Pages는 /about → /about/index.html 을 자연스럽게 서빙합니다.
    format: 'directory',
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
});
