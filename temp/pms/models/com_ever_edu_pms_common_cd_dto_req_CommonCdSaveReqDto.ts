/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_multilingual_dto_req_MultilingualSaveReqDto$TranslationDto } from './com_ever_edu_pms_multilingual_dto_req_MultilingualSaveReqDto$TranslationDto';
export type com_ever_edu_pms_common_cd_dto_req_CommonCdSaveReqDto = {
    /**
     * 코드그룹번호
     */
    cdGroupId: string;
    /**
     * 코드번호
     */
    cdId: string;
    /**
     * 코드명
     */
    cdName: string;
    /**
     * 코드순서
     */
    cdSeq: number;
    /**
     * 코드내용
     */
    cdContent: string;
    /**
     * 참고값1
     */
    referenceVal1?: string | null;
    /**
     * 참고값2
     */
    referenceVal2?: string | null;
    /**
     * 참고값3
     */
    referenceVal3?: string | null;
    /**
     * 참고값4
     */
    referenceVal4?: string | null;
    /**
     * 사용여부
     */
    isUsed?: boolean | null;
    /**
     * 번역 리스트
     */
    translations?: Array<com_ever_edu_pms_multilingual_dto_req_MultilingualSaveReqDto$TranslationDto>;
};

