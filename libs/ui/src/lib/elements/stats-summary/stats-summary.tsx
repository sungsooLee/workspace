import { HTMLAttributes } from 'react';
// import { NumericFormat } from 'react-number-format';
import { cn } from '@learnway/shared';
import styles from './stats-summary.module.css';

export interface StatsSummaryData {
  label: string;
  value: number;
  unit?: string;
  percentage?: number;
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
          <span className={styles.value}>
            <span className={styles.num}>{`${new Intl.NumberFormat().format(stat.value)}`}</span>
            <span className={styles.unit}>
              {stat.unit ? stat.unit : '건'}
              {stat.percentage && <span>({stat.percentage}%)</span>}
            </span>
          </span>
        </div>
      ))}
    </div>
  );
};
