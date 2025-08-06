import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { useFetchAuthUser } from '@learnway/auth/entities';
import { getDefaultLang } from '@learnway/config';
import { IcoArrowDown, IcoCheck02, IcoMap01 } from '@learnway/icons';
import { cn } from '@learnway/shared';
import { Popover } from '@learnway/ui/popover';

import { useLanguageSelectOptions, useSetLanguage } from '@features/layout';

import { Button } from '@learnway/ui/button';
import { SelectOption } from '@learnway/ui/type';
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
                onClick={() => handleLanguage(code.value)}
                label={code.label}
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
  const { data } = useFetchAuthUser();
  const { data: languageSelectOptions } = useLanguageSelectOptions();

  const { set: setLanguage } = useSetLanguage();

  return (
    <Popover
      popoverContent={<PopoverContent data={languageSelectOptions} />}
      className={cn(styles.btn_language, className)}
      side="bottom"
      align="end"
      sideOffset={5}
    >
      <IcoMap01 width={24} height={24} className={styles.icon_map} />
      <span className={styles.select}>{getDefaultLang().toUpperCase()}</span>
      <IcoArrowDown width={16} height={16} stroke="#ffffff" className={styles.icon_arrow} />
    </Popover>
  );
};

export const Language = memo(LanguageComponent);
