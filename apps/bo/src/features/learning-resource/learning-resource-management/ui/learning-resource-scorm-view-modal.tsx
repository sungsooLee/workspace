import { Button } from '@learnway/ui/button';
import { ModalContainer, ModalBody, ModalTitle, ModalFooter, useModal } from '@learnway/ui/modal';
// IA106 / NLP_BO_CMS_1053 스콤 보기

import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { GridBox } from '@learnway/ui/grid';
import { t } from 'i18next';
import { ScormOrgn } from '@types';
import { useEffect, useState } from 'react';
import { flatten } from 'lodash';

interface ScormViewModalComponentProps {
  scormData: ScormOrgn[];
}

interface ScormData {
  orgnTitle: string;
  itemTitle: string;
  itemUrl: string;
}

function ScormViewModalComponent({ scormData }: ScormViewModalComponentProps) {
  const { closeModal } = useModal();
  const [data, setData] = useState<ScormData[]>([]);
  useEffect(() => {
    setData(
      flatten(
        scormData.map(({ orgnTitle, items }) =>
          items?.map(({ itemTitle, itemUrl }) => ({
            orgnTitle,
            itemTitle,
            itemUrl })),
        ),
      ),
    );
  }, [scormData]);

  const columnHelper = createColumnHelper<ScormData>();

  const columns = [
    columnHelper.accessor('orgnTitle', {
      cell: (info) => info.getValue(),
      header: t('모듈'),
      size: 240,
      enableGrouping: false }),
    columnHelper.accessor('itemTitle', {
      cell: (info) => info.getValue(),
      header: t('레슨'),
      size: 338,
      enableGrouping: false }),
    columnHelper.accessor('itemUrl', {
      cell: (info) => (
        <a className="underline" href={info.getValue()} target="_blank">
          {t('미리보기')}
        </a>
      ),
      header: t('미리보기'),
      size: 120,
      enableGrouping: false }),
  ] as ColumnDef<ScormData, string>[];

  return (
    <ModalContainer>
      <ModalTitle>{t('스콤보기')}</ModalTitle>
      <ModalBody>
        <div className="grid_wrap">
          <GridBox
            title={t('목록')}
            disabledSelectionToggle
            showNumberingColumn
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

export const ScormViewModal = ScormViewModalComponent;
