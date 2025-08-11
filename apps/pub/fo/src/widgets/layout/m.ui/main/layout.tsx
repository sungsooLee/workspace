import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

//import styles from './layout.module.css';
import styles from '@learnway/styles/fo/widgets/layout/m.ui/main/layout.module.css';
import { Footer } from '../../ui/main/footer/footer';
import { MobileContainerHeader } from './container/container-header';

interface LayoutComponentProps {
  children: ReactNode;
}

function LayoutComponent({ children }: LayoutComponentProps) {
  const { t } = useTranslation();

  return (
    <div className={styles.start}>
      {/*<MobileHeader /> */}
      <MobileContainerHeader />
      <main>{children}</main>
      {/* 하단 반응형 footer */}
      <Footer />
      {/* {pageMeta?.mobile?.showFooter && <MobileFooter />} */}
      {/*  <MobileFooter />*/}
    </div>
  );
}

export const MobileLayout = LayoutComponent;
