/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_global_excel_dto_req_ExcelDownloadHistoryReqDto = {
    /**
     * 담당자 Id
     */
    coordinatorId: number;
    /**
     * 메뉴 Id
     */
    menuId: number;
    /**
     * 사유 유형코드(그룹코드 : pms.excel.DownloadReasonTypeCode) - AFFAIRS|LEGAL_REQUEST|OUTSIDE_SUBMIT|RND|ETC
     */
    downloadReasonType: com_ever_edu_global_excel_dto_req_ExcelDownloadHistoryReqDto.downloadReasonType;
    /**
     * 사유유형 별 상세유형코드. <br>- 업무목적 상세유형코드(그룹코드 : pms.excel.DownloadAffairsReasonTypeCode) <br>- 법적·행정적요구 상세유형코드(그룹코드 : pms.excel.DownloadLegalRequestReasonTypeCode) <br>- 외부제출및협업 상세유형코드(그룹코드 : pms.excel.DownloadOutsideSubmitReasonTypeCode) <br>- 연구및개발 상세유형코드(그룹코드 : pms.excel.DownloadRndReasonTypeCode) <br>- 기타(직접 입력) 상세유형코드(그룹코드 : pms.excel.DownloadEtcReasonTypeCode)
     */
    downloadDetailReasonType: string;
    /**
     * 사유 상세 직접 입력. 사유 상세유형코드가 직접 입력인 경우에 사용
     */
    downloadDetailReason?: string | null;
    /**
     * 엑셀 다운로드 파라메터
     */
    downloadParameter?: string | null;
    /**
     * 등록자ID
     */
    createdBy?: string;
};
export namespace com_ever_edu_global_excel_dto_req_ExcelDownloadHistoryReqDto {
    /**
     * 사유 유형코드(그룹코드 : pms.excel.DownloadReasonTypeCode) - AFFAIRS|LEGAL_REQUEST|OUTSIDE_SUBMIT|RND|ETC
     */
    export enum downloadReasonType {
        AFFAIRS = 'AFFAIRS',
        LEGAL_REQUEST = 'LEGAL_REQUEST',
        OUTSIDE_SUBMIT = 'OUTSIDE_SUBMIT',
        RND = 'RND',
        ETC = 'ETC',
    }
}

