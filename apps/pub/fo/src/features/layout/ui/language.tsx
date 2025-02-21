import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Popover } from '@learnway/ui';
import styles from './language.module.css';
import { IcoArrowDown } from '@learnway/icons';

const PopoverContent = () => {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const langs = [
    'Korea',
    'English',
    'French',
    'Arabic',
    'Indonesian',
    'Chinese Taiwan',
    'Japanese',
    'Deutsch',
    'Malay',
    'Nepali',
    'Spanish',
    'Portuguese',
  ];
  const handleClick = (idx: number): void => {
    setActiveIdx(idx);
  };

  return (
    <div className={`${styles.start} ${styles.language_content}`}>
      <div className={styles.lang_wrap}>
        <ul className={styles.lang_list}>
          {langs.map((langs, idx) => (
            <li>
              <Button
                key={idx}
                className={`${styles.btn} ${activeIdx === idx ? styles.active : ''}`}
                onClick={() => handleClick(idx)}>
                {langs}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

interface LanguageComponentProp {
  className?: string;
}

const LanguageComponent = ({ className }: LanguageComponentProp) => {
  return (
    <Popover
      popoverContent={<PopoverContent />}
      className={`${styles.btn_language} ${className}`}
      side="bottom"
      align="end"
      sideOffset={5}>
      <span className={styles.select}>{'KR'}</span>
      <IcoArrowDown width={16} height={16} stroke="#131C30" />
    </Popover>
  );
};

export const Language = memo(LanguageComponent);
