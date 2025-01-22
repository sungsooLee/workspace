import { useState } from 'react';
import { memo } from 'react';
import { Popover } from '@learnway/ui';
import styles from './language.module.css';
import { IcoArrowDown } from '@learnway/icons';

const PopoverContent = () => {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const buttons = ['한국어', 'English'];
  const handleClick = (idx: number) => {
    setActiveIdx(idx);
  };

  return (
    <div className={styles.language_content}>
      <div className={styles.btn_wrap}>
        {/* {buttons.map((btn, idx) => {
          <button
            type="button"
            key={idx}
            className={
              `${styles.btn} ${activeIdx === idx ? styles.active : ''}`
            }
            onClick={()=> handleClick(idx)}
            >
            {btn}
          </button>;
        })} */}
      </div>
      <button type="button">한국어</button>
      <button type="button">English</button>
    </div>
  );
};

const LanguageComponent = () => {
  return (
    <Popover popoverContent={<PopoverContent />}>
      <span className={styles.text_value}>
        {'KR'}
        <IcoArrowDown width={16} height={16} stroke="#fff" />
      </span>
    </Popover>
  );
};

export const Language = memo(LanguageComponent);
