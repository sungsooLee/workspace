import { useTranslation } from 'react-i18next';
import React from 'react';

const DesignationComponent = () => {
  const { t } = useTranslation();
  return <div className={'flex flex-col'}>Designation.tsx</div>;
};

export const Designation = DesignationComponent;
