import { FC, useEffect, useState, useCallback } from 'react';
import { useRouterState } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { NoticeBox } from '@shared/ui';
import { cn } from '@learnway/shared';
import { SectionLayout } from '@widgets/layout/ui/container/section-layout/section-layout';
import { CompanyDetailHRUsergroup } from './company-detail-hr-usergroup';
import { CompanyOrganizationDetailTree } from '@features/platform/company/organization/ui/company-organization-detail-tree';

import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css'; // 화면 내 컨텐츠 레이아웃 css
import styles from '@learnway/styles/bo/features/role/role-info.module.css';
import { EnUserGroupType } from '@types';

const CompanyDetailHROrganizationComponent: FC<any> = () => {
  const routerState = useRouterState();
  const companyCode = routerState.location.state?.companyCode;

  const { t } = useTranslation();

  const [userGroupId, setUserGroupId] = useState<any>(null);

  const handleOnSelect = (node: any) => {
    console.log('# selected', node);
    if (node.type === 'COMPANY') setUserGroupId('');
    else setUserGroupId(node.id);
  };

  return (
    <SectionLayout contentsRatio={'thirty'}>
      <CompanyOrganizationDetailTree title={t('유저그룹 - 조직')} onSelect={handleOnSelect} />
      <div className={cn(styles.start, styles.wrap)}>
        <div className={cn(layoutStyles.inner)}>
          <CompanyDetailHRUsergroup
            userGroupId={userGroupId}
            userGroupType={EnUserGroupType.ORGANIZATION}
          />
        </div>
      </div>
    </SectionLayout>
  );
};

export const CompanyDetailHROrganization = CompanyDetailHROrganizationComponent;
