import { useCreation } from 'ahooks';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useFetchAuthUser, useLogoutUser } from '@learnway/auth/entities';
import { useCodeGroup, useLanguageStore } from '@learnway/hooks';
import { Avatar } from '@learnway/ui/avatar';
import { Button } from '@learnway/ui/button';
import { useModal } from '@learnway/ui/modal';
import { Switch } from '@learnway/ui/switch';
  IcoChart,
  IcoClose02,
  IcoLearning03,
  IcoPaper,
  IcoPoint,
  IcoRocket,
} from '@learnway/icons';
import { cn } from '@learnway/shared';
import { Popover } from '@learnway/ui/popover-list';

import { useSetLanguage } from '@features/platform';
import languagestyles from '@learnway/styles/fo/features/layout/ui/user-avatar/language.module.css';
import popoverInnerStyles from '@learnway/styles/fo/features/layout/ui/user-avatar/popover-inner.module.css';
import styles from '@learnway/styles/fo/features/layout/ui/user-avatar/user-avatar.module.css';
import { useRouter } from '@tanstack/react-router';
import { lowerCase } from 'lodash';

//import { useLoginTimeout } from '../../../feature/platform/service/loginTimeout.hooks';

export const AvataFallback = ({ name }: { name?: string }) => {
  const firstUnit = useCreation(() => {
    if (!name) {
      return '';
    }
    return name.substring(0, 1);
  }, [name]);
  return (
    <span className={cn(styles.fallback, styles.name)}>
      <em className={styles.text}>{firstUnit}</em>
    </span>
  );
};

interface ProfileMenu {
  title: string;
  action: () => void;
}

const PopoverContent = () => {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const { confirm: openConfirm, openModal } = useModal();
  const { set: setLanguage } = useSetLanguage();
  const { data: authUser } = useFetchAuthUser();
  const { data: langCodes } = useCodeGroup('pms.multilingual.LangCountryCode', {});
  const { lang, setLang } = useLanguageStore((state) => state);

  const { logout } = useLogoutUser();

  const [isChecked, setIsChecked] = useState(false);
  const [contentType, setContentType] = useState<'profile' | 'lang'>('profile');

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

  // const handleClickAlert2 = () => {
  //   openConfirm({
  //     title: <>로그인 시간을 연장하시겠습니까?</>,
  //     content: (
  //       <>
  //         로그인 후 2시간이 남은 시간 경과 후 로그아웃 됩니다.
  //         <br />
  //         로그인 시간을 연장하시겠습니까?
  //         <div className="time">
  //           남은시간 : <strong>4분 59초</strong>
  //         </div>
  //       </>
  //     ),
  //     okButtonLabel: '로그인연장',
  //     cancelButtonLabel: '취소',
  //   });
  // };

  const logoutAlert = async () => {
    const feedback = await openConfirm({
      title: <></>,
      content: <>{t('로그아웃 하시겠습니까?')}</>,
    });
    feedback && logout();
  };

  return (
    <div className={`${styles.start} ${popoverInnerStyles.start}`}>
      <div className={popoverInnerStyles.title_area}>
        <h2>{contentType === 'profile' ? t('내정보') : t('언어')}</h2>
        {contentType === 'profile' ? (
          <Popover.Close asChild>
            <Button variant="expand" size="sm" onlyIcon>
              <IcoClose02 className={popoverInnerStyles.btn_close} />
            </Button>
          </Popover.Close>
        ) : (
          <Button variant="expand" size="sm" onlyIcon onClick={() => setContentType('profile')}>
            <IcoClose02 className={popoverInnerStyles.btn_close} />
          </Button>
        )}
      </div>
      {contentType === 'profile' ? (
        // 내정보
        <div className={styles.avatar_area}>
          <div className={styles.profile_info}>
            <div className={styles.avatar_img}>
              {/* 이미지일경우 */}
              <Avatar imageUrl="https://github.com/shadcn.png" size="2xl" />
              {/* 텍스트일경우 */}
              {/* <Avatar fallback="AB" size="2xl" /> */}
              <span className={styles.ico}>
                <Button variant="ghost" size="ts" onlyIcon={true} icon={<IcoLearning03 />} />
              </span>
            </div>
            <div className={styles.profile}>
              <div className={styles.info_box}>
                <span className={styles.name}>{authUser?.name}</span>
                <Button size="sm" underline={true} label={t('개인정보변경')} />
              </div>
              <div className={styles.tenant}>
                <span>{authUser?.company?.name}</span>
                <span>{authUser?.dept?.deptName}</span>
                <span>직군/직무</span>
              </div>
            </div>
          </div>

          <div className={styles.point_box}>
            <IcoPoint className={styles.ico} />
            <span className={styles.txt}>{t('나의 포인트')}</span>
            <span className={styles.point}>
              <em>243</em>P
            </span>
          </div>

          <Button variant="primary" size="xl" className={styles.btn_my}>
            {t('나의 학습')}
          </Button>

          <div className={styles.recent_visits}>
            <h3>{t('최근 방문')}</h3>
            <ul className={styles.list}>
              <li>
                <Button className={styles.btn}>
                  <span className={styles.ico}>
                    <IcoChart />
                  </span>
                  <span className={styles.txt}>{t('결재함')}</span>
                </Button>
              </li>
              <li>
                <Button className={styles.btn}>
                  <span className={styles.ico}>
                    <IcoPaper />
                  </span>
                  <span className={styles.txt}>{t('학습이력')}</span>
                </Button>
              </li>
              <li>
                <Button className={styles.btn}>
                  <span className={styles.ico}>
                    <IcoRocket />
                  </span>
                  <span className={styles.txt}>{t('찜한 과정')}</span>
                </Button>
              </li>
            </ul>
          </div>
          <ul className={styles.info_list}>
            <li></li>
            <li>
              <span className={styles.txt}>{t('알림')}</span>
              <Switch
                checked={isChecked}
                onCheckedChange={setIsChecked}
                label={isChecked ? 'ON' : 'OFF'}
              />
            </li>

            <li>
              <span className={styles.txt}>{t('언어')}</span>
              <Button
                variant="arrow"
                size="md"
                label={currentLanguage}
                onClick={() => setContentType('lang')}
              />
            </li>

            <li>
              <span className={styles.txt}>{t('HRD 센터')}</span>
              <Button variant="arrow" size="md" label={t('바로가기')} />
            </li>

            <li>
              <span className={styles.txt}>{t('권한 신청')}</span>
              <Button variant="arrow" size="md" label={t('바로가기')} />
            </li>
          </ul>

          <div className={styles.btn_log}>
            <Button
              size="md"
              underline={true}
              label={t('로그아웃')}
              onClick={() => logoutAlert()}
            />
          </div>
        </div>
      ) : (
        // 언어 language.tsx 동일
        // 퍼블수정 20250728 : languagestyles 스타일 */}
        <div className={languagestyles.lang_area}>
          <ul className={languagestyles.lang_list}>
            {languages.map((lang) => (
              <li key={lang.value}>
                <Button
                  label={`${lang.label} (${lang.enLabel}) `}
                  className={
                    authUser?.userLanguageSetCode === lang.value ? languagestyles.active : ''
                  }
                  onClick={() => {
                    setLanguage(lang.value);
                    setContentType('profile'); // 다시 profile 화면으로 전환
                  }}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const AvatarCompoment = ({ className }: any) => {
  const { data: authUser } = useFetchAuthUser();

  return (
    <Popover
      popoverContent={<PopoverContent />}
      className={cn(styles.btn_avatar, className)}
      side="bottom"
      align="end"
      sideOffset={10}
    >
      <Avatar imageUrl={authUser?.avataImage} fallback={<AvataFallback name={authUser?.name} />} />
    </Popover>
  );
};

export const UserAvatar = AvatarCompoment;
