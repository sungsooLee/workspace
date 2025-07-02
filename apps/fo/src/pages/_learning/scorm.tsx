import { useEffect, useState } from 'react';
import { t } from 'i18next';

import { createFileRoute, useRouter } from '@tanstack/react-router';

import { IcoCaution03 } from '@learnway/icons';
import { Button, Checkbox, useModal } from '@learnway/ui';
import { cn } from '@learnway/shared';
import { useDeleteUser, useLogoutUser } from '@learnway/auth/entities';

import { MAIN_CONTAINERS } from '@widgets/layout';
import { pageRouteConfig } from '@features/auth';
import { BrowserFooter, MobileResponsiveContainerFooter } from '@shared/m.ui';

import styles from '@learnway/styles/fo/pages/_layout/my-page/privacy/withdraw-menbership.module.css';

import { ScormPlayer, ScormPlayerConfigProperties } from '../../features/scorm/ui/scorm-player';
import { useGetContentDetail } from '@entities/content/service/content.hook';

export const Route = createFileRoute('/_learning/scorm')({
  component: RouteComponent,
});

function RouteComponent() {
  const contentUuid = '2f17e8a6-a160-4768-8bd0-0f5f74b2acdc';
  const [scormConfig, setScormConfig] = useState<ScormPlayerConfigProperties>();

  const { data } = useGetContentDetail(contentUuid);

  useEffect(() => {
    const win: any = window;
    if (data) {
      if (win.__ENV__?.APP_ENV === 'local') {
        console.log('data', data);
        data.children.forEach((item: any) => {
          item.items.forEach((ci: any) => {
            const url = new URL(ci.itemUrl);
            ci.itemUrl = url.pathname;
            console.log('------', ci);
          });
        });
      }
      if (data.children && data.children.length > 0) {
        if (data.children[0].items.length > 0) {
          const showItem = data.children[0].items[0];
          setScormConfig({
            contentUuid: contentUuid,
            curriculumId: 0,
            orgnId: 0,
            sequenceId: 0,
            courceId: 0,
            scoId: showItem.scoId,
            itemUrl: showItem.itemUrl,
          });
        }
      }
    }
  }, [data]);

  return <ScormPlayer scormConfig={scormConfig} />;
}
