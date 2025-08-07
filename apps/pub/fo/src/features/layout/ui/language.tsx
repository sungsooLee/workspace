import { IcoArrowDown, IcoClose02, IcoLang } from '@learnway/icons';
import popoverInnerStyles from '@learnway/styles/fo/features/layout/ui/popover-inner.module.css';
import { Button } from '@learnway/ui/button';
import { ModalBody, ModalContainer, ModalTitle, useModal } from '@learnway/ui/modal';
import { Popover } from '@learnway/ui/popover';
import { memo, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import styles from './language.module.css';
const PopoverContent = () => {
  const [selectedLang, setSelectedLang] = useState('한국어');
  const languages = [
    { label: '한국어 (Korea)', value: 'ko' },
    { label: 'English (English)', value: 'en' },
    { label: 'Español (Spanish)', value: 'es' },
    { label: '(Arabic) العربية', value: 'ar' },
    { label: 'Русский (Russian)', value: 'ru' },
    { label: 'Français (French)', value: 'fr' },
    { label: 'Português (Portuguese)', value: 'pt' },
    { label: 'Bahasa Indonesia (Indonesian)', value: 'id' },
    { label: '中文 (Chinese)', value: 'zh' },
    { label: 'Tiếng Việt (Vietnamese)', value: 'vi' },
    { label: 'Türkçe (Turkish)', value: 'tr' },
    { label: 'ไทย (Thai)', value: 'th' },
    { label: 'Deutsch (German)', value: 'de' },
    { label: 'עִבְרִית (Hebrew)', value: 'he' },
    { label: 'नेपाली (Nepali)', value: 'ne' },
    { label: 'हिन्दी (Hindi)', value: 'hi' },
    { label: '日本語 (Japanese)', value: 'ja' },
  ];

  return (
    <>
      {/* PC */}
      <BrowserView>
        <div className={`${styles.start} ${popoverInnerStyles.start}`}>
          <div className={popoverInnerStyles.title_area}>
            <h2>언어</h2>
            <Popover.Close>
              <Button variant="expand" size="sm" onlyIcon>
                <IcoClose02 className={popoverInnerStyles.btn_close} />
              </Button>
            </Popover.Close>
          </div>

          <div className={styles.lang_area}>
            <ul className={styles.lang_list}>
              {languages.map((lang) => (
                <li key={lang.value}>
                  <Button
                    label={lang.label}
                    className={selectedLang === lang.label ? styles.active : ''}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </BrowserView>

      {/* Mobile */}
      <MobileView>
        <ModalContainer>
          <ModalTitle>{'언어'}</ModalTitle>
          <ModalBody>
            <div className={`${styles.start} ${popoverInnerStyles.start}`}>
              <div className={styles.lang_area}>
                <ul className={styles.lang_list}>
                  {languages.map((lang) => (
                    <li key={lang.value}>
                      <Button
                        label={lang.label}
                        className={selectedLang === lang.label ? styles.active : ''}
                      />
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

const LanguageComponent = ({ className }: LanguageComponentProp) => {
  const { closeModal } = useModal();
  const { openModal } = useModal();
  return (
    <>
      {/* pc */}
      <BrowserView>
        <Popover
          popoverContent={<PopoverContent />}
          className={`${styles.btn_language} ${className}`}
          side="bottom"
          align="end"
          sideOffset={5}
        >
          <IcoLang className={styles.ic_lang} />
          <span className={styles.select}>{'KR'}</span>
          <IcoArrowDown width={16} height={16} stroke="#131C30" />
        </Popover>
      </BrowserView>

      {/* mobile */}
      <MobileView>
        <Button
          className={`${styles.btn_language} ${className}`}
          onClick={() =>
            openModal({
              width: 'm_full',
              content: <PopoverContent />,
            })
          }
        >
          <IcoLang className={styles.ic_lang} />
          <span className={styles.select}>{'KR'}</span>
          <IcoArrowDown width={16} height={16} stroke="#131C30" />
        </Button>
      </MobileView>
    </>
  );
};

export const Language = memo(LanguageComponent);
