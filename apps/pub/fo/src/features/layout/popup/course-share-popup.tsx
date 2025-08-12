import { memo, useState } from 'react';

import { ModalBody, ModalContainer, ModalFooter, ModalTitle, useModal } from '@learnway/ui/modal';

import { IcoCopy02, IcoKakaoLine, IcoMail02 } from '@learnway/icons';
import { Button } from '@learnway/ui/button';
import { OptionCard, OptionCardItem } from '@learnway/ui/option-card';
import { isMobile } from 'react-device-detect';
import styles from './course-share-popup.module.css';
import { UserSearchPopup } from './user-search-popup';

const CourseSharePopupComponent = () => {
  const { openModal } = useModal();
  const [shareValue, setShareValue] = useState<string[]>();
  const UserSearchPopupOpen = () => {
    openModal({
      width: isMobile ? 'm_full' : 'md',
      content: <UserSearchPopup />,
    });
  };

  const shareOptionPc = [
    {
      label: '이메일 인증',
      value: 'a',
      icon: <IcoMail02 />,
    },
    {
      label: '링크복사',
      value: 'c',
      icon: <IcoCopy02 />,
    },
  ];

  const shareOptionMobile = [
    {
      label: '이메일 인증',
      value: 'a',
      icon: <IcoMail02 />,
    },
    {
      label: '카카오톡',
      value: 'b',
      icon: <IcoKakaoLine stroke="#131416" />,
    },
    {
      label: '링크복사',
      value: 'c',
      icon: <IcoCopy02 />,
    },
  ];

  return (
    <ModalContainer>
      <ModalTitle>{'공유하기'}</ModalTitle>
      <ModalBody>
        <div className={`${styles.start} ${styles.course_share}`}>
          <p className={styles.txt}>
            과정명과정명과정명과정명과정명과정명과정명과정명과정명과정명과정명과정명과정명과정명과정명과정명
          </p>

          <OptionCard
            className={styles.btn_share}
            value={shareValue}
            size="lg"
            options={isMobile ? shareOptionMobile : shareOptionPc}
            onOptionSelect={(option: OptionCardItem) => {
              setShareValue(option.value);
              // mobile에서 확인버튼 누르면 넘어감
              if (!isMobile) {
                UserSearchPopupOpen();
              }
            }}
          />
        </div>
      </ModalBody>

      {isMobile && (
        <ModalFooter>
          <Button
            label={'확인'}
            variant={'primary'}
            size={'lg'}
            onClick={() =>
              openModal({
                width: 'm_full',
                content: <UserSearchPopup />,
              })
            }
          />
        </ModalFooter>
      )}
    </ModalContainer>
  );
};

export const CourseSharePopup = memo(CourseSharePopupComponent);
