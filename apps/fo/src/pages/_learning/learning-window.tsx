import { useEffect, useMemo, useState } from 'react';
import { createFileRoute, useRouter, useRouterState } from '@tanstack/react-router';

import { t } from 'i18next';

import { LearningWindowScormPlayer, ScormPlayerConfigProperties } from '@features/learning-window';
import { useGetCurriculumnDetail } from '@entities/curriculum/service/curriculum.hook';
import { useGetScormRteScoInfo } from '@entities/scorm/service/scorm-rte.hook';

import { EnContentType, LearningWindowLayout, useLearningWindow } from '@learnway/ui';
import { ScormRteService } from '@entities/scorm/api/scorm-rte';

export const Route = createFileRoute('/_learning/learning-window')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const routerState = useRouterState();

  const [scormConfig, setScormConfig] = useState<ScormPlayerConfigProperties>();
  const [videoInfo, setVideoInfo] = useState<any>();

  const { baseInfo, playInfo, setBaseInfo, setCurriculum, setScormInfo } = useLearningWindow();
  const { data: scormInfo } = useGetScormRteScoInfo(scormConfig);
  const { data: curriculum } = useGetCurriculumnDetail(baseInfo?.curriculumId);

  const scormRteService = useMemo(() => {
    return {
      initialize: ScormRteService.initialize,
      commit: ScormRteService.commit,
    };
  }, []);

  useEffect(() => {
    if (!scormInfo) return;
    setScormInfo(scormInfo);
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
        courseId: playInfo.courseId,
        scoId: playInfo.scoId,
      };

      setScormConfig(config);
    }
  }, [playInfo]);

  useEffect(() => {
    if (!curriculum) return;
    setCurriculum(curriculum);
  }, [curriculum]);

  useEffect(() => {
    (async () => {
      const learningInfo = { ...routerState.location.state };
      console.log('state info ', learningInfo);
      if (learningInfo.curriculumId) {
        setBaseInfo(learningInfo);
      }
    })();
  }, []);

  return <LearningWindowLayout scormRteService={scormRteService} />;
}
