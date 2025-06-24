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

export default class FileManagerService {
  // 썸네일 이미지 업로드 요청
  static uploadImageFile(formData?: FormData): Promise<ImageInfo> {
    return httpService.post<ImageInfo>(`${PMSApiPrefix()}/file/image`, formData);
  }
  // 썸네일 이미지 삭제 요청
  static deleteImageFile(imageUrl: string): Promise<ImageInfo> {
    return httpService.delete<ImageInfo>(`${PMSApiPrefix()}/file/image?imageUrl=${imageUrl}`);
  }
  // 파일 정보 생성
  static createFileInfo(fileInfo: CreateFileInfoReq): Promise<FileInfo> {
    return httpService.post<FileInfo>(`${PMSApiPrefix()}/file`, fileInfo);
  }
  // 파일 그룹 정보 생성
  static createFileGroupInfo(groupInfo: BaseGroupInfo): Promise<FileGroupInfo> {
    return httpService.post<FileGroupInfo>(`${PMSApiPrefix()}/file/group`, groupInfo);
  }
  // 파일 그룹 및 1개 이상의 파일 정보 생성
  static createFileGroupFiles(groupFiles: CreateFileGroupFilesInfoReq): Promise<GroupFileInfo> {
    return httpService.post<GroupFileInfo>(`${PMSApiPrefix()}/file/group/files`, groupFiles);
  }
  // 파일정보 삭제
  static deleteFileInfo(fileUuid: string) {
    return httpService.delete(`${PMSApiPrefix()}/file/${fileUuid}`);
  }
  // 파일 다운로드
  static fileDownload(fileUuid: string) {
    return fileDownload({ url: `${PMSApiPrefix()}/file/${fileUuid}/download` });
  }
  // 파일 복수 다운로드
  static filesDownload(fileUuids: string[]) {
    return fileDownload({ url: `${PMSApiPrefix()}/file/files/${fileUuids.join(',')}/download` });
  }

  // TODO. 아래 3가지는 요건이 없어서 추가하지 않았음
  // 파일 그룹 목록 조회
  // 파일 그룹 정보 조회
  // 파일 그룹 파일 목록 조회
}
