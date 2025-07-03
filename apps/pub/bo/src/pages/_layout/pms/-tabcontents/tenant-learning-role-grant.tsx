import { FC } from 'react';
import { SectionLayout } from '../../-components/section-layout';

/* contents */
import { RoleListSearch } from '../-contents/role-list-search';
import { RoleGrant } from '../-contents/role-grant';

const TenantLearningRoleGrantComponent: FC<{}> = ({}) => {
  return (
    <SectionLayout contentsRatio={'thirty'}>
      <RoleListSearch />
      <RoleGrant />
    </SectionLayout>
  );
};

TenantLearningRoleGrantComponent.displayName = 'TenantLearningRoleGrant';
export const TenantLearningRoleGrant = TenantLearningRoleGrantComponent;
