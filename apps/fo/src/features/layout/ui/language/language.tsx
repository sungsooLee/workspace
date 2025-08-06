import { Link } from '@tanstack/react-router';
import { memo, useMemo } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { useTranslation } from 'react-i18next';

import { useFetchAuthUser } from '@learnway/auth/entities';
import { useCodeGroup, useLanguageStore } from '@learnway/hooks';
import { IcoArrowDown, IcoLang } from '@learnway/icons';
import { cn } from '@learnway/shared';
import { Popover } from '@learnway/ui/popover';

import { useSetLanguage } from '../../service/i18n.hook';

import { Button } from '@learnway/ui/button';
import { lowerCase } from 'lodash-es';
import styles from './language.module.css';

const DEFAULT_LANGUAGE_CODES = ['ko', 'en'];

const PopoverContent = () => {
  const { t } = useTranslation();

  const { data: authUser } = useFetchAuthUser();
  const { data: langCodes } = useCodeGroup('pms.multilingual.LangCountryCode', {});
  const { set: setLanguage } = useSetLanguage();
  const { lang } = useLanguageStore((state) => state);

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
    console.log('@@@ handleLang', lang);
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
                  className={`${styles.btn} ${language.value === lang ? styles.active : ''}`}
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
  const { data: langCodes } = useCodeGroup('pms.multilingual.LangCountryCode', {});
  const { lang } = useLanguageStore((state) => state);

  // 현재 선택한 다국어
  const currentLanguage = useMemo(() => {
    const languag = langCodes?.find(({ cdId }) => lowerCase(cdId) === lang);

    if (languag) {
      return `${languag.cdId}`;
    }

    return lang;
  }, [langCodes, lang]);

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

/**
 * @description FO 로그인 화면 언어설정
 */
export const Language = memo(LanguageComponent);
