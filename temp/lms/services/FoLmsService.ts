/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_lms_tag_dto_res_TagResDto } from '../models/com_ever_edu_lms_tag_dto_res_TagResDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class FoLmsService {
    /**
     * [FO] 태그 조회
     * 사전/연관 과정 목록의 태그를 조회한다.
     * @param courseId
     * @returns com_ever_edu_lms_tag_dto_res_TagResDto OK
     * @throws ApiError
     */
    public static findAllByCourseId(
        courseId: number,
    ): CancelablePromise<Array<com_ever_edu_lms_tag_dto_res_TagResDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/api/v1/tags/course/{courseId}',
            path: {
                'courseId': courseId,
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
