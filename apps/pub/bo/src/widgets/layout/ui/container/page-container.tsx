import { memo, ReactNode } from 'react';
// import { useTranslation } from 'react-i18next';
import { Breadcrumbs } from './breadcrumbs/breadcrumbs';

interface PageContainerComponentProps {
  children: ReactNode;
}

function PageContainerComponent({ children }: PageContainerComponentProps) {
  // const { t } = useTranslation();

  return (
    <div className="contents">
      <Breadcrumbs />
      {children}
    </div>
  );
}

export const PageContainer = memo(PageContainerComponent);
