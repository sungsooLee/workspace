import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { t } from 'i18next';
import { forwardRef, useCallback, useState } from 'react';

import popupStyles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';

import { Divider } from '@learnway/ui/elements';
import { GridBox, useGridBox, useGridBoxConfig } from '@learnway/ui/grid';

import { CODE_GROUP, SearchBoxConfig, useSearchBox } from '@learnway/hooks';

import { SearchBox } from '@shared/ui/search-box';

import { queryOptions as companyQueryOptions } from '@entities/companies';

import { Button } from '@learnway/ui/button';
import { ModalBody, ModalContainer, ModalFooter, ModalTitle, useModal } from '@learnway/ui/modal';
import { EnGlobalConst } from '@types';

/**
 * 화면 번호: NLP_BO_TMS_1001_19 or 화면번호 NLP_BO_PMS_1107
 */
const CompanyModalComponent = forwardRef((props, ref) => {
  const searchConfig: SearchBoxConfig = {
    builders: [
      [
        {
          name: 'companyType',
          type: 'dropdown',
          label: t('그룹'),
          value: '',
          optionsConfig: {
            options: [{ label: t('전체'), value: '' }],
            codeGroup: CODE_GROUP['pms.company.CompanyType'],
          },
        },
        {
          name: 'companyCode',
          type: 'dropdown',
          label: t('회사'),
          value: '',
          format: 'object',
          presetOptionLabel: t('LABEL.form.label.all'),
          optionsConfig: {
            codeGroup: CODE_GROUP['manual.company.companyCode'],
          },
          dropdownConfig: {
            onchange: () => {
              return '';
            },
            isSearchable: true,
            placeholder: '입력 또는 선택',
          },
        },
      ],
    ],
  };

  const gridConfig: useGridBoxConfig = {
    query: companyQueryOptions.listPopup,
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
    columnHelper.accessor('managerPhone', {
      cell: (info) => info.getValue(),
      header: t('대표 전화'),
      size: 210,
    }),
    columnHelper.accessor('managerEmail', {
      cell: (info) => info.getValue(),
      header: t('대표 이메일'),
      size: 210,
    }),
  ] as ColumnDef<any, unknown>[];
  const { closeModal } = useModal();
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
          <Divider />
          <GridBox
            onRowSelect={handleRowSelect}
            config={config}
            columns={columns}
            showNumberingColumn
            visibleRowCount={7}
            title={t('회사목록')}
          />
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
