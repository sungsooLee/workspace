import { FC, useEffect, useState, useCallback } from 'react';
import { useRouterState } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { NoticeBox } from '@shared/ui';
import { cn } from '@learnway/shared';
import { SectionLayout } from '@widgets/layout/ui/container/section-layout/section-layout';
import { CompanyDetailHRUsergroup } from './company-detail-hr-usergroup';
import { CompanyOrganizationDetailTree } from './company-organization-detail-tree';

import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css'; // 화면 내 컨텐츠 레이아웃 css
import styles from '@learnway/styles/bo/features/role/role-info.module.css';

const CompanyDetailHROrganizationComponent: FC<any> = () => {
  const routerState = useRouterState();
  const companyCode = routerState.location.state?.companyCode;

  const { t } = useTranslation();

  return (
    <>
      <div className="p-10">
        <NoticeBox
          descriptions={[
            t('자동 유저그룹은 인사 DB를 기준으로 특정 시간에 배치로 자동 매핑됩니다.'),
            t('회사별로 자동 매핑되며, 유저그룹 설정 시 사용할 수 있습니다.'),
            t('기준일 {2025-05-15}'),
          ]}
        />
      </div>
      <SectionLayout contentsRatio={'thirty'}>
        <CompanyOrganizationDetailTree title={t('유저그룹 - 조직')} />
        <div className={cn(styles.start, styles.wrap)}>
          <div className={cn(layoutStyles.inner)}>
            <CompanyDetailHRUsergroup />
          </div>
        </div>
      </SectionLayout>
    </>
  );
};

export const CompanyDetailHROrganization = CompanyDetailHROrganizationComponent;
