import { DynamicFormProvider } from '@learnway/hooks';
import { useCallback, useEffect, useRef, useState } from 'react';
import LearningResourceService from '../api/learning-resource';
import { isProcessing, isProcessingCompleted, isProcessingNone } from './util';
import { GetVideoResourceRes, PutVideoChangeRes } from '@types';
import { get, omit, pick } from 'lodash-es';
import { DATE_TIME_FORMAT, duration } from '@learnway/shared';
import { usePutVideoChange } from './learning-resource.hook';

const videoChangeKey = (contentUuid: string) => `videoChangeResource${contentUuid}`;

const useVideoResourceHook = (provider: DynamicFormProvider) => {
  const { watch, onFormChange } = provider;
  const intervalRef = useRef<NodeJS.Timer>();

  const fileChangeId = watch('fileChangeId');
  console.log('🚀 ~ useVideoResourceHook ~ fileChangeId:', fileChangeId);
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
      sessionStorage.setItem(
        videoChangeKey(contentUuid),
        JSON.stringify({ contentUuid, resourceId }),
      );
    },
    onError: (error: any) => {
      console.error(error);
      // 에러 얼럿?
    } });

  const handleChangeVideo = (fileUuid: string) => changeVideo({ contentUuid, fileUuid });

  const [videoResource, setVideoResource] = useState<GetVideoResourceRes | null>(null);

  const fetchStatus = useCallback(
    async (resourceId?: number) => {
      const statusInfo = await (resourceId
        ? LearningResourceService.getVideoFileChange(resourceId) // 비디오 변경시
        : LearningResourceService.getVideoStatus(contentUuid)); // 비디오 최초 등록시
      setVideoChangeResourceId(resourceId);
      onFormChange(omit(statusInfo, 'resourceId'));
    },
    [contentUuid],
  );

  const fetchVideoContent = useCallback(async () => {
    const videoResource = await LearningResourceService.getVideoResource(contentUuid);
    onFormChange(pick(videoResource, 'contentAddInfo'));
    setVideoResource(videoResource);
  }, [contentUuid]);

  useEffect(() => {
    if (isProcessingNone(status)) return;

    // 기존에 비디오 변경중이던 내역이 있다면 변경상태 조회 시작
    if (fileChangeId && !sessionStorage.getItem(videoChangeKey(contentUuid)))
      sessionStorage.setItem(
        videoChangeKey(contentUuid),
        JSON.stringify({ contentUuid, resourceId: fileChangeId }),
      );
    const videoChangeResource = sessionStorage.getItem(videoChangeKey(contentUuid));
    if (videoChangeResource) {
      if (!videoChangeResourceId) {
        const resourceId = JSON.parse(videoChangeResource).resourceId;
        fetchStatus(resourceId);
        return;
      }
    }

    // 처리 중이 아닌 경우 interval 정리
    if (!isProcessing(status)) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = undefined;
      }

      // 비디오 변경 작업이 완료된 경우 정리
      if (videoChangeResource && videoChangeResourceId) {
        setVideoChangeResourceId(undefined);
        onFormChange({ fileChangeId: 0 });
        sessionStorage.removeItem(videoChangeKey(contentUuid));
      }
    }

    // 처리 중이고 interval이 없는 경우 시작
    if (isProcessing(status) && !intervalRef.current) {
      intervalRef.current = setInterval(() => fetchStatus(videoChangeResourceId), 2 * 1000);
    }

    // 처리 완료된 경우 비디오 컨텐츠 업데이트
    if (isProcessingCompleted(status)) {
      fetchVideoContent();
    }
  }, [contentUuid, status, fileChangeId, videoChangeResourceId]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        // Unmount시 interval 중지
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    contentUuid,
    isDrafted,
    processingStatus: status,
    playTime,
    videoResource,
    handleChangeVideo };
};

export const useVideoResource = useVideoResourceHook;
