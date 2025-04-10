/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_enums_EnumValue } from '../models/com_ever_edu_enums_EnumValue';
import type { com_ever_edu_pms_common_code_dto_req_CommonCodeSaveReqDto } from '../models/com_ever_edu_pms_common_code_dto_req_CommonCodeSaveReqDto';
import type { com_ever_edu_pms_common_code_dto_res_CommonCodeResDto$DetailOnAdmin } from '../models/com_ever_edu_pms_common_code_dto_res_CommonCodeResDto$DetailOnAdmin';
import type { com_ever_edu_pms_common_code_dto_res_CommonCodeResDto$TreeListOnAdmin } from '../models/com_ever_edu_pms_common_code_dto_res_CommonCodeResDto$TreeListOnAdmin';
import type { org_springdoc_core_converters_models_Pageable } from '../models/org_springdoc_core_converters_models_Pageable';
import type { org_springframework_data_domain_PageCom_ever_edu_pms_common_code_dto_res_CommonCodeResDto$ListOnAdmin } from '../models/org_springframework_data_domain_PageCom_ever_edu_pms_common_code_dto_res_CommonCodeResDto$ListOnAdmin';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BoBakService {
    /**
     * 공통코드 단일 조회
     * 공통코드 단일 조회
     * @param commonCodeId
     * @returns com_ever_edu_pms_common_code_dto_res_CommonCodeResDto$DetailOnAdmin OK
     * @throws ApiError
     */
    public static getCommonCode(
        commonCodeId: number,
    ): CancelablePromise<com_ever_edu_pms_common_code_dto_res_CommonCodeResDto$DetailOnAdmin> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/codes_bak/{commonCodeId}',
            path: {
                'commonCodeId': commonCodeId,
            },
        });
    }
    /**
     * 공통코드 수정
     * 공통코드 수정
     * @param commonCodeId
     * @param requestBody
     * @returns com_ever_edu_pms_common_code_dto_res_CommonCodeResDto$DetailOnAdmin OK
     * @throws ApiError
     */
    public static updateCommonCode(
        commonCodeId: number,
        requestBody: com_ever_edu_pms_common_code_dto_req_CommonCodeSaveReqDto,
    ): CancelablePromise<com_ever_edu_pms_common_code_dto_res_CommonCodeResDto$DetailOnAdmin> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/codes_bak/{commonCodeId}',
            path: {
                'commonCodeId': commonCodeId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * 공통코드 삭제
     * 공통코드 삭제
     * @param commonCodeId
     * @returns any OK
     * @throws ApiError
     */
    public static deleteCommonCode(
        commonCodeId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/admin/api/v1/codes_bak/{commonCodeId}',
            path: {
                'commonCodeId': commonCodeId,
            },
        });
    }
    /**
     * 공통코드 목록 조회
     * 공통코드 목록 조회
     * @param pageable
     * @returns org_springframework_data_domain_PageCom_ever_edu_pms_common_code_dto_res_CommonCodeResDto$ListOnAdmin OK
     * @throws ApiError
     */
    public static getCommonCodeList(
        pageable: org_springdoc_core_converters_models_Pageable,
    ): CancelablePromise<org_springframework_data_domain_PageCom_ever_edu_pms_common_code_dto_res_CommonCodeResDto$ListOnAdmin> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/codes_bak',
            query: {
                'pageable': pageable,
            },
        });
    }
    /**
     * 공통코드 등록
     * 공통코드 등록
     * @param requestBody
     * @returns com_ever_edu_pms_common_code_dto_res_CommonCodeResDto$DetailOnAdmin OK
     * @throws ApiError
     */
    public static createCommonCode(
        requestBody: com_ever_edu_pms_common_code_dto_req_CommonCodeSaveReqDto,
    ): CancelablePromise<com_ever_edu_pms_common_code_dto_res_CommonCodeResDto$DetailOnAdmin> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/codes_bak',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * 공통코드 트리목록 조회
     * 공통코드 트리목록 조회
     * @param locale
     * @param commonCodeId
     * @returns com_ever_edu_pms_common_code_dto_res_CommonCodeResDto$TreeListOnAdmin OK
     * @throws ApiError
     */
    public static getCommonCodeTreeList(
        locale: string,
        commonCodeId: number,
    ): CancelablePromise<com_ever_edu_pms_common_code_dto_res_CommonCodeResDto$TreeListOnAdmin> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/codes_bak/tree/{locale}/{commonCodeId}',
            path: {
                'locale': locale,
                'commonCodeId': commonCodeId,
            },
        });
    }
    /**
     * 공통 코드 (enum) 전체 조회
     * 존재하는 enum 전체를 반환한다. enumConfig에 정의된
     * @returns com_ever_edu_enums_EnumValue OK
     * @throws ApiError
     */
    public static findEnumAll(): CancelablePromise<Record<string, Array<com_ever_edu_enums_EnumValue>>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/codes_bak/enums',
        });
    }
    /**
     * 공통 코드 (enum) 조회
     * 존재하는 enum을 찾아 반환한다.
     * @param enumName
     * @returns com_ever_edu_enums_EnumValue OK
     * @throws ApiError
     */
    public static findEnumList(
        enumName: string,
    ): CancelablePromise<Record<string, Array<com_ever_edu_enums_EnumValue>>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/codes_bak/enums/{enumName}',
            path: {
                'enumName': enumName,
            },
        });
    }
}
