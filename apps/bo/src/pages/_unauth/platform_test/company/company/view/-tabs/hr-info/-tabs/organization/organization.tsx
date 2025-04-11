import { useTranslation } from 'react-i18next';
import React from 'react';
import { OrganizationTree } from './organization-tree';
import { OrganizationTable } from './organization-table';

const OrganizationComponent = () => {
  const { t } = useTranslation();
  return (
    <div className={'flex flex-row'}>
      <div className="w-[200px]">
        <OrganizationTree />
      </div>
      <div className="flex-1">
        <OrganizationTable />
      </div>
    </div>
  );
};

export const Organization = OrganizationComponent;
