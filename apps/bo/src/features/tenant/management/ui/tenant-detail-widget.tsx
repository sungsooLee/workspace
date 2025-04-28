import { FC, useState } from 'react';
import { t } from 'i18next';

import { NoticeBox } from '@shared/ui/';
import { SectionLayout } from './components/section-layout';

/* contents */
import { TenantDetailWidgetList } from './tenant-detail-widget-list';
import { TenantDetailWidgetDetail } from './tenant-detail-widget-detail';

const TenantDetailWidgetComponent: FC<any> = () => {
  return (
    <>
      <NoticeBox
        iconVisible={false}
        descriptions={[
          t('위젯을 추가 등록하려면 위젯추가 버튼을 클릭해 주세요.'),
          t(
            '위젯 순서 변경은 드래그앤드랍으로 변경하며, 노출 여부는 우측에서 스위치 버튼으로 설정할 수 있습니다.',
          ),
          t('위젯 순서 변경 후에 저장 버튼을 클릭해야 저장됩니다.'),
        ]}
        type="bullet"
      />
      <SectionLayout isLineVisible={true}>
        <TenantDetailWidgetList />
        <TenantDetailWidgetDetail />
      </SectionLayout>
    </>
  );
};

export const TenantDetailWidget = TenantDetailWidgetComponent;
