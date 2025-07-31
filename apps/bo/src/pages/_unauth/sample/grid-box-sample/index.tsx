import React, { useCallback, useState } from 'react';
import { t } from 'i18next';
import { createFileRoute } from '@tanstack/react-router';
import { SplitPanel } from '@learnway/ui/elements';
import { MainContents, PageContainer, ContentsButtons } from '@shared/ui';
import { RightPanel } from './-components/right/right-panel';
import { LeftPanel } from '@pages/_unauth/sample/grid-box-sample/-components/left/left-panel';
import { Button } from '@learnway/ui/button';

export const Route = createFileRoute('/_unauth/sample/grid-box-sample/')({
  component: RouteComponent });

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
