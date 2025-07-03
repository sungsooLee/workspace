import { useEffect, useState } from 'react';
import { createFileRoute, useRouter, useRouterState } from '@tanstack/react-router';

import { t } from 'i18next';

import { ScormPlayer, ScormPlayerConfigProperties } from '@features/learning-window';
import { useGetContentDetail } from '@entities/content/service/content.hook';
import { useLearningWindowStore } from '@widgets/layout/service/learning-window.store';
import { useGetScormRteScoUrl } from '@entities/scorm/service/scorm-rte.hook';
import { VideoPlayer } from '@features/learning-window/ui/video-player';

export const Route = createFileRoute('/_learning/learning-window')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const routerState = useRouterState();

  const [scormConfig, setScormConfig] = useState<ScormPlayerConfigProperties>();
  const [videoInfo, setVideoInfo] = useState<any>();

  const { curriculum, playInfo, setBaseInfo } = useLearningWindowStore((state) => state);
  const { data: scormInfo } = useGetScormRteScoUrl(scormConfig);

  useEffect(() => {
    if (!scormInfo) return;
    console.log(scormInfo);
  }, [scormInfo]);

  useEffect(() => {
    if (!playInfo) return;

    setScormConfig({
      contentUuid: playInfo.contentUuid,
      curriculumId: playInfo.curriculumId,
      orgnId: playInfo.orgnId,
      sequenceId: playInfo.sequenceId,
      courceId: playInfo.courceId,
      scoId: playInfo.scoId,
    });
  }, [playInfo]);

  useEffect(() => {
    (async () => {
      const learningInfo = { ...routerState.location.state };
      if (learningInfo.curriculumId) {
        setBaseInfo(learningInfo);
      }
    })();
  }, []);

  return (
    <>
      {scormConfig && <ScormPlayer scormConfig={scormConfig} />}
      {videoInfo && <VideoPlayer />}
    </>
  );
}
