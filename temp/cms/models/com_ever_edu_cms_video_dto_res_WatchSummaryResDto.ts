/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_cms_video_dto_res_WatchSummaryResDto = {
    contentUuid?: string;
    lessonId?: number;
    moduleId?: number;
    curriculumId?: number;
    courseId?: number;
    courseSequenceId?: number;
    totalPlayTime?: number;
    playRate?: number;
    videoWatchProgressStatus?: com_ever_edu_cms_video_dto_res_WatchSummaryResDto.videoWatchProgressStatus;
};
export namespace com_ever_edu_cms_video_dto_res_WatchSummaryResDto {
    export enum videoWatchProgressStatus {
        COMPLETE = 'COMPLETE',
        PLAYING = 'PLAYING',
    }
}

