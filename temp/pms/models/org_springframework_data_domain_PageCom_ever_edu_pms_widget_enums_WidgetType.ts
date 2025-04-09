/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { org_springdoc_core_converters_models_SortObject } from './org_springdoc_core_converters_models_SortObject';
import type { PageableObject } from './PageableObject';
export type org_springframework_data_domain_PageCom_ever_edu_pms_widget_enums_WidgetType = {
    totalElements?: number;
    totalPages?: number;
    size?: number;
    content?: Array<'WEATHER' | 'STOCK' | 'NEWS'>;
    number?: number;
    sort?: Array<org_springdoc_core_converters_models_SortObject>;
    pageable?: PageableObject;
    numberOfElements?: number;
    first?: boolean;
    last?: boolean;
    empty?: boolean;
};

