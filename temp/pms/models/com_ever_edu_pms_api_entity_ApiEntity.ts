/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_menu_entity_ApiMappingMenuEntity } from './com_ever_edu_pms_menu_entity_ApiMappingMenuEntity';
export type com_ever_edu_pms_api_entity_ApiEntity = {
    createdDate?: string;
    modifiedDate?: string;
    createdBy?: string;
    lastModifiedBy?: string;
    apiId?: number;
    apiName?: string;
    apiDesc?: string;
    apiUrl?: string;
    apiScope?: com_ever_edu_pms_api_entity_ApiEntity.apiScope;
    apiMethod?: com_ever_edu_pms_api_entity_ApiEntity.apiMethod;
    depth?: number;
    sortOrder?: number;
    isUsed?: boolean;
    isDeleted?: boolean;
    parent?: com_ever_edu_pms_api_entity_ApiEntity;
    apiMappingMenuEntityList?: Array<com_ever_edu_pms_menu_entity_ApiMappingMenuEntity>;
};
export namespace com_ever_edu_pms_api_entity_ApiEntity {
    export enum apiScope {
        FO = 'FO',
        BO = 'BO',
    }
    export enum apiMethod {
        GET = 'GET',
        PUT = 'PUT',
        POST = 'POST',
        DELETE = 'DELETE',
    }
}

