import { FC, useEffect, useState, useCallback } from 'react';
import { useRouterState } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { SectionLayout } from '@widgets/layout/ui/container/section-layout/section-layout';
import { CompanyOrganizationDetailTree } from '@features/platform/company/organization/ui/company-organization-detail-tree';
import { CompanyOrganizationDetailTarget } from '@features/platform/company/organization/ui/company-organization-detail-target';

const CompanyOrganizationDetailMasterComponent: FC<any> = () => {
  const routerState = useRouterState();
  const companyCode = routerState.location.state?.companyCode;

  const { t } = useTranslation();

  return (
    <SectionLayout contentsRatio={'half'}>
      <CompanyOrganizationDetailTree title={t('조직 - 원본')} />
      <CompanyOrganizationDetailTarget />
    </SectionLayout>
  );
};

export const CompanyOrganizationDetailMaster = CompanyOrganizationDetailMasterComponent;
