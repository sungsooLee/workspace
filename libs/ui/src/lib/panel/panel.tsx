import { ReactNode, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { isString } from 'lodash';
import { useCreation } from 'ahooks';

import { cn, getRandomId } from '@learnway/shared';

import { Accordion } from '../accordion/accordion';
import { SubPanel } from './sub-panel/sub-panel';

//import './panel.css';
import styles from './panel.module.css';

export interface PanelComponentProps {
  title?: string | ReactNode;
  actions?: ReactNode;
  className?: string;
  style?: any;
  children?: ReactNode | ReactNode[];
  collapse?: { opened: boolean };
  headerBackgroudColor?: string;
  headerClassName?: string;
}

const PanelComponent = function ({
  title,
  actions,
  className,
  children,
  style,
  collapse,
}: PanelComponentProps) {
  const { t } = useTranslation();

  const [value, setValue] = useState<string[]>([]);

  const collapsedItem = useCreation(() => ({ title, value: getRandomId(), children }), []);

  useEffect(() => {
    if (collapse?.opened === true) {
      setValue([collapsedItem.value]);
    }
  }, [collapse?.opened]);

  if (collapse) {
    return (
      <Accordion
        type="multiple"
        items={[collapsedItem]}
        className={cn(styles._start, styles._collapse, 'nlp--panel-accordion')}
        value={value}
        onValueChange={(value: any) => {
          setValue(value as string[]);
        }}
      />
    );
  }

  return (
    <div className={cn(styles.start, className)} style={style}>
      <div className={cn(styles.header, 'nlp--panel-header', !title && !actions && styles.hide)}>
        <div className={cn(styles.title, 'nlp--panel-title', 'bg-slate-500 font-extrabold')}>
          {isString(title) ? t(title) : title}
        </div>
        <div className={styles.actions}>{actions}</div>
      </div>
      <div className={styles.body}>
        <div className={cn(styles.col, 'nlp--panel-body')}>{children}</div>
      </div>
    </div>
  );
};

PanelComponent.Sub = SubPanel;

export const Panel = PanelComponent;
