/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_lms_blackwhite_dto_req_InternalBlackAndWhiteUpsertReqDto } from '../models/com_ever_edu_lms_blackwhite_dto_req_InternalBlackAndWhiteUpsertReqDto';
import type { com_ever_edu_lms_blackwhite_dto_res_InternalBlackAndWhiteResDto } from '../models/com_ever_edu_lms_blackwhite_dto_res_InternalBlackAndWhiteResDto';
import type { com_ever_edu_lms_course_dto_res_CourseInternalResDto } from '../models/com_ever_edu_lms_course_dto_res_CourseInternalResDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BoInternalApiService {
    /**
     * 블랙/화이트 목록을 mapping한다.
     * 블랙/화이트 목록을 mapping한다.
     * @param requestBody
     * @returns com_ever_edu_lms_blackwhite_dto_res_InternalBlackAndWhiteResDto OK
     * @throws ApiError
     */
    public static mappingBlackAndWhite(
        requestBody: com_ever_edu_lms_blackwhite_dto_req_InternalBlackAndWhiteUpsertReqDto,
    ): CancelablePromise<com_ever_edu_lms_blackwhite_dto_res_InternalBlackAndWhiteResDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/internal/api/v1/black-and-white/mapping',
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
     * Simple 과정 정보 목록 조회 - Internal API
     * 간략한 과정 정보 목록을 조회한다.<BR>예를 들어 Module-CMS에서 커리큘럼ID 목록으로 과정 정보를 조회하기 위해 호출
     * @param channelUuid 채널 UUID
     * @param curriculumIds 커리큘럼ID를 ","로 연결하여 전달
     * @returns com_ever_edu_lms_course_dto_res_CourseInternalResDto OK
     * @throws ApiError
     */
    public static findMappingCourseByChannelIds(
        channelUuid: string,
        curriculumIds: string,
    ): CancelablePromise<Array<com_ever_edu_lms_course_dto_res_CourseInternalResDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/internal/api/v1/courses',
            query: {
                'channelUuid': channelUuid,
                'curriculumIds': curriculumIds,
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
     * 블랙/화이트 그룹 상세 정보를 조회
     * 블랙/화이트 그룹 상세 정보를 조회한다.
     * @param blackAndWhiteGroupMappingType
     * @param mappingId
     * @returns com_ever_edu_lms_blackwhite_dto_res_InternalBlackAndWhiteResDto OK
     * @throws ApiError
     */
    public static selectBlackAndWhite(
        blackAndWhiteGroupMappingType: 'COURSE' | 'SEQUENCE' | 'CATEGORY' | 'CHANNEL' | 'ROLE' | 'COMPANY_RESTRICTION',
        mappingId: number,
    ): CancelablePromise<com_ever_edu_lms_blackwhite_dto_res_InternalBlackAndWhiteResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/internal/api/v1/black-and-white/{blackAndWhiteGroupMappingType}/{mappingId}',
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
