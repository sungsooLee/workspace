/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_lms_azx_dto_req_AzxListFilterReqDto } from '../models/com_ever_edu_lms_azx_dto_req_AzxListFilterReqDto';
import type { com_ever_edu_lms_azx_dto_req_AzxSaveReqDto } from '../models/com_ever_edu_lms_azx_dto_req_AzxSaveReqDto';
import type { com_ever_edu_lms_azx_dto_req_AzxUpdateDto } from '../models/com_ever_edu_lms_azx_dto_req_AzxUpdateDto';
import type { com_ever_edu_lms_azx_dto_res_AzxAdminResDto } from '../models/com_ever_edu_lms_azx_dto_res_AzxAdminResDto';
import type { org_springframework_data_domain_PageCom_ever_edu_lms_azx_dto_res_AzxListAdminResDto } from '../models/org_springframework_data_domain_PageCom_ever_edu_lms_azx_dto_res_AzxListAdminResDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BoAzxService {
    /**
     * Azx 상세 조회
     * Azx Id로 상세정보를 조회한다.
     * @param azxId
     * @returns com_ever_edu_lms_azx_dto_res_AzxAdminResDto OK
     * @throws ApiError
     */
    public static findById2(
        azxId: number,
    ): CancelablePromise<com_ever_edu_lms_azx_dto_res_AzxAdminResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/azx/{azxId}',
            path: {
                'azxId': azxId,
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
     * Azx id로 업데이트 한다
     * Azx Id로 업데이트한다.
     * @param azxId
     * @param requestBody
     * @returns number OK
     * @throws ApiError
     */
    public static update5(
        azxId: number,
        requestBody: com_ever_edu_lms_azx_dto_req_AzxUpdateDto,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/azx/{azxId}',
            path: {
                'azxId': azxId,
            },
            body: requestBody,
            mediaType: 'application/json',
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
     * Azx id로 삭제 한다
     * Azx id로 삭제 한다.
     * @param azxId
     * @returns any OK
     * @throws ApiError
     */
    public static delete7(
        azxId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/admin/api/v1/azx/{azxId}',
            path: {
                'azxId': azxId,
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
     * Azx 등록
     * Azx 정보를 신규 등록한다.
     * @param requestBody
     * @returns number OK
     * @throws ApiError
     */
    public static save(
        requestBody: com_ever_edu_lms_azx_dto_req_AzxSaveReqDto,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1',
            body: requestBody,
            mediaType: 'application/json',
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
     * Azx 목록 조회
     * Azx 목록을 조회한다.
     * @param param
     * @param page Zero-based page index (0..N)
     * @param size The size of the page to be returned
     * @param sort Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @returns org_springframework_data_domain_PageCom_ever_edu_lms_azx_dto_res_AzxListAdminResDto OK
     * @throws ApiError
     */
    public static findAll1(
        param: com_ever_edu_lms_azx_dto_req_AzxListFilterReqDto,
        page?: number,
        size: number = 20,
        sort?: Array<string>,
    ): CancelablePromise<org_springframework_data_domain_PageCom_ever_edu_lms_azx_dto_res_AzxListAdminResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/azxs',
            query: {
                'page': page,
                'size': size,
                'sort': sort,
                'param': param,
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
}
