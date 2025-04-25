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
const PARTS_SIZE = 5 * 1024 * 1024;
// 업로드 진행률 계산 유틸
const calculateProgress = (uploaded: number, total: number) => Math.round((uploaded / total) * 100);

// presigned URL로 실제 업로드 처리 후 ETag 반환
const uploadChunk = async (
  url: string,
  chunk: Blob,
  signal: AbortSignal,
  contentType?: string,
): Promise<string | null> => {
  const res = await fetch(url, {
    method: 'PUT',
    body: chunk,
    signal,
    headers: contentType ? { 'Content-Type': contentType } : {},
  });
  if (!res.ok) return null;
  return res.headers.get('ETag')?.replace(/"/g, '') || null;
};

// 멀티파트 업로드 루프 (resume 및 초기 업로드에서 공통 사용)
const performMultipartUpload = async ({
  id,
  file,
  parts,
  uploadedPartNumbers,
  partCount,
  controller,
  uploadId,
  setFiles,
}: {
  id: string;
  file: UploadFile;
  parts: UploadPart[];
  uploadedPartNumbers: Set<number>;
  partCount: number;
  controller: AbortController;
  uploadId: string;
  setFiles: (updater: (prev: UploadFile[]) => UploadFile[]) => void;
}) => {
  for (let i = 0; i < partCount; i++) {
    const partNumber = i + 1;
    if (uploadedPartNumbers.has(partNumber)) continue;

    if (controller.signal.aborted) {
      setFiles((prev) => updateFile(prev, id, { status: 'paused' }));
      return null;
    }

    const chunk = file.file.slice(i * PARTS_SIZE, (i + 1) * PARTS_SIZE);
    const presigned = await issuePresigendUrlByPart({
      uploadId,
      partNumber,
      key: file.key,
    });
    if (!presigned) return null;

    const etag = await uploadChunk(presigned.url, chunk, controller.signal, presigned.contentType);
    if (!etag) return null;

    parts.push({ ETag: etag, PartNumber: partNumber });
    setFiles((prev) =>
      updateFile(prev, id, {
        progress: calculateProgress(parts.length, partCount),
        parts,
        uploadId,
        contentType: presigned.contentType,
        status: 'uploading',
      }),
    );
  }
  return parts;
};

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

  const uploadId = target.uploadId || (await initMultiPartUpload(target.key))?.uploadId;
  if (!uploadId) return;

  const existingParts = await getMultiFileParts(uploadId, target.key);

  const serverParts: UploadPart[] = existingParts?.Parts || [];
  const localParts: UploadPart[] = target.parts || [];
  const uploadedPartNumbers = new Set([...serverParts, ...localParts].map((p) => p.PartNumber));

  const partCount = Math.ceil(target.file.size / PARTS_SIZE);
  const parts: UploadPart[] = [...serverParts];

  // 시작 시점에 기존 진행률 반영
  setFiles((prev) =>
    updateFile(prev, id, {
      parts: serverParts,
      uploadId,
      progress: calculateProgress(serverParts.length, partCount),
      status: 'uploading',
      controller,
    }),
  );

  const result = await performMultipartUpload({
    id,
    file: target,
    parts,
    uploadedPartNumbers,
    partCount,
    controller,
    uploadId,
    setFiles,
  });

  if (result) {
    await completedMultiPartUpload({ uploadId, parts: result, key: target.key });
    setFiles((prev) => updateFile(prev, id, { status: 'completed', progress: 100 }));
  } else {
    setFiles((prev) => updateFile(prev, id, { status: 'failed' }));
  }
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
  const presigned = await issuePresigendUrlBySingle(file.key);
  if (!presigned) {
    setFiles((prev) => updateFile(prev, id, { status: 'failed' }));
    return;
  }
  setFiles((prev) =>
    updateFile(prev, id, { status: 'uploading', progress: 0, contentType: presigned.contentType }),
  );
  try {
    const res = await fetch(presigned.url, {
      headers: {
        'Content-Type': presigned.contentType,
      },
      method: 'PUT',
      body: file.file,
    });
    if (res.ok) {
      setFiles((prev) => updateFile(prev, id, { status: 'completed', progress: 100 }));
    } else {
      setFiles((prev) => updateFile(prev, id, { status: 'failed' }));
    }
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
  const partCount = Math.ceil(file.file.size / PARTS_SIZE);
  const parts: UploadPart[] = [];
  const uploadedPartNumbers = new Set<number>();

  setFiles((prev) =>
    updateFile(prev, id, {
      status: 'uploading',
      controller,
      uploadId: undefined,
      parts: [],
      progress: 0,
    }),
  );

  const uploadInit = await initMultiPartUpload(file.key);
  if (!uploadInit) return;

  const result = await performMultipartUpload({
    id,
    file,
    parts,
    uploadedPartNumbers,
    partCount,
    controller,
    uploadId: uploadInit.uploadId,
    setFiles,
  });

  if (!result) {
    file.controller?.abort();
    await abortMultiPartUpload(uploadInit.uploadId, uploadInit.key);
    setFiles((prev) =>
      updateFile(prev, id, {
        status: 'failed',
        progress: calculateProgress(parts.length, partCount),
      }),
    );
    return;
  }

  const completeResponse = await completedMultiPartUpload({
    uploadId: uploadInit.uploadId,
    parts: result,
    key: file.key,
  });
  if (!completeResponse) {
    setFiles((prev) => updateFile(prev, id, { status: 'failed' }));
  } else {
    setFiles((prev) => updateFile(prev, id, { status: 'completed', progress: 100 }));
  }
};
