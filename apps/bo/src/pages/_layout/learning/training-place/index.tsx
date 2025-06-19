import { t } from 'i18next';
import { createFileRoute, Link, useRouter } from '@tanstack/react-router';
import { Button } from '@learnway/ui';
import { PageContainer } from '@widgets/layout/ui/container/page-container';
import { ContentsButtons } from '@widgets/layout/ui/container/slot/contents-buttons';
import { MainContents } from '@widgets/layout/ui/container/slot/main-contents';
import { TrainingPlaceList } from '@features/learning/training-place/training-place-list';
import { EnPageMode } from '@types';

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
        <TrainingPlaceList mode={EnPageMode.PAGE} />
      </MainContents>
    </PageContainer>
  );
}
