import { memo } from 'react';
import { cn } from '@learnway/shared';
import styles from './section-layout.module.css';

interface SectionLayoutComponentProps {
  isLineVisible?: boolean;
  children: React.ReactNode;
  className?: string;
  contentsRatio?: string; // half | thirty | seventy
}

function SectionLayoutComponent({
  isLineVisible,
  children,
  className,
  contentsRatio,
}: SectionLayoutComponentProps) {
  return (
    <div
      className={cn(
        styles.start,
        contentsRatio ? styles[contentsRatio] : styles.half,
        isLineVisible && styles.line,
        className,
      )}
    >
      {children}
    </div>
  );
}

export const SectionLayout = memo(SectionLayoutComponent);
