/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_menu_dto_res_TreeBaseDto } from './com_ever_edu_pms_menu_dto_res_TreeBaseDto';
export type com_ever_edu_pms_menu_dto_res_TenantMenuTreeDto = {
    parentId?: number;
    children?: Array<com_ever_edu_pms_menu_dto_res_TreeBaseDto>;
    tenantMappingMenuId?: number;
    tenantId?: number;
    menuId?: number;
    menuCode?: string;
    menuName?: string;
    path?: string;
    sortOrder?: number;
    menuDesc?: string;
    isUsed?: boolean;
    isMobileExposed?: boolean;
    isWebExposed?: boolean;
    isPersoninfoInclusion?: boolean;
    menuScope?: com_ever_edu_pms_menu_dto_res_TenantMenuTreeDto.menuScope;
    menuStartDate?: string;
    menuEndDate?: string;
};
export namespace com_ever_edu_pms_menu_dto_res_TenantMenuTreeDto {
    export enum menuScope {
        FO = 'FO',
        BO = 'BO',
        EX = 'EX',
    }
}

