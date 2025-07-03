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

export const Route = createFileRoute('/_learning-window/learning-window/')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const routerState = useRouterState();

  const contentUuid = '2f17e8a6-a160-4768-8bd0-0f5f74b2acdc';
  const [scormConfig, setScormConfig] = useState<ScormPlayerConfigProperties>();

  const { curriculum, setBaseInfo } = useLearningWindowStore((state) => state);

  useEffect(() => {
    if (!curriculum) return;

    // if (data.children && data.children.length > 0) {
    //   if (data.children[0].items.length > 0) {
    //     const baseItem = data.children[0];
    //     const showItem = baseItem.items[0];
    //     setScormConfig({
    //       contentUuid: contentUuid,
    //       curriculumId: 1,
    //       orgnId: baseItem.orgnId,
    //       sequenceId: 1,
    //       courceId: 1,
    //       scoId: showItem.scoId,
    //       itemURL: showItem.itemUrl,
    //     });
    //   }
    // }
  }, [curriculum]);

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
