import { createLazyFileRoute, useRouter } from '@tanstack/react-router';
import { t } from 'i18next';
import { useRef } from 'react';

import { CompanyDetail } from '@features/platform-management/company';
import { ContentsButtons, LinkBox, MainContents, PageContainer } from '@shared/ui';
import { EnFormMode } from '@types';
import { Button } from '@learnway/ui/button';

export const Route = createLazyFileRoute('/_layout/platform/company/management/regist')({
  component: RouteComponent });

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
            onClick={() => router.navigate({ to: '/platform/company/management' })}
            label={t('LABEL.button.list')}
          />
        </LinkBox>
        <Button
          variant="primary"
          size="sm"
          onClick={handleSaveClick}
          label={t('LABEL.button.save')}
        />
      </ContentsButtons>
      <MainContents>
        <CompanyDetail ref={formRef} mode={EnFormMode.ADD} />
      </MainContents>
    </PageContainer>
  );
}
