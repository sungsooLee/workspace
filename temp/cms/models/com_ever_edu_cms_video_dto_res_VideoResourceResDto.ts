/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_cms_video_dto_res_EncodedAudioResponseDto } from './com_ever_edu_cms_video_dto_res_EncodedAudioResponseDto';
import type { com_ever_edu_cms_video_dto_res_EncodedVideoResponseDto } from './com_ever_edu_cms_video_dto_res_EncodedVideoResponseDto';
import type { com_ever_edu_cms_video_dto_res_VideoSubtitleResDto } from './com_ever_edu_cms_video_dto_res_VideoSubtitleResDto';
import type { com_ever_edu_external_file_dto_FileInfoDto } from './com_ever_edu_external_file_dto_FileInfoDto';
export type com_ever_edu_cms_video_dto_res_VideoResourceResDto = {
    contentUuid?: string;
    contentName?: string;
    languageCountryCode?: com_ever_edu_cms_video_dto_res_VideoResourceResDto.languageCountryCode;
    contentStatusCode?: com_ever_edu_cms_video_dto_res_VideoResourceResDto.contentStatusCode;
    fileInfo?: com_ever_edu_external_file_dto_FileInfoDto;
    masterVideo?: string;
    contentAddInfo?: number;
    encodedVideos?: Array<com_ever_edu_cms_video_dto_res_EncodedVideoResponseDto>;
    encodedAudios?: Array<com_ever_edu_cms_video_dto_res_EncodedAudioResponseDto>;
    videoSubtitles?: Array<com_ever_edu_cms_video_dto_res_VideoSubtitleResDto>;
};
export namespace com_ever_edu_cms_video_dto_res_VideoResourceResDto {
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
    export enum contentStatusCode {
        TEMPORARY_SAVE = 'TEMPORARY_SAVE',
        SAVE = 'SAVE',
        DELETE = 'DELETE',
    }
}

