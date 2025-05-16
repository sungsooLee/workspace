// .env 파일에서 환경 변수 로드
require('dotenv').config();

const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const mime = require('mime-types');

// 환경 변수에서 AWS 자격 증명 및 구성 가져오기
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const bucket = process.env.S3_BUCKET;
const region = process.env.AWS_REGION || 'ap-northeast-2';

// 배포할 디렉토리 정의 (GitLab CI 파이프라인의 artifacts와 일치)
const directories = ['fo', 'bo', 'pb-fo', 'pb-bo'];

// 환경 변수 유효성 검사
if (!accessKeyId || !secretAccessKey || !bucket) {
  if (!accessKeyId) console.error('- AWS_ACCESS_KEY_ID를 설정해주세요');
  if (!secretAccessKey) console.error('- AWS_SECRET_ACCESS_KEY를 설정해주세요');
  if (!bucket) console.error('- S3_BUCKET을 설정해주세요');
  process.exit(1);
}

// S3 클라이언트 초기화
const s3 = new AWS.S3({
  accessKeyId,
  secretAccessKey,
  region,
});
// 단일 파일 업로드 함수
async function uploadFile(filePath, s3Key) {
  try {
    // 파일 읽기
    const fileContent = fs.readFileSync(filePath);

    // 컨텐츠 타입 결정
    const contentType = mime.lookup(filePath) || 'application/octet-stream';

    // S3에 업로드할 파라미터 정의
    const params = {
      Bucket: bucket,
      Key: s3Key,
      Body: fileContent,
      ContentType: contentType,
    };

    // S3에 파일 업로드
    await s3.putObject(params).promise();
    console.log(`업로드 성공: ${s3Key}`);
  } catch (err) {
    console.error(`업로드 실패: ${s3Key}`, err);
    throw err;
  }
}

// 디렉토리 업로드 함수
async function uploadDirectory(sourceDir, s3Prefix) {
  try {
    const fullPath = path.join('dist/apps', sourceDir);

    // 디렉토리 존재 확인
    if (!fs.existsSync(fullPath)) {
      console.error(`디렉토리를 찾을 수 없음: ${fullPath}`);
      return;
    }

    console.log(`S3 동기화 시작: ${sourceDir} -> ${s3Prefix}`);

    // 모든 파일 목록 가져오기
    const files = getAllFiles(fullPath);
    console.log(`총 ${files.length}개 파일 동기화 예정`);

    // 파일 업로드 진행 상황 표시를 위한 카운터
    let completed = 0;

    // 병렬로 파일 업로드 (Promise.all 사용)
    const promises = files.map(async (file) => {
      // S3 키 (경로) 계산
      const s3Key = `${s3Prefix}/${file.replace(fullPath + '/', '')}`;
      await uploadFile(file, s3Key);

      // 진행 상황 업데이트
      completed++;
      if (completed % 20 === 0 || completed === files.length) {
        console.log(
          `업로드 진행률: ${completed}/${files.length} (${Math.round((completed / files.length) * 100)}%)`,
        );
      }
    });

    await Promise.all(promises);
    console.log(`S3 동기화 완료: ${sourceDir}`);
  } catch (err) {
    console.error(`S3 동기화 실패: ${sourceDir}`, err);
    process.exit(1);
  }
}

// 디렉토리 내 모든 파일 재귀적으로 가져오기
function getAllFiles(dirPath, arrayOfFiles = []) {
  try {
    const files = fs.readdirSync(dirPath);

    files.forEach((file) => {
      const filePath = path.join(dirPath, file);

      // 디렉토리인 경우 재귀적으로 탐색
      if (fs.statSync(filePath).isDirectory()) {
        arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
      } else {
        arrayOfFiles.push(filePath);
      }
    });

    return arrayOfFiles;
  } catch (err) {
    console.error(`파일 목록 가져오기 실패: ${dirPath}`, err);
    throw err;
  }
}

// S3 버킷의 특정 디렉토리 내용 삭제 (옵션)
async function deleteDirectory(s3Prefix) {
  try {
    console.log(`S3 디렉토리 삭제 시작: ${s3Prefix}`);

    // 삭제할 객체 목록 가져오기
    const listParams = {
      Bucket: bucket,
      Prefix: s3Prefix,
    };

    const listedObjects = await s3.listObjectsV2(listParams).promise();

    if (listedObjects.Contents.length === 0) {
      console.log(`삭제할 객체가 없음: ${s3Prefix}`);
      return;
    }

    // 삭제할 객체 지정
    const deleteParams = {
      Bucket: bucket,
      Delete: {
        Objects: listedObjects.Contents.map(({ Key }) => ({ Key })),
        Quiet: false,
      },
    };

    const deleted = await s3.deleteObjects(deleteParams).promise();
    console.log(`${deleted.Deleted.length}개 객체 삭제 완료`);

    if (listedObjects.IsTruncated) {
      await deleteDirectory(s3Prefix);
    }
  } catch (err) {
    console.error(`디렉토리 삭제 실패: ${s3Prefix}`, err);
    throw err;
  }
}

async function main() {
  try {
    for (const dir of directories) {
      const s3Prefix = dir;

      // 옵션: 배포 전 기존 파일 삭제 (클린 배포)
      const cleanDeploy = process.env.CLEAN_DEPLOY === 'true';
      if (cleanDeploy) {
        console.log(`클린 배포 모드: ${dir} 디렉토리의 기존 파일을 먼저 삭제합니다`);
        await deleteDirectory(s3Prefix);
      }

      // 파일 업로드
      await uploadDirectory(dir, s3Prefix);
    }

    console.log('모든 디렉토리 배포 완료!');

    if (process.env.CLOUDFRONT_DISTRIBUTION_ID) {
      // CloudFront 무효화 명령
    }
  } catch (err) {
    console.error('배포 프로세스 실패:', err);
    process.exit(1);
  }
}

// 스크립트 실행
main();
