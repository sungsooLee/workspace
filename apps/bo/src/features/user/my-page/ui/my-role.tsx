import {
  CODE_GROUP,
  compactValues,
  SearchBoxConfig,
  useCurrentRoute,
  useSearchBox,
} from '@learnway/hooks';
import { Button, GridBox, useGridBox, useModal } from '@learnway/ui';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { SearchBox } from '../../../../shared/ui/search-box';
import { MyRoleExtendModal } from './my-role-extend-modal';
import { Link } from '@tanstack/react-router';
import { roleManagerQueryOptions } from '@entities/role/service/role-manage.queries';

const MyRoleComponent = () => {
  const { state } = useCurrentRoute();

  const { provider: sProvider, getValues, onFormChange, onFormValid } = useSearchBox(searchConfig);
  const { config: gConfig, gridFetch } = useGridBox(gridConfig, getValues);
  const { open: openModal } = useModal();
  const [selectedRow, setSelectedRow] = useState<any | null>(null);

  function handleOnSearch(query: Record<string, any>) {
    gridFetch(compactValues(query));
  }

  useEffect(() => {
    const init = async (state: any) => {
      if (state) {
        onFormChange(state);
        if (await onFormValid()) {
          handleOnSearch(getValues());
        }
      }
    };
    init(state);
  }, [state]);

  const handleExtend = () => {
    openModal({
      content: <MyRoleExtendModal data={selectedRow} type="request" />,
      width: 'md',
    });
  };

  return (
    <div>
      <SearchBox provider={sProvider} onSearch={handleOnSearch} />
      <GridBox
        title={t('HRD 담당자 역할 목록')}
        hideRowSelectionRadioBox={false}
        onRowSelect={(row: any) => {
          console.log('row::', row);
          setSelectedRow(row);
        }}
        config={gConfig}
        customButtonNode={
          <Button disabled={!selectedRow} variant="save" size="md" onClick={handleExtend}>
            권한기간 연장 신청
          </Button>
        }
      />
    </div>
  );
};

export const MyRole = MyRoleComponent;

const searchConfig = {
  builders: [
    [
      {
        name: 'roleId',
        type: 'dropdown',
        label: t('HRD 담당자 역할'),
        value: '',
        presetOptionLabel: t('LABEL.form.label.all'),
        optionsConfig: {
          codeGroup: CODE_GROUP['manual.bo.role.roidId'],
        },
      },
      {
        name: 'tenantId',
        type: 'dropdown',
        label: t('테넌트'),
        value: '',
        presetOptionLabel: t('LABEL.form.label.all'),
        optionsConfig: {
          codeGroup: CODE_GROUP['manual.tenant.tenantId'],
        },
      },
      {
        name: 'channelId',
        type: 'dropdown',
        label: t('채널'),
        value: '',
        options: [
          { value: '', label: t('전체') },
          { value: 'channelA', label: t('채널1번') },
          { value: 'channelB', label: t('채널2번') },
        ],
      },
    ],
    [
      {
        name: 'useYn',
        type: 'dropdown',
        label: t('사용여부'),
        value: '',
        options: [
          { value: '', label: t('전체') },
          { value: 'channelA', label: t('Y') },
          { value: 'channelB', label: t('N') },
        ],
      },
      {
        name: 'expYn',
        type: 'dropdown',
        label: t('만료여부'),
        value: '',
        options: [
          { value: '', label: t('전체') },
          { value: 'video', label: t('Y') },
          { value: 'ebook', label: t('N') },
        ],
      },
      {
        name: 'status',
        type: 'dropdown',
        label: t('신청 상태'),
        value: '',
        presetOptionLabel: t('LABEL.form.label.all'),
        optionsConfig: {
          codeGroup: CODE_GROUP['pms.role.RoleApplicationStatus'],
        },
      },
    ],
  ],
};

const gridConfig = {
  query: roleManagerQueryOptions.getRoleApplicationList,
  pagination: {
    pageIndex: 0,
    pageSize: 20,
    totalRows: 0,
  },
  columns: [
    {
      name: 'roleName',
      label: 'HRD 담당자 역할',
      render: (info: any) => (
        <Link
          className="link"
          to={'/my-page/role/detail'}
          state={{ roleId: info.row.original.roleId }}
        >
          {info.row.original.roleName}
        </Link>
      ),
    },
    {
      name: 'tenant',
      label: '테넌트',
    },
    { name: 'channel', label: t('채널') },
    // { name: 'isUsed', label: t('사용여부') },
    { name: 'rolePeriod', label: t('권한기간') },
    { name: 'expired', label: t('만료 여부') },
    { name: 'statusName', label: t('신청 상태') },
  ],
  data: [],
  // data: [
  //   {
  //     roleApplicationId: 1,
  //     roleId: 1,
  //     roleName: '테넌트 관리자',
  //     tenant: '1번테넌트',
  //     channel: '1번채널',
  //     isUsed: 'Y',
  //     rolePeriod: '2020-05-01 ~ 2020-06-01',
  //     expired: 'N',
  //     statusName: '신청',
  //   },
  //   {
  //     roleApplicationId: 2,
  //     roleId: 2,
  //     roleName: '테넌트 관리자',
  //     tenant: '2번테넌트',
  //     channel: '2번채널',
  //     isUsed: 'N',
  //     rolePeriod: '2020-05-01 ~ 2020-06-01',
  //     expired: 'Y',
  //     statusName: '만료',
  //   },
  // ],
};
