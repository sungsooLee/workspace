import { useTranslationStatus } from '@entities/translation/service/translation.hook';
import { useLanguageMap } from '@learnway/hooks';
import { cn } from '@learnway/shared';
import tableStyles from '@learnway/styles/bo/assets/styles/modules/table.module.css';
import {
  Button,
  FormSubTitle,
  GridBox,
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalTitle,
  useModal,
} from '@learnway/ui';
import { createColumnHelper } from '@tanstack/react-table';
import { t } from 'i18next';
import { useMemo } from 'react';

interface TranslationStatusPopupProps {
  baseLanguage: string;
  keyType: string;
  keyTypeName: string;
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
export const TranslationStatusPopup = (props: TranslationStatusPopupProps) => {
  const { getLanguageName } = useLanguageMap();
  const { keyType, multilingualId, multilingualKey, keyTypeName, baseLanguage } = props;
  const { close: closeModal } = useModal();

  const { data } = useTranslationStatus(multilingualId);
  const translations = data?.translations || [];

  const columns = useMemo(
    () => [
      columnHelper.accessor('locale', {
        cell: (info) => {
          const locale = info.getValue();
          return getLanguageName(locale);
        },
        header: t('번역언어'),
      }),
      columnHelper.accessor('translation', {
        cell: (info) => {
          const value = info.getValue();
          return value || value === '' ? '번역 완료' : '번역 미완료';
        },
        header: t('번역상태'),
      }),
    ],
    [getLanguageName],
  );

  return (
    <ModalContainer>
      <ModalTitle>{t('번역언어 현황팝업')}</ModalTitle>
      <ModalBody>
        <FormSubTitle label={t('타이틀')} noLine />
        <div className={cn(tableStyles.start, tableStyles.wrap)}>
          <table>
            <caption>{t('번역언어정보')}</caption>
            <colgroup>
              <col style={{ width: '174px' }} />
              <col />
              <col style={{ width: '174px' }} />
              <col />
            </colgroup>
            <tbody>
              <tr>
                <th scope={'row'}>{t('분류')}</th>
                <td>{keyTypeName}</td>
                <th scope={'row'}>{t('코드')}</th>
                <td>{multilingualKey}</td>
              </tr>
              <tr>
                <th scope={'row'}>{t('기준명(한국어)')}</th>
                <td colSpan={3}>{baseLanguage}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <GridBox
          data={translations}
          columns={columns}
          title={t('번역현황 목록')}
          clientSideSorting={true}
        />
      </ModalBody>
      <ModalFooter>
        <Button label={'취소'} variant={'gray'} size={'lg'} onClick={() => closeModal()} />
        <Button label={'확인'} variant={'primary'} size={'lg'} onClick={() => closeModal()} />
      </ModalFooter>
    </ModalContainer>
  );
};
