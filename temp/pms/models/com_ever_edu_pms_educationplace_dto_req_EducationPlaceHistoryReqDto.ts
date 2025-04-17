/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_pms_educationplace_dto_req_EducationPlaceHistoryReqDto = {
    uuid?: string;
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
     * 이력구분코드
     */
    educationHistoryTypecd?: com_ever_edu_pms_educationplace_dto_req_EducationPlaceHistoryReqDto.educationHistoryTypecd;
};
export namespace com_ever_edu_pms_educationplace_dto_req_EducationPlaceHistoryReqDto {
    /**
     * 이력구분코드
     */
    export enum educationHistoryTypecd {
        TEMP_SAVE = 'TEMP_SAVE',
        REGISTER = 'REGISTER',
        UPDATE = 'UPDATE',
        APPROVED = 'APPROVED',
        REJECTED = 'REJECTED',
        CANCEL = 'CANCEL',
    }
}

