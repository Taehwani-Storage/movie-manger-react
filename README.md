# React 기반 영화 관리 프로그램 설명서

## 개요
이 문서는 React를 사용하여 개발된 영화 관리 프로그램의 프론트엔드 구조 및 기능을 설명합니다.
해당 프로젝트는 영화 목록, 영화 상세 정보, 사용자 관리 등의 기능을 포함하며, RESTful API와 통신하여 데이터를 주고받습니다.

## 기술 스택
- **React** (상태 및 UI 관리)
- **React Router** (페이지 라우팅)
- **Tailwind CSS** (스타일링)
- **Axios** (API 호출)
- **Redux Toolkit** (상태 관리)

## 주요 페이지 및 기능
### 1. 영화 목록 페이지 (`MovieListScreen`)
- `useParams`를 사용하여 `pageNo` 값을 가져와 해당 페이지의 영화를 불러옵니다.
- `http://localhost:8080/api/movie/showAll/${pageNo}`에서 영화 데이터를 가져옵니다.
- JWT 인증을 사용하여 로그인된 사용자만 접근할 수 있으며, 인증이 없으면 로그인 페이지로 리디렉션됩니다.
- 페이지네이션을 제공하여 여러 페이지의 영화를 탐색할 수 있습니다.
- 각 영화 항목을 클릭하면 `MovieDetailScreen`으로 이동합니다.

### 2. 영화 상세 페이지 (`MovieDetailScreen`)
- `useParams`를 사용하여 `movieNo`를 받아 해당 영화의 상세 정보를 불러옵니다.
- `movie.movies` 테이블에서 영화 정보를 가져오며, `movie.ratings` 테이블의 `score` 데이터를 기반으로 평점을 표시합니다.
- `role` 값이 `1`(일반 사용자)일 경우, 1~5점(0.5점 단위)으로 영화에 평점을 매길 수 있습니다.
- `NavBar`와 `Pagination`을 포함하여 내비게이션이 가능하도록 구성되어 있습니다.

### 3. 사용자 프로필 페이지 (`ProfileScreen`)
- 비밀번호를 다시 입력해야 프로필 정보를 볼 수 있습니다.
- `movie.users` 테이블에서 사용자 ID, 닉네임, 역할(role)을 불러옵니다.
- 역할(role) 값은 다음과 같이 변환하여 표시됩니다:
  - `0`: 관리자(Admin)
  - `1`: 사용자(User)
  - `2`: 평론가(Critic)
- **관리자(Admin, role 0)**일 경우, 사용자 목록을 관리할 수 있으며, 삭제 및 역할 변경 기능을 제공합니다.

## 공통 UI 요소
### 1. 내비게이션 바 (`NavBar`)
- 페이지 하단에 고정된 형태로 제공됩니다.
- 현재 선택된 페이지가 강조 표시됩니다.

### 2. 페이지네이션 (`Pagination`)
- 영화 목록 및 상세 페이지에서 활용됩니다.
- 사용자가 이전/다음 페이지로 이동할 수 있도록 지원합니다.

## API 호출 예시
### 영화 목록 가져오기
```javascript
axios.get(`http://localhost:8080/api/movie/showAll/${pageNo}`, {
  headers: { Authorization: `Bearer ${token}` }
})
.then(response => {
  setMovies(response.data);
})
.catch(error => {
  console.error("Error fetching movies", error);
});
```

### 영화 상세 정보 가져오기
```javascript
axios.get(`http://localhost:8080/api/movie/detail/${movieNo}`)
  .then(response => setMovie(response.data))
  .catch(error => console.error("Error fetching movie details", error));
```

### 사용자 정보 가져오기
```javascript
axios.get(`http://localhost:8080/api/user/profile`, {
  headers: { Authorization: `Bearer ${token}` }
})
.then(response => setUser(response.data))
.catch(error => console.error("Error fetching profile", error));
```

## 결론
이 프로젝트는 React와 RESTful API를 활용하여 영화 데이터를 관리하고, 사용자 역할에 따라 기능을 제공하는 구조로 설계되었습니다. UI/UX는 Toss 금융 앱과 유사한 스타일을 적용하여 사용자 친화적인 인터페이스를 제공합니다.

