import { HTMLAttributes } from 'react';
import { NumericFormat } from 'react-number-format';
import styles from './stats-summary.module.css';
import { cn } from '@learnway/shared';

export interface StatsSummaryData {
  label: string;
  value: number;
}

export interface StatsSummaryComponentProps extends HTMLAttributes<HTMLDivElement> {
  data: Array<StatsSummaryData>;
}

export const StatsSummary = ({ data, ...props }: StatsSummaryComponentProps) => {
  return (
    <div className={cn(styles.start, styles.summary_wrap, 'nlp-stats-summary')}>
      {data.map((stat, idx) => (
        <div key={stat.label} className={styles.item}>
          <span className={styles.label}>{stat.label}</span>
          <span className={styles.num}>
            <NumericFormat className={styles.value} value={stat.value} thousandSeparator readOnly />
          </span>
        </div>
      ))}
    </div>
  );
};
