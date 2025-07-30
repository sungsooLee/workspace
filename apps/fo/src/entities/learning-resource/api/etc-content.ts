import { fileDownload, httpService } from '@learnway/shared';
import { CMSApiPrefix } from '@learnway/config';

export const etcContentApi = {
  download: (params: any) => {
    return fileDownload({ url: `${CMSApiPrefix()}/etc/content/download`, params });
  },
  getEtcContentResource: (contentUuid: string) => {
    return httpService.get<any>(`${CMSApiPrefix()}/etc/${contentUuid}/resource`);
  },
};
