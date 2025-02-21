import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { cn } from '@learnway/shared';

import { MobileHeader } from './m.header/m.header';

import styles from './m.layout.module.css';

interface LayoutComponentProps {
  children: ReactNode;
}

function LayoutComponent({ children }: LayoutComponentProps) {
  const { t } = useTranslation();

  return (
    <>
      <MobileHeader />
      <main>
        <p>Mobile layout </p>
        {children}
      </main>
    </>
  );
}

export const MobileLayout = LayoutComponent;
