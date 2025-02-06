import { ReactNode, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { isString } from 'lodash';

import { cn } from '@learnway/shared';

import { Button } from '../button/button';
import styles from './panel.module.css';
import { ChevronDown, ChevronUp } from 'lucide-react';

export interface PanelComponentProps {
  title?: ReactNode | string;
  actions?: ReactNode;
  className?: string;
  children?: ReactNode | ReactNode[];
  collapsible?: boolean; // collapse 사용 여부
  collapsed?: boolean; // 외부에서 collapsed 컨트롤 필요한 경우 사용
  headerClassName?: string;
  hideHeaderUnderline?: boolean;
}

const PanelComponent = function ({
  title,
  actions,
  className,
  children,
  collapsible,
  collapsed: ownerCollapsed,
  hideHeaderUnderline = false,
}: PanelComponentProps) {
  const { t } = useTranslation();

  const [collapsed, setCollapsed] = useState<boolean>(true);

  const handleClick = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    typeof ownerCollapsed === 'boolean' && setCollapsed(ownerCollapsed);
  }, [ownerCollapsed]);

  return (
    <div className={cn(styles.start, className, 'nlp--panel')}>
      {/* Header */}
      <div className={cn(styles.header, 'flex flex-row')}>
        {/* Title */}
        <div className={cn(styles.title, 'flex-1')}>{isString(title) ? t(title) : title}</div>
        {/* Action */}
        <div className={styles.actions}>{actions}</div>
        {/* Collapse Button */}
        {collapsible && (
          <Button icon={collapsed ? <ChevronUp /> : <ChevronDown />} onClick={handleClick} />
        )}
      </div>

      {/* Header Underline */}
      {!hideHeaderUnderline && <hr />}

      {/* Body */}
      <div className={cn(styles.body, !collapsed && 'hidden')}>
        <div className={cn(styles.col)}>{children}</div>
      </div>
    </div>
  );
};

export const Panel = PanelComponent;
