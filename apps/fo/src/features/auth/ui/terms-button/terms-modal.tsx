import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useCreation } from 'ahooks';

import {
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalTitle,
  Button,
  Dropdown,
  useModal,
  HtmlContent,
  Popover,
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

  const ref = useRef<any>();
  const [termsId, setTermsId] = useState<string | undefined>();
  const [isOpen, setIsCategoryOpen] = useState(false);

  const { data } = useFetchTerms(termsType, Number(termsId));
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
        <Popover
          open={isOpen}
          onOpenChange={(isOpen: boolean) => {
            setIsCategoryOpen(isOpen);
          }}
          className={`${styles.btn_category} ${isOpen ? styles.active : ''}`}
          popoverContent={<div className="bg-slate-100">test !!!! popover ??????</div>}
          side="top"
          align="start"
          sideOffset={15}
          //container={document.getElementById('nlp--modal-content') ?? undefined}
        >
          <Button label={'확인'} variant={'primary'} size={'lg'} />
        </Popover>
      </ModalFooter>
    </ModalContainer>
  );
}

export const TermsModal = TermsModalComponent;
