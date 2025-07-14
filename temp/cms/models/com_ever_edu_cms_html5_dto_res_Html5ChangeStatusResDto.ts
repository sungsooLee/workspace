/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_cms_html5_dto_res_Html5ChangeStatusResDto = {
    changeId?: number;
    contentUuid?: string;
    /**
     * 파일 UUID
     */
    fileUuid?: string;
    /**
     * HTML5 동영상 콘텐츠 처리 상태. FAIL|COMPLETE|STARTED|PARSING|UPLOADING
     */
    processingStatus?: com_ever_edu_cms_html5_dto_res_Html5ChangeStatusResDto.processingStatus;
};
export namespace com_ever_edu_cms_html5_dto_res_Html5ChangeStatusResDto {
    /**
     * HTML5 동영상 콘텐츠 처리 상태. FAIL|COMPLETE|STARTED|PARSING|UPLOADING
     */
    export enum processingStatus {
        NONE = 'NONE',
        FAIL = 'FAIL',
        COMPLETE = 'COMPLETE',
        STARTED = 'STARTED',
        UNZIPPING = 'UNZIPPING',
        UPLOADING = 'UPLOADING',
    }
}

