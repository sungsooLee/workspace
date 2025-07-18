import { createFileRoute, useRouter } from '@tanstack/react-router';
import { pageRouteConfig } from '@features/auth/index';
import { ContentsButtons, MainContents, PageContainer } from '@shared/ui';
import { Button, Divider, Switch, Tabs, ToggleButtonGroup, useModal } from '@learnway/ui';
import { t } from 'i18next';
// import { RoundList } from '@features/learning-operate/round';
import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';
import { useState } from 'react';
import { IcoArrowDown } from '@learnway/icons';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';
import { Enrollment } from '@features/learning-operate/learning-sequence/enrollment-application/ui/enrollment';

export const Route = createFileRoute('/_layout/learning/learning-sequence/enrollment-application/')(
  {
    component: RouteComponent,
  },
);

function RouteComponent() {
  const router = useRouter();
  const { open: openModal } = useModal();
  const [btnState, setBtnState] = useState<string>('edu');
  return (
    <PageContainer>
      <ContentsButtons>
        <ToggleButtonGroup
          defaultValue={'edu'}
          options={[
            { label: '과정관리', value: 'course' },
            { label: '수강관리', value: 'edu' },
          ]}
          onChange={(value) => setBtnState(value)}
        />
        <Divider orientation="vertical" />
        {btnState === 'course' && (
          <>
            <Button variant="point" size="sm" label={t('목록')} />
            <Divider orientation="vertical" />
            <Button variant="point" size="sm" label={t('삭제')} />
            <Button variant="primary" size="sm">
              {t('저장')}
            </Button>
          </>
        )}
      </ContentsButtons>
      <MainContents>
        <Enrollment />
      </MainContents>
    </PageContainer>
  );
}
