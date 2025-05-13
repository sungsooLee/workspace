/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_pms_labelmessage_dto_req_LabelMessageSaveReqDto$LabelMessageDto = {
    /**
     * 라벨/메세지 다국어키
     */
    labelMessageMultilingulKey?: string | null;
    /**
     * 라벨/메세지 분류
     */
    labelMessageType?: com_ever_edu_pms_labelmessage_dto_req_LabelMessageSaveReqDto$LabelMessageDto.labelMessageType | null;
    /**
     * 라벨/메세지명
     */
    labelMessageName?: string | null;
    /**
     * 라벨/메세지설명
     */
    labelMessageDesc?: string | null;
    /**
     * 사용여부
     */
    isUsed?: boolean | null;
    /**
     * 삭제여부
     */
    isDeleted?: boolean | null;
};
export namespace com_ever_edu_pms_labelmessage_dto_req_LabelMessageSaveReqDto$LabelMessageDto {
    /**
     * 라벨/메세지 분류
     */
    export enum labelMessageType {
        LABEL = 'LABEL',
        MESSAGE = 'MESSAGE',
    }
}

