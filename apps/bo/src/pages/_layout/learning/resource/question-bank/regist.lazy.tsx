import { useEffect, useState } from 'react';
import { t } from 'i18next';

import { useLearningResourceQuestionDetailForm } from '@features/learning-resource/learning-resource-management/service/learning-resource-question-detail-from.hook';
import { LearningResourceQuestionBank } from '@features/learning-resource/learning-resource-management/ui/learning-resource-question-bank';
import { ContentsButtons, LinkBox, MainContents, PageContainer } from '@shared/ui';
import { createLazyFileRoute, useRouter } from '@tanstack/react-router';
import { EnFormMode } from '@types';
import { Button } from '@learnway/ui/button';
import { useModal } from '@learnway/ui/modal';

export const Route = createLazyFileRoute('/_layout/learning/resource/question-bank/regist')({
  component: RouteComponent });

function RouteComponent() {
  const router = useRouter();

  const { confirm: openConfirm } = useModal();
  const { formMode, saveButtonClick, setBaseInfo } = useLearningResourceQuestionDetailForm();

  const handleListButtonClick = async () => {
    if (formMode === EnFormMode.ADD) {
      router.navigate({ to: '/learning/learning-resource' });
      return;
    }
    if (
      await openConfirm({
        title: t('이동 하시겠습니까?'),
        content: t('입력 중인 항목이 초기화됩니다.') })
    ) {
      router.navigate({ to: '/learning/learning-resource' });
    }
  };

  useEffect(() => {
    setBaseInfo(undefined);
  }, []);

  return (
    <PageContainer>
      <ContentsButtons>
        <LinkBox>
          <Button label="목록" variant="point" size="sm" onClick={handleListButtonClick} />
        </LinkBox>

        <Button label="저장" variant="primary" size="sm" onClick={() => saveButtonClick()} />
      </ContentsButtons>
      <MainContents>
        <LearningResourceQuestionBank />
      </MainContents>
    </PageContainer>
  );
}
