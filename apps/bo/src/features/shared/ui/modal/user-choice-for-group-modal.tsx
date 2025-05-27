import React, { useEffect, useState, forwardRef, useCallback } from 'react';
import { useWatch } from 'react-hook-form';
import { t } from 'i18next';
import {
  Button,
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalTitle,
  GridBox,
  useModal,
  useGridBox,
} from '@learnway/ui';
import { createColumnHelper, ColumnDef } from '@tanstack/react-table';
import { SearchBox } from '@shared/ui/search-box';
import { useSearchBox, SearchBoxConfig, CODE_GROUP, useCodeStore } from '@learnway/hooks';

import popupStyles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';
import { isEqual } from 'lodash';
import { usersQueryOptions } from '@entities/users/service/users.queries';
import { useGetCompanyDepartmentTree } from '@entities/department/service/department.hook';

const emptyOption = [{ label: t('선택'), value: '' }];

/**
 * 화면 번호 NLP_BO_TMS_1001_18 : 유저그룹대상자 조회
 */
const UserChoiceForGroupModalComponent = forwardRef((props, ref) => {
  const { close: closeModal } = useModal();
  //const { userGroupList } = props;

  const [selectedRow, setSelectedRow] = useState();
  const [companyOptions, setCompanyOptions] = useState<any[]>([]);
  const [companyCode, setCompanyCode] = useState<string>('');
  const [companyDeparmentTree, setCompanyDepartmentTree] = useState<any>();
  const [deptOptFirst, setDeptOptFirst] = useState<any[]>(emptyOption);
  const [deptFirstCode, setDeptFirstCode] = useState('');
  const [deptOptSecond, setDeptOptSecond] = useState<any[]>(emptyOption);
  const [deptSecondCode, setDeptSecondCode] = useState('');
  const [deptOptThird, setDeptOptThird] = useState<any[]>(emptyOption);

  const searchConfig: SearchBoxConfig = {
    builders: [
      [
        {
          name: 'compayId',
          type: 'dropdown',
          label: t('회사'),
          value: '',
          options: companyOptions,
          dropdownConfig: {
            onchange: () => {
              return '';
            },
            isSearchable: true,
            placeholder: '입력 선택',
          },
        },
        {
          name: 'departmentOne',
          type: 'dropdown',
          label: t('본부/사업부'),
          value: '',
          options: deptOptFirst,
        },
        {
          name: 'departmentTwo',
          type: 'dropdown',
          label: t('부서'),
          value: '',
          options: deptOptSecond,
        },
      ],
      [
        {
          name: 'departmentThree',
          type: 'dropdown',
          label: t('소속'),
          value: '',
          options: deptOptThird,
        },
        {
          name: 'userNo',
          type: 'text',
          label: t('사번'),
          value: '',
        },
        {
          name: 'userName',
          type: 'text',
          label: t('이름'),
          value: '',
        },
      ],
    ],
    validator: {
      compayId: { required: true },
    },
  };

  const { getCode } = useCodeStore();
  const { control, provider: sProvider, getValues } = useSearchBox(searchConfig);
  const { config, gridFetch } = useGridBox(gridConfig, getValues);
  const { data: departmentTreeData } = useGetCompanyDepartmentTree(companyCode);
  const watchedCompany = useWatch({
    control: control,
    name: ['compayId'],
  });
  const watchedDepartmentOne = useWatch({
    control: control,
    name: ['departmentOne'],
  });
  const watchedDepartmentTwo = useWatch({
    control: control,
    name: ['departmentTwo'],
  });

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

  useEffect(() => {
    const init = async () => {
      const data: any[] = await getCode(CODE_GROUP['manual.company.companyCode']);
      console.log('option data', data);
      setCompanyOptions([...data]);
    };
    init();
  }, []);

  useEffect(() => {
    const selectCompanyCode: string = watchedCompany[0];
    if (selectCompanyCode !== companyCode) {
      setCompanyCode(selectCompanyCode);
    }
  }, [watchedCompany]);

  useEffect(() => {
    const selected: string = watchedDepartmentOne[0];
    if (selected !== deptFirstCode) {
      setDeptFirstCode(selected);
      setDeptOptThird(emptyOption);
      setDeptSecondCode('');
      // 현재는 id를 사용하여 검색 함 조건이 변경 되면
      const firstDept = companyDeparmentTree.find((item: any) => item.deptId == selected);
      const secondOpts = firstDept.childList.map((item: any) => ({
        label: item.deptName,
        value: item.deptId,
      }));
      setDeptOptSecond([...emptyOption, ...secondOpts]);
    }
  }, [watchedDepartmentOne]);

  useEffect(() => {
    const selected: string = watchedDepartmentTwo[0];
    if (selected !== deptSecondCode) {
      setDeptSecondCode(selected);
      // 현재는 id를 사용하여 검색 함 조건이 변경 되면
      const firstDept = companyDeparmentTree.find((item: any) => item.deptId == deptFirstCode);
      const secondDept = firstDept.childList.find((item: any) => item.deptId == selected);
      const thirdOpts = secondDept.childList.map((item: any) => ({
        label: item.deptName,
        value: item.deptId,
      }));
      setDeptOptThird([...emptyOption, ...thirdOpts]);
    }
  }, [watchedDepartmentTwo]);

  useEffect(() => {
    console.log('departmentTreeData', departmentTreeData);
    if (
      !departmentTreeData ||
      !Array.isArray(departmentTreeData) ||
      isEqual(companyDeparmentTree, departmentTreeData)
    )
      return;
    setCompanyDepartmentTree(departmentTreeData);
    setDeptOptSecond(emptyOption);
    setDeptOptThird(emptyOption);
    setDeptSecondCode('');
    const firstDept = departmentTreeData.map((item: any) => ({
      label: item.deptName,
      value: item.deptId,
    }));
    setDeptOptFirst([...emptyOption, ...firstDept]);
    setDeptFirstCode('');
  }, [departmentTreeData]);

  return (
    <ModalContainer>
      <ModalTitle>{t('유저 그룹 대상자')}</ModalTitle>
      <ModalBody>
        <div className={popupStyles.wrap}>
          <SearchBox provider={sProvider} onSearch={handleOnSearch} />
          <div className={popupStyles.container}>
            <GridBox
              onRowSelect={handleRowSelect}
              config={config}
              columns={columns}
              height={380}
              showColumnSettings={false}
              title={t('유저조회목록')}
            />
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <ModalFooter>
          <Button label={t('취소')} variant={'gray'} size={'lg'} onClick={handleOnClose} />
          <Button label={t('확인')} variant={'primary'} size={'lg'} onClick={handleOnConfirm} />
        </ModalFooter>
      </ModalFooter>
    </ModalContainer>
  );
});

export const UserChoiceForGroupModal = UserChoiceForGroupModalComponent;

const gridConfig = {
  query: usersQueryOptions.list,
  columns: [],
  data: [],
  pagination: {
    pageSize: 10,
    pageIndex: 1,
    totalRows: 2,
  },
};

const columnHelper = createColumnHelper<any>();
const columns = [
  columnHelper.accessor('companyName', {
    cell: (info) => info.getValue(),
    header: '회사',
    enableGrouping: false,
    size: 210,
  }),
  columnHelper.accessor('deptName', {
    cell: (info) => info.getValue(),
    header: '본부/사업부',
    size: 240,
    enableGrouping: false,
  }),
  columnHelper.accessor('dep', {
    cell: (info) => info.getValue(),
    header: '부서',
    size: 150,
    enableGrouping: false,
  }),
  columnHelper.accessor('dept2', {
    cell: (info) => info.getValue(),
    header: '소속',
    size: 150,
    enableGrouping: false,
  }),
  columnHelper.accessor('userNo', {
    cell: (info) => info.getValue(),
    header: '사번',
    size: 220,
    enableGrouping: false,
  }),
  columnHelper.accessor('userName', {
    cell: (info) => info.getValue(),
    header: '이름',
    size: 220,
    enableGrouping: false,
  }),
  columnHelper.accessor('opt2', {
    cell: (info) => info.getValue(),
    header: '재직여부',
    size: 240,
    enableGrouping: false,
  }),
  columnHelper.accessor('opt3', {
    cell: (info) => info.getValue(),
    header: '계정상태',
    size: 240,
    enableGrouping: false,
  }),
] as ColumnDef<any, unknown>[];
