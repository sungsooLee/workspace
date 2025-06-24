/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_company_dto_res_CompanyDeptResDto } from '../models/com_ever_edu_pms_company_dto_res_CompanyDeptResDto';
import type { org_springframework_data_domain_PageCom_ever_edu_pms_company_dto_res_CompanyDeptResDto } from '../models/org_springframework_data_domain_PageCom_ever_edu_pms_company_dto_res_CompanyDeptResDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BoHmgService {
    /**
     * (HMG)회사 부서 tree 조회
     * (원본)회사 부서 목록을 트리 구조로 조회한다.
     * @param companyCodeList 회사코드 리스트
     * @returns com_ever_edu_pms_company_dto_res_CompanyDeptResDto OK
     * @throws ApiError
     */
    public static getDeportmentTreeList(
        companyCodeList: string,
    ): CancelablePromise<Array<com_ever_edu_pms_company_dto_res_CompanyDeptResDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/hmg/department/tree',
            query: {
                'companyCodeList': companyCodeList,
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
     * (HMG)회사 부서 하위 목록 조회
     * (원본)회사 부서의 하위 목록 정보를 조회한다.
     * @param companyCode 회사코드
     * @param page Zero-based page index (0..N)
     * @param size The size of the page to be returned
     * @param sort Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @param parentDeptId 부서Id
     * @param deptName 부서명
     * @param deptManagerName 부서장 이름
     * @param hrInfoManageType 조직등록유형(인사 데이터 수동 관리 유형)
     * @returns org_springframework_data_domain_PageCom_ever_edu_pms_company_dto_res_CompanyDeptResDto OK
     * @throws ApiError
     */
    public static getDeportmentChildList(
        companyCode: string,
        page?: number,
        size: number = 10,
        sort?: Array<string>,
        parentDeptId?: string,
        deptName?: string,
        deptManagerName?: string,
        hrInfoManageType?: string,
    ): CancelablePromise<org_springframework_data_domain_PageCom_ever_edu_pms_company_dto_res_CompanyDeptResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/hmg/department/child',
            query: {
                'page': page,
                'size': size,
                'sort': sort,
                'companyCode': companyCode,
                'parentDeptId': parentDeptId,
                'deptName': deptName,
                'deptManagerName': deptManagerName,
                'hrInfoManageType': hrInfoManageType,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                404: `Not Found`,
                405: `Method Not Allowed`,
                422: `Unprocessable Entity`,
                500: `Internal Server Error`,
            },
        });
    }
}
