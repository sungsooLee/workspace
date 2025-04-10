/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_tenant_dto_TenantCreateRequest } from '../models/com_ever_edu_pms_tenant_dto_TenantCreateRequest';
import type { com_ever_edu_pms_tenant_dto_TenantResponse } from '../models/com_ever_edu_pms_tenant_dto_TenantResponse';
import type { com_ever_edu_pms_tenant_dto_TenantUpdateRequest } from '../models/com_ever_edu_pms_tenant_dto_TenantUpdateRequest';
import type { org_springdoc_core_converters_models_Pageable } from '../models/org_springdoc_core_converters_models_Pageable';
import type { org_springframework_data_domain_PageCom_ever_edu_pms_tenant_dto_TenantResponse } from '../models/org_springframework_data_domain_PageCom_ever_edu_pms_tenant_dto_TenantResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TenantControllerService {
    /**
     * @param tenantId
     * @returns com_ever_edu_pms_tenant_dto_TenantResponse OK
     * @throws ApiError
     */
    public static getTenant(
        tenantId: number,
    ): CancelablePromise<com_ever_edu_pms_tenant_dto_TenantResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/tenants/{tenantId}',
            path: {
                'tenantId': tenantId,
            },
        });
    }
    /**
     * @param tenantId
     * @param requestBody
     * @returns com_ever_edu_pms_tenant_dto_TenantResponse OK
     * @throws ApiError
     */
    public static updateTenant(
        tenantId: number,
        requestBody: com_ever_edu_pms_tenant_dto_TenantUpdateRequest,
    ): CancelablePromise<com_ever_edu_pms_tenant_dto_TenantResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/tenants/{tenantId}',
            path: {
                'tenantId': tenantId,
            },
            body: requestBody,
            mediaType: 'application/json',
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
        });
    }
    /**
     * @param pageable
     * @returns org_springframework_data_domain_PageCom_ever_edu_pms_tenant_dto_TenantResponse OK
     * @throws ApiError
     */
    public static getTenantList(
        pageable: org_springdoc_core_converters_models_Pageable,
    ): CancelablePromise<org_springframework_data_domain_PageCom_ever_edu_pms_tenant_dto_TenantResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/tenants',
            query: {
                'pageable': pageable,
            },
        });
    }
    /**
     * @param requestBody
     * @returns com_ever_edu_pms_tenant_dto_TenantResponse OK
     * @throws ApiError
     */
    public static createTenant(
        requestBody: com_ever_edu_pms_tenant_dto_TenantCreateRequest,
    ): CancelablePromise<com_ever_edu_pms_tenant_dto_TenantResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/tenants',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
