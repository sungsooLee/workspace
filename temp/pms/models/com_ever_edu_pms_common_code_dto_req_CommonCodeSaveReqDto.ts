/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_locale_dto_req_MessageSaveReqDto$TranslationDto } from './com_ever_edu_pms_locale_dto_req_MessageSaveReqDto$TranslationDto';
export type com_ever_edu_pms_common_code_dto_req_CommonCodeSaveReqDto = {
    /**
     * 공통코드NO
     */
    commonCodeId?: number | null;
    /**
     * 공통코드값
     */
    code: string | null;
    /**
     * 상세설명
     */
    commonCodeDesc?: string | null;
    /**
     * 뎁스
     */
    depth?: number | null;
    /**
     * 정렬순서
     */
    sortOrder?: number | null;
    /**
     * 사용여부
     */
    useYn?: boolean | null;
    /**
     * 삭제여부
     */
    deleteYn?: boolean | null;
    /**
     * 부모ID
     */
    parentId?: number | null;
    /**
     * 다국어코드
     */
    i18nCode?: string | null;
    /**
     * 번역 리스트
     */
    translations: Array<com_ever_edu_pms_locale_dto_req_MessageSaveReqDto$TranslationDto>;
};

