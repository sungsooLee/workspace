/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_menu_entity_ApiMappingMenuEntity } from './com_ever_edu_pms_menu_entity_ApiMappingMenuEntity';
import type { com_ever_edu_pms_menu_entity_TenantMappingMenuEntity } from './com_ever_edu_pms_menu_entity_TenantMappingMenuEntity';
export type com_ever_edu_pms_menu_entity_MenuEntity = {
    createdDate?: string;
    modifiedDate?: string;
    createdBy?: string;
    lastModifiedBy?: string;
    menuId?: number;
    menuCode?: string;
    menuName?: string;
    path?: string;
    depth?: number;
    sortOrder?: number;
    isShortCutArea?: boolean;
    isDeleted?: boolean;
    isUsed?: boolean;
    isPersoninfoInclusion?: boolean;
    menuScope?: com_ever_edu_pms_menu_entity_MenuEntity.menuScope;
    isMobileExposed?: boolean;
    isWebExposed?: boolean;
    menuDesc?: string;
    isHiddenMenu?: boolean;
    parent?: com_ever_edu_pms_menu_entity_MenuEntity;
    childList?: Array<com_ever_edu_pms_menu_entity_MenuEntity>;
    tenantMappingMenuEntityList?: Array<com_ever_edu_pms_menu_entity_TenantMappingMenuEntity>;
    apiMappingMenuList?: Array<com_ever_edu_pms_menu_entity_ApiMappingMenuEntity>;
    sort?: number;
};
export namespace com_ever_edu_pms_menu_entity_MenuEntity {
    export enum menuScope {
        FO = 'FO',
        BO = 'BO',
        EX = 'EX',
    }
}

