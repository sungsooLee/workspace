/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_global_dto_ResponseDtoOrg_springframework_data_domain_PageCom_ever_edu_pms_user_dto_res_UserResDto } from '../models/com_ever_edu_global_dto_ResponseDtoOrg_springframework_data_domain_PageCom_ever_edu_pms_user_dto_res_UserResDto';
import type { org_springdoc_core_converters_models_Pageable } from '../models/org_springdoc_core_converters_models_Pageable';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UserInternalControllerService {
    /**
     * 사용자 조회(목록)
     * 사용자를 목록을 조회한다.
     * @param pageable
     * @param userState
     * @param userName
     * @param companyCode
     * @returns com_ever_edu_global_dto_ResponseDtoOrg_springframework_data_domain_PageCom_ever_edu_pms_user_dto_res_UserResDto OK
     * @throws ApiError
     */
    public static findPage(
        pageable: org_springdoc_core_converters_models_Pageable,
        userState?: 'WAIT' | 'NORMAL' | 'HALT' | 'LEAVE' | 'DELETE',
        userName?: string,
        companyCode?: string,
    ): CancelablePromise<com_ever_edu_global_dto_ResponseDtoOrg_springframework_data_domain_PageCom_ever_edu_pms_user_dto_res_UserResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/internal/api/v1/users',
            query: {
                'userState': userState,
                'userName': userName,
                'companyCode': companyCode,
                'pageable': pageable,
            },
        });
    }
}
