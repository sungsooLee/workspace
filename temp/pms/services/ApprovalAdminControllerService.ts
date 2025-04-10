/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_global_dto_ResponseDtoJava_lang_Long } from '../models/com_ever_edu_global_dto_ResponseDtoJava_lang_Long';
import type { com_ever_edu_pms_approval_dto_req_ApprovalMakeDto } from '../models/com_ever_edu_pms_approval_dto_req_ApprovalMakeDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ApprovalAdminControllerService {
    /**
     * approval
     * approval
     * @param approvalMakeDto
     * @returns com_ever_edu_global_dto_ResponseDtoJava_lang_Long OK
     * @throws ApiError
     */
    public static makeApprovalLine(
        approvalMakeDto: com_ever_edu_pms_approval_dto_req_ApprovalMakeDto,
    ): CancelablePromise<com_ever_edu_global_dto_ResponseDtoJava_lang_Long> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/approval',
            query: {
                'approvalMakeDto': approvalMakeDto,
            },
        });
    }
}
