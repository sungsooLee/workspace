import { useCallback, useEffect } from 'react';
import { Button } from '@learnway/ui';
import { createFileRoute, Link, useRouter } from '@tanstack/react-router';
import { t } from 'i18next';
import { GridBox, useGridBox } from '../../../../../shared/ui/grid-box';
import { PageContainer } from '../../../../../widgets/layout/ui/container/page-container';
import { ContentsButtons } from '../../../../../widgets/layout/ui/container/slot/contents-buttons';
import { MainContents } from '../../../../../widgets/layout/ui/container/slot/main-contents';
import { translationQueryOptions } from '../../../../../entities/translation/service/translation.queries';
import { DATE_TIME_FORMAT, getDateToString } from '@learnway/shared';
import { SearchBoxConfig, useSearchBox } from '@learnway/hooks';
import { SearchBox } from '../../../../../shared/ui/search-box';

export const Route = createFileRoute('/_layout/platform/system/label/')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  /**
   * 등록화면 이동
   */
  const handleNewTranslation = () => {
    //router.navigate({ to: '/platform/system/translation', state: { keyType: 'COMMON_CODE' } });
  };

  return (
    <PageContainer>
      <ContentsButtons>
        <Button type="button" variant="point" size="sm" onClick={handleNewTranslation}>
          등록
        </Button>
      </ContentsButtons>
      <MainContents>
        <span>Contents</span>
      </MainContents>
    </PageContainer>
  );
}
