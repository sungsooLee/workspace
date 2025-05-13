/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class InternalApiService {
    /**
     * 차수의 교육담당자 찾기
     * 교육 담당자를 조회한다.
     * @param enrollId
     * @returns number OK
     * @throws ApiError
     */
    public static findCourseCoordinator(
        enrollId: number,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/internal/api/v1/enroll/{enrollId}',
            path: {
                'enrollId': enrollId,
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
     * over
     * over
     * @returns number OK
     * @throws ApiError
     */
    public static over(): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/internal/api/v1/enroll/over',
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
