import { DynamicFormProvider } from '@learnway/hooks';
import { DATE_TIME_FORMAT, duration } from '@learnway/shared';
import { get, omit, pick } from 'lodash-es';
import { useCallback, useEffect, useRef, useState } from 'react';
import LearningResourceService from '../api/learning-resource';
import { GetScormResourceRes, PutScormChangeRes } from '../model/learning-resource.types';
import { usePutScormChange } from './learning-resource.hook';
import { isProcessing, isProcessingCompleted, isProcessingNone } from './util';

const scormChangeKey = (contentUuid: string) => `scormChangeResource${contentUuid}`;

const useScormResourceHook = (provider: DynamicFormProvider) => {
  const { watch, onFormChange } = provider;
  const intervalRef = useRef<NodeJS.Timer>();

  const fileChangeId = watch('fileChangeId');
  console.log('🚀 ~ useScormResourceHook ~ fileChangeId:', fileChangeId);
  const isDrafted = watch('isDrafted');
  const status = watch('processingStatus');
  const playTime = duration(watch('contentAddInfo'), DATE_TIME_FORMAT.HOUR_MIN_SEC);
  const contentUuid = watch('contentUuid');
  console.log('🚀 ~ useScormResourceHook ~ contentUuid:', contentUuid);

  const [scormChangeId, setScormChangeId] = useState<number | undefined>();

  const { update: changeScorm } = usePutScormChange({
    onSuccess: (result: PutScormChangeRes) => {
      const changeId = get(result, 'changeId');
      setScormChangeId(changeId);
      onFormChange(omit(result, 'changeId'));
      sessionStorage.setItem(
        scormChangeKey(contentUuid),
        JSON.stringify({ contentUuid, changeId }),
      );
    },
    onError: (error: any) => {
      console.error(error);
      // 에러 얼럿?
    },
  });

  const handleChangeScorm = (fileUuid: string) => changeScorm({ contentUuid, fileUuid });

  const [scormResource, setScormResource] = useState<GetScormResourceRes | null>(null);

  const fetchStatus = useCallback(
    async (changeId?: number) => {
      const statusInfo = await (changeId
        ? LearningResourceService.getScormFileChange(changeId) // 스콤 변경시
        : LearningResourceService.getScormStatus(contentUuid)); // 스콤 최초 등록시
      setScormChangeId(changeId);
      onFormChange(omit(statusInfo, 'changeId'));
    },
    [contentUuid],
  );

  const fetchScormContent = useCallback(async () => {
    const scormResource = await LearningResourceService.getScormResource(contentUuid);
    onFormChange(pick(scormResource, 'contentAddInfo'));
    setScormResource(scormResource);
  }, [contentUuid]);

  useEffect(() => {
    if (isProcessingNone(status)) return;

    // 기존에 스콤 변경중이던 내역이 있다면 변경상태 조회 시작
    if (fileChangeId && !sessionStorage.getItem(scormChangeKey(contentUuid)))
      sessionStorage.setItem(
        scormChangeKey(contentUuid),
        JSON.stringify({ contentUuid, changeId: fileChangeId }),
      );
    const scormChangeResource = sessionStorage.getItem(scormChangeKey(contentUuid));
    if (scormChangeResource) {
      if (!scormChangeId) {
        const changeId = JSON.parse(scormChangeResource).changeId;
        fetchStatus(changeId);
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
      if (scormChangeResource && scormChangeId) {
        setScormChangeId(undefined);
        onFormChange({ fileChangeId: 0 });
        sessionStorage.removeItem(scormChangeKey(contentUuid));
      }
    }

    // 처리 중이고 interval이 없는 경우 시작
    if (isProcessing(status) && !intervalRef.current) {
      intervalRef.current = setInterval(() => fetchStatus(scormChangeId), 2 * 1000);
    }

    // 처리 완료된 경우 비디오 컨텐츠 업데이트
    if (isProcessingCompleted(status)) {
      fetchScormContent();
    }
  }, [contentUuid, status, fileChangeId, scormChangeId]);

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
    scormResource,
    handleChangeScorm,
  };
};

export const useScormResource = useScormResourceHook;
