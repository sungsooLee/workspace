/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_file_dto_req_FileInfoReqDto } from './com_ever_edu_pms_file_dto_req_FileInfoReqDto';
export type com_ever_edu_pms_file_dto_req_FileGroupAndFilesReqDto = {
    /**
     * Enum(pms.file.FileAffairsType) - LMS|PMS|CMS
     */
    affairsType: com_ever_edu_pms_file_dto_req_FileGroupAndFilesReqDto.affairsType;
    /**
     * Enum(pms.file.StorageType) - S3|HMG
     */
    storageType: com_ever_edu_pms_file_dto_req_FileGroupAndFilesReqDto.storageType;
    /**
     * 기본경로. 1-2Depth 경로<br>경로 구성: (1depth:upload)(2depth:/대분류/소분류)(3depth:/yyyy/mm/dd)(/4depth:파일명)
     */
    basicPath: string;
    /**
     * 세부경로, 3Depth 경로<br>경로 구성: (1depth:upload)(2depth:/대분류/소분류)(3depth:/yyyy/mm/dd)(/4depth:파일명)
     */
    detailPath: string;
    languageCode: string;
    files?: Array<com_ever_edu_pms_file_dto_req_FileInfoReqDto>;
};
export namespace com_ever_edu_pms_file_dto_req_FileGroupAndFilesReqDto {
    /**
     * Enum(pms.file.FileAffairsType) - LMS|PMS|CMS
     */
    export enum affairsType {
        LMS = 'LMS',
        PMS = 'PMS',
        CMS = 'CMS',
    }
    /**
     * Enum(pms.file.StorageType) - S3|HMG
     */
    export enum storageType {
        S3 = 'S3',
        HMG = 'HMG',
    }
}

