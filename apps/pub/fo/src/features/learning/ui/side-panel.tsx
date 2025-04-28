import { memo, useState } from 'react';

import styles from './side-panel.module.css';

interface SidePanelProps {
  className?: string;
}

const SidePanelComponent = ({ className }: SidePanelProps) => {
  return <div className={styles.start}>사이드패널 사이드패널 상세</div>;
};

export const SidePanel = memo(SidePanelComponent);
