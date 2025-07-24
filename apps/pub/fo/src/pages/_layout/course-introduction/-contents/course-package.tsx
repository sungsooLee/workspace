import { FC } from 'react';
import { cn } from '@learnway/shared';

/* style */
import styles from './course-package.module.css';

const CoursePackageComponent: FC = () => {
  return (
    <div className={cn(styles.start)}>
      <div>1111</div>
    </div>
  );
};

CoursePackageComponent.displayName = 'CoursePackage';
export const CoursePackage = CoursePackageComponent;
