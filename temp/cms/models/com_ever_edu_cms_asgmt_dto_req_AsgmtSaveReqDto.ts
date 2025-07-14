/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_cms_asgmt_dto_req_AsgmtSaveReqDto = {
    /**
     * 과제 그룹 ID
     */
    contentId?: number;
    /**
     * 과제명
     */
    asgmtName?: string;
    /**
     * 과제 내용
     */
    asgmtText?: string;
    /**
     * 첨부파일 그룹 ID
     */
    attachFileGroupId?: number | null;
    /**
     * 답안 파일 ID
     */
    explainFileGroupId?: number | null;
    /**
     * 채점 기준 내용(위탁 과정)
     */
    scoringCriteria?: string | null;
    /**
     * 답안제출 옵션코드
     */
    submitType?: com_ever_edu_cms_asgmt_dto_req_AsgmtSaveReqDto.submitType | null;
};
export namespace com_ever_edu_cms_asgmt_dto_req_AsgmtSaveReqDto {
    /**
     * 답안제출 옵션코드
     */
    export enum submitType {
        OPTION = 'OPTION',
        FILE = 'FILE',
        TEXT = 'TEXT',
    }
}

