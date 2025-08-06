import { queryOptions as channelQueryOptions, useGetChannelPopup } from '@entities/channel';
import { queryOptions as courseSharedQueryOptions } from '@entities/course-shared/service/course-shared.queries';
import { useFetchAuthUser } from '@learnway/auth/entities';
import { AuthUser } from '@learnway/auth/types';
import { SearchBoxConfig, useSearchBox } from '@learnway/hooks';
import { Button } from '@learnway/ui/button';
import { Divider } from '@learnway/ui/elements';
import { useGridBoxConfig } from '@learnway/ui/grid';
import { ModalBody, ModalContainer, ModalFooter, ModalTitle, useModal } from '@learnway/ui/modal';
import { ShuttleGridToGrid, ShuttleGridToGridImperative } from '@learnway/ui/shuttle-grid-to-grid';
import { TenantByRoleDropdownFormField } from '@shared/ui/form';
import { SearchBox } from '@shared/ui/search-box';
import { useQueryClient } from '@tanstack/react-query';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { t } from 'i18next';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useWatch } from 'react-hook-form';

/**
 * 과정 공유 팝업
 * @returns
 */
export interface CourseShareModalComponentProps {
  courseShareId: number;
}

const gridConfig: useGridBoxConfig = {
  query: courseSharedQueryOptions.history,
  columns: [],
  data: [],
  gridState: {
    page: 0,
    size: 50,
    sort: [],
  },
};

const CourseShareModalComponent = () => {
  const { closeModal, alert, confirm: openConfirm } = useModal();
  const ref = useRef<ShuttleGridToGridImperative>(null);
  const [option, setOption] = useState<any>();
  const [gridData, setGridData] = useState<any[]>([]);
  const { data: channel } = useGetChannelPopup();
  const { data: authUser } = useFetchAuthUser<AuthUser>();
  const queryClient = useQueryClient();

  const searchConfig: SearchBoxConfig = {
    builders: [
      [
        {
          name: 'tenantId',
          type: 'custom',
          label: t('LABEL.form.label.tenant', '테넌트'),
          value: '',
          format: 'object',
          element: <TenantByRoleDropdownFormField />,
        },
        {
          name: 'channelUuid',
          type: 'dropdown',
          label: t('LABEL.form.label.channel', '채널'),
          presetOptionLabel: t('LABEL.form.label.select', '선택'),
          value: '',
          format: 'object',
          options: [],
        },
        {
          name: 'channelOwnerId',
          type: 'text',
          label: t('채널 소유자'),
          value: '',
        },
        {
          name: 'isUsed',
          type: 'dropdown',
          label: t('사용여부'),
          value: '',
          options: [
            { value: '', label: t('전체') },
            { value: 'true', label: t('사용') },
            { value: 'false', label: t('미사용') },
          ],
        },
      ],
    ],
    validator: {},
  };

  const columnHelper = createColumnHelper<any>();
  const columns = [
    columnHelper.accessor('tenantName', {
      header: t('테넌트'),
      size: 132,
      cell: (info: any) => {
        console.log('info.row.original.tenantList=>', info.row.original.tenantList);
        const tenant = info.row.original.tenantList.find((x: any) => x.tenantId === tenantIdWatch);
        return tenant.tenantName || '';
      },
    }),
    columnHelper.accessor('channelName', {
      header: t('채널'),
      size: 132,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('channelOwnerId', {
      header: t('채널 소유자'),
      size: 132,
      cell: (info: any) => info.getValue(),
    }),
    columnHelper.accessor('isUsed', {
      header: t('사용여부'),
      size: 132,
      cell: (info) => (info.getValue() ? t('사용') : t('미사용')),
    }),
  ] as ColumnDef<any, unknown>[];

  const { provider: sProvider, setValue, setOptions } = useSearchBox(searchConfig);
  const tenantIdWatch = useWatch({ control: sProvider.control, name: 'tenantId' });

  const channelOptions = useMemo(() => {
    if (!channel) return;
    return channel.content
      .filter((x: any) => x.tenantList?.some((y: any) => y.tenantId === tenantIdWatch))
      .map((x: any) => ({
        label: x.channelName,
        value: x.channelUuid,
      }));
  }, [channel, tenantIdWatch]);

  useEffect(() => {
    setValue('channelUuid', '');
    setOptions('channelUuid', channelOptions);
  }, [channelOptions]);

  const handleOnSearch = async (data: any) => {
    const roleId = authUser?.activeRole?.roleId.toString();
    if (!roleId) return;
    const response = await queryClient.fetchQuery(channelQueryOptions.list(roleId, data));
    setGridData(response.content);
  };

  const handleOnConfirm = async () => {
    const confirmRes = await openConfirm({
      title: t('과정을 공유하시겠습니까?'),
      content: t('공유한 과정은 이력확인이 불가능합니다.'),
    });
    if (!confirmRes) return;
    closeModal(option);
  };

  return (
    <ModalContainer className="h-[740]">
      <ModalTitle>{t('공유')}</ModalTitle>
      <ModalBody>
        <SearchBox provider={sProvider} onSearch={handleOnSearch} />
        <Divider />
        <ShuttleGridToGrid
          ref={ref}
          onSelectedChange={(data: any) => {
            setOption(data);
          }}
          showNumberingColumn={false}
          gridData={gridData}
          columns={columns}
          rowKey={'channelUuid'}
          leftTitle={t('채널 목록')}
          rightTitle={t('채널 선택')}
        />
      </ModalBody>
      <ModalFooter>
        <Button label={t('취소')} variant={'gray'} size={'lg'} onClick={closeModal} />
        <Button
          type={'button'}
          label={t('확인')}
          variant={'primary'}
          size={'lg'}
          onClick={handleOnConfirm}
        />
      </ModalFooter>
    </ModalContainer>
  );
};

export const CourseShareModal = CourseShareModalComponent;
