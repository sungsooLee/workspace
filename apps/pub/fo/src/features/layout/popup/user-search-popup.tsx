import { memo, useState } from 'react';

import { Button } from '@learnway/ui/button';
import { ContentsRow } from '@learnway/ui/contents-row';
import { ModalBody, ModalContainer, ModalFooter, ModalTitle } from '@learnway/ui/modal';
import { Panel } from '@learnway/ui/panel';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

import { IcoFormRequired } from '@learnway/icons';
import { cn, SelectOption } from '@learnway/shared';
import formStyles from '@learnway/styles/fo/assets/styles/modules/form.module.css';
import { ChipList } from '@learnway/ui/chips';
import { Dropdown } from '@learnway/ui/dropdown';
import { TableBox } from '@learnway/ui/grid';
import { Input } from '@learnway/ui/input';
import styles from './user-search-popup.module.css';

const UserSearchPopupComponent = () => {
  const [searchCategoryValue, setSearchCategoryValue] = useState<string[]>(['이름']);
  const otherOptions = [
    { value: 'option1', label: '이름' },
    { value: 'option2', label: '사번' },
    { value: 'option3', label: '조작' },
  ];

  const data: any[] = [
    {
      name1: 'L&D플랫폼팀',
      name2: '9480333',
      name3: '김현대',
      name4: '책임',
      name5: (
        <Button size="xs" variant="line">
          선택
        </Button>
      ),
    },
    {
      name1: 'L&D플랫폼팀',
      name2: '9480333',
      name3: '김현대',
      name4: '책임',
      name5: (
        <Button size="xs" variant="line">
          선택
        </Button>
      ),
    },
    {
      name1: 'L&D플랫폼팀',
      name2: '9480333',
      name3: '김현대',
      name4: '책임',
      name5: (
        <Button size="xs" variant="line">
          선택
        </Button>
      ),
    },
    {
      name1: 'L&D플랫폼팀',
      name2: '9480333',
      name3: '김현대',
      name4: '책임',
      name5: (
        <Button size="xs" variant="line">
          선택
        </Button>
      ),
    },
    {
      name1: 'L&D플랫폼팀',
      name2: '9480333',
      name3: '김현대',
      name4: '책임',
      name5: (
        <Button size="xs" variant="line">
          선택
        </Button>
      ),
    },
    {
      name1: 'L&D플랫폼팀',
      name2: '9480333',
      name3: '김현대',
      name4: '책임',
      name5: (
        <Button size="xs" variant="line">
          선택
        </Button>
      ),
    },
    {
      name1: 'L&D플랫폼팀',
      name2: '9480333',
      name3: '김현대',
      name4: '책임',
      name5: (
        <Button size="xs" variant="line">
          선택
        </Button>
      ),
    },
  ];

  const columnHelper = createColumnHelper<any>();
  const columns = [
    columnHelper.accessor('name1', {
      cell: (info) => info.getValue(),
      header: '조직명',
      meta: {
        headerAlign: 'center',
        cellAlign: 'center',
      },
    }),
    columnHelper.accessor('name2', {
      cell: (info) => info.getValue(),
      header: '사번',
      meta: {
        headerAlign: 'center',
        cellAlign: 'center',
      },
    }),
    columnHelper.accessor('name3', {
      cell: (info) => info.getValue(),
      header: '이름',
      meta: {
        headerAlign: 'center',
        cellAlign: 'center',
      },
    }),
    columnHelper.accessor('name4', {
      cell: (info) => info.getValue(),
      header: '직급',
      meta: {
        headerAlign: 'center',
        cellAlign: 'center',
      },
    }),
    columnHelper.accessor('name5', {
      cell: (info) => info.getValue(),
      header: '',
      size: 80,
      meta: {
        headerAlign: 'center',
        cellAlign: 'center',
      },
    }),
  ] as ColumnDef<any, unknown>[];

  const chipsValues: SelectOption[] = [
    { label: '현대자동차 A', value: 'A' },
    { label: '현대자동차 B', value: 'B' },
    { label: '현대자동차 C', value: 'C' },
    { label: '현대자동차 D', value: 'E' },
    { label: '현대자동차 F', value: 'F' },
    { label: '현대자동차 G', value: 'G' },
    { label: '현대자동차 H', value: 'H' },
    { label: '현대자동차 I', value: 'I' },
    { label: '현대자동차 J', value: 'J' },
    { label: '현대자동차 K', value: 'K' },
    { label: '현대자동차 L', value: 'L' },
    { label: '현대자동차 M', value: 'M' },
    { label: '현대자동차 N', value: 'N' },
    { label: '현대자동차 O', value: 'O' },
    { label: '현대자동차 P', value: 'P' },
    { label: '현대자동차 Q', value: 'Q' },
    { label: '현대자동차 R', value: 'R' },
  ];

  return (
    <ModalContainer>
      <ModalTitle>{'사용자 선택'}</ModalTitle>
      <ModalBody>
        <div className={`${styles.start} ${styles.user_search}`}>
          <Panel hideHeaderUnderline className={`${styles.panel} w-full`} type="rounded_fill">
            <ContentsRow>
              <div className={`${formStyles.form_item} ${styles.form_item}`}>
                <div className={formStyles.input_box}>
                  <Dropdown
                    className={styles.btn_category}
                    options={otherOptions}
                    value={searchCategoryValue}
                    onChange={(selected) => setSearchCategoryValue(selected)}
                    variant="default"
                    isMulti={false}
                    size={'lg'}
                  />
                  <div className={styles.box}>
                    <Input type="text" value="김현대" inputSize={'lg'} />
                    <Button variant="primary" size="lx" label="검색" />
                  </div>
                </div>
              </div>
            </ContentsRow>
          </Panel>

          <TableBox
            data={data}
            columns={columns}
            tableMode={true}
            title=" "
            showTotalCount={false}
            titleCustomNode={
              <div className="custom_info_wrap">
                <strong className={styles.count}>
                  <em>5</em>건
                </strong>
              </div>
            }
            customButtonNode={
              <div className={styles.btn_select}>
                <Button variant="text" size="sm" label={'전체 선택'} />
                <Button variant="text" size="sm" label={'전체 해제'} />
              </div>
            }
          />

          <div className={styles.detail_box}>
            <strong className={styles.tit}>내 그룹 상세</strong>
            <ContentsRow>
              <div className={formStyles.form_item}>
                <label htmlFor="group" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>그룹명</span>
                  {/* 필수 케이스 */}
                  <span className={cn(formStyles.status, formStyles.required)}>
                    <IcoFormRequired width={14} height={14} />
                  </span>
                </label>
                <div className={formStyles.input_box}>
                  <Input id="group" type="text" placeholder="입력" value="" inputSize="lg" />
                </div>
              </div>
            </ContentsRow>
            <ContentsRow>
              <div className={formStyles.form_item}>
                <label htmlFor="group" className={`${formStyles.form_label}`}>
                  <span className={formStyles.form_text}>그룹원</span>
                  <span className={styles.count}>
                    <em>150</em>명
                  </span>
                  <Button className={`${formStyles.comment} ${styles.btn_add}`}>추가</Button>
                </label>
                <div className={formStyles.input_box}>
                  <ChipList options={chipsValues} className={styles.chip} />
                </div>
              </div>
            </ContentsRow>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button label={'취소'} variant="gray" size="xl"></Button>
        <Button label={'다음'} variant={'primary'} size={'xl'}></Button>
      </ModalFooter>
    </ModalContainer>
  );
};

export const UserSearchPopup = memo(UserSearchPopupComponent);
