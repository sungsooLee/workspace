import { fileDownload, httpService } from '@learnway/shared';
import { PMSApiPrefix } from '@learnway/config';
import {
  BaseGroupInfo,
  CreateFileGroupFilesInfoReq,
  CreateFileInfoReq,
  FileGroupInfo,
  FileInfo,
  GroupFileInfo,
  ImageInfo,
} from './type';

const prefixUrl = `${PMSApiPrefix()}/file`;

export default class FileManagerService {
  // 썸네일 이미지 업로드 요청
  static uploadImageFile(formData?: FormData): Promise<ImageInfo> {
    return httpService.post<ImageInfo>(`${prefixUrl}/image`, formData);
  }
  // 썸네일 이미지 삭제 요청
  static deleteImageFile(imageUrl: string): Promise<ImageInfo> {
    return httpService.delete<ImageInfo>(`${prefixUrl}/image?imageUrl=${imageUrl}`);
  }
  // 파일 정보 생성
  static createFileInfo(fileInfo: CreateFileInfoReq): Promise<FileInfo> {
    return httpService.post<FileInfo>(`${prefixUrl}`, fileInfo);
  }
  // 파일 그룹 정보 생성
  static createFileGroupInfo(groupInfo: BaseGroupInfo): Promise<FileGroupInfo> {
    return httpService.post<FileGroupInfo>(`${prefixUrl}/group`, groupInfo);
  }
  // 파일 그룹 및 1개 이상의 파일 정보 생성
  static createFileGroupFiles(groupFiles: CreateFileGroupFilesInfoReq): Promise<GroupFileInfo> {
    return httpService.post<GroupFileInfo>(`${prefixUrl}/group/files`, groupFiles);
  }
  // 파일 정보 삭제
  static deleteFileInfo(fileUuid: string) {
    return httpService.delete(`${prefixUrl}/${fileUuid}`);
  }
  // 파일 정보 조회
  static getFileInfo(fileUuid: string): Promise<FileInfo> {
    return httpService.get(`${prefixUrl}/${fileUuid}`);
  }
  // 파일 다운로드
  static fileDownload(fileUuid: string) {
    return fileDownload({ url: `${prefixUrl}/${fileUuid}/download` });
  }
  // 파일 복수 다운로드
  static filesDownload(fileUuids: string[]) {
    return fileDownload({ url: `${prefixUrl}/files/${fileUuids.join(',')}/download` });
  }

  // TODO. 아래 3가지는 요건이 없어서 추가하지 않았음
  // 파일 그룹 목록 조회
  static getGroupInfo(groupUuid: string): Promise<FileGroupInfo> {
    return httpService.get(`${prefixUrl}/group/${groupUuid}`);
  }

  // 파일 그룹 정보 조회
  // 파일 그룹 파일 목록 조회
}
