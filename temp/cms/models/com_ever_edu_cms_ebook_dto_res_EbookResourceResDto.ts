/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_cms_ebook_dto_res_EbookOrganizationResDto } from './com_ever_edu_cms_ebook_dto_res_EbookOrganizationResDto';
export type com_ever_edu_cms_ebook_dto_res_EbookResourceResDto = {
    /**
     * E-BOOK 콘텐츠 아이디
     */
    contentId?: number;
    /**
     * E-BOOK 콘텐츠 UUID
     */
    contentUuid?: string;
    /**
     * E-BOOK 처리 상태 Enum(cms.ebook.EbookProcessingStatus) - FAIL|COMPLETE|STARTED|UPLOADING|PARSING
     */
    processingStatus?: com_ever_edu_cms_ebook_dto_res_EbookResourceResDto.processingStatus;
    /**
     * E-BOOK 학습구성 목록
     */
    children?: Array<com_ever_edu_cms_ebook_dto_res_EbookOrganizationResDto>;
};
export namespace com_ever_edu_cms_ebook_dto_res_EbookResourceResDto {
    /**
     * E-BOOK 처리 상태 Enum(cms.ebook.EbookProcessingStatus) - FAIL|COMPLETE|STARTED|UPLOADING|PARSING
     */
    export enum processingStatus {
        NONE = 'NONE',
        FAIL = 'FAIL',
        COMPLETE = 'COMPLETE',
        STARTED = 'STARTED',
        UPLOADING = 'UPLOADING',
        PARSING = 'PARSING',
    }
}

