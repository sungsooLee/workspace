import { PMSApiPrefix } from '@learnway/config';
import { httpService } from '@learnway/shared';
import {
  CompletedMultiPartUploadReq,
  CompletedMultiPartUploadRes,
  InitMultiPartUploadRes,
  MultiFilePartRes,
  PartPresigendReq,
  PresignedRes,
} from '../types';
const API_BASE_URL = `${PMSApiPrefix()}/file/s3`;

/*
 * [BO] S3 File 업로드/다운로드
 * S3 File 업로드/다운로드 서비스입니다.
 * */

/**
 * S3 멀티파트 업로드 시작 요청
 * 멀티파트 업로드 식별을 위한 고유 ID를 받는다.
 */
export const initMultiPartUpload = async (
  filename: string,
): Promise<InitMultiPartUploadRes | undefined> => {
  try {
    return await httpService.post<InitMultiPartUploadRes>(`${API_BASE_URL}/multipart`, {
      filename,
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
  const { uploadId, key, parts } = props;
  try {
    return await httpService.post<CompletedMultiPartUploadRes>(
      `${API_BASE_URL}/multipart/${uploadId}/complete?key=${key}`,
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
export const getMultiFileParts = async (uploadId: string, key: string) => {
  try {
    return await httpService.get<MultiFilePartRes>(`${API_BASE_URL}/multipart/${uploadId}`);
  } catch (e) {
    console.error(e);
    return Promise.resolve(undefined);
  }
};

export const abortMultiPartUpload = async (uploadId: string, key: string) => {
  try {
    return await httpService.delete<MultiFilePartRes>(
      `${API_BASE_URL}/multipart/${uploadId}?key=${key}`,
    );
  } catch (e) {
    console.error(e);
    return Promise.resolve(undefined);
  }
};

/**
 * S3 업로드 Presigned URL 요청
 * 싱글 프리사인 URL 을 발급 받는다.
 * @param key
 */
export const issuePresigendUrlBySingle = async (key: string): Promise<PresignedRes | undefined> => {
  try {
    return await httpService.get<PresignedRes>(`${API_BASE_URL}/uploader`, {
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
export const issuePresigendUrlByPart = async (
  props: PartPresigendReq,
): Promise<PresignedRes | undefined> => {
  const { uploadId, partNumber, key } = props;
  try {
    return await httpService.get<PresignedRes>(
      `${API_BASE_URL}/multipart/${uploadId}/${partNumber}`,
      {
        key,
      },
    );
  } catch (e) {
    console.error(e);
    return Promise.resolve(undefined);
  }
};
