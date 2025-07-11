import { createLazyFileRoute, useRouter } from '@tanstack/react-router';
import { t } from 'i18next';
import { PageContainer, MainContents, LinkBox, ContentsButtons } from '@shared/ui';
import { Button } from '@learnway/ui';
import { CompanyUserDetail } from '@features/platform-management/company';

export const Route = createLazyFileRoute('/_layout/platform/company/user/detail')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();

  return (
    <PageContainer>
      <ContentsButtons>
        <LinkBox>
          <Button
            variant="point"
            size="sm"
            onClick={() => router.navigate({ to: '/platform/company/user' })}
          >
            {t('LABEL.button.list')}
          </Button>
        </LinkBox>
        <Button variant="point" size="sm">
          {t('LABEL.button.reset')}
        </Button>
        <Button type="submit" variant="primary" size="sm">
          {t('LABEL.button.save')}
        </Button>
      </ContentsButtons>
      <MainContents>
        <CompanyUserDetail />
      </MainContents>
    </PageContainer>
  );
}
