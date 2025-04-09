/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_menu_dto_res_MenuResDto$ApiMappingMenuDto } from './com_ever_edu_pms_menu_dto_res_MenuResDto$ApiMappingMenuDto';
export type com_ever_edu_pms_menu_dto_res_MenuResDto$DetailOnAdmin = {
    menuId?: number;
    menuCode?: string;
    menuName?: string;
    path?: string;
    depth?: number;
    sortOrder?: number;
    quickAccessAreaYn?: boolean;
    useYn?: boolean;
    deleteYn?: boolean;
    personalDataContainYn?: boolean;
    visibleMobileYn?: boolean;
    visiblePcYn?: boolean;
    menuDesc?: string;
    parentId?: number;
    parentCode?: string;
    parentName?: string;
    apiMappingMenuList?: Array<com_ever_edu_pms_menu_dto_res_MenuResDto$ApiMappingMenuDto>;
};

