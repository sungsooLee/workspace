import { FC, useEffect, useState, useCallback } from 'react';

import { useTranslation } from 'react-i18next';
import { SectionLayout } from '@widgets/layout/ui/container/section-layout/section-layout';
import { CompanyOrganizationTree } from './company-organization-tree';
import { CompanyOrganizationTarget } from './company-organization-target';

const CompanyOrganizationDetailPlatformComponent: FC<any> = () => {
  const { t } = useTranslation();

  return (
    <SectionLayout contentsRatio={'half'}>
      <CompanyOrganizationTree title={t('조직 - 플랫폼')} />
      <CompanyOrganizationTarget />
    </SectionLayout>
  );
};

export const CompanyOrganizationDetailPlatform = CompanyOrganizationDetailPlatformComponent;
