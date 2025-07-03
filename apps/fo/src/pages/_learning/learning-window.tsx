import { useEffect, useState } from 'react';
import { createFileRoute, useRouter, useRouterState } from '@tanstack/react-router';

import { t } from 'i18next';

import { LearningWindowScormPlayer, ScormPlayerConfigProperties } from '@features/learning-window';
import { useGetContentDetail } from '@entities/content/service/content.hook';
import { useLearningWindowStore } from '@widgets/layout/service/learning-window.store';
import { useGetScormRteScoInfo } from '@entities/scorm/service/scorm-rte.hook';
import { LearningWindowVideoPlayer } from '@features/learning-window/ui/learning-window-video-player';
import { EnContentType } from '@types';

export const Route = createFileRoute('/_learning/learning-window')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const routerState = useRouterState();

  const [scormConfig, setScormConfig] = useState<ScormPlayerConfigProperties>();
  const [videoInfo, setVideoInfo] = useState<any>();

  const { curriculum, playInfo, setBaseInfo } = useLearningWindowStore((state) => state);
  const { data: scormInfo } = useGetScormRteScoInfo(scormConfig);

  useEffect(() => {
    if (!scormInfo) return;
    console.log(scormInfo);
  }, [scormInfo]);

  useEffect(() => {
    if (!playInfo) return;
    console.log('playInfo config', playInfo);
    if (playInfo.contentType === EnContentType.SCORM) {
      const config = {
        contentUuid: playInfo.contentUuid,
        curriculumId: playInfo.curriculumId,
        orgnId: playInfo.orgnId,
        sequenceId: playInfo.sequenceId,
        courceId: playInfo.courseId,
        scoId: playInfo.scoId,
      };

      setScormConfig(config);
    }
  }, [playInfo]);

  useEffect(() => {
    (async () => {
      const learningInfo = { ...routerState.location.state };
      console.log('state info ', learningInfo);
      if (learningInfo.curriculumId) {
        setBaseInfo(learningInfo);
      }
    })();
  }, []);

  return (
    <>
      {scormConfig && <LearningWindowScormPlayer scormConfig={scormConfig} />}
      {videoInfo && <LearningWindowVideoPlayer />}
    </>
  );
}
