import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { cn } from '@learnway/shared';
import { Popover, SelectOption } from '@learnway/ui';
import { IcoCheck, IcoArrowDown } from '@learnway/icons';
import { Button } from '@learnway/ui';

import { useSetLanguage, useLanguageSelectOptions } from '../../../platform';
import { useFetchAuthUser } from '../../../../entities/user';

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

interface LanguageComponentProp {
  className?: string;
}

const LanguageComponent = ({ className }: LanguageComponentProp) => {
  const { data } = useFetchAuthUser();
  const { data: languageSelectOptions } = useLanguageSelectOptions();

  return (
    <Popover
      popoverContent={<PopoverContent data={languageSelectOptions} />}
      className={cn(styles.btn_language, className)}
      side="bottom"
      align="end"
      sideOffset={5}>
      <span className={styles.select}>{'KR'}</span>
      <IcoArrowDown width={16} height={16} stroke="#ffffff" />
    </Popover>
  );
};

export const Language = memo(LanguageComponent);
