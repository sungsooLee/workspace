/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_pms_user_dto_req_UserSaveReqDto$SaveByAdminDto = {
    userName: string;
    emailAddress: string;
    employeeNumber: string;
    /**
     * 비밀번호
     */
    password?: string;
    userState: com_ever_edu_pms_user_dto_req_UserSaveReqDto$SaveByAdminDto.userState;
    companyCode?: string;
};
export namespace com_ever_edu_pms_user_dto_req_UserSaveReqDto$SaveByAdminDto {
    export enum userState {
        WAIT = 'WAIT',
        NORMAL = 'NORMAL',
        HALT = 'HALT',
        LEAVE = 'LEAVE',
        DELETE = 'DELETE',
    }
}

