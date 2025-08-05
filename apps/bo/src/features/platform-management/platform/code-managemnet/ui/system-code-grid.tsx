import { useSystemCodeDetail } from '@entities/common-code/service/system-code.hook';
import { DynamicFormConfig, useDynamicForm } from '@learnway/hooks';
import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css'; // 화면 내 컨텐츠 레이아웃 css
import { FormSubTitle } from '@learnway/ui/base-form';
import { Divider, SplitPanel } from '@learnway/ui/elements';
import { GridBox } from '@learnway/ui/grid';
import { FormRow } from '@shared/ui';
import { createColumnHelper, Table } from '@tanstack/react-table';
import { t } from 'i18next';
import { useCallback, useEffect, useRef, useState } from 'react';

import { keyTypeCode, MultilingualUpdateReqParams } from '@entities/translation';
import { useTranslation } from '@entities/translation/service/translation.hook';
import { CdNameOverwriteInput } from './system-code-cdname-overwrite-input';

import { ContentsRow } from '@learnway/ui/contents-row';
import { GridImperative } from '@learnway/ui/grid';
import { Input } from '@learnway/ui/input';
import { Textarea } from '@learnway/ui/textarea';

const columnHelper = createColumnHelper<any>();
const listGridColumns = [
  // return [
  columnHelper.accessor('enumNames', {
    cell: ({ getValue }) => getValue(),
    header: t('LABEL.cdGroupId'),
    meta: {
      size: 'auto',
    },
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
    columnHelper.accessor('translationTextContent', {
      cell: ({ getValue }) => getValue(),
      header: `${t('LABEL.cdName')} (재정의)`,
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

  const [isOverwriteSubmitting, setIsOverwriteSubmitting] = useState(false);
  const { data: detailData, refetch: refetchDetailData } = useSystemCodeDetail(
    selectedRow?.enumNames,
  );
  const { provider, updateFormData, getValues } = useDynamicForm(formConfig());

  const handleRowSelect = (row: any) => {
    setSelectedDetailRow(null);
    setSelectedRow(row);
    detailGridRef?.current?.resetRowSelection();
  };

  const handleDetailRowSelect = (row: any) => {
    setSelectedDetailRow(row);
  };

  const { update } = useTranslation({
    onSuccess: async () => {
      // detailData 다시 조회
      await refetchDetailData();
    },
  });

  // cdName 덮어쓰기 핸들러
  const handleCdNameOverwrite = useCallback(
    async (newCdName: string) => {
      if (!selectedDetailRow) {
        throw new Error('선택된 코드가 없습니다.');
      }
      setIsOverwriteSubmitting(true);
      try {
        const uploadData: MultilingualUpdateReqParams = {
          keyTypeCode: keyTypeCode.SYSTEM_COMMON_CODE, // 'systemCodeKey'로 변경
          targetLocale: 'ko',
          translations: [],
        };
        uploadData.translations.push({
          multilingualKey: selectedDetailRow?.multilingualKey,
          translation: newCdName,
        });
        // API 호출 로직 (실제 API 엔드포인트에 맞게 수정 필요)
        update(uploadData);
        // 성공 시 폼 데이터 업데이트
        updateFormData({
          ...getValues(),
          cdName: newCdName,
        });
      } finally {
        setIsOverwriteSubmitting(false);
      }
    },
    [selectedDetailRow, updateFormData, getValues, update],
  );

  useEffect(() => {
    if (selectedDetailRow) {
      const referenceVal = selectedDetailRow?.referenceVal1
        ? JSON.stringify(selectedDetailRow.referenceVal1, null, 2)
        : '';
      updateFormData({ ...selectedDetailRow, referenceVal1: referenceVal });
    } else updateFormData({});
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
    updateFormData({});
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
    if (data) {
      const processDetailData = () => {
        const groupKey = Object.keys(data)[0]; // 코드명
        if (groupKey && Array.isArray(data[groupKey])) {
          return data[groupKey];
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
                name={'translationTextContent'}
                element={
                  <CdNameOverwriteInput
                    onOverwrite={handleCdNameOverwrite}
                    isSubmitting={isOverwriteSubmitting}
                    selectedCdId={selectedDetailRow?.cdId}
                  />
                }
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

const formConfig = (): DynamicFormConfig => ({
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
      name: 'translationTextContent',
      type: 'custom',
      label: `${t('LABEL.cdName')} (재정의)`,
      value: '',
      placeholder: '',
    },
    {
      name: 'cdName',
      type: 'custom',
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
});
