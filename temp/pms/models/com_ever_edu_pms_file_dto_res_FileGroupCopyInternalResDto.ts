/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_file_dto_res_FileCopyInternalResDto } from './com_ever_edu_pms_file_dto_res_FileCopyInternalResDto';
export type com_ever_edu_pms_file_dto_res_FileGroupCopyInternalResDto = {
    /**
     * 원본 파일그룹 UUID
     */
    srcGroupUuid?: string;
    /**
     * 파일그룹 UUID
     */
    groupUuid?: string;
    /**
     * 업무분류유형. 코드그룹(pms.file.FileAffairsType) - LMS|PMS|CMS
     */
    affairsType?: com_ever_edu_pms_file_dto_res_FileGroupCopyInternalResDto.affairsType;
    /**
     * 저정소유형코드. 코드그룹(pms.file.RepositoryType) - S3|HMG
     */
    reposType?: com_ever_edu_pms_file_dto_res_FileGroupCopyInternalResDto.reposType;
    /**
     * 복사 대상 파일 수
     */
    totalCount?: number;
    /**
     * 복사 파일 수
     */
    copyCount?: number;
    /**
     * 파일목록
     */
    files?: Array<com_ever_edu_pms_file_dto_res_FileCopyInternalResDto>;
};
export namespace com_ever_edu_pms_file_dto_res_FileGroupCopyInternalResDto {
    /**
     * 업무분류유형. 코드그룹(pms.file.FileAffairsType) - LMS|PMS|CMS
     */
    export enum affairsType {
        LMS = 'LMS',
        PMS = 'PMS',
        CMS = 'CMS',
    }
    /**
     * 저정소유형코드. 코드그룹(pms.file.RepositoryType) - S3|HMG
     */
    export enum reposType {
        S3 = 'S3',
        HMG = 'HMG',
    }
}

