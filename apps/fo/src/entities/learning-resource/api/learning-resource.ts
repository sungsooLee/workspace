import { fileDownload, httpService } from '@learnway/shared';
import { CMSApiPrefix } from '@learnway/config';
import { BlogResource } from '../types/learning-resource.types';
import { CmsImageContent, CmsVideoContentInfoResDto } from '@learnway/types';

export const learningResourceApi = {
  getBlogResource: (contentUuid: string) =>
    httpService.get<BlogResource>(`${CMSApiPrefix()}/blog/${contentUuid}/resource`),

  download: (params: any) => {
    return fileDownload({ url: `${CMSApiPrefix()}/etc/content/download`, params });
  },

  getEtcResource: (contentUuid: string) => {
    return httpService.get<any>(`${CMSApiPrefix()}/etc/${contentUuid}/resource`);
  },

  /**
   * 컨텐츠 상세 조회
   * @param contentUuid
   * @returns
   */
  getContent: (contentUuid: string) =>
    httpService.get<any>(`${CMSApiPrefix()}/content/${contentUuid}`),

  /**
   * 여러 컨텐츠의 진행율 조회
   * @param payload
   * @returns
   */
  getProgressMulti: (payload: any) =>
    httpService.post<any>(`${CMSApiPrefix()}/content/progress/multi`, payload),

  saveHtml5Learning: (payload: any) => {
    return httpService.post<any>(`${CMSApiPrefix()}/html5/learning`, payload);
  },
  getHtml5Resource: (contentUuid: string) => {
    return httpService.get<any>(`${CMSApiPrefix()}/html5/${contentUuid}/resource`);
  },

  saveImageLearning: (payload: any) => {
    return httpService.post<any>(`${CMSApiPrefix()}/image/learning`, payload);
  },
  getImageResource: (contentUuid: string) => {
    return httpService.get<CmsImageContent>(`${CMSApiPrefix()}/image/${contentUuid}/resource`);
  },

  getScormScoInfo: (param: any) => {
    return httpService.get<any>(`${CMSApiPrefix()}/scorm/rte/sco/info`, param);
  },

  scormCommit: (payload: any) => {
    return httpService.put<any>(`${CMSApiPrefix()}/scorm/rte/commit`, payload);
  },

  scormInitialize: (payload: any) => {
    return httpService.post<any>(`${CMSApiPrefix()}/scorm/rte/initialize`, payload);
  },

  videoWatchLog: (payload: any) => {
    return httpService.post<any>(`${CMSApiPrefix()}/video/watch-log`, payload);
  },

  videoWatchLogStatistics: (payload: any) => {
    return httpService.post<any>(`${CMSApiPrefix()}/video/watch-log/statistics`, payload);
  },

  videoWwatchInitialize: (payload: any) => {
    const { contentUuid } = payload;
    return httpService.get<CmsVideoContentInfoResDto>(
      `${CMSApiPrefix()}/video/${contentUuid}/watch/initialize`,
      payload,
    );
  },
};
