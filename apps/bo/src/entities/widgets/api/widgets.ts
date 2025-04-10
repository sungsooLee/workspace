import { PMSApiPrefix } from '@learnway/config';
import { httpService, FetchPaginationParam } from '@learnway/shared';
import { Tenant } from '../../../types';

export default class WidgetsService {
  static fetchWidgets(payload: { useYn?: boolean; widgetName?: string } | FetchPaginationParam) {
    return httpService.get<any>(`${PMSApiPrefix}/widgets`, payload);
  }
  static updateWidgets(payload: any) {
    return httpService.put<Tenant>(`/pms-module/admin/api/v1/i18n/${payload.messageId}`, payload);
  }
  static createWidgets(payload: any) {
    return httpService.post<Tenant>(`/pms-module/admin/api/v1/i18n`, payload);
  }
  static deleteWidgets(id: number) {
    return httpService.delete<Tenant>(`/pms-module/admin/api/v1/i18n`, { id });
  }
}
