import { fileDownload, httpService } from '@learnway/shared';
import { LMSApiPrefix, PMSApiPrefix } from '@learnway/config';
import {
  BaseGroupInfo,
  CreateFileGroupFilesInfoReq,
  CreateFileInfoReq,
  FileGroupInfo,
  FileInfo,
  GroupFileInfo,
} from './type';

export default class FileManagerService {
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
    return fileDownload(`${PMSApiPrefix()}/file/${fileUuid}/download`);
  }

  // TODO. 아래 3가지는 요건이 없어서 추가하지 않았음
  // 파일 그룹 목록 조회
  // 파일 그룹 정보 조회
  // 파일 그룹 파일 목록 조회
}
