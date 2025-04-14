import React from 'react';
import { t } from 'i18next';
import { Button, Tabs, useModal } from '@learnway/ui';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { ContentsButtons } from '../../../../../../widgets/layout/ui/container/slot/contents-buttons';
import { MainContents } from '../../../../../../widgets/layout/ui/container/slot/main-contents';
import { PageContainer } from '../../../../../../widgets/layout/ui/container/page-container';
import { CompanyInfo } from './-tabs/company-info/company-info';
import { HrInfo } from './-tabs/hr-info/hr-info';

export const Route = createFileRoute('/_unauth/platform_test/company/company/view/')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const { confirm: openConfirm } = useModal();

  const handleDelete = async () => {
    console.log('handleDelete');
  };

  const handleSave = async () => {
    console.log('handleSave');
  };

  const tabItems = [
    {
      title: '회사정보',
      key: '회사정보',
      content: <CompanyInfo />,
    },
    {
      title: 'HR연동정보',
      key: 'HR연동정보',
      content: <HrInfo />,
    },
  ];

  const handleBeforeTabChange = async (currentTabKey: string, nextTabKey: string) => {
    // alert(1);
    console.log('handleBeforeTabChange', currentTabKey, nextTabKey);
    const isChanged = true;
    const isConform = isChanged && (await openConfirm('수정된 내용은 초기화 됩니다.'));
    console.log('isConfirm', isConform);
    return isChanged && isConform;
  };

  return (
    <PageContainer>
      <ContentsButtons>
        <Button type="button" variant="point" size="sm" onClick={handleDelete} label={t('삭제')} />
        <Button type="button" variant="primary" size="sm" onClick={handleSave} label={t('저장')} />
      </ContentsButtons>
      <MainContents>
        <Tabs
          type={'line'}
          size={'sm'}
          items={tabItems}
          onBeforeTabChange={handleBeforeTabChange}
        />
      </MainContents>
    </PageContainer>
  );
}
