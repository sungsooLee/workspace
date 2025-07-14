/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * SCORM 학습구성 Item 목록
 */
export type com_ever_edu_cms_scorm_dto_res_ScormItemResDto = {
    /**
     * 학습구성 Item 제목
     */
    itemTitle?: string;
    /**
     * 학습구성 Item 엘리먼트ID(SCOID)
     */
    scoId?: string;
    /**
     * 학습구성 Item 시작 페이지
     */
    itemFilePath?: string;
    /**
     * 학습구성 Item Url
     */
    itemUrl?: string;
    /**
     * 학습구성 Item 유형
     */
    itemType?: string;
    /**
     * SCORM 학습구성 하위 Item 목록
     */
    items?: Array<com_ever_edu_cms_scorm_dto_res_ScormItemResDto>;
};

