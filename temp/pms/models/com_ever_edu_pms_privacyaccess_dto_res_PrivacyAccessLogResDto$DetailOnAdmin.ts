/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_pms_privacyaccess_dto_res_PrivacyAccessLogResDto$DetailOnAdmin = {
    excelDownloadId?: number;
    email?: string;
    companyId?: number;
    companyName?: string;
    userName?: string;
    employeeNumber?: string;
    deptId?: number;
    deptName?: string;
    phoneNumber?: string;
    companyPhoneNumber?: string;
    positionName?: string;
    menuId?: number;
    menuPath?: string;
    requestParameter?: string;
    dataCount?: number;
    downloadReasonType?: string;
    downloadDetailReasonType?: string;
    networkTypeCode?: com_ever_edu_pms_privacyaccess_dto_res_PrivacyAccessLogResDto$DetailOnAdmin.networkTypeCode;
    userIp?: string;
    createdDate?: string;
};
export namespace com_ever_edu_pms_privacyaccess_dto_res_PrivacyAccessLogResDto$DetailOnAdmin {
    export enum networkTypeCode {
        INTERNAL = 'INTERNAL',
        EXTERNAL = 'EXTERNAL',
    }
}

