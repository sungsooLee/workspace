/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_user_dto_res_UserResDto } from '../models/com_ever_edu_pms_user_dto_res_UserResDto';
import type { org_springdoc_core_converters_models_Pageable } from '../models/org_springdoc_core_converters_models_Pageable';
import type { org_springframework_data_domain_PageCom_ever_edu_pms_user_dto_res_UserResDto } from '../models/org_springframework_data_domain_PageCom_ever_edu_pms_user_dto_res_UserResDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class InternalService {
    /**
     * 사용자 조회(목록)
     * 사용자를 목록을 조회한다.
     * @param pageable
     * @param companyType
     * @param companyId
     * @param deptId
     * @param userName
     * @param employeeNumber
     * @param userState
     * @returns org_springframework_data_domain_PageCom_ever_edu_pms_user_dto_res_UserResDto OK
     * @throws ApiError
     */
    public static findPage(
        pageable: org_springdoc_core_converters_models_Pageable,
        companyType?: 'CAR' | 'GLOBAL' | 'GROUP' | 'SERVICE' | 'SALES' | 'GLOBAL_DEALER' | 'ETC_SERVICE' | 'HELLO_HMG' | 'EDU_SERVICE' | 'ETC',
        companyId?: number,
        deptId?: number,
        userName?: string,
        employeeNumber?: string,
        userState?: 'WAIT' | 'NORMAL' | 'HALT' | 'LEAVE' | 'DELETE',
    ): CancelablePromise<org_springframework_data_domain_PageCom_ever_edu_pms_user_dto_res_UserResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/internal/api/v1/users',
            query: {
                'pageable': pageable,
                'companyType': companyType,
                'companyId': companyId,
                'deptId': deptId,
                'userName': userName,
                'employeeNumber': employeeNumber,
                'userState': userState,
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
     * 사용자 조회(목록)
     * 사용자를 목록을 조회한다.
     * @param uuids
     * @returns com_ever_edu_pms_user_dto_res_UserResDto OK
     * @throws ApiError
     */
    public static findUserListByUuids(
        uuids: string,
    ): CancelablePromise<Array<com_ever_edu_pms_user_dto_res_UserResDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/internal/api/v1/users/uuids/{uuids}',
            path: {
                'uuids': uuids,
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
     * 사용자 조회(목록)
     * 사용자를 목록을 조회한다.
     * @param uuid
     * @returns com_ever_edu_pms_user_dto_res_UserResDto OK
     * @throws ApiError
     */
    public static findUserByUuid(
        uuid: string,
    ): CancelablePromise<com_ever_edu_pms_user_dto_res_UserResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/internal/api/v1/users/uuid/{uuid}',
            path: {
                'uuid': uuid,
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
     * 사용자 조회(목록)
     * 사용자를 목록을 조회한다.
     * @param email
     * @returns com_ever_edu_pms_user_dto_res_UserResDto OK
     * @throws ApiError
     */
    public static findUserByEmail(
        email: string,
    ): CancelablePromise<com_ever_edu_pms_user_dto_res_UserResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/internal/api/v1/users/email/{email}',
            path: {
                'email': email,
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
