/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_tenant_dto_req_TenantCreateReqDto } from '../models/com_ever_edu_pms_tenant_dto_req_TenantCreateReqDto';
import type { com_ever_edu_pms_tenant_dto_req_TenantSearchReqDto$SearchByAdmin } from '../models/com_ever_edu_pms_tenant_dto_req_TenantSearchReqDto$SearchByAdmin';
import type { com_ever_edu_pms_tenant_dto_req_TenantUpdateReqDto } from '../models/com_ever_edu_pms_tenant_dto_req_TenantUpdateReqDto';
import type { com_ever_edu_pms_tenant_dto_res_TenantResDto$DetailOnAdmin } from '../models/com_ever_edu_pms_tenant_dto_res_TenantResDto$DetailOnAdmin';
import type { org_springdoc_core_converters_models_Pageable } from '../models/org_springdoc_core_converters_models_Pageable';
import type { org_springframework_data_domain_PageCom_ever_edu_pms_tenant_dto_res_TenantResDto$ListOnAdmin } from '../models/org_springframework_data_domain_PageCom_ever_edu_pms_tenant_dto_res_TenantResDto$ListOnAdmin';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TenantControllerService {
    /**
     * @param tenantId
     * @returns com_ever_edu_pms_tenant_dto_res_TenantResDto$DetailOnAdmin OK
     * @throws ApiError
     */
    public static getTenant(
        tenantId: number,
    ): CancelablePromise<com_ever_edu_pms_tenant_dto_res_TenantResDto$DetailOnAdmin> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/tenants/{tenantId}',
            path: {
                'tenantId': tenantId,
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
     * @param tenantId
     * @param requestBody
     * @returns com_ever_edu_pms_tenant_dto_res_TenantResDto$DetailOnAdmin OK
     * @throws ApiError
     */
    public static updateTenant(
        tenantId: number,
        requestBody: com_ever_edu_pms_tenant_dto_req_TenantUpdateReqDto,
    ): CancelablePromise<com_ever_edu_pms_tenant_dto_res_TenantResDto$DetailOnAdmin> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/tenants/{tenantId}',
            path: {
                'tenantId': tenantId,
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
     * @param tenantId
     * @returns any OK
     * @throws ApiError
     */
    public static deleteTenant(
        tenantId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/admin/api/v1/tenants/{tenantId}',
            path: {
                'tenantId': tenantId,
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
     * @param pageable
     * @param searchReqDto
     * @returns org_springframework_data_domain_PageCom_ever_edu_pms_tenant_dto_res_TenantResDto$ListOnAdmin OK
     * @throws ApiError
     */
    public static getTenantList(
        pageable: org_springdoc_core_converters_models_Pageable,
        searchReqDto: com_ever_edu_pms_tenant_dto_req_TenantSearchReqDto$SearchByAdmin,
    ): CancelablePromise<org_springframework_data_domain_PageCom_ever_edu_pms_tenant_dto_res_TenantResDto$ListOnAdmin> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/tenants',
            query: {
                'pageable': pageable,
                'searchReqDto': searchReqDto,
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
     * @param requestBody
     * @returns com_ever_edu_pms_tenant_dto_res_TenantResDto$DetailOnAdmin OK
     * @throws ApiError
     */
    public static createTenant(
        requestBody: com_ever_edu_pms_tenant_dto_req_TenantCreateReqDto,
    ): CancelablePromise<com_ever_edu_pms_tenant_dto_res_TenantResDto$DetailOnAdmin> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/tenants',
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
}
