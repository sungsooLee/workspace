/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_tenant_dto_res_TenantResDto$ListOnAdmin } from '../models/com_ever_edu_pms_tenant_dto_res_TenantResDto$ListOnAdmin';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class InternalInternalService {
    /**
     * 테넌트 목록 조회 (역활 기준)
     * 테넌트 목록 조회 (역활 기준)
     * @param roleId
     * @returns com_ever_edu_pms_tenant_dto_res_TenantResDto$ListOnAdmin OK
     * @throws ApiError
     */
    public static getTenantListByRole(
        roleId: number,
    ): CancelablePromise<Array<com_ever_edu_pms_tenant_dto_res_TenantResDto$ListOnAdmin>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/internal/api/v1/tenants/role/{roleId}',
            path: {
                'roleId': roleId,
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
