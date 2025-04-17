/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_global_dto_ResponseDtoCom_ever_edu_pms_authorization_dto_res_AuthorizationResDto$DetailOnAdminDto } from '../models/com_ever_edu_global_dto_ResponseDtoCom_ever_edu_pms_authorization_dto_res_AuthorizationResDto$DetailOnAdminDto';
import type { com_ever_edu_global_dto_ResponseDtoOrg_springframework_data_domain_PageCom_ever_edu_pms_authorization_dto_res_AuthorizationResDto$ListOnAdminDto } from '../models/com_ever_edu_global_dto_ResponseDtoOrg_springframework_data_domain_PageCom_ever_edu_pms_authorization_dto_res_AuthorizationResDto$ListOnAdminDto';
import type { com_ever_edu_pms_authorization_dto_req_AuthorizationCreateDto } from '../models/com_ever_edu_pms_authorization_dto_req_AuthorizationCreateDto';
import type { com_ever_edu_pms_authorization_dto_req_AuthorizationUpdateDto } from '../models/com_ever_edu_pms_authorization_dto_req_AuthorizationUpdateDto';
import type { com_ever_edu_pms_authorization_dto_req_SearchDto } from '../models/com_ever_edu_pms_authorization_dto_req_SearchDto';
import type { org_springdoc_core_converters_models_Pageable } from '../models/org_springdoc_core_converters_models_Pageable';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthorizationAdminControllerService {
    /**
     * 권한 단건 조회
     * 권한 상세를 조회한다.
     * @param authorizationNo
     * @returns com_ever_edu_global_dto_ResponseDtoCom_ever_edu_pms_authorization_dto_res_AuthorizationResDto$DetailOnAdminDto OK
     * @throws ApiError
     */
    public static findById5(
        authorizationNo: number,
    ): CancelablePromise<com_ever_edu_global_dto_ResponseDtoCom_ever_edu_pms_authorization_dto_res_AuthorizationResDto$DetailOnAdminDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/authorizations/{authorizationNo}',
            path: {
                'authorizationNo': authorizationNo,
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
     * 권한 수정
     * 권한을 수정한다.
     * @param authorizationNo
     * @param requestBody
     * @returns com_ever_edu_global_dto_ResponseDtoCom_ever_edu_pms_authorization_dto_res_AuthorizationResDto$DetailOnAdminDto OK
     * @throws ApiError
     */
    public static update4(
        authorizationNo: number,
        requestBody: com_ever_edu_pms_authorization_dto_req_AuthorizationUpdateDto,
    ): CancelablePromise<com_ever_edu_global_dto_ResponseDtoCom_ever_edu_pms_authorization_dto_res_AuthorizationResDto$DetailOnAdminDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/authorizations/{authorizationNo}',
            path: {
                'authorizationNo': authorizationNo,
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
     * 권한 삭제
     * 권한을 삭제한다.
     * @param authorizationNo
     * @returns void
     * @throws ApiError
     */
    public static delete5(
        authorizationNo: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/admin/api/v1/authorizations/{authorizationNo}',
            path: {
                'authorizationNo': authorizationNo,
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
     * 권한 목록 조회
     * 권한 목록을 조회한다.
     * @param searchDto
     * @param pageable
     * @returns com_ever_edu_global_dto_ResponseDtoOrg_springframework_data_domain_PageCom_ever_edu_pms_authorization_dto_res_AuthorizationResDto$ListOnAdminDto OK
     * @throws ApiError
     */
    public static findPage8(
        searchDto: com_ever_edu_pms_authorization_dto_req_SearchDto,
        pageable: org_springdoc_core_converters_models_Pageable,
    ): CancelablePromise<com_ever_edu_global_dto_ResponseDtoOrg_springframework_data_domain_PageCom_ever_edu_pms_authorization_dto_res_AuthorizationResDto$ListOnAdminDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/authorizations',
            query: {
                'searchDto': searchDto,
                'pageable': pageable,
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
     * 권한 등록
     * 권한을 등록한다.
     * @param requestBody
     * @returns com_ever_edu_global_dto_ResponseDtoCom_ever_edu_pms_authorization_dto_res_AuthorizationResDto$DetailOnAdminDto Created
     * @throws ApiError
     */
    public static create(
        requestBody: com_ever_edu_pms_authorization_dto_req_AuthorizationCreateDto,
    ): CancelablePromise<com_ever_edu_global_dto_ResponseDtoCom_ever_edu_pms_authorization_dto_res_AuthorizationResDto$DetailOnAdminDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/authorizations',
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
     * @returns number OK
     * @throws ApiError
     */
    public static findNextSortSeq(): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/authorizations/sort-seq/next',
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
