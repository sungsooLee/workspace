/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_cms_html5_dto_event_Html5ProcessingQueue } from '../models/com_ever_edu_cms_html5_dto_event_Html5ProcessingQueue';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TestHtml5TestTestApiService {
    /**
     * HTML5 동영상 업로드 파일 처리(사용금지 - 임시 테스트용)
     * HTML5 동영상 업로드 퍼일 처리(사용금지 - 임시 테스트용)
     * @param requestBody
     * @returns string OK
     * @throws ApiError
     */
    public static startProcessing1(
        requestBody: com_ever_edu_cms_html5_dto_event_Html5ProcessingQueue,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/test/api/v1/html5/processing',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                404: `Not Found`,
                405: `Method Not Allowed`,
                422: `Unprocessable Entity`,
                500: `Internal Server Error`,
            },
        });
    }
}
