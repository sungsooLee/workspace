/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_pms_widget_dto_req_WidgetSearchReqDto$SearchByTenant = {
    /**
     * 테넌트 ID
     */
    tenantId?: number;
    /**
     * 위젯명
     */
    widgetName?: string | null;
    /**
     * 디바이스
     */
    deviceType?: com_ever_edu_pms_widget_dto_req_WidgetSearchReqDto$SearchByTenant.deviceType | null;
    /**
     * 테넌트적용여부
     */
    tenantApplied?: boolean | null;
};
export namespace com_ever_edu_pms_widget_dto_req_WidgetSearchReqDto$SearchByTenant {
    /**
     * 디바이스
     */
    export enum deviceType {
        ALL = 'ALL',
        PC = 'PC',
        MOBILE = 'MOBILE',
    }
}

