/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_role_dto_res_RoleResDto } from '../models/com_ever_edu_pms_role_dto_res_RoleResDto';
import type { com_ever_edu_pms_user_dto_req_UserSearchReqDto } from '../models/com_ever_edu_pms_user_dto_req_UserSearchReqDto';
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
     * @param req
     * @returns org_springframework_data_domain_PageCom_ever_edu_pms_user_dto_res_UserResDto OK
     * @throws ApiError
     */
    public static findPage(
        pageable: org_springdoc_core_converters_models_Pageable,
        req: com_ever_edu_pms_user_dto_req_UserSearchReqDto,
    ): CancelablePromise<org_springframework_data_domain_PageCom_ever_edu_pms_user_dto_res_UserResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/internal/api/v1/users',
            query: {
                'pageable': pageable,
                'req': req,
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
    /**
     * 역할 조회(단건)
     * 역할을 조회한다.
     * @param roleId
     * @returns com_ever_edu_pms_role_dto_res_RoleResDto OK
     * @throws ApiError
     */
    public static getRole(
        roleId: number,
    ): CancelablePromise<com_ever_edu_pms_role_dto_res_RoleResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/internal/api/v1/roles/{roleId}',
            path: {
                'roleId': roleId,
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
