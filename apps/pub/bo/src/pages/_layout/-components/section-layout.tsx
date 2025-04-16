import { memo } from 'react';
import { cn } from '@learnway/shared';
import styles from './section-layout.module.css';

interface SectionLayoutComponentProps {
  isLineVisible?: boolean;
  children: React.ReactNode;
  className?: string;
}

function SectionLayoutComponent({
  isLineVisible,
  children,
  className,
}: SectionLayoutComponentProps) {
  return (
    <div className={cn(styles.start, styles.half, isLineVisible && styles.line, className)}>
      {children}
    </div>
  );
}

export const SectionLayout = memo(SectionLayoutComponent);
