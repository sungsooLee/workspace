import { useEffect, useRef, useState } from 'react';
import { ContentsRow, DynamicFormField, GridBox, GridImperative, Input } from '@learnway/ui';
import { t } from 'i18next';
import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css'; // 화면 내 컨텐츠 레이아웃 css
import { cn } from '@learnway/shared';
import { createColumnHelper } from '@tanstack/react-table';
import { useSystemCodeDetail } from '../../../../entities/common-code/service/system-code.hook';
import { FormRow, FormSubTitle } from '../../../../shared/ui';
import { SectionLayout } from '../../../../widgets/layout/ui/container/section-layout/section-layout';
import { DynamicFormConfig, useDynamicForm } from '@learnway/hooks';

const columnHelper = createColumnHelper<any>();
const listGridColumns = () => {
  return [
    columnHelper.accessor('enumNames', {
      cell: ({ getValue }) => (
        <div style={{ whiteSpace: 'normal', overflow: 'visible' }}>{getValue()}</div>
      ),
      header: t('그룹코드'),
      size: 300,
    }),
  ];
};

const detailGridColumns = () => {
  return [
    columnHelper.accessor('cdId', {
      cell: ({ getValue }) => (
        <div style={{ whiteSpace: 'normal', overflow: 'visible' }}>{getValue()}</div>
      ),
      header: t('코드'),
      size: 150,
    }),
    columnHelper.accessor('cdName', {
      cell: ({ getValue }) => (
        <div style={{ whiteSpace: 'normal', overflow: 'visible' }}>{getValue()}</div>
      ),
      header: t('코드명'),
      size: 150,
    }),
    columnHelper.accessor('cdContent', {
      cell: ({ getValue }) => (
        <div style={{ whiteSpace: 'normal', overflow: 'visible', wordBreak: 'break-all' }}>
          {getValue()}
        </div>
      ),
      header: t('코드설명'),
      size: 250,
    }),
    columnHelper.accessor('multilingualKey', {
      cell: ({ getValue }) => (
        <div style={{ whiteSpace: 'normal', overflow: 'visible', wordBreak: 'break-all' }}>
          {getValue()}
        </div>
      ),
      header: t('다국어키'),
      size: 280,
    }),
    columnHelper.accessor('isUsed', {
      cell: ({ getValue }) => (
        <div style={{ textAlign: 'center' }}>{getValue() ? t('사용') : t('미사용')}</div>
      ),
      header: t('사용여부'),
      size: 100,
    }),
    columnHelper.accessor('referenceVal1', {
      cell: ({ getValue }) => (
        <div style={{ whiteSpace: 'normal', overflow: 'visible', wordBreak: 'break-all' }}>
          {getValue()}
        </div>
      ),
      header: t('참고'),
      size: 100,
    }),
  ];
};

const SystemCodeGridComponent = ({ data }: any) => {
  const listGridRef = useRef<GridImperative>(null);
  const detailGridRef = useRef<GridImperative>(null);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [formattedDetailData, setFormattedDetailData] = useState<any>([]);
  const { data: detailData } = useSystemCodeDetail(selectedRow?.enumNames || '');
  const { provider, onSubmit, fetchData, clearFormError, onFormChange, getValues, formState } =
    useDynamicForm(formConfig);

  const handleRowSelect = (row: any) => {
    setSelectedRow(row);
  };

  useEffect(() => {
    if (detailData && detailData.length > 0) {
      const processDetailData = () => {
        const firstItem = detailData[0]; // 객체 선택
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
    <SectionLayout contentsRatio={'thirty'}>
      <GridBox
        ref={listGridRef}
        data={data || []}
        columns={listGridColumns()}
        onRowSelect={handleRowSelect}
        showNumberingColumn={true}
      />
      <GridBox
        ref={detailGridRef}
        data={formattedDetailData}
        columns={detailGridColumns()}
        showNumberingColumn={true}
        // initialState={{
        //   columnVisibility: columnVisibility,
        // }}
      />
      <div className={layoutStyles.inner}>
        <div className={layoutStyles.inner_contents}>
          <FormSubTitle label={'enum 코드 정보'} underLine={true} />
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'cdGroupId'} disabled={true} />
            </FormRow>
          </ContentsRow>
        </div>
      </div>
    </SectionLayout>
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
    },
    {
      name: 'cdGroupName',
      type: 'text',
      label: t('LABEL.cdGroupName'),
      value: '',
    },
  ],
};

// "cdGroupId": "cms.html5.Html5ProcessingStatus",
//           "cdId": "PARSING",
//           "cdName": "퍼싱중",
//           "cdContent": "HTML5 파일 압축 해제 후 파싱 처리 시작",
//           "multilingualKey": "cms.html5.Html5ProcessingStatus.PARSING",
//           "referenceVal1": "",
//           "isUsed": true
