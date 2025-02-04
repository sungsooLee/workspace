import { useTranslation } from 'react-i18next';
import { useCodesByCodeGroup, type Code } from '../../../entities/system';
import { useFetchAuthUser } from '../../../entities/user';
import { CODE_GROUP, getDefaultLang } from '@learnway/config';
import { Popover, Avatar } from '@learnway/ui';
import { memo } from 'react';
import { useSetLanguage } from '../../system';
import { IcoCheck, IcoArrowDown } from '@learnway/icons';

import styles from './language.module.css';

const PopoverContent = ({ data }: { data?: Code[] }) => {
  const { t } = useTranslation();

  const { set: setLanguage } = useSetLanguage();

  const handleLang = (lang: string) => {
    setLanguage(lang);
  };

  if (!data || !data?.length) {
    return <></>;
  }

  return (
    <div className={styles.language_content}>
      <div className={styles.btn_wrap}>
        {data.map((code: Code, idx: number) => (
          <button
            type="button"
            key={idx}
            className={`${styles.btn} ${code.code === getDefaultLang() ? styles.active : ''}`}
            onClick={() => handleLang(code.code)}>
            {code.label} {code.code === getDefaultLang() && <IcoCheck width={20} height={20} />}
          </button>
        ))}
      </div>
    </div>
  );
};

const LanguageComponent = () => {
  const { data } = useFetchAuthUser();
  const { data: languageCodes } = useCodesByCodeGroup(CODE_GROUP.LANGUAGE_CODE);

  return (
    <Popover popoverContent={<PopoverContent data={languageCodes} />}>
      <button className={styles.btn_language}>
        <span className={styles.select}>{getDefaultLang()}</span>
        <IcoArrowDown width={16} height={16} stroke="#131C30" />
      </button>
    </Popover>
  );
};

export const Language = memo(LanguageComponent);
