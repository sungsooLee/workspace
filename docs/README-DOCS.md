# 📚 문서 서버 실행 가이드

이 가이드는 마크다운 문서를 로컬 서버에서 보는 방법을 설명합니다.

## 🚀 빠른 시작

### Windows 사용자

#### 방법 1: 배치 파일 (가장 간단)
```cmd
start-docs.bat
```

#### 방법 2: PowerShell (권장)
```powershell
.\start-docs.ps1
```

#### 방법 3: 명령어 직접 실행
```cmd
python -m http.server 3001
```

### macOS/Linux 사용자

#### 방법 1: 셸 스크립트
```bash
./start-docs.sh
```

#### 방법 2: 명령어 직접 실행
```bash
python3 -m http.server 3001
```

### 모든 OS 공통 (npm 사용)

```bash
npm run serve
# 또는
npm start
# 또는
npm run docs
```

## 🌐 접속하기

서버가 시작되면 브라우저에서 다음 주소로 접속하세요:

**http://localhost:3001**

## 📋 요구사항

- **Python 3.x** (대부분 OS에 기본 설치)
- **웹 브라우저** (Chrome, Firefox, Safari, Edge 등)

### Python 설치 확인

```bash
# Windows
python --version

# macOS/Linux
python3 --version
```

### Python이 없다면?

- **Windows**: https://www.python.org/downloads/
- **macOS**: `brew install python3` 또는 위 링크
- **Linux**: `sudo apt install python3` (Ubuntu/Debian)

## 🎨 제공되는 기능

- ✨ **아름다운 UI**: Docsify 기반 깔끔한 인터페이스
- 🔍 **실시간 검색**: 모든 문서 내용 검색
- 📱 **반응형 디자인**: 모바일/태블릿 지원
- 🎨 **코드 하이라이트**: TypeScript, JSX, Bash 구문 강조
- 📋 **코드 복사**: 원클릭 코드 복사
- 🧭 **사이드바**: 체계적인 네비게이션
- 📄 **페이지네이션**: 이전/다음 페이지 이동

## 🛠️ 트러블슈팅

### 포트 3001이 이미 사용 중인 경우

다른 포트를 사용하세요:

```bash
# Windows
python -m http.server 3002

# macOS/Linux
python3 -m http.server 3002
```

그리고 `http://localhost:3002`로 접속하세요.

### 방화벽 경고

Python 서버를 처음 실행할 때 방화벽 경고가 나올 수 있습니다. "허용"을 클릭하세요.

### Python을 찾을 수 없다는 오류

1. Python이 설치되었는지 확인
2. PATH 환경변수에 Python이 추가되었는지 확인
3. Windows의 경우 `py` 명령어도 시도해보세요:
   ```cmd
   py -m http.server 3001
   ```

## 🌟 고급 옵션

### Live Reload가 필요한 경우

```bash
# docsify-cli 설치 (전역)
npm install -g docsify-cli

# Live reload 서버 실행
docsify serve . --port 3001
```

### 다른 컴퓨터에서 접속하려면

```bash
# 모든 네트워크 인터페이스에서 접속 허용
python -m http.server 3001 --bind 0.0.0.0
```

그리고 `http://[당신의IP]:3001`로 접속

## 💡 팁

- 문서를 수정한 후 브라우저에서 **F5** 또는 **Ctrl+F5**로 새로고침
- 검색 기능을 활용해 원하는 내용을 빠르게 찾기
- 사이드바의 폴더 구조를 따라 순서대로 읽기 권장