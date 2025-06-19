import FileManagerService from './api';
import {
  BaseGroupInfo,
  CreateFileGroupFilesInfoReq,
  CreateFileInfoReq,
  FileGroupInfo,
  FileInfo,
  GroupFileInfo,
  ImageInfo,
} from './type';

/**
 * BE 에 S3 업로드 된 파일에대 한 파일 그룹 및 파일 정보 등록 요청 hook
 */
const useFileManagerHook = () => {
  // 썸네일 이미지 업로드 요청
  const uploadImageFile = (formData?: FormData): Promise<ImageInfo> => {
    return FileManagerService.uploadImageFile(formData);
  };
  // 썸네일 이미지 업로드 요청
  const deleteImageFile = (imageUrl: string): Promise<ImageInfo> => {
    return FileManagerService.deleteImageFile(imageUrl);
  };
  // 파일 정보 생성
  const createFileInfo = (fileInfo: CreateFileInfoReq): Promise<FileInfo> => {
    return FileManagerService.createFileInfo(fileInfo);
  };
  // 파일 그룹 생성
  const createFileGroupInfo = (groupInfo: BaseGroupInfo): Promise<FileGroupInfo> => {
    return FileManagerService.createFileGroupInfo(groupInfo);
  };
  // 파일 그룹 + 파일 정보 생성
  const createFileGroupFiles = (
    groupFiles: CreateFileGroupFilesInfoReq,
  ): Promise<GroupFileInfo> => {
    return FileManagerService.createFileGroupFiles(groupFiles);
  };
  // 파일 삭제
  const deleteFileInfo = async (fileUuid: string): Promise<void> => {
    await FileManagerService.deleteFileInfo(fileUuid);
  };
  // 파일 다운로드
  const fileDownload = async (fileUuid: string): Promise<void> => {
    await FileManagerService.fileDownload(fileUuid);
  };

  return {
    uploadImageFile,
    deleteImageFile,
    createFileInfo,
    createFileGroupInfo,
    createFileGroupFiles,
    deleteFileInfo,
    fileDownload,
  };
};

export const useFileManager = useFileManagerHook;
