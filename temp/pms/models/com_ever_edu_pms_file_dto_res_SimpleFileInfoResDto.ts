/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_pms_file_dto_res_SimpleFileInfoResDto = {
    /**
     * 파일 아이디
     */
    fileId?: number;
    /**
     * 파일 UUID
     */
    fileUuid?: string;
    /**
     * 원본파일이름
     */
    fileName?: string;
    /**
     * 저정소유형코드. 코드그룹(pms.file.RepositoryType) - S3|HMG
     */
    reposType?: com_ever_edu_pms_file_dto_res_SimpleFileInfoResDto.reposType;
    /**
     * S3버킷명
     */
    s3Bucket?: string;
    /**
     * 파일경로: (1depth:upload)(2depth:/대분류/소분류)(3depth:/yyyy/mm/dd)(/4depth:파일명)<br> Ex&gt; upload/community/board/2025/01/02/file.ppt
     */
    filePath?: string;
    /**
     * 파일크기
     */
    fileSize?: number;
    /**
     * 파일확장자
     */
    extType?: string;
    /**
     * 업로드 상태. 코드그룹(pms.file.FileUploadStatus) - TEMPORARY_SAVE|COMPLETE|ONGOING(파일 후속 처리가 필요한 상태)|FAIL(파일 후속 처리 실패)
     */
    uploadStatus?: com_ever_edu_pms_file_dto_res_SimpleFileInfoResDto.uploadStatus;
};
export namespace com_ever_edu_pms_file_dto_res_SimpleFileInfoResDto {
    /**
     * 저정소유형코드. 코드그룹(pms.file.RepositoryType) - S3|HMG
     */
    export enum reposType {
        S3 = 'S3',
        HMG = 'HMG',
    }
    /**
     * 업로드 상태. 코드그룹(pms.file.FileUploadStatus) - TEMPORARY_SAVE|COMPLETE|ONGOING(파일 후속 처리가 필요한 상태)|FAIL(파일 후속 처리 실패)
     */
    export enum uploadStatus {
        TEMPORARY_SAVE = 'TEMPORARY_SAVE',
        COMPLETE = 'COMPLETE',
        ONGOING = 'ONGOING',
        FAIL = 'FAIL',
    }
}

