import { useEffect, useCallback, useState } from 'react';
import { useRouterState } from '@tanstack/react-router';
import { t } from 'i18next';
import { Link, useRouter } from '@tanstack/react-router';
import { Tabs } from '@learnway/ui';
import { useSearchBox, SearchBoxConfig } from '@learnway/hooks';
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
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
  const routerState = useRouterState();
  const courseId = routerState.location.state?.courseIdKey || 0; // 과정ID
  const courseSequenceId = routerState.location.state?.courseSequenceIdKey || 0; // 차수ID(있는경우 검색조건 값 선택)
  console.log('## courseId =>', courseId);
  console.log('## courseSequenceId =>', courseSequenceId);
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
          { label: t('ENROLL_DONE'), value: 'ENROLL_DONE' },
          { label: t('ENROLL_REQUEST'), value: 'ENROLL_REQUEST' },
          { label: t('CANCEL_DONE'), value: 'CANCEL_DONE' },
          { label: t('REJECT_DONE'), value: 'REJECT_DONE' },
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
          name: 'openingYear',
          type: 'dropdown',
          label: t('LABEL.form.label.openingYear', '개설연도'),
          value: dayjs().year(),
          format: 'number',
          presetOptionLabel: t('LABEL.form.label.select', '선택'),
          options: openYear,
        },
        {
          name: 'courseSequenceId',
          type: 'dropdown',
          label: t('LABEL.form.label.sequence', '차수'),
          value: '',
          presetOptionLabel: t('LABEL.form.label.select', '선택'),
          options: [],
        },
        {
          name: 'enrollStatusType',
          type: 'dropdown',
          label: t('LABEL.form.label.sequence', '상태'),
          value: '',
          presetOptionLabel: t('전체'),
          options: getStatusOptions(), // dynamic handling
        },
        {
          name: 'learningRange', // learningStartDate, learningEndDate
          type: 'date-range',
          label: t('학습 기간'),
          value: {
            from: new Date(),
            to: new Date(),
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
          name: 'deptId',
          type: 'dropdown',
          label: t('LABEL.form.label.deptId', '부서'),
          format: 'object',
          value: '',
          presetOptionLabel: t('LABEL.form.label.select', '선택'),
          options: [],
        },
        {
          name: 'employeeNumber',
          type: 'dropdown',
          label: t('LABEL.form.label.employeeNumber', '사번'),
          format: 'object',
          value: '',
          presetOptionLabel: t('LABEL.form.label.select', '선택'),
          options: [],
        },
        {
          name: 'name',
          type: 'text',
          label: t('이름'),
          value: '',
          placeholder: '',
        },
      ],
    ],
    validator: {
      openingYear: true,
      courseSequenceId: true,
    },
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
          courseId={courseId}
          courseSequenceId={courseSequenceId}
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
          courseId={courseId}
          courseSequenceId={courseSequenceId}
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
          courseId={courseId}
          courseSequenceId={courseSequenceId}
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
