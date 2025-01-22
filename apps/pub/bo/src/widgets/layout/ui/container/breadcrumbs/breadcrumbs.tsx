import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { cn } from '@learnway/shared';

function BreadcrumbsComponent() {
  const { t } = useTranslation();

  return <div className="">Home</div>;
}

export const Breadcrumbs = memo(BreadcrumbsComponent);
