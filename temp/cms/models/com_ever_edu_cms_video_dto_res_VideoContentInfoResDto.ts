/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_cms_video_dto_res_EncodedAudioResponseDto } from './com_ever_edu_cms_video_dto_res_EncodedAudioResponseDto';
import type { com_ever_edu_cms_video_dto_res_EncodedVideoResponseDto } from './com_ever_edu_cms_video_dto_res_EncodedVideoResponseDto';
import type { com_ever_edu_cms_video_dto_res_VideoSubtitleResDto } from './com_ever_edu_cms_video_dto_res_VideoSubtitleResDto';
export type com_ever_edu_cms_video_dto_res_VideoContentInfoResDto = {
    contentUuid?: string;
    contentName?: string;
    masterVideo?: string;
    encodedVideos?: Array<com_ever_edu_cms_video_dto_res_EncodedVideoResponseDto>;
    videoSubtitles?: Array<com_ever_edu_cms_video_dto_res_VideoSubtitleResDto>;
    videoDuration?: number;
    /**
     * 직전 비디오 종료 시간
     */
    lastVideoEndTime?: number;
    progress?: number;
    languageCountryCode?: com_ever_edu_cms_video_dto_res_VideoContentInfoResDto.languageCountryCode;
    encodedAudios?: Array<com_ever_edu_cms_video_dto_res_EncodedAudioResponseDto>;
};
export namespace com_ever_edu_cms_video_dto_res_VideoContentInfoResDto {
    export enum languageCountryCode {
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

