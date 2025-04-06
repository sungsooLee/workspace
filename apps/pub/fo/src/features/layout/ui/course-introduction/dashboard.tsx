import { memo, useState, useEffect } from 'react';
import { Link, useRouter } from '@tanstack/react-router';
import { IcoMenu01 } from '@learnway/icons';
import { Button } from '@learnway/ui';
import styles from './dashboard.module.css';

const CourseDashboardCompoment = () => {
  return <div className={`${styles.start} ${styles.dashboard}`}>대시보드</div>;
};

export const CourseDashboard = memo(CourseDashboardCompoment);
