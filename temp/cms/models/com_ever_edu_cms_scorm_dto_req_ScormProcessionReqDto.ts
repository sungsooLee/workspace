/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_cms_scorm_dto_req_ScormProcessionReqDto = {
    curriculumId?: number;
    /**
     * 다건의 모듈ID를 ","로 연결
     */
    moduleIds?: string;
    contentUuid?: string;
    /**
     * 저장할 여러 파일의 UUID 목록
     */
    fileUuid?: string;
    srcContentUuid?: string;
};

