/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_channel_entity_ChannelMappingTenantEntity } from './com_ever_edu_pms_channel_entity_ChannelMappingTenantEntity';
import type { com_ever_edu_pms_menu_entity_TenantMappingMenuEntity } from './com_ever_edu_pms_menu_entity_TenantMappingMenuEntity';
export type com_ever_edu_pms_tenant_entity_TenantEntity = {
    createdDate?: string;
    modifiedDate?: string;
    createdBy?: string;
    lastModifiedBy?: string;
    tenantId?: number;
    tenantName?: string;
    windowTitle?: string;
    logoImageUrl?: string;
    loginImageUrl?: string;
    channelMappingTenants?: Array<com_ever_edu_pms_channel_entity_ChannelMappingTenantEntity>;
    tenantMappingMenuEntityList?: Array<com_ever_edu_pms_menu_entity_TenantMappingMenuEntity>;
};

