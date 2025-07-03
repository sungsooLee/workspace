/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_pms_widget_dto_res_WidgetResDto$TenantWidgetListOnTenant = {
    /**
     * 테넌트위젯ID
     */
    tenantWidgetId?: number;
    /**
     * 위젯
     */
    widgetType?: com_ever_edu_pms_widget_dto_res_WidgetResDto$TenantWidgetListOnTenant.widgetType;
    /**
     * 정렬순서
     */
    sortOrder?: number;
};
export namespace com_ever_edu_pms_widget_dto_res_WidgetResDto$TenantWidgetListOnTenant {
    /**
     * 위젯
     */
    export enum widgetType {
        WEATHER = 'WEATHER',
        STOCK = 'STOCK',
        NEWS = 'NEWS',
    }
}

