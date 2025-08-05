import { IcoArrowForward } from '@learnway/icons';
import { Button } from '@learnway/ui/button';
import { ModalBody, ModalContainer, ModalTitle, useModal } from '@learnway/ui/modal';

import { HistoryModal } from '@features/layout/m.ui/history-modal';

import { UserMyModal } from '@features/layout/m.ui/user-my-modal';
import styles from '@learnway/styles/fo/widgets/layout/m.ui/main/footer/gnb-popup-m.module.css';

const MoreButtonModalComponent = () => {
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

export const MoreButtonModal = MoreButtonModalComponent;
