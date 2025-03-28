import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCreation } from 'ahooks';

import {
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalTitle,
  Button,
  Select,
  useModal,
  HtmlContent,
} from '@learnway/ui';

import { useFetchTermsVersions, useFetchTerms } from '../../../../entities/terms';
import type { TermsType } from '../../../../types';

import styles from '@learnway/styles/fo/features/auth/ui/terms-button/terms-modal.module.css';

interface TermsModalComponentProps {
  termsType: TermsType;
}

function TermsModalComponent({ termsType }: TermsModalComponentProps) {
  const { t } = useTranslation();
  const { close: closeModal } = useModal();

  const [termsId, setTermsId] = useState<number | undefined>();

  const { data } = useFetchTerms(termsType, termsId);
  const { data: versions } = useFetchTermsVersions(termsType);

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
          <Select
            size="lg"
            options={options}
            onChange={(option) => {
              console.log('onChange', option);
              option?.value && setTermsId(Number(option?.value));
            }}
            placeholder={t('LABEL.PREVIOUS_TERMS', { type: t(`CODE.TERMS_TYPE.${termsType}`) })}
          />
          <HtmlContent className={styles.details}>{data?.translation?.termsContents}</HtmlContent>
        </div>
      </ModalBody>

      <ModalFooter>
        <Button label={'확인'} variant={'primary'} size={'lg'} onClick={() => closeModal()} />
      </ModalFooter>
    </ModalContainer>
  );
}

export const TermsModal = TermsModalComponent;
