/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_global_excel_dto_req_ExcelDownloadReasonReqDto } from './com_ever_edu_global_excel_dto_req_ExcelDownloadReasonReqDto';
export type com_ever_edu_cms_content_dto_req_ContentExcelExportReqDto = {
    /**
     * [필수]테넌트 UUID
     */
    tenantId: number;
    /**
     * [필수]채널 UUID
     */
    channelUuid?: string;
    /**
     * 콘텐츠 분류(복수선택) Enum(cms.content.ContentType) - 유형(복수선택), null OR VIDEO|EBOOK|SCORM|HTML5_VIDEO|IMAGE|EXTERNAL_LINK|EXTERNAL_AGENCY|BLOG|EXAM|EXAM_POOL|ASSIGNMENT|SURVEY|ETC
     */
    contentTypes?: Array<'VIDEO' | 'EBOOK' | 'SCORM' | 'HTML5_VIDEO' | 'IMAGE' | 'EXTERNAL_LINK' | 'EXTERNAL_AGENCY' | 'BLOG' | 'EXAM' | 'EXAM_POOL' | 'ASSIGNMENT' | 'SURVEY' | 'ETC'>;
    /**
     * 콘텐츠 이름 (학습자원명)
     */
    contentName?: string;
    /**
     * 벤더사 여부(외주 개발 여부) - null|true|false
     */
    isVendored?: boolean;
    /**
     * 사용가능 상태 여부
     */
    isContentEnabled?: boolean;
    /**
     * 텐츠 과정 활용 여부(교육자원 활용 여부) - null|true|false
     */
    isCourseUsed?: boolean;
    /**
     * 담당자명
     */
    coordinatorName?: string;
    /**
     * 국가 언어 코드 Enum(pms.multilingual.LangCountryCode)
     */
    languageCountryCode?: com_ever_edu_cms_content_dto_req_ContentExcelExportReqDto.languageCountryCode;
    /**
     * 메뉴ID
     */
    menuId: number;
    downloadReason?: com_ever_edu_global_excel_dto_req_ExcelDownloadReasonReqDto;
    isMockUp?: boolean;
};
export namespace com_ever_edu_cms_content_dto_req_ContentExcelExportReqDto {
    /**
     * 국가 언어 코드 Enum(pms.multilingual.LangCountryCode)
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
}

