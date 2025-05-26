# 프로젝트 명칭 (cdri-books--leeseongjin)

## 프로젝트 개요

CERTICOS BOOKS 서비스는 도서 검색 서비스를 제공하는 것을 목표로 하는 웹 애플리케이션입니다.

## 실행 방법 및 환경 설정

### 필수 요구사항

- Node.js (v22.11.0 이상)
- pnpm (v10.11.0 이상)
  - 선택 이유:
    - 빠른 설치 속도: 병렬 설치를 통한 빠른 패키지 설치가 가능하기 때문에 선택했습니다.
    - 효율적인 디스크 사용: 전역에 패키지를 설치하기 때문에 패키지 중복 설치 방지로 디스크 공간을 절약할 수 있어 선택했습니다.
    - 강력한 의존성 관리: 의존하지 않는 패키지에 대해 접근할 수 없게 하기 때문에 더 안정적이라고 생각하여 선택했습니다.

### 설치 및 실행

1. **저장소 클론**

   ```bash
   git clone [repository-url]
   cd cdri-books--leeseongjin
   ```

2. **의존성 설치**

   ```bash
   pnpm install
   ```

3. **환경 변수 설정** (필수사항)

   ```bash
   # 전달받은 환경 변수 파일을 생성합니다.
   touch .env.local
   ```

4. **개발 서버 실행**

   ```bash
   pnpm run dev
   ```

5. **브라우저에서 확인**
   - 개발 서버: http://localhost:3000

### 빌드 및 실행

```bash
# 프로덕션 빌드
pnpm run build

# 빌드된 애플리케이션 실행
pnpm run start
```

### 주요 스크립트

- `pnpm run dev`: 개발 서버 실행
- `pnpm run build`: 프로덕션 빌드
- `pnpm run start`: 빌드된 애플리케이션 실행
- `pnpm run lint`: 코드 린팅 검사
- `pnpm run lint:fix`: 린팅 오류 자동 수정
- `pnpm run format`: 코드 포맷팅 적용
- `pnpm run format:check`: 코드 포맷팅 검사

## 폴더 구조 및 주요 코드 설명

프로젝트는 **FSD(Feature-Sliced Design) 아키텍처**를 기반으로 구성되어 있습니다.
코드의 가독성, 유지보수성, 확장성을 고려하여 계층별로 명확하게 분리된 FSD 아키텍쳐의 구조를 채택했습니다.

### 아키텍처 개요

```
src/
├── app/              # Next.js App Router (라우팅 및 페이지)
├── core/             # 애플리케이션 레이어 (FSD의 app 레이어)
├── widgets/          # 위젯 레이어 (복합 UI 블록)
├── features/         # 기능 레이어 (비즈니스 로직)
├── entities/         # 엔티티 레이어 (도메인 모델)
└── shared/           # 공유 레이어 (재사용 가능한 코드)
```

### 레이어별 상세 설명

#### **shared/** (공유 레이어)

> 프로젝트 전반에서 재사용되는 코드

- `ui/`: 재사용 가능한 UI 컴포넌트 (Button, Input 등)
- `config/`: 환경 설정 및 상수
- `types/`: 공용 타입 정의
- `api/`: API 클라이언트 및 HTTP 요청 로직
- `lib/`: 유틸 함수

#### **entities/** (엔티티 레이어)

> 비즈니스 도메인의 핵심 엔티티 (GET - API, Util 함수, 엔티티 Type, Custom Hooks, 엔티티 UI 등이 있습니다.)

- `book/`: 도서 관련 엔티티
- `search/`: 검색 관련 엔티티
- `wishlist/`: 위시리스트 관련 엔티티

#### **features/** (기능 레이어)

> 비즈니스 로직 (GET 제외한 API, Custom Hooks, 기능 UI 등이 있습니다.)

- `books/`: 도서 검색, 조회 등의 기능
- `wishlist/`: 위시리스트 추가, 삭제 등의 기능

#### **widgets/** (위젯 레이어)

> 여러 기능을 조합한 복합 UI 블록

- `layout/`: 페이지 레이아웃 컴포넌트

#### **core/** (애플리케이션 레이어)

> FSD의 `app` 레이어를 `core`로 명명 (Next.js App Router와의 충돌 방지)

- `styles/`: 전역 스타일 및 테마 설정
- `react-query/`: React Query 설정 및 전역 상태 관리

#### 🔹 **app/** (Next.js App Router)

> Next.js의 파일 기반 라우팅

- `layout.tsx`: 루트 레이아웃
- `page.tsx`: 홈페이지
- `wishlist/page.tsx`: 위시리스트 페이지

### FSD 아키텍처의 장점

1. **명확한 의존성 방향**: 상위 레이어만 하위 레이어를 참조
2. **높은 응집도**: 관련된 코드가 한 곳에 모여 있음
3. **낮은 결합도**: 레이어 간 독립성 보장
4. **확장성**: 새로운 기능 추가 시 구조적 일관성 유지

## 라이브러리 선택 이유

### 핵심 프레임워크 및 라이브러리

> React, TypeScript, React Query는 필수 라이브러리 이므로 선택 이유 기재하지 않았습니다.

#### **Next.js (App Router)**

- **선택 이유**:
  - React 기반의 풀스택 프레임워크로 SSR, SSG, Router 등 최신 기능 제공
  - 처음 도서 검색 기능을 구현한다는 요구사항을 접했을 때, 검색 결과 페이지와 도서 상세 페이지의 SEO를 고려하기 위해 Next.js를 선택했습니다.
    (도서 상세 페이지는 다음 페이지로 대체되어 구현하지 않았습니다.)

### 상태 관리 및 데이터 페칭

#### **Zustand**

- **선택 이유**:
  - 경량화된 클라이언트 상태 관리 라이브러리를 Hook 형태로 사용할 수 있기 때문에 선택했습니다.

#### **Axios**

- **선택 이유**:
  - HTTP 클라이언트로 인터셉터, 요청/응답 변환 등 풍부한 기능 등을 제공하기 때문에 선택했습니다.

### UI 및 스타일링

#### **Tailwind CSS**

- **선택 이유**:
  - 과도한 설정 필요 없이 빠른 UI 개발이 가능하기 때문에 선택했습니다.

#### **Shadcn UI & Radix UI**

> class-variance-authority, clsx, tailwind-merge, lucide-react, tw-animate-css 는 Shadcn 의존 라이브러리입니다.
> @radix-ui/react-popover, @radix-ui/react-select 는 Radix의 의존 라이브러리입니다.

- **선택 이유**:
  - 접근성 표준 준수, 헤드리스 UI로 커스터마이징 자유도가 높기 때문에 선택했습니다.

### 개발 도구 및 코드 품질

#### **ESLint & Prettier**

- **선택 이유**:
  - 코드 품질 및 일관된 코드 스타일 유지를 도와주기 때문에 선택했습니다.

## 강조 하고 싶은 기능

1. FSD(Feature-Sliced Design) 아키텍처

   - 계층별 명확한 분리: shared → entities → features → widgets → core → app 순서로 의존성 방향을 명확하게 설계하려고 했습니다.
   - 도메인 중심 설계: 도서(book), 검색(search), 위시리스트(wishlist) 등 비즈니스 도메인별로 코드를 체계적으로 구성하려고 했습니다.
   - 확장성과 유지보수성: 새로운 기능 추가 시에도 기존 구조를 해치지 않고 일관성 있게 확장할 수 있는 구조를 만들려고 했습니다.

2. 고급 검색 기능 시스템

   - 검색 히스토리 접근성: 키보드 네비게이션(화살표 키) 기능을 제공하려고 했습니다.

3. 무한 스크롤을 구현하려고 했습니다.

   - 무한 스크롤: useInfinityQuery로 무한 스크롤을 구현하려고 했습니다.

4. 접근성 중심의 UI/UX를 설계하려고 했습니다.

   - ARIA 속성 완벽 구현: 스크린 리더 지원, 키보드 네비게이션, 적절한 role과 aria-label을 설정하려고 했습니다.
   - 시맨틱 HTML: 의미있는 HTML 구조로 웹 접근성 표준을 준수하려고 했습니다.
   - 반응형 디자인: 모바일부터 데스크톱까지 모든 디바이스에서 최적화된 경험을 제공하려고 했습니다.
