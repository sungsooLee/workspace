import { getQuerySkipToken } from '@learnway/shared';
import { StaticFileService } from '../api/static-file';
import { StaticFileTypes } from '../types/static-file.types';

export const staticFileQueryKey = {
  list: ['static-file-page'] as const,
  detail: ['static-file-detail'] as const,
  downloadUrl: ['static-file-download-url'] as const,
};

export const staticFileQueryOptions = {
  list: (params: any) => ({
    query: staticFileQueryKey.list,
    queryFn: () => StaticFileService.fetchListStaticFile(params),
    cacheTime: 0,
    staleTime: 0,
  }),
  detail: (fileUuid: string) =>
    fileUuid
      ? {
          queryKey: staticFileQueryKey.detail,
          queryFn: (): Promise<any> => StaticFileService.fetchStaticFile(fileUuid),
        }
      : getQuerySkipToken<any>(),
  downloadUrl: (fileUuid: string) => ({
    queryKey: staticFileQueryKey.downloadUrl,
    queryFn: (): Promise<any> => StaticFileService.fetchStaticFileDownloadUrl(fileUuid),
  }),
};

export const staticFileMutateOptions = {
  create: () => ({
    mutationFn: (payload: StaticFileTypes) => StaticFileService.createStaticFile(payload),
  }),
  update: () => ({
    mutationFn: (payload: StaticFileTypes) => StaticFileService.updateStaticFile(payload),
  }),
  delete: () => ({
    mutationFn: (fileUuid: string) => StaticFileService.deleteStaticFile(fileUuid),
  }),
};
