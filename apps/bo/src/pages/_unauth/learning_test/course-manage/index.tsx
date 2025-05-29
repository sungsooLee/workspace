import React, { useCallback, useState } from 'react';
import { Button, GridBox, useGridBox, useModal } from '@learnway/ui';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { useSearchBox } from '@learnway/hooks';
import { PageContainer } from '@widgets/layout/ui/container/page-container';
import { ContentsButtons } from '@widgets/layout/ui/container/slot/contents-buttons';
import { MainContents } from '@widgets/layout/ui/container/slot/main-contents';
import { SearchBox } from '@shared/ui/search-box';
import { queryOptions } from '@entities/label-messages/service/label-messages.queries';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
import { LabelMessagesQueryParams } from '@types';
import { CourseTypeOptionCardModal } from '@features/learning/course';

export const Route = createFileRoute('/_unauth/learning_test/course-manage/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useTranslation();

  /**
   * 검색 실행 시 호출되는 핸들러
   * @param {any} data - 검색 조건 데이터
   */
  const handleOnSearch = useCallback((data: any) => {
    gridFetch(data);
  }, []);

  /**
   * 그리드에서 '추가' 버튼 클릭 시 호출되는 핸들러
   * 음수 임시 ID를 설정하여 새 항목 추가 모드로 전환
   */
  const handleGridAddClick = () => {
    setSelectedLabelMessageId(Date.now() * -1); // 음수 랜덤 값 설정
  };

  /**
   * 그리드의 행 선택 시 호출되는 핸들러
   * @param {any} row - 선택된 행 데이터
   */
  const handleGridRowSelect = (row: any) => {
    row && setSelectedLabelMessageId(row?.labelMessageId);
  };

  return (
    <PageContainer>
      <ContentsButtons>
        <Button
          type="button"
          variant="point"
          size="sm"
          label={t('LABEL.button.courseOpen')}
        />
      </ContentsButtons>
      <MainContents>
        <h1>main contents</h1>
      </MainContents>
    </PageContainer>
  );
}
