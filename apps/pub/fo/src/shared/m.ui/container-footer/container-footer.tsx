import { memo, ReactNode } from 'react';
import styles from './container-footer.module.css';

interface ContainerFooterComponentProps {
  children: ReactNode;
}

function ContainerFooterComponent({ children }: ContainerFooterComponentProps) {
  return <div className={styles.start}>{children}</div>;
}

export const MobileContainerFooter = memo(ContainerFooterComponent);
