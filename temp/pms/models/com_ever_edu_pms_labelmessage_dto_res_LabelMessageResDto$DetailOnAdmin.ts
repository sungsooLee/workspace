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
    useYn?: boolean;
    deleteYn?: boolean;
};
export namespace com_ever_edu_pms_labelmessage_dto_res_LabelMessageResDto$DetailOnAdmin {
    export enum labelMessageType {
        LABEL = 'LABEL',
        MESSAGE = 'MESSAGE',
    }
}

