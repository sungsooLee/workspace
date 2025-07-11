/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_cms_asgmt_dto_req_AsgmtUpdateReqDto = {
    /**
     * 과제명
     */
    asgmtName?: string | null;
    /**
     * 과제 내용
     */
    asgmtText?: string | null;
    /**
     * 첨부파일 그룹 ID
     */
    attachFileGroupId?: number;
    /**
     * 답안 파일 ID
     */
    explainFileGroupId?: number;
    /**
     * 채점 기준 내용(위탁 과정)
     */
    scoringCriteria?: string;
    /**
     * 답안제출 옵션코드
     */
    submitType?: com_ever_edu_cms_asgmt_dto_req_AsgmtUpdateReqDto.submitType | null;
};
export namespace com_ever_edu_cms_asgmt_dto_req_AsgmtUpdateReqDto {
    /**
     * 답안제출 옵션코드
     */
    export enum submitType {
        OPTION = 'OPTION',
        FILE = 'FILE',
        TEXT = 'TEXT',
    }
}

