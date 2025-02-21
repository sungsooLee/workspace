import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { cn } from '@learnway/shared';
import { CODE_GROUP, getDefaultLang } from '@learnway/config';
import { Popover, Button } from '@learnway/ui';
import { IcoArrowDown } from '@learnway/icons';
import { useFetchAuthUser } from '@learnway/config';

import { useSetLanguage } from '../../service/i18n.hook';
import { useCodesByCodeGroup, type Code } from '../../../../entities/platform';

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
    // <div className={styles.language_content}>
    //   <div className={styles.btn_wrap}>
    //     {data.map((code: Code, idx: number) => (
    //       <button
    //         type="button"
    //         key={idx}
    //         className={`${styles.btn} ${code.code === getDefaultLang() ? styles.active : ''}`}
    //         onClick={() => handleLang(code.code)}>
    //         {code.label} {code.code === getDefaultLang() && <IcoCheck width={20} height={20} />}
    //       </button>
    //     ))}
    //   </div>
    // </div>
    <div className={`${styles.start} ${styles.language_content}`}>
      <div className={styles.lang_wrap}>
        <ul className={styles.lang_list}>
          {data.map((code, idx) => (
            <li>
              <Button
                key={idx}
                className={`${styles.btn} ${code.code === getDefaultLang() ? styles.active : ''}`}
                onClick={() => handleLang(code.code)}>
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
  const { data: languageCodes } = useCodesByCodeGroup(CODE_GROUP.LANGUAGE_CODE);

  return (
    <Popover
      className={cn(styles.btn_language, className)}
      side="bottom"
      align="center"
      sideOffset={5}
      popoverContent={<PopoverContent data={languageCodes} />}>
      <span className={styles.select}>{getDefaultLang()}</span>
      <IcoArrowDown width={16} height={16} stroke="#131C30" />
    </Popover>
  );
};

export const Language = memo(LanguageComponent);
