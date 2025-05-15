/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_pms_terms_dto_req_TermsSearchReqDto$SearchByAdmin = {
    /**
     * 약관유형
     */
    termsTypeCode?: com_ever_edu_pms_terms_dto_req_TermsSearchReqDto$SearchByAdmin.termsTypeCode | null;
    /**
     * 약관명
     */
    termsName?: string | null;
    /**
     * 약관사용대상
     */
    termsTarget?: string | null;
    /**
     * 약관상태
     */
    termsStatus?: com_ever_edu_pms_terms_dto_req_TermsSearchReqDto$SearchByAdmin.termsStatus | null;
    /**
     * 필수여부
     */
    isMandatory?: boolean;
    /**
     * 약관개정 공지 자동 발송 여부
     */
    isNoticeAutoSending?: boolean | null;
    /**
     * 약관 노출 위치 코드
     */
    termsDisplayLocationCode?: com_ever_edu_pms_terms_dto_req_TermsSearchReqDto$SearchByAdmin.termsDisplayLocationCode | null;
};
export namespace com_ever_edu_pms_terms_dto_req_TermsSearchReqDto$SearchByAdmin {
    /**
     * 약관유형
     */
    export enum termsTypeCode {
        TERMS_OF_SERVICE = 'TERMS_OF_SERVICE',
        PRIVACY_POLICY = 'PRIVACY_POLICY',
        SENSITIVE_PERSONAL_INFO = 'SENSITIVE_PERSONAL_INFO',
        PERSONAL_INFO_COLLECTION = 'PERSONAL_INFO_COLLECTION',
    }
    /**
     * 약관상태
     */
    export enum termsStatus {
        PENDING = 'PENDING',
        PUBLISHED = 'PUBLISHED',
        EXPIRED = 'EXPIRED',
    }
    /**
     * 약관 노출 위치 코드
     */
    export enum termsDisplayLocationCode {
        LOGIN_PAGE = 'LOGIN_PAGE',
        SIGNUP_PAGE = 'SIGNUP_PAGE',
        SITE = 'SITE',
    }
}

