/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_pms_user_dto_req_UserUpdateReqDto$UpdateByAdminDto = {
    userName: string;
    emailAddress: string;
    userState?: com_ever_edu_pms_user_dto_req_UserUpdateReqDto$UpdateByAdminDto.userState;
    companyCode?: string;
};
export namespace com_ever_edu_pms_user_dto_req_UserUpdateReqDto$UpdateByAdminDto {
    export enum userState {
        WAIT = 'WAIT',
        NORMAL = 'NORMAL',
        HALT = 'HALT',
        LEAVE = 'LEAVE',
        DELETE = 'DELETE',
    }
}

