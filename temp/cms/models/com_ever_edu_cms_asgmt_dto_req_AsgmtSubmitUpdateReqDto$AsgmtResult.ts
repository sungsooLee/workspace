/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_cms_asgmt_dto_req_AsgmtSubmitUpdateReqDto$AsgmtResult = {
    /**
     * 점수
     */
    score?: number;
    /**
     * 리뷰 제목
     */
    reviewTitle?: string | null;
    /**
     * 리뷰 내용
     */
    reviewText?: string | null;
    /**
     * 리뷰 첨부파일
     */
    reviewFileId?: number | null;
    /**
     * 채점 결과
     */
    statusCode?: com_ever_edu_cms_asgmt_dto_req_AsgmtSubmitUpdateReqDto$AsgmtResult.statusCode;
};
export namespace com_ever_edu_cms_asgmt_dto_req_AsgmtSubmitUpdateReqDto$AsgmtResult {
    /**
     * 채점 결과
     */
    export enum statusCode {
        SUBMITTED = 'SUBMITTED',
        SCORED = 'SCORED',
        REJECTED = 'REJECTED',
    }
}

