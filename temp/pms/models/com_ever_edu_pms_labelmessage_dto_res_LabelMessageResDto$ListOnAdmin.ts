/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_pms_labelmessage_dto_res_LabelMessageResDto$ListOnAdmin = {
    labelMessageId?: number;
    labelMessageMultilingulKey?: string;
    labelMessageType?: com_ever_edu_pms_labelmessage_dto_res_LabelMessageResDto$ListOnAdmin.labelMessageType;
    labelMessageName?: string;
    labelMessageDesc?: string;
    useYn?: boolean;
    deleteYn?: boolean;
    firstRgstrId?: string;
    firstRegTmstamp?: string;
    finalUpdaterId?: string;
    finalUpdateTmstamp?: string;
};
export namespace com_ever_edu_pms_labelmessage_dto_res_LabelMessageResDto$ListOnAdmin {
    export enum labelMessageType {
        LABEL = 'LABEL',
        MESSAGE = 'MESSAGE',
    }
}

