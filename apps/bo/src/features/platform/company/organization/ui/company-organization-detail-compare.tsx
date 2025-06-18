import { FC, useEffect, useState, useCallback } from 'react';
import { useRouterState } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { SectionLayout } from '@widgets/layout/ui/container/section-layout/section-layout';
import { CompanyOrganizationDetailTree } from '@features/platform/company/organization/ui/company-organization-detail-tree';

const CompanyOrganizationDetailCompareComponent: FC<any> = () => {
  const routerState = useRouterState();
  const companyCode = routerState.location.state?.companyCode;

  const { t } = useTranslation();

  return (
    <SectionLayout contentsRatio={'half'}>
      <CompanyOrganizationDetailTree title={t('조직 - 원본')} />
      <CompanyOrganizationDetailTree title={t('조직 - 플랫폼')} />
    </SectionLayout>
  );
};

export const CompanyOrganizationDetailCompare = CompanyOrganizationDetailCompareComponent;
