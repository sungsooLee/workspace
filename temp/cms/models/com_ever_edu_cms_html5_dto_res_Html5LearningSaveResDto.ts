/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_cms_html5_dto_res_Html5LearningSaveResDto = {
    /**
     * 차수 ID
     */
    courseSequenceId?: number;
    /**
     * 코스 ID
     */
    courseId?: number;
    /**
     * 커리큘럼 ID
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
    contentUuid?: string;
    /**
     * 재생률
     */
    playRate?: number;
    /**
     * 학습진행상태
     */
    watchProgressStatus?: com_ever_edu_cms_html5_dto_res_Html5LearningSaveResDto.watchProgressStatus;
};
export namespace com_ever_edu_cms_html5_dto_res_Html5LearningSaveResDto {
    /**
     * 학습진행상태
     */
    export enum watchProgressStatus {
        COMPLETE = 'COMPLETE',
        PLAYING = 'PLAYING',
    }
}

