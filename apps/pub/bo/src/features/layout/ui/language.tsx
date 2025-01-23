import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Popover } from '@learnway/ui';
import styles from './language.module.css';
import { IcoCheck, IcoArrowDown } from '@learnway/icons';

const PopoverContent = () => {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const buttons = ['한국어', 'English'];
  const handleClick = (idx: number): void => {
    setActiveIdx(idx);
  };

  return (
    <div className={styles.language_content}>
      <div className={styles.btn_wrap}>
        {buttons.map((btn, idx) => (
          <button
            type="button"
            key={idx}
            className={`${styles.btn} ${activeIdx === idx ? styles.active : ''}`}
            onClick={() => handleClick(idx)}>
            {btn} {activeIdx === idx && <IcoCheck width={20} height={20} />}
          </button>
        ))}
      </div>
    </div>
  );
};

const LanguageComponent = () => {
  // const { data } = useFetchAuthUser();
  // const { data: languageCodes } = useCodesByCodeGroup(CODE_GROUP.LANGUAGE_CODE);

  return (
    <Popover popoverContent={<PopoverContent />}>
      <button className={styles.btn_language}>
        <span className={styles.select}>{'KR'}</span>
        <IcoArrowDown width={16} height={16} stroke="#fff" />
      </button>
    </Popover>
  );
};

export const Language = memo(LanguageComponent);
