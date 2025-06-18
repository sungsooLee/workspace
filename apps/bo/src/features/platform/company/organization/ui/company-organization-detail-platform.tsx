import { FC, useEffect, useState, useCallback } from 'react';

import { useTranslation } from 'react-i18next';
import { SectionLayout } from '@widgets/layout/ui/container/section-layout/section-layout';
import { CompanyOrganizationDetailTree } from '@features/platform/company/organization/ui/company-organization-detail-tree';
import { CompanyOrganizationDetailTarget } from '@features/platform/company/organization/ui/company-organization-detail-target';

const CompanyOrganizationDetailPlatformComponent: FC<any> = () => {
  const { t } = useTranslation();

  return (
    <SectionLayout contentsRatio={'half'}>
      <CompanyOrganizationDetailTree title={t('조직 - 플랫폼')} />
      <CompanyOrganizationDetailTarget />
    </SectionLayout>
  );
};

export const CompanyOrganizationDetailPlatform = CompanyOrganizationDetailPlatformComponent;
