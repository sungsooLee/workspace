import { httpService } from '@learnway/shared';
import { CMSApiPrefix } from '@learnway/config';

export const scormRteApi = {
  commit: (payload: any) => {
    return httpService.put<any>(`${CMSApiPrefix()}/scorm/rte/commit`, payload);
  },

  getValue: (param: any) => {
    return httpService.get<any>(`${CMSApiPrefix()}/scorm/rte/value`, param);
  },

  setValue: (payload: any) => {
    return httpService.post<any>(`${CMSApiPrefix()}/scorm/rte/value`, payload);
  },

  initialize: (payload: any) => {
    return httpService.post<any>(`${CMSApiPrefix()}/scorm/rte/initialize`, payload);
  },

  terminate: (payload: any) => {
    return httpService.delete<any>(`${CMSApiPrefix()}/scorm/rte/terminate`, payload);
  },

  getErrorString: (param: any) => {
    return httpService.get<any>(`${CMSApiPrefix()}/scorm/rte/error/message`, param);
  },

  getDiagnostic: (param: any) => {
    return httpService.get<any>(`${CMSApiPrefix()}/scorm/rte/error/diagnostic`, param);
  },

  getLastError: (param: any) => {
    return httpService.get<any>(`${CMSApiPrefix()}/scorm/rte/error/code`, param);
  },

  getScoInfo: (param: any) => {
    return httpService.get<any>(`${CMSApiPrefix()}/scorm/rte/sco/info`, param);
  },
};
