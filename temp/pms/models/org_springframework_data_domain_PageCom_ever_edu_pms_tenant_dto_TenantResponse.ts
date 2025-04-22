/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_tenant_dto_TenantResponse } from './com_ever_edu_pms_tenant_dto_TenantResponse';
import type { org_springdoc_core_converters_models_SortObject } from './org_springdoc_core_converters_models_SortObject';
import type { PageableObject } from './PageableObject';
export type org_springframework_data_domain_PageCom_ever_edu_pms_tenant_dto_TenantResponse = {
    totalPages?: number;
    totalElements?: number;
    size?: number;
    content?: Array<com_ever_edu_pms_tenant_dto_TenantResponse>;
    number?: number;
    sort?: Array<org_springdoc_core_converters_models_SortObject>;
    numberOfElements?: number;
    pageable?: PageableObject;
    first?: boolean;
    last?: boolean;
    empty?: boolean;
};

