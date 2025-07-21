/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_lms_blackwhitecall_dto_req_BlackAndWhiteUpsertReqDto } from '../models/com_ever_edu_lms_blackwhitecall_dto_req_BlackAndWhiteUpsertReqDto';
import type { com_ever_edu_lms_blackwhitecall_dto_res_BlackAndWhiteResDto } from '../models/com_ever_edu_lms_blackwhitecall_dto_res_BlackAndWhiteResDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class InternalDummyInternalApiService {
    /**
     * 블랙/화이트 등록 테스트용
     * 블랙/화이트 목록을 mapping한다.
     * @param requestBody
     * @returns com_ever_edu_lms_blackwhitecall_dto_res_BlackAndWhiteResDto OK
     * @throws ApiError
     */
    public static mappingBlackAndWhite1(
        requestBody: com_ever_edu_lms_blackwhitecall_dto_req_BlackAndWhiteUpsertReqDto,
    ): CancelablePromise<com_ever_edu_lms_blackwhitecall_dto_res_BlackAndWhiteResDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/dummy/black-and-white/mapping',
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
     * 블랙/화이트 그룹 상세 정보를 조회
     * 블랙/화이트 그룹 상세 정보를 조회한다.
     * @param blackAndWhiteGroupMappingType
     * @param mappingId
     * @returns com_ever_edu_lms_blackwhitecall_dto_res_BlackAndWhiteResDto OK
     * @throws ApiError
     */
    public static selectBlackAndWhite1(
        blackAndWhiteGroupMappingType: 'COURSE' | 'SEQUENCE' | 'CATEGORY' | 'CHANNEL' | 'ROLE' | 'COMPANY_RESTRICTION',
        mappingId: number,
    ): CancelablePromise<com_ever_edu_lms_blackwhitecall_dto_res_BlackAndWhiteResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/dummy/black-and-white/{blackAndWhiteGroupMappingType}/{mappingId}',
            path: {
                'blackAndWhiteGroupMappingType': blackAndWhiteGroupMappingType,
                'mappingId': mappingId,
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
