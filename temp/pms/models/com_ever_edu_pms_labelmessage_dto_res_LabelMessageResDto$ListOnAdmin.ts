/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_pms_labelmessage_dto_res_LabelMessageResDto$ListOnAdmin = {
    /**
     * 라벨/메세지 ID
     */
    labelMessageId?: number;
    /**
     * 라벨/메세지 코드
     */
    labelMessageMultilingulKey?: string;
    /**
     * 라벨/메세지 분류
     */
    labelMessageType?: com_ever_edu_pms_labelmessage_dto_res_LabelMessageResDto$ListOnAdmin.labelMessageType;
    /**
     * 라벨/메세지 명
     */
    labelMessageName?: string;
    /**
     * 라벨/메세지 설명
     */
    labelMessageDesc?: string;
    /**
     * 사용여부
     */
    isUsed?: boolean;
    /**
     * 등록자
     */
    createdBy?: string;
    /**
     * 등록일
     */
    createdDate?: string;
    /**
     * 수정자
     */
    lastModifiedBy?: string;
    /**
     * 수정일
     */
    modifiedDate?: string;
};
export namespace com_ever_edu_pms_labelmessage_dto_res_LabelMessageResDto$ListOnAdmin {
    /**
     * 라벨/메세지 분류
     */
    export enum labelMessageType {
        LABEL = 'LABEL',
        MESSAGE = 'MESSAGE',
    }
}

