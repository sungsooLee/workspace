import { Button } from '@learnway/ui/button';
import { SplitPanel } from '@learnway/ui/elements';
import { LeftPanel } from '@pages/_unauth/sample/grid-box-sample/-components/left/left-panel';
import { ContentsButtons, MainContents, PageContainer } from '@shared/ui/layout';
import { createFileRoute } from '@tanstack/react-router';
import { t } from 'i18next';
import React, { useCallback, useState } from 'react';
import { RightPanel } from './-components/right/right-panel';

export const Route = createFileRoute('/_unauth/sample/grid-box-sample/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [listValue, setListValue] = useState<string>();
  const [params, setParams] = React.useState<any>();

  const handleReset = useCallback(() => {
    setListValue((state: any) => undefined);
    setParams((state: any) => undefined);
  }, []);

  const handleLeftPanelChange = useCallback((value: any) => {
    setListValue((state: any) => value);
    setParams((state: any) => ({ value }));
  }, []);

  return (
    <PageContainer>
      <ContentsButtons>
        <Button type="button" variant="point" size="sm" label={t('초기화')} onClick={handleReset} />
      </ContentsButtons>
      <MainContents>
        <SplitPanel size={['auto', 700]} divider>
          <LeftPanel value={listValue} onChange={handleLeftPanelChange} />
          <RightPanel params={params} />
        </SplitPanel>
      </MainContents>
    </PageContainer>
  );
}
