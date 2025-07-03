import { useTranslation } from 'react-i18next';
import React from 'react';

const GroupComponent = () => {
  const { t } = useTranslation();
  return <div className={'flex flex-col'}>group.tsx</div>;
};

export const Group = GroupComponent;
