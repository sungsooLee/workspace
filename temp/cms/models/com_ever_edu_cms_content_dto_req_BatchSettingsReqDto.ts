/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_cms_content_dto_req_SharedBoxContentReqDto } from './com_ever_edu_cms_content_dto_req_SharedBoxContentReqDto';
export type com_ever_edu_cms_content_dto_req_BatchSettingsReqDto = {
    tenantId: number;
    channelUuid: string;
    contentType: com_ever_edu_cms_content_dto_req_BatchSettingsReqDto.contentType;
    contents?: Array<string>;
    coordinatorUuid: string;
    coordinatorName: string;
    coordinatorTelNo: string;
    isUnlimited: boolean;
    contentUseStartDate?: string;
    contentUseEndDate?: string;
    isCourseUsed?: boolean;
    sharedBoxContentReqDto?: com_ever_edu_cms_content_dto_req_SharedBoxContentReqDto;
    isInspected?: boolean;
    isCopyrighted?: boolean;
    isSecured?: boolean;
};
export namespace com_ever_edu_cms_content_dto_req_BatchSettingsReqDto {
    export enum contentType {
        VIDEO = 'VIDEO',
        EBOOK = 'EBOOK',
        SCORM = 'SCORM',
        HTML5_VIDEO = 'HTML5_VIDEO',
        IMAGE = 'IMAGE',
        EXTERNAL_LINK = 'EXTERNAL_LINK',
        EXTERNAL_AGENCY = 'EXTERNAL_AGENCY',
        BLOG = 'BLOG',
        EXAM = 'EXAM',
        EXAM_POOL = 'EXAM_POOL',
        ASSIGNMENT = 'ASSIGNMENT',
        SURVEY = 'SURVEY',
        ETC = 'ETC',
    }
}

