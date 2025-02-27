import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { cn } from '@learnway/shared';
import { Popover, SelectOption } from '@learnway/ui';
import { IcoCheck, IcoArrowDown } from '@learnway/icons';
import { Button } from '@learnway/ui';
import { getDefaultLang } from '@learnway/config';
import { useFetchAuthUser } from '@learnway/config';

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
    <div className={`${styles.language_content}`}>
      <div className={styles.lang_wrap}>
        <ul className={styles.lang_list}>
          {data.map((code: SelectOption, index: number) => (
            <li>
              <Button
                key={`LANGUAGE${index}`}
                className={`${styles.btn} ${code.value === i18n.language ? styles.active : ''}`}
                onClick={() => handleLanguage(code.value)}>
                {code.label}
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
  const { data } = useFetchAuthUser();
  const { data: languageSelectOptions } = useLanguageSelectOptions();

  const { set: setLanguage } = useSetLanguage();

  return (
    <Popover
      popoverContent={<PopoverContent data={languageSelectOptions} />}
      className={cn(styles.btn_language, className)}
      side="bottom"
      align="end"
      sideOffset={5}>
      <span className={styles.select}>{getDefaultLang().toUpperCase()}</span>
      <IcoArrowDown width={16} height={16} stroke="#ffffff" />
    </Popover>
  );
};

export const Language = memo(LanguageComponent);
