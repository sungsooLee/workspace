/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_lms_enroll_dto_req_AdditionalInfoDto$LangLevelTestDto = {
    familyName?: string;
    firstName?: string;
    countryCode?: string;
    telNo?: string;
    preferGender?: com_ever_edu_lms_enroll_dto_req_AdditionalInfoDto$LangLevelTestDto.preferGender;
    availableTestDate1?: string;
    availableTestDate2?: string;
    preferLearnDate1?: string;
    preferLearnDate2?: string;
};
export namespace com_ever_edu_lms_enroll_dto_req_AdditionalInfoDto$LangLevelTestDto {
    export enum preferGender {
        MALE = 'MALE',
        FEMALE = 'FEMALE',
        DONT_CARE = 'DONT_CARE',
    }
}

