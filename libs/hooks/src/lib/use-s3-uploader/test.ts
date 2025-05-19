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
  partSize,
  partCount,
  controller,
  uploadId,
  setFiles,
}: {
  id: string;
  file: UploadFile;
  parts: UploadPart[];
  uploadedPartNumbers: Set<number>;
  partSize: number;
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

    const chunk = file.file.slice(i * partSize, (i + 1) * partSize);
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

// 업로드 시작 함수 (단일 or 멀티)
export const startUpload = async (
  id: string,
  files: UploadFile[],
  setFiles: (updater: (prev: UploadFile[]) => UploadFile[]) => void,
) => {
  const file = files.find((f) => f.id === id);
  if (!file) return;

  if (file.uploadId) {
    await abortMultiPartUpload(file.uploadId, file.key);
  }

  if (file.uploadType === 'single-part') {
    await uploadSinglePartFile(id, file, setFiles);
  } else {
    await uploadMultiPartFile(id, file, setFiles);
  }
};

// 멀티파트 이어올리기
export const resumeUpload = async (
  id: string,
  files: UploadFile[],
  setFiles: (updater: (prev: UploadFile[]) => UploadFile[]) => void,
) => {
  const target = files.find((f) => f.id === id);
  if (!target) return;

  const controller = new AbortController();
  const partSize = 5 * 1024 * 1024;
  const partCount = Math.ceil(target.file.size / partSize);

  const uploadId = target.uploadId || (await initMultiPartUpload(target.key))?.uploadId;
  if (!uploadId) return;

  const existingParts = await getMultiFileParts(uploadId, target.key);
  const serverParts: UploadPart[] = existingParts?.Parts || [];
  const localParts: UploadPart[] = target.parts || [];
  const uploadedPartNumbers = new Set([...serverParts, ...localParts].map((p) => p.PartNumber));

  const parts = [...serverParts];
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
    partSize,
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

// 싱글파일 업로드
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

// 멀티파일 업로드 (초기)
export const uploadMultiPartFile = async (
  id: string,
  file: UploadFile,
  setFiles: (updater: (prev: UploadFile[]) => UploadFile[]) => void,
) => {
  const controller = new AbortController();
  const partSize = 5 * 1024 * 1024;
  const partCount = Math.ceil(file.file.size / partSize);
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
    partSize,
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
