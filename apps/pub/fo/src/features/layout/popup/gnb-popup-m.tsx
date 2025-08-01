import { IcoArrowForward } from '@learnway/icons';
import { Button } from '@learnway/ui/button';
import { ModalBody, ModalContainer, ModalTitle, useModal } from '@learnway/ui/modal';
import { memo, useState } from 'react';
import { UserMy } from '../ui/user-my';

import styles from './gnb-popup-m.module.css';

const UserMyModal = () => {
  const [contents, setContents] = useState('profile');

  return (
    <ModalContainer>
      <ModalTitle>{contents === 'profile' ? ' ' : '언어'}</ModalTitle>
      <ModalBody>
        <div className={`${styles.start} ${styles.user_modal}`}>
          <UserMy onChangeType={setContents} />
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
              <Button>
                최근학습활동
                <IcoArrowForward width={20} height={20} stroke="#6f798b" />
              </Button>
            </li>
            <li>
              <Button>
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
