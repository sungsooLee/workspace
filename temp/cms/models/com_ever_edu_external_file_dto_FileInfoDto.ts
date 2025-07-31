/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_external_file_dto_FileInfoDto = {
    groupUuid?: string;
    fileId?: number;
    fileUuid?: string;
    fileName?: string;
    /**
     * Enum(StorageType)<br>- S3<br>- HMG
     */
    storageType?: com_ever_edu_external_file_dto_FileInfoDto.storageType;
    bucket?: string;
    /**
     * (1depth:upload)(2depth:/대분류/소분류)(3depth:/yyyy/mm/dd)(/4depth:파일명)
     */
    filePath?: string;
    fileSize?: number;
    extType?: string;
    /**
     * Enum(FileUploadStatus)<br>- COMPLETE|ONGOING(파일 후속 처리가 필요한 상태)<br>- FAIL(파일 후속 처리 실패)
     */
    uploadStatus?: com_ever_edu_external_file_dto_FileInfoDto.uploadStatus;
};
export namespace com_ever_edu_external_file_dto_FileInfoDto {
    /**
     * Enum(StorageType)<br>- S3<br>- HMG
     */
    export enum storageType {
        S3 = 'S3',
        HMG = 'HMG',
    }
    /**
     * Enum(FileUploadStatus)<br>- COMPLETE|ONGOING(파일 후속 처리가 필요한 상태)<br>- FAIL(파일 후속 처리 실패)
     */
    export enum uploadStatus {
        TEMPORARY_SAVE = 'TEMPORARY_SAVE',
        COMPLETE = 'COMPLETE',
        ONGOING = 'ONGOING',
        FAIL = 'FAIL',
    }
}

