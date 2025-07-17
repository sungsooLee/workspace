import { forwardRef, useRef, useEffect, useState, useImperativeHandle } from 'react';
import { getDateToString, DATE_TIME_FORMAT } from '@learnway/shared';
import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';
import { ColumnDef, createColumnHelper, CellContext } from '@tanstack/react-table';
import { t } from 'i18next';
import { useWatch } from 'react-hook-form';
import { EnGlobalConst } from '@types';
import { CODE_GROUP, DynamicFormConfig, useDynamicForm } from '@learnway/hooks';
import {
  ChipListModalSelectorFormField,
  ContentsRow,
  ContentsRowItem,
  FormSubTitle,
  Input,
  RadioGroupFormField,
  GridBox,
  GridFormField,
  EditDropdownCell,
  EditSwitchCell,
  DatePicker,
} from '@learnway/ui';
import { ContentsHistoryInfoFormField, FormItem, FormRow } from '@shared/ui';
import { DuplicateCheckInputFormField, DuplicateState, FormDisplay } from '@features/form';
import { getUserStatus } from '../service/company-user.service';
import UsersService from '@entities/users/api/users';
import { CompanyUserDetailPersonal } from './company-user-detail-personal';

const CompanyUserDetailJobComponent = ({ provider }: { provider: any }) => {
  const jobGroupColumns = [
    {
      header: '직군',
      accessorKey: 'role1',
      cell: (info: CellContext<any, string>) => (
        <EditDropdownCell
          info={info}
          dropdown={{
            options: [{ label: 'TEST', value: 'TEST' }],
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
      cell: (info: CellContext<any, string>) => (
        <EditDropdownCell
          info={info}
          dropdown={{
            options: [{ label: 'TEST', value: 'TEST' }],
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
                visibleRowCount: 3,
              }}
            />
          }
        />
      </ContentsRow>
    </>
  );
};

export const CompanyUserDetailJob = CompanyUserDetailJobComponent;
