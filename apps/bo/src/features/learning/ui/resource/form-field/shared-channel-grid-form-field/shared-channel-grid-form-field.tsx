import React, { forwardRef } from 'react';
import styles from './shared-channel-grid-form-field.module.css';
import { cn } from '@learnway/shared';
import { BaseFormFieldProps } from '@learnway/hooks';
import { Button, Grid, useModal } from '@learnway/ui';
import { useTranslation } from 'react-i18next';
import { ChannelChoiceModal } from '../../../../../shared';

interface SharedChannelGridFormFieldComponentProps extends BaseFormFieldProps<any[]> {
  onClick?: (value?: any) => void;
}

const SharedChannelGridFormFieldComponent = forwardRef<
  HTMLInputElement,
  SharedChannelGridFormFieldComponentProps
>(({ onClick, value, onChange, ...props }, ref) => {
  const { t } = useTranslation();
  const { open: openModal } = useModal();

  const columns = [
    { header: t('테넌트'), accessorKey: 'tenantName' },
    { header: t('채널'), accessorKey: 'channelName' },
    {
      header: t('원본 다운로드'),
      accessorKey: 'checked',
      size: 100,
      meta: {
        cellAlign: 'center',
      },
      cell: ({ row }: any) => (
        <input
          type="checkbox"
          checked={row.original.checked}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            handleGridCellDownloadCheckChange(row.original, event.target.checked);
          }}
        />
      ),
    },
    {
      accessorKey: 'delete',
      header: t('삭제'),
      size: 80,
      meta: {
        cellAlign: 'center',
      },
      cell: ({ row }: any) => (
        <Button
          label={'삭제'}
          variant={'gray2'}
          size={'xs'}
          onClick={() => {
            handleGridCellDeleteButtonClick(row.original);
          }}
        />
      ),
    },
  ];

  const handleGridCellDownloadCheckChange = (selectedRow: any, checked: boolean) => {
    const newValue = value?.map((d: any) => (d.id === selectedRow.id ? { ...d, checked } : d));
    onChange(newValue);
  };

  const handleGridCellDeleteButtonClick = (selectedRow: any) => {
    const newValue = value?.filter((d: any) => d.id !== selectedRow.id);
    onChange(newValue);
  };

  const handleChannelModalButtonClick = async () => {
    const data = await openModal({
      content: <ChannelChoiceModal />,
    });
    const isDuplicated = !!value?.find((d) => d.channelId === data?.channelId);
    if (data && !isDuplicated) {
      const newItem = {
        tenantId: 'tenantId1', // TODO: ChannelChoiceModal 에서 내려받은 내용
        tenantName: 'tenantName1', // TODO: ChannelChoiceModal 에서 내려받은 내용
        channelId: data.channelId,
        channelName: data.channelName,
        checked: false,
      };
      onChange?.([...value, newItem]);
    }
  };

  return (
    <div className={cn(styles.start, 'nlp--shared-channel-grid-form-field')}>
      <div className={'text-right'}>
        <span>{`${t('채널')} ${value?.length || 0}${t('개')}`}</span>
        <Button
          variant={'point'}
          size={'md'}
          label={t('채널선택')}
          onClick={handleChannelModalButtonClick}
        />
      </div>
      <Grid data={value} columns={columns} showTotalCount={false} hideColumnSettings />
    </div>
  );
});

export const SharedChannelGridFormField = SharedChannelGridFormFieldComponent;
