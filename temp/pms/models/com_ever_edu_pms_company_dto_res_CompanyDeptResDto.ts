/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_company_dto_res_CompanyLoginRestrictionResDto } from './com_ever_edu_pms_company_dto_res_CompanyLoginRestrictionResDto';
/**
 * 부서
 */
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
    parent?: number;
    /**
     * 하위메뉴
     */
    childList?: Array<com_ever_edu_pms_company_dto_res_CompanyDeptResDto>;
    /**
     * 회사명
     */
    companyName?: string;
    /**
     * 회사유형
     */
    companyType?: com_ever_edu_pms_company_dto_res_CompanyDeptResDto.companyType;
    /**
     * 연동시스템 사용여부
     */
    isUseLinkageSystem?: boolean;
    /**
     * 연동시스템 유형
     */
    linkageType?: com_ever_edu_pms_company_dto_res_CompanyDeptResDto.linkageType;
    /**
     * 연동시스템
     */
    linkageSystem?: com_ever_edu_pms_company_dto_res_CompanyDeptResDto.linkageSystem;
    /**
     * 로그인 제한 정보
     */
    companyLoginRestrictionList?: Array<com_ever_edu_pms_company_dto_res_CompanyLoginRestrictionResDto>;
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
};
export namespace com_ever_edu_pms_company_dto_res_CompanyDeptResDto {
    /**
     * 회사유형
     */
    export enum companyType {
        CAR = 'CAR',
        GROUP = 'GROUP',
        HYUNDAI_GLOBAL = 'HYUNDAI_GLOBAL',
        HYUNDAI_GLOBAL_DEALER = 'HYUNDAI_GLOBAL_DEALER',
        HYUNDAI_SALES = 'HYUNDAI_SALES',
        HYUNDAI_SERVICE = 'HYUNDAI_SERVICE',
        HYUNDAI_PRODUCTION = 'HYUNDAI_PRODUCTION',
        KIA_GLOBAL = 'KIA_GLOBAL',
        KIA_GLOBAL_DEALER = 'KIA_GLOBAL_DEALER',
        KIA_SALES = 'KIA_SALES',
        KIA_SERVICE = 'KIA_SERVICE',
        KIA_PRODUCTION = 'KIA_PRODUCTION',
        CP = 'CP',
        ETC = 'ETC',
    }
    /**
     * 연동시스템 유형
     */
    export enum linkageType {
        INTERFACE = 'INTERFACE',
        FTP = 'FTP',
    }
    /**
     * 연동시스템
     */
    export enum linkageSystem {
        GIM = 'GIM',
        HSW = 'HSW',
        KSW = 'KSW',
        DMSSH = 'DMSSH',
        DMSSK = 'DMSSK',
        DDMSH = 'DDMSH',
        DDMSK = 'DDMSK',
        VAATZ = 'VAATZ',
    }
}

