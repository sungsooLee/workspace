import { EtcContentService } from '../api/etc-content';

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
