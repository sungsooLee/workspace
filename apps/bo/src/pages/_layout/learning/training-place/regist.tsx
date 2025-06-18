import { useRef } from 'react';
import { t } from 'i18next';
import { createFileRoute, useRouterState, useRouter } from '@tanstack/react-router';
import { PageContainer } from '@widgets/layout/ui/container/page-container';
import { Button } from '@learnway/ui';
import { MainContents } from '@widgets/layout/ui/container/slot/main-contents';
import { ContentsButtons } from '@widgets/layout/ui/container/slot/contents-buttons';
import { LinkBox } from '@widgets/layout/ui/container/slot/link-box';
import { TrainingPlaceDetail } from '@features/learning/training-place/training-place-detail';

export const Route = createFileRoute('/_layout/learning/training-place/regist')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const formRef = useRef(1);

  const handleSaveClick = () => {
    console.log('formRef', formRef);
    const detail: any = formRef.current;
    detail.saveData();
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
        <TrainingPlaceDetail ref={formRef} mode="add" />
      </MainContents>
    </PageContainer>
  );
}
