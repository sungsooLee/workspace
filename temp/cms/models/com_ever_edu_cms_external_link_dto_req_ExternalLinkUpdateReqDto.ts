/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_cms_tag_dto_req_TagReqDto } from './com_ever_edu_cms_tag_dto_req_TagReqDto';
export type com_ever_edu_cms_external_link_dto_req_ExternalLinkUpdateReqDto = {
    contentUuid: string;
    contentName?: string;
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
    contentAddInfoType?: com_ever_edu_cms_external_link_dto_req_ExternalLinkUpdateReqDto.contentAddInfoType;
    contentAddInfo?: number;
    isSecured?: boolean;
    isDeleted?: boolean;
    isOpened?: boolean;
    tags?: Array<com_ever_edu_cms_tag_dto_req_TagReqDto>;
    externalLink: string;
    externalLinkType: com_ever_edu_cms_external_link_dto_req_ExternalLinkUpdateReqDto.externalLinkType;
    source?: string;
};
export namespace com_ever_edu_cms_external_link_dto_req_ExternalLinkUpdateReqDto {
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
    export enum contentAddInfoType {
        VIDEO_ADD_INFO = 'VIDEO_ADD_INFO',
        EXAM_ADD_INFO = 'EXAM_ADD_INFO',
    }
    export enum externalLinkType {
        CP = 'CP',
        EXT_NEW_WINDOW = 'EXT_NEW_WINDOW',
        SERICEO = 'SERICEO',
    }
}

