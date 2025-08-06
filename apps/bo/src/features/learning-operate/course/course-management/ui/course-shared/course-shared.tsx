import { useFetchChannelByRoleId } from '@entities/channel';
import { useCopyCourseShared } from '@entities/course-shared/service/course-shared.hook';
import { queryOptions as courseSharedQueryOptions } from '@entities/course-shared/service/course-shared.queries';
import { useFetchAuthUser } from '@learnway/auth/entities';
import { AuthUser } from '@learnway/auth/types';
import { CODE_GROUP, getCodeLabel, SearchBoxConfig, useSearchBox } from '@learnway/hooks';
import { DATE_TIME_FORMAT, getDateToString } from '@learnway/shared';
import { Button } from '@learnway/ui/button';
import { Divider } from '@learnway/ui/elements';
import { GridBox, useGridBox, useGridBoxConfig } from '@learnway/ui/grid';
import { useModal } from '@learnway/ui/modal';
import { MainContents, PageContainer, SearchBox } from '@shared/ui';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { t } from 'i18next';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { CourseSharedHistoryModal } from '../modal/course-shared-modal/course-shared-history-modal';

/**
 * NLP_BO_LMS_0056 : 과정 공유함 목록 조회
 * @returns
 */
const gridConfig: useGridBoxConfig = {
  query: courseSharedQueryOptions.list,
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
  linkClickGetCourse: (payload: any) => {
    return;
  },
};

const CourseSharedComponent = () => {
  const [columns, setColumns] = useState() as any;
  const { openModal, confirm: openConfirm, alert: openAlert, showSaveComplete } = useModal();
  const { copyCourseShared } = useCopyCourseShared({});
  const { data: authUser } = useFetchAuthUser<AuthUser>();
  const { data: channel } = useFetchChannelByRoleId(authUser?.activeRole?.roleId as number);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const channelOptions = useMemo(() => {
    if (!channel) return [];
    if (authUser?.activeTenant?.tenantId === -1) {
      // tenantId가 -1이면 필터 없이 전체 반환
      return channel.map(({ channelName, channelUuid }) => ({
        label: channelName,
        value: channelUuid,
      }));
    }
    // tenantId가 있으면 필터 적용
    return channel
      .filter((d) => !!d.tenantList.find((t) => t.tenantId === authUser?.activeTenant?.tenantId))
      .map(({ channelName, channelUuid }) => ({
        label: channelName,
        value: channelUuid,
      }));
  }, [authUser?.activeTenant?.tenantId, channel]);

  useEffect(() => {
    setValue('targetChannelUuid', '');
    setOptions('targetChannelUuid', channelOptions);
    getOriginChannelsOptions();
  }, [channelOptions]);

  const getOriginChannelsOptions = async () => {
    setValue('originChannelUuid', '');
    setOptions('originChannelUuid', []);
    if (channelOptions.length === 0) return;
    const params = { targetChannelUuid: channelOptions.map((x: any) => x.value) };
    console.log('### params=>', params);
    const originResult = await queryClient.fetchQuery(
      courseSharedQueryOptions.originChannels(params),
    );
    console.log('originResult=>', originResult);
    if (originResult) {
      const options = Array.from(
        new Map(
          originResult.map((x) => [x.channelUuid, { label: x.channelName, value: x.channelUuid }]),
        ).values(),
      );
      setOptions('originChannelUuid', options);
    }
  };

  const handleGetCourse = async (payload: any) => {
    console.log('payload=>', payload);
    const confirmRes = await openConfirm({
      title: t('과정을 가져오시겠습니까?'),
      content: t('과정운영의 과정목록으로 복사됩니다.'),
    });
    if (!confirmRes) return;

    const param = {
      courseId: payload.courseId,
      tenantId: authUser?.activeTenant?.tenantId || -1,
      targetChannelUuid: payload.targetChannelUuid,
    };
    await copyCourseShared(param, {
      onSuccess: async (data: any, variables: any, context: any) => {
        console.log('onSuccess:', data);
        await showSaveComplete();
        navigate({
          to: '/learning/course/detail',
          state: {
            courseId: data,
            courseName: payload.courseName,
            meta: { title: `[${t('공유')}]${payload.courseName}` },
          },
        });
      },
      onError: (data: any, variables: any, context: any) => {
        console.log('onError:', data);
      },
    });
  };

  // TODO: 과정명 미리보기 띄워야함
  _global.linkClickCourseName = (payload: any) => {
    navigate({
      to: '/learning/course/detail',
      state: {
        courseId: payload.courseId,
        courseName: payload.courseName,
        meta: { title: payload.courseName },
      },
    });
  };

  // 가져간 이력
  _global.linkClickHistory = (payload: any) => {
    console.log('payload=>', payload);
    openModal({
      width: 'sm',
      content: <CourseSharedHistoryModal courseShareId={payload.courseShareId} />,
    });
  };

  // 가져오기
  _global.linkClickGetCourse = (payload: any) => {
    handleGetCourse(payload);
  };

  const searchConfig: SearchBoxConfig = {
    builders: [
      [
        {
          name: 'originChannelUuid',
          type: 'dropdown',
          label: t('LABEL.form.label.originChannelUuid', '공유한 채널'),
          value: '',
          format: 'string',
          presetOptionLabel: t('LABEL.form.label.select', '선택'),
          options: [],
        },
        {
          name: 'targetChannelUuid',
          type: 'dropdown',
          label: t('LABEL.form.label.targetChannelUuid', '공유 받은 채널'),
          format: 'string',
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
        cell: (info: any) => getCodeLabel(CODE_GROUP['lms.course.CourseType'], info.getValue()),
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
        cell: (info: any) =>
          getCodeLabel(CODE_GROUP['pms.multilingual.LangCountryCode'], info.getValue()),
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
        cell: (info) => (info.getValue() ? t('완료') : t('대기')),
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
        enableSorting: false,
        size: 86,
      }),
      columnHelper.accessor('getCourse', {
        header: t('가져오기'),
        cell: ({ row }) => {
          return (
            <Button
              label={t('가져오기')}
              variant={'gray2'}
              size={'xs'}
              onClick={() => {
                _global.linkClickGetCourse(row.original as any);
              }}
            />
          );
        },
        enableGrouping: false,
        enableSorting: false,
        size: 80,
      }),
    ] as ColumnDef<any, unknown>[];

    setColumns(columns);
  }, []);

  const { provider: searchProvider, getValues, setValue, setOptions } = useSearchBox(searchConfig);
  const { config: gConfig, gridFetch, data: gridData } = useGridBox(gridConfig, getValues);

  const handleOnRefresh = () => {
    console.log('### handleOnRefresh');
    handleOnSearch(getValues());
  };

  const handleOnSearch = useCallback((data: any) => {
    console.log('## handleOnSearch', data);
    const payload = {
      originChannelUuid: data.originChannelUuid,
      targetChannelUuid: data.targetChannelUuid,
      courseName: data.courseName,
      isComplete: data.isComplete,
    };
    // const payload = {
    //   originChannelUuid: 'd4bf5f43-3184-445b-8985-f316619909db',
    //   targetChannelUuid: '67bbca16-4180-4982-a4e0-d192212dd7c8',
    //   courseName: '',
    //   isComplete: false,
    // };

    gridFetch(payload);
  }, []);

  const columnHelper = createColumnHelper<any>();
  return (
    <PageContainer>
      <MainContents>
        <SearchBox provider={searchProvider} onSearch={handleOnSearch} />
        <Divider />
        <GridBox showNumberingColumn config={gConfig} columns={columns} title={t('과정 목록')} />
      </MainContents>
    </PageContainer>
  );
};

export const CourseShared = CourseSharedComponent;
