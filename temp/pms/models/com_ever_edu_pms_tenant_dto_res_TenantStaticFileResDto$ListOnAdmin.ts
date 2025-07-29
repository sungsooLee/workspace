/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_pms_tenant_dto_res_TenantStaticFileResDto$ListOnAdmin = {
    /**
     * 파일ID
     */
    fileId?: number;
    /**
     * 파일UUID
     */
    fileUuid?: string;
    /**
     * 원본파일이름
     */
    originalFileName?: string;
    /**
     * 파일확장자명
     */
    fileExtension?: string;
    /**
     * 파일유형코드
     */
    fileType?: com_ever_edu_pms_tenant_dto_res_TenantStaticFileResDto$ListOnAdmin.fileType;
    /**
     * 테넌트ID
     */
    tenantId?: number;
    /**
     * 테넌트명
     */
    tenantName?: string;
    /**
     * 로그인체크여부
     */
    isLoginRequired?: boolean;
    /**
     * 사용여부
     */
    isUsed?: boolean;
    /**
     * 유효기간시작날짜
     */
    expiryStartDate?: string;
    /**
     * 유효기간종료날짜
     */
    expiryEndDate?: string;
    /**
     * 수정일
     */
    modifiedDate?: string;
};
export namespace com_ever_edu_pms_tenant_dto_res_TenantStaticFileResDto$ListOnAdmin {
    /**
     * 파일유형코드
     */
    export enum fileType {
        IMAGE = 'IMAGE',
        VIDEO = 'VIDEO',
        DOC = 'DOC',
        TXT = 'TXT',
        WEB = 'WEB',
        ZIP = 'ZIP',
        ETC = 'ETC',
    }
}

