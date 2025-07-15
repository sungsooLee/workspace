/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_cms_ebook_dto_res_EbookItemResDto } from './com_ever_edu_cms_ebook_dto_res_EbookItemResDto';
/**
 * E-Book Organization 목록
 */
export type com_ever_edu_cms_ebook_dto_res_EbookOrganizationResDto = {
    /**
     * E-BOOK 학습구성 아이디
     */
    orgnId?: number;
    /**
     * E-BOOK 학습구성 제목
     */
    orgnTitle?: string;
    /**
     * E-BOOK 학습구성 엘리먼트ID
     */
    orgnElementId?: string;
    /**
     * E-BOOK 학습구성 Base Url
     */
    baseUrl?: string;
    /**
     * E-BOOK 학습구성 Item 목록
     */
    items?: Array<com_ever_edu_cms_ebook_dto_res_EbookItemResDto>;
};

