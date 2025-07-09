import { t } from 'i18next';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { PageContainer, MainContents, ContentsButtons } from '@shared/ui';
import { Button } from '@learnway/ui';
import { pageRouteConfig } from '@features/auth/index';
import { InstructorList } from '@features/platform/instructor';

export const Route = createFileRoute('/_layout/platform/instructor/management/')({
  component: RouteComponent,
  ...pageRouteConfig({}),
});

function RouteComponent() {
  const router = useRouter();

  return (
    <PageContainer>
      <ContentsButtons>
        <Button
          variant="primary"
          size="sm"
          onClick={() =>
            router.navigate({
              to: '/platform/instructor/management/instructor-regist',
            })
          }
        >
          {t('등록')}
        </Button>
      </ContentsButtons>
      <MainContents>
        <InstructorList />
      </MainContents>
    </PageContainer>
  );
}
