import { useCodeGroup } from '@learnway/hooks';
import {
  IcoBookFill,
  IcoChart,
  IcoCheck02,
  IcoHeartFill,
  IcoLearning03,
  IcoPaper,
  IcoPoint,
  IcoRocket,
} from '@learnway/icons';
import { Avatar } from '@learnway/ui/avatar';
import { Button } from '@learnway/ui/button';
import { useModal } from '@learnway/ui/modal';
import { Switch } from '@learnway/ui/switch';
import { memo, useEffect, useState } from 'react';
import { BrowserView, isMobile } from 'react-device-detect';
import languagestyles from './language.module.css';
import styles from './user-my.module.css';

interface LanguagePorps {
  language?: string;
  contentType: () => void;
  onChangelanguage: (newLanguage: string) => void;
}

interface ContentTypeProps {
  onChangeType: (value: string) => void; // 자식에서 부모에게 넘기는 컨텐츠 타입
  onParentChangeType?: string; // 부모에서 자식에게 넘기는 컨텐츠 타입
}

// 언어
const LanguageComponent = ({ language, contentType, onChangelanguage }: LanguagePorps) => {
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

  const { confirm: openConfirm } = useModal();
  const handleLanguage = (label: string) => {
    openConfirm({
      title: '언어명 변경',
      content: '선택한 언어로 변경하시겠습니까?',
      okButtonLabel: '확인',
      cancelButtonLabel: '취소',
      onClose: (value: boolean) => {
        if (value) {
          onChangelanguage(label);
          contentType();
        }
      },
    });
  };

  return (
    <div className={`${languagestyles.lang_area} ${styles.lang_area}`}>
      <ul className={languagestyles.lang_list}>
        {languages.map((lang) => (
          <li key={lang.value}>
            <Button
              className={language === lang.label ? languagestyles.active : ''}
              onClick={() => {
                handleLanguage(lang.label);
              }}
            >
              {lang.label}
              {isMobile && language === lang.label && (
                <IcoCheck02 width={16} height={16} stroke="#0056ff" />
              )}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// 내 정보
const UserMyComponent = ({ onChangeType, onParentChangeType }: ContentTypeProps) => {
  const { confirm: openConfirm } = useModal();
  const [isChecked, setIsChecked] = useState(false);
  const [language, setLanguage] = useState('한국어');

  const [contentType, setContentType] = useState<'profile' | 'lang'>('profile');
  const { data } = useCodeGroup('pms.multilingual.LangCountryCode', {});

  //  언어 타입 변경
  const handleLanguageType = () => {
    setContentType('lang');
    onChangeType('lang');
  };

  //   내정보 타입 변경
  const handleProfileType = () => {
    setContentType('profile');
    onChangeType('profile');
  };

  useEffect(() => {
    handleParentType();
  }, [onParentChangeType]);

  // 부모 타입이 변경
  const handleParentType = () => {
    if (onParentChangeType === 'profile') {
      setContentType('profile');
      onChangeType('profile');
    }
  };

  const handleClickAlert2 = () => {
    openConfirm({
      title: <>로그인 시간을 연장하시겠습니까?</>,
      content: (
        <>
          로그인 후 2시간이 남은 시간 경과 후 로그아웃 됩니다.
          <br />
          로그인 시간을 연장하시겠습니까?
          <div className="time">
            남은시간 : <strong>4분 59초</strong>
          </div>
        </>
      ),
      okButtonLabel: '로그인연장',
      cancelButtonLabel: '취소',
    });
  };

  return (
    <div className={styles.start}>
      {contentType === 'profile' ? (
        <div className={`${styles.avatar_area}`}>
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
                <span className={styles.name}>김현대</span>
                <Button size="sm" underline={true} label={'개인정보변경'} />
              </div>
              <div className={styles.tenant}>
                <span>현대오토에버</span>
                <span>Sales & Marketing</span>
                <span>책임연구원</span>
              </div>
            </div>
          </div>

          <div className={styles.point_box}>
            <IcoPoint className={styles.ico} />
            <span className={styles.txt}>나의 포인트</span>
            <span className={styles.point}>
              <em>243</em>P
            </span>
          </div>

          <div className={styles.btn_my_box}>
            {isMobile ? (
              <>
                <Button className={styles.btn_my}>
                  <IcoBookFill width={40} height={40} />
                  나의 학습
                </Button>
                <Button className={styles.btn_heart}>
                  <IcoHeartFill width={40} height={40} />
                  찜한 과정
                </Button>
              </>
            ) : (
              <Button variant="primary" size="xl" className={styles.btn_my}>
                나의 학습
              </Button>
            )}
          </div>

          <div className={styles.recent_visits}>
            <h3>최근 방문</h3>
            {/* 방문 o */}
            <ul className={styles.list}>
              <li>
                <Button className={styles.btn}>
                  <span className={styles.ico}>
                    {/* 아이콘 디자인 수정 예정 */}
                    <IcoChart />
                  </span>
                  <span className={styles.txt}>결재함</span>
                </Button>
              </li>
              <li>
                <Button className={styles.btn}>
                  <span className={styles.ico}>
                    {/* 아이콘 디자인 수정 예정 */}
                    <IcoPaper />
                  </span>
                  <span className={styles.txt}>학습이력</span>
                </Button>
              </li>
              <li>
                <Button className={styles.btn}>
                  <span className={styles.ico}>
                    {/* 아이콘 디자인 수정 예정 */}
                    <IcoRocket />
                  </span>
                  <span className={styles.txt}>찜한 과정</span>
                </Button>
              </li>
            </ul>
            {/* 방문 x */}
            <div className={styles.no_list}>
              <p>아직 방문한 화면이 없어요.</p>
            </div>
          </div>
          <ul className={styles.info_list}>
            <li>
              <span className={styles.txt}>알림</span>
              <Switch
                checked={isChecked}
                onCheckedChange={setIsChecked}
                label={isChecked ? 'ON' : 'OFF'}
              />
            </li>

            <li>
              <span className={styles.txt}>언어</span>
              <Button
                variant="arrow"
                size="md"
                label={language}
                onClick={() => handleLanguageType()}
              />
            </li>

            <li>
              <span className={styles.txt}>HRD 센터</span>
              <Button variant="arrow" size="md" label={'바로가기'} />
            </li>

            <li>
              <span className={styles.txt}>권한 신청</span>
              <Button variant="arrow" size="md" label={'바로가기'} />
            </li>
          </ul>

          <BrowserView>
            <div className={styles.btn_log}>
              <Button
                size="md"
                underline={true}
                label={'로그아웃'}
                onClick={() => handleClickAlert2()}
              />
            </div>
          </BrowserView>
        </div>
      ) : (
        <LanguageComponent
          language={language}
          onChangelanguage={setLanguage}
          contentType={handleProfileType}
        />
      )}
    </div>
  );
};

export const UserMy = memo(UserMyComponent);
