/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_pms_channel_entity_ChannelRequestEntity = {
    createdDate?: string;
    modifiedDate?: string;
    createdBy?: string;
    lastModifiedBy?: string;
    channelRequestId?: number;
    tenantId?: number;
    channelName?: string;
    channelMainId?: string;
    channelMainLinkContent?: string;
    channelTenatMappingType?: com_ever_edu_pms_channel_entity_ChannelRequestEntity.channelTenatMappingType;
    channelSecretType?: com_ever_edu_pms_channel_entity_ChannelRequestEntity.channelSecretType;
    channelLearningContent?: string;
    channelPurposeContent?: string;
    channelRequestorId?: number;
    approverId?: number;
    approvalDate?: string;
    approvalStatusType?: com_ever_edu_pms_channel_entity_ChannelRequestEntity.approvalStatusType;
    isChannelCreationMailSend?: boolean;
    rejectedReasonContent?: string;
    isUsed?: boolean;
    isDeleted?: boolean;
    channelRequestUuid?: string;
};
export namespace com_ever_edu_pms_channel_entity_ChannelRequestEntity {
    export enum channelTenatMappingType {
        MAPPING_TENANT = 'MAPPING_TENANT',
        ALL_TENANT = 'ALL_TENANT',
    }
    export enum channelSecretType {
        NOT_SECRET = 'NOT_SECRET',
        SECRET = 'SECRET',
    }
    export enum approvalStatusType {
        PENDING = 'PENDING',
        APPROVED = 'APPROVED',
        REJECTED = 'REJECTED',
    }
}

