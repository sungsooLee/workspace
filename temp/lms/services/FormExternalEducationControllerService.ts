/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_lms_form2_dto_req_FormExternalEducationRequestDto } from '../models/com_ever_edu_lms_form2_dto_req_FormExternalEducationRequestDto';
import type { com_ever_edu_lms_form2_dto_res_FormExternalEducationDetailResponseDto } from '../models/com_ever_edu_lms_form2_dto_res_FormExternalEducationDetailResponseDto';
import type { org_springdoc_core_converters_models_Pageable } from '../models/org_springdoc_core_converters_models_Pageable';
import type { org_springframework_data_domain_PageCom_ever_edu_lms_form2_dto_res_FormExternalEducationListResponseDto } from '../models/org_springframework_data_domain_PageCom_ever_edu_lms_form2_dto_res_FormExternalEducationListResponseDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class FormExternalEducationControllerService {
    /**
     * @param formId
     * @param xTenantId
     * @returns com_ever_edu_lms_form2_dto_res_FormExternalEducationDetailResponseDto OK
     * @throws ApiError
     */
    public static getFormDetail(
        formId: number,
        xTenantId: number,
    ): CancelablePromise<com_ever_edu_lms_form2_dto_res_FormExternalEducationDetailResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/form2/external-education/{formId}',
            path: {
                'formId': formId,
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
     * @param formId
     * @param xTenantId
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static updateForm(
        formId: number,
        xTenantId: number,
        requestBody: com_ever_edu_lms_form2_dto_req_FormExternalEducationRequestDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/form2/external-education/{formId}',
            path: {
                'formId': formId,
            },
            headers: {
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
     * @param formId
     * @param xTenantId
     * @returns any OK
     * @throws ApiError
     */
    public static deleteForm(
        formId: number,
        xTenantId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/form2/external-education/{formId}',
            path: {
                'formId': formId,
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
     * @param xTenantId
     * @param pageable
     * @param searchKeyword
     * @returns org_springframework_data_domain_PageCom_ever_edu_lms_form2_dto_res_FormExternalEducationListResponseDto OK
     * @throws ApiError
     */
    public static getFormList(
        xTenantId: number,
        pageable: org_springdoc_core_converters_models_Pageable,
        searchKeyword?: string,
    ): CancelablePromise<org_springframework_data_domain_PageCom_ever_edu_lms_form2_dto_res_FormExternalEducationListResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/form2/external-education',
            headers: {
                'X-Tenant-Id': xTenantId,
            },
            query: {
                'searchKeyword': searchKeyword,
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
     * @param xTenantId
     * @param requestBody
     * @returns number OK
     * @throws ApiError
     */
    public static createForm(
        xTenantId: number,
        requestBody: com_ever_edu_lms_form2_dto_req_FormExternalEducationRequestDto,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/form2/external-education',
            headers: {
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
     * @param formId
     * @param xTenantId
     * @param status
     * @returns any OK
     * @throws ApiError
     */
    public static updateFormStatus(
        formId: number,
        xTenantId: number,
        status: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v1/form2/external-education/{formId}/status',
            path: {
                'formId': formId,
            },
            headers: {
                'X-Tenant-Id': xTenantId,
            },
            query: {
                'status': status,
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
