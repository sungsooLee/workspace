/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { isString } from 'lodash';

import { cn } from '@learnway/shared';

import styles from './sub-panel.module.css';

export interface SubPanelComponentProps {
  title?: string | ReactElement;
  actions?: ReactElement;
  className?: string;
  style?: any;
  children: ReactElement | ReactElement[];
}

export function SubPanelComponent({
  title,
  actions,
  className,
  children,
  style,
}: SubPanelComponentProps) {
  const { t } = useTranslation();

  return (
    <div className={cn(styles._start, className)} style={style}>
      <div className={styles._head}>
        <div className={cn(styles._title, 'nlp--sub-panel-title')}>
          {isString(title) ? t(title) : title}
        </div>
        <div className={styles._actions}>{actions}</div>
      </div>
      <div className={styles._body}>
        <div className={cn(styles._col, 'nlp--sub-panel-body')}>{children}</div>
      </div>
    </div>
  );
}

export const SubPanel = memo(SubPanelComponent);
