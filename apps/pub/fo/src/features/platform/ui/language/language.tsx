import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Popover, SelectOption } from '@learnway/ui';
import { IcoCheck, IcoArrowDown } from '@learnway/icons';
import { Button } from '@learnway/ui';

import { useSetLanguage, useLanguageSelectOptions } from '../../../platform';

import styles from './language.module.css';

const PopoverContent = ({ data }: { data?: SelectOption[] }) => {
  const { t, i18n } = useTranslation();

  const { set: setLanguage } = useSetLanguage();

  const handleLanguage = (lang: string) => {
    setLanguage(lang);
  };

  if (!data || !data?.length) {
    return <></>;
  }

  return (
    <div className={styles.start}>
      <div className={styles.btn_wrap}>
        {data.map((code: SelectOption, index: number) => (
          <Button
            key={`LANGUAGE${index}`}
            className={`${styles.btn} ${code.value === i18n.language ? styles.active : ''}`}
            onClick={() => handleLanguage(code.value)}>
            {code.label} {code.value === i18n.language && <IcoCheck width={20} height={20} />}
          </Button>
        ))}
      </div>
    </div>
  );
};

const LanguageComponent = () => {
  //const { data: languageSelectOptions } = useLanguageSelectOptions();

  const languageSelectOptions: any[] = [];

  return (
    <Popover popoverContent={<PopoverContent data={languageSelectOptions} />}>
      <button className={styles.btn_language}>
        {'KR'}
        <IcoArrowDown width={16} height={16} stroke="#111" />
      </button>
    </Popover>
  );
};

export const Language = memo(LanguageComponent);
