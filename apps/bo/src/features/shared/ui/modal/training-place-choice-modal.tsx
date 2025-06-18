import { useCallback, useEffect } from 'react';
import { t } from 'i18next';
import {
  Button,
  ModalBody,
  ModalContainer,
  ModalTitle,
  GridBox,
  useModal,
  useGridBox,
  useGridBoxConfig,
  Divider,
} from '@learnway/ui';
import { SearchBox } from '@shared/ui/search-box';
import { useSearchBox, SearchBoxConfig, CODE_GROUP } from '@learnway/hooks';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { EnGlobalConst } from '@types';

import popupStyles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';

const TrainingPlaceChoiceModalComponent = ({ onAddClick }: { onAddClick?: any }) => {
  const { close: closeModal } = useModal();

  const { provider: sProvider, getValues } = useSearchBox(searchConfig);
  const { config: gConfig, gridFetch } = useGridBox(gridConfig, getValues);

  useEffect(() => {
    gridFetch();
  }, []);

  const handleOnSearch = useCallback((data: any) => {
    gridFetch(data);
  }, []);

  const columnHelper = createColumnHelper<any>();

  const columns = [
    columnHelper.accessor('tenantList', {
      cell: (info) => info.row.original.tenantList[0].tenantName,
      header: t('테넌트'),
      size: 300,
      enableGrouping: false,
    }),
    columnHelper.accessor('educationPlaceTypecd', {
      cell: (info) =>
        t(
          `${EnGlobalConst.SYSTEM_COMMON_CODE}.pms.education.EducationPlaceType.${info.getValue()}`,
        ),
      header: t('교육공간 타입'),
      enableGrouping: false,
      size: 200,
    }),
    columnHelper.accessor('educationPlaceCodeName', {
      cell: (info) => info.getValue(),
      header: t('교육공간명'),
      size: 300,
      enableGrouping: false,
    }),
    columnHelper.accessor('addr', {
      cell: (info) => info.getValue(),
      header: t('주소'),
      size: 300,
      enableGrouping: false,
    }),
    columnHelper.accessor('isUsed', {
      cell: (info) => (info.getValue() ? t('사용') : t('미사용')),
      header: t('사용여부'),
      size: 90,
      enableGrouping: false,
    }),
    columnHelper.accessor('educationPlaceUuid', {
      cell: (info) => (
        <Button variant="gray" label={t('선택')} onClick={() => closeModal(info.row.original)} />
      ),
      header: t('선택'),
      size: 90,
      enableGrouping: false,
      meta: {
        cellAlign: 'center',
      },
    }),
  ] as ColumnDef<any, unknown>[];

  return (
    <ModalContainer>
      <ModalTitle>{t('교육공간 선택')}</ModalTitle>
      <ModalBody>
        <div className={popupStyles.wrap}>
          <SearchBox provider={sProvider} onSearch={handleOnSearch} />
          <Divider />
          <GridBox
            config={gConfig}
            columns={columns}
            disabledSelectionToggle
            title={t('교육공간 목록')}
            showAdd={onAddClick}
            onAddClick={onAddClick}
            guideText={t('등록된 교육공간이 없으면 추가 버튼을 눌러서 등록하세요.')}
          />
        </div>
      </ModalBody>
    </ModalContainer>
  );
};

export const TrainingPlaceChoiceModal = TrainingPlaceChoiceModalComponent;

const searchConfig: SearchBoxConfig = {
  builders: [
    [
      {
        name: 'tenantId',
        type: 'dropdown',
        format: 'number',
        label: t('테넌트'),
        value: '',
        presetOptionLabel: t('선택'),
        optionsConfig: {
          codeGroup: CODE_GROUP['manual.tenant.tenantId'],
        },
      },
      {
        name: 'educationPlaceType',
        type: 'dropdown',
        label: t('교육공간 타입'),
        value: '',
        presetOptionLabel: t('전체'),
        optionsConfig: {
          codeGroup: CODE_GROUP['pms.education.EducationPlaceType'],
        },
      },
      {
        name: 'isUsed',
        type: 'dropdown',
        label: t('사용여부'),
        value: '',
        options: [
          { value: '', label: t('LABEL.all') },
          { value: 'true', label: t('사용') },
          { value: 'false', label: t('미사용') },
        ],
      },
      {
        name: 'educationPlaceCodeName',
        type: 'text',
        label: t('교육공간명'),
        value: '',
      },
    ],
  ],
};

const gridConfig: useGridBoxConfig = {
  query: '',
  columns: [
    {
      name: 'no1',
      label: 'NO.',
      type: 'numbering',
    },
  ],
  data: [],
  gridState: {
    page: 0,
    size: 10,
    sort: [],
  },
};
