import { GridBox, ModalBody, ModalContainer, ModalTitle } from '@learnway/ui';
import { t } from 'i18next';
import { useEffect } from 'react';
import { useTranslationStatus } from '../../../../entities/translation/service/translation.hook';
import { createColumnHelper } from '@tanstack/react-table';

interface TranslationStatusPopupProps {
  baseLanguage: string;
  keyType: string;
  lastModifiedBy: string;
  modifiedDate: string;
  multilingualId: number;
  multilingualKey: string;
  targetLanguage: string;
  targetLocale: string;
  targetTranslatedCount: number;
  totalLocaleCount: number;
  totalTranslatedCount: number;
}

const columnHelper = createColumnHelper<any>();
const columns = [
  columnHelper.accessor('locale', {
    cell: (info) => info.getValue(),
    header: t('번역언어'),
  }),
  columnHelper.accessor('translation', {
    cell: (info) => info.getValue(),
    header: t('번역상태'),
  }),
];

export const TranslationStatusPopup = (props: TranslationStatusPopupProps) => {
  console.log(props);
  const { keyType, multilingualId, multilingualKey, baseLanguage } = props;

  const { data } = useTranslationStatus(multilingualId);
  const translations = data?.translations || [];

  return (
    <ModalContainer>
      <ModalTitle>{t('번역언어 현황팝업')}</ModalTitle>
      <ModalBody>
        타이틀 분류 : {keyType} 코드 : {multilingualKey} 기준명(한국어) : {baseLanguage}
        <GridBox data={translations} columns={columns} />
      </ModalBody>
    </ModalContainer>
  );
};
