
# ArtRoad

**ArtRoad**는 사용자의 현재 위치를 기준으로 주변에서 열리는 전시회 정보를 지도 기반으로 탐색할 수 있는 웹 애플리케이션입니다.

## 📄 프로젝트 설명

- 사용자 위치를 기반으로 가까운 전시 정보를 지도로 시각화합니다.
- 전시 목록을 리스트 형태로도 확인할 수 있습니다.
- 마커를 클릭하거나 리스트를 클릭하면 상세 정보가 InfoWindow로 나타납니다.
- 사용자가 선택한 전시 정보로 지도 중심이 이동합니다.
- 사용자 위치 접근이 거부되면 서울시청을 기본 위치로 설정합니다.

## 🚀 프로젝트 데모
<img width="986" height="753" alt="image" src="https://github.com/user-attachments/assets/1a69a45b-17c0-443f-ab1f-eda227e5f28e" />
<img width="645" height="767" alt="image" src="https://github.com/user-attachments/assets/e7b5c775-29f0-4b2d-9e27-abf7068c4037" />

## 🔧 사용 기술 스택

- **Nuxt 3**
- **TypeScript**
- **SCSS Modules**
- **Kakao Map API**

## 📌 주요 기능

- **지도 기반 탐색**: 카카오 맵을 이용해 현재 위치 기반 전시회 마커 표시
- **리스트 뷰**: 전시회 리스트를 확인하고 클릭 시 해당 위치로 지도 이동
- **InfoWindow**: 전시 정보 요약창 자동 표시 및 닫기 기능
- **다크모드 지원**: 사용자 테마 설정에 따라 색상 자동 변경

## 📁 폴더 구조

```
pages/
  └── explore.vue          # 메인 페이지
components/
  ├── KakaoMap.vue         # 지도 컴포넌트
  └── ExhibitionList.vue   # 전시 리스트 컴포넌트
stores/
  └── theme.ts             # 다크모드 상태관리 (Pinia)
utils/
  └── loadKakaoMap.ts      # 카카오맵 API 비동기 로더
```

## ⚙️ 설치 및 실행

### 사전 요구 사항

- Node.js (v16 이상 권장)
- Yarn 또는 npm

### 설치

```bash
# 저장소 클론
git clone https://github.com/TKSK2884/ArtRoad.git
cd ArtRoad

# 의존성 설치
yarn install
# 또는
npm install

# 개발 서버 실행
yarn dev
# 또는
npm run dev
```

### 접속

브라우저에서 `http://localhost:3000`으로 접속하여 확인할 수 있습니다.

---

## 🧠 학습 포인트

- Kakao Maps JavaScript API 활용법
- Nuxt 3의 `useFetch`, `defineProps`, `watch`, `ref` 활용
- InfoWindow 및 마커 제어 로직
- props를 통한 컴포넌트 간 상태 공유 및 반응성 유지
- SCSS 모듈을 통한 반응형 레이아웃 구성

---

