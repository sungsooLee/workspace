import { useEffect, useCallback, useState } from 'react';
import { useRouterState } from '@tanstack/react-router';
import { t } from 'i18next';
import { Link, useRouter } from '@tanstack/react-router';
import {
  Divider,
  GridBox,
  SplitPanel,
  StatsSummary,
  Tabs,
  useGridBox,
  useGridBoxConfig,
} from '@learnway/ui';
import { useSearchBox, SearchBoxConfig } from '@learnway/hooks';
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { queryOptions as sequenceQueryOptions } from '@entities/learning-sequence/service/learning-sequence.queries';
import { queryOptions as companysQueryOptions } from '@entities/companies/service/companies.queries';
import { queryOptions as departmentQueryOptions } from '@entities/department';
import { SequenceTabDetail } from '@pages/_layout/learning/learning-sequence/-common/type';
import { generateYears } from '@learnway/shared';
import { useFetchEnrollmentSequenceCombo } from '@entities/learning-sequence/service/learning-sequence.hook';
import { useFetchAuthUser } from '@learnway/auth/entities';
import { useWatch } from 'react-hook-form';
import { GridExcelDownloadButton, SearchBox } from '@shared/ui';
import { createColumnHelper } from '@tanstack/react-table';
import { queryOptions } from '@entities/learning-sequence/service/learning-sequence.queries';
import { LMSApiPrefix } from '@learnway/config';

// type StudentsManagementComponentProps = {

// };

const gridConfig: useGridBoxConfig = {
  query: queryOptions.enrollmentRegistList,
  columns: [],
  data: [],
  gridState: {
    page: 0,
    size: 10,
    sort: [],
  },
};

/**
 * NLP_BO_LMS_0045 : 수강생관리
 * @returns
 */
const StudentsManagementComponent = () => {
  const { data: loginUser } = useFetchAuthUser();
  const router = useRouter();
  const routerState = useRouterState();
  const courseIdKey = routerState.location.state?.courseIdKey || 0; // 과정ID
  const courseSequenceIdKey = routerState.location.state?.courseSequenceIdKey || 0; // 차수ID(있는경우 검색조건 값 선택)
  console.log('## courseIdKey =>', courseIdKey);
  console.log('## courseSequenceIdKey =>', courseSequenceIdKey);
  const queryClient = useQueryClient();

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
          options: [], // dynamic handling
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
  const { config: gConfig, gridFetch, data } = useGridBox(gridConfig, getValues);
  const [columns, setColumns] = useState() as any;
  const companyId = useWatch({ control: searchProvider.control, name: 'companyId' });
  const openingYear = useWatch({ control: searchProvider.control, name: 'openingYear' });

  useEffect(() => {
    if (!loginUser) return;
    if (loginUser.activeTenant?.tenantId) {
      setCompanyOption(loginUser.activeTenant?.tenantId);
    }
  }, [loginUser]);

  useEffect(() => {
    setSequenceOption();
  }, [openingYear]);

  const setSequenceOption = async () => {
    console.log('### setSequenceOption');
    const searchValues = getValues();
    const payload = {
      openingYear: searchValues.openingYear,
      courseId: courseIdKey,
    };
    const result = await queryClient.fetchQuery(
      sequenceQueryOptions.enrollmentSequenceCombo(payload),
    );

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
  }, [companyId]);

  const setCompanyOption = async (tenantId: number) => {
    console.log('### setCompanyOption');
    const companys = await queryClient.fetchQuery(companysQueryOptions.tenantCompany(tenantId));
    const companyIdOptions = companys.map((item) => ({
      label: item.name,
      value: item.companyId,
    }));
    setOptions('companyId', companyIdOptions);
  };

  const handleOnSearch = useCallback((data: any) => {
    //   console.log('## payload=>', payload);
    //   setStats(payload);
    //   console.log('setStats completed');
    //   gridFetch(payload);
    //   console.log('gridFetch completed');
  }, []);

  const columnHelper = createColumnHelper<any>();
  return (
    <>
      <SearchBox provider={searchProvider} onSearch={handleOnSearch} />
      <Divider />
      <SplitPanel gap={10}>
        <div>
          <div>현황</div>
          <StatsSummary data={[]} />
        </div>
        <div>
          <div>현황</div>
          <StatsSummary data={[]} />
        </div>
      </SplitPanel>
      <GridBox
        config={gConfig}
        // data={gridData}
        columns={columns}
        multiple={true}
        disabledSelectionToggle
        title={t('수강생 목록')}
        // onRowsSelect={(rows: any) => {
        //   setSelectedRows(rows);
        // }}
        customButtonNode={<></>}
        excelButtons={
          <>
            <GridExcelDownloadButton
              url={`${LMSApiPrefix()}/multilingual/exportExcel`}
              params={getValues()}
            />
          </>
        }
      />
    </>
  );
};

export const StudentsManagement = StudentsManagementComponent;
