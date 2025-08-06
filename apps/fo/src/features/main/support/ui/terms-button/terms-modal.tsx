import { useCreation } from 'ahooks';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { HtmlContent } from '@learnway/ui/html-content';

import type { TermsType } from '@entities/terms';
import { findTermsType, useFetchTerms, useFetchTermsVersions } from '@entities/terms';

import styles from '@learnway/styles/fo/features/auth/ui/terms-button/terms-modal.module.css';
import { Button } from '@learnway/ui/button';
import { Dropdown } from '@learnway/ui/dropdown';
import { ModalBody, ModalContainer, ModalFooter, ModalTitle, useModal } from '@learnway/ui/modal';

interface TermsModalComponentProps {
  termsType: TermsType;
}

function TermsModalComponent({ termsType }: TermsModalComponentProps) {
  const { t } = useTranslation();
  const { closeModal } = useModal();

  const ref = useRef<any>();
  const [termsId, setTermsId] = useState<string | undefined>();
  const termsTypeCode = findTermsType(termsType);
  const { data } = useFetchTerms(termsTypeCode, Number(termsId));
  const { data: versions } = useFetchTermsVersions(termsTypeCode);

  const options = useCreation(() => {
    if (!versions) {
      return [];
    }
    return versions.map((version) => ({
      value: String(version.termsId),
      label: version.termsVersion,
    }));
  }, [versions]);

  return (
    <ModalContainer>
      <ModalTitle>{t(`CODE.TERMS_TYPE.${termsType}`)}</ModalTitle>
      <ModalBody>
        <div className={`${styles.start} ${styles.agreement_popup}`}>
          <Dropdown
            value={termsId}
            size="lg"
            options={options}
            onChange={(value: string) => {
              setTermsId(value);
            }}
            placeholder={t('LABEL.common.previousTerms', {
              type: t(`CODE.TERMS_TYPE.${termsType}`),
            })}
          />
          <HtmlContent className={styles.details}>{data?.translation?.termsContents}</HtmlContent>
        </div>
      </ModalBody>

      <ModalFooter>
        <Button
          label={t('LABEL.common.ok')}
          variant={'primary'}
          size={'lg'}
          onClick={() => closeModal()}
        />
      </ModalFooter>
    </ModalContainer>
  );
}

export const TermsModal = TermsModalComponent;
