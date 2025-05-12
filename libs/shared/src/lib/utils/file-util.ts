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

export const fileDownload = async (url: string, params = {}, options = {}, payload = {}) => {
  const buildParams = Object.fromEntries(
    Object.entries(params).filter(
      ([_, value]) => value !== null && value !== undefined && value !== '',
    ),
  );
  const response = await httpService.get<FileResponse>(
    url,
    buildParams,
    { ...options, responseType: 'blob' },
    payload,
  );
  // Blob URL 생성
  const blobUrl = URL.createObjectURL(response.blob);

  // 다운로드를 위한 a 태그 생성 및 클릭 트리거
  const link = document.createElement('a');
  link.href = blobUrl;
  link.setAttribute('download', response.fileName || 'file');
  document.body.appendChild(link);
  link.click();

  // URL 객체 및 태그 정리
  URL.revokeObjectURL(blobUrl);
  document.body.removeChild(link);
};
