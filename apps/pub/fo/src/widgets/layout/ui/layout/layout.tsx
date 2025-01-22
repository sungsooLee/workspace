import { memo, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

// import { cn } from '@learnway/shared';

import { PageContainer } from '../container/page-container';

interface LayoutComponentProps {
  children: ReactNode;
}

function LayoutComponent({ children }: LayoutComponentProps) {
  const { t } = useTranslation();

  return (
    <div className="_container">
      <div className="container_inner">
        <main>
          <PageContainer>{children}</PageContainer>
        </main>
      </div>
    </div>
  );
}

export const Layout = memo(LayoutComponent);
