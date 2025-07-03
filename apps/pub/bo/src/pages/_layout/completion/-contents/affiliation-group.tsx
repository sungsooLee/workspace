/* eslint-disable @nx/enforce-module-boundaries */
import { FC } from 'react';
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

  const data2: any[] = [
    {
      title1: '현대자동차',
      title2: '본부명',
      title3: '부서',
      title4: 'h10100000000',
      title5: '현 교육본부',
    },
    {
      title1: '현대자동차',
      title2: '본부명',
      title3: '부서',
      title4: 'h10100000000',
      title5: '현 교육본부',
    },
  ];

  const columns2 = [
    columnHelper.accessor('title1', {
      cell: (info) => info.getValue(),
      header: '회사',
      size: 96,
    }),
    columnHelper.accessor('title2', {
      cell: (info) => info.getValue(),
      header: '본부명',
      size: 160,
    }),
    columnHelper.accessor('title3', {
      cell: (info) => info.getValue(),
      header: '부서',
      size: 160,
    }),
    columnHelper.accessor('title4', {
      cell: (info) => info.getValue(),
      header: '부서코드',
      meta: {
        size: 'auto',
      },
    }),
    columnHelper.accessor('title5', {
      cell: (info) => info.getValue(),
      header: '현 교육본부',
      meta: {
        size: 'auto',
      },
    }),
  ] as ColumnDef<any, unknown>[];

  const data3: any[] = [
    {
      title1: '현대자동차',
      title2: '본부명',
      title3: '부서',
      title4: 'h10100000000',
      title5: <Button variant={'gray'} size={'xs'} label={'제거'} />,
    },
    {
      title1: '현대자동차',
      title2: '본부명',
      title3: '부서',
      title4: 'h10100000000',
      title5: <Button variant={'gray'} size={'xs'} label={'제거'} />,
    },
  ];

  const columns3 = [
    columnHelper.accessor('title1', {
      cell: (info) => info.getValue(),
      header: '회사',
      size: 96,
    }),
    columnHelper.accessor('title2', {
      cell: (info) => info.getValue(),
      header: '본부명',
      size: 160,
    }),
    columnHelper.accessor('title3', {
      cell: (info) => info.getValue(),
      header: '부서',
      size: 160,
    }),
    columnHelper.accessor('title4', {
      cell: (info) => info.getValue(),
      header: '부서코드',
      meta: {
        size: 'auto',
      },
    }),
    columnHelper.accessor('title5', {
      cell: (info) => info.getValue(),
      header: '기능',
      size: 80,
      meta: {
        cellAlign: 'center',
      },
    }),
  ] as ColumnDef<any, unknown>[];

  const data4: any[] = [
    {
      title1: '현대자동차',
      title2: '상용사업운영팀',
      title3: 'h10100000000',
      title4: '19년임협실무TFT, 1고앙, 1공장배치대기, 2공장, 2공장배치대기, 3공장, 3공장 배치대기',
      title5: <Button variant={'gray'} size={'xs'} label={'제거'} />,
    },
    {
      title1: '현대자동차',
      title2: '상용사업운영팀',
      title3: 'h10100000000',
      title4: '19년임협실무TFT, 1고앙, 1공장배치대기, 2공장, 2공장배치대기, 3공장, 3공장 배치대기',
      title5: <Button variant={'gray'} size={'xs'} label={'제거'} />,
    },
  ];

  const columns4 = [
    columnHelper.accessor('title1', {
      cell: (info) => info.getValue(),
      header: '회사',
      size: 96,
    }),
    columnHelper.accessor('title2', {
      cell: (info) => info.getValue(),
      header: '부서',
      size: 200,
    }),
    columnHelper.accessor('title3', {
      cell: (info) => info.getValue(),
      header: '부서코드',
      size: 200,
    }),
    columnHelper.accessor('title4', {
      cell: (info) => info.getValue(),
      header: '품의시 재경협조처',
      meta: {
        size: 'auto',
      },
    }),
    columnHelper.accessor('title5', {
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
        title={'소속조직'}
        data={data}
        columns={columns}
        showNumberingColumn
        customButtonNode={<Button variant={'text'} size={'sm'} label={'현업팀 교육본부 변경'} />}
        showAdd
      />
      <GridBox title={'소속조직 내 제외팀'} data={data2} columns={columns2} />
      <GridBox title={'소속조직 내 추가팀'} data={data3} columns={columns3} />
      <GridBox title={'현업팀'} data={data4} columns={columns4} showNumberingColumn />
    </>
  );
};

AffiliationGroupComponent.displayName = 'AffiliationGroup';
export const AffiliationGroup = AffiliationGroupComponent;
