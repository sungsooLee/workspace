/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_cms_html5_dto_res_Html5LearningSaveResDto = {
    courseSequenceId?: number;
    courseId?: number;
    curriculumId?: number;
    moduleId?: number;
    lessonId?: number;
    contentUuid?: string;
    playRate?: number;
    /**
     * Enum(cms.html5.Html5LearningProgressStatus)<br>- COMPLETE: 완료<br>- PLAYING: 재생중
     */
    learningProgressStatus?: com_ever_edu_cms_html5_dto_res_Html5LearningSaveResDto.learningProgressStatus;
};
export namespace com_ever_edu_cms_html5_dto_res_Html5LearningSaveResDto {
    /**
     * Enum(cms.html5.Html5LearningProgressStatus)<br>- COMPLETE: 완료<br>- PLAYING: 재생중
     */
    export enum learningProgressStatus {
        COMPLETE = 'COMPLETE',
        PLAYING = 'PLAYING',
    }
}

