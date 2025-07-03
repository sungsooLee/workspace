/* eslint-disable react/jsx-no-useless-fragment */
import { FC, useState } from 'react';
import { Button, GridBox } from '@learnway/ui';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { NoticeBox } from '../../../../../../../bo/src/shared/ui';

const TalentDevelopmentTeamComponent: FC<{}> = ({}) => {
  const columnHelper = createColumnHelper<any>();

  const data: any[] = [
    {
      title1: '현대자동차',
      title2: '부서',
      title3: 'YJQ1-1',
    },
    {
      title1: '현대자동차',
      title2: '부서',
      title3: 'YJQ1-1',
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
      header: '부서',
      meta: {
        size: 'auto',
      },
    }),
    columnHelper.accessor('title3', {
      cell: (info) => info.getValue(),
      header: '코스터 센터',
      meta: {
        size: 'auto',
      },
    }),
  ] as ColumnDef<any, unknown>[];

  const data2: any[] = [
    {
      title1: '현대자동차',
      title2: '본부',
      title3: '부서',
      title4: '홍길동',
      title5: '호칭',
      title6: 'YYYY-MM_DD - YYYY-MM_DD',
      title7: <Button variant={'gray'} size={'xs'} label={'변경'} />,
    },
    {
      title1: '현대자동차',
      title2: '본부',
      title3: '부서',
      title4: '홍길동',
      title5: '호칭',
      title6: 'YYYY-MM_DD - YYYY-MM_DD',
      title7: <Button variant={'gray'} size={'xs'} label={'변경'} />,
    },
    {
      title1: '현대자동차',
      title2: '본부',
      title3: '부서',
      title4: '홍길동',
      title5: '호칭',
      title6: 'YYYY-MM_DD - YYYY-MM_DD',
      title7: <Button variant={'gray'} size={'xs'} label={'변경'} />,
    },
    {
      title1: '현대자동차',
      title2: '본부',
      title3: '부서',
      title4: '홍길동',
      title5: '호칭',
      title6: 'YYYY-MM_DD - YYYY-MM_DD',
      title7: <Button variant={'gray'} size={'xs'} label={'변경'} />,
    },
    {
      title1: '현대자동차',
      title2: '본부',
      title3: '부서',
      title4: '홍길동',
      title5: '호칭',
      title6: 'YYYY-MM_DD - YYYY-MM_DD',
      title7: <Button variant={'gray'} size={'xs'} label={'변경'} />,
    },
  ];

  const columns2 = [
    columnHelper.accessor('title1', {
      cell: (info) => info.getValue(),
      header: '회사',
      meta: {
        size: 'auto',
      },
    }),
    columnHelper.accessor('title2', {
      cell: (info) => info.getValue(),
      header: '본부',
      meta: {
        size: 'auto',
      },
    }),
    columnHelper.accessor('title3', {
      cell: (info) => info.getValue(),
      header: '부서',
      meta: {
        size: 'auto',
      },
    }),
    columnHelper.accessor('title4', {
      cell: (info) => info.getValue(),
      header: '성명',
      meta: {
        size: 'auto',
      },
    }),
    columnHelper.accessor('title5', {
      cell: (info) => info.getValue(),
      header: '호칭',
      meta: {
        size: 'auto',
      },
    }),
    columnHelper.accessor('title6', {
      cell: (info) => info.getValue(),
      header: '기간',
      size: 220,
    }),
    columnHelper.accessor('title7', {
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
          '본부담당자는 해당 인재개발주무팀과 하위 현업팀의 HRD운영관리를 할 수 있습니다.',
        ]}
      />
      <GridBox
        title={'인재개발주무팀'}
        data={data}
        columns={columns}
        multiple={true}
        showAdd={true}
        showRemove={true}
      />
      <GridBox
        title={'본부담당자'}
        data={data2}
        columns={columns2}
        multiple={true}
        showAdd={true}
        showRemove={true}
      />
    </>
  );
};

TalentDevelopmentTeamComponent.displayName = 'TalentDevelopmentTeam';
export const TalentDevelopmentTeam = TalentDevelopmentTeamComponent;
