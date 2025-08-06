import { PMSApiPrefix } from '@learnway/config';
import { httpService } from '@learnway/shared';
import { PaginationResponse } from '@shared/types/api';
import { AxiosResponse } from 'axios';
import {
  MultilingualListItem,
  MultilingualQueryParams,
  MultilingualUpdateReqParams,
} from '../model/multilingual.types';

export default class TranslationService {
  // 다국어 관리 - 목록 조회
  static fetchTranslations<T = MultilingualListItem>(
    params: MultilingualQueryParams,
  ): Promise<PaginationResponse<T>> {
    return httpService.get<PaginationResponse<T>>(`${PMSApiPrefix()}/multilingual`, params);
  }

  // 다국어 관리 - 저장
  static updateTranslation(payload: MultilingualUpdateReqParams) {
    return httpService.put<AxiosResponse>(`${PMSApiPrefix()}/multilingual`, payload);
  }

  // 다국어 관리 - 배포
  static deployTranslation(payload: any) {
    const { locale } = payload;
    return httpService.post<any>(
      `${PMSApiPrefix()}/multilingual/${locale}/multilingualJson`,
      payload,
    );
  }

  // 다국어 번역상태 팝업 조회
  static fetchTranslationStatus(multilingualId: number) {
    return httpService.get<any>(
      `${PMSApiPrefix()}/multilingual/${multilingualId}/language-statuses`,
    );
  }

  static createTranslationByExcel(payload: any, params: { targetLocale: string }) {
    const { targetLocale } = params;
    return httpService.post<any>(
      `${PMSApiPrefix()}/multilingual/excelUpload?targetLocale=${targetLocale}`,
      payload,
    );
  }

  static fetchTranslationExists({
    keyTypeCode,
    messageCode,
  }: {
    keyTypeCode: string;
    messageCode: string;
  }) {
    return httpService.get<any>(
      `${PMSApiPrefix()}/multilingual/exists?keyTypeCode=${keyTypeCode}&messageCode=${messageCode}`,
    );
  }
}
