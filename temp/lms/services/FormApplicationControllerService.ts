/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_lms_form2_dto_req_FormApplicationRequestDto } from '../models/com_ever_edu_lms_form2_dto_req_FormApplicationRequestDto';
import type { org_springdoc_core_converters_models_Pageable } from '../models/org_springdoc_core_converters_models_Pageable';
import type { org_springframework_data_domain_PageJava_lang_Object } from '../models/org_springframework_data_domain_PageJava_lang_Object';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class FormApplicationControllerService {
    /**
     * @param xUserUuid
     * @param xTenantId
     * @param requestBody
     * @returns number OK
     * @throws ApiError
     */
    public static submitApplication(
        xUserUuid: string,
        xTenantId: number,
        requestBody: com_ever_edu_lms_form2_dto_req_FormApplicationRequestDto,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/form2/application',
            headers: {
                'X-User-Uuid': xUserUuid,
                'X-Tenant-Id': xTenantId,
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
     * @param applicationId
     * @param status
     * @param xUserUuid
     * @param xTenantId
     * @param comment
     * @returns any OK
     * @throws ApiError
     */
    public static updateApplicationStatus(
        applicationId: number,
        status: string,
        xUserUuid: string,
        xTenantId: number,
        comment?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v1/form2/application/{applicationId}/status',
            path: {
                'applicationId': applicationId,
            },
            headers: {
                'X-User-Uuid': xUserUuid,
                'X-Tenant-Id': xTenantId,
            },
            query: {
                'status': status,
                'comment': comment,
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
     * @param applicationId
     * @param xTenantId
     * @returns any OK
     * @throws ApiError
     */
    public static getApplicationDetail(
        applicationId: number,
        xTenantId: number,
    ): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/form2/application/{applicationId}',
            path: {
                'applicationId': applicationId,
            },
            headers: {
                'X-Tenant-Id': xTenantId,
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
     * @param applicationId
     * @param xTenantId
     * @returns any OK
     * @throws ApiError
     */
    public static deleteApplication(
        applicationId: number,
        xTenantId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/form2/application/{applicationId}',
            path: {
                'applicationId': applicationId,
            },
            headers: {
                'X-Tenant-Id': xTenantId,
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
     * @param xUserUuid
     * @param xTenantId
     * @param pageable
     * @returns org_springframework_data_domain_PageJava_lang_Object OK
     * @throws ApiError
     */
    public static getMyApplicationList(
        xUserUuid: string,
        xTenantId: number,
        pageable: org_springdoc_core_converters_models_Pageable,
    ): CancelablePromise<org_springframework_data_domain_PageJava_lang_Object> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/form2/application/my',
            headers: {
                'X-User-Uuid': xUserUuid,
                'X-Tenant-Id': xTenantId,
            },
            query: {
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
     * @param formId
     * @param xTenantId
     * @param pageable
     * @param searchKeyword
     * @param status
     * @returns org_springframework_data_domain_PageJava_lang_Object OK
     * @throws ApiError
     */
    public static getApplicationList(
        formId: number,
        xTenantId: number,
        pageable: org_springdoc_core_converters_models_Pageable,
        searchKeyword?: string,
        status?: string,
    ): CancelablePromise<org_springframework_data_domain_PageJava_lang_Object> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/form2/application/admin',
            headers: {
                'X-Tenant-Id': xTenantId,
            },
            query: {
                'formId': formId,
                'searchKeyword': searchKeyword,
                'status': status,
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
}
