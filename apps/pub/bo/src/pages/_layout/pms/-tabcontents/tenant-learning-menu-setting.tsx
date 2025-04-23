import { FC } from 'react';
import { SectionLayout } from '../../-components/section-layout';

/* contents */
import { RoleListSearch } from '../-contents/role-list-search'; // 역할 목록
import { MenuSetting } from '../-contents/menu-setting'; // 메뉴 설정
import { ApiList } from '../-contents/api-list'; // API 목록

const TenantLearningMenuSettingComponent: FC<{}> = ({}) => {
  return (
    <SectionLayout contentsRatio={'third_children'}>
      <RoleListSearch />
      <MenuSetting />
      <ApiList />
    </SectionLayout>
  );
};

TenantLearningMenuSettingComponent.displayName = 'TenantLearningMenuSetting';
export const TenantLearningMenuSetting = TenantLearningMenuSettingComponent;
