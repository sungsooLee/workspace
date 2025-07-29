/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_lms_enroll_dto_res_EnrollResDto$LangLevelTest = {
    enrollId?: number;
    availableTestDate1?: string;
    availableTestDate2?: string;
    countryCode?: string;
    courseId?: number;
    familyName?: string;
    firstName?: string;
    preferGender?: com_ever_edu_lms_enroll_dto_res_EnrollResDto$LangLevelTest.preferGender;
    preferLearnDate1?: string;
    preferLearnDate2?: string;
    telNo?: string;
};
export namespace com_ever_edu_lms_enroll_dto_res_EnrollResDto$LangLevelTest {
    export enum preferGender {
        MALE = 'MALE',
        FEMALE = 'FEMALE',
        DONT_CARE = 'DONT_CARE',
    }
}

