/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_global_excel_dto_req_ExcelDownloadHistoryReqDto = {
    /**
     * 담당자 Id
     */
    coordinatorId?: number;
    /**
     * 화면 Id
     */
    screenId?: string;
    /**
     * 사유 유형코드. Enum(ExcelDownloadReasonType) - AFFAIRS|LEGAL_REQUEST|OUTSIDE_SUBMIT|RND|ETC
     */
    downloadReasonType?: string;
    /**
     * 사유 상세유형코드. <br> Enum(업무 목적: ExcelDownloadAffairsReasonType) - EDR01|EDR02|EDR03|EDR04 &lt;br&gt; Enum(법적·행정적 요구: ExcelDownloadLegalRequestReasonType) - EDR11|EDR12|EDR13 &lt;br&gt; Enum(외부 제출 및 협업: ExcelDownloadOutsideSubmitReasonType) - EDR21|EDR22 &lt;br&gt; Enum(연구 및 개발:ExcelDownloadRndReasonType) - EDR31|EDR32|EDR33 &lt;br&gt; Enum(기타(직접 입력): ExcelDownloadEtcReasonType) - EDR41 : 상세 직접 입력
     */
    downloadDetailReasonType?: string;
    /**
     * 사유 상세 직접 입력.  사유 상세유형코드가 EDR41(상세 직접 입력)인 경우
     */
    downloadDetailReason?: string;
    /**
     * 등록자ID
     */
    createdBy?: string;
};

