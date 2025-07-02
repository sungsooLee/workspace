/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_lms_instructor_dto_res_InstructorSearchResDto } from './com_ever_edu_lms_instructor_dto_res_InstructorSearchResDto';
import type { org_springdoc_core_converters_models_SortObject } from './org_springdoc_core_converters_models_SortObject';
import type { PageableObject } from './PageableObject';
export type org_springframework_data_domain_PageCom_ever_edu_lms_instructor_dto_res_InstructorSearchResDto = {
    totalPages?: number;
    totalElements?: number;
    size?: number;
    content?: Array<com_ever_edu_lms_instructor_dto_res_InstructorSearchResDto>;
    number?: number;
    sort?: Array<org_springdoc_core_converters_models_SortObject>;
    numberOfElements?: number;
    pageable?: PageableObject;
    first?: boolean;
    last?: boolean;
    empty?: boolean;
};

