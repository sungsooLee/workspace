/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_pms_labelmessage_dto_req_LabelMessageSearchReqDto$SearchByAdmin = {
    /**
     * 라벨/메세지 다국어키
     */
    labelMessageMultilingulKey?: string | null;
    /**
     * 라벨/메세지 분류
     */
    labelMessageType?: com_ever_edu_pms_labelmessage_dto_req_LabelMessageSearchReqDto$SearchByAdmin.labelMessageType | null;
    /**
     * 라벨/메세지명
     */
    labelMessageName?: string | null;
    /**
     * 사용여부
     */
    isUsed?: boolean;
};
export namespace com_ever_edu_pms_labelmessage_dto_req_LabelMessageSearchReqDto$SearchByAdmin {
    /**
     * 라벨/메세지 분류
     */
    export enum labelMessageType {
        LABEL = 'LABEL',
        MESSAGE = 'MESSAGE',
    }
}

