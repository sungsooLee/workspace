/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * 파일그룹 정보
 */
export type com_ever_edu_pms_file_dto_res_FileGroupInfoResDto = {
    /**
     * 파일그룹 UUID
     */
    uuid?: string;
    /**
     * 업로드유형 Enum(FileUploadType) - ATTATCH|CONTENTS
     */
    uploadType?: com_ever_edu_pms_file_dto_res_FileGroupInfoResDto.uploadType;
    /**
     * 업무분류유형 Enum(FileAffairsType) - LMS|PMS|CMS
     */
    affairsType?: com_ever_edu_pms_file_dto_res_FileGroupInfoResDto.affairsType;
    /**
     * 저정소유형코드 Enum(RepositoryType) - S3|HMG
     */
    reposType?: com_ever_edu_pms_file_dto_res_FileGroupInfoResDto.reposType;
    /**
     * 기본경로. 1-2Depth 경로<br>경로 구성: (1depth:upload)(2depth:/대분류/소분류)(3depth:/yyyy/mm/dd)(/4depth:파일명)<br> Ex&gt; upload/community/board/2025/01/02/file.ppt -&gt; upload/community/board
     */
    basicPath?: string;
    /**
     * 언어코드
     */
    languageCode?: string;
    /**
     * 삭제여부
     */
    isDeleted?: boolean;
    /**
     * 사용여부
     */
    isUsed?: boolean;
};
export namespace com_ever_edu_pms_file_dto_res_FileGroupInfoResDto {
    /**
     * 업로드유형 Enum(FileUploadType) - ATTATCH|CONTENTS
     */
    export enum uploadType {
        ATTATCH = 'ATTATCH',
        CONTENTS = 'CONTENTS',
    }
    /**
     * 업무분류유형 Enum(FileAffairsType) - LMS|PMS|CMS
     */
    export enum affairsType {
        LMS = 'LMS',
        PMS = 'PMS',
        CMS = 'CMS',
    }
    /**
     * 저정소유형코드 Enum(RepositoryType) - S3|HMG
     */
    export enum reposType {
        S3 = 'S3',
        HMG = 'HMG',
    }
}

