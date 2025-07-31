/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_cms_html5_dto_res_Html5ChangeStatusResDto = {
    changeId?: number;
    contentUuid?: string;
    fileUuid?: string;
    processingStatus?: com_ever_edu_cms_html5_dto_res_Html5ChangeStatusResDto.processingStatus;
};
export namespace com_ever_edu_cms_html5_dto_res_Html5ChangeStatusResDto {
    export enum processingStatus {
        NONE = 'NONE',
        FAIL = 'FAIL',
        COMPLETE = 'COMPLETE',
        STARTED = 'STARTED',
        UNZIPPING = 'UNZIPPING',
        UPLOADING = 'UPLOADING',
    }
}

