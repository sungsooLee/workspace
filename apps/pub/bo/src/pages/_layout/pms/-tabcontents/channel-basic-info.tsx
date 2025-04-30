import { FC } from 'react';
import { cn } from '@learnway/shared';

/* style */
import styles from './channel-basic-info.module.css';
const ChannelBasicInfoComponent: FC<{}> = ({}) => {
  return <div className={cn(styles.start, styles.wrap)}></div>;
};

ChannelBasicInfoComponent.displayName = 'ChannelBasicInfo';
export const ChannelBasicInfo = ChannelBasicInfoComponent;
