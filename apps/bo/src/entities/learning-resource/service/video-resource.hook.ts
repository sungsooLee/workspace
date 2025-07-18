import { DynamicFormProvider } from '@learnway/hooks';
import { useEffect, useRef } from 'react';
import LearningResourceService from '../api/learning-resource';
import { ProcessingStatus } from '@types';
import { isProcessing, isProcessingCompleted, isProcessingNone } from './util';

const useVideoResourceHook = (provider: DynamicFormProvider) => {
  const { watch, onFormChange } = provider;
  const intervalRef = useRef<NodeJS.Timer>();

  const contentUuid = watch('contentUuid');
  const status = watch('processingStatus');

  const fetchStatus = async () => {
    const statusInfo = await LearningResourceService.getVideoStatus(contentUuid);
    console.log('🚀 ~ statusInfo:', statusInfo);
    onFormChange(statusInfo);
  };

  const fetchVideo = async () => {
    //
  };

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
      fetchVideo();
    }

    return () => intervalRef.current && clearInterval(intervalRef.current);
  }, [status]);

  return {
    processingStatus: status,
  };
};

export const useVideoResource = useVideoResourceHook;
