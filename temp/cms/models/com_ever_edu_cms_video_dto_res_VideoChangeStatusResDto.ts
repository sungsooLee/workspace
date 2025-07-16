/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_cms_video_dto_res_VideoChangeStatusResDto = {
    resourceId?: number;
    contentUuid?: string;
    fileUuid?: string;
    processingStatus?: com_ever_edu_cms_video_dto_res_VideoChangeStatusResDto.processingStatus;
};
export namespace com_ever_edu_cms_video_dto_res_VideoChangeStatusResDto {
    export enum processingStatus {
        NONE = 'NONE',
        FAIL = 'FAIL',
        COMPLETE = 'COMPLETE',
        STARTED = 'STARTED',
        THUMBNAIL = 'THUMBNAIL',
        AUDIO = 'AUDIO',
        ENCODING = 'ENCODING',
        UPLOADING = 'UPLOADING',
    }
}

