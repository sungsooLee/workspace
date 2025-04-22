import { FC } from 'react';
import { SectionLayout } from '../../-components/section-layout';

const TenantLearningMenuSettingComponent: FC<{}> = ({}) => {
  return (
    <SectionLayout contentsRatio={'thirty'}>
      <p>추후 레이아웃 작업 예정</p>
    </SectionLayout>
  );
};

TenantLearningMenuSettingComponent.displayName = 'TenantLearningMenuSetting';
export const TenantLearningMenuSetting = TenantLearningMenuSettingComponent;
