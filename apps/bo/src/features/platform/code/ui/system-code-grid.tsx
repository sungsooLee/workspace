import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ContentsRow,
  Divider,
  DynamicFormField,
  GridBox,
  GridImperative,
  Input,
  SplitPanel,
  Textarea,
} from '@learnway/ui';
import { t } from 'i18next';
import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css'; // 화면 내 컨텐츠 레이아웃 css
import { cn, getRowSelectionByList } from '@learnway/shared';
import { createColumnHelper, Table } from '@tanstack/react-table';
import { useSystemCodeDetail } from '../../../../entities/common-code/service/system-code.hook';
import { FormRow, FormSubTitle } from '../../../../shared/ui';
import { DynamicFormConfig, useDynamicForm } from '@learnway/hooks';

const columnHelper = createColumnHelper<any>();
const listGridColumns = [
  // return [
  columnHelper.accessor('enumNames', {
    cell: ({ getValue }) => getValue(),
    header: t('LABEL.cdGroupId'),
    size: 280,
  }),
];
// };

const detailGridColumns = () => {
  return [
    columnHelper.accessor('cdId', {
      cell: ({ getValue }) => getValue(),
      header: t('LABEL.cdId'),
      size: 150,
    }),
    columnHelper.accessor('cdName', {
      cell: ({ getValue }) => getValue(),
      header: t('LABEL.cdName'),
      size: 150,
    }),
    columnHelper.accessor('cdContent', {
      cell: ({ getValue }) => getValue(),
      header: t('LABEL.content', { type: t('LABEL.cdId') }),
      size: 250,
    }),
    // columnHelper.accessor('multilingualKey', {
    //   cell: ({ getValue }) => getValue(),
    //   header: t('LABEL.multilingualKey'),
    //   size: 280,
    // }),
  ];
};

const SystemCodeGridComponent = ({ data }: any) => {
  const listGridRef = useRef<GridImperative>(null);
  const detailGridRef = useRef<GridImperative>(null);
  const [detailGridInstance, setDetailGridInstance] = useState<Table<any>>();
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [selectedDetailRow, setSelectedDetailRow] = useState<any>(null);
  const [formattedDetailData, setFormattedDetailData] = useState<any>([]);
  const [tableInstance, setTableInstance] = useState<Table<any>>();
  const { data: detailData } = useSystemCodeDetail(selectedRow?.enumNames);

  const { provider, fetchData } = useDynamicForm(formConfig);

  const handleRowSelect = (row: any) => {
    setSelectedDetailRow(null);
    setSelectedRow(row);
    detailGridRef?.current?.resetRowSelection();
  };

  const handleDetailRowSelect = (row: any) => {
    setSelectedDetailRow(row);
  };

  useEffect(() => {
    if (selectedDetailRow) {
      const referenceVal = selectedDetailRow?.referenceVal1
        ? JSON.stringify(selectedDetailRow.referenceVal1, null, 2)
        : '';
      fetchData({ ...selectedDetailRow, referenceVal1: referenceVal });
    } else fetchData({});
  }, [selectedDetailRow]);

  const selectFirstRow = useCallback(() => {
    if (data && data.length > 0) {
      const firstRow = data[0];

      listGridRef.current?.selectRowById('enumNames', firstRow.enumNames);

      setSelectedDetailRow(null);
      setSelectedRow(firstRow);
      detailGridRef?.current?.resetRowSelection();
    }
  }, [data]);

  useEffect(() => {
    fetchData({});
    if (data && data.length > 0) {
      const timeoutId = setTimeout(selectFirstRow, 100);
      return () => clearTimeout(timeoutId);
    } else {
      setFormattedDetailData([]);
      setSelectedRow(null);
    }
  }, [data, selectFirstRow]);

  useEffect(() => {
    const data = detailData as any;
    if (data && data.length > 0) {
      const processDetailData = () => {
        const firstItem = data[0]; // 객체 선택
        if (firstItem) {
          const groupKey = Object.keys(firstItem)[0]; // 코드명
          if (groupKey && Array.isArray(firstItem[groupKey])) {
            return firstItem[groupKey];
          }
        }
        return [];
      };
      const formattedData = processDetailData();
      setFormattedDetailData(formattedData);
    } else {
      setFormattedDetailData([]);
    }
  }, [detailData]);

  return (
    <>
      <Divider />
      <SplitPanel size={['auto', '28%']} divider>
        <SplitPanel size={['36%', 'auto']} gap={32}>
          <GridBox
            ref={listGridRef}
            data={data}
            columns={listGridColumns}
            onRowSelect={handleRowSelect}
            showNumberingColumn={true}
            clientSideSorting={true}
            title={t('LABEL.list', { type: t('LABEL.systemCommonCdGroup') })}
            onTableInstanceChange={(table: Table<any>) => setTableInstance(table)}
          />
          <GridBox
            key={selectedRow?.enumNames}
            ref={detailGridRef}
            data={formattedDetailData}
            columns={detailGridColumns()}
            showNumberingColumn={true}
            onRowSelect={handleDetailRowSelect}
            clientSideSorting={true}
            title={t('LABEL.list', { type: t('LABEL.systemCommonCd') })}
            onTableInstanceChange={(table: Table<any>) => setDetailGridInstance(table)}
          />
        </SplitPanel>
        <form>
          <FormSubTitle
            label={t('LABEL.info', { type: t('LABEL.systemCommonCd') })}
            lineType={'dark'}
          />
          <div className={layoutStyles.inner_contents}>
            <ContentsRow>
              <FormRow
                provider={provider}
                name={'cdGroupId'}
                element={<Input disabled={true} hiddenPlaceholder />}
              />
            </ContentsRow>
            <ContentsRow>
              <FormRow
                provider={provider}
                name={'cdId'}
                element={<Input disabled={true} hiddenPlaceholder />}
              />
            </ContentsRow>
            <ContentsRow>
              <FormRow
                provider={provider}
                name={'cdName'}
                element={<Input disabled={true} hiddenPlaceholder />}
              />
            </ContentsRow>
            <ContentsRow>
              <FormRow
                provider={provider}
                name={'cdContent'}
                element={<Input disabled={true} hiddenPlaceholder />}
              />
            </ContentsRow>
            <ContentsRow>
              <FormRow
                provider={provider}
                name={'multilingualKey'}
                element={<Input disabled={true} hiddenPlaceholder />}
              />
            </ContentsRow>
            <ContentsRow>
              <FormRow
                provider={provider}
                name={'referenceVal1'}
                element={<Textarea disabled={true} rows={5} hiddenPlaceholder />}
              />
            </ContentsRow>
          </div>
        </form>
      </SplitPanel>
    </>
  );
};

export const SystemCodeGrid = SystemCodeGridComponent;

const formConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'cdGroupId',
      type: 'text',
      label: t('LABEL.cdGroupId'),
      value: '',
      placeholder: '',
    },
    {
      name: 'cdId',
      type: 'text',
      label: t('LABEL.cdId'),
      value: '',
      placeholder: '',
    },
    {
      name: 'cdName',
      type: 'text',
      label: t('LABEL.cdName'),
      value: '',
      placeholder: '',
    },
    {
      name: 'cdContent',
      type: 'text',
      label: t('LABEL.content', { type: t('LABEL.cdId') }),
      value: '',
      placeholder: '',
    },
    {
      name: 'multilingualKey',
      type: 'text',
      label: t('LABEL.multilingualKey'),
      value: '',
      placeholder: '',
    },
    {
      name: 'referenceVal1',
      type: 'textarea',
      label: t('LABEL.referenceVal1'),
      value: '',
      placeholder: '',
    },
  ],
};
