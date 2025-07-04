import { memo, useState } from 'react';
import { cn } from '@learnway/shared';
import { IcoClock01 } from '@learnway/icons';
import { Accordion } from '@learnway/ui';

import styles from './curriculum.module.css';

interface CurriculumProps {
  className?: string;
}

const CurriculumComponent = ({ className }: CurriculumProps) => {
  const [curriculumValue, setCurriculumValue] = useState<string>('a');
  const accordionValueItems = [
    {
      value: 'a',
      title: (
        <div className={styles.title}>
          <p>
            1일 업무를 10분만에 해결하는 파이썬 업무자동화<span>1시간</span>
          </p>
        </div>
      ),
      children: (
        <ol className={styles.list}>
          <li>
            <div className={styles.box}>
              <p>1.현업사례로 보는 업무자동화에 파이썬이 필요한 이유</p>
              <div>
                <span>이북</span>
                <span>
                  <IcoClock01 width={20} height={20} stroke="#131416" />
                  <span>1시간 3분</span>
                </span>
              </div>
            </div>
          </li>
          <li>
            <div className={styles.box}>
              <p>2.현업사례로 보는 업무자동화에 파이썬이 필요한 이유</p>
              <div>
                <span>동영상</span>
                <span>
                  <IcoClock01 width={20} height={20} stroke="#131416" />
                  <span>1시간 3분</span>
                </span>
              </div>
            </div>
          </li>
        </ol>
      ),
    },
    {
      value: 'b',
      title: (
        <div className={styles.title}>
          <p>
            1일 업무를 10분만에 해결하는 파이썬 업무자동화<span>1시간</span>
          </p>
        </div>
      ),
      children: (
        <ol className={styles.list}>
          <li>
            <div className={styles.box}>
              <p>1.현업사례로 보는 업무자동화에 파이썬이 필요한 이유</p>
              <div>
                <span>이북</span>
                <span>
                  <IcoClock01 width={20} height={20} stroke="#131416" />
                  <span>1시간 3분</span>
                </span>
              </div>
            </div>
          </li>
          <li>
            <div className={styles.box}>
              <p>2.현업사례로 보는 업무자동화에 파이썬이 필요한 이유</p>
              <div>
                <span>동영상</span>
                <span>
                  <IcoClock01 width={20} height={20} stroke="#131416" />
                  <span>1시간 3분</span>
                </span>
              </div>
            </div>
          </li>
        </ol>
      ),
    },
  ];

  return (
    <div className={cn(styles.start, styles.curriculum, className)}>
      <Accordion
        items={accordionValueItems}
        value={curriculumValue}
        className={styles.acc_curriculum}
        onValueChange={(value) => setCurriculumValue(value as string)}
        type="multiple"
      />
    </div>
  );
};

export const Curriculum = memo(CurriculumComponent);
