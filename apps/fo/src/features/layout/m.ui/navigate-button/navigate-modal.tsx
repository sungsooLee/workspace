import { memo, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useTranslation } from 'react-i18next';
import { Link } from '@tanstack/react-router';

import { Button, ModalBody, ModalContainer, ModalFooter, ModalTitle, useModal } from '@learnway/ui';
import { IcoReview, IcoMybook, IcoHome03, IcoSetting01 } from '@learnway/icons';
import { useFetchAuthUser, useUpdateUser } from '@learnway/config';

import { UserAvatar } from '../../ui/user-avatar/user-avatar';

import styles from '@learnway/styles/fo/features/layout/m.ui/navigate-button/navigate-modal.module.css';

const NavigateModalComponent = () => {
  const { t } = useTranslation();
  const [tip, setTip] = useState<number | null>(null);

  const { open: openModal, confirm } = useModal();
  const { data } = useFetchAuthUser();
  const { updateActiveTenant, updateMainTenant } = useUpdateUser();

  const handleChangeMainTenant = async (tenantId: number) => {
    updateMainTenant(tenantId);
    setTip(tenantId);
  };

  const handleChangeTenant = async (tenantId: number) => {
    const result = await confirm(t('MESSAGE.선택한 테넌트로 변경하시겠습니까?'));
    if (result) {
      updateActiveTenant(tenantId);
      window.location.reload();
    }
  };

  return (
    <ModalContainer>
      <ModalTitle>
        {' '}
        <div className={styles.header}>
          <Link to={'/'}>
            <IcoHome03 width={24} height={24} stroke="#131c30"></IcoHome03>
          </Link>
          <Link to={'/setting'}>
            <IcoSetting01 width={24} height={24} stroke="#131c30" fill="none"></IcoSetting01>
          </Link>
        </div>
      </ModalTitle>
      <ModalBody>
        <div className={styles.start}>
          <div className={styles.profile_info}>
            <div className={styles.profile}>
              <span className={styles.name}>김현대</span>
              <span className={styles.tenant}>현대오토에버</span>
              <span className={styles.team}>팀명</span>
              <Button
                className={styles.link}
                onClick={() =>
                  openModal({
                    width: 'm_full',
                    content: <div />, //PasswordVerifyPopup
                  })
                }>
                개인정보변경
              </Button>
            </div>
            <div className={styles.avata_img}>
              <span className={styles.info_avata}>
                <em className={styles.text}>{'김'}</em>
              </span>
              <UserAvatar className={styles.info_avata} />
            </div>
          </div>
          <ul className={styles.gnb}>
            <li>
              <ul className={styles.gnb_list}>
                <li>
                  <Link to={''}>
                    <IcoReview width={20} height={20} stroke="#131c30"></IcoReview>
                    H-Sence
                  </Link>
                </li>
                <li>
                  <Link to={''}>
                    <IcoMybook width={20} height={20} stroke="#131c30"></IcoMybook>법정필수교육
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <div className={styles.gnb_title}>
                <strong>기술인증</strong>
              </div>
              <ul className={styles.gnb_list}>
                <li>
                  <Link to={''}>H-Sence</Link>
                </li>
                <li>
                  <Link to={''}>법정필수교육</Link>
                </li>
              </ul>
            </li>
            <li>
              <div className={styles.gnb_title}>
                <strong>학습계획</strong>
              </div>
              <ul className={styles.gnb_list}>
                <li>
                  <Link to={''}>금융자격지원제도</Link>
                </li>
                <li>
                  <Link to={''}>SPA 승진제도</Link>
                </li>
              </ul>
            </li>
            <li>
              <div className={styles.gnb_title}>
                <strong>HMCP</strong>
              </div>
              <ul className={styles.gnb_list}>
                <li>
                  <Link to={''}>안내</Link>
                </li>
                <li>
                  <Link to={''}>시험일정</Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </ModalBody>
    </ModalContainer>
  );
};

export const MobileNavigateModal = memo(NavigateModalComponent);
