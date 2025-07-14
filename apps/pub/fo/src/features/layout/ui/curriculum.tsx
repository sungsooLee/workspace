import { memo } from 'react';
import { cn } from '@learnway/shared';
import { isMobile } from 'react-device-detect';
import { IcoClock01 } from '@learnway/icons';

import styles from './curriculum.module.css';

interface CurriculumData {
  txt: string;
  type?: string;
  time: string;
}

interface CurriculumProps {
  curriculumData: CurriculumData[];
  className?: string;
}

const CurriculumComponent = ({ className, curriculumData }: CurriculumProps) => {
  return (
    <div className={cn(styles.start, styles.curriculum, className)}>
      <ol className={styles.list}>
        {curriculumData.map((curriculumItems, index) => (
          <li key={index}>
            <div className={styles.box}>
              <p>{curriculumItems.txt}</p>
              <div>
                {isMobile ? '' : <span>{curriculumItems.type}</span>}
                <span className={styles.type}>
                  <IcoClock01 width={20} height={20} stroke="#131416" />
                  <span>{curriculumItems.time}</span>
                </span>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export const Curriculum = memo(CurriculumComponent);
