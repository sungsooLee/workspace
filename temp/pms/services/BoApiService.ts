/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_api_dto_req_ApiDnDRequestDto } from '../models/com_ever_edu_pms_api_dto_req_ApiDnDRequestDto';
import type { com_ever_edu_pms_api_dto_req_ApiSaveReqDto } from '../models/com_ever_edu_pms_api_dto_req_ApiSaveReqDto';
import type { com_ever_edu_pms_api_dto_res_ApiResDto$DetailOnAdmin } from '../models/com_ever_edu_pms_api_dto_res_ApiResDto$DetailOnAdmin';
import type { com_ever_edu_pms_api_dto_res_ApiTreeDto } from '../models/com_ever_edu_pms_api_dto_res_ApiTreeDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BoApiService {
    /**
     * Api 단일 조회
     * Api 단일 조회
     * @param apiUuid
     * @returns com_ever_edu_pms_api_dto_res_ApiResDto$DetailOnAdmin OK
     * @throws ApiError
     */
    public static getApi(
        apiUuid: string,
    ): CancelablePromise<com_ever_edu_pms_api_dto_res_ApiResDto$DetailOnAdmin> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/apis/{apiUuid}',
            path: {
                'apiUuid': apiUuid,
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
     * Api 수정
     * Api 수정
     * @param apiUuid
     * @param requestBody
     * @returns com_ever_edu_pms_api_dto_res_ApiResDto$DetailOnAdmin OK
     * @throws ApiError
     */
    public static updateApi(
        apiUuid: string,
        requestBody: com_ever_edu_pms_api_dto_req_ApiSaveReqDto,
    ): CancelablePromise<com_ever_edu_pms_api_dto_res_ApiResDto$DetailOnAdmin> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/apis/{apiUuid}',
            path: {
                'apiUuid': apiUuid,
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
     * Api 삭제
     * Api 삭제
     * @param apiUuid
     * @returns any OK
     * @throws ApiError
     */
    public static deleteApi(
        apiUuid: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/admin/api/v1/apis/{apiUuid}',
            path: {
                'apiUuid': apiUuid,
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
     * Api 등록
     * Api 등록
     * @param requestBody
     * @returns com_ever_edu_pms_api_dto_res_ApiResDto$DetailOnAdmin OK
     * @throws ApiError
     */
    public static createApi(
        requestBody: com_ever_edu_pms_api_dto_req_ApiSaveReqDto,
    ): CancelablePromise<com_ever_edu_pms_api_dto_res_ApiResDto$DetailOnAdmin> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/apis',
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
     * Api 순서변경
     * Api 순서변경
     * @param apiUuid
     * @param requestBody
     * @returns string OK
     * @throws ApiError
     */
    public static updateMenuDnD1(
        apiUuid: string,
        requestBody: com_ever_edu_pms_api_dto_req_ApiDnDRequestDto,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/apis/{apiUuid}/dnd',
            path: {
                'apiUuid': apiUuid,
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
     * api 목록 트리 조회
     * api 목록을 트리구조로 조회한다.
     * @param apiScopeCode
     * @returns com_ever_edu_pms_api_dto_res_ApiTreeDto OK
     * @throws ApiError
     */
    public static getApiList(
        apiScopeCode?: 'FO' | 'BO',
    ): CancelablePromise<com_ever_edu_pms_api_dto_res_ApiTreeDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/apis/tree',
            query: {
                'apiScopeCode': apiScopeCode,
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
