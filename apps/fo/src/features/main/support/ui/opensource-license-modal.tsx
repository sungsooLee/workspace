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
import { useRouter } from '@tanstack/react-router';
export const a = `
sdfsfed ddedf
ㄴㅇㄹㄴㅇㄹ
`;

const OpensourceLicenseModalComponent = () => {
  const { basepath } = useRouter();
  const { t } = useTranslation();
  //const { closeModal } = useModal();
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    fetch(`${basepath}/html/opensource-license.html`)
      .then((response) => response.text())
      .then((data) => setHtmlContent(data));
  }, []);

  return (
    <ModalContainer>
      <ModalTitle>{t('오픈소스 라이선스')}</ModalTitle>
      <ModalBody>
        <div className={`${styles.start} ${styles.agreement_popup}`}>
          <HtmlContent>{htmlContent}</HtmlContent>
        </div>
      </ModalBody>
    </ModalContainer>
  );
};

export const OpensourceLicenseModal = OpensourceLicenseModalComponent;
