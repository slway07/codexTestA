# Pandoora 스타일 적용 계획 (Tarot MVP)

## 0) 기준 레퍼런스 확인 결과
- 참고 템플릿: **Pandoora – Horoscope & Astrology Elementor Template Kit**
- 확인 가능한 정보:
  - Hero 카피 구조: 상단 Eyebrow + 메인 헤드라인 + CTA 2개(예: Getting Started / Find Out More)
  - 섹션 구조: About, Zodiac Grid(12궁), Testimonial, Blog/News, Newsletter, Contact/Footer
  - 특징: 다크 배경 + 미스틱 톤, 카드형 섹션, 다단 레이아웃, 아이콘/이미지 중심

> 참고: Envato 원본 상세 이미지는 접근 제한(403)으로 직접 원본 썸네일 확대는 불가했으며,
> templatekit.jegtheme.com의 공개 페이지 텍스트 구조를 기준으로 분석했습니다.

---

## 1) 우리 현재 상태 요약
현재 앱은 `index.html + styles.css + script.js` 기반 단일 페이지이며,
기능 중심(스프레드 선택/카드 선택/결과/히스토리) 구조입니다.

핵심 차이:
- 현재: 기능 중심 Wizard 흐름
- 목표: 브랜딩 + 콘텐츠 랜딩 + 기능 섹션 결합형 구조

---

## 2) 적용 목표 (디자인/UX)
1. **첫 화면 신뢰감 강화**: Hero에서 서비스 정체성/가치 명확화
2. **콘텐츠-기능 분리**: 소개/신뢰 요소와 실제 리딩 UI를 시각적으로 분리
3. **모바일 우선 가독성 개선**: 카드 간격/타이포/버튼 터치영역 정교화
4. **확장 가능한 컴포넌트화**: 추후 운세/별자리/상담 상품 섹션 추가 가능한 레이아웃

---

## 3) 정보구조(IA) 개편안
기존 섹션을 아래 구조로 재배치:

1. **Hero**
   - Eyebrow: “Ultimate Guide to Tarot” 류
   - H1 가치제안
   - CTA 2개: `리딩 시작` / `서비스 소개`
2. **서비스 소개(About/Features)**
   - 3개 카드: 타로 리딩, 별자리, 자기성찰 가이드
3. **리딩 실행 섹션 (기존 핵심 기능)**
   - 현재의 1)~3) 흐름을 하나의 “Interactive Reading Studio” 블록으로 통합
4. **Zodiac Grid (12궁 카드)**
   - 정적 카드 UI (초기엔 링크 없이)
5. **후기(Testimonial) 더미 섹션**
6. **최근 리딩(기존 history 재사용)**
7. **Newsletter/Contact Footer**

---

## 4) 시각 디자인 토큰 제안
`styles.css`에 토큰 레벨 확장:

- Color
  - `--bg-primary: #0b0b1f`
  - `--bg-secondary: #141433`
  - `--surface: rgba(19, 22, 48, 0.78)`
  - `--accent: #9f7aea`
  - `--accent-2: #63b3ed`
  - `--text-primary: #f5f3ff`
  - `--text-muted: #b9b6d3`
- Effects
  - 부드러운 글로우 shadow
  - 카드 보더에 미세 그라데이션
- Type Scale
  - Hero title: clamp(32px, 6vw, 56px)
  - Section title: clamp(22px, 3vw, 34px)

---

## 5) 구현 단계 (우선순위)

### Phase 1 — 레이아웃 뼈대
- `index.html`
  - Hero/About/Zodiac/Testimonial/Footer 섹션 마크업 추가
  - 기존 리딩 UI는 `#reading-studio`로 래핑
- 완료 기준
  - 전체 페이지 섹션 흐름이 Pandoora형 랜딩 구조로 변경

### Phase 2 — 스타일 시스템 이관
- `styles.css`
  - 토큰 확장
  - 섹션별 카드/그리드/CTA 스타일 적용
  - 모바일 브레이크포인트 768px, 480px 2단계
- 완료 기준
  - 다크 미스틱 테마 일관성 확보

### Phase 3 — 인터랙션 정리
- `script.js`
  - CTA `리딩 시작` 클릭 시 reading-studio로 스크롤
  - 활성 상태/호버/포커스 접근성 강화
- 완료 기준
  - 랜딩→리딩 플로우가 자연스럽게 연결

### Phase 4 — 콘텐츠 품질 개선
- 섹션 텍스트를 한국어 서비스 문맥에 맞게 교체
- 더미 후기/블로그 카드 최소 3개 구성
- 완료 기준
  - 데모 수준에서 브랜드 메시지 완결

---

## 6) 리스크 및 대응
1. **템플릿 상세 이미지 미확인 리스크**
   - 대응: 구조/톤 중심으로 우선 구현 후, 이미지 확보 시 시각 디테일 2차 보정
2. **기능 UI와 랜딩 UI 간 충돌**
   - 대응: reading-studio 블록을 독립 컴포넌트로 유지
3. **모바일에서 카드 영역 과밀**
   - 대응: 1열 우선 + 카드 높이 자동 + 여백 확대

---

## 7) 작업 산출물 체크리스트
- [ ] Hero/CTA 추가
- [ ] About/Features 추가
- [ ] Zodiac 12카드 섹션 추가
- [ ] Testimonial/News/Newsletter 섹션 추가
- [ ] 기존 리딩 기능 정상 동작 회귀 확인
- [ ] 반응형(모바일) 확인

---

## 8) 제안 일정 (짧은 스프린트)
- Day 1: IA 재구성 + Hero/About + 기본 스타일
- Day 2: Reading Studio 리스킨 + Zodiac/Testimonial
- Day 3: 반응형 튜닝 + 카피 정리 + QA

