/* eslint-disable @nx/enforce-module-boundaries */
import { createFileRoute } from '@tanstack/react-router';
import { PageContainer } from '../../../widgets/layout/ui/container/page-container';
import { SectionLayout } from '../-components/section-layout';
import {
  TreeBox,
  TreeNode,
  Button,
  TableBox,
  Input,
  Switch,
  Checkbox,
  TreeContainer,
  SplitPanel,
} from '@learnway/ui';
import { MainContents } from '../../../../../../bo/src/widgets/layout/ui/container/slot/main-contents';
import { FormSubTitle } from '../../../../../../bo/src/shared/ui/form';
import { IcoMinus, IcoPlus } from '@learnway/icons';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

export const Route = createFileRoute('/_layout/completion/detail-calculation-reason')({
  component: RouteComponent,
});

function RouteComponent() {
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
  const columnHelper = createColumnHelper<any>();
  // thead : 'value'
  const data: any[] = [
    {
      title1: '식비',
      title2: (
        <div className="flex w-full">
          <Input type={'text'} placeholder={'입력'} value={''} className="flex-1" />
          <Button
            onlyIcon
            icon={<IcoPlus width={16} height={16} stroke={'#4C515E'} />}
            className="ml-[8px] flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-[4px] border border-solid border-[var(--gray4)]"
          />
          <Button
            onlyIcon
            icon={<IcoMinus width={16} height={16} stroke={'#4C515E'} />}
            className="ml-[8px] flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-[4px] border border-solid border-[var(--gray4)]"
          />
        </div>
      ),
      title3: <Checkbox />,
      title4: <Input suffixText={'원'} placeholder={'입력'} type={'number'} />,
      title5: <Switch />,
    },
  ];

  // Thead 정의
  const columns = [
    columnHelper.accessor('title1', {
      cell: (info) => info.getValue(),
      header: '세부산출근거',
      size: 200,
      meta: {
        headerAlign: 'center',
      },
    }),
    columnHelper.accessor('title2', {
      cell: (info) => info.getValue(),
      header: '세부 항목',
      meta: {
        headerAlign: 'center',
        cellAlign: 'center',
        size: 'auto',
      },
    }),
    columnHelper.accessor('title3', {
      cell: (info) => info.getValue(),
      header: '단가 지정',
      size: 80,
      meta: {
        headerAlign: 'center',
        cellAlign: 'center',
      },
    }),
    columnHelper.accessor('title4', {
      cell: (info) => info.getValue(),
      header: '단가',
      meta: {
        headerAlign: 'center',
        cellAlign: 'center',
        size: 'auto',
      },
    }),
    columnHelper.accessor('title5', {
      cell: (info) => info.getValue(),
      header: '활성화 여부',
      size: 100,
      meta: {
        headerAlign: 'center',
        cellAlign: 'center',
      },
    }),
  ] as ColumnDef<any, unknown>[];
  return (
    <PageContainer>
      <MainContents>
        <SplitPanel size={['30%', 'auto']} divider>
          <div>
            <TreeBox data={sampleData} treeId={'menu-tree'} title={'교육본부'} />
          </div>
          <div>
            <FormSubTitle
              label={'세부산출근거 단가'}
              lineType={'dark'}
              actionNode={
                <>
                  <Button
                    variant={'text'}
                    size={'sm'}
                    label={'추가'}
                    icon={<IcoPlus width={16} height={16} stroke={'#4C515E'} />}
                  />
                  <Button
                    variant={'text'}
                    size={'sm'}
                    label={'삭제'}
                    icon={<IcoMinus width={16} height={16} stroke={'#4C515E'} />}
                  />
                  <Button variant={'save'} size={'sm'} label={'저장'} />
                </>
              }
            />
            <TableBox data={data} columns={columns} tableMode={true} multiple />
          </div>
        </SplitPanel>
      </MainContents>
    </PageContainer>
  );
}
