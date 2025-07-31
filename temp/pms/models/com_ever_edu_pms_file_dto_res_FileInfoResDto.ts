/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_pms_file_dto_res_FileInfoResDto = {
    groupUuid?: string;
    fileUuid?: string;
    originalFileName?: string;
    serverFileName?: string;
    fileSize?: number;
    /**
     * 파일세부경로, 3Depth 경로<br>경로 구성: (1depth:upload)(2depth:/대분류/소분류)(3depth:/yyyy/mm/dd)(/4depth:파일명)
     */
    detailPath?: string;
    /**
     * S3|HMG 파일전체경로<br>경로 구성: (1depth:upload)(2depth:/대분류/소분류)(3depth:/yyyy/mm/dd)(/4depth:파일명)
     */
    filePath?: string;
    fileUrl?: string;
    /**
     * Enum(pms.file.FileType)<br>- IMAGE<br>- VIDEO<br>- DOC<br>- TXT<br>- WEB: 링쿠경로<br>- ZIP<br>- ETC
     */
    fileType?: com_ever_edu_pms_file_dto_res_FileInfoResDto.fileType;
    /**
     * Enum(pms.file.FileUploadStatus)<br>- TEMPORARY_SAVE<br>- COMPLETE<br>- ONGOING(파일 후속 처리 상태)<br>- FAIL(파일 후속 처리 실패)
     */
    uploadStatus?: com_ever_edu_pms_file_dto_res_FileInfoResDto.uploadStatus;
    isUsed?: boolean;
    uploadId?: string;
    s3Key?: string;
};
export namespace com_ever_edu_pms_file_dto_res_FileInfoResDto {
    /**
     * Enum(pms.file.FileType)<br>- IMAGE<br>- VIDEO<br>- DOC<br>- TXT<br>- WEB: 링쿠경로<br>- ZIP<br>- ETC
     */
    export enum fileType {
        IMAGE = 'IMAGE',
        VIDEO = 'VIDEO',
        DOC = 'DOC',
        TXT = 'TXT',
        WEB = 'WEB',
        ZIP = 'ZIP',
        ETC = 'ETC',
    }
    /**
     * Enum(pms.file.FileUploadStatus)<br>- TEMPORARY_SAVE<br>- COMPLETE<br>- ONGOING(파일 후속 처리 상태)<br>- FAIL(파일 후속 처리 실패)
     */
    export enum uploadStatus {
        TEMPORARY_SAVE = 'TEMPORARY_SAVE',
        COMPLETE = 'COMPLETE',
        ONGOING = 'ONGOING',
        FAIL = 'FAIL',
    }
}

