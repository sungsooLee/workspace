import { IcoClock01 } from '@learnway/icons';
import { cn, getHourValueFromTime } from '@learnway/shared';
import { memo } from 'react';
import { isMobile } from 'react-device-detect';

import { CurriculumData, LessonContentType, LessonContentTypeLabel } from '@entities/curriculum';
import styles from '@learnway/styles/fo/features/layout/ui/curriculum.module.css';

interface CurriculumProps {
  curriculumData: CurriculumData[];
  className?: string;
}

const CurriculumComponent = ({ className, curriculumData }: CurriculumProps) => {
  const calcTime = (time: any) => {
    if (!time) return '-';

    const hh = getHourValueFromTime(time).hour;
    const mm = getHourValueFromTime(time).minute;
    const ss = getHourValueFromTime(time).second;

    return hh || mm ? (hh ? `${hh}시간 ` : '') + (mm ? `${mm}분` : '') : ss ? `${ss}초` : '0';
  };

  return (
    <div className={cn(styles.start, styles.curriculum, className)}>
      <ol className={styles.list}>
        {curriculumData.map((curriculumItems) => (
          <li key={curriculumItems.lessonId}>
            <div className={styles.box}>
              <p>{curriculumItems.lessonName}</p>
              <div>
                {isMobile ? (
                  ''
                ) : (
                  <span>
                    {LessonContentTypeLabel[curriculumItems.contentType as LessonContentType] || ''}
                  </span>
                )}
                <span className={styles.type}>
                  <IcoClock01 width={20} height={20} stroke="#131416" />
                  <span>{calcTime(curriculumItems.learningTime)}</span>
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
