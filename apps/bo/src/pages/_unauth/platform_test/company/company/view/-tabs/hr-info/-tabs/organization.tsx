import { useTranslation } from 'react-i18next';
import React from 'react';

const OrganizationComponent = () => {
  const { t } = useTranslation();
  return (
    <div className={'flex flex-row'}>
      <div className="basis-5/12">A</div>
      <div className="basis-7/12">B</div>
    </div>
  );
};

export const Organization = OrganizationComponent;
