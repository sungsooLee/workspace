import { useEffect, useCallback, useState } from 'react';
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
  Tabs,
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
// import { RoundBatchModal } from '../modal/round-batch-modal';
import { DateTimeRangePickerFormField } from '@features/form';
import { EnrollmentRegist } from './enrollment-regist';
import { EnrollmentWait } from './enrollment-wait';
import { EnrollmentCancel } from './enrollment-cancel';

import { queryOptions as companysQueryOptions } from '@entities/companies/service/companies.queries';
import { SequenceTabDetail } from '@pages/_layout/learning/learning-sequence/-common/type';

// type EnrollmentComponentProps = {

// };

/**
 * NLP_BO_LMS_0035,0036,0037 : 수강신청 목록(탭)
 * @returns
 */
const EnrollmentComponent = () => {
  const router = useRouter();
  const [openYear, setOpenYear] = useState<object[]>();
  const [selectedTabKey, setSelectedTabKey] = useState<string>(SequenceTabDetail.ENROLLMENT_REGIST);

  const handleTabChange = (tabKey: string) => {
    if (tabKey !== selectedTabKey) {
      setSelectedTabKey(tabKey);
    }
  };

  useEffect(() => {
    const currentYear = dayjs().year(); // 현재 년도 (number)
    const yearOptions = Array.from({ length: 11 }, (_, i) => {
      const year = currentYear - i;
      return { label: year, value: year };
    });
    setOpenYear(yearOptions);

    setCompanyOption();
  }, []);

  const setCompanyOption = async () => {
    const companys = await queryClient.fetchQuery(companysQueryOptions.tenantCompany(0));
    const companyIdOptions = companys.map((item) => ({
      label: item.name,
      value: item.companyId,
    }));
    setOptions('companyId', companyIdOptions);
  };

  const getStatusOptions = () => {
    switch (selectedTabKey) {
      case SequenceTabDetail.ENROLLMENT_REGIST:
        return [
          { label: '승인대기', value: '1' },
          { label: '조직장결재완료', value: '2' },
          { label: '운영자승인완료', value: '3' },
          { label: '결재', value: '4' },
          { label: '승인 완료', value: '5' },
        ];
      case SequenceTabDetail.ENROLLMENT_WAIT:
        return [
          { label: '대기중', value: '1' },
          { label: '링크 발송', value: '2' },
          { label: '링크 완료', value: '3' },
        ];
      case SequenceTabDetail.ENROLLMENT_CANCEL:
        return [
          { label: '반려', value: '1' },
          { label: '승인', value: '2' },
        ];
      default:
        return []; // fallback: 옵션 없을 때 빈 배열
    }
  };

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
          name: 'sequence',
          type: 'dropdown',
          label: t('LABEL.form.label.sequence', '차수'),
          value: '',
          presetOptionLabel: t('LABEL.form.label.select', '선택'),
          options: [],
        },
        {
          name: 'status',
          type: 'dropdown',
          label: t('LABEL.form.label.sequence', '상태'),
          value: '',
          presetOptionLabel: t('전체'),
          //   options: [
          //     { label: '승인대기', value: '1' },
          //     { label: '조직장결재완료', value: '2' },
          //     { label: '운영자승인완료', value: '3' },
          //     { label: '결재', value: '4' },
          //     { label: '승인 완료', value: '5' },
          //   ],
          options: getStatusOptions(),
        },
        {
          name: 'eduDate',
          type: 'date-range',
          label: t('학습 기간'),
          value: {
            from: undefined,
            to: undefined,
          },
        },
      ],
      [
        {
          name: 'companyId',
          type: 'dropdown',
          label: t('LABEL.form.label.companyId', '회사'),
          format: 'object',
          value: '',
          presetOptionLabel: t('LABEL.form.label.select', '선택'),
          options: [],
        },
        {
          name: 'departmentId',
          type: 'dropdown',
          label: t('LABEL.form.label.departmentId', '부서'),
          format: 'object',
          value: '',
          presetOptionLabel: t('LABEL.form.label.select', '선택'),
          options: [],
        },
        {
          name: 'employeeId',
          type: 'dropdown',
          label: t('LABEL.form.label.employeeId', '사번'),
          format: 'object',
          value: '',
          presetOptionLabel: t('LABEL.form.label.select', '선택'),
          options: [],
        },
        {
          name: 'employeeName',
          type: 'text',
          label: t('이름'),
          value: '',
          placeholder: '',
        },
      ],
    ],
    validator: {},
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
  const { provider: searchProvider, getValues, setValue, setOptions } = useSearchBox(searchConfig);

  const tabItems = [
    {
      title: '수강신청',
      key: SequenceTabDetail.ENROLLMENT_REGIST,
      content: (
        <EnrollmentRegist
          searchProvider={searchProvider}
          getValues={getValues}
          setValue={setValue}
          setOptions={setOptions}
        />
      ),
    },
    {
      title: '수강신청 대기',
      key: SequenceTabDetail.ENROLLMENT_WAIT,
      content: (
        <EnrollmentWait
          searchProvider={searchProvider}
          getValues={getValues}
          setValue={setValue}
          setOptions={setOptions}
        />
      ),
    },
    {
      title: '수강취소/반려',
      key: SequenceTabDetail.ENROLLMENT_CANCEL,
      content: (
        <EnrollmentCancel
          searchProvider={searchProvider}
          getValues={getValues}
          setValue={setValue}
          setOptions={setOptions}
        />
      ),
    },
  ];

  return (
    <Tabs
      items={tabItems}
      type="line"
      size="sm"
      showContentBorder
      selectedTabKey={selectedTabKey}
      onTabChange={handleTabChange}
    />
  );
};

export const Enrollment = EnrollmentComponent;
