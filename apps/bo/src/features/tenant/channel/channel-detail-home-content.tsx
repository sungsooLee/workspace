import { useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { t } from 'i18next';
import { FormSubTitle, FormRow } from '@shared/ui';
import { Button, TableBox, ContentsRow, RadioGroupFormField } from '@learnway/ui';
import { createColumnHelper, ColumnDef } from '@tanstack/react-table';
import { IcoPlus, IcoMinus } from '@learnway/icons';
import { DynamicFormConfig, useDynamicForm } from '@learnway/hooks';

import styles from './channel-detail-base.module.css';

interface ChannelDetailHomeContentProps {
  /** Title */
  title: string;
  /** Table Title */
  tableTitle: string;
  /** 설정 방식 사용 여부 */
  useSetting?: boolean;
  /** 최대 설정 개수 */
  max: number;
}

enum SettingTypes {
  CUSTOM = 'custom',
  RECENT = 'recent',
  VIEW = 'view',
}

const ChannelDetailHomeContentComponent = ({
  title,
  tableTitle,
  useSetting = true,
  max,
}: ChannelDetailHomeContentProps) => {
  const formConfig: DynamicFormConfig = {
    builders: [
      {
        name: 'settings',
        type: 'radio-group',
        label: t('설정 방식'),
        value: SettingTypes.CUSTOM,
        options: [
          { value: SettingTypes.VIEW, label: '조회수 높은 순' },
          { value: SettingTypes.RECENT, label: '최신 등록 순' },
          { value: SettingTypes.CUSTOM, label: '직접 설정' },
        ],
      },
    ],
  };

  const { provider, control } = useDynamicForm(formConfig);
  const watchSetting = useWatch({
    control: control,
    name: ['settings'],
  });
  const [setting, setSetting] = useState<string>(SettingTypes.CUSTOM);
  const [setted, setSetted] = useState(sampleTableData);

  useEffect(() => {
    const selectedSetting: string = watchSetting[0];
    if (selectedSetting !== setting) {
      setSetting(selectedSetting);
      if (selectedSetting === SettingTypes.CUSTOM) {
        // TODO. 설정 비활성화
      }
    }
  }, [watchSetting]);
  return (
    <>
      <FormSubTitle label={title} />
      {useSetting && (
        <ContentsRow>
          <FormRow provider={provider} name={'settings'} element={<RadioGroupFormField />} />
        </ContentsRow>
      )}

      <div className={styles.table_wrap}>
        <TableBox
          data={sampleTableData}
          columns={columns}
          tableMode={true}
          title={tableTitle}
          multiple
          customButtonNode={
            <>
              <Button
                variant="text"
                size="sm"
                //onClick={handleAddMode}
                disabled={setted.length === max}
              >
                <IcoPlus width={16} height={16} stroke="#131C30" />
                {t('LABEL.button.add')}
              </Button>
              <Button
                variant="text"
                size="sm"
                //onClick={handleAddMode}
                disabled={setted.length === 0}
              >
                <IcoMinus width={16} height={16} stroke="#131C30" />
                {t('LABEL.button.delete')}
              </Button>
            </>
          }
        />
      </div>
    </>
  );
};

export const ChannelDetailHomeContent = ChannelDetailHomeContentComponent;

const columnHelper = createColumnHelper<any>();

const columns = [
  columnHelper.accessor('thumbnail', {
    cell: (info) => {
      const url: string = info.row.original.thumbnail;
      return <img src={url} width={53} alt="" />;
    },
    header: '썸네일',
    enableGrouping: false,
    meta: {
      align: 'center',
    },
  }),
  columnHelper.accessor('type', {
    cell: (info) => info.getValue(),
    header: '과정 유형',
    enableGrouping: false,
    meta: {
      align: 'center',
    },
  }),
  columnHelper.accessor('courseName', {
    cell: (info) => info.getValue(),
    header: '과정명',
    enableGrouping: false,
    meta: {
      align: 'center',
    },
  }),
  columnHelper.accessor('order', {
    cell: (info) => info.getValue(),
    header: '차수',
    enableGrouping: false,
    meta: {
      align: 'center',
    },
  }),
  columnHelper.accessor('rank', {
    cell: (info) => info.getValue(),
    header: '별점',
    enableGrouping: false,
    meta: {
      align: 'center',
    },
  }),
  columnHelper.accessor('like', {
    cell: (info) => info.getValue(),
    header: '찜',
    enableGrouping: false,
    meta: {
      align: 'center',
    },
  }),
  columnHelper.accessor('view', {
    cell: (info) => info.getValue(),
    header: '조회수',
    enableGrouping: false,
    meta: {
      align: 'center',
    },
  }),
  columnHelper.accessor('registerName', {
    cell: (info) => info.getValue(),
    header: '등록자',
    meta: {
      align: 'center',
    },
  }),
  columnHelper.accessor('registerDate', {
    cell: (info) => info.getValue(),
    header: '등록일',
    meta: {
      align: 'center',
    },
  }),
] as ColumnDef<any, unknown>[];

const sampleTableData = [
  {
    thumbnail:
      'https://i.ytimg.com/vi/Y5xRjPxB-d0/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLAkMZUrfYsLtw_LcuZ_B6BJCdoHGA',
    type: '이러닝',
    courseName: '스마트 제조를 위한 스마트 공장 구축 및 추진 실무',
    order: '2',
    rank: '4.2',
    like: '100',
    view: '100',
    registerName: '김현대',
    registerDate: '2025-05-06 15:10:15',
  },
  {
    thumbnail:
      'https://i.ytimg.com/vi/Y5xRjPxB-d0/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLAkMZUrfYsLtw_LcuZ_B6BJCdoHGA',
    type: '이러닝',
    courseName: '스마트 제조를 위한 스마트 공장 구축 및 추진 실무',
    order: '2',
    rank: '4.2',
    like: '100',
    view: '100',
    registerName: '김현대',
    registerDate: '2025-05-06 15:10:15',
  },
];
