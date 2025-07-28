/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * 교육장소Id(공간선택)
 */
export type com_ever_edu_lms_space_entity_LearningSpaceEntity = {
    createdDate?: string;
    modifiedDate?: string;
    createdBy?: string;
    lastModifiedBy?: string;
    learningSpaceId?: number;
    learningSpaceName?: string;
    onOffLineType?: com_ever_edu_lms_space_entity_LearningSpaceEntity.onOffLineType;
    learningSpaceCode?: string;
    mapFileGroupUuid?: string;
    postalCode?: string;
    address?: string;
    addressDetail?: string;
    linkUrl?: string;
    notes?: string;
    isUsed?: boolean;
    isDeleted?: boolean;
    tenantId?: number;
};
export namespace com_ever_edu_lms_space_entity_LearningSpaceEntity {
    export enum onOffLineType {
        ONLINE = 'ONLINE',
        OFFLINE = 'OFFLINE',
    }
}

