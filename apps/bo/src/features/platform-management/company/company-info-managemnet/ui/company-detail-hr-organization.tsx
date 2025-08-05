import { CompanyOrganizationDetailTree } from '@features/platform-management/company/company-info-managemnet/ui/company-organization-detail-tree';
import { t } from 'i18next';
import { FC, useState } from 'react';
import { CompanyDetailHRUsergroup } from './company-detail-hr-usergroup';

import { SplitPanel } from '@learnway/ui/elements';
import { EnUserGroupType } from '@shared/types/enums';

const CompanyDetailHROrganizationComponent: FC<any> = () => {
  const [userGroupId, setUserGroupId] = useState<any>(null);

  const handleOnSelect = (node: any) => {
    console.log('# selected', node);
    if (node.type === 'COMPANY') setUserGroupId('');
    else setUserGroupId(node.id);
  };

  return (
    <SplitPanel size={['40%', 'auto']} divider>
      <CompanyOrganizationDetailTree title={t('유저그룹 - 조직')} onSelect={handleOnSelect} />
      <CompanyDetailHRUsergroup
        userGroupId={userGroupId}
        userGroupType={EnUserGroupType.ORGANIZATION}
      />
    </SplitPanel>
  );
};

export const CompanyDetailHROrganization = CompanyDetailHROrganizationComponent;
