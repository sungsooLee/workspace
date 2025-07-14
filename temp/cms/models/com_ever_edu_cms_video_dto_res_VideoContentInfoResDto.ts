/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_cms_video_dto_res_EncodedVideoResponseDto } from './com_ever_edu_cms_video_dto_res_EncodedVideoResponseDto';
import type { com_ever_edu_cms_video_dto_res_VideoSubtitleResDto } from './com_ever_edu_cms_video_dto_res_VideoSubtitleResDto';
export type com_ever_edu_cms_video_dto_res_VideoContentInfoResDto = {
    contentUuid?: string;
    contentName?: string;
    langCountryCode?: com_ever_edu_cms_video_dto_res_VideoContentInfoResDto.langCountryCode;
    masterVideo?: string;
    encodedVideos?: Array<com_ever_edu_cms_video_dto_res_EncodedVideoResponseDto>;
    videoDuration?: number;
    /**
     * 직전 비디오 종료 시간
     */
    lastVideoEndTime?: number;
    progress?: number;
    videoSubtitles?: Array<com_ever_edu_cms_video_dto_res_VideoSubtitleResDto>;
};
export namespace com_ever_edu_cms_video_dto_res_VideoContentInfoResDto {
    export enum langCountryCode {
        KO = 'KO',
        EN = 'EN',
        ES = 'ES',
        AR = 'AR',
        RU = 'RU',
        FR = 'FR',
        PT = 'PT',
        ID = 'ID',
        ZH = 'ZH',
        VI = 'VI',
        TR = 'TR',
        TH = 'TH',
        DE = 'DE',
        HE = 'HE',
        NE = 'NE',
        FA = 'FA',
        HI = 'HI',
        JA = 'JA',
        MS = 'MS',
        IT = 'IT',
        SK = 'SK',
        RO = 'RO',
        HR = 'HR',
        ET = 'ET',
    }
}

