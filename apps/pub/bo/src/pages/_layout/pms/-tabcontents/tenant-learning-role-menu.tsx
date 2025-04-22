import { FC } from 'react';
import { SectionLayout } from '../../-components/section-layout';

/* contents */
import { RoleList } from '../-contents/role-list';
import { RoleInfo } from '../-contents/role-info';

const TenantLearningRoleMenuComponent: FC<{}> = ({}) => {
  return (
    <SectionLayout contentsRatio={'thirty'}>
      <RoleList />
      <RoleInfo />
    </SectionLayout>
  );
};

TenantLearningRoleMenuComponent.displayName = 'TenantLearningRoleMenu';
export const TenantLearningRoleMenu = TenantLearningRoleMenuComponent;
