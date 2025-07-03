import { useEffect, useState } from 'react';
import { t } from 'i18next';

import { createFileRoute, useRouter, useRouterState } from '@tanstack/react-router';

import { IcoCaution03 } from '@learnway/icons';
import { Button, Checkbox, useModal } from '@learnway/ui';
import { cn } from '@learnway/shared';
import { useDeleteUser, useLogoutUser } from '@learnway/auth/entities';

import { MAIN_CONTAINERS } from '@widgets/layout';
import { pageRouteConfig } from '@features/auth';
import { BrowserFooter, MobileResponsiveContainerFooter } from '@shared/m.ui';

import styles from '@learnway/styles/fo/pages/_layout/my-page/privacy/withdraw-menbership.module.css';

import { ScormPlayer, ScormPlayerConfigProperties } from '@features/learning-window';
import { useGetContentDetail } from '@entities/content/service/content.hook';
import { useLearningWindowStore } from '@widgets/layout/service/learning-window.store';
import { useGetScormRteScoUrl } from '@entities/scorm/service/scorm-rte.hook';

export const Route = createFileRoute('/_learning-window/learning-window/')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const routerState = useRouterState();

  const [scormConfig, setScormConfig] = useState<ScormPlayerConfigProperties>();

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

  return scormConfig && <ScormPlayer scormConfig={scormConfig} />;
}
