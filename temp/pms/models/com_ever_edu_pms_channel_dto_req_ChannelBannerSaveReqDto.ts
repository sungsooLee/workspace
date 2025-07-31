/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_pms_channel_dto_req_ChannelBannerSaveReqDto = {
    /**
     * 배너 게재 위치 유형
     */
    channelBannerPositionType?: com_ever_edu_pms_channel_dto_req_ChannelBannerSaveReqDto.channelBannerPositionType;
    /**
     * 배너명
     */
    bannerName: string;
    /**
     * 배너 게시 시작일(yyyyMMdd)
     */
    startDate: string;
    /**
     * 배너 게시 종료일(yyyyMMdd)
     */
    endDate: string;
    /**
     * 노출여부
     */
    isDisplayed: boolean;
    /**
     * 배너 이미지 uuid
     */
    bannerImageFileGroupUuid: string;
    /**
     * 배너 타이틀
     */
    bannerTitle?: string;
    /**
     * 배너 버튼 텍스트
     */
    bannerButtonText?: string;
    /**
     * 배너 서브 타이블1
     */
    bannerSubTitle1?: string;
    /**
     * 배너 서브 타이블2
     */
    bannerSubTitle2?: string;
    /**
     * 배너 유형
     */
    channelBannerType: com_ever_edu_pms_channel_dto_req_ChannelBannerSaveReqDto.channelBannerType;
    /**
     * 랜딩 url
     */
    bannerButtonLinkUrl?: string;
};
export namespace com_ever_edu_pms_channel_dto_req_ChannelBannerSaveReqDto {
    /**
     * 배너 게재 위치 유형
     */
    export enum channelBannerPositionType {
        CHANNEL_HOME = 'CHANNEL_HOME',
    }
    /**
     * 배너 유형
     */
    export enum channelBannerType {
        COURSE = 'COURSE',
        PACKAGE = 'PACKAGE',
    }
}

