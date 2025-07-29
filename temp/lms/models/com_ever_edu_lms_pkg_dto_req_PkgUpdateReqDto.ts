/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_lms_pkg_dto_req_PkgUpdateReqDto = {
    /**
     * 패키지 이름
     */
    packageName: string;
    /**
     * 패키지 설명
     */
    description?: string;
    /**
     * 사용 여부
     */
    isUsed: boolean;
    /**
     * 노출 시작일시
     */
    exposureStartDt?: string;
    /**
     * 노출 종료일시
     */
    exposureEndDt?: string;
    /**
     * 언어 코드
     */
    language: string;
    /**
     * 테넌트 ID 목록
     */
    tenantIds?: Array<number>;
};

