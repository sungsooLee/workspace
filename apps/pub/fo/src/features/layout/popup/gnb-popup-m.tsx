import { memo, useState } from 'react';

import { IcoArrowForward } from '@learnway/icons';
import { Button } from '@learnway/ui/button';
import { ModalBody, ModalContainer, ModalFooter, ModalTitle, useModal } from '@learnway/ui/modal';
import { HistoryContents } from '../ui/history-contents'; // 최근 학습활동
import { NotificationContents } from '../ui/notification-contents'; // 최근 학습활동

import { UserMy } from '../ui/user-my'; // 내 정보

import styles from '@learnway/styles/fo/widgets/layout/m.ui/main/footer/gnb-popup-m.module.css';

// My Modal
const UserMyModal = () => {
  const [contents, setContents] = useState('profile');
  const { closeModal } = useModal();

  return (
    <ModalContainer>
      <ModalTitle>{contents === 'profile' ? ' ' : '언어'}</ModalTitle>
      <ModalBody>
        <div className={`${styles.start} ${styles.user_modal}`}>
          <UserMy onChangeType={setContents} />
        </div>
      </ModalBody>
      {contents === 'profile' ? (
        <ModalFooter>
          <Button variant={'primary'} size={'lx'} onClick={() => closeModal()} label={'로그아웃'} />
        </ModalFooter>
      ) : (
        ''
      )}
    </ModalContainer>
  );
};

// 최근 학습활동 Modal
const HistoryModal = () => {
  return (
    <ModalContainer>
      <ModalTitle>{'최근 학습활동'}</ModalTitle>
      <ModalBody>
        <div className={`${styles.start} ${styles.history_modal}`}>
          <HistoryContents />
        </div>
      </ModalBody>
    </ModalContainer>
  );
};

// 알림 Modal
const NotificationyModal = () => {
  return (
    <ModalContainer>
      <ModalTitle>{'알림'}</ModalTitle>
      <ModalBody>
        <div className={`${styles.start} ${styles.history_modal}`}>
          <NotificationContents />
        </div>
      </ModalBody>
    </ModalContainer>
  );
};

const GnbPopupMComponent = () => {
  const { openModal } = useModal();
  return (
    <ModalContainer>
      <ModalTitle>{'더보기'}</ModalTitle>
      <ModalBody>
        <div className={`${styles.start} ${styles.gnb_wrap}`}>
          <ul>
            <li>
              <Button
                onClick={() =>
                  openModal({
                    width: 'm_full',
                    content: <UserMyModal />,
                  })
                }
              >
                My
                <IcoArrowForward width={20} height={20} stroke="#6f798b" />
              </Button>
            </li>
            <li>
              <Button
                onClick={() =>
                  openModal({
                    width: 'm_full',
                    content: <HistoryModal />,
                  })
                }
              >
                최근학습활동
                <IcoArrowForward width={20} height={20} stroke="#6f798b" />
              </Button>
            </li>
            <li>
              <Button
                onClick={() =>
                  openModal({
                    width: 'm_full',
                    content: <NotificationyModal />,
                  })
                }
              >
                알림
                <IcoArrowForward width={20} height={20} stroke="#6f798b" />
              </Button>
            </li>
            <li>
              <Button>
                소모임
                <IcoArrowForward width={20} height={20} stroke="#6f798b" />
              </Button>
            </li>
            <li>
              <Button>
                자주묻는질문(Q&A)
                <IcoArrowForward width={20} height={20} stroke="#6f798b" />
              </Button>
            </li>
          </ul>
        </div>
      </ModalBody>
    </ModalContainer>
  );
};

export const GnbPopupM = memo(GnbPopupMComponent);
