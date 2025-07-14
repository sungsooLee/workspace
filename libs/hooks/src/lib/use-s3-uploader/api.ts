import {
  CompletedMultiPartUploadReq,
  CompletedMultiPartUploadRes,
  InitMultiPartUploadRes,
  MultiFilePartRes,
  PartPresignedReq,
  PresignedRes,
  SaveTempFileInfoReq,
  SaveTempFileInfoRes,
  CompleteFileUploadReq,
} from './types';
import { httpService } from '@learnway/shared';
import { PMSApiPrefix } from '@learnway/config';

const API_BASE_URL = `${PMSApiPrefix()}/file`;
/*
 * [BO] S3 File 업로드/다운로드
 * S3 File 업로드/다운로드 서비스입니다.
 * */

/**
 * S3 멀티파트 업로드 시작 요청
 * 멀티파트 업로드 식별을 위한 고유 ID를 받는다.
 */
export const initMultiPartUpload = async (
  key: string,
): Promise<InitMultiPartUploadRes | undefined> => {
  try {
    return await httpService.post<InitMultiPartUploadRes>(`${API_BASE_URL}/s3/multipart`, {
      filename: key,
    });
  } catch (e) {
    console.error(e);
    return Promise.resolve(undefined);
  }
};

/**
 * S3 멀티파트 업로드 완료 요청
 * @param props
 */
export const completedMultiPartUpload = async (
  props: CompletedMultiPartUploadReq,
): Promise<CompletedMultiPartUploadRes | undefined> => {
  const { uploadId, parts, key } = props;
  try {
    return await httpService.post<CompletedMultiPartUploadRes>(
      `${API_BASE_URL}/s3/multipart/${uploadId}/complete?key=${key}`,
      { parts },
    );
  } catch (e) {
    console.error(e);
    return Promise.resolve(undefined);
  }
};

/**
 * S3 멀티파트 업로드 Part 목록 요청
 * S3 멀티파트 업로드 Part 목록을 요청한다.
 * @param uploadId
 */
export const getMultiFileParts = async (
  uploadId: string,
  key: string,
): Promise<MultiFilePartRes | undefined> => {
  try {
    return await httpService.get<MultiFilePartRes>(
      `${API_BASE_URL}/s3/multipart/${uploadId}?key=${key}`,
    );
  } catch (e) {
    console.error(e);
    return Promise.resolve(undefined);
  }
};

/**
 * S3 업로드 Presigned URL 요청
 * 싱글 프리사인 URL 을 발급 받는다.
 * @param filename
 */
export const issuePresignedUrlBySingle = async (key: string): Promise<PresignedRes | undefined> => {
  try {
    return await httpService.get<PresignedRes>(`${API_BASE_URL}/s3/uploader`, {
      key,
    });
  } catch (e) {
    console.error(e);
    return Promise.resolve(undefined);
  }
};

/**
 * Part(청크)별 프리사인 URL 을 발급 받는다.
 * @param props
 */
export const issuePresignedUrlByPart = async (
  props: PartPresignedReq,
): Promise<PresignedRes | undefined> => {
  const { uploadId, partNumber, key } = props;
  try {
    return await httpService.get<PresignedRes>(
      `${API_BASE_URL}/s3/multipart/${uploadId}/${partNumber}`,
      {
        key,
      },
    );
  } catch (e) {
    console.error(e);
    return Promise.resolve(undefined);
  }
};

export const abortMultiPartUpload = async (uploadId: string, key: string) => {
  try {
    await httpService.delete<MultiFilePartRes>(
      `${API_BASE_URL}/s3/multipart/${uploadId}?key=${key}`,
    );
  } catch (e) {
    console.error(e);
    return Promise.resolve(undefined);
  }
};

/**
 * 파일 그룹 생성
 * 업로드 전에 파일 그룹을 생성
 */
export const createFileGroup = async (groupData: {
  affairsType: 'PMS' | 'CMS' | 'LMS';
  storageType: 'S3';
  basicPath: string;
  languageCode: string;
}): Promise<{ groupUuid: string } | undefined> => {
  try {
    return await httpService.post<any>(`${API_BASE_URL}/group`, groupData);
  } catch (e) {
    console.error(e);
    return Promise.resolve(undefined);
  }
};

/**
 * 파일 정보 임시 저장
 * 업로드 전에 파일 정보를 임시 상태로 저장
 */
export const saveTempFileInfo = async (
  groupUuid: string,
  fileData: SaveTempFileInfoReq,
): Promise<SaveTempFileInfoRes | undefined> => {
  try {
    const response = await httpService.post<any>(
      `${API_BASE_URL}/group/${groupUuid}/files`,
      fileData,
    );
    return response.files[0];
  } catch (e) {
    console.error(e);
    return Promise.resolve(undefined);
  }
};

/**
 * 파일 업로드 완료 요청
 * 임시 상태에서 저장 상태로 변경
 */
export const completeFileUpload = async (
  fileUuid: string,
  data?: CompleteFileUploadReq,
): Promise<any | undefined> => {
  try {
    return await httpService.post<any>(`${API_BASE_URL}/${fileUuid}/complete`, data);
  } catch (e) {
    console.error(e);
    return Promise.resolve(undefined);
  }
};

/**
 * 파일 정보 삭제
 * 생성된 파일 정보를 백엔드에서 삭제
 */
export const deleteFileInfo = async (fileUuid: string): Promise<any | undefined> => {
  try {
    return await httpService.delete<any>(`${API_BASE_URL}/${fileUuid}`);
  } catch (e) {
    console.error(e);
    return Promise.resolve(undefined);
  }
};
