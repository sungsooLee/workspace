import { useQuery } from '@tanstack/react-query';
import { EtcContentService } from '../api/etc-content';
import { etcContentQueryOptions } from './etc-content.queries';

/**
 * Etc content Download용
 * @returns
 */
export const useEtcContentManager = () => {
  const download = (param: any) => EtcContentService.download(param);
  return {
    download,
  };
};

export function useGetEtcContentResource(contentUuid?: string) {
  return useQuery(etcContentQueryOptions.resource(contentUuid));
}
