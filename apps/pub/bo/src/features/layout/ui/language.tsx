import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { cn } from '@learnway/shared';
import { Button, Popover } from '@learnway/ui';
import styles from './language.module.css';
import { IcoArrowDown, IcoCheck02 } from '@learnway/icons';

const PopoverContent = () => {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const langs = ['Korea', 'English'];
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
                onClick={() => handleClick(idx)}
                label={langs}
                icon={
                  <IcoCheck02
                    width={16}
                    height={16}
                    stroke="#131c30"
                    className={styles.icon_check}
                  />
                }
              />
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
      className={cn(styles.btn_language, className)}
      side="bottom"
      align="end"
      sideOffset={5}
    >
      <span className={styles.select}>{'KR'}</span>
      <IcoArrowDown width={16} height={16} stroke="#ffffff" />
    </Popover>
  );
};

export const Language = memo(LanguageComponent);
