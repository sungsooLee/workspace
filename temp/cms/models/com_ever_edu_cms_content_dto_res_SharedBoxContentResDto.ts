/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_cms_content_dto_res_SharedBoxContentResDto$ShareDestinationResDto } from './com_ever_edu_cms_content_dto_res_SharedBoxContentResDto$ShareDestinationResDto';
export type com_ever_edu_cms_content_dto_res_SharedBoxContentResDto = {
    /**
     * 콘텐츠 UUID
     */
    contentUuid?: string;
    /**
     * 출발지 테넌트 id
     */
    sourceTenantId?: number;
    /**
     * 출발지 채널 UUID
     */
    sourceChannelUuid?: string;
    /**
     * 원본파일 다운로드 여부
     */
    isOriginalCopyDownload?: boolean;
    /**
     * 공유 도착지 정보 목록
     */
    shareDestinations?: Array<com_ever_edu_cms_content_dto_res_SharedBoxContentResDto$ShareDestinationResDto>;
};

