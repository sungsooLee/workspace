import { lowerCase } from 'lodash-es';
import { useMemo, useState } from 'react';
import { BrowserView, isMobile } from 'react-device-detect';
import { useTranslation } from 'react-i18next';

import { useFetchAuthUser, useLogoutUser, useUserDetail } from '@learnway/auth/entities';
import { useCodeGroup, useLanguageStore } from '@learnway/hooks';
import { IcoBookFill, IcoHeartFill, IcoLearning03, IcoPoint } from '@learnway/icons';
import { getFullImagePath } from '@learnway/shared';
import { Avatar } from '@learnway/ui/avatar';
import { Button } from '@learnway/ui/button';
import { useModal } from '@learnway/ui/modal';
import { Switch } from '@learnway/ui/switch';

import { useSetLanguage } from '@features/platform';

import userMyStyles from '@learnway/styles/fo/features/layout/ui/user-avatar/user-my.module.css';

import { LanguageModal } from '@features/layout/m.ui/language-modal';
import { useRouter } from '@tanstack/react-router';
import { AvataFallback } from './user-avatar-fallback';

//TODO 최근 방문한 화면 아이콘은 어떻게 처리 하나요?
/**
 * @description user-avata 컨텐츠
 * @returns
 */
const UserAvatarContentsComponent = ({ contentType, setContentType }: any) => {
  const { t } = useTranslation();
  const { confirm: openConfirm, openModal } = useModal();
  const { set: setLanguage } = useSetLanguage();
  const { data: authUser } = useFetchAuthUser();
  const { data: user } = useUserDetail();

  const { data: langCodes } = useCodeGroup('pms.multilingual.LangCountryCode', {});
  const { lang } = useLanguageStore((state) => state);

  const { logout } = useLogoutUser();
  const { navigate } = useRouter();

  const [isChecked, setIsChecked] = useState(false);

  const logoutAlert = async () => {
    const feedback = await openConfirm({
      title: <></>,
      content: <>{t('로그아웃 하시겠습니까?')}</>,
    });
    feedback && logout();
  };

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

  const goToInformationChange = () => {
    navigate({ to: '/my-page/information-change' });
  };

  return (
    <div className={userMyStyles.start}>
      <div className={userMyStyles.avatar_area}>
        <div className={userMyStyles.profile_info}>
          <div className={userMyStyles.avatar_img}>
            {/* 이미지일경우 */}
            <Avatar
              imageUrl={getFullImagePath(authUser?.avataImage)}
              size="2xl"
              fallback={<AvataFallback name={authUser?.name} />}
            />
            {/* 텍스트일경우 */}
            {/* <Avatar fallback="AB" size="2xl" /> */}
            <span className={userMyStyles.ico}>
              <Button variant="ghost" size="ts" onlyIcon={true} icon={<IcoLearning03 />} />
            </span>
          </div>
          <div className={userMyStyles.profile}>
            <div className={userMyStyles.info_box}>
              <span className={userMyStyles.name}>{authUser?.name}</span>
              <Button
                onClick={goToInformationChange}
                size="sm"
                underline={true}
                label={t('개인정보변경')}
              />
            </div>
            <div className={userMyStyles.tenant}>
              <span>{authUser?.company?.name}</span>
              <span>{authUser?.dept?.deptName}</span>
              <span>직군/직무</span>
            </div>
          </div>
        </div>

        <div className={userMyStyles.point_box}>
          <IcoPoint className={userMyStyles.ico} />
          <span className={userMyStyles.txt}>{t('나의 포인트')}</span>
          <span className={userMyStyles.point}>
            <em>243</em>P
          </span>
        </div>

        <div className={userMyStyles.btn_my_box}>
          {isMobile ? (
            <>
              <Button className={userMyStyles.btn_my}>
                <IcoBookFill width={40} height={40} />
                {t('나의 학습')}
              </Button>
              <Button className={userMyStyles.btn_heart}>
                <IcoHeartFill width={40} height={40} />
                {t('찜한 과정')}
              </Button>
            </>
          ) : (
            <Button variant="primary" size="xl" className={userMyStyles.btn_my}>
              {t('나의 학습')}
            </Button>
          )}
        </div>

        <div className={userMyStyles.recent_visits}>
          <h3>{t('최근 방문')}</h3>
          {/* <ul className={userMyStyles.list}>
              <li>
                <Button className={userMyStyles.btn}>
                  <span className={userMyStyles.ico}>
                    <IcoChart />
                  </span>
                  <span className={userMyStyles.txt}>{t('결재함')}</span>
                </Button>
              </li>
              <li>
                <Button className={userMyStyles.btn}>
                  <span className={userMyStyles.ico}>
                    <IcoPaper />
                  </span>
                  <span className={userMyStyles.txt}>{t('학습이력')}</span>
                </Button>
              </li>
              <li>
                <Button className={userMyStyles.btn}>
                  <span className={userMyStyles.ico}>
                    <IcoRocket />
                  </span>
                  <span className={userMyStyles.txt}>{t('찜한 과정')}</span>
                </Button>
              </li>
            </ul> */}
          {/* 방문 x */}
          <div className={userMyStyles.no_list}>
            <p>{t('아직 방문한 화면이 없어요.')}</p>
          </div>
        </div>
        <ul className={userMyStyles.info_list}>
          <li></li>
          <li>
            <span className={userMyStyles.txt}>{t('알림')}</span>
            <Switch
              checked={isChecked}
              onCheckedChange={setIsChecked}
              label={isChecked ? 'ON' : 'OFF'}
            />
          </li>

          <li>
            <span className={userMyStyles.txt}>{t('언어')}</span>
            <Button
              variant="arrow"
              size="md"
              label={currentLanguage}
              onClick={() => {
                setContentType('lang');
                if (isMobile) {
                  openModal({
                    width: 'm_full',
                    content: <LanguageModal />,
                  });
                }
              }}
            />
          </li>

          <li>
            <span className={userMyStyles.txt}>{t('HRD 센터')}</span>
            <Button variant="arrow" size="md" label={t('바로가기')} />
          </li>

          <li>
            <span className={userMyStyles.txt}>{t('권한 신청')}</span>
            <Button variant="arrow" size="md" label={t('바로가기')} />
          </li>
        </ul>
        <BrowserView>
          <div className={userMyStyles.btn_log}>
            <Button
              size="md"
              underline={true}
              label={t('로그아웃')}
              onClick={() => logoutAlert()}
            />
          </div>
        </BrowserView>
      </div>
    </div>
  );
};

export const UserAvatarContents = UserAvatarContentsComponent;
