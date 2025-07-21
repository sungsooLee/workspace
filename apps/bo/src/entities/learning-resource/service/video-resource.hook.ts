import { DynamicFormProvider } from '@learnway/hooks';
import { useCallback, useEffect, useRef, useState } from 'react';
import LearningResourceService from '../api/learning-resource';
import { isProcessing, isProcessingCompleted, isProcessingNone } from './util';
import { GetVideoResourceRes, PutVideoChangeRes } from '@types';
import { get, omit, pick } from 'lodash';
import { DATE_TIME_FORMAT, duration } from '@learnway/shared';
import { usePutVideoChange } from './learning-resource.hook';

const videoChangeKey = 'videoChangeResource';

const useVideoResourceHook = (provider: DynamicFormProvider) => {
  const { watch, onFormChange } = provider;
  const intervalRef = useRef<NodeJS.Timer>();

  const isDrafted = watch('isDrafted');
  const status = watch('processingStatus');
  const playTime = duration(watch('contentAddInfo'), DATE_TIME_FORMAT.HOUR_MIN_SEC);
  const contentUuid = watch('contentUuid');

  const [videoChangeResourceId, setVideoChangeResourceId] = useState<number | undefined>();

  const { update: changeVideo } = usePutVideoChange({
    onSuccess: (result: PutVideoChangeRes) => {
      const resourceId = get(result, 'resourceId');
      setVideoChangeResourceId(resourceId);
      onFormChange(omit(result, 'resourceId'));
      localStorage.setItem(
        `${videoChangeKey}${contentUuid}`,
        JSON.stringify({ contentUuid, resourceId }),
      );
    },
    onError: (error: any) => {
      console.error(error);
      // 에러 얼럿?
    },
  });

  const handleChangeVideo = (fileUuid: string) => changeVideo({ contentUuid, fileUuid });

  const [videoResource, setVideoResource] = useState<GetVideoResourceRes | null>(null);

  const fetchStatus = useCallback(async () => {
    const statusInfo = await (videoChangeResourceId
      ? LearningResourceService.getVideoFileChange(videoChangeResourceId)
      : LearningResourceService.getVideoStatus(contentUuid));
    onFormChange(omit(statusInfo, 'resourceId'));
  }, [contentUuid, videoChangeResourceId]);

  const fetchVideoContent = useCallback(async () => {
    const videoResource = await LearningResourceService.getVideoResource(contentUuid);
    onFormChange(pick(videoResource, 'contentAddInfo'));
    setVideoResource(videoResource);
  }, [contentUuid]);

  useEffect(() => {
    console.log('🚀 ~ ProcessingStatus:', status);

    const videoChangeResource = localStorage.getItem(`${videoChangeKey}${contentUuid}`);
    console.log(
      '🚀 ~ useEffect ~ videoChangeResource:',
      videoChangeResource,
      videoChangeResourceId,
    );
    if (videoChangeResource) {
      if (!videoChangeResourceId) {
        setVideoChangeResourceId(JSON.parse(videoChangeResource).resourceId);
        return;
      }
    }

    if (isProcessingNone(status)) return;

    console.log('🚀 ~ useEffect ~ intervalRef.current:', intervalRef.current);
    if (intervalRef.current && !isProcessing(status)) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
      if (videoChangeResource && videoChangeResourceId) {
        setVideoChangeResourceId(undefined);
        localStorage.removeItem(`${videoChangeKey}${contentUuid}`);
      }
    }

    if (!intervalRef.current && isProcessing(status)) {
      intervalRef.current = setInterval(fetchStatus, 2 * 1000);
    }

    if (isProcessingCompleted(status)) {
      fetchVideoContent();
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [contentUuid, status, videoChangeResourceId]);

  return {
    contentUuid,
    isDrafted,
    processingStatus: status,
    playTime,
    videoResource,
    handleChangeVideo,
  };
};

export const useVideoResource = useVideoResourceHook;
