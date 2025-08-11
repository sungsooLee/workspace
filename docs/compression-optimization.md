# 웹 애플리케이션 압축 최적화 가이드

## 목차

1. [압축 최적화 개요](#압축-최적화-개요)
2. [현재 구현 상태](#현재-구현-상태)
3. [CloudFront 도입 후 계획](#cloudfront-도입-후-계획)
4. [성능 측정 결과](#성능-측정-결과)
5. [트러블슈팅](#트러블슈팅)

## 압축 최적화 개요

### 왜 압축이 필요한가?

웹 애플리케이션의 성능 최적화에서 압축은 필수적인 요소

- **대역폭 절감**: 50-70% 네트워크 트래픽 감소
- **로딩 속도 개선**: 특히 모바일 환경에서 체감 속도 향상
- **비용 절감**: AWS 데이터 전송 비용 감소
- **사용자 경험 향상**: 빠른 초기 로딩으로 이탈률 감소

### Gzip vs Brotli 비교

| 특성              | Gzip          | Brotli               |
| ----------------- | ------------- | -------------------- |
| **압축률**        | 양호 (50-70%) | 우수 (60-80%)        |
| **압축 속도**     | 빠름          | 느림 (10x)           |
| **브라우저 지원** | 모든 브라우저 | 최신 브라우저 (95%+) |
| **CPU 사용량**    | 낮음          | 높음                 |
| **도입 시기**     | 1992년        | 2015년 (Google)      |
| **실시간 압축**   | 적합          | 부적합               |

### 선택 기준

- **Gzip**: 실시간 압축, 범용성, 안정성 우선
- **Brotli**: 사전 압축, 최대 압축률, CDN 환경

## 현재 구현 상태

### 1. 아키텍처 구조

```
[Client] → [Nginx (K8s)] → [S3 Bucket]
             ↓
         실시간 Gzip 압축
```

### 2. Nginx 설정 (ConfigMap)

```nginx
server {
    listen 80;

    # Gzip 전역 설정
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;  # 압축 레벨 (1-9, 6이 균형적)
    gzip_min_length 1000;  # 1KB 이상만 압축
    gzip_types
        text/plain
        text/css
        text/javascript
        application/javascript
        application/json
        image/svg+xml;

    # BO 경로 예시
    location /bo/ {
        # S3에서 압축되지 않은 원본 받기
        proxy_set_header Accept-Encoding "";
        proxy_pass http://s3.amazonaws.com/bucket/bo/;

        # Nginx가 클라이언트에게 압축해서 전송
        # gzip이 전역 설정되어 자동 적용
    }
}
```

### 3. 구현 상세

#### 핵심 설정 설명

- **`gzip on`**: Gzip 압축 활성화
- **`gzip_vary on`**: Vary: Accept-Encoding 헤더 추가 (캐시 구분)
- **`gzip_proxied any`**: 프록시된 응답도 압축
- **`gzip_comp_level 6`**: 압축 레벨 (1=빠름/낮은압축, 9=느림/높은압축)
- **`gzip_min_length 1000`**: 1KB 미만 파일은 압축하지 않음 (오버헤드 방지)
- **`proxy_set_header Accept-Encoding ""`**: S3에서 원본 파일 받기

### 4. 현재 방식(nginx gzip 압축)의 장단점

#### 장점

- ✅ 즉시 적용 가능 (인프라 변경 최소화)
- ✅ 빌드 프로세스 단순
- ✅ 실시간 압축으로 항상 최신 콘텐츠
- ✅ 50-70% 대역폭 절감

#### 단점

- ❌ CPU 사용량 증가 (실시간 압축)
- ❌ Brotli 압축 미지원
- ❌ 동일 파일 반복 압축

## CloudFront 도입 후 계획

### 1. 향상된 아키텍처

```
[Client] → [CloudFront CDN] → [S3 Bucket]
               ↓
         자동 Gzip/Brotli 압축
         엣지 캐싱
         글로벌 배포
```

### 2. CloudFront 압축 설정

```javascript
// CloudFront Distribution 설정
{
  "CompressionConfig": {
    "Enabled": true,
    "EncodingTypes": ["gzip", "br"]  // Gzip + Brotli 자동 지원
  },
  "CacheBehaviors": {
    "PathPattern": "*.js",
    "Compress": true,
    "CachePolicyId": "Managed-CachingOptimized"
  }
}
```

### 3. 마이그레이션 계획

#### Phase 1: CloudFront 도입

1. CloudFront Distribution 생성
2. S3를 Origin으로 설정
3. 압축 자동 활성화

#### Phase 2: Nginx 설정 단순화

#### Phase 3: 사전 압축 파일 활용

```javascript
// vite.config.ts
import compression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    // Brotli 사전 압축
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
    // Gzip 사전 압축
    compression({
      algorithm: 'gzip',
      ext: '.gz',
    }),
  ],
});
```

## 성능 측정 결과

### 압축 전후 비교 (실제 측정값)

| 파일 타입           | 원본 크기  | Gzip 압축 후 | 절감률  |
| ------------------- | ---------- | ------------ | ------- |
| JavaScript (vendor) | 2.3 MB     | 680 KB       | 70%     |
| JavaScript (app)    | 450 KB     | 135 KB       | 70%     |
| CSS                 | 180 KB     | 36 KB        | 80%     |
| JSON (API)          | 85 KB      | 12 KB        | 86%     |
| **총합**            | **3.0 MB** | **863 KB**   | **71%** |

## 트러블슈팅

### 1. S3 Proxy Pass 제한사항

#### 문제점

- S3는 Content Negotiation 미지원
- `.gz`, `.br` 파일 자동 선택 불가
- 정적 파일명만 접근 가능

#### 해결책

- Nginx 실시간 압축 (현재 방식)
- 추후 CloudFront 도입 예정
