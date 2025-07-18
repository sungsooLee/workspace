import { forwardRef } from 'react';
// import { CourseTabBaseProps, TabFormRef } from '../../../-common/type';
import { useEffect, useCallback, useState, useRef } from 'react';
import { useLocation } from '@tanstack/react-router';
import { useWatch } from 'react-hook-form';
import { t } from 'i18next';
import { Link, useRouter } from '@tanstack/react-router';
import { CellContext, ColumnDef, createColumnHelper } from '@tanstack/react-table';
import {
  Button,
  Checkbox,
  ContentsRow,
  DatePicker,
  Divider,
  EditDropdownCell,
  EditInputCell,
  EditTimeRangeCell,
  GridBox,
  GridFormField,
  Input,
  TableBox,
  useGridBox,
  useGridBoxConfig,
  useModal,
} from '@learnway/ui';
import { SearchBox } from '@shared/ui/search-box';
import {
  useSearchBox,
  SearchBoxConfig,
  CODE_GROUP,
  SelectOption,
  compactValues,
  useDynamicForm,
  useDynamicForm2,
} from '@learnway/hooks';
import { queryOptions } from '@entities/learning-sequence/service/learning-sequence.queries';
import { useQueryClient } from '@tanstack/react-query';
import { FormRow, GridExcelDownloadButton, GridExcelUploadButton } from '@shared/ui';
import { LMSApiPrefix } from '@learnway/config';
import { EnPageMode } from '@types';
import { IcoPlus } from '@learnway/icons';
import { useActiveMenuDepthState, useFetchAuthUser } from '@learnway/auth/entities';
import dayjs from 'dayjs';
import { getRandomId } from '@learnway/shared';
import { SequenceBatchModal } from '@features/learning-operate/learning-sequence/sequence-management';
import { DateTimeRangePickerFormField } from '@features/form';

type SequenceListComponentProps = {
  setMode: (value: string) => void;
  setSequenceId: (value: number) => void;
  courseId: number;
};

/**
 * NLP_BO_LMS_0031 : 차수관리 목록
 * @returns
 */
const _global = {
  linkClick: (payload: any) => {
    return;
  },
};

const SequenceListComponent = ({
  setMode,
  setSequenceId,
  courseId,
}: SequenceListComponentProps) => {
  const router = useRouter();
  const { open: openModal, confirm: openConfirm, alert: openAlert } = useModal();
  const [columns, setColumns] = useState() as any;
  const [openYear, setOpenYear] = useState<object[]>();
  const selectedRowsRef = useRef<any[]>([]);

  const { provider, control, onSubmit, updateFormData } = useDynamicForm2();

  _global.linkClick = (payload: any) => {
    setMode('DETAIL');
    setSequenceId(parseInt(payload.sequenceId));
  };

  useEffect(() => {
    const currentYear = dayjs().year(); // 현재 년도 (number)
    const yearOptions = Array.from({ length: 11 }, (_, i) => {
      const year = currentYear - i;
      return { label: year, value: year };
    });
    setOpenYear(yearOptions);
  }, []);

  const queryClient = useQueryClient();

  const searchConfig: SearchBoxConfig = {
    builders: [
      [
        {
          name: 'openYear',
          type: 'dropdown',
          label: t('LABEL.form.label.openYear', '개설연도'),
          value: dayjs().year(),
          format: 'number',
          presetOptionLabel: t('LABEL.form.label.select', '선택'),
          options: openYear,
        },
        {
          name: 'isUsed',
          type: 'dropdown',
          label: t('LABEL.form.label.isUsed', '사용여부'),
          value: '',
          presetOptionLabel: t('LABEL.form.label.select', '선택'),
          options: [
            { label: '사용', value: '1' },
            { label: '미사용', value: '2' },
          ],
        },
        {
          name: 'sequenceName',
          type: 'text',
          label: t('차수명'),
          value: '',
        },
      ],
    ],
    validator: {},
  };

  const gridConfig: useGridBoxConfig = {
    query: queryOptions.sequenceList,
    columns: [],
    data: [],
    gridState: {
      // page: 0,
      // size: 10,
      sort: [],
    },
  };

  const {
    provider: searchProvider,
    getValues,
    getValuesWithLabel,
    setOptions,
    setValue,
  } = useSearchBox(searchConfig);
  const { config: gConfig, gridFetch, data } = useGridBox(gridConfig, getValues);
  const [gridData, setGridData] = useState<any[]>([]);
  const [params, setParams] = useState<Record<string, any>>({});
  const [valuesWithLabel, setValuesWithLabel] = useState<Record<string, SelectOption>>({});

  useEffect(() => {
    const columns = [
      // columnHelper.accessor('checkbox', {
      //   // 상태에 따른 checkbox disabled를 위해 checkbox 따로 구현
      //   id: 'select-check',
      //   size: 50,
      //   maxSize: 50,
      //   minSize: 50,
      //   meta: {
      //     align: 'center',
      //     headerAlign: 'center',
      //     cellAlign: 'center',
      //   },
      //   enableSorting: false,
      //   header: ({ table }) => (
      //     <div style={{ width: '100%', textAlign: 'center' }}>
      //       <Checkbox
      //         checked={table.getIsAllRowsSelected()}
      //         onCheckedChange={(checked) => {
      //           table.toggleAllRowsSelected(!!checked);
      //         }}
      //       />
      //     </div>
      //   ),
      //   cell: ({ row }) => {
      //     return (
      //       <div style={{ width: '100%', textAlign: 'center', paddingRight: 0 }}>
      //         <Checkbox
      //           checked={row.getIsSelected()}
      //           // disabled={row.getIsGrouped() || disabled}
      //           onCheckedChange={() => {
      //             // row.getToggleSelectedHandler();
      //             if (!row.getIsGrouped()) {
      //               row.getToggleSelectedHandler();
      //             }
      //           }}
      //         />
      //       </div>
      //     );
      //   },
      // }),
      columnHelper.accessor('openYear', {
        header: t('개설'),
        cell: (info) => info.getValue(),
        enableGrouping: false,
        size: 58,
      }),
      columnHelper.accessor('sequence', {
        header: t('순서'),
        cell: (info: CellContext<any, string>) => {
          return (
            <EditInputCell
              info={info}
              input={{
                type: 'number',
              }}
            />
          );
        },
        size: 90,
      }),
      columnHelper.accessor('sequenceId', {
        header: t('차수코드'),
        cell: (info) => info.getValue(),
        enableGrouping: false,
        size: 80,
      }),
      columnHelper.accessor('courseSequenceName', {
        header: t('차수명'),
        cell: (info) => (
          <Button
            className="link"
            onClick={() => {
              _global.linkClick(info.row.original as any);
            }}
            label={info.getValue() as string}
          />
        ),
        enableGrouping: false,
        size: 240,
      }),
      columnHelper.accessor('regStartDate', {
        header: t('수강신청 시작일'),
        cell: (info) => {
          return (
            <DatePicker
              displayType="day-time-hm"
              value={info.row.original.regStartDate}
              size={'md'}
            />
          );
        },
        enableGrouping: false,
        size: 300,
      }),
      columnHelper.accessor('regEndDate', {
        header: t('수강신청 종료일'),
        cell: (info) => {
          return (
            <DatePicker
              displayType="day-time-hm"
              value={info.row.original.regEndDate}
              size={'md'}
            />
          );
        },
        enableGrouping: false,
        size: 300,
        meta: {
          cellAlign: 'center',
          align: 'center',
        },
      }),
      columnHelper.accessor('eduStartDate', {
        header: t('학습 시작일'),
        cell: (info) => {
          if (info.row.original.status === '학습중') return '수강신청 승인일로 부터';
          else
            return (
              <DatePicker
                displayType="day-time-hm"
                value={info.row.original.eduStartDate}
                size={'md'}
              />
            );
        },
        enableGrouping: false,
        size: 300,
      }),
      columnHelper.accessor('eduEndDate', {
        header: t('학습 종료일'),
        cell: (info: CellContext<any, string>) => {
          if (info.row.original.status === '학습중') {
            return <EditInputCell info={info} input={{ suffixText: '일' }} />;
          } else {
            return (
              <DatePicker
                displayType="day-time-hm"
                value={info.row.original.eduEndDate}
                size={'md'}
              />
            );
          }
        },
        enableGrouping: false,
        size: 300,
      }),
      columnHelper.accessor('status', {
        header: t('상태'),
        cell: (info) => info.getValue(),
        enableGrouping: false,
        size: 88,
      }),
      columnHelper.accessor('isUsed', {
        header: t('사용'),
        cell: (info) => info.getValue(),
        enableGrouping: false,
        size: 60,
      }),
      columnHelper.accessor('capacity', {
        header: t('정원'),
        cell: (info) => info.getValue(),
        enableGrouping: false,
        size: 60,
      }),
      columnHelper.accessor('enroll', {
        header: t('신청'),
        cell: (info) => info.getValue(),
        enableGrouping: false,
        size: 60,
      }),
      columnHelper.accessor('student', {
        header: t('수강생'),
        cell: (info) => info.getValue(),
        enableGrouping: false,
        size: 70,
      }),
      columnHelper.accessor('graduateStudent', {
        header: t('수료생'),
        cell: (info) => info.getValue(),
        enableGrouping: false,
        size: 70,
      }),
    ] as ColumnDef<any, unknown>[];

    setColumns(columns);
    gridFetch();
  }, []);

  const handleOnSearch = useCallback((data: any) => {
    console.log('##data', data);
    const searchData = {
      eduYear: data.eduYear,
      isUsed: data.isUsed,
      courseId: data.courseId,
    };

    // const excelParam = {
    //   downloadReason: {
    //     userUuid: user?.uuid,
    //     menuPath: activeMenuDepthMenu?.map((menu) => menu.menuName).join(' > '),
    //     dataCount: 1500,
    //     requestParameter: 'string',
    //     downloadReasonType: 'AFFAIRS',
    //     downloadDetailReasonType: 'AFFAIRS01',
    //     downloadDetailReason: 'string',
    //   },
    // };
    // setParams({
    //   ...searchData,
    //   ...excelParam,
    // });
    // setValuesWithLabel(getValuesWithLabel());
    // const result = gridFetch(searchData);
    // console.log('result=>', result);
    // result.then((data) => {
    //   console.log('data=>', data);
    //   setGridData(data?.content);
    // });
    // console.log('sampleData=>', sampleData);
    // setGridData(sampleData);
    gridFetch(searchData);
  }, []);

  const refreshOnSearch = () => {
    handleOnSearch(getValues);
  };

  const handleRowsSelect = async (rows: any) => {
    console.log('##rows:', rows);
    // setSelectedRows([...rows]);
    selectedRowsRef.current = rows;
  };

  const [inputAdd, setInputAdd] = useState<number>();
  const [inputCopy, setInputCopy] = useState<number>();
  const onAddRow = async () => {
    console.log('data=>', data);
    if (!inputAdd || inputAdd <= 0) return;
    const confirmRes = await openConfirm({
      title: t('차수를 추가 하시겠습니까?'),
      content: t('요청하신 개수로 차수가 추가됩니다.'),
    });
    if (!confirmRes) return;
    const gridData: any[] = gConfig.gridData?.content ? gConfig.gridData?.content : [];
    const lastId = gridData?.length === 0 ? 0 : gridData[gridData?.length - 1].sequence;

    const addRows = Array.from({ length: inputAdd }, (_, i) => ({
      sequence: lastId + i + 1,
      sequenceId: lastId + i + 1,
      courseSequenceName: 'TEST' + i + 1,
    }));
    console.log('##addRows=>', addRows);
    const newData = [...gridData, ...addRows];
    setGridData(newData);
    // gConfig.gridFetch();
  };

  const onCopyRow = async () => {
    if (!inputCopy || inputCopy <= 0) return;
    const confirmRes = await openConfirm({
      title: t('선택한 과정을 복사 하시겠습니까?'),
      content: t('선택하신 차수로 복사됩니다.'),
    });
    if (!confirmRes) return;

    const lastSeq = selectedRowsRef.current.reduce((max, row) => Math.max(max, row.sequence), 0);
    let seqCounter = lastSeq;

    const clonedRows: any[] = [];

    for (const row of selectedRowsRef.current) {
      for (let i = 0; i < inputCopy; i++) {
        seqCounter += 1;
        clonedRows.push({
          ...row,
          sequence: seqCounter, // seq만 고유하게 부여
          sequenceId: row.sequenceId,
          courseSequenceName: '[Copy]' + row.courseSequenceName,
        });
      }
    }

    const newData = [...gridData, ...clonedRows];
    setGridData(newData);
  };

  const onBatch = async () => {
    openModal({
      width: 'lg',
      content: <SequenceBatchModal />,
    });
  };

  const handleRemoveRows = async () => {
    //TODO: 사용중인 학습자가 있을경우 삭제불가 처리
    if (selectedRowsRef.current.length === 0) return;
    const confirmRes = await openConfirm({
      title: t('차수를 삭제하시겠습니까?'),
      content: t('해당 차수를 삭제하시겠습니까?'),
    });
    if (!confirmRes) return;

    openAlert({
      title: t('완료되었습니다.'),
      content: t('요청하신 작업이 정상적으로 완료되었습니다.'),
    });
  };

  const handleSaveClick = async () => {
    console.log('##save');
    console.log('gConfig:', gConfig);
    console.log('save:', gConfig.gridData);
  };

  const columnHelper = createColumnHelper<any>();
  return (
    <>
      <SearchBox provider={searchProvider} onSearch={handleOnSearch} />
      <Divider />
      <GridBox
        config={gConfig}
        // data={gridData}
        columns={columns}
        multiple={true}
        // hideRowSelectionCheckBox={true}
        disabledSelectionToggle
        title={t('차수 목록')}
        onRowsSelect={handleRowsSelect}
        customButtonNode={
          <>
            <Input
              type={'number'}
              suffixText={'개'}
              value={inputAdd}
              onChange={(e) => setInputAdd(parseInt(e.target.value))}
            />
            <Button
              variant="text"
              size="xs"
              label={t('LABEL.grid.header.add', '추가')}
              onClick={onAddRow}
            />
            <Input
              type={'number'}
              suffixText={'개'}
              value={inputCopy}
              onChange={(e) => setInputCopy(parseInt(e.target.value))}
            />
            <Button
              variant="text"
              size="xs"
              label={t('LABEL.grid.header.copy', '복사')}
              disabled={selectedRowsRef.current.length === 0}
              onClick={onCopyRow}
            />
            <Button variant="text" label={t('일괄설정')} onClick={onBatch} />
          </>
        }
        excelButtons={
          <>
            <GridExcelUploadButton validateUrl="/multilingual/excelUploadValidation" />
            <GridExcelDownloadButton
              url={`${LMSApiPrefix()}/multilingual/exportExcel`}
              params={getValues()}
            />
          </>
        }
        showRemove={true}
        onRemoveClick={handleRemoveRows}
        saveButton={{
          disabled: false,
          label: t('저장'),
          onClick: handleSaveClick,
        }}
      />
    </>
  );
};

export const SequenceList = SequenceListComponent;
