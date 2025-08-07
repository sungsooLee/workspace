import { useCreation } from 'ahooks';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { HtmlContent } from '@learnway/ui/html-content';

import type { TermsType } from '@entities/terms';
import {
  findTermsType,
  TermsTypeCode,
  useFetchTerms,
  useFetchTermsVersions,
} from '@entities/terms';

import styles from '@learnway/styles/fo/features/auth/ui/terms-button/terms-modal.module.css';
import { Button } from '@learnway/ui/button';
import { Dropdown } from '@learnway/ui/dropdown';
import { ModalBody, ModalContainer, ModalFooter, ModalTitle, useModal } from '@learnway/ui/modal';
import { useFetchAuthUser } from '@learnway/auth/entities/authorization';
import { SelectOption } from '@learnway/ui/type';

const OpensourceLicenseModalComponent = () => {
  const { t } = useTranslation();
  const { closeModal } = useModal();
  return (
    <ModalContainer>
      <ModalTitle>{t('오픈소스 라이선스')}</ModalTitle>
      <ModalBody>
        <div className={`${styles.start} ${styles.agreement_popup}`}>
          <div className={styles.details}>HTML 로 차후 넣음</div>
        </div>
      </ModalBody>
    </ModalContainer>
  );
};

export const OpensourceLicenseModal = OpensourceLicenseModalComponent;
