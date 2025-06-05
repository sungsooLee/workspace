/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_enums_EnumValue } from '../models/com_ever_edu_enums_EnumValue';
import type { com_ever_edu_pms_common_cd_dto_res_EnumSyncResDto } from '../models/com_ever_edu_pms_common_cd_dto_res_EnumSyncResDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BoEnumService {
    /**
     * 플랫폼관리 > 시스템 공통코드 관리 > 단건 다국어 생성
     * 해당 enum 데이터를 다국어테이블에 저장한다.
     * @param cdGroupId
     * @param cdId
     * @returns any OK
     * @throws ApiError
     */
    public static saveEnumCode(
        cdGroupId: string,
        cdId: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/enum/{cdGroupId}/{cdId}/multilingual',
            path: {
                'cdGroupId': cdGroupId,
                'cdId': cdId,
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
     * 플랫폼관리 > 시스템 공통코드 관리 > 전체 Enum Sync 생성/수정/삭제
     * enum 전체를 다국어테이블과 비교해서 저장,수정,삭제한다.
     * @returns com_ever_edu_pms_common_cd_dto_res_EnumSyncResDto OK
     * @throws ApiError
     */
    public static syncAllEnums(): CancelablePromise<com_ever_edu_pms_common_cd_dto_res_EnumSyncResDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/enum/multilingual',
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
     * 플랫폼관리 > 시스템 공통코드 관리 > 목록 조회
     * 등록된 모든 enum의 이름을 반환한다.
     * @param cdGroupId
     * @returns string OK
     * @throws ApiError
     */
    public static findAllEnums2(
        cdGroupId?: string,
    ): CancelablePromise<Array<string>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/enum',
            query: {
                'cdGroupId': cdGroupId,
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
    /**
     * 플랫폼관리 > 시스템 공통코드 관리 > 상세 조회
     * 존재하는 enum code의 상세코드를 찾아 반환한다.
     * @param cdGroupId
     * @param cdId
     * @returns com_ever_edu_enums_EnumValue OK
     * @throws ApiError
     */
    public static getEnumCodeList1(
        cdGroupId: string,
        cdId: string,
    ): CancelablePromise<com_ever_edu_enums_EnumValue> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/enum/{cdGroupId}/{cdId}',
            path: {
                'cdGroupId': cdGroupId,
                'cdId': cdId,
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
