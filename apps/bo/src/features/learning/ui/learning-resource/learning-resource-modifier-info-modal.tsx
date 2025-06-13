// IA102 / NLP_BO_CMS_1055
import { cn, DATE_TIME_FORMAT, formatDate } from '@learnway/shared';
import { ModalContainer, ModalBody, ModalTitle } from '@learnway/ui';
import styles from '@learnway/styles/bo/assets/styles/modules/info-list-box.module.css';
import { t } from 'i18next';
import { leaningResourceQueryOptions } from '@entities/leaning-resource';
import { useQuery } from '@tanstack/react-query';

interface ModifierInfoModalComponentProps {
  lastModifiedBy: string;
  modifiedDate: string;
}

function ModifierInfoModalComponent({
  lastModifiedBy,
  modifiedDate,
}: ModifierInfoModalComponentProps) {
  const { data } = useQuery(leaningResourceQueryOptions.getUser(lastModifiedBy));

  return (
    <ModalContainer>
      <ModalTitle>{t('LABEL.modal.modifierInfo.title')}</ModalTitle>
      <ModalBody>
        <div className={cn(styles.start, styles.wrap)}>
          <ul className={styles.info_list}>
            <li>
              <span className={styles.title}>
                {t('LABEL.modal.modifierInfo.nameAndEmployeeNumber')}
              </span>
              <span className={styles.data}>
                {data?.name}({data?.employeeNumber})
              </span>
            </li>
            <li>
              <span className={styles.title}>{t('LABEL.modal.modifierInfo.email')}</span>
              <span className={styles.data}>{data?.email}</span>
            </li>
            {(!data || data?.phoneNumber || data?.companyTelephoneNumber) && (
              // 조회 전 빈칸을 보여주고 조회 후 전화번호가 없으면 줄 삭제
              <li>
                <span className={styles.title}>{t('LABEL.modal.modifierInfo.phoneNumber')}</span>
                <span className={styles.data}>
                  {data?.phoneNumber || data?.companyTelephoneNumber}
                </span>
              </li>
            )}
            <li>
              <span className={styles.title}>{t('LABEL.modal.modifierInfo.modifiedDate')}</span>
              <span className={styles.data}>
                {formatDate(modifiedDate, DATE_TIME_FORMAT.DATETIME_MIN)}
              </span>
            </li>
          </ul>
        </div>
      </ModalBody>
    </ModalContainer>
  );
}

export const ModifierInfoModal = ModifierInfoModalComponent;
