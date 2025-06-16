/* eslint-disable react/jsx-no-useless-fragment */
import { FC } from 'react';
// import { cn } from '@learnway/shared';
import { Button, GridBox } from '@learnway/ui';
import { NoticeBox } from '../../../../../../../bo/src/shared/ui';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

const AffiliationGroupComponent: FC<{}> = ({}) => {
  const columnHelper = createColumnHelper<any>();

  const data: any[] = [
    {
      title1: '현대자동차',
      title2: '원효로서비스센터',
      title3: <Button variant={'gray'} size={'xs'} label={'제거'} />,
    },
    {
      title1: '현대자동차',
      title2: '원효로서비스센터',
      title3: <Button variant={'gray'} size={'xs'} label={'제거'} />,
    },
    {
      title1: '현대자동차',
      title2: '원효로서비스센터',
      title3: <Button variant={'gray'} size={'xs'} label={'제거'} />,
    },
  ];

  const columns = [
    columnHelper.accessor('title1', {
      cell: (info) => info.getValue(),
      header: '회사',
      meta: {
        size: 'auto',
      },
    }),
    columnHelper.accessor('title2', {
      cell: (info) => info.getValue(),
      header: '소속 조직명',
      meta: {
        size: 'auto',
      },
    }),
    columnHelper.accessor('title3', {
      cell: (info) => info.getValue(),
      header: '기능',
      size: 80,
      meta: {
        cellAlign: 'center',
      },
    }),
  ] as ColumnDef<any, unknown>[];

  return (
    <>
      <NoticeBox
        iconVisible={false}
        type={'bullet'}
        descriptions={[
          '현업팀을 추가하면 해당 현업팀의 HRD운영관리를 할 수 있습니다.',
          '현업팀의 품의시 재경협조처를 별도 지정하지 않은 경우, 본부의 재경협조처가 자동 설정됩니다.',
          '소속 조직을 선택하면 하위 조직이 모두 현업팀으로 선택 됩니다.',
        ]}
      />
      <GridBox
        title={'목록'}
        data={data}
        columns={columns}
        showNumberingColumn
        customButtonNode={<Button variant={'text'} size={'sm'} label={'현업팀 교육본부 변경'} />}
        showAdd
      />
    </>
  );
};

AffiliationGroupComponent.displayName = 'AffiliationGroup';
export const AffiliationGroup = AffiliationGroupComponent;
