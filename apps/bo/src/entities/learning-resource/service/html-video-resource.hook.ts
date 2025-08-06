import {
  HtmlVideoFileChangeRes,
  isProcessing,
  isProcessingNone,
  useChangeHTML5VideoFile,
} from '@entities/learning-resource';
import LearningResourceService from '@entities/learning-resource/api/learning-resource';
import { DynamicFormProvider, FileInfo, useFileManager } from '@learnway/hooks';
import { omit } from 'lodash-es';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export const useHtmlVideoResource = (provider: DynamicFormProvider) => {
  const { watch, onFormChange } = provider;
  const intervalRef = useRef<NodeJS.Timer>();

  const { getFileInfo } = useFileManager();

  const contentUuid = watch('contentUuid');
  const fileUuid = watch('fileUuid');
  const fileChangeId = watch('fileChangeId');
  const isDrafted = watch('isDrafted');
  const processingStatus = watch('processingStatus');
  console.log('html video resource ===>', contentUuid, fileUuid, fileChangeId, processingStatus);

  const htmlChangeKey = useMemo(() => `html5ChangeKey${contentUuid}`, [contentUuid]);

  // const [fileUuid, setFileUuid] = useState<string>(uuid);
  const [htmlFileChangeId, setHtmlFileChangeId] = useState<number | undefined>(fileChangeId);
  const [htmlFileResource, setHtmlFileResource] = useState<FileInfo | null>(null);

  const { change: changeFile } = useChangeHTML5VideoFile({
    onSuccess: (result: HtmlVideoFileChangeRes) => {
      if (result?.changeId) {
        // setFileUuid(result.fileUuid);
        setHtmlFileChangeId(result.changeId);
        onFormChange(omit(result, 'changeId'));
        sessionStorage.setItem(
          htmlChangeKey,
          JSON.stringify({ contentUuid, fileChangeId: result.changeId }),
        );
      }
    },
  });

  const handleChangeHtmlVideoFile = useCallback(
    (fileUuid: string) => changeFile({ contentUuid, fileUuid }),
    [contentUuid],
  );

  const fetchStatus = useCallback(
    async (changeId?: number) => {
      const processingStatusInfo = await (changeId
        ? LearningResourceService.fetchHTML5FileChangeStatus(changeId)
        : LearningResourceService.fetchHTML5Status(contentUuid));

      setHtmlFileChangeId(changeId);
      onFormChange(omit(processingStatusInfo, 'changeId'));
    },
    [contentUuid],
  );

  const fetchFileInfo = useCallback(async () => {
    console.log('fileUuid', fileUuid);
    if (!fileUuid) {
      return;
    }

    const response = await getFileInfo(fileUuid);
    setHtmlFileResource(response);
  }, [fileUuid]);

  useEffect(() => {
    if (isProcessingNone(processingStatus)) {
      return;
    }

    if (fileChangeId && !sessionStorage.getItem(htmlChangeKey)) {
      sessionStorage.setItem(htmlChangeKey, JSON.stringify({ contentUuid, fileChangeId }));
    }

    const changeResource = sessionStorage.getItem(htmlChangeKey);
    if (changeResource) {
      fetchStatus(JSON.parse(changeResource).fileChangeId);
      return;
    }

    if (!isProcessing(processingStatus)) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = undefined;
      }

      if (changeResource && htmlFileChangeId) {
        setHtmlFileChangeId(undefined);
        onFormChange({ fileChangeId: 0 });
        sessionStorage.removeItem(htmlChangeKey);
      }
    }

    if (isProcessing(processingStatus) && !intervalRef.current) {
      intervalRef.current = setInterval(() => fetchStatus(htmlFileChangeId), 2 * 1000);
    }
  }, [contentUuid, processingStatus, fileChangeId, htmlFileChangeId]);

  useEffect(() => {
    fetchFileInfo();
  }, [fileUuid]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    contentUuid,
    fileUuid,
    isDrafted,
    processingStatus,
    handleChangeHtmlVideoFile,
    htmlFileResource,
  };
};
