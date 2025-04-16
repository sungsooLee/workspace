import { PMSApiPrefix } from '@learnway/config';
import { httpService, FetchPaginationParam, objectToQueryString } from '@learnway/shared';
import { Tenant } from '../../../types';

export default class WidgetsService {
  static fetchWidgets({
    isUsed,
    widgetName,
    size,
    page,
  }: { isUsed?: boolean; widgetName?: string } & FetchPaginationParam) {
    const url = objectToQueryString(`${PMSApiPrefix()}/widgets`, {
      widgetName,
      isUsed,
      size,
      page,
    });
    return httpService.get<any>(url);
  }
  static fetchWidget(widgetCode: string) {
    return httpService.get<any>(`${PMSApiPrefix()}/widgets/${widgetCode}`);
  }
}
