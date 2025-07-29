/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_lms_pkg_dto_res_PkgResDto = {
    packageId?: number;
    packageName?: string;
    description?: string;
    channelName?: string;
    channelUuid?: string;
    isUsed?: boolean;
    exposureStartDt?: string;
    exposureEndDt?: string;
    language?: string;
    /**
     * 테넌트 ID 목록
     */
    tenantIds?: Array<number>;
};

