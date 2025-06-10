/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_lms_enroll_dto_event_EnrollQueueEvent } from '../models/com_ever_edu_lms_enroll_dto_event_EnrollQueueEvent';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class InternalApiService {
    /**
     * 카프카 쓰지 않고 바로 입과
     * 바로 입과 테스트
     * @param requestBody
     * @returns number OK
     * @throws ApiError
     */
    public static enrollTest(
        requestBody: com_ever_edu_lms_enroll_dto_event_EnrollQueueEvent,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/internal/api/v1/enroll-no-kafka-test',
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
}
