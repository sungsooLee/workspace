import { IcoClock01 } from '@learnway/icons';
import { cn, getHourValueFromTime } from '@learnway/shared';
import { memo } from 'react';
import { isMobile } from 'react-device-detect';

import styles from '@learnway/styles/fo/features/layout/ui/curriculum.module.css';

type DateTime = string;
interface CurriculumData {
  // txt: string;
  // type?: string;
  // time: string;

  mappingCurriculumType?: string;
  lessonId?: number;
  lessonName?: string;
  lessonType?: string;
  sortOrder?: number;
  contentUuid?: string;
  contentType?: string;
  learningTime?: number;
  createdBy?: string;
  createdDate?: DateTime;
  lastModifiedBy?: string;
  modifiedDate?: DateTime;
  lessonDescription?: string;
}

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
        {curriculumData.map((curriculumItems, index) => (
          <li key={curriculumItems.lessonId}>
            <div className={styles.box}>
              <p>{curriculumItems.lessonName}</p>
              <div>
                {isMobile ? '' : <span>{curriculumItems.contentType}</span>}
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
