/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_cms_scorm_dto_res_ScormResourceResDto } from '../models/com_ever_edu_cms_scorm_dto_res_ScormResourceResDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class FoScormService {
    /**
     * SCORM 콘텐츠 리소스 조회
     * SCORM 콘텐츠 리소스를 조회한다.
     * @param contentUuid SCORM 콘텐츠 UUID
     * @returns com_ever_edu_cms_scorm_dto_res_ScormResourceResDto OK
     * @throws ApiError
     */
    public static getContentResource(
        contentUuid: string,
    ): CancelablePromise<com_ever_edu_cms_scorm_dto_res_ScormResourceResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/api/v1/scorm/{contentUuid}/resource',
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
