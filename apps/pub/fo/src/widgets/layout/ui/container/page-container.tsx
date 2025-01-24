import { memo, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

interface PageContainerComponentProps {
  children: ReactNode;
}

function PageContainerComponent({ children }: PageContainerComponentProps) {
  const { t } = useTranslation();

  return (
    <div className="">
      <div>{'title'}</div>
      <div>{children}</div>
    </div>
  );
}

export const PageContainer = memo(PageContainerComponent);
