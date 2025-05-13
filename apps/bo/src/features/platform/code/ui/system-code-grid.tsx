import { useEffect, useRef, useState } from 'react';
import { ContentsRow, DynamicFormField, GridBox, GridImperative, Input } from '@learnway/ui';
import { t } from 'i18next';
import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css'; // 화면 내 컨텐츠 레이아웃 css
import { cn } from '@learnway/shared';
import { createColumnHelper } from '@tanstack/react-table';
import { useSystemCodeDetail } from '../../../../entities/common-code/service/system-code.hook';
import { FormRow, FormSubTitle } from '../../../../shared/ui';
import { DynamicFormConfig, useDynamicForm } from '@learnway/hooks';
import boxStyles from '@learnway/styles/bo/assets/styles/modules/wrap-box.module.css'; // 하단 layout style - line

const columnHelper = createColumnHelper<any>();
const listGridColumns = () => {
  return [
    columnHelper.accessor('enumNames', {
      cell: ({ getValue }) => (
        <div style={{ whiteSpace: 'normal', overflow: 'visible' }}>{getValue()}</div>
      ),
      header: t('그룹코드'),
      size: 280,
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
  ];
};

const SystemCodeGridComponent = ({ data }: any) => {
  const listGridRef = useRef<GridImperative>(null);
  const detailGridRef = useRef<GridImperative>(null);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [selectedDetailRow, setSelectedDetailRow] = useState<any>(null);
  const [formattedDetailData, setFormattedDetailData] = useState<any>([]);
  const { data: detailData } = useSystemCodeDetail(selectedRow?.enumNames || '');
  const { provider, onSubmit, fetchData, clearFormError, onFormChange, getValues, formState } =
    useDynamicForm(formConfig);

  const handleRowSelect = (row: any) => {
    fetchData({});
    setSelectedDetailRow(null);
    detailGridRef.current?.resetRowSelection();

    setSelectedRow(row);
  };

  const handleDetailRowSelect = (row: any) => {
    fetchData({ ...row });
    setSelectedDetailRow(row);
  };

  useEffect(() => {
    fetchData({});
    if (data[0]) {
      const selected = listGridRef.current?.selectRowById('enumNames', data[0].enumNames);
      selected && setSelectedRow(selected);
    } else {
      setFormattedDetailData([]);
    }
  }, [data]);

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
    <div className={cn(boxStyles.start, boxStyles.inner)}>
      <div className={cn(layoutStyles.start, layoutStyles.wrap, layoutStyles.ratio_third)}>
        <div className={cn(layoutStyles.inner, layoutStyles.scrollHidden)}>
          <div className={layoutStyles.grid_layout_wrap}>
            <GridBox
              ref={listGridRef}
              data={data || []}
              columns={listGridColumns()}
              onRowSelect={handleRowSelect}
              showNumberingColumn={true}
              clientSideSorting={true}
              height={350}
            />
            <GridBox
              ref={detailGridRef}
              data={formattedDetailData}
              columns={detailGridColumns()}
              showNumberingColumn={true}
              onRowSelect={handleDetailRowSelect}
              clientSideSorting={true}
              height={350}
            />
          </div>
        </div>

        <div className={layoutStyles.inner}>
          <form>
            <FormSubTitle label={'enum 코드 정보'} underLine={true} />
            <div className={layoutStyles.inner_contents}>
              <ContentsRow>
                <FormRow provider={provider}>
                  <DynamicFormField name={'cdGroupId'} disabled={true} />
                </FormRow>
              </ContentsRow>
              <ContentsRow>
                <FormRow provider={provider}>
                  <DynamicFormField name={'cdId'} disabled={true} />
                </FormRow>
              </ContentsRow>
              <ContentsRow>
                <FormRow provider={provider}>
                  <DynamicFormField name={'cdName'} disabled={true} />
                </FormRow>
              </ContentsRow>
              <ContentsRow>
                <FormRow provider={provider}>
                  <DynamicFormField name={'cdContent'} disabled={true} />
                </FormRow>
              </ContentsRow>
              <ContentsRow>
                <FormRow provider={provider}>
                  <DynamicFormField name={'multilingualKey'} disabled={true} />
                </FormRow>
              </ContentsRow>
              <ContentsRow>
                <FormRow provider={provider}>
                  <DynamicFormField name={'referenceVal1'} disabled={true} />
                </FormRow>
              </ContentsRow>
            </div>
          </form>
        </div>
      </div>
    </div>
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
      label: t('LABEL.cdContent'),
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
      type: 'text',
      label: t('LABEL.referenceVal1'),
      value: '',
      placeholder: '',
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
