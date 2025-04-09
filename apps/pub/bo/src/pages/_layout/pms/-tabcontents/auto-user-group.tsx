import { FC } from 'react';
import { cn } from '@learnway/shared';
import styles from './auto-user-group.module.css';
// eslint-disable-next-line no-empty-pattern
const AutoUserGroupComponent: FC<{}> = ({}) => {
  return <div className={cn(styles.start, styles.wrap)}></div>;
};

AutoUserGroupComponent.displayName = 'AutoUserGroup';
export const AutoUserGroup = AutoUserGroupComponent;
