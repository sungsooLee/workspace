/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_pms_labelmessage_dto_res_LabelMessageResDto$DetailOnAdmin = {
    labelMessageId?: number;
    labelMessageMultilingulKey?: string;
    labelMessageType?: com_ever_edu_pms_labelmessage_dto_res_LabelMessageResDto$DetailOnAdmin.labelMessageType;
    labelMessageName?: string;
    labelMessageDesc?: string;
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
export namespace com_ever_edu_pms_labelmessage_dto_res_LabelMessageResDto$DetailOnAdmin {
    export enum labelMessageType {
        LABEL = 'LABEL',
        MESSAGE = 'MESSAGE',
    }
}

