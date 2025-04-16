/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_multilingual_dto_req_MultilingualSaveReqDto$TranslationDto } from './com_ever_edu_pms_multilingual_dto_req_MultilingualSaveReqDto$TranslationDto';
export type com_ever_edu_pms_multilingual_dto_req_MultilingualSaveReqDto$MultilingualDto = {
    /**
     * 다국어 코드
     */
    multilingualKey: string;
    /**
     * 키 타입
     */
    keyType?: com_ever_edu_pms_multilingual_dto_req_MultilingualSaveReqDto$MultilingualDto.keyType | null;
    /**
     * 사용여부
     */
    isUsed?: boolean | null;
    /**
     * 삭제여부
     */
    isDeleted?: boolean | null;
    /**
     * 다국어 설명
     */
    messageDesc?: string | null;
    /**
     * 번역 리스트
     */
    translations: Array<com_ever_edu_pms_multilingual_dto_req_MultilingualSaveReqDto$TranslationDto>;
};
export namespace com_ever_edu_pms_multilingual_dto_req_MultilingualSaveReqDto$MultilingualDto {
    /**
     * 키 타입
     */
    export enum keyType {
        COMMON_CODE = 'COMMON_CODE',
        MENU = 'MENU',
        LABEL = 'LABEL',
        CATEGORY = 'CATEGORY',
        MESSAGE = 'MESSAGE',
    }
}

