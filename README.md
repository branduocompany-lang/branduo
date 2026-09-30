# Homepage

Astro 기반 2페이지 랜딩 사이트 보일러플레이트. GitHub Pages 배포, GSAP + Lenis 모션 포함.

## 시작하기

Node.js 20.3 이상(권장 22)이 필요합니다.

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # 타입 체크 + dist/ 생성
npm run preview   # 빌드 결과 미리보기
```

## 구조

```
src/
├─ components/        Header, Footer, Button, FeatureCard, Marquee, CTA
├─ layouts/           BaseLayout (SEO 메타, ClientRouter, 모션 초기화)
├─ lib/
│  ├─ site.ts         사이트 이름/설명/내비게이션
│  └─ url.ts          withBase() — base 경로 처리 헬퍼
├─ pages/             index / about / 404
├─ scripts/motion/    애니메이션 모듈
└─ styles/global.css  디자인 토큰, 리셋, 모션 초기 상태
```

## 모션 사용법 (data 속성)

마크업에 속성만 붙이면 동작합니다. `prefers-reduced-motion` 사용자에게는 자동으로 꺼집니다.

| 속성 | 효과 |
| --- | --- |
| `data-reveal` / `="left\|right\|scale\|fade"` | 스크롤 진입 시 등장 (`data-delay="0.2"` 가능) |
| `data-stagger` / `="0.12"` | 자식 요소 순차 등장 |
| `data-split` / `="chars\|lines"` | 텍스트 분할 등장 (GSAP SplitText). `data-split-scroll` 추가 시 스크롤 트리거 |
| `data-parallax="0.3"` | 스크롤 패럴랙스 (음수면 반대 방향) |
| `data-count="1200" data-suffix="+"` | 숫자 카운트업 (`data-decimals` 가능) |
| `data-magnetic` / `="0.5"` | 마그네틱 호버 (마우스 환경만) |
| `data-tilt` / `="12"` | 3D 틸트 + `--mx/--my` 커서 좌표 CSS 변수 |

페이지 전환은 Astro `ClientRouter`(View Transitions)를 사용합니다.
모든 모션은 `astro:page-load`에서 초기화되고 `astro:before-swap`에서 정리됩니다
([BaseLayout.astro](src/layouts/BaseLayout.astro)). 새 효과는 `src/scripts/motion/`에 모듈을 추가하고
[index.ts](src/scripts/motion/index.ts)에서 등록하세요.

## 링크/에셋 경로 주의

GitHub 프로젝트 페이지는 `https://<USER>.github.io/<REPO>/` 하위에서 서빙됩니다.
내부 링크와 `public/` 파일은 **항상 `withBase()`** 를 거치세요.

```astro
<a href={withBase('/about')}>About</a>
<img src={withBase('/images/hero.jpg')} alt="" />
```

`src/` 안에서 `import`한 이미지(`astro:assets`)는 자동 처리되므로 신경 쓰지 않아도 됩니다.

## GitHub Pages 배포

1. GitHub에 레포를 만들고 `main` 브랜치로 push
2. 레포 **Settings → Pages → Build and deployment → Source** 를 **GitHub Actions** 로 변경
3. push 할 때마다 [.github/workflows/deploy.yml](.github/workflows/deploy.yml)이 자동 빌드·배포

`site`/`base`는 워크플로가 넘겨주는 레포 정보로 자동 계산됩니다([astro.config.mjs](astro.config.mjs)).

- `<USER>.github.io` 레포 → `base: '/'`
- 그 외 레포 → `base: '/<REPO>'`
- 커스텀 도메인 → 워크플로의 `SITE_URL` 주석 해제 + `public/CNAME` 파일에 도메인 작성

## 커스터마이징 체크리스트

- [ ] `src/lib/site.ts` — 사이트 이름, 설명
- [ ] `src/styles/global.css` — 색상/폰트 토큰
- [ ] `public/favicon.svg`, OG 이미지(`public/og.png` 추가 후 `<BaseLayout image="/og.png">`)
- [ ] 각 페이지 카피 교체
