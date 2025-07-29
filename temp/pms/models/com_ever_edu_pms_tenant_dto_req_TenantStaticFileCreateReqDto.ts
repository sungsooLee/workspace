/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_pms_tenant_dto_req_TenantStaticFileCreateReqDto = {
    /**
     * 파일 UUID
     */
    fileUuid: string;
    /**
     * 테넌트 ID
     */
    tenantId: number;
    /**
     * 로그인체크 여부
     */
    isLoginRequired: boolean;
    /**
     * 사용 여부
     */
    isUsed: boolean;
    /**
     * 유효기간 시작일
     */
    expiryStartDate?: string;
    /**
     * 유효기간 종료일
     */
    expiryEndDate?: string;
    /**
     * 설명
     */
    description?: string;
};

