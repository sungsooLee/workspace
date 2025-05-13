/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_channel_dto_res_ChannelResDto } from './com_ever_edu_pms_channel_dto_res_ChannelResDto';
import type { org_springdoc_core_converters_models_SortObject } from './org_springdoc_core_converters_models_SortObject';
import type { PageableObject } from './PageableObject';
export type org_springframework_data_domain_PageCom_ever_edu_pms_channel_dto_res_ChannelResDto = {
    totalElements?: number;
    totalPages?: number;
    size?: number;
    content?: Array<com_ever_edu_pms_channel_dto_res_ChannelResDto>;
    number?: number;
    sort?: Array<org_springdoc_core_converters_models_SortObject>;
    first?: boolean;
    last?: boolean;
    numberOfElements?: number;
    pageable?: PageableObject;
    empty?: boolean;
};

