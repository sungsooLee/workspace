/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_cms_content_dto_res_ContentProgressResDto } from './com_ever_edu_cms_content_dto_res_ContentProgressResDto';
export type com_ever_edu_cms_content_dto_res_ContentProgressListResDto = {
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
    progress?: number;
    /**
     * Enum(cms.content.LearningCompletionStatus)<br>- COMPLETED: 학습 완료 상태<br>- INCOMPLETE: 학습 진행중인 상태<br>- NOT_ATTEMPTED: 학습 미진행
     */
    completionStatus?: com_ever_edu_cms_content_dto_res_ContentProgressListResDto.completionStatus;
    progressList?: Array<com_ever_edu_cms_content_dto_res_ContentProgressResDto>;
};
export namespace com_ever_edu_cms_content_dto_res_ContentProgressListResDto {
    /**
     * Enum(cms.content.LearningCompletionStatus)<br>- COMPLETED: 학습 완료 상태<br>- INCOMPLETE: 학습 진행중인 상태<br>- NOT_ATTEMPTED: 학습 미진행
     */
    export enum completionStatus {
        COMPLETED = 'COMPLETED',
        INCOMPLETE = 'INCOMPLETE',
        NOT_ATTEMPTED = 'NOT_ATTEMPTED',
    }
}

