import { t } from 'i18next';
import { createFileRoute, Link, useRouter } from '@tanstack/react-router';
import { Button } from '@learnway/ui';
import { TrainingPlaceList } from '@features/learning-operate-support/learning-space/learning-space-management/training-place-list';
import { EnPageMode } from '@types';
import { MainContents, PageContainer, ContentsButtons } from '@shared/ui';

export const Route = createFileRoute('/_layout/learning/training-place/')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();

  return (
    <PageContainer>
      <ContentsButtons>
        <Button
          variant="primary"
          size="sm"
          onClick={() => router.navigate({ to: '/learning/training-place/regist' })}
        >
          {t('등록')}
        </Button>
      </ContentsButtons>
      <MainContents>
        <TrainingPlaceList pageMode={EnPageMode.PAGE} />
      </MainContents>
    </PageContainer>
  );
}
