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
    <div className={cn(styles.start, 'nlp-stats-summary')}>
      <div className="flex items-center justify-between rounded-md bg-blue-50 px-4 py-3">
        {data.map((stat, idx) => (
          <div key={stat.label} className="flex flex-1 flex-col items-center">
            <span className="text-md mb-1 text-gray-400">{stat.label}</span>
            <span className="text-base">
              <NumericFormat value={stat.value} thousandSeparator readOnly />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
