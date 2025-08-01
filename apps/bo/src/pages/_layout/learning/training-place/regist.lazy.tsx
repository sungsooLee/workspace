import { TrainingPlaceDetail } from '@features/learning-operate-support/learning-space/learning-space-management/training-place-detail';
import { Button } from '@learnway/ui/button';
import { ContentsButtons, LinkBox, MainContents, PageContainer } from '@shared/ui';
import { createLazyFileRoute, useRouter } from '@tanstack/react-router';
import { EnFormMode, EnPageMode } from '@types';
import { t } from 'i18next';
import { useRef } from 'react';

export const Route = createLazyFileRoute('/_layout/learning/training-place/regist')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const handleSaveClick = () => {
    if (formRef.current?.saveData) formRef.current.saveData();
  };

  return (
    <PageContainer>
      <ContentsButtons>
        <LinkBox>
          <Button
            variant="point"
            size="sm"
            onClick={() => router.navigate({ to: '/learning/training-place' })}
          >
            {t('LABEL.button.list')}
          </Button>
        </LinkBox>
        <Button variant="primary" size="sm" onClick={handleSaveClick}>
          {t('LABEL.button.save')}
        </Button>
      </ContentsButtons>
      <MainContents>
        <TrainingPlaceDetail ref={formRef} pageMode={EnPageMode.PAGE} mode={EnFormMode.ADD} />
      </MainContents>
    </PageContainer>
  );
}
