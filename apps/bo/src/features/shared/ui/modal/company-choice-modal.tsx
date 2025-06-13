import React, { useState, forwardRef, useCallback } from 'react';
import { createColumnHelper, ColumnDef } from '@tanstack/react-table';
import { t } from 'i18next';

import popupStyles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';

import {
  Button,
  ContentsRow,
  DynamicFormField,
  Input,
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalTitle,
  GridBox,
  useModal,
  useGridBox,
  useGridBoxConfig,
} from '@learnway/ui';

import { useSearchBox, SearchBoxConfig, CODE_GROUP } from '@learnway/hooks';

import { SearchBox } from '@shared/ui/search-box';

import { queryOptions as companyQueryOptions } from '@entities/companies/service/companies.queries';

import { EnGlobalConst } from '@types';

/**
 * 화면 번호: NLP_BO_TMS_1001_19 or 화면번호 NLP_BO_PMS_1107
 */
const CompanyModalComponent = forwardRef((props, ref) => {
  const { close: closeModal } = useModal();
  const { provider: sProvider, getValues } = useSearchBox(searchConfig);
  const { config, gridFetch } = useGridBox(gridConfig, getValues);

  const [selectedRow, setSelectedRow] = useState();

  const handleRowSelect = (row: any) => {
    setSelectedRow(row);
  };

  const handleOnSearch = useCallback((data: any) => {
    gridFetch(data);
  }, []);

  const handleOnClose = () => {
    closeModal();
  };
  const handleOnConfirm = () => {
    if (!selectedRow) closeModal();
    closeModal(selectedRow);
  };

  /**
   * @param data
   */

  return (
    <ModalContainer>
      <ModalTitle>{t('회사 조회')}</ModalTitle>
      <ModalBody>
        <div className={popupStyles.wrap}>
          <SearchBox provider={sProvider} onSearch={handleOnSearch} />
          <div className={popupStyles.container}>
            <GridBox
              onRowSelect={handleRowSelect}
              config={config}
              columns={columns}
              showNumberingColumn
              visibleRowCount={7}
              title={t('회사')}
            />
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <ModalFooter>
          <Button label={t('취소')} variant="gray" size="lg" onClick={handleOnClose} />
          <Button label={t('확인')} variant="primary" size="lg" onClick={handleOnConfirm} />
        </ModalFooter>
      </ModalFooter>
    </ModalContainer>
  );
});

export const CompanyChoiceModal = CompanyModalComponent;

const searchConfig: SearchBoxConfig = {
  builders: [
    [
      {
        name: 'companyType',
        type: 'dropdown',
        label: t('그룹'),
        value: '',
        presetOptionLabel: t('LABEL.form.label.select'),
        optionsConfig: {
          codeGroup: CODE_GROUP['pms.company.CompanyType'],
        },
      },
      {
        name: 'name',
        type: 'text',
        label: t('회사명'),
        value: '',
      },
    ],
  ],
};

const gridConfig: useGridBoxConfig = {
  query: companyQueryOptions.list,
  columns: [],
  data: [],
};

const columnHelper = createColumnHelper<any>();
const columns = [
  columnHelper.accessor('companyType', {
    cell: (info) =>
      t(`${EnGlobalConst.SYSTEM_COMMON_CODE}.pms.company.CompanyType.${info.getValue()}`),
    header: t('그룹'),
    size: 210,
  }),
  columnHelper.accessor('name', {
    cell: (info) => info.getValue(),
    header: t('회사'),
    size: 210,
  }),
  columnHelper.accessor('rpsntrName', {
    cell: (info) => info.getValue(),
    header: t('대표자'),
    size: 210,
  }),
  columnHelper.accessor('brn', {
    cell: (info) => info.getValue(),
    header: t('사업자 등록번호'),
    size: 220,
  }),
  columnHelper.accessor('callNumber', {
    cell: (info) => info.getValue(),
    header: t('대표 전화'),
    size: 210,
  }),
  columnHelper.accessor('email', {
    cell: (info) => info.getValue(),
    header: t('대표 이메일'),
    size: 210,
  }),
] as ColumnDef<any, unknown>[];
