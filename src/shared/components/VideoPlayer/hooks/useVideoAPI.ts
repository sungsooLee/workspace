// src/hooks/useVideoAPI.ts

import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useCallback } from 'react';

interface VideoProgressData {
  contentId: number;
  chapterId: number;
  kitId: number;
  courseId: number;
  sequenceId: number;
}

interface VideoRecordData extends VideoProgressData {
  videoStartTime: number;
  videoEndTime: number;
  speed: number;
}

export function useVideoAPI(refetchFunc: () => void) {
  const sendVideoProgress = useMutation({
    mutationFn: (data: VideoProgressData) =>
      axios.post('/cms-module/api/v1/video/progress', data),
    onSuccess: () => {
      refetchFunc();
    },
  });

  const sendVideoRecord = useMutation({
    mutationFn: (data: VideoRecordData) =>
      axios.post('/cms-module/api/v1/video/record', data),
  });

  const sendProgress = useCallback(
    (data: VideoProgressData) => {
      sendVideoProgress.mutate(data);
    },
    [sendVideoProgress]
  );

  const sendRecord = useCallback(
    (data: VideoRecordData) => {
      sendVideoRecord.mutate(data);
    },
    [sendVideoRecord]
  );

  return {
    sendProgress,
    sendRecord,
  };
}
