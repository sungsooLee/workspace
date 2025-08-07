import { lowerCase } from 'lodash-es';
import { memo, useMemo } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { useTranslation } from 'react-i18next';

import { useCodeGroup, useLanguageStore } from '@learnway/hooks';
import { IcoArrowDown, IcoCheck02, IcoClose02, IcoLang } from '@learnway/icons';
import { cn } from '@learnway/shared';
import { Popover } from '@learnway/ui/popover';

import { useSetLanguage } from '@features/layout/service/i18n.hook';

import { Button } from '@learnway/ui/button';
import { ModalBody, ModalContainer, ModalTitle, useModal } from '@learnway/ui/modal';

import popoverInnerStyles from '@learnway/styles/fo/features/layout/ui/popover-inner.module.css';
import styles from './language.module.css';

const LanguageContent = () => {
  const { t } = useTranslation();
  const { data: langCodes } = useCodeGroup('pms.multilingual.LangCountryCode', {});
  const { set: setLanguage } = useSetLanguage();
  const { lang } = useLanguageStore((state) => state);
  const { closeModal } = useModal();
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
    <>
      <BrowserView>
        <div className={`${styles.start} ${popoverInnerStyles.start}`}>
          <div className={popoverInnerStyles.title_area}>
            <h2>{t('언어')}</h2>
            <Popover.Close>
              <Button variant="expand" size="sm" onlyIcon>
                <IcoClose02 className={popoverInnerStyles.btn_close} />
              </Button>
            </Popover.Close>
          </div>

          <div className={styles.lang_area}>
            <ul className={styles.lang_list}>
              {languages.map((language, idx) => (
                <Popover.Close asChild>
                  <li key={`languages_${idx}`}>
                    <Button
                      onClick={() => handleLang(language.value)}
                      className={language.value === lang ? styles.active : ''}
                    >
                      {`${language.label} (${language.enLabel})`}
                    </Button>
                  </li>
                </Popover.Close>
              ))}
            </ul>
          </div>
        </div>
      </BrowserView>
      {/* Mobile */}
      <MobileView>
        <ModalContainer>
          <ModalTitle>{t('언어')}</ModalTitle>
          <ModalBody>
            <div className={`${styles.start} ${popoverInnerStyles.start}`}>
              <div className={styles.lang_area}>
                <ul className={styles.lang_list}>
                  {languages.map((language, idx) => (
                    <li key={`languages_${idx}`}>
                      <Button
                        onClick={() => {
                          handleLang(language.value);
                          closeModal();
                        }}
                        className={language.value === lang ? styles.active : ''}
                      >
                        {`${language.label} (${language.enLabel})`}
                        {language.value === lang && (
                          <IcoCheck02 width={16} height={16} stroke="#0056ff" />
                        )}
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ModalBody>
        </ModalContainer>
      </MobileView>
    </>
  );
};

interface LanguageComponentProp {
  className?: string;
}

const AuthLanguageComponent = ({ className }: LanguageComponentProp) => {
  const { data: langCodes } = useCodeGroup('pms.multilingual.LangCountryCode', {});
  const { lang } = useLanguageStore((state) => state);
  const { openModal } = useModal();
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
          popoverContent={<LanguageContent />}
        >
          <IcoLang className={styles.ic_lang} />
          <span className={styles.select}>{currentLanguage}</span>
          <IcoArrowDown width={16} height={16} stroke="#131C30" />
        </Popover>
      </BrowserView>
      <MobileView>
        <Button
          className={`${styles.btn_language} ${className}`}
          onClick={() =>
            openModal({
              width: 'm_full',
              content: <LanguageContent />,
            })
          }
        >
          <IcoLang className={styles.ic_lang} />
          <span className={styles.select}>{currentLanguage}</span>
          <IcoArrowDown width={16} height={16} stroke="#131C30" />
        </Button>
      </MobileView>
    </>
  );
};

/**
 * @description FO 로그인 화면 언어설정, MO, PC
 */
export const AuthLanguage = memo(AuthLanguageComponent);
