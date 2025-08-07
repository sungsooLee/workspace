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

interface TermsModalComponentProps {
  termsType: TermsType;
}

function TermsModalComponent({ termsType }: TermsModalComponentProps) {
  const { t } = useTranslation();
  const { closeModal } = useModal();

  const { data: authUser } = useFetchAuthUser();
  const ref = useRef<any>();

  const [termsId, setTermsId] = useState<number>();
  const [options, setOptions] = useState<SelectOption[]>([]);

  const termsTypeCode = findTermsType(termsType);
  const { data } = useFetchTerms(termsTypeCode, Number(termsId));
  const { data: versions } = useFetchTermsVersions(
    termsTypeCode,
    authUser?.activeTenant?.tenantId,
    authUser?.locale,
  );

  // paramter 변경 시 상태 초기화
  useEffect(() => {
    //console.log(params?.termsType);
    setTermsId(undefined);
  }, [termsTypeCode]);

  useEffect(() => {
    if (!versions) return;
    const options = versions.map((version) => ({
      value: version.termsId,
      label: version.termsVersion,
    }));
    setOptions(options);
  }, [versions]);

  return (
    <ModalContainer>
      <ModalTitle>
        {termsTypeCode === TermsTypeCode.PRIVACY_POLICY ? t('개인정보처리방침') : t('이용약관')}
      </ModalTitle>
      <ModalBody>
        <div className={`${styles.start} ${styles.agreement_popup}`}>
          <Dropdown
            value={termsId}
            size="lg"
            options={options}
            onChange={(value) => {
              setTermsId(value);
            }}
            placeholder={t('이전 {{type}}', {
              type:
                termsTypeCode === TermsTypeCode.PRIVACY_POLICY
                  ? t('개인정보처리방침')
                  : t('이용약관'),
            })}
          />
          <HtmlContent className={styles.details}>
            {!data && t('약관 정보가 없습니다.')}
            {data && data?.translation?.termsContents}
          </HtmlContent>
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
