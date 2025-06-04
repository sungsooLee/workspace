import {
  Button,
  GridBox,
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalTitle,
  Tooltip,
  useModal,
} from '@learnway/ui';
import { t } from 'i18next';
import { useTranslationStatus } from '../../../../entities/translation/service/translation.hook';
import { createColumnHelper } from '@tanstack/react-table';
import tableStyles from '@learnway/styles/bo/assets/styles/modules/table.module.css';
import { IcoAlertCircle } from '@learnway/icons';
import { FormSubTitle } from '../../../../shared/ui';
import { cn } from '@learnway/shared';
import { CODE_GROUP, useCodeStore } from '@learnway/hooks';
import { useEffect, useMemo, useState } from 'react';

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
export const TranslationStatusPopup = (props: TranslationStatusPopupProps) => {
  const { getCode } = useCodeStore();
  const [languageCodes, setLanguageCodes] = useState<any[]>([]);
  const languageMultilingualKeyMap = useMemo(() => {
    const map = new Map<string, string>();
    languageCodes.forEach((code) => {
      map.set(code.value, code.multilingualKey); // locale(ko) -> multilingualKey
    });
    return map;
  }, [languageCodes]);
  const { keyType, multilingualId, multilingualKey, baseLanguage } = props;
  const { close: closeModal } = useModal();

  const { data } = useTranslationStatus(multilingualId);
  const translations = data?.translations || [];

  const languageMap = useMemo(() => {
    const map = new Map<string, string>();
    languageCodes.forEach((code) => {
      map.set(code.value, code.cdContent);
    });
    return map;
  }, [languageCodes]);

  const columns = useMemo(
    () => [
      columnHelper.accessor('locale', {
        cell: (info) => {
          const locale = info.getValue();
          console.log(locale);
          return languageMap.get(locale) || locale;
        },
        header: t('번역언어'),
      }),
      columnHelper.accessor('translation', {
        cell: (info) => {
          const value = info.getValue();
          return value || '-'; // null인 경우 '-' 표시
        },
        header: t('번역상태'),
      }),
    ],
    [languageMap],
  );

  useEffect(() => {
    const init = async () => {
      const codes: any = await getCode(CODE_GROUP['pms.multilingual.LangCountryCode']);
      setLanguageCodes(codes);
    };
    init();
  }, [getCode]);

  return (
    <ModalContainer>
      <ModalTitle>
        {t('번역언어 현황팝업')}
        {/* <Tooltip side="bottom" align="start" content={'툴팁내용입니다.'}>
          <Button onlyIcon>
            <IcoAlertCircle width={16} height={16} fill="#A9AFB8" stroke="#ffffff" />
          </Button>
        </Tooltip> */}
      </ModalTitle>
      <ModalBody>
        <FormSubTitle label={t('타이틀')} />
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
                <td>{keyType}</td>
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
