/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_terms_dto_req_TermsSaveReqDto$TranslationDto } from './com_ever_edu_pms_terms_dto_req_TermsSaveReqDto$TranslationDto';
export type com_ever_edu_pms_terms_dto_req_TermsSaveReqDto$TermsDto = {
    /**
     * 이용약관 NO
     */
    termsId?: number | null;
    /**
     * 약관명
     */
    termsName?: string | null;
    /**
     * 약관시행일
     */
    termsEffectiveDate?: string | null;
    /**
     * 약관사용대상
     */
    termsTarget?: string | null;
    /**
     * 사용여부
     */
    useYn?: boolean | null;
    /**
     * 삭제여부
     */
    deleteYn?: boolean | null;
    /**
     * 필수여부
     */
    mandatoryYn?: boolean | null;
    /**
     * 약관유형코드
     */
    termsTypeCode?: com_ever_edu_pms_terms_dto_req_TermsSaveReqDto$TermsDto.termsTypeCode | null;
    /**
     * 약관상태
     */
    termsStatus?: com_ever_edu_pms_terms_dto_req_TermsSaveReqDto$TermsDto.termsStatus | null;
    /**
     * 정렬순서
     */
    termsOrder?: number | null;
    /**
     * 설명
     */
    termsDesc?: string | null;
    /**
     * 약관버전
     */
    termsVersion?: string | null;
    /**
     * 언어코드
     */
    locale?: string | null;
    /**
     * 공지시작일
     */
    noticeStartDate?: string | null;
    /**
     * 공지종료일
     */
    noticeEndDate?: string | null;
    /**
     * 메일발송일
     */
    mailSendingDate?: string | null;
    /**
     * 스냅샷여부
     */
    snapshotYn?: boolean | null;
    /**
     * 스냅샷일
     */
    snapshotDate?: string | null;
    /**
     * 생성 GMT 타임존명
     */
    timezone?: string | null;
    /**
     * 국가/지역명 노출여부
     */
    displayNationsYn?: boolean | null;
    /**
     * 약관개정 공지 자동 발송 여부
     */
    noticeAutoSendingYn?: boolean | null;
    /**
     * 약관 사용대상 목록
     */
    termsMappingTargetList?: Array<number | null> | null;
    /**
     * 약관 번역 언어 목록
     */
    termsTranslationsLocaleList?: Array<string | null> | null;
    /**
     * 약관 노출위치 목록
     */
    termsDisplayLocationCodeList?: Array<'LOGIN_PAGE' | 'SIGNUP_PAGE' | 'SITE' | null> | null;
    /**
     * 약관 내용/공지
     */
    translations?: Array<com_ever_edu_pms_terms_dto_req_TermsSaveReqDto$TranslationDto> | null;
};
export namespace com_ever_edu_pms_terms_dto_req_TermsSaveReqDto$TermsDto {
    /**
     * 약관유형코드
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
}

