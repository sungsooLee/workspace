import { Button } from '@learnway/ui/button';
import { ModalBody, ModalContainer, ModalFooter, ModalTitle, useModal } from '@learnway/ui/modal';
// IA106 / NLP_BO_CMS_1053 스콤 보기

import { ScormOrgn } from '@entities/learning-resource';
import { GridBox } from '@learnway/ui/grid';
import { PreviewLearningWindow } from '@shared/ui/modal';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { t } from 'i18next';
import { flatten } from 'lodash-es';
import { useEffect, useState } from 'react';

interface ScormViewModalComponentProps {
  contentUuid: string;
  scormData: ScormOrgn[];
}

interface ScormData {
  orgnTitle: string;
  itemTitle: string;
  scoId: string;
}

function ScormViewModalComponent({ contentUuid, scormData }: ScormViewModalComponentProps) {
  const { closeModal, openModal } = useModal();
  const [data, setData] = useState<ScormData[]>([]);
  useEffect(() => {
    setData(
      flatten(
        scormData.map(({ orgnTitle, items }) =>
          items?.map(({ itemTitle, scoId }) => ({
            orgnTitle,
            itemTitle,
            scoId,
          })),
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
      enableGrouping: false,
    }),
    columnHelper.accessor('itemTitle', {
      cell: (info) => info.getValue(),
      header: t('레슨'),
      size: 338,
      enableGrouping: false,
    }),
    columnHelper.accessor('scoId', {
      cell: (info) => (
        <Button
          className="link"
          onClick={(e) => {
            e.stopPropagation();
            openModal({
              width: 'full',
              content: <PreviewLearningWindow contentUuid={contentUuid} scoId={info.getValue()} />,
            });
          }}
        >
          {t('미리보기')}
        </Button>
      ),
      header: t('미리보기'),
      size: 120,
      enableGrouping: false,
    }),
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
