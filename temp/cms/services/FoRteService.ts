/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_cms_exam_dto_req_ExamRteInitializeReqDto } from '../models/com_ever_edu_cms_exam_dto_req_ExamRteInitializeReqDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class FoRteService {
    /**
     * SCORM RTE Initialize API
     * SCORM RTE 초기화 API, SCO가 Launch될 때 호출한다.
     * @param requestBody
     * @param previewMode 미리보기모드 여부
     * @returns any OK
     * @throws ApiError
     */
    public static initialize1(
        requestBody: com_ever_edu_cms_exam_dto_req_ExamRteInitializeReqDto,
        previewMode?: any,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/api/v1/exam/rte/initialize',
            query: {
                'previewMode': previewMode,
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
}
