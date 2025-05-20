import { SearchBoxConfig, useSearchBox } from '@learnway/hooks';
import { Button, GridBox, useGridBox, useModal } from '@learnway/ui';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { SearchBox } from '../../../../shared/ui/search-box';
import { MyRoleExtendModal } from './my-role-extend-modal';
import { Link } from '@tanstack/react-router';

const MyRoleComponent = () => {
  const { provider: sProvider, getValues } = useSearchBox(searchConfig);
  const { config: gConfig, gridFetch } = useGridBox(gridConfig, getValues);
  const { open: openModal } = useModal();

  const [pagination, setPagination] = useState({
    pageSize: 10,
    pageIndex: 0,
    totalRows: 20,
  });

  const [selectedRow, setSelectedRow] = useState<any | null>(null);

  /**
   * @param data
   */
  const handleOnSearch = (data: any) => {
    console.log(data);
  };

  useEffect(() => {
    gridFetch({});
  }, []);

  return (
    <div>
      <SearchBox provider={sProvider} onSearch={handleOnSearch} />
      <GridBox
        hideRowSelectionRadioBox={false}
        onRowSelect={(row: any) => {
          console.log('row::', row);
          setSelectedRow(row);
        }}
        config={gConfig}
        pagination={{
          ...pagination,
          onPageChange: (pageIndex) => {
            console.log('pageIndex :: ', pageIndex);
            setPagination((prev) => ({ ...prev, pageIndex }));
          },
          onPageSizeChange: (pageSize) => {
            console.log('pageSize :: ', pageSize);
            setPagination((prev) => ({ ...prev, pageSize }));
          },
        }}
        customButtonNode={
          <Button
            variant="save"
            size="md"
            onClick={() => {
              openModal({
                content: <MyRoleExtendModal />,
                width: 'md',
              });
            }}
          >
            권한기간 연장 신청
          </Button>
        }
      />
    </div>
  );
};

export const MyRole = MyRoleComponent;

const searchConfig: SearchBoxConfig = {
  builders: [
    [
      {
        name: 'tenant',
        type: 'dropdown',
        label: t('HRD 담당자 역할'),
        value: '',
        options: [
          { value: '', label: t('전체') },
          { value: 'tenantA', label: t('테넌트A') },
          { value: 'tenantB', label: t('테넌트B') },
          { value: 'tenantC', label: t('테넌트C') },
          { value: 'tenantD', label: t('테넌트D') },
          { value: 'tenantE', label: t('테넌트E') },
          { value: 'tenantF', label: t('테넌트F') },
        ],
      },
      {
        name: 'channel',
        type: 'dropdown',
        label: t('사용여부'),
        value: '',
        options: [
          { value: '', label: t('전체') },
          { value: 'channelA', label: t('채널A') },
          { value: 'channelB', label: t('채널B') },
          { value: 'channelC', label: t('채널C') },
          { value: 'channelD', label: t('채널D') },
          { value: 'channelE', label: t('채널E') },
          { value: 'channelF', label: t('채널F') },
        ],
      },
      {
        name: 'type',
        type: 'dropdown',
        label: t('만료여부'),
        value: '',
        options: [
          { value: '', label: t('전체') },
          { value: 'video', label: t('동영상') },
          { value: 'ebook', label: t('이북') },
          { value: 'class', label: t('클래스') },
          { value: 'web', label: t('웹') },
        ],
      },
      // {
      //   name: 'courseName',
      //   type: 'text',
      //   label: t('과정'),
      //   placeholder: t('과정명으로 조회하세요.'),
      //   value: '',
      // },
    ],
  ],
};

const gridConfig = {
  query: '',
  columns: [
    // {
    //   name: 'no1',
    //   label: 'NO.',
    //   type: 'numbering',
    // },
    {
      name: 'role',
      label: 'HRD 담당자 역할',
      render: (info: any) => (
        <Link
          className={'text-blue-600'}
          to={'/my-page/role/detail'}
          state={{ role: info.row.original.role }}
        >
          {info.row.original.role}
        </Link>
      ),
    },
    {
      name: 'tenant',
      label: '테넌트',
    },
    { name: 'channel', label: t('채널') },
    { name: 'isUsed', label: t('사용여부') },
    { name: 'rolePeriod', label: t('권한기간') },
    { name: 'expired', label: t('만료 여부') },
    { name: 'statusName', label: t('신청 상태') },
  ],
  data: [
    {
      role: '테넌트 관리자',
      tenant: '1번테넌트',
      channel: '1번채널',
      isUsed: 'Y',
      rolePeriod: '2020-05-01 ~ 2020-06-01',
      expired: 'N',
      statusName: '신청',
    },
    {
      role: '테넌트 관리자',
      tenant: '2번테넌트',
      channel: '2번채널',
      isUsed: 'N',
      rolePeriod: '2020-05-01 ~ 2020-06-01',
      expired: 'Y',
      statusName: '만료',
    },
  ],
};
