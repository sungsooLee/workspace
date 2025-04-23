import {
  initMultiPartUpload,
  abortMultiPartUpload,
  issuePresigendUrlBySingle,
  issuePresigendUrlByPart,
  completedMultiPartUpload,
  getMultiFileParts,
} from './api';
import { UploadFile, UploadPart } from './types';
import { updateFile } from './utils';

/**
 * 업로드와 관련된 로직을 구체적으로 처리하는 역할
 * AWS S3와 같은 스토리지 서비스를 대상으로 **단일 파일 업로드(single-part)**와 **멀티파트 파일 업로드(multi-part)**를 관리
 * 이를 통해 파일 업로드 프로세스를 효율적으로 수행하며, 일시정지, 재개, 실패 처리 및 업로드 상태 관리 기능을 제공.
 */

/**
 * 업로드 시작 함수
 * - 단일 파일/멀티파트 파일 여부에 따라 업로드 방식 분기
 * - 기존 uploadId가 있다면 업로드 중단 후 새로 시작
 */
export const startUpload = async (
  id: string,
  files: UploadFile[],
  setFiles: (updater: (prev: UploadFile[]) => UploadFile[]) => void,
) => {
  const file = files.find((f) => f.id === id);
  if (!file) return;

  // 기존 업로드 세션 종료
  if (file.uploadId) {
    await abortMultiPartUpload(file.uploadId, file.key);
  }

  // 업로드 방식에 따라 실행
  if (file.uploadType === 'single-part') {
    await uploadSinglePartFile(id, file, setFiles);
  } else {
    await uploadMultiPartFile(id, file, setFiles);
  }
};

/**
 * 멀티파트 이어올리기
 * - 서버에서 기존 uploaded part 목록 조회
 * - 로컬 파트와 병합하여 누락된 part만 업로드
 * - 업로드 후 complete 호출
 */
export const resumeUpload = async (
  id: string,
  files: UploadFile[],
  setFiles: (updater: (prev: UploadFile[]) => UploadFile[]) => void,
) => {
  const target = files.find((f) => f.id === id);
  if (!target) return;

  const controller = new AbortController();

  // 업로드 세션 초기화 및 상태 반영
  setFiles((prev) => updateFile(prev, id, { status: 'uploading', controller }));

  const uploadId =
    target.uploadId || (await initMultiPartUpload(target.key, target.file.type))?.uploadId;
  if (!uploadId) return;

  const existingParts = await getMultiFileParts(uploadId, target.key);

  const serverParts: UploadPart[] = existingParts?.Parts || [];
  const localParts: UploadPart[] = target.parts || [];
  const uploadedPartNumbers = new Set([...serverParts, ...localParts].map((p) => p.PartNumber));

  const partSize = 5 * 1024 * 1024;
  const partCount = Math.ceil(target.file.size / partSize);
  const parts: UploadPart[] = [...serverParts];

  // 시작 시점에 기존 진행률 반영
  const estimatedProgress = Math.round((serverParts.length / partCount) * 100);
  setFiles((prev) =>
    updateFile(prev, id, {
      parts: serverParts,
      uploadId,
      progress: estimatedProgress,
      status: 'uploading',
      controller,
    }),
  );

  // 누락된 파트만 업로드
  for (let i = 0; i < partCount; i++) {
    const partNumber = i + 1;
    if (uploadedPartNumbers.has(partNumber)) continue;

    // 중단 요청 시
    if (controller.signal.aborted) {
      setFiles((prev) => updateFile(prev, id, { status: 'paused' }));
      return;
    }

    const chunk = target.file.slice(i * partSize, (i + 1) * partSize);
    const presigned = await issuePresigendUrlByPart({
      uploadId,
      partNumber,
      key: target.key,
    });
    if (!presigned) return;

    try {
      const res = await fetch(presigned.url, {
        method: 'PUT',
        body: chunk,
        signal: controller.signal,
      });
      const etag = res.headers.get('ETag')?.replace(/"/g, '') || '';
      parts.push({ ETag: etag, PartNumber: partNumber });

      setFiles((prev) =>
        updateFile(prev, id, {
          status: 'uploading',
          progress: Math.round((parts.length / partCount) * 100),
          parts,
          uploadId,
        }),
      );
    } catch (e) {
      if ((e as any).name === 'AbortError') {
        setFiles((prev) => updateFile(prev, id, { status: 'paused' }));
        return;
      }
      console.error(e);
      setFiles((prev) => updateFile(prev, id, { status: 'failed' }));
      return;
    }
  }

  await completedMultiPartUpload({ uploadId, parts, key: target.key });
  setFiles((prev) => updateFile(prev, id, { status: 'completed', progress: 100 }));
};

/**
 * 싱글 파일 업로드
 * - presigned URL 요청 후 단일 PUT 업로드
 */
export const uploadSinglePartFile = async (
  id: string,
  file: UploadFile,
  setFiles: (updater: (prev: UploadFile[]) => UploadFile[]) => void,
) => {
  setFiles((prev) => updateFile(prev, id, { status: 'uploading', progress: 0 }));

  const presigned = await issuePresigendUrlBySingle(file.key);
  if (!presigned) return;
  console.log('presigned', presigned);
  try {
    const res = await fetch(presigned.url, {
      method: 'PUT',
      body: file.file,
    });
    if (!res.ok) throw new Error('Upload failed');

    setFiles((prev) => updateFile(prev, id, { status: 'completed', progress: 100 }));
  } catch (e) {
    console.error(e);
    setFiles((prev) => updateFile(prev, id, { status: 'failed' }));
  }
};

/**
 * 멀티파트 업로드 시작
 * - multipart session 시작 후 각 파트 presigned 요청 및 업로드 반복
 * - 완료 시 complete 요청
 */
export const uploadMultiPartFile = async (
  id: string,
  file: UploadFile,
  setFiles: (updater: (prev: UploadFile[]) => UploadFile[]) => void,
) => {
  const controller = new AbortController();

  // 초기 상태 설정
  setFiles((prev) =>
    updateFile(prev, id, {
      status: 'uploading',
      controller,
      uploadId: undefined,
      parts: [],
      progress: 0,
    }),
  );

  const uploadInit = await initMultiPartUpload(file.key, file.file.type);
  if (!uploadInit) return;
  console.log('uploadInit', uploadInit);
  const partSize = 5 * 1024 * 1024;
  const partCount = Math.ceil(file.file.size / partSize);
  const parts: UploadPart[] = [];
  let isSuccess = true;
  for (let i = 0; i < partCount; i++) {
    const chunk = file.file.slice(i * partSize, (i + 1) * partSize);
    const presigned = await issuePresigendUrlByPart({
      uploadId: uploadInit.uploadId,
      partNumber: i + 1,
      key: file.key,
    });
    console.log('presigned', presigned);
    if (!presigned) return;

    try {
      const res = await fetch(presigned.url, {
        method: 'PUT',
        body: chunk,
        signal: controller.signal,
      });
      const etag = res.headers.get('ETag')?.replace(/"/g, '') || '';
      parts.push({ ETag: etag, PartNumber: i + 1 });
      console.log('res', res.ok);
      if (res.ok) {
        setFiles((prev) =>
          updateFile(prev, id, {
            progress: Math.round((parts.length / partCount) * 100),
            parts,
            contentType: presigned.contentType,
            uploadId: uploadInit.uploadId,
          }),
        );
      } else {
        file.controller?.abort(); // AbortController로 업로드 중단
        await abortMultiPartUpload(uploadInit.uploadId, uploadInit.key);
        setFiles((prev) =>
          updateFile(prev, id, {
            status: 'failed',
            progress: Math.round((parts.length / partCount) * 100),
          }),
        );
        isSuccess = false;
        break;
      }
    } catch (e) {
      if ((e as any).name === 'AbortError') {
        setFiles((prev) => updateFile(prev, id, { status: 'paused' }));
        return;
      }
      return;
    }
  }
  console.log('parts => ', parts);
  if (isSuccess) {
    const completeResponse = await completedMultiPartUpload({
      uploadId: uploadInit.uploadId,
      parts,
      key: file.key,
    });
    if (!completeResponse) {
      setFiles((prev) => updateFile(prev, id, { status: 'failed' }));
    } else {
      setFiles((prev) => updateFile(prev, id, { status: 'completed', progress: 100 }));
    }
  }
};
