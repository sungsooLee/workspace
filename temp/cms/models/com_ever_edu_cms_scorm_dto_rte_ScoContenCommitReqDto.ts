/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_cms_scorm_dto_rte_ScoCmiObjectInfoDto } from './com_ever_edu_cms_scorm_dto_rte_ScoCmiObjectInfoDto';
export type com_ever_edu_cms_scorm_dto_rte_ScoContenCommitReqDto = {
    /**
     * 과정차수Id
     */
    sequenceId?: number;
    /**
     * 과정Id
     */
    courseId?: number;
    /**
     * 커리큘럼Id
     */
    curriculumId?: number;
    /**
     * 모듈 ID
     */
    moduleId?: number;
    /**
     * 레슨 ID
     */
    lessonId?: number;
    /**
     * 콘텐츠 UUID
     */
    contentUuid: string;
    /**
     * 스콤 콘텐츠 구성(Organization) Id
     */
    orgnId?: number;
    /**
     * 스콤 Manifest Item element Id
     */
    scoId: string;
    objectInfo: com_ever_edu_cms_scorm_dto_rte_ScoCmiObjectInfoDto;
};

