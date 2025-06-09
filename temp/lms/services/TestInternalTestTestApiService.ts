/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_xternal_content_dto_ScormContentDto } from '../models/com_ever_edu_xternal_content_dto_ScormContentDto';
import type { com_ever_edu_xternal_content_dto_ScormResourceDto } from '../models/com_ever_edu_xternal_content_dto_ScormResourceDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TestInternalTestTestApiService {
    /**
     * SCORM 정보조회
     * SCORM 정보를 요청한다.
     * @param contentUuid SCORM 학습지원 UUID
     * @returns com_ever_edu_xternal_content_dto_ScormContentDto OK
     * @throws ApiError
     */
    public static getScormInfo(
        contentUuid: string,
    ): CancelablePromise<com_ever_edu_xternal_content_dto_ScormContentDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/test/api/v1/internal/scorm',
            query: {
                'contentUuid': contentUuid,
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
     * SCORM 학습자원 정보조회
     * SCORM 학습자원  정보를 요청한다.
     * @param contentUuid SCORM 학습지원 UUID
     * @returns com_ever_edu_xternal_content_dto_ScormResourceDto OK
     * @throws ApiError
     */
    public static getScormResourceInfo(
        contentUuid: string,
    ): CancelablePromise<com_ever_edu_xternal_content_dto_ScormResourceDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/test/api/v1/internal/scorm/resource',
            query: {
                'contentUuid': contentUuid,
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
