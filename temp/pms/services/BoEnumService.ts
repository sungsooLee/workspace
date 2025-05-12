/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_enums_EnumValue } from '../models/com_ever_edu_enums_EnumValue';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BoEnumService {
    /**
     * 공통 코드(enum) 목록 조회
     * 등록된 모든 enum의 이름을 반환한다.
     * @returns string OK
     * @throws ApiError
     */
    public static findAllEnums2(): CancelablePromise<Array<string>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/enum',
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
     * 공통 Enum코드 다건 조회(셀렉트박스 노출용)
     * 존재하는 enum code를 찾아 반환한다.
     * @param enumNames
     * @returns com_ever_edu_enums_EnumValue OK
     * @throws ApiError
     */
    public static getEnumCodeList(
        enumNames: Array<string>,
    ): CancelablePromise<Array<Record<string, Array<com_ever_edu_enums_EnumValue>>>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/enum/{enumNames}',
            path: {
                'enumNames': enumNames,
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
