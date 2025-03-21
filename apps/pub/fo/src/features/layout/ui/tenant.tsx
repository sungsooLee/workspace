import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, ModalBody, ModalContainer, ModalFooter, ModalTitle, useModal } from '@learnway/ui';
import { isMobile } from 'react-device-detect';

import styles from './tenant.module.css';
import { IcoArrowDown, IcoCheck, IcoArrowForward } from '@learnway/icons';

const TenantModal = () => {
  const [activeIdx, setActiveIdx] = useState<number | null>(2);
  const [tip, setTip] = useState<number | null>(null);
  const { alert: openAlert } = useModal(); // 퍼블수정 2025-03-21 추가
  const tenants = [
    '테넌트명1',
    '테넌트명2',
    '테넌트명3',
    '테넌트명4',
    '테넌트명5',
    '테넌트명6',
    '테넌트명7',
    '테넌트명8',

    '테넌트명1',
    '테넌트명2',
    '테넌트명3',
    '테넌트명4',
    '테넌트명5',
    '테넌트명6',
    '테넌트명7',
    '테넌트명8',
    '테넌트명1',
    '테넌트명2',
    '테넌트명3',
    '테넌트명4',
    '테넌트명5',
    '테넌트명6',
    '테넌트명7',
    '테넌트명8',
    '테넌트명1',
    '테넌트명2',
    '테넌트명3',
    '테넌트명4',
    '테넌트명5',
    '테넌트명6',
    '테넌트명7',
    '테넌트명8',
    '테넌트명1',
    '테넌트명2',
    '테넌트명3',
    '테넌트명4',
    '테넌트명5',
    '테넌트명6',
    '테넌트명7',
    '테넌트명8',
    '테넌트명1',
    '테넌트명2',
    '테넌트명3',
    '테넌트명4',
    '테넌트명5',
    '테넌트명6',
    '테넌트명7',
    '테넌트명8',
    '테넌트명1',
    '테넌트명2',
    '테넌트명3',
    '테넌트명4',
    '테넌트명5',
    '테넌트명6',
    '테넌트명7',
    '테넌트명8',
  ];
  const handleClick = (idx: number): void => {
    setActiveIdx(idx);
    TenantConfirm(idx); // 퍼블수정 2025-03-21 추가
  };

  // 퍼블수정 2025-03-21 : 테넌트 변경 confirm 추가
  const TenantConfirm = (idx: number): void => {
    openAlert({
      title: <>테넌트로 변경하시겠습니까?</>,
      okButtonLabel: '확인 버튼명',
      cancelButtonLabel: '취소 버튼명',
    });
    setTip(idx);
  };

  return (
    <ModalContainer>
      <ModalTitle>{'테넌트 선택'}</ModalTitle>
      <ModalBody>
        <div className={`${styles.start} ${styles.tenant_content}`}>
          <div className={styles.tenant_wrap}>
            <ul className={styles.tenant_list}>
              {tenants.map((tenants, idx) => (
                <li>
                  <Button
                    key={idx}
                    className={`${styles.btn} ${activeIdx === idx ? styles.active : ''}`}
                    onClick={() => handleClick(idx)}>
                    <span className={styles.label}>
                      <i>
                        <IcoCheck width={16} height={16} stroke="#6f798b"></IcoCheck>
                      </i>
                      대표
                    </span>
                    {/* 퍼블수정 20250320 : 아이콘 mobile, pc 분기처리 */}
                    <span className={styles.txt}>
                      {tenants}
                      {isMobile ? (
                        <i>
                          <IcoArrowForward
                            width={20}
                            height={20}
                            stroke="#6f798b"></IcoArrowForward>
                        </i>
                      ) : null}
                    </span>
                    {/* 퍼블수정 20250320 : 문구 추가 */}
                    {tip === idx ? (
                      <p className={`${styles.tip} ${styles.tip_show}`}>
                        대표 테넌트로 설정되었습니다.
                      </p>
                    ) : (
                      ''
                    )}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <p className={styles.notice}>메인 테넌트를 변경하려면 좌측 대표 버튼을 선택하세요.</p>
      </ModalFooter>
    </ModalContainer>
  );
};

const TenantComponent = () => {
  const { open: openModal } = useModal();
  return (
    <Button
      className={styles.btn_tenant}
      onClick={() =>
        // 퍼블수정 20250320 : mobile, pc 분기 처리
        openModal({
          width: isMobile ? 'm_full' : 'sm',
          content: <TenantModal />,
        })
      }>
      <span className={styles.select}>{'현대 오토에버'}</span>
      <IcoArrowDown width={16} height={16} stroke="#131C30" />
    </Button>
  );
};

export const Tenant = memo(TenantComponent);
