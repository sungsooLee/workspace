import {
  StaticFileParams,
  StaticFileResponse,
} from '@entities/static-file/types/static-file.types';
import { PMSApiPrefix } from '@learnway/config';
import { httpService } from '@learnway/shared';
import { PageableContent } from '@shared/types/page-meta';

export class StaticFileService {
  static fetchListStaticFile(params: StaticFileParams) {
    return httpService.get<PageableContent<StaticFileResponse>>(
      `${PMSApiPrefix()}/tenants/static-file`,
      { searchReqDto: params },
    );
  }
  static fetchStaticFile(fileUuid: string) {
    return httpService.get(`${PMSApiPrefix()}/tenants/static-file/${fileUuid}`);
  }
  static createStaticFile(params: any) {
    return httpService.post(`${PMSApiPrefix()}/tenants/static-file`, params);
  }
  static updateStaticFile(params: any) {
    return httpService.put(`${PMSApiPrefix()}/tenants/static-file`, params);
  }
  static deleteStaticFile(fileUuid: string) {
    return httpService.delete(`${PMSApiPrefix()}/tenants/static-file/${fileUuid}`);
  }
  static fetchStaticFileDownloadUrl(fileUuid: string) {
    return httpService.get(`${PMSApiPrefix()}/tenants/static-file/download/${fileUuid}`);
  }
}
