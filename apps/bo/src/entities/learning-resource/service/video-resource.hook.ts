import { DynamicFormProvider } from '@learnway/hooks';
import { useCallback, useEffect, useRef, useState } from 'react';
import LearningResourceService from '../api/learning-resource';
import { isProcessing, isProcessingCompleted, isProcessingNone } from './util';
import { GetVideoResourceRes, PutVideoChangeRes } from '@types';
import { omit, pick } from 'lodash';
import { DATE_TIME_FORMAT, duration } from '@learnway/shared';
import { usePutVideoChange } from './learning-resource.hook';

const useVideoResourceHook = (provider: DynamicFormProvider) => {
  const { watch, onFormChange } = provider;
  const intervalRef = useRef<NodeJS.Timer>();

  const isDrafted = watch('isDrafted');
  const status = watch('processingStatus');
  const playTime = duration(watch('contentAddInfo'), DATE_TIME_FORMAT.HOUR_MIN_SEC);
  const contentUuid = watch('contentUuid');

  const { update: changeVideo } = usePutVideoChange({
    onSuccess: (result: PutVideoChangeRes) => {
      onFormChange(omit(result, 'resourceId'));
    },
    onError: (error: any) => {
      console.error(error);
      // 에러 얼럿?
    },
  });

  const handleChangeVideo = (fileUuid: string) => changeVideo({ contentUuid, fileUuid });

  const [videoResource, setVideoResource] = useState<GetVideoResourceRes | null>(null);

  const fetchStatus = useCallback(async () => {
    const statusInfo = await LearningResourceService.getVideoStatus(contentUuid);
    onFormChange(statusInfo);
  }, [contentUuid]);

  const fetchVideoContent = useCallback(async () => {
    const videoResource = await LearningResourceService.getVideoResource(contentUuid);
    onFormChange(pick(videoResource, 'contentAddInfo'));
    setVideoResource(videoResource);
  }, [contentUuid]);

  useEffect(() => {
    console.log('🚀 ~ ProcessingStatus:', status);
    if (isProcessingNone(status)) return;

    if (intervalRef.current && !isProcessing(status)) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }

    if (!intervalRef.current && isProcessing(status)) {
      intervalRef.current = setInterval(fetchStatus, 2 * 1000);
    }

    if (isProcessingCompleted(status)) {
      fetchVideoContent();
    }

    return () => {
      if (intervalRef.current && !isProcessing(status)) {
        clearInterval(intervalRef.current);
      }
    };
  }, [contentUuid, status]);

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
