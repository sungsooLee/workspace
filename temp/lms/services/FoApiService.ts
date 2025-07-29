/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_lms_pkg_dto_res_PkgResDto } from '../models/com_ever_edu_lms_pkg_dto_res_PkgResDto';
import type { com_ever_edu_lms_pkg_dto_res_PkgTreeDto } from '../models/com_ever_edu_lms_pkg_dto_res_PkgTreeDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class FoApiService {
    /**
     * 패키지 구조 조회
     * 패키지의 트리 구조를 조회한다.
     * @param packageId
     * @returns com_ever_edu_lms_pkg_dto_res_PkgTreeDto OK
     * @throws ApiError
     */
    public static getPkgTree(
        packageId: number,
    ): CancelablePromise<com_ever_edu_lms_pkg_dto_res_PkgTreeDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/api/v1/pkg/{packageId}/tree',
            path: {
                'packageId': packageId,
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
     * 패키지 조회
     * 패키지 정보를 조회한다.
     * @param id
     * @returns com_ever_edu_lms_pkg_dto_res_PkgResDto OK
     * @throws ApiError
     */
    public static getPkg(
        id: number,
    ): CancelablePromise<com_ever_edu_lms_pkg_dto_res_PkgResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/api/v1/pkg/{id}',
            path: {
                'id': id,
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
