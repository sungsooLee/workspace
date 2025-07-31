/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_global_excel_dto_req_ExcelDownloadReasonReqDto } from './com_ever_edu_global_excel_dto_req_ExcelDownloadReasonReqDto';
export type com_ever_edu_cms_content_dto_req_ContentExcelExportReqDto = {
    tenantId: number;
    channelUuid?: string;
    /**
     * Enum(cms.content.ContentType)Enum(cms.content.ContentType)<br>- VIDEO: 동영상<br>- EBOOK: 이북<br>- SCORM: 스콤<br>- HTML5_VIDEO: HTML 동영상<br>- IMAGE: 이미지<br>- EXTERNAL_LINK: 외부링크<br>- EXTERNAL_AGENCY: 외부위탁<br>- BLOG: 블로그<br>- EXAM: 시험지<br>- EXAM_POOL: 문제은행<br>- ASSIGNMENT: 과제<br>- SURVEY: 설문지<br>- ETC: 기타
     */
    contentTypes?: Array<'VIDEO' | 'EBOOK' | 'SCORM' | 'HTML5_VIDEO' | 'IMAGE' | 'EXTERNAL_LINK' | 'EXTERNAL_AGENCY' | 'BLOG' | 'EXAM' | 'EXAM_POOL' | 'ASSIGNMENT' | 'SURVEY' | 'ETC'>;
    contentName?: string;
    isVendored?: boolean;
    isContentEnabled?: boolean;
    isCourseUsed?: boolean;
    coordinatorName?: string;
    /**
     * Enum(pms.multilingual.LangCountryCode)
     */
    languageCountryCode?: com_ever_edu_cms_content_dto_req_ContentExcelExportReqDto.languageCountryCode;
    lastVisitedBoRoleId?: number;
    menuId: number;
    downloadReason?: com_ever_edu_global_excel_dto_req_ExcelDownloadReasonReqDto;
    isMockUp?: boolean;
};
export namespace com_ever_edu_cms_content_dto_req_ContentExcelExportReqDto {
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
}

