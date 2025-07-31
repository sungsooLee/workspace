/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_file_dto_res_FileInfoResDto } from './com_ever_edu_pms_file_dto_res_FileInfoResDto';
export type com_ever_edu_pms_file_dto_res_GroupInfoResDto = {
    groupUuid?: string;
    /**
     * Enum(pms.file.FileAffairsType) - LMS|PMS|CMS
     */
    affairsType?: com_ever_edu_pms_file_dto_res_GroupInfoResDto.affairsType;
    /**
     * Enum(pms.file.StorageType) - S3|HMG
     */
    storageType?: com_ever_edu_pms_file_dto_res_GroupInfoResDto.storageType;
    /**
     * 기본경로. 1-2Depth 경로<br>경로 구성: (1depth:upload)(2depth:/대분류/소분류)(3depth:/yyyy/mm/dd)(/4depth:파일명)<br>Ex&gt; upload/community/board/2025/01/02/file.ppt -&gt; upload/community/board
     */
    basicPath?: string;
    languageCode?: string;
    isUsed?: boolean;
    files?: Array<com_ever_edu_pms_file_dto_res_FileInfoResDto>;
};
export namespace com_ever_edu_pms_file_dto_res_GroupInfoResDto {
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

