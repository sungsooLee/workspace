import { DynamicFormProvider } from '@learnway/hooks';
import { useEffect, useRef } from 'react';
import LearningResourceService from '../api/learning-resource';
import { ProcessingStatus } from '@types';

const useVideoResourceHook = (provider: DynamicFormProvider) => {
  const { watch, onFormChange } = provider;
  const intervalRef = useRef<NodeJS.Timer>();

  const contentUuid = watch('contentUuid');
  const processingStatus = watch('processingStatus');

  const fetchStatus = async () => {
    const status = await LearningResourceService.getVideoStatus(contentUuid);
    console.log('🚀 ~ Video status:', status);
    onFormChange(status);
  };

  const fetchVideo = async () => {
    //
  };

  useEffect(() => {
    if (!processingStatus || processingStatus === ProcessingStatus.NONE) return;

    if (intervalRef.current) {
      if ([ProcessingStatus.COMPLETE, ProcessingStatus.FAIL].includes(processingStatus)) {
        clearInterval(intervalRef.current);
        intervalRef.current = undefined;
      }
    } else if (
      [ProcessingStatus.STARTED, ProcessingStatus.UPLOADING, ProcessingStatus.ENCODING].includes(
        processingStatus,
      )
    ) {
      intervalRef.current = setInterval(fetchStatus, 2 * 1000);
    }

    if (processingStatus === ProcessingStatus.COMPLETE) {
      fetchVideo();
    }

    return () => intervalRef.current && clearInterval(intervalRef.current);
  }, [processingStatus]);

  return {
    processingStatus,
  };
};

export const useVideoResource = useVideoResourceHook;
