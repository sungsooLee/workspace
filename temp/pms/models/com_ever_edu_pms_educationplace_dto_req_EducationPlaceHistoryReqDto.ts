/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_pms_educationplace_dto_req_EducationPlaceHistoryReqDto = {
    /**
     * 테넌트명
     */
    tentantName?: string;
    /**
     * 담당자
     */
    managerName?: string;
    /**
     * 아이디(이메일)
     */
    managerId?: string;
    /**
     * 이력구분
     */
    educationHistoryType?: com_ever_edu_pms_educationplace_dto_req_EducationPlaceHistoryReqDto.educationHistoryType;
};
export namespace com_ever_edu_pms_educationplace_dto_req_EducationPlaceHistoryReqDto {
    /**
     * 이력구분
     */
    export enum educationHistoryType {
        TEMP_SAVE = 'TEMP_SAVE',
        REGISTER = 'REGISTER',
        UPDATE = 'UPDATE',
        APPROVED = 'APPROVED',
        REJECTED = 'REJECTED',
        CANCEL = 'CANCEL',
    }
}

