/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_cms_exam_dto_req_ExamQuestionSortSeqUpdateReqDto$ExamQuestionSortSeqReqDto } from './com_ever_edu_cms_exam_dto_req_ExamQuestionSortSeqUpdateReqDto$ExamQuestionSortSeqReqDto';
export type com_ever_edu_cms_exam_dto_req_ExamQuestionSortSeqUpdateReqDto = {
    /**
     * 콘텐츠 UUID
     */
    contentUuid: string;
    /**
     * 콘텐트 타입
     */
    contentType: com_ever_edu_cms_exam_dto_req_ExamQuestionSortSeqUpdateReqDto.contentType;
    mappingList: Array<com_ever_edu_cms_exam_dto_req_ExamQuestionSortSeqUpdateReqDto$ExamQuestionSortSeqReqDto>;
};
export namespace com_ever_edu_cms_exam_dto_req_ExamQuestionSortSeqUpdateReqDto {
    /**
     * 콘텐트 타입
     */
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

