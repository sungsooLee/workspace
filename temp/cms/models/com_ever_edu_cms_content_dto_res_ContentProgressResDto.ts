/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_cms_content_dto_res_ContentProgressResDto = {
    /**
     * 과정차수Id
     */
    courseSequenceId?: number;
    /**
     * 과정Id
     */
    courseId?: number;
    /**
     * 커리큘럼Id
     */
    curriculumId?: number;
    /**
     * 커리큘럼 모듈 Id
     */
    moduleId?: number;
    /**
     * 커리큘럼 레슨 ID
     */
    lessonId?: number;
    contentUuid?: string;
    /**
     * Enum(cms.content.ContentType)Enum(cms.content.ContentType)<br>- VIDEO: 동영상<br>- EBOOK: 이북<br>- SCORM: 스콤<br>- HTML5_VIDEO: HTML 동영상<br>- IMAGE: 이미지<br>- EXTERNAL_LINK: 외부링크<br>- EXTERNAL_AGENCY: 외부위탁<br>- BLOG: 블로그<br>- EXAM: 시험지<br>- EXAM_POOL: 문제은행<br>- ASSIGNMENT: 과제<br>- SURVEY: 설문지<br>- ETC: 기타
     */
    contentType?: com_ever_edu_cms_content_dto_res_ContentProgressResDto.contentType;
    /**
     * Fixed-Orgn Id
     */
    orgnId?: number;
    /**
     * Fixed-Item ID
     */
    itemId?: number;
    /**
     * 학습자 UUID
     */
    userUuid?: string;
    progress?: number;
    /**
     * Enum(cms.content.LearningCompletionStatus)<br>- COMPLETED: 학습 완료 상태<br>- INCOMPLETE: 학습 진행중인 상태<br>- NOT_ATTEMPTED: 학습 미진행
     */
    completionStatus?: com_ever_edu_cms_content_dto_res_ContentProgressResDto.completionStatus;
    startDate?: string;
    endDate?: string;
};
export namespace com_ever_edu_cms_content_dto_res_ContentProgressResDto {
    /**
     * Enum(cms.content.ContentType)Enum(cms.content.ContentType)<br>- VIDEO: 동영상<br>- EBOOK: 이북<br>- SCORM: 스콤<br>- HTML5_VIDEO: HTML 동영상<br>- IMAGE: 이미지<br>- EXTERNAL_LINK: 외부링크<br>- EXTERNAL_AGENCY: 외부위탁<br>- BLOG: 블로그<br>- EXAM: 시험지<br>- EXAM_POOL: 문제은행<br>- ASSIGNMENT: 과제<br>- SURVEY: 설문지<br>- ETC: 기타
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
    /**
     * Enum(cms.content.LearningCompletionStatus)<br>- COMPLETED: 학습 완료 상태<br>- INCOMPLETE: 학습 진행중인 상태<br>- NOT_ATTEMPTED: 학습 미진행
     */
    export enum completionStatus {
        COMPLETED = 'COMPLETED',
        INCOMPLETE = 'INCOMPLETE',
        NOT_ATTEMPTED = 'NOT_ATTEMPTED',
    }
}

