/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_pms_user_dto_req_UserRegisterReqDto = {
    /**
     * 이름
     */
    name: string;
    /**
     * 생년월일
     */
    birthday?: string;
    /**
     * Email 주소
     */
    email?: string;
    /**
     * 비밀번호
     */
    password: string;
    /**
     * 사번
     */
    employeeNumber?: string;
    /**
     * 휴대전화번호
     */
    phoneNumber: string;
    /**
     * 회원기본언어셋코드
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
     * 사용자구분 (GIM : USER_TYPE, U01 : 임직원, U07 : 외부사용자
     */
    accountType?: string;
    /**
     * 회사 ID
     */
    companyId: number;
};

