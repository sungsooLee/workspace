/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_cms_html5_dto_req_Html5LearningSaveReqDto } from '../models/com_ever_edu_cms_html5_dto_req_Html5LearningSaveReqDto';
import type { com_ever_edu_cms_html5_dto_res_Html5LearningSaveResDto } from '../models/com_ever_edu_cms_html5_dto_res_Html5LearningSaveResDto';
import type { com_ever_edu_cms_html5_dto_res_Html5ResourceResDto } from '../models/com_ever_edu_cms_html5_dto_res_Html5ResourceResDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class FoHtml5ApiService {
    /**
     * HTML5 동영상 학습 이력 저장
     * HTML5 동영상 학습 이력을 저장한다
     * @param requestBody
     * @returns com_ever_edu_cms_html5_dto_res_Html5LearningSaveResDto OK
     * @throws ApiError
     */
    public static saveLearningLog2(
        requestBody: com_ever_edu_cms_html5_dto_req_Html5LearningSaveReqDto,
    ): CancelablePromise<com_ever_edu_cms_html5_dto_res_Html5LearningSaveResDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/api/v1/html5/learning',
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
     * HTML5 동영상 콘텐츠 리소스 조회
     * HTML5 동영상 콘텐츠 리소스를 조회한다.
     * @param contentUuid HTML5 콘텐츠 UUID
     * @returns com_ever_edu_cms_html5_dto_res_Html5ResourceResDto OK
     * @throws ApiError
     */
    public static getContentResource2(
        contentUuid: string,
    ): CancelablePromise<com_ever_edu_cms_html5_dto_res_Html5ResourceResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/api/v1/html5/{contentUuid}/resource',
            path: {
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
