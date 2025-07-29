/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_pms_user_dto_req_UserChangeReqDto = {
    /**
     * 사번
     */
    employeeNumber?: string;
    /**
     * GUCC ID
     */
    guccId?: string;
    /**
     * 연동시스템
     */
    linkageSystem?: com_ever_edu_pms_user_dto_req_UserChangeReqDto.linkageSystem;
    /**
     * 성명
     */
    name: string;
    /**
     * 영문성명
     */
    engName?: string;
    /**
     * 생년월일
     */
    birthday?: string;
    /**
     * 성별
     */
    gender?: com_ever_edu_pms_user_dto_req_UserChangeReqDto.gender;
    /**
     * 직장전화 번호
     */
    companyPhoneNumber?: string;
    /**
     * 회사 ID
     */
    companyId: number;
    /**
     * 부서 ID
     */
    departmentId?: number;
    /**
     * 보직 여부
     */
    isLeader?: boolean;
    /**
     * 직군
     */
    jobDomain?: Array<string>;
    /**
     * 직무
     */
    jobRole?: Array<string>;
    /**
     * 호칭
     */
    positionName?: string;
    /**
     * 언어코드
     */
    locale?: {
        language?: string;
        script?: string;
        variant?: string;
        displayName?: string;
        country?: string;
        unicodeLocaleAttributes?: Array<string>;
        unicodeLocaleKeys?: Array<string>;
        displayLanguage?: string;
        displayScript?: string;
        displayCountry?: string;
        displayVariant?: string;
        extensionKeys?: Array<string>;
        iso3Language?: string;
        iso3Country?: string;
    };
    /**
     * 입사일자
     */
    joinDate?: string;
    /**
     * 현직급승진일자
     */
    promotionDate?: string;
    /**
     * 휴직여부
     */
    isOnLeave?: boolean;
    /**
     * 정직여부
     */
    isSuspended?: boolean;
    /**
     * SSO 유형
     */
    ssoType?: com_ever_edu_pms_user_dto_req_UserChangeReqDto.ssoType;
};
export namespace com_ever_edu_pms_user_dto_req_UserChangeReqDto {
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
        GETIS = 'GETIS',
    }
    /**
     * 성별
     */
    export enum gender {
        MALE = 'MALE',
        FEMALE = 'FEMALE',
    }
    /**
     * SSO 유형
     */
    export enum ssoType {
        HMG_SSO = 'HMG_SSO',
        AUTOWAY = 'AUTOWAY',
        AES_LINK = 'AES_Link',
    }
}

