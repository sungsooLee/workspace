/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_lms_course_dto_res_CourseInternalResDto } from '../models/com_ever_edu_lms_course_dto_res_CourseInternalResDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BoInternalApiService {
    /**
     * Simple 과정 정보 목록 조회 - Internal API
     * 간략한 과정 정보 목록을 조회한다.<BR>예를 들어 Module-CMS에서 커리큘럼ID 목록으로 과정 정보를 조회하기 위해 호출
     * @param curriculumIds 커리큘럼ID를 ","로 연결하여 전달
     * @returns com_ever_edu_lms_course_dto_res_CourseInternalResDto OK
     * @throws ApiError
     */
    public static findMappingCourseByChannelIds(
        curriculumIds: string,
    ): CancelablePromise<Array<com_ever_edu_lms_course_dto_res_CourseInternalResDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/internal/api/v1/courses',
            query: {
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
}
