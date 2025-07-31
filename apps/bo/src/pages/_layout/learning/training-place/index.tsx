import { TrainingPlaceList } from '@features/learning-operate-support/learning-space/learning-space-management/training-place-list';
import { Button } from '@learnway/ui/button';
import { ContentsButtons, MainContents, PageContainer } from '@shared/ui';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { EnPageMode } from '@types';
import { t } from 'i18next';

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
          label={t('등록')}
        />
      </ContentsButtons>
      <MainContents>
        <TrainingPlaceList pageMode={EnPageMode.PAGE} />
      </MainContents>
    </PageContainer>
  );
}
