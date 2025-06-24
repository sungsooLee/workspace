/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_company_dto_res_CompanyDeptSimpleResDto } from './com_ever_edu_pms_company_dto_res_CompanyDeptSimpleResDto';
export type com_ever_edu_pms_company_dto_res_CompanyDeptResDto = {
    /**
     * 부서ID
     */
    deptId?: number;
    /**
     * 뎁스
     */
    depth?: number;
    /**
     * 정렬순서
     */
    sortOrder?: number;
    /**
     * 부서코드
     */
    deptCode?: string;
    /**
     * 매니저 사원번호
     */
    managerEmployeeNumber?: string;
    /**
     * 매니저 사원번호 Uuid
     */
    managerEmployeeNumberUuid?: string;
    /**
     * 매니저 성명
     */
    managerName?: string;
    /**
     * 부서명
     */
    deptName?: string;
    /**
     * 부서영문명
     */
    deptEngName?: string;
    /**
     * 부서 설명
     */
    deptDesc?: string;
    /**
     * 사용여부
     */
    isUsed?: boolean;
    /**
     * 삭제여부
     */
    isDeleted?: boolean;
    /**
     * 상위부서코드
     */
    parentDeptId?: number;
    /**
     * 부서 구성원 수
     */
    deptMemberCount?: number;
    /**
     * 조직등록유형
     */
    hrInfoManageType?: com_ever_edu_pms_company_dto_res_CompanyDeptResDto.hrInfoManageType;
    /**
     * 회사코드
     */
    companyCode?: string;
    /**
     * 회사명
     */
    companyName?: string;
    /**
     * 회사유형
     */
    companyType?: com_ever_edu_pms_company_dto_res_CompanyDeptResDto.companyType;
    /**
     * 상위 부서리스트
     */
    parentDeptList?: Array<com_ever_edu_pms_company_dto_res_CompanyDeptSimpleResDto>;
    /**
     * 등록자ID
     */
    createdBy?: string;
    /**
     * 등록일시
     */
    createdDate?: string;
    /**
     * 최종수정자ID
     */
    lastModifiedBy?: string;
    /**
     * 최종수정일시
     */
    modifiedDate?: string;
    /**
     * 하위부서
     */
    childList?: Array<com_ever_edu_pms_company_dto_res_CompanyDeptResDto>;
};
export namespace com_ever_edu_pms_company_dto_res_CompanyDeptResDto {
    /**
     * 조직등록유형
     */
    export enum hrInfoManageType {
        MANUAL_MANAGE = 'MANUAL_MANAGE',
        AUTO_MANAGE = 'AUTO_MANAGE',
    }
    /**
     * 회사유형
     */
    export enum companyType {
        CAR = 'CAR',
        GLOBAL = 'GLOBAL',
        GROUP = 'GROUP',
        SERVICE = 'SERVICE',
        SALES = 'SALES',
        GLOBAL_DEALER = 'GLOBAL_DEALER',
        ETC_SERVICE = 'ETC_SERVICE',
        HELLO_HMG = 'HELLO_HMG',
        EDU_SERVICE = 'EDU_SERVICE',
        ETC = 'ETC',
    }
}

