import { memo, ReactNode, FC } from 'react';
import { MobileView, BrowserView } from 'react-device-detect';

import { cn, getSlot } from '@learnway/shared';

import styles from './mobile-responsive-container-footer.module.css';

interface ContainerFooterComponentProps {
  children: ReactNode;
  mobileChildren?: ReactNode;
}

function ContainerFooterComponent({ children, mobileChildren }: ContainerFooterComponentProps) {
  const BrowserSlot = getSlot(children, BrowserFooter);
  const MobileSlot = getSlot(children, MobileFooter);

  return (
    <>
      <BrowserView>{BrowserSlot}</BrowserView>
      <MobileView>
        <div className={`${styles.start} ${styles.btn_wrap}`}>{MobileSlot ?? BrowserSlot}</div>
      </MobileView>
    </>
  );
}

export const MobileResponsiveContainerFooter = memo(ContainerFooterComponent);

/**
 * BrowserFooter
 * @param children
 * @constructor
 */
export const BrowserFooter: FC<{ children: ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

/**
 * MobileFooter
 * @param children
 * @constructor
 */
export const MobileFooter: FC<{ children: ReactNode }> = ({ children }) => {
  return <>{children}</>;
};
