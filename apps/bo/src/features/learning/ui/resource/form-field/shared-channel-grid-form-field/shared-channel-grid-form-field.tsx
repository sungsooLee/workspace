import React, { forwardRef } from 'react';
import styles from './shared-channel-grid-form-field.module.css';
import { cn } from '@learnway/shared';
import { BaseFormFieldProps } from '@learnway/hooks';
import { Button, EditCheckboxCell, Grid, useModal } from '@learnway/ui';
import { useTranslation } from 'react-i18next';
import { ChannelChoiceModal } from '../../../../../shared';
import { CellContext } from '@tanstack/react-table';

interface SharedChannelGridFormFieldComponentProps extends BaseFormFieldProps<any[]> {
  onClick?: (value?: any) => void;
}

const SharedChannelGridFormFieldComponent = forwardRef<
  HTMLInputElement,
  SharedChannelGridFormFieldComponentProps
>(({ value, onChange }, ref) => {
  const { t } = useTranslation();
  const { open: openModal } = useModal();

  // 테이블 컬럼 정의
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
      cell: (info: CellContext<any, boolean>) => <EditCheckboxCell info={info} />,
    },
    {
      accessorKey: 'delete',
      header: t('삭제'),
      size: 80,
      meta: {
        cellAlign: 'center',
      },
      cell: (info: CellContext<any, string>) => (
        <Button
          label={'삭제'}
          variant={'point'}
          size={'xs'}
          onClick={() => info.table.options.meta?.removeData(info.row.index)}
        />
      ),
    },
  ];

  /**
   * 그리드 데이터 변경 핸들러
   * @param {any} newGridData - 변경된 그리드 데이터
   */
  const handleGridChange = (newGridData: any) => {
    onChange(newGridData);
  };

  /**
   * 채널 선택 모달 핸들러
   * @async
   * @returns {Promise<void>} 없음
   */
  const handleChannelModalButtonClick = async () => {
    const data = await openModal({
      content: <ChannelChoiceModal />,
    });
    const isDuplicated = value?.some((d) => d.channelId === data?.channelId);
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
    <div className={cn(styles.start, 'nlp--shared-channel-grid-form-field')} ref={ref}>
      <div className={'text-right'}>
        <span>{`${t('채널')} ${value?.length || 0}${t('개')}`}</span>
        <Button
          variant={'point'}
          size={'md'}
          label={t('채널선택')}
          onClick={handleChannelModalButtonClick}
        />
      </div>
      <Grid
        data={value}
        columns={columns}
        showTotalCount={false}
        hideColumnSettings
        onChange={handleGridChange}
      />
    </div>
  );
});

export const SharedChannelGridFormField = SharedChannelGridFormFieldComponent;
