/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_xternal_content_dto_ScormItemDto } from './com_ever_edu_xternal_content_dto_ScormItemDto';
/**
 * SCORM Organization 목록
 */
export type com_ever_edu_xternal_content_dto_ScormOrganizationDto = {
    /**
     * SCORM 학습구성 아이디
     */
    orgnId?: number;
    /**
     * SCORM 학습구성 제목
     */
    orgnTitle?: string;
    /**
     * SCORM 학습구성 엘리먼트ID(SCOID)
     */
    orgnElementId?: string;
    /**
     * SCORM 학습구성 Base Url
     */
    baseUrl?: string;
    /**
     * SCORM 학습구성 Item 목록
     */
    items?: Array<com_ever_edu_xternal_content_dto_ScormItemDto>;
};

