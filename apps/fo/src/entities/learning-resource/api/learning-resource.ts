import { fileDownload, httpService } from '@learnway/shared';
import { CMSApiPrefix } from '@learnway/config';
import { BlogResource, Content, EtcContentDownloadReq } from '@entities/learning-resource';
import {
  CmsContentProgressMultiReq,
  CmsContentProgressMultiRes,
  CmsEtcResource,
  CmsHtml5LearningReq,
  CmsImageResource,
  CmsScormRteCommitReq,
  CmsScormRteInitializeReq,
  CmsScormRteScoInfo,
  CmsScormRteScoInfoReq,
  CmsVideoResource,
  CmsVideoWatchInitializeReq,
  CmsVideoWatchLogReq,
  CmsVideoWatchLogStatisticsReq,
} from '@learnway/types';

export const learningResourceApi = {
  getBlogResource: (contentUuid: string) =>
    httpService.get<BlogResource>(`${CMSApiPrefix()}/blog/${contentUuid}/resource`),

  download: (params: EtcContentDownloadReq) => {
    return fileDownload({ url: `${CMSApiPrefix()}/etc/content/download`, params });
  },

  getEtcResource: (contentUuid: string) => {
    return httpService.get<CmsEtcResource>(`${CMSApiPrefix()}/etc/${contentUuid}/resource`);
  },

  /**
   * 컨텐츠 상세 조회
   * @param contentUuid
   * @returns
   */
  getContent: (contentUuid: string) =>
    httpService.get<Content>(`${CMSApiPrefix()}/content/${contentUuid}`),

  /**
   * 여러 컨텐츠의 진행율 조회
   * @param payload
   * @returns
   */
  getProgressMulti: (payload: CmsContentProgressMultiReq) =>
    httpService.post<CmsContentProgressMultiRes>(
      `${CMSApiPrefix()}/content/progress/multi`,
      payload,
    ),

  saveHtml5Learning: (payload: CmsHtml5LearningReq) => {
    return httpService.post<any>(`${CMSApiPrefix()}/html5/learning`, payload);
  },
  getHtml5Resource: (contentUuid: string) => {
    return httpService.get<any>(`${CMSApiPrefix()}/html5/${contentUuid}/resource`);
  },

  saveImageLearning: (payload: any) => {
    return httpService.post<any>(`${CMSApiPrefix()}/image/learning`, payload);
  },
  getImageResource: (contentUuid: string) => {
    return httpService.get<CmsImageResource>(`${CMSApiPrefix()}/image/${contentUuid}/resource`);
  },

  getScormScoInfo: (param: CmsScormRteScoInfoReq) => {
    return httpService.get<CmsScormRteScoInfo>(`${CMSApiPrefix()}/scorm/rte/sco/info`, param);
  },

  scormCommit: (payload: CmsScormRteCommitReq) => {
    return httpService.put(`${CMSApiPrefix()}/scorm/rte/commit`, payload);
  },

  scormInitialize: (payload: CmsScormRteInitializeReq) => {
    return httpService.post(`${CMSApiPrefix()}/scorm/rte/initialize`, payload);
  },

  videoWatchLog: (payload: CmsVideoWatchLogReq) => {
    return httpService.post(`${CMSApiPrefix()}/video/watch-log`, payload);
  },

  videoWatchLogStatistics: (payload: CmsVideoWatchLogStatisticsReq) => {
    return httpService.post(`${CMSApiPrefix()}/video/watch-log/statistics`, payload);
  },

  videoWatchInitialize: (payload: CmsVideoWatchInitializeReq) => {
    const { contentUuid } = payload;
    return httpService.get<CmsVideoResource>(
      `${CMSApiPrefix()}/video/${contentUuid}/watch/initialize`,
      payload,
    );
  },
};
