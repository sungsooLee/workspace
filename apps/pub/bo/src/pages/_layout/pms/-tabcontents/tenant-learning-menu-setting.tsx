import { FC } from 'react';
import { SectionLayout } from '../../-components/section-layout';

/* contents */
import { RoleListSearch } from '../-contents/role-list-search';

const TenantLearningMenuSettingComponent: FC<{}> = ({}) => {
  return (
    <SectionLayout contentsRatio={'third_children'}>
      <RoleListSearch />
    </SectionLayout>
  );
};

TenantLearningMenuSettingComponent.displayName = 'TenantLearningMenuSetting';
export const TenantLearningMenuSetting = TenantLearningMenuSettingComponent;
