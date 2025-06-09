// IA102 / NLP_BO_CMS_1055
import { cn } from '@learnway/shared';
import { ModalContainer, ModalBody, ModalTitle } from '@learnway/ui';
import styles from '@learnway/styles/bo/assets/styles/modules/info-list-box.module.css';
import { t } from 'i18next';

function ModifierInfoModalComponent() {
  // 수정자 UUID를 Props로 받아서 사용자 정보를 API로 가져와야 함
  // /{pms}/admin/api/v1/users/{uuid}/

  return (
    <ModalContainer>
      <ModalTitle>{t('수정자')}</ModalTitle>
      <ModalBody>
        <div className={cn(styles.start, styles.wrap)}>
          <ul className={styles.info_list}>
            <li>
              <span className={styles.title}>{t('이름(사번)')}</span>
              <span className={styles.data}>{'조일환(9500896)'}</span>
            </li>
            <li>
              <span className={styles.title}>{t('이메일 주소')}</span>
              <span className={styles.data}>{'95008965@ict-companion.com'}</span>
            </li>
            <li>
              <span className={styles.title}>{t('연락처')}</span>
              <span className={styles.data}>{'+82 01012345678'}</span>
            </li>
          </ul>
        </div>
      </ModalBody>
    </ModalContainer>
  );
}

export const ModifierInfoModal = ModifierInfoModalComponent;
