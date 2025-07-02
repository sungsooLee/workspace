import { httpService } from '@learnway/shared';
import { CMSApiPrefix } from '@learnway/config';

export default class ScormRteService {
  static commit(payload: any): Promise<any> {
    return httpService.put<any>(`${CMSApiPrefix()}/scorm/rte/commit`, payload);
  }

  static getValue(param: any): Promise<any> {
    return httpService.get<any>(`${CMSApiPrefix()}/scorm/rte/value`, param);
  }

  static setValue(payload: any): Promise<any> {
    return httpService.post<any>(`${CMSApiPrefix()}/scorm/rte/value`, payload);
  }

  static initialize(payload: any): Promise<any> {
    return httpService.post<any>(`${CMSApiPrefix()}/scorm/rte/initialize`, payload);
  }

  static terminate(payload: any): Promise<any> {
    return httpService.delete<any>(`${CMSApiPrefix()}/scorm/rte/terminate`, payload);
  }

  static setLastError(errorCode: string, payload: any): Promise<any> {
    return httpService.post<any>(`${CMSApiPrefix()}/scorm/rte/error/${errorCode}`, payload);
  }

  static getErrorString(param: any): Promise<any> {
    return httpService.get<any>(`${CMSApiPrefix()}/scorm/rte/error/message`, param);
  }

  static getDiagnostic(param: any): Promise<any> {
    return httpService.get<any>(`${CMSApiPrefix()}/scorm/rte/error/diagnostic`, param);
  }

  static getLastError(param: any): Promise<any> {
    return httpService.get<any>(`${CMSApiPrefix()}/scorm/rte/error/code`, param);
  }

  static getScoUrl(param: any) {
    return httpService.get<any>(`${CMSApiPrefix()}/scorm/rte/sco/url`, param);
  }
}
