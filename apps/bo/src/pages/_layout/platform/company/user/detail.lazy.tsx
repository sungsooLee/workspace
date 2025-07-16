import { useRef } from 'react';
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

  const formRef = useRef<HTMLFormElement>(null);
  const handleOnSave = () => {
    if (formRef.current?.saveData) formRef.current.saveData();
  };

  const handleOnReset = () => {
    if (formRef.current?.clearForm) formRef.current.clearForm();
  };

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
        <Button variant="point" size="sm" onClick={handleOnReset}>
          {t('LABEL.button.reset')}
        </Button>
        <Button variant="primary" size="sm" onClick={handleOnSave}>
          {t('LABEL.button.save')}
        </Button>
      </ContentsButtons>
      <MainContents>
        <CompanyUserDetail formRef={formRef} />
      </MainContents>
    </PageContainer>
  );
}
