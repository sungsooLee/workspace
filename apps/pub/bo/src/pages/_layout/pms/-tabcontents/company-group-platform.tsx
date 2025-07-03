/* eslint-disable @nx/enforce-module-boundaries */
import { FC, useState } from 'react';
import { cn } from '@learnway/shared';
import { IcoMinus, IcoFormRequired, IcoRefresh02, IcoSearch } from '@learnway/icons';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import {
  TreeBox,
  TreeContainer,
  TreeNode,
  Input,
  Button,
  ContentsRow,
  Textarea,
  ChipListModalSelectorFormField,
  useModal,
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalTitle,
  Divider,
  Dropdown,
  GridBox,
} from '@learnway/ui';
import { SectionLayout } from '../../-components/section-layout';
import { FormSubTitle } from '../../../../../../../bo/src/shared/ui/form';
import { ContentsHistoryInfoFormField } from '../../../../../../../bo/src/shared/ui/form';

/* style */
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';
import searchStyles from '@learnway/styles/bo/assets/styles/modules/search-box.module.css'; // search-box.module.css

const CompanyGroupPlatformComponent: FC<{}> = ({}) => {
  const sampleData: TreeNode[] = [
    {
      key: '1',
      title: 'Root Node 1',
      isUsed: false,
      children: [
        {
          key: '1-1',
          title: 'Child 1',
          isUsed: true,
          children: [
            { key: '1-1-1', title: 'Grandchild 1', isUsed: true },
            { key: '1-1-2', title: 'Grandchild 2', isUsed: false },
          ],
        },
        {
          key: '1-2',
          title: 'Child 2',
          isUsed: true,
          children: [
            { key: '2-1', title: 'Child 3', isUsed: false },
            { key: '2-2', title: 'Child 4', isUsed: false },
          ],
        },
      ],
    },
  ];
  const { close: closeModal } = useModal();
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const options = [
    { value: 'option1', label: '전체' },
    { value: 'option2', label: '옵션 2' },
    { value: 'option3', label: '옵션 3' },
  ];

  // grid
  const columnHelper = createColumnHelper<any>();
  const data: any[] = [
    {
      name1: '현대자동차',
      name2: '경영지원본부',
      name3: '경영지원실',
      name4: '1234567',
      name5: '김현대',
      name6: '재직',
      name7: '정상',
    },
    {
      name1: '현대자동차',
      name2: '경영지원본부',
      name3: '경영지원실',
      name4: '1234567',
      name5: '김현대',
      name6: '재직',
      name7: '정상',
    },
    {
      name1: '현대자동차',
      name2: '경영지원본부',
      name3: '경영지원실',
      name4: '1234567',
      name5: '김현대',
      name6: '재직',
      name7: '정상',
    },
    {
      name1: '현대자동차',
      name2: '경영지원본부',
      name3: '경영지원실',
      name4: '1234567',
      name5: '김현대',
      name6: '재직',
      name7: '정상',
    },
    {
      name1: '현대자동차',
      name2: '경영지원본부',
      name3: '경영지원실',
      name4: '1234567',
      name5: '김현대',
      name6: '재직',
      name7: '정상',
    },
    {
      name1: '현대자동차',
      name2: '경영지원본부',
      name3: '경영지원실',
      name4: '1234567',
      name5: '김현대',
      name6: '재직',
      name7: '정상',
    },
  ];
  const columns = [
    columnHelper.accessor('name1', {
      cell: (info) => info.getValue(),
      header: '회사',
      meta: {
        size: 'auto',
      },
      enableGrouping: false,
    }),
    columnHelper.accessor('name2', {
      cell: (info) => info.getValue(),
      header: '본부/사업부',
      meta: {
        size: 'auto',
        cellAlign: 'center',
      },
      enableGrouping: false,
    }),
    columnHelper.accessor('name3', {
      cell: (info) => info.getValue(),
      header: '소속',
      meta: {
        size: 'auto',
      },
      enableGrouping: false,
    }),
    columnHelper.accessor('name4', {
      cell: (info) => info.getValue(),
      header: '사번',
      meta: {
        size: 'auto',
        cellAlign: 'center',
      },
      enableGrouping: false,
    }),
    columnHelper.accessor('name5', {
      cell: (info) => info.getValue(),
      header: '이름',
      meta: {
        size: 'auto',
      },
      enableGrouping: false,
    }),
    columnHelper.accessor('name6', {
      cell: (info) => info.getValue(),
      header: '재직여부',
      size: 100,
      enableGrouping: false,
    }),
    columnHelper.accessor('name7', {
      cell: (info) => info.getValue(),
      header: '계정상태',
      size: 100,
      enableGrouping: false,
    }),
  ] as ColumnDef<any, unknown>[];
  const UserSearchContent = () => {
    return (
      <ModalContainer>
        <ModalTitle>{'유저 조회'}</ModalTitle>
        <ModalBody>
          <div className={cn(searchStyles.start, searchStyles.wrap)}>
            <div className={searchStyles.contents}>
              <div className={searchStyles.item_row}>
                <div className={searchStyles.item_wrap}>
                  <div className={searchStyles.inner}>
                    <div className={searchStyles.item}>
                      <label htmlFor="name-select1" className={searchStyles.label}>
                        <span className={searchStyles.text}>회사</span>
                      </label>
                      <div className={searchStyles.box}>
                        <Dropdown
                          options={options}
                          value={selectedValues}
                          onChange={(selected) => setSelectedValues(selected)}
                          variant="default"
                          size={'sm'}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={searchStyles.inner}>
                    <div className={searchStyles.item}>
                      <label htmlFor="name-select2" className={searchStyles.label}>
                        <span className={searchStyles.text}>본부/사업부</span>
                      </label>
                      <div className={searchStyles.box}>
                        <Dropdown
                          options={options}
                          value={selectedValues}
                          onChange={(selected) => setSelectedValues(selected)}
                          variant="default"
                          size={'sm'}
                        />
                      </div>
                    </div>
                    <div className={searchStyles.item}>
                      <label htmlFor="name-select3" className={searchStyles.label}>
                        <span className={searchStyles.text}>소속</span>
                      </label>
                      <div className={searchStyles.box}>
                        <Dropdown
                          options={options}
                          value={selectedValues}
                          onChange={(selected) => setSelectedValues(selected)}
                          variant="default"
                          size={'sm'}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className={searchStyles.item_wrap}>
                  <div className={searchStyles.inner}>
                    <div className={searchStyles.item}>
                      <label htmlFor="name-input1" className={searchStyles.label}>
                        <span className={searchStyles.text}>사번</span>
                      </label>
                      <div className={searchStyles.box}>
                        <Input id={'name-input1'} type={'text'} placeholder={'입력'} value={''} />
                      </div>
                    </div>
                  </div>
                  <div className={searchStyles.inner}>
                    <div className={searchStyles.item}>
                      <label htmlFor="name-input2" className={searchStyles.label}>
                        <span className={searchStyles.text}>이름</span>
                      </label>
                      <div className={searchStyles.box}>
                        <Input id={'name-input2'} type={'text'} placeholder={'입력'} value={''} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={searchStyles.btn_box}>
                <Button
                  type="button"
                  className={searchStyles.btn_refresh}
                  variant="search"
                  size="sm"
                  onlyIcon
                >
                  <IcoRefresh02 className={searchStyles.icon_refresh} />
                </Button>
                <Button
                  type="button"
                  variant="search"
                  size="sm"
                  className={searchStyles.btn_search}
                >
                  <IcoSearch className={searchStyles.icon_sm_search} />
                  조회
                </Button>
              </div>
            </div>
          </div>
          <Divider />
          <GridBox data={data} columns={columns} title={'유저 목록'} />
        </ModalBody>
        <ModalFooter>
          <Button label={'취소'} variant={'gray'} size={'lg'} onClick={() => closeModal()} />
          <Button label={'확인'} variant={'primary'} size={'lg'} onClick={() => closeModal()} />
        </ModalFooter>
      </ModalContainer>
    );
  };
  return (
    <SectionLayout contentsRatio={'forty'}>
      <TreeContainer>
        <TreeBox data={sampleData} treeId={'menu-tree'} title={'조직-플랫폼'} />
      </TreeContainer>
      <div>
        <FormSubTitle
          label={'회사조직(플랫폼)'}
          lineType={'dark'}
          actionNode={
            <>
              <Button variant={'text'} size={'sm'} label={'초기화'} />
              <Button
                variant={'text'}
                size={'sm'}
                icon={<IcoMinus width={16} height={16} stroke="#4C515E" />}
                label={'삭제'}
              />
              <Button variant={'save'} size={'sm'} label={'저장'} />
            </>
          }
        />
        <ContentsRow>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name01" className={formStyles.form_label}>
              <span className={formStyles.form_text}>조직 위치</span>
            </label>
            <div className={formStyles.input_box}>
              <Input
                id={'name01'}
                type={'text'}
                placeholder={'입력'}
                value={'러닝웨이 - 조직 > 현대자동차 >'}
                readOnly
              />
            </div>
          </div>
        </ContentsRow>
        <ContentsRow>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name02" className={formStyles.form_label}>
              <span className={formStyles.form_text}>상위 조직명</span>
            </label>
            <div className={formStyles.input_box}>
              <Input
                id={'name02'}
                type={'text'}
                placeholder={'입력'}
                value={'현대자동차'}
                readOnly
              />
            </div>
          </div>
        </ContentsRow>
        <ContentsRow>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name03" className={formStyles.form_label}>
              <span className={formStyles.form_text}>상위 조직코드</span>
            </label>
            <div className={formStyles.input_box}>
              <Input id={'name03'} type={'text'} placeholder={'입력'} value={'A100001'} readOnly />
            </div>
          </div>
        </ContentsRow>
        <ContentsRow>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name04" className={formStyles.form_label}>
              <span className={formStyles.form_text}>조직 코드</span>
            </label>
            <div className={formStyles.input_box}>
              <Input id={'name04'} type={'text'} placeholder={'입력'} value={'B100000'} readOnly />
            </div>
          </div>
        </ContentsRow>
        <ContentsRow>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name05" className={formStyles.form_label}>
              <span className={formStyles.form_text}>조직명</span>
              {/* 필수 케이스 */}
              <span className={cn(formStyles.status, formStyles.required)}>
                <IcoFormRequired width={12} height={12} />
              </span>
            </label>
            <div className={formStyles.input_box}>
              <Input
                id={'name05'}
                type={'text'}
                placeholder={'입력'}
                value={'조직명'}
                maxLength={50}
              />
              <Button variant={'gray'} size={'sm'} label={'중복'} />
            </div>
          </div>
        </ContentsRow>
        <ContentsRow>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-number" className={formStyles.form_label}>
              <span className={formStyles.form_text}>조직장 사번</span>
            </label>
            <div className={formStyles.input_box}>
              <ChipListModalSelectorFormField
                modalConfig={{
                  width: 'xl',
                  content: <UserSearchContent />,
                }}
                chipList={{
                  labelField: 'name',
                  valueField: 'value',
                  hideBorder: true,
                }}
              />
            </div>
          </div>
        </ContentsRow>
        <ContentsRow>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name06" className={formStyles.form_label}>
              <span className={formStyles.form_text}>조직장 이름</span>
            </label>
            <div className={formStyles.input_box}>
              <Input id={'name06'} type={'text'} placeholder={'입력'} value={'김현대'} disabled />
            </div>
          </div>
        </ContentsRow>
        <ContentsRow>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-explain" className={formStyles.form_label}>
              <span className={formStyles.form_text}>설명</span>
            </label>
            <div className={formStyles.input_box}>
              <Textarea
                id={'name-explain'}
                rows={5}
                cols={5}
                maxLength={50}
                resize={'none'}
                placeholder={'입력'}
                size={'md'}
              />
            </div>
          </div>
        </ContentsRow>
        <ContentsHistoryInfoFormField />
      </div>
    </SectionLayout>
  );
};

CompanyGroupPlatformComponent.displayName = 'CompanyGroupPlatform';
export const CompanyGroupPlatform = CompanyGroupPlatformComponent;
