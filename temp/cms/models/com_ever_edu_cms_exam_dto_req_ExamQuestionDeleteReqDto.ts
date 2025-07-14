/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_cms_exam_dto_req_ExamQuestionDeleteReqDto = {
    /**
     * 시험지/문제은행 콘텐츠 UUID
     */
    contentUuid: string;
    /**
     * 콘텐츠 타입
     */
    contentType: com_ever_edu_cms_exam_dto_req_ExamQuestionDeleteReqDto.contentType;
    /**
     * 삭제할 시험문항 UUID 목록
     */
    questionUuidList: Array<string>;
};
export namespace com_ever_edu_cms_exam_dto_req_ExamQuestionDeleteReqDto {
    /**
     * 콘텐츠 타입
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

