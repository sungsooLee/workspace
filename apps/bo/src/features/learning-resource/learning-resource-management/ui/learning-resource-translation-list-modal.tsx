// IA104 / NLP_BO_CMS_1043 번역현황

import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import {
  Button,
  ModalContainer,
  ModalBody,
  ModalTitle,
  GridBox,
  ModalFooter,
  useModal,
  FormSubTitle,
} from '@learnway/ui';
import { t } from 'i18next';
import { ContentCreateType, ContentInformation } from '@types';
import { useEffect, useState } from 'react';
import tableStyles from '@learnway/styles/bo/assets/styles/modules/table.module.css';
import { cn } from '@learnway/shared';

interface TranslationListModalComponentProps {
  contentInfo: ContentInformation;
}

interface TranslationListData {
  languageCountryCode: string;
  createType?: ContentCreateType;
}

function TranslationListModalComponent({ contentInfo }: TranslationListModalComponentProps) {
  const { closeModal } = useModal();
  const [data, setData] = useState<TranslationListData[]>([]);
  // useEffect(() => {
  //   setData(
  //     flatten(
  //       scormData.map(({ orgnTitle, items }) =>
  //         items?.map(({ itemTitle, itemUrl }) => ({
  //           orgnTitle,
  //           itemTitle,
  //           itemUrl,
  //         })),
  //       ),
  //     ),
  //   );
  // }, [scormData]);

  const columnHelper = createColumnHelper<TranslationListData>();

  const columns = [
    columnHelper.accessor('languageCountryCode', {
      cell: (info) => info.getValue(),
      header: t('번역언어'),
      enableGrouping: false,
    }),
    columnHelper.accessor('createType', {
      cell: (info) => info.getValue(),
      header: t('번역상태'),
      enableGrouping: false,
    }),
  ] as ColumnDef<TranslationListData, string>[];

  return (
    <ModalContainer>
      <ModalTitle>{t('번역현황')}</ModalTitle>
      <ModalBody>
        <FormSubTitle label={t('기본정보')} noLine />
        <div className={cn(tableStyles.start, tableStyles.wrap)}>
          <table>
            <caption>{t('기본정보')}</caption>
            <colgroup>
              <col style={{ width: '240px' }} />
              <col />
              <col style={{ width: '240px' }} />
              <col />
            </colgroup>
            <tbody>
              <tr>
                <th scope="row">{t('테넌트')}</th>
                <td>{contentInfo.tenantName}</td>
                <th scope="row">{t('채널')}</th>
                <td>{contentInfo.channelName}</td>
              </tr>
              <tr>
                <th scope="row">{t('언어')}</th>
                <td>{contentInfo.languageCountryCode}</td>
                <th scope="row">{t('학습자원명')}</th>
                <td>{contentInfo.contentName}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-24">
          <GridBox
            title={t('번역현황 목록')}
            disabledSelectionToggle
            columns={columns}
            data={data}
          />
        </div>
      </ModalBody>
      <ModalFooter>
        <Button variant="primary" size="lg" onClick={() => closeModal()}>
          {t('확인')}
        </Button>
      </ModalFooter>
    </ModalContainer>
  );
}

export const TranslationListModal = TranslationListModalComponent;
