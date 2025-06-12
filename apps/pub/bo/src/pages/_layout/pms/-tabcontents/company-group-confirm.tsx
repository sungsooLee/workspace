/* eslint-disable @nx/enforce-module-boundaries */
import { FC, useState } from 'react';
import { cn } from '@learnway/shared';
import { IcoRefresh02, IcoSearch } from '@learnway/icons';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import {
  TreeBox,
  TreeContainer,
  TreeNode,
  Tabs,
  Dropdown,
  Input,
  Button,
  Divider,
} from '@learnway/ui';
import { SectionLayout } from '../../-components/section-layout';
import { FormSubTitle } from '../../../../../../../bo/src/shared/ui/form';

/* style */
import searchStyles from '@learnway/styles/bo/assets/styles/modules/search-box.module.css'; // search-box.module.css

const CompanyGroupConfirmComponent: FC<{}> = ({}) => {
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
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const options = [
    { value: 'option1', label: '전체' },
    { value: 'option2', label: '옵션 2' },
    { value: 'option3', label: '옵션 3' },
  ];
  const tabsItems = [
    {
      title: '조직',
      key: 'tab01',
      content: (
        <div>
          <div className={cn(searchStyles.start, searchStyles.wrap)}>
            <div className={searchStyles.contents}>
              <div className={searchStyles.item_row}>
                <div className={searchStyles.item_wrap}>
                  <div className={searchStyles.inner}>
                    <div className={searchStyles.item}>
                      <label htmlFor="name-select1" className={searchStyles.label}>
                        <span className={searchStyles.text}>조직 등록 유형</span>
                      </label>
                      <div className={searchStyles.box}>
                        <Dropdown
                          options={options}
                          value={selectedValues}
                          onChange={(selected) => setSelectedValues(selected)}
                          variant="default"
                          size={'sm'}
                          presetOptionLabel={'전체'}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={searchStyles.inner}>
                    <div className={searchStyles.item}>
                      <label htmlFor="name-select2" className={searchStyles.label}>
                        <span className={searchStyles.text}>조직명</span>
                      </label>
                      <div className={searchStyles.box}>
                        <Input type={'text'} placeholder={'입력'} value={''} />
                      </div>
                    </div>
                  </div>
                  <div className={searchStyles.inner}>
                    <div className={searchStyles.item}>
                      <label htmlFor="name-select3" className={searchStyles.label}>
                        <span className={searchStyles.text}>조직장 이름</span>
                      </label>
                      <div className={searchStyles.box}>
                        <Input id={'name-select3'} type={'text'} placeholder={'입력'} value={''} />
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
        </div>
      ),
    },
    {
      title: '유저',
      key: 'tab02',
      content: '222',
    },
  ];
  return (
    <SectionLayout contentsRatio={'forty'}>
      <TreeContainer>
        <TreeBox data={sampleData} treeId={'menu-tree'} title={'조직-원본'} />
      </TreeContainer>
      <div>
        <FormSubTitle
          label={'조직 대상자'}
          titleNode={<p>{'현대자동차 > 경영지원본부'}</p>}
          lineType={'dark'}
        />
        <Tabs items={tabsItems} type="line" size={'sm'} selectedTabKey={'tab01'} />
      </div>
    </SectionLayout>
  );
};

CompanyGroupConfirmComponent.displayName = 'CompanyGroupConfirm';
export const CompanyGroupConfirm = CompanyGroupConfirmComponent;
