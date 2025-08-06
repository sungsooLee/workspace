import { lowerCase } from 'lodash-es';
import { useMemo, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useTranslation } from 'react-i18next';

import { useFetchAuthUser, useLogoutUser, useUserDetail } from '@learnway/auth/entities';
import { useCodeGroup, useLanguageStore } from '@learnway/hooks';
import { IcoCheck02 } from '@learnway/icons';
import { Button } from '@learnway/ui/button';
import { useModal } from '@learnway/ui/modal';

import { useSetLanguage } from '@features/layout';

import languagestyles from '@learnway/styles/fo/features/layout/ui/user-avatar/language.module.css';
import userMyStyles from '@learnway/styles/fo/features/layout/ui/user-avatar/user-my.module.css';

//TODO 최근 방문한 화면 아이콘은 어떻게 처리 하나요?
/**
 * @description user-avata 컨텐츠
 * @returns
 */
const UserAvatarContentsLanguageComponent = ({ contentType, setContentType }: any) => {
  const { t } = useTranslation();
  const { confirm: openConfirm, openModal } = useModal();
  const { set: setLanguage } = useSetLanguage();
  const { data: authUser } = useFetchAuthUser();
  const { data: user } = useUserDetail();

  const { data: langCodes } = useCodeGroup('pms.multilingual.LangCountryCode', {});
  const { lang } = useLanguageStore((state) => state);

  const { logout } = useLogoutUser();

  const [isChecked, setIsChecked] = useState(false);

  // 다국어 공통코드
  const languages = useMemo(() => {
    if (!langCodes) return [];

    return langCodes.map((lang) => ({
      label: lang.cdContent,
      enLabel: lang.referenceVal1.engLanguageName,
      value: lowerCase(lang.cdId),
    }));
  }, [langCodes]);

  // 현재 선택한 다국어
  const currentLanguage = useMemo(() => {
    const languag = langCodes?.find(({ cdId }) => lowerCase(cdId) === lang);

    if (languag) {
      return `${languag.cdContent} (${languag.referenceVal1.engLanguageName})`;
    }
    return lang;
  }, [lang, langCodes]);

  return (
    <div className={userMyStyles.start}>
      <div className={languagestyles.lang_area}>
        <ul className={languagestyles.lang_list}>
          {languages.map((language) => (
            <li key={language.value}>
              <Button
                className={language.value === lang ? languagestyles.active : ''}
                onClick={() => {
                  setLanguage(language.value);
                }}
              >
                {`${language.label} (${language.enLabel})`}
                {isMobile && language.value === lang && (
                  <IcoCheck02 width={16} height={16} stroke="#0056ff" />
                )}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export const UserAvatarContentsLanguage = UserAvatarContentsLanguageComponent;
