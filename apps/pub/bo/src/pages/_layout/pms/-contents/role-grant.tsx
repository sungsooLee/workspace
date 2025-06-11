/* eslint-disable @nx/enforce-module-boundaries */
import { FC, useState } from 'react';
import { cn } from '@learnway/shared';
import { FormSubTitle } from '../../../../../../../bo/src/shared/ui/form';
import { Button, ContentsRow, Input, Dropdown, GridBox, ChipList } from '@learnway/ui';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { ContentsHistoryInfoFormField } from '../../../../../../../bo/src/shared/ui/form/contents-history-info-form-field';
import { IcoFormRequired, IcoRefresh02, IcoSearch, IcoPlus, IcoMinus } from '@learnway/icons';

/* style */
import styles from '@learnway/styles/bo/features/role/role-info.module.css';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css'; // form
import searchStyles from '@learnway/styles/bo/assets/styles/modules/search-box.module.css';

const RoleGrantComponent: FC<{}> = ({}) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const options = [
    { value: 'option1', label: '전체' },
    { value: 'option2', label: '옵션 2' },
    { value: 'option3', label: '옵션 3' },
  ];

  // grid
  const [pageNumber, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const columnHelper = createColumnHelper<any>();
  const columns = [
    columnHelper.accessor('company', {
      cell: (info) => info.getValue(),
      header: '회사',
      enableGrouping: false,
      meta: {
        size: 'auto',
      },
    }),
    columnHelper.accessor('group', {
      cell: (info) => info.getValue(),
      header: '조직',
      meta: {
        size: 'auto',
      },
    }),
    columnHelper.accessor('userId', {
      cell: (info) => info.getValue(),
      header: '사용자ID',
      meta: {
        size: 'auto',
      },
    }),
    columnHelper.accessor('name', {
      cell: (info) => info.getValue(),
      header: '이름',
      meta: {
        size: 'auto',
      },
    }),
    columnHelper.accessor('bool', {
      cell: (info) => info.getValue(),
      header: '사용여부',
      meta: {
        size: 'auto',
        cellAlign: 'center',
      },
    }),
    columnHelper.accessor('dateStart', {
      cell: (info) => info.getValue(),
      header: '역할 시작일',
      meta: {
        size: 'auto',
        cellAlign: 'center',
      },
    }),
    columnHelper.accessor('dateEnd', {
      cell: (info) => info.getValue(),
      header: '역할 종료일',
      meta: {
        size: 'auto',
        cellAlign: 'center',
      },
    }),
  ] as ColumnDef<any, unknown>[];
  const data: any[] = [
    {
      company: '현대자동차',
      group: '조직명',
      userId: '12345',
      name: <Button className="link" label={'김현대'} />,
      bool: 'Y',
      dateStart: '2025-01-01 00:00',
      dateEnd: '2025-01-01 00:00',
    },
    {
      company: '현대자동차',
      group: '조직명',
      userId: '12345',
      name: <Button className="link" label={'김현대'} />,
      bool: 'Y',
      dateStart: '2025-01-01 00:00',
      dateEnd: '2025-01-01 00:00',
    },
  ];

  // dropdown
  const [dropdownValues, setDropdownValues] = useState<string[]>(['선택']);
  const otherOptions = [
    { value: 'a', label: '선택' },
    { value: 'b', label: '회사' },
    { value: 'c', label: '조직' },
    { value: 'd', label: '사용자ID' },
    { value: 'e', label: '이름' },
  ];

  return (
    <div className={cn(styles.start, styles.wrap)}>
      <FormSubTitle
        label={'역할 부여'}
        actionNode={<Button label={'저장'} variant={'save'} size={'sm'} />}
        lineType={'light'}
      />
      <div className={styles.contents_wrap}>
        {/* search-box */}
        <ContentsRow>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-id" className={formStyles.form_label}>
              <span className={formStyles.form_text}>{'개별사용자 역할부여'}</span>
            </label>
            <div className={formStyles.input_box}>
              {/* 4개인 CASE */}
              <GridBox
                data={data}
                columns={columns}
                showNumberingColumn={true}
                showSelectedCount={true}
                multiple={true}
                pagination={{
                  pageSize,
                  pageNumber,
                  totalPages: 2,
                  onPageChange: setPageIndex,
                  onPageSizeChange: setPageSize,
                }}
                title={'회사 목록'}
                customButtonNode={
                  <>
                    <Dropdown
                      options={otherOptions}
                      value={dropdownValues}
                      onChange={(selected) => setDropdownValues(selected)}
                      placeholder="선택"
                      variant="default"
                      isMulti={false}
                      size={'sm'}
                    />
                    <Input
                      type="text"
                      placeholder="검색"
                      showSearchIcon={true}
                      searchIconType={'search'}
                    />
                    <Button label={'일괄 적용'} variant={'text'} />
                    <Button
                      label={'추가'}
                      icon={<IcoPlus width={16} height={16} stroke={'#131c30'} />}
                    />
                    <Button
                      label={'삭제'}
                      icon={<IcoMinus width={16} height={16} stroke={'#131c30'} />}
                    />
                  </>
                }
              />
            </div>
          </div>
        </ContentsRow>
        <ContentsRow type="horizontal">
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-target" className={formStyles.form_label}>
              <span className={formStyles.form_text}>유저 그룹 역할부여</span>
              {/* count */}
              <span className={formStyles.form_count}>{'2'}</span>
            </label>
            <div className={formStyles.input_box}>
              <span className={formStyles.info_area}>
                <Button
                  size={'sm'}
                  label={'추가'}
                  icon={<IcoPlus width={16} height={16} stroke={'#4C515E'} />}
                />
              </span>
            </div>
          </div>
        </ContentsRow>
        <ChipList options={['김현대(1234567)']} wordwrap={true} />
      </div>
    </div>
  );
};

RoleGrantComponent.displayName = 'RoleGrant';
export const RoleGrant = RoleGrantComponent;
