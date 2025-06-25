import { httpService } from '../ajax/http.service';

export const getFileResponse = (response: any) => {
  // 응답 헤더에서 파일 이름 얻기
  const contentDisposition = response.headers['content-disposition'];
  const fileName = contentDisposition
    ? contentDisposition
        .split(';')
        .find((part: any) => part.trim().startsWith('fileName='))
        ?.split('=')[1]
        ?.replace(/"/g, '') // 큰따옴표 제거
    : 'downloaded-file.xlsx';

  // Blob 객체 생성
  const blob = new Blob([response.data], { type: response.headers['content-type'] });
  return { fileName, blob };
};

type FileResponse = ReturnType<typeof getFileResponse>;

interface fileDownloadParams {
  url: string;
  params?: any;
  options?: object;
  payload?: any;
  method?: string;
}
export const fileDownload = async ({
  url,
  params,
  options,
  payload,
  method,
}: fileDownloadParams) => {
  const response =
    method === 'post'
      ? await httpService.post<FileResponse>(url, params, { ...options, responseType: 'blob' })
      : await httpService.get<FileResponse>(
          url,
          params,
          { ...options, responseType: 'blob' },
          payload,
        );
  // Blob URL 생성
  const blobUrl = URL.createObjectURL(response.blob);

  // 다운로드를 위한 a 태그 생성 및 클릭 트리거
  const link = document.createElement('a');
  link.href = blobUrl;
  link.setAttribute('download', decodeURI(response.fileName || 'file'));
  document.body.appendChild(link);
  link.click();

  // URL 객체 및 태그 정리
  URL.revokeObjectURL(blobUrl);
  document.body.removeChild(link);
};

/**
 * 허용되는 파일 확장자 배열을 받아 'accept' 속성에 사용할 수 있는 문자열로 변환합니다.
 * 각 확장자는 '.ext' 형식으로 변환되며, 최종적으로 쉼표로 구분된 대문자 문자열을 반환합니다.
 *
 * 예시:
 * - ['jpg', 'png']             => ".JPG, .PNG"
 * - ['.pdf', 'docx']           => ".PDF, .DOCX"
 * - ['image/png', 'video/mp4'] => "IMAGE/PNG, VIDEO/MP4" (MIME 타입은 그대로 대문자화)
 *
 * @param acceptFiles - 허용할 파일 확장자 또는 MIME 타입 문자열 배열입니다.
 * @returns HTML input의 'accept' 속성에 사용될 수 있는 문자열입니다.
 * 입력 배열이 null 또는 undefined이거나 비어있으면 빈 문자열을 반환합니다.
 */
export const acceptFilesToAccept = (acceptFiles: string[]): string | undefined => {
  // acceptFiles 배열이 없거나 비어있는 경우 빈 문자열을 즉시 반환합니다.
  if (!acceptFiles?.length) {
    return undefined;
  }

  // 각 파일 확장자/MIME 타입에 대해 처리합니다.
  return acceptFiles
    .filter(Boolean)
    .map((type) => {
      const trimmed = type.trim();
      // 간단하고 정확한 MIME type 판별 방식: 슬래시(/)가 있으며, 앞뒤가 비어 있지 않은가
      const isMimeType =
        /^[a-zA-Z0-9.+-]+\/[a-zA-Z0-9.+-]+$/.test(trimmed) || trimmed.includes('*');
      // 확장자면 대문자로 변환 > 대소문자 변환은 필요 없을듯
      return isMimeType || trimmed.startsWith('.') ? trimmed : `.${trimmed}`;
    })
    .join(', ');
};
