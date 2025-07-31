import { PaginationRequest } from './api';

export enum keyTypeCode {
  SYSTEM_COMMON_CODE = 'SYSTEM_COMMON_CODE',
  LEARNER_MENU = 'LEARNER_MENU',
  HRD_CENTER_MENU = 'HRD_CENTER_MENU',
  LABEL = 'LABEL',
  MESSAGE = 'MESSAGE' }

export type MultilingualExcel = {
  no?: number;
  keyTypeCode?: keyTypeCode;
  multilingualKey?: string;
  baseLanguage?: string;
  targetLanguage?: string;
};

export interface MultilingualQueryParams extends PaginationRequest {
  /**
   * 다국어 분류
   */
  keyTypeCode?: keyTypeCode;
  /**
   * 번역 언어
   */
  targetLocale?: string;
  /**
   * 번역상태
   */
  isTranslated?: boolean;
  /**
   * 다국어 코드
   */
  multilingualKey?: string;
  /**
   * 기준명
   */
  translation?: string;

  roleId?: number;

  tenantId?: number;
}

export type MultilingualUpdateReqDto = {
  /**
   * 다국어코드
   */
  multilingualKey: string;
  /**
   * 번역값
   */
  translation: string;
};

export type MultilingualUpdateReqParams = {
  /**
   * 분류값
   */
  keyTypeCode: keyTypeCode;
  /**
   * 번역언어
   */
  targetLocale: string;
  /**
   * 번역 리스트
   */
  translations: Array<MultilingualUpdateReqDto>;
};

export type MultilingualListItem = {
  /**
   * 다국어 ID
   */
  multilingualId?: number;
  /**
   * 다국어 분류
   */
  keyType?: keyTypeCode;
  /**
   * 다국어 분류명
   */
  keyTypeName?: string;
  /**
   * 다국어 코드
   */
  multilingualKey?: string;
  /**
   * 기준명(한국어)
   */
  baseLanguage?: string;
  /**
   * 번역명(번역언어)
   */
  targetLanguage?: string;
  /**
   * 번역 언어
   */
  targetLocale?: string;
  /**
   * 목록 번역언어 기준 번역완료수
   */
  targetTranslatedCount?: number;
  /**
   * 번역완료 번역 수
   */
  totalTranslatedCount?: number;
  /**
   * 번역완료 총 언어셋 수
   */
  totalLocaleCount?: number;
  /**
   * 수정일
   */
  modifiedDate?: string;
  /**
   * 수정자
   */
  lastModifiedBy?: string;
};
