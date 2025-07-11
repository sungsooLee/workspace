/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_cms_content_dto_res_ContentResDto } from '../models/com_ever_edu_cms_content_dto_res_ContentResDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class InternalInternalApiService {
    /**
     * 교육자원 > 학습자원 관리 > 학습자원 조회 > 나의 학습 자원 > 콘텐츠 상세
     * 콘텐츠 단건을 상세 페이지를 uuid를 통해 상세 조회한다.
     * @param contentUuid Content uuid
     * @returns com_ever_edu_cms_content_dto_res_ContentResDto OK
     * @throws ApiError
     */
    public static findByContentUuid1(
        contentUuid: string,
    ): CancelablePromise<com_ever_edu_cms_content_dto_res_ContentResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/internal/api/v1/content/{contentUuid}',
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
    /**
     * 콘텐츠 사용 가능 상태 변경 배치 API - Internal API
     * 콘텐츠 사용 가능 상태를  일괄 변경한다.
     * @returns any OK
     * @throws ApiError
     */
    public static batchEnableStatusChange(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/internal/api/v1/content/batch/status',
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
