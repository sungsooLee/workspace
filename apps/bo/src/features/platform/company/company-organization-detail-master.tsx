import { FC, useEffect, useState, useCallback } from 'react';
import { useRouterState } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { SectionLayout } from '@widgets/layout/ui/container/section-layout/section-layout';
import { CompanyOrganizationTree } from './company-organization-tree';
import { CompanyOrganizationTarget } from './company-organization-target';

const CompanyOrganizationDetailMasterComponent: FC<any> = () => {
  const routerState = useRouterState();
  const companyCode = routerState.location.state?.companyCode;

  const { t } = useTranslation();

  return (
    <SectionLayout contentsRatio={'half'}>
      <CompanyOrganizationTree title={t('조직 - 원본')} />
      <CompanyOrganizationTarget />
    </SectionLayout>
  );
};

export const CompanyOrganizationDetailMaster = CompanyOrganizationDetailMasterComponent;
