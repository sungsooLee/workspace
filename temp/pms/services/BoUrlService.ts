/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_shorturl_dto_req_ShortUrlSaveReqDto$ShortUrlDto } from '../models/com_ever_edu_pms_shorturl_dto_req_ShortUrlSaveReqDto$ShortUrlDto';
import type { com_ever_edu_pms_shorturl_dto_req_ShortUrlSearchReqDto$SearchByAdmin } from '../models/com_ever_edu_pms_shorturl_dto_req_ShortUrlSearchReqDto$SearchByAdmin';
import type { com_ever_edu_pms_shorturl_dto_res_ShortUrlResDto$DetailOnAdmin } from '../models/com_ever_edu_pms_shorturl_dto_res_ShortUrlResDto$DetailOnAdmin';
import type { org_springdoc_core_converters_models_Pageable } from '../models/org_springdoc_core_converters_models_Pageable';
import type { org_springframework_data_domain_PageCom_ever_edu_pms_shorturl_dto_res_ShortUrlResDto$ListOnAdmin } from '../models/org_springframework_data_domain_PageCom_ever_edu_pms_shorturl_dto_res_ShortUrlResDto$ListOnAdmin';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BoUrlService {
    /**
     * 단축URL 단건 조회
     * 단축URL 단건 조회
     * @param shortUrlId
     * @returns com_ever_edu_pms_shorturl_dto_res_ShortUrlResDto$DetailOnAdmin OK
     * @throws ApiError
     */
    public static findById2(
        shortUrlId: number,
    ): CancelablePromise<com_ever_edu_pms_shorturl_dto_res_ShortUrlResDto$DetailOnAdmin> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/shortUrl/{shortUrlId}',
            path: {
                'shortUrlId': shortUrlId,
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
     * 단축URL 수정
     * 단축URL 수정
     * @param shortUrlId
     * @param requestBody
     * @returns com_ever_edu_pms_shorturl_dto_res_ShortUrlResDto$DetailOnAdmin OK
     * @throws ApiError
     */
    public static update2(
        shortUrlId: number,
        requestBody: com_ever_edu_pms_shorturl_dto_req_ShortUrlSaveReqDto$ShortUrlDto,
    ): CancelablePromise<com_ever_edu_pms_shorturl_dto_res_ShortUrlResDto$DetailOnAdmin> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/shortUrl/{shortUrlId}',
            path: {
                'shortUrlId': shortUrlId,
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
     * 단축URL 삭제
     * 단축URL를 삭제한다.
     * @param shortUrlId
     * @returns any OK
     * @throws ApiError
     */
    public static delete4(
        shortUrlId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/admin/api/v1/shortUrl/{shortUrlId}',
            path: {
                'shortUrlId': shortUrlId,
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
     * 단축URL 목록 조회
     * 단축URL 목록 조회
     * @param pageable
     * @param params
     * @returns org_springframework_data_domain_PageCom_ever_edu_pms_shorturl_dto_res_ShortUrlResDto$ListOnAdmin OK
     * @throws ApiError
     */
    public static findPage5(
        pageable: org_springdoc_core_converters_models_Pageable,
        params: com_ever_edu_pms_shorturl_dto_req_ShortUrlSearchReqDto$SearchByAdmin,
    ): CancelablePromise<org_springframework_data_domain_PageCom_ever_edu_pms_shorturl_dto_res_ShortUrlResDto$ListOnAdmin> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/shortUrl',
            query: {
                'pageable': pageable,
                'params': params,
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
     * 단축URL 등록
     * 신규 단축URL를 등록한다.
     * @param requestBody
     * @returns com_ever_edu_pms_shorturl_dto_res_ShortUrlResDto$DetailOnAdmin Created
     * @throws ApiError
     */
    public static save3(
        requestBody: com_ever_edu_pms_shorturl_dto_req_ShortUrlSaveReqDto$ShortUrlDto,
    ): CancelablePromise<com_ever_edu_pms_shorturl_dto_res_ShortUrlResDto$DetailOnAdmin> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/shortUrl',
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
     * 단축코드로 URL 조회
     * 단축코드로 URL 조회
     * @param shortCode
     * @returns void
     * @throws ApiError
     */
    public static redirect(
        shortCode: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/shortUrl/code/{shortCode}',
            path: {
                'shortCode': shortCode,
            },
            errors: {
                302: `Found`,
                400: `Bad Request`,
                401: `Unauthorized`,
                404: `Not Found`,
                422: `Unprocessable Entity`,
                500: `Internal Server Error`,
            },
        });
    }
}
