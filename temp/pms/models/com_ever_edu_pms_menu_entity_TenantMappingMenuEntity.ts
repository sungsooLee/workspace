/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_menu_entity_MenuEntity } from './com_ever_edu_pms_menu_entity_MenuEntity';
import type { com_ever_edu_pms_tenant_entity_TenantEntity } from './com_ever_edu_pms_tenant_entity_TenantEntity';
export type com_ever_edu_pms_menu_entity_TenantMappingMenuEntity = {
    createdBy?: string;
    createdDate?: string;
    tenantMappingMenuId?: number;
    menuEntity?: com_ever_edu_pms_menu_entity_MenuEntity;
    tenantEntity?: com_ever_edu_pms_tenant_entity_TenantEntity;
    sortOrder?: number;
    isUsed?: boolean;
    isDeleted?: boolean;
    menuCode?: string;
    path?: string;
    depth?: number;
    isShortCutArea?: boolean;
    isPersoninfoInclusion?: boolean;
    menuScope?: com_ever_edu_pms_menu_entity_TenantMappingMenuEntity.menuScope;
    menuStartDate?: string;
    menuEndDate?: string;
    parent?: com_ever_edu_pms_menu_entity_TenantMappingMenuEntity;
    childList?: Array<com_ever_edu_pms_menu_entity_TenantMappingMenuEntity>;
};
export namespace com_ever_edu_pms_menu_entity_TenantMappingMenuEntity {
    export enum menuScope {
        FO = 'FO',
        BO = 'BO',
        EX = 'EX',
    }
}

