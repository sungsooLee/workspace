import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { CODE_GROUP } from '@learnway/config';
import { Popover } from '@learnway/ui';
import styles from './language.module.css';
import { IcoCheck, IcoArrowDown } from '@learnway/icons';

import { useSetLanguage } from '../../../features/system';
import { useFetchAuthUser } from '../../../entities/user';
import { useCodesByCodeGroup } from '../../../entities/system';
import type { Code } from '../../../entities/system';

const PopoverContent = ({ data }: { data?: Code[] }) => {
  const { t } = useTranslation();

  const { set: setLanguage } = useSetLanguage();

  const handleLang = (lang: string) => {
    setLanguage(lang);
  };

  // Pub S
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const buttons = ['한국어', 'English'];
  const handleClick = (idx: number): void => {
    setActiveIdx(idx);
  };
  // Pub E

  if (!data || !data?.length) {
    return <></>;
  }

  return (
    // <div>
    //   <li key={`LANGUAGE-TITLE`}>{t('LANGUAGE')}</li>
    //   {data.map((code: Code, index: number) => {
    //     return (
    //       <li value={code.code} key={`LANGUAGE${index}`} onClick={() => handleLang(code.code)}>
    //         {code.label}
    //       </li>
    //     );
    //   })}
    // </div>

    // Pub S
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
    // Pub E
  );
};

const LanguageComponent = () => {
  const { data } = useFetchAuthUser();
  const { data: languageCodes } = useCodesByCodeGroup(CODE_GROUP.LANGUAGE_CODE);

  return (
    <Popover popoverContent={<PopoverContent data={languageCodes} />}>
      <button className={styles.btn_language}>
        {'KR'}
        <IcoArrowDown width={16} height={16} stroke="#fff" />
      </button>
    </Popover>
  );
};

export const Language = memo(LanguageComponent);
