import { PMSApiPrefix } from '@learnway/config';
import { httpService, FetchPaginationParam, objectToQueryString } from '@learnway/shared';

export default class WidgetsService {
  static getWidgetsTenantMappings(tenantWidgetId: number): Promise<any> {
    return httpService.get<any>(`${PMSApiPrefix()}/widgets/tenant-mappings/${tenantWidgetId}`);
  }
  static putWidgetsTenantMappings(tenantWidgetId: number, body: any): Promise<any> {
    return httpService.put<any>(
      `${PMSApiPrefix()}/widgets/tenant-mappings/${tenantWidgetId}`,
      body,
    );
  }

  static deleteWidgetsTenantMappings(tenantWidgetId: number): Promise<any> {
    return httpService.delete<any>(`${PMSApiPrefix()}/widgets/tenant-mappings/${tenantWidgetId}`);
  }

  static moveWidgetsTenantMappings(tenantWidgetId: number, body: any): Promise<any> {
    return httpService.delete<any>(
      `${PMSApiPrefix()}/widgets/tenant-mappings/${tenantWidgetId}/dnd`,
      body,
    );
  }
  static postWidgetsTenantMappings(tenantId: number, body: any): Promise<any> {
    return httpService.delete<any>(`${PMSApiPrefix()}/widgets/tenant-mappings/${tenantId}`, body);
  }

  static fetchWidgets({
    isUsed,
    widgetName,
    size,
    page,
  }: { isUsed?: boolean; widgetName?: string } & FetchPaginationParam): Promise<any> {
    const url = objectToQueryString(`${PMSApiPrefix()}/widgets`, {
      widgetName,
      isUsed,
      size,
      page,
    });
    return httpService.get<any>(url);
  }
  static fetchWidget(widgetCode: string): Promise<any> {
    return httpService.get<any>(`${PMSApiPrefix()}/widgets/${widgetCode}`);
  }

  static getWidgetsWithTenant(): Promise<any> {
    return httpService.get<any>(`${PMSApiPrefix()}/widgets/with-tenant`);
  }

  static getWidgetsTenant(tenantId: number): Promise<any> {
    return httpService.get<any>(`${PMSApiPrefix()}/widgets/tenant/${tenantId}`);
  }
}
