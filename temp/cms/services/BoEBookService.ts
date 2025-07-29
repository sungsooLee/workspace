/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_cms_ebook_dto_req_EbookSaveReqDto } from '../models/com_ever_edu_cms_ebook_dto_req_EbookSaveReqDto';
import type { com_ever_edu_cms_ebook_dto_res_EbookChangeStatusResDto } from '../models/com_ever_edu_cms_ebook_dto_res_EbookChangeStatusResDto';
import type { com_ever_edu_cms_ebook_dto_res_EbookResDto } from '../models/com_ever_edu_cms_ebook_dto_res_EbookResDto';
import type { com_ever_edu_cms_ebook_dto_res_EbookResourceResDto } from '../models/com_ever_edu_cms_ebook_dto_res_EbookResourceResDto';
import type { com_ever_edu_cms_ebook_dto_res_EbookStatusResDto } from '../models/com_ever_edu_cms_ebook_dto_res_EbookStatusResDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BoEBookService {
    /**
     * E-Book 콘텐츠 메타 정보 수정
     * 콘텐츠 메타 정보를 수정 저장한다.
     * @param ebookReqDto
     * @returns com_ever_edu_cms_ebook_dto_res_EbookResDto OK
     * @throws ApiError
     */
    public static updateContent7(
        ebookReqDto: com_ever_edu_cms_ebook_dto_req_EbookSaveReqDto,
    ): CancelablePromise<com_ever_edu_cms_ebook_dto_res_EbookResDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/ebook',
            query: {
                'ebookReqDto': ebookReqDto,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                404: `Not Found`,
                422: `Unprocessable Entity`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * E-Book 콘텐츠 메타 정보 저장
     * 콘텐츠 메타 정보를 저장한다.
     * @param ebookReqDto
     * @returns com_ever_edu_cms_ebook_dto_res_EbookResDto OK
     * @throws ApiError
     */
    public static saveContent2(
        ebookReqDto: com_ever_edu_cms_ebook_dto_req_EbookSaveReqDto,
    ): CancelablePromise<com_ever_edu_cms_ebook_dto_res_EbookResDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/ebook',
            query: {
                'ebookReqDto': ebookReqDto,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                404: `Not Found`,
                422: `Unprocessable Entity`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * E-Book 콘텐츠 상태 조회
     * E-Book 콘텐츠 상태를 조회한다.
     * @param contentUuid E-Book 콘텐츠 UUID
     * @returns com_ever_edu_cms_ebook_dto_res_EbookStatusResDto OK
     * @throws ApiError
     */
    public static getContentStatus3(
        contentUuid: string,
    ): CancelablePromise<com_ever_edu_cms_ebook_dto_res_EbookStatusResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/ebook/{contentUuid}/status',
            path: {
                'contentUuid': contentUuid,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                404: `Not Found`,
                405: `Method Not Allowed`,
                422: `Unprocessable Entity`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * SCORM 콘텐츠 리소스 조회
     * E-Book 콘텐츠 리소스를 조회한다.
     * @param contentUuid E-Book 콘텐츠 UUID
     * @returns com_ever_edu_cms_ebook_dto_res_EbookResourceResDto OK
     * @throws ApiError
     */
    public static getContentResource14(
        contentUuid: string,
    ): CancelablePromise<com_ever_edu_cms_ebook_dto_res_EbookResourceResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/ebook/{contentUuid}/resource',
            path: {
                'contentUuid': contentUuid,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                404: `Not Found`,
                422: `Unprocessable Entity`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * E-Book 파일변경 상태 조회
     * E-Book 파일을 변경 상태를 조회한다.
     * @param changeUuid E-Book 파일변경 UUID
     * @returns com_ever_edu_cms_ebook_dto_res_EbookChangeStatusResDto OK
     * @throws ApiError
     */
    public static changeContentFile4(
        changeUuid: string,
    ): CancelablePromise<com_ever_edu_cms_ebook_dto_res_EbookChangeStatusResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/ebook/file/change/{changeUuid}',
            path: {
                'changeUuid': changeUuid,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                404: `Not Found`,
                405: `Method Not Allowed`,
                422: `Unprocessable Entity`,
                500: `Internal Server Error`,
            },
        });
    }
}
