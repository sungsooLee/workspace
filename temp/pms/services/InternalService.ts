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
        companyType?: 'CAR' | 'GROUP' | 'HYUNDAI_GLOBAL' | 'HYUNDAI_GLOBAL_DEALER' | 'HYUNDAI_SALES' | 'HYUNDAI_SERVICE' | 'HYUNDAI_PRODUCTION' | 'KIA_GLOBAL' | 'KIA_GLOBAL_DEALER' | 'KIA_SALES' | 'KIA_SERVICE' | 'KIA_PRODUCTION' | 'CP' | 'ETC',
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
     * @param email
     * @returns com_ever_edu_pms_user_dto_res_UserResDto OK
     * @throws ApiError
     */
    public static findUserByEmail(
        email?: string,
    ): CancelablePromise<com_ever_edu_pms_user_dto_res_UserResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/internal/api/v1/users/user/{email}',
            query: {
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
