import { queryOptions as companysQueryOptions } from '@entities/companies/service/companies.queries';
import { queryOptions as departmentQueryOptions } from '@entities/department';
import { queryOptions as sequenceQueryOptions } from '@entities/learning-sequence/service/learning-sequence.queries';
import { useFetchAuthUser } from '@learnway/auth/entities';
import { SearchBoxConfig, useSearchBox } from '@learnway/hooks';
import { generateYears } from '@learnway/shared';
import { Tabs } from '@learnway/ui';
import { SequenceTabDetail } from '@pages/_layout/learning/learning-sequence/-common/type';
import { usePageState } from '@shared/lib';
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { useEnrollmentStore } from '../store/use-enrollment-store';
import { EnrollmentCancel } from './enrollment-cancel';
import { EnrollmentRegist } from './enrollment-regist';
import { EnrollmentWait } from './enrollment-wait';

type EnrollmentComponentProps = {
  courseId?: number; // 과정 ID
  courseName?: string; // 과정명
  courseType?: string; // 과정 타입
  sequenceId?: number; // 차수 ID
};

/**
 * NLP_BO_LMS_0035,0036,0037 : 수강신청 목록(탭)
 * @returns
 */
const EnrollmentComponent = () => {
  const { data: loginUser } = useFetchAuthUser();
  const { enrollmentCreateInfo, setEnrollmentCreateInfo } = useEnrollmentStore();
  const { courseId, courseName, courseType, sequenceId } = usePageState<EnrollmentComponentProps>();
  const [selectedTabKey, setSelectedTabKey] = useState<string>(SequenceTabDetail.ENROLLMENT_REGIST);
  const queryClient = useQueryClient();

  useEffect(() => {
    setEnrollmentCreateInfo({ courseId, courseName, courseType, sequenceId });
  }, []);

  const getStatusOptions = () => {
    switch (selectedTabKey) {
      case SequenceTabDetail.ENROLLMENT_REGIST:
        return [
          { label: t('결재/승인 완료'), value: 'ENROLL_DONE' },
          { label: t('신청중'), value: 'ENROLL_REQUEST' },
          { label: t('취소'), value: 'CANCEL_DONE' },
          { label: t('반려'), value: 'REJECT_DONE' },
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
          options: generateYears(10),
        },
        {
          name: 'courseSequenceId',
          type: 'dropdown',
          label: t('LABEL.form.label.sequence', '차수'),
          format: 'number',
          value: enrollmentCreateInfo.sequenceId,
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
  const { provider: searchProvider, getValues, setValue, setOptions } = useSearchBox(searchConfig);

  const companyId = useWatch({ control: searchProvider.control, name: 'companyId' });
  const openingYear = useWatch({ control: searchProvider.control, name: 'openingYear' });

  const handleTabChange = (tabKey: string) => {
    if (tabKey !== selectedTabKey) {
      setSelectedTabKey(tabKey);
    }
  };

  useEffect(() => {
    if (!loginUser) return;
    if (loginUser.activeTenant?.tenantId) {
      setCompanyOption(loginUser.activeTenant?.tenantId);
    }
  }, [selectedTabKey, loginUser]);

  useEffect(() => {
    setSequenceOption();
  }, [selectedTabKey, openingYear]);

  const setSequenceOption = async () => {
    const searchValues = getValues();
    const payload = {
      openingYear: searchValues.openingYear,
      courseId: enrollmentCreateInfo.courseId,
    };
    const result = await queryClient.fetchQuery(
      sequenceQueryOptions.enrollmentSequenceCombo(payload),
    );
    // setOptions('courseSequenceId', [
    //   { label: '1', value: 1 },
    //   { label: '2', value: 2 },
    // ]);
    if (result) {
      console.log('result=>', result);
      const sequenceIdOptions = result.map((item: any) => ({
        label: item.courseSequenceName,
        value: item.courseSequenceId,
      }));
      setOptions('courseSequenceId', sequenceIdOptions);
    }
  };

  useEffect(() => {
    setValue('deptId', '');
    if (!companyId && companyId !== 0) return;

    (async () => {
      const { content } = await queryClient.fetchQuery(departmentQueryOptions.list({ companyId }));
      if (content)
        setOptions(
          'deptId',
          content.map((_: any) => ({ value: _.deptId, label: _.deptName })),
        );
    })();
  }, [selectedTabKey, companyId]);

  const setCompanyOption = async (tenantId: number) => {
    const companys = await queryClient.fetchQuery(companysQueryOptions.tenantCompany(tenantId));
    const companyIdOptions = companys.map((item) => ({
      label: item.name,
      value: item.companyId,
    }));
    setOptions('companyId', companyIdOptions);
  };

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
