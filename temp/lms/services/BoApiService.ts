/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_lms_pkg_dto_req_PkgListReqDto } from '../models/com_ever_edu_lms_pkg_dto_req_PkgListReqDto';
import type { com_ever_edu_lms_pkg_dto_req_PkgSaveReqDto } from '../models/com_ever_edu_lms_pkg_dto_req_PkgSaveReqDto';
import type { com_ever_edu_lms_pkg_dto_req_PkgTreeDndReqDto } from '../models/com_ever_edu_lms_pkg_dto_req_PkgTreeDndReqDto';
import type { com_ever_edu_lms_pkg_dto_req_PkgTreeSaveReqDto } from '../models/com_ever_edu_lms_pkg_dto_req_PkgTreeSaveReqDto';
import type { com_ever_edu_lms_pkg_dto_req_PkgUpdateReqDto } from '../models/com_ever_edu_lms_pkg_dto_req_PkgUpdateReqDto';
import type { com_ever_edu_lms_pkg_dto_req_SubPkgSaveReqDto } from '../models/com_ever_edu_lms_pkg_dto_req_SubPkgSaveReqDto';
import type { com_ever_edu_lms_pkg_dto_res_PkgResDto } from '../models/com_ever_edu_lms_pkg_dto_res_PkgResDto';
import type { com_ever_edu_lms_pkg_dto_res_PkgTreeDto } from '../models/com_ever_edu_lms_pkg_dto_res_PkgTreeDto';
import type { org_springdoc_core_converters_models_Pageable } from '../models/org_springdoc_core_converters_models_Pageable';
import type { org_springframework_data_domain_PageCom_ever_edu_lms_pkg_dto_res_PkgListAdminResDto } from '../models/org_springframework_data_domain_PageCom_ever_edu_lms_pkg_dto_res_PkgListAdminResDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BoApiService {
    /**
     * 패키지 조회
     * 패키지 정보를 조회한다.
     * @param packageId
     * @returns com_ever_edu_lms_pkg_dto_res_PkgResDto OK
     * @throws ApiError
     */
    public static getPkg1(
        packageId: number,
    ): CancelablePromise<com_ever_edu_lms_pkg_dto_res_PkgResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/pkg/{packageId}',
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
     * 패키지 수정
     * 패키지 정보를 수정한다.
     * @param packageId
     * @param requestBody
     * @returns number OK
     * @throws ApiError
     */
    public static updatePkg(
        packageId: number,
        requestBody: com_ever_edu_lms_pkg_dto_req_PkgUpdateReqDto,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/pkg/{packageId}',
            path: {
                'packageId': packageId,
            },
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
     * 패키지 삭제
     * 패키지를 삭제한다.
     * @param packageId
     * @returns any OK
     * @throws ApiError
     */
    public static deletePkg(
        packageId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/admin/api/v1/pkg/{packageId}',
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
     * 패키지 tree node 위치 변경
     * 패키지 트리의 node를 DnD(Drag and Drop)로 위치 변경한다.
     * @param nodeId
     * @param requestBody
     * @returns number OK
     * @throws ApiError
     */
    public static dnd(
        nodeId: number,
        requestBody: com_ever_edu_lms_pkg_dto_req_PkgTreeDndReqDto,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/pkg/tree/node/{nodeId}/dnd',
            path: {
                'nodeId': nodeId,
            },
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
     * 서브패키지 수정
     * 서브패키지 정보를 수정한다.
     * @param subPkgId
     * @param requestBody
     * @returns number OK
     * @throws ApiError
     */
    public static updateSubPkg(
        subPkgId: number,
        requestBody: com_ever_edu_lms_pkg_dto_req_SubPkgSaveReqDto,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/pkg/sub-pkg/{subPkgId}',
            path: {
                'subPkgId': subPkgId,
            },
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
     * 패키지 생성
     * 새로운 패키지를 생성한다.
     * @param requestBody
     * @returns number OK
     * @throws ApiError
     */
    public static createPkg(
        requestBody: com_ever_edu_lms_pkg_dto_req_PkgSaveReqDto,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/pkg',
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
     * 패키지 tree node 생성
     * 패키지 트리의 새로운 node 생성한다.
     * @param requestBody
     * @returns number OK
     * @throws ApiError
     */
    public static createPkgTreeNode(
        requestBody: com_ever_edu_lms_pkg_dto_req_PkgTreeSaveReqDto,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/pkg/tree/node',
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
     * 패키지 목록 조회
     * 패키지 목록을 조회한다.
     * @param pageable
     * @param params
     * @returns org_springframework_data_domain_PageCom_ever_edu_lms_pkg_dto_res_PkgListAdminResDto OK
     * @throws ApiError
     */
    public static findPage5(
        pageable: org_springdoc_core_converters_models_Pageable,
        params: com_ever_edu_lms_pkg_dto_req_PkgListReqDto,
    ): CancelablePromise<org_springframework_data_domain_PageCom_ever_edu_lms_pkg_dto_res_PkgListAdminResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/pkgs',
            query: {
                'pageable': pageable,
                'params': params,
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
     * 패키지 tree 조회
     * 패키지의 트리 조회한다.
     * @param packageId
     * @returns com_ever_edu_lms_pkg_dto_res_PkgTreeDto OK
     * @throws ApiError
     */
    public static getPkgTree1(
        packageId: number,
    ): CancelablePromise<com_ever_edu_lms_pkg_dto_res_PkgTreeDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/pkg/{packageId}/tree',
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
     * 패키지 tree node 조회
     * 패키지 트리의 node 정보를 조회한다.
     * @param nodeId
     * @returns any OK
     * @throws ApiError
     */
    public static getNode(
        nodeId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/pkg/tree/node/{nodeId}',
            path: {
                'nodeId': nodeId,
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
     * 패키지 tree node 삭제
     * 패키지 트리의 node 삭제한다.
     * @param nodeId
     * @returns any OK
     * @throws ApiError
     */
    public static deletePkgTreeNode(
        nodeId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/admin/api/v1/pkg/tree/node/{nodeId}',
            path: {
                'nodeId': nodeId,
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
