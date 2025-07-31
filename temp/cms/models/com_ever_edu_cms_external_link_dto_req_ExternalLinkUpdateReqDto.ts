/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_cms_tag_dto_req_TagReqDto } from './com_ever_edu_cms_tag_dto_req_TagReqDto';
export type com_ever_edu_cms_external_link_dto_req_ExternalLinkUpdateReqDto = {
    contentUuid: string;
    contentName?: string;
    /**
     * Enum(pms.multilingual.LangCountryCode)
     */
    languageCountryCode?: com_ever_edu_cms_external_link_dto_req_ExternalLinkUpdateReqDto.languageCountryCode;
    tenantId?: number;
    channelUuid?: string;
    description?: string;
    coordinatorUuid?: string;
    coordinatorName?: string;
    coordinatorTelNo?: string;
    isUnlimited?: boolean;
    contentUseStartDate?: string;
    contentUseEndDate?: string;
    isVendored?: boolean;
    vendorCode?: number;
    vendorName?: string;
    vendorCoordinatorUuid?: string;
    vendorCoordinatorName?: string;
    vendorTelNo?: string;
    isCourseUsed?: boolean;
    isContentSecured?: boolean;
    isInspected?: boolean;
    isCopyrighted?: boolean;
    /**
     * Enum(cms.contentContentAddInfoType)<br>- VIDEO_ADD_INFO(초)<br>- EXAM_ADD_INFO(건수)
     */
    contentAddInfoType?: com_ever_edu_cms_external_link_dto_req_ExternalLinkUpdateReqDto.contentAddInfoType;
    /**
     * 콘텐츠 추가정보 코드 별 초/건수 값
     */
    contentAddInfo?: number;
    isSecured?: boolean;
    isDeleted?: boolean;
    isOpened?: boolean;
    tags?: Array<com_ever_edu_cms_tag_dto_req_TagReqDto>;
    externalLink: string;
    /**
     * Enum(cms.external_link.ExternalLinkType)<br>- CP: CP사<br>- EXT_NEW_WINDOW: 외부 새창<br>- SERICEO: SERICEO
     */
    externalLinkType: com_ever_edu_cms_external_link_dto_req_ExternalLinkUpdateReqDto.externalLinkType;
    source?: string;
};
export namespace com_ever_edu_cms_external_link_dto_req_ExternalLinkUpdateReqDto {
    /**
     * Enum(pms.multilingual.LangCountryCode)
     */
    export enum languageCountryCode {
        KO = 'KO',
        EN = 'EN',
        ES = 'ES',
        AR = 'AR',
        RU = 'RU',
        FR = 'FR',
        PT = 'PT',
        ID = 'ID',
        ZH = 'ZH',
        VI = 'VI',
        TR = 'TR',
        TH = 'TH',
        DE = 'DE',
        HE = 'HE',
        NE = 'NE',
        FA = 'FA',
        HI = 'HI',
        JA = 'JA',
        MS = 'MS',
        IT = 'IT',
        SK = 'SK',
        RO = 'RO',
        HR = 'HR',
        ET = 'ET',
    }
    /**
     * Enum(cms.contentContentAddInfoType)<br>- VIDEO_ADD_INFO(초)<br>- EXAM_ADD_INFO(건수)
     */
    export enum contentAddInfoType {
        VIDEO_ADD_INFO = 'VIDEO_ADD_INFO',
        EXAM_ADD_INFO = 'EXAM_ADD_INFO',
    }
    /**
     * Enum(cms.external_link.ExternalLinkType)<br>- CP: CP사<br>- EXT_NEW_WINDOW: 외부 새창<br>- SERICEO: SERICEO
     */
    export enum externalLinkType {
        CP = 'CP',
        EXT_NEW_WINDOW = 'EXT_NEW_WINDOW',
        SERICEO = 'SERICEO',
    }
}

