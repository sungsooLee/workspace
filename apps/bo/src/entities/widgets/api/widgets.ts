import { PMSApiPrefix } from '@learnway/config';
import { httpService, FetchPaginationParam, objectToQueryString } from '@learnway/shared';
import { Tenant } from '../../../types';

export default class WidgetsService {
  static fetchWidgets({
    useYn,
    widgetName,
    size,
    page,
  }: { useYn?: boolean; widgetName?: string } & FetchPaginationParam) {
    const url = objectToQueryString(`${PMSApiPrefix()}/widgets`, { widgetName, useYn, size, page });
    console.log('fetchWidgets', url);
    return httpService.get<any>(url);
  }
  static fetchWidget(widgetCode: string) {
    return httpService.get<any>(`${PMSApiPrefix()}/widgets?code=${widgetCode}`);
  }
}
