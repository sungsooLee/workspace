import {
  ContentsRow,
  EditDropdownCell,
  EditSwitchCell,
  FormSubTitle,
  GridFormField,
} from '@learnway/ui';
import { FormRow } from '@shared/ui';
import { CellContext } from '@tanstack/react-table';
import { t } from 'i18next';

/**
 * 회사 유저 상세 - 직군/직무 정보
 * @param param0
 * @returns
 */
const CompanyUserDetailJobComponent = ({ provider }: { provider: any }) => {
  const jobGroupColumns = [
    {
      header: '직군',
      accessorKey: 'role1',
      size: 200,
      cell: (info: CellContext<any, string>) => (
        <EditDropdownCell
          info={info}
          dropdown={{
            options: [
              { label: '브랜드&베이직', value: 'BRAND&BASIC' },
              { label: '영업', value: 'SELLING' },
              { label: '서비스', value: 'SERVICE' },
            ],
          }}
        />
      ),
      meta: {
        headerAlign: 'center',
        cellAlign: 'center',
      },
    },
    {
      header: '직무',
      accessorKey: 'role2',
      size: 'auto',
      cell: (info: CellContext<any, string>) => (
        <EditDropdownCell
          info={info}
          dropdown={{
            options: [
              { label: '스텝', value: 'STAFF' },
              { label: '시스템 매니저', value: 'SYSTEM_MANAGER' },
              { label: '트레이닝 매니저', value: 'TRAINING_MANAGER' },
              { label: '기타', value: 'ETC' },
            ],
          }}
        />
      ),
      meta: {
        headerAlign: 'center',
        cellAlign: 'center',
      },
    },
    {
      header: '정/부',
      accessorKey: 'isMain',
      size: 170,
      cell: (info: CellContext<any, boolean>) => <EditSwitchCell info={info} />,
      meta: {
        headerAlign: 'center',
        cellAlign: 'center',
      },
    },
  ];

  return (
    <>
      <FormSubTitle label={t('직군/직무 정보')} lineType={'dark'} />
      <ContentsRow>
        <FormRow
          provider={provider}
          name={'jobDomains'}
          element={
            <GridFormField
              gridProps={{
                multiple: true,
                showAdd: true,
                showRemove: true,
                showTotalCount: false,
                columns: jobGroupColumns,
                title: t('직군/직무 관리'),
                visibleRowCount: 1,
              }}
            />
          }
        />
      </ContentsRow>
    </>
  );
};

export const CompanyUserDetailJob = CompanyUserDetailJobComponent;
