import { queryOptions } from '@entities/course';
import { CODE_GROUP, SearchBoxConfig, useSearchBox } from '@learnway/hooks';
import { SelectOption } from '@learnway/shared';
import { Checkbox } from '@learnway/ui/checkbox';
import { Divider } from '@learnway/ui/elements';
import { GridBox, useGridBox, useGridBoxConfig } from '@learnway/ui/grid';
import { ModalBody, ModalContainer, ModalTitle } from '@learnway/ui/modal';
import { getCurrentAuthUser } from '@shared/lib';
import { CoursePopupQueryParams } from '@types';
import dayjs from 'dayjs';
import { t } from 'i18next';
import { useCallback, useEffect } from 'react';
import { SearchBox } from '../search-box';

interface CourseChoiceProps {
  channelUuid: string;
}

export const CourseChoiceModal = ({ channelUuid }: CourseChoiceProps) => {
  const { provider, getValues, setOptions, setValue, onFormChange } = useSearchBox(searchConfig());
  const { config, gridFetch } = useGridBox(gridConfig(), getValues);
  const loginUser = getCurrentAuthUser();

  useEffect(() => {
    setOptions('openingYear', getYearOptions());
    setValue('openingYear', dayjs().year().toString());
  }, []);

  const getYearOptions = (): SelectOption[] => {
    const firstYear = 2025;
    const currentYear = dayjs().year();
    return Array.from({ length: currentYear - firstYear + 1 }, (_, i) => {
      const year = currentYear - i;
      return {
        label: year.toString(),
        value: year.toString(),
      } as SelectOption;
    });
  };

  const handleOnSearch = useCallback((data: any) => {
    gridFetch({
      ...data,
      channelUuid,
      tenantIds: [loginUser?.activeTenant?.tenantId],
    });
  }, []);

  return (
    <ModalContainer>
      <ModalTitle>{t('과정 조회')}</ModalTitle>
      <ModalBody>
        <SearchBox provider={provider} onSearch={handleOnSearch} />
        <Divider />
        <GridBox
          config={config}
          multiple
          title={t('과정 목록')}
          customButtonNode={<Checkbox size="sm" label={t('내가 등록한 과정')} />}
        />
      </ModalBody>
    </ModalContainer>
  );
};

// {
//   "tenantIds": [
//     0
//   ],
//   "channelUuid": "string",
//   "courseId": 0,
//   "coordinatorName": "string",
//   "operatorName": "string",
//   "isUsed": true,
//   "openingYear": 0,
//   "courseValidityStartDate": "2025-08-05T02:11:00.656Z",
//   "courseValidityEndDate": "2025-08-05T02:11:00.656Z",
//   "excludeCourseId": 0
// }

const searchConfig = (): SearchBoxConfig => ({
  builders: [
    [
      {
        name: 'courseType',
        label: t('과정 유형'),
        type: 'dropdown',
        value: '',
        optionsConfig: {
          codeGroup: CODE_GROUP['lms.course.CourseType'],
        },
        presetOptionLabel: t('전체'),
      },
      {
        name: 'courseName',
        label: t('과정명'),
        type: 'text',
        value: '',
      },
      {
        name: 'courseTarget',
        label: t('학습 대상'),
        type: 'dropdown',
        value: 'ALL',
        options: [
          { label: t('전체 설정'), value: 'ALL' }, // 채널 대상자 모두 노출
          { label: t('선택 설정'), value: 'SELECTED' }, // 해당 유저그룹만 과정 노출
        ],
      },
      {
        name: 'coordinatorName',
        label: t('담당자'),
        type: 'text',
        value: '',
      },
    ],
    [
      {
        name: 'operatorName',
        label: t('운영자'),
        type: 'text',
        value: '',
      },
      {
        name: 'isUsed',
        type: 'dropdown',
        label: t('사용 여부'),
        value: true,
        options: [
          { value: true, label: t('사용') },
          { value: false, label: t('미사용') },
        ],
      },
      {
        name: 'openingYear',
        type: 'dropdown',
        label: t('개설년도'),
        value: '',
        options: [],
      },
      {
        name: 'courseValidityDate',
        label: '과정 유효기간',
        type: 'date-range',
        value: {
          from: undefined,
          to: undefined,
        },
      },
    ],
  ],
});

const gridConfig = (): useGridBoxConfig => ({
  query: queryOptions.getCoursePopup<CoursePopupQueryParams>,
  columns: [
    {
      name: 'courseType',
      label: t('과정 유형'),
      size: 100,
      meta: {
        cellAlign: 'center',
      },
    },
    {
      name: 'courseCode',
      label: t('과정 코드'),
      size: 100,
    },
    {
      name: 'courseName',
      label: t('과정명'),
    },
    {
      name: 'courseSequence',
      label: t('차수'),
      size: 80,
      meta: {
        cellAlign: 'center',
      },
    },
    {
      name: 'courseTarget',
      label: t('학습 대상'),
      size: 100,
      meta: {
        cellAlign: 'center',
      },
    },
    {
      name: 'coordinatorName',
      label: t('담당자'),
      size: 100,
    },
    {
      name: 'operatorName',
      label: t('운영자'),
      size: 100,
    },
    {
      name: 'isUsed',
      label: t('사용 여부'),
      size: 80,
      meta: {
        cellAlign: 'center',
      },
      render: (info: any) => {
        info.getValue() ? t('사용') : t('미사용');
      },
    },
    {
      name: 'openingYear',
      label: t('개설년도'),
      size: 80,
      meta: {
        cellAlign: 'center',
      },
    },
    {
      name: 'courseValidityStartDate',
      label: t('과정 유효기간'),
      size: 200,
      meta: {
        cellAlign: 'center',
      },
    },
  ],
});
