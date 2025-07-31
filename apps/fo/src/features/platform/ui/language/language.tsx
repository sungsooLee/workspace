import { Link } from '@tanstack/react-router';
import { memo, useMemo } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { useTranslation } from 'react-i18next';

import { useFetchAuthUser } from '@learnway/auth/entities';
import { CODE_GROUP, getDefaultLang } from '@learnway/config';
import { useCodeGroup, useLanguageStore } from '@learnway/hooks';
import { IcoArrowDown, IcoLang } from '@learnway/icons';
import { cn } from '@learnway/shared';
import { Popover } from '@learnway/ui/popover';

import { useCodesByCodeGroup, type Code } from '../../../../entities/platform';
import { useSetLanguage } from '../../service/i18n.hook';

import { Button } from '@learnway/ui/button';
import { useCreation } from 'ahooks';
import { lowerCase } from 'lodash';
import styles from './language.module.css';

const DEFAULT_LANGUAGE_CODES = ['ko', 'en'];

const PopoverContent = () => {
  const { t } = useTranslation();

  const { data: authUser } = useFetchAuthUser();
  const { data: langCodes } = useCodeGroup('pms.multilingual.LangCountryCode', {});
  const { set: setLanguage } = useSetLanguage();

  // 다국어 공통코드
  const languages = useMemo(() => {
    if (!langCodes) return [];

    return langCodes.map((lang) => ({
      label: lang.cdContent,
      enLabel: lang.referenceVal1.engLanguageName,
      value: lowerCase(lang.cdId),
    }));
  }, [langCodes]);

  const handleLang = (lang: string) => {
    setLanguage(lang);
  };

  return (
    <div className={`${styles.start} ${styles.language_content}`}>
      <div className={styles.lang_wrap}>
        <ul className={styles.lang_list}>
          {languages.map((language, idx) => (
            <Popover.Close asChild>
              <li>
                <Button
                  key={idx}
                  className={`${styles.btn} ${language.value === getDefaultLang() ? styles.active : ''}`}
                  onClick={() => handleLang(language.value)}
                >
                  {`${language.label} (${language.enLabel})`}
                </Button>
              </li>
            </Popover.Close>
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
  const { data: authUser } = useFetchAuthUser();
  const { data: languageCodes } = useCodesByCodeGroup(CODE_GROUP.LANGUAGE_CODE);
  const { data: langCodes } = useCodeGroup('pms.multilingual.LangCountryCode', {});
  const { lang, setLang } = useLanguageStore((state) => state);

  console.log('@@@ authUser', authUser);
  console.log('@@@ lang', lang);

  // 현재 선택한 다국어
  const currentLanguage = useMemo(() => {
    const languag = langCodes?.find(({ cdId }) => lowerCase(cdId) === lang);

    if (languag) {
      return `${languag.cdId}`;
    }

    return lang;
  }, [langCodes, lang]);

  const languages = useCreation(() => {
    if (!languageCodes) {
      return [];
    }
    if (!authUser) {
      return languageCodes.filter((code: Code) => DEFAULT_LANGUAGE_CODES.includes(code.code));
    }
    return languageCodes;
  }, [authUser]);

  console.log('@@@ currentLanguage', currentLanguage);

  return (
    <>
      <BrowserView>
        <Popover
          className={cn(styles.btn_language, className)}
          side="bottom"
          align="end"
          sideOffset={5}
          popoverContent={<PopoverContent />}
        >
          <IcoLang className={styles.ic_lang} />
          <span className={styles.select}>{currentLanguage}</span>
          <IcoArrowDown width={16} height={16} stroke="#131C30" />
        </Popover>
      </BrowserView>
      <MobileView>
        <Link to="/" className={`${styles.btn_language} ${className}`}>
          <IcoLang className={styles.ic_lang} />
          <span className={styles.select}>{currentLanguage}</span>
          <IcoArrowDown width={16} height={16} stroke="#131C30" />
        </Link>
      </MobileView>
    </>
  );
};

export const Language = memo(LanguageComponent);
