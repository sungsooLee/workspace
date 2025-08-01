import { queryOptions as sequenceQueryOptions } from '@entities/learning-sequence/service/learning-sequence.queries';
import { SearchBoxConfig, useSearchBox } from '@learnway/hooks';
import { DATE_TIME_FORMAT, getDateToString } from '@learnway/shared';
import { Button } from '@learnway/ui/button';
import { Divider } from '@learnway/ui/elements';
import { GridBox, useGridBox, useGridBoxConfig } from '@learnway/ui/grid';
import { useModal } from '@learnway/ui/modal';
import { MainContents, PageContainer, SearchBox } from '@shared/ui';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { t } from 'i18next';
import { useCallback, useEffect, useState } from 'react';

const gridConfig: useGridBoxConfig = {
  query: sequenceQueryOptions.studentsList,
  columns: [],
  data: [],
  gridState: {
    page: 0,
    size: 50,
    sort: [],
  },
};

const _global = {
  linkClickCourseName: (payload: any) => {
    return;
  },
  linkClickHistory: (payload: any) => {
    return;
  },
  linkClickBring: (payload: any) => {
    return;
  },
};

const CourseSharedComponent = () => {
  const [columns, setColumns] = useState() as any;
  const { openModal, confirm: openConfirm, alert: openAlert, showSaveComplete } = useModal();

  // 과정명
  _global.linkClickCourseName = (payload: any) => {
    // openModal({
    //   width: 'sm',
    //   content: (
    //     <StudentsBookDeliveryModal
    //       courseSequenceId={payload.courseSequenceId}
    //       userId={payload.userId}
    //     />
    //   ),
    // });
  };

  // 가져간 이력
  _global.linkClickHistory = (payload: any) => {
    // openModal({
    //   width: 'sm',
    //   content: (
    //     <StudentsBookDeliveryModal
    //       courseSequenceId={payload.courseSequenceId}
    //       userId={payload.userId}
    //     />
    //   ),
    // });
  };

  // 가져오기
  _global.linkClickBring = (payload: any) => {
    // openModal({
    //   width: 'sm',
    //   content: (
    //     <StudentsBookDeliveryModal
    //       courseSequenceId={payload.courseSequenceId}
    //       userId={payload.userId}
    //     />
    //   ),
    // });
  };

  const searchConfig: SearchBoxConfig = {
    builders: [
      [
        {
          name: 'originChannelUuid',
          type: 'dropdown',
          label: t('LABEL.form.label.originChannelUuid', '공유한 채널'),
          value: '',
          format: 'number',
          presetOptionLabel: t('LABEL.form.label.select', '선택'),
          options: [],
        },
        {
          name: 'targetChannelUuid',
          type: 'dropdown',
          label: t('LABEL.form.label.targetChannelUuid', '공유 받은 채널'),
          format: 'number',
          value: '',
          presetOptionLabel: t('LABEL.form.label.select', '선택'),
          options: [],
        },
        {
          name: 'isComplete',
          type: 'dropdown',
          label: t('LABEL.form.label.isComplete', '상태'),
          value: null,
          presetOptionLabel: t('전체'),
          options: [
            { label: t('대기'), value: false },
            { label: t('완료'), value: true },
          ],
        },
        {
          name: 'courseName',
          type: 'text',
          label: t('과정명'),
          value: '',
          placeholder: '',
        },
      ],
    ],
    validator: {
      originChannelUuid: true,
      targetChannelUuid: true,
    },
  };

  useEffect(() => {
    const columns = [
      columnHelper.accessor('originChannelName', {
        header: t('공유한 채널'),
        cell: (info) => info.getValue(),
        enableGrouping: false,
        size: 150,
      }),
      columnHelper.accessor('targetChannelName', {
        header: t('공유 받은 채널'),
        cell: (info) => info.getValue(),
        enableGrouping: false,
        size: 150,
      }),
      columnHelper.accessor('courseType', {
        header: t('과정유형'),
        cell: (info) => info.getValue(),
        enableGrouping: false,
        size: 80,
      }),
      columnHelper.accessor('courseName', {
        header: t('과정명'),
        cell: (info) => {
          return (
            <Button
              className="link"
              onClick={() => {
                _global.linkClickCourseName(info.row.original as any);
              }}
              label={info.row.original.courseName}
            />
          );
        },
        enableGrouping: false,
        size: 545,
      }),
      columnHelper.accessor('language', {
        header: t('언어'),
        cell: (info) => info.getValue(),
        enableGrouping: false,
        size: 80,
      }),
      columnHelper.accessor('sharedDateTime', {
        header: t('공유 일시'),
        cell: (info) => {
          const date = info.getValue() as Date;
          return getDateToString(date, DATE_TIME_FORMAT.DATETIME_SEC);
        },
        enableGrouping: false,
        size: 167,
      }),
      columnHelper.accessor('isComplete', {
        header: t('상태'),
        cell: (info) => info.getValue(),
        enableGrouping: false,
        size: 90,
      }),
      columnHelper.accessor('history', {
        header: t('가져간 이력'),
        cell: (info) => {
          return (
            <Button
              className="link"
              onClick={() => {
                _global.linkClickHistory(info.row.original as any);
              }}
              label={t('이력보기')}
            />
          );
        },
        enableGrouping: false,
        size: 86,
      }),
      columnHelper.accessor('bring', {
        header: t('가져오기'),
        cell: (info) => {
          return (
            <Button
              onClick={() => {
                _global.linkClickBring(info.row.original as any);
              }}
              label={t('가져오기')}
            />
          );
        },
        enableGrouping: false,
        size: 80,
      }),
      // columnHelper.accessor('reason', {
      //   header: t('미이수사유'),
      //   cell: (info) => {
      //     if (info.row.original.isCertified) return '';
      //     let title = '';
      //     if (info.row.original.reason === null) {
      //       title = t('사유입력');
      //     } else {
      //       title = t('사유보기');
      //     }
      //     return (
      //       <Button
      //         className="link"
      //         onClick={() => {
      //           _global.linkClickReason(info.row.original as any);
      //         }}
      //         label={title}
      //       />
      //     );
      //   },
      //   enableGrouping: false,
      //   size: 70,
      // }),
    ] as ColumnDef<any, unknown>[];

    setColumns(columns);
  }, []);

  const { provider: searchProvider, getValues, setValue, setOptions } = useSearchBox(searchConfig);
  const { config: gConfig, gridFetch, data: gridData } = useGridBox(gridConfig, getValues);

  const handleOnSearch = useCallback((data: any) => {
    console.log('## handleOnSearch', data);
    const payload = {
      originChannelUuid: data.originChannelUuid,
      targetChannelUuid: data.targetChannelUuid,
      courseName: data.courseName,
      isComplete: data.isComplete,
    };

    gridFetch(payload);
  }, []);

  const columnHelper = createColumnHelper<any>();
  return (
    <PageContainer>
      <MainContents>
        <SearchBox provider={searchProvider} onSearch={handleOnSearch} />
        <Divider />
        <GridBox
          showNumberingColumn
          config={gConfig}
          // data={gridData}
          columns={columns}
          multiple={true}
          disabledSelectionToggle
          title={t('과정 목록')}
        />
      </MainContents>
    </PageContainer>
  );
};

export const CourseShared = CourseSharedComponent;
