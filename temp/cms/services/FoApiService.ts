/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_cms_image_dto_req_ImageLearningSaveReqDto } from '../models/com_ever_edu_cms_image_dto_req_ImageLearningSaveReqDto';
import type { com_ever_edu_cms_image_dto_res_ImageResourceListResDto } from '../models/com_ever_edu_cms_image_dto_res_ImageResourceListResDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class FoApiService {
    /**
     * 이미지 학습 이력을 쌓는다
     * 이미지 학습 이력을 쌓는다
     * @param requestBody
     * @returns number OK
     * @throws ApiError
     */
    public static saveLearningLog(
        requestBody: com_ever_edu_cms_image_dto_req_ImageLearningSaveReqDto,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/api/v1/image/learning',
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
     * 이미지 콘텐츠 리소스 조회
     * 기타 콘텐츠 리소스를 조회한다.
     * @param contentUuid 기타 콘텐츠 UUID
     * @returns com_ever_edu_cms_image_dto_res_ImageResourceListResDto OK
     * @throws ApiError
     */
    public static getContentResource2(
        contentUuid: string,
    ): CancelablePromise<com_ever_edu_cms_image_dto_res_ImageResourceListResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/api/v1/image/{contentUuid}/resource',
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
