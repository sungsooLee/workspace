import { createLazyFileRoute, useRouter, useRouterState } from '@tanstack/react-router';
import { pageRouteConfig } from '@features/auth/index';
import { ContentsButtons, MainContents, PageContainer } from '@shared/ui';
import { Button, Divider, Switch, Tabs, useModal } from '@learnway/ui';
import { t } from 'i18next';
import { RoundDetail } from '@features/learning-operate/round';
import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';
import { useState } from 'react';
import { IcoArrowDown } from '@learnway/icons';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';

export const Route = createLazyFileRoute('/_layout/learning-operate/round/round-detail')({
  component: RouteComponent,
  // ...pageRouteConfig({}),
});

function RouteComponent() {
  const router = useRouter();
  const routerState = useRouterState();
  const courseId = routerState.location.state?.courseId;
  const roundId = routerState.location.state?.roundId;
  console.log('courseId:', courseId);
  console.log('roundId:', roundId);
  const { open: openModal } = useModal();
  const [btnState, setBtnState] = useState<string>('course');
  return (
    <PageContainer>
      <ContentsButtons>
        <Button
          variant="point"
          size="sm"
          label={t('목록')}
          onClick={() => router.navigate({ to: '/learning-operate/round' })}
        />
        <Divider orientation="vertical" />
        <Button variant="point" size="sm" label={t('삭제')} />
        <Button variant="primary" size="sm">
          {t('저장')}
        </Button>
      </ContentsButtons>
      <MainContents>
        <RoundDetail courseId={courseId} roundId={roundId} />
      </MainContents>
    </PageContainer>
  );
}
