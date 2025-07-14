/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_cms_content_dto_res_SharedBoxHistoryDestinationResDto } from './com_ever_edu_cms_content_dto_res_SharedBoxHistoryDestinationResDto';
export type com_ever_edu_cms_content_dto_res_SearchSharedBoxHistoryResDto = {
    /**
     * 공유 주체 콘텐츠 UUID
     */
    sourceContentUuid?: string;
    /**
     * 공유 주체 콘텐츠명
     */
    sourceContentName?: string;
    /**
     * 공유 주체 콘텐츠 국가 언어 코드
     */
    langCountryCodeName?: string;
    /**
     * 공유 주체 테넌트 ID
     */
    sourceTenantId?: number;
    /**
     * 공유 주체 테넌트명
     */
    sourceTenantName?: string;
    /**
     * 공유 주체 채널 UUID
     */
    sourceChannelUuid?: string;
    /**
     * 공유 주체 채널 이름
     */
    sourceChannelName?: string;
    /**
     * 공유 도착지 정보 목록
     */
    shareDestinations?: Array<com_ever_edu_cms_content_dto_res_SharedBoxHistoryDestinationResDto>;
};

