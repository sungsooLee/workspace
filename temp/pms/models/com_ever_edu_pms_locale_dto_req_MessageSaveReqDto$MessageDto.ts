/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_locale_dto_req_MessageSaveReqDto$TranslationDto } from './com_ever_edu_pms_locale_dto_req_MessageSaveReqDto$TranslationDto';
export type com_ever_edu_pms_locale_dto_req_MessageSaveReqDto$MessageDto = {
    /**
     * 다국어 코드
     */
    code: string;
    /**
     * 키 타입
     */
    keyType?: com_ever_edu_pms_locale_dto_req_MessageSaveReqDto$MessageDto.keyType | null;
    /**
     * 사용여부
     */
    useYn?: boolean | null;
    /**
     * 다국어 설명
     */
    messageDesc?: string | null;
    /**
     * 상위코드ID
     */
    parentId?: number | null;
    /**
     * 번역 리스트
     */
    translations: Array<com_ever_edu_pms_locale_dto_req_MessageSaveReqDto$TranslationDto>;
};
export namespace com_ever_edu_pms_locale_dto_req_MessageSaveReqDto$MessageDto {
    /**
     * 키 타입
     */
    export enum keyType {
        COMMON_CODE = 'COMMON_CODE',
        MENU = 'MENU',
        LABEL = 'LABEL',
        CATEGORY = 'CATEGORY',
        ERROR = 'ERROR',
        MESSAGE = 'MESSAGE',
    }
}

