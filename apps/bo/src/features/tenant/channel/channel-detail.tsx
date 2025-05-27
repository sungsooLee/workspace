import { FC, useEffect, useMemo, useState, useCallback } from 'react';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
import {
  Button,
  ChipListModalSelectorFormField,
  useGridBox,
  useGridBoxConfig,
  ContentsRow,
  GridBox,
  Input,
  Tabs,
  TextareaFormField,
  RadioGroupFormField,
} from '@learnway/ui';
import { DuplicateCodeGuideText } from '@features/platform/category';
import { cn, DATE_TIME_FORMAT, getDateToString } from '@learnway/shared';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { FormSubTitle, ThumbnailListFormField, ChipListFormField } from '@shared/ui';
import { ContentsHistoryInfoFormField, FormInfoArea, FormRow } from '@shared/ui';

import { FormDisplay } from '@features/form/ui/form-display';
import { TenantChoiceModal, UserChoiceModal } from '@features/shared';
import {
  DynamicFormConfig,
  useDynamicForm,
  CODE_GROUP,
  useSearchBox,
  SearchBoxConfig,
} from '@learnway/hooks';
import { SearchBox } from '@shared/ui/search-box';
import { useGetRequestChannelDetail } from '@entities/channel/service/request-channel.hook';
import { IcoPlus, IcoMinus } from '@learnway/icons';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css'; // form
import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';

const ChannelDetailComponent: FC<any> = ({ mode, method, requestId }) => {
  const { t } = useTranslation();
  const [pageMode, setPageMode] = useState(mode);

  const { provider, fetchData, onSubmit, setFormError, clearFormError, getValues } =
    useDynamicForm(formConfig);
  const { provider: searchProvider, getValues: getSearchValues } = useSearchBox(searchConfig);
  const { config: gConfig, gridFetch, data: gridData } = useGridBox(gridConfig, getValues);

  const [isSuccessCodeCheck, setIsSuccessCodeCheck] = useState(false);
  const [codeCheckState, setCodeCheckState] = useState<'none' | 'success' | 'duplicate' | 'error'>(
    'none',
  );

  const { data: request } = useGetRequestChannelDetail(requestId);

  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const handleOnSearch = useCallback((data: any) => {
    //gridFetch(data);
  }, []);

  useEffect(() => {
    if (pageMode === 'add') {
      const initialData = {
        channelOpenMethod: method,
        channelOpenMethod2: method,
        channelRequestId: request?.channelRequestId,
        channelRequestId2: request?.channelRequestId,
        tenantName: request?.tenantName,
        requestDate:
          request && getDateToString(new Date(request.requestDate), DATE_TIME_FORMAT.DATETIME_SEC),
        status: request && t('pms.channel.ChannelApprovalStatus.' + request.approvalStatusTypecd),
        channelLearningContent: request?.channelLearningContent,
        channelPurposeContent: request?.channelPurposeContent,
        channelName: request?.channelName,
        channelId: request?.channelId,
        channelMainLinkContent: request?.channelMainLinkContent,
        channelType: 'PUBLIC',
        tenantList: request ? [{ tenantId: request.tenantId, tenantName: request.tenantName }] : [],
        channelDivision: 'PUBLIC',
        subscribeType: 'MANUAL',
        channelOwnerList: [],
        isSecureChannel: request ? request.isSecretChannel : true,
        isActived: false,
        isUsed: false,
        profileImageUrl: [],
        imageUrl: [],
        channelGuide: '',
        tags: [],
        channelTargetType: 'USER_GROUP',
        userGroups: [],
        useApprovalProcess: true,
        learningTimeLimit: true,
        dayProgressLimit: true,
        resetProgress: true,
        useTextbook: true,
        useTrainingCost: true,
        useEmploymentInsuranceRefunds: false,
        availabilityOfCertificates: true,
        useLearningPoint: false,
        usePreLevelTesting: true,
        useCourseFlag: true,
      };
      fetchData(initialData);
    } else if (pageMode === 'view') {
      // TODO
    }
  }, [request, pageMode]);
  return (
    <>
      {pageMode === 'add' && method === 'request' && (
        <>
          <FormSubTitle label={'채널 신청 정보'} />
          <ContentsRow>
            <FormRow
              provider={provider}
              name={'channelOpenMethod'}
              element={<RadioGroupFormField disabled={true} />}
            />
          </ContentsRow>
          <ContentsRow>
            <FormRow
              provider={provider}
              name={'channelRequestId'}
              element={<Input disabled={true} />}
            >
              <Button className={dynamicFormStyles.btn_find} variant={'gray'} size={'sm'}>
                {t('조회')}
              </Button>
            </FormRow>
            <FormRow provider={provider} name={'tenantName'} element={<Input disabled={true} />} />
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider} name={'requestDate'} element={<Input disabled={true} />} />
            <FormRow provider={provider} name={'status'} element={<Input disabled={true} />} />
          </ContentsRow>
          <ContentsRow>
            <FormRow
              provider={provider}
              name={'channelLearningContent'}
              element={<TextareaFormField disabled={true} resize={'none'} />}
            />
          </ContentsRow>
          <ContentsRow>
            <FormRow
              provider={provider}
              name={'channelPurposeContent'}
              element={<TextareaFormField disabled={true} resize={'none'} />}
            />
          </ContentsRow>
        </>
      )}
      <FormSubTitle label={'채널 기본 정보'} />

      {method !== 'request' && (
        <ContentsRow>
          <FormRow
            provider={provider}
            name={'channelOpenMethod2'}
            element={<RadioGroupFormField disabled={true} />}
          />
          {pageMode === 'view' && (
            <FormRow
              provider={provider}
              name={'channelRequestId2'}
              element={<Input disabled={true} />}
            />
          )}
        </ContentsRow>
      )}
      <ContentsRow>
        <FormRow provider={provider} name={'channelName'} />
        <FormRow
          provider={provider}
          name={'channelId'}
          element={
            <DuplicateCodeGuideText
              clearFormError={clearFormError}
              checkExists={(data: string) => {
                // checkExists(data, {
                //   onSuccess: (data: any) => {
                //     const isUnique = data;
                //     setIsSuccessCodeCheck(isUnique);
                //     setCodeCheckState(isUnique ? 'success' : 'duplicate');
                //     onFormChange?.({
                //       isDuplicateCode: isUnique,
                //     });
                //   },
                //   onError: () => {
                //     setIsSuccessCodeCheck(false);
                //     setCodeCheckState('error');
                //     onFormChange?.({ isDuplicateCode: false });
                //   },
                // });
              }}
              isSuccess={isSuccessCodeCheck}
              codeCheckState={codeCheckState}
              handleCodeChange=""
              setFormError={setFormError}
            />
          }
        />
      </ContentsRow>
      <ContentsRow>
        <FormRow
          provider={provider}
          name={'channelMainLinkContent'}
          className={dynamicFormStyles.w_half}
          element={<Input disabled={true} />}
        />
      </ContentsRow>
      <ContentsRow>
        <FormRow
          provider={provider}
          name={'channelType'}
          element={<RadioGroupFormField disabled={true} />}
        />
      </ContentsRow>
      <ContentsRow>
        <FormRow
          provider={provider}
          name={'tenantList'}
          element={
            <ChipListModalSelectorFormField
              chipList={{
                labelField: 'tenantName',
                valueField: 'tenantId',
                hideBorder: true,
              }}
              modalConfig={{
                title: '',
                width: 'xl',
                content: <TenantChoiceModal />,
              }}
            />
          }
        />
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider} name={'channelDivision'} />
        <FormRow provider={provider} name={'subscribeType'} />
      </ContentsRow>
      <ContentsRow>
        <FormRow
          provider={provider}
          name="channelOwnerList"
          element={
            <ChipListModalSelectorFormField
              chipList={{
                labelField: 'name',
                valueField: 'userId',
                hideBorder: true,
              }}
              modalConfig={{
                title: '',
                width: 'xl',
                content: <UserChoiceModal />,
              }}
            />
          }
        />
      </ContentsRow>
      <ContentsRow type={'horizontal'}>
        <FormRow provider={provider} name={'isSecureChannel'} />
        <FormRow provider={provider} name={'isActived'} />
      </ContentsRow>
      <ContentsRow type={'horizontal'}>
        <FormRow className={dynamicFormStyles.w_half} provider={provider} name={'isUsed'} />
      </ContentsRow>

      <FormSubTitle label={'채널 홈 정보'} />
      <ContentsRow>
        <FormRow provider={provider} name="profileImageUrl" element={<ThumbnailListFormField />} />
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider} name="imageUrl" element={<ThumbnailListFormField />} />
      </ContentsRow>
      <ContentsRow>
        <FormRow
          provider={provider}
          name={'channelGuide'}
          element={<TextareaFormField resize={'none'} />}
        />
      </ContentsRow>
      <ContentsRow>
        <FormRow
          provider={provider}
          name={'tags'}
          element={
            <ChipListFormField
              chipListConfig={{
                showInput: true,
                labelField: 'label',
                valueField: 'value',
                wordwrap: true,
              }}
            />
          }
        />
      </ContentsRow>

      <FormSubTitle label={'채널 대상자 정보'} />
      <ContentsRow>
        <FormRow
          className={dynamicFormStyles.w_half}
          provider={provider}
          name={'channelTargetType'}
        />
      </ContentsRow>
      <ContentsRow>
        <FormRow
          provider={provider}
          name={'userGroups'}
          element={
            <ChipListModalSelectorFormField
              showAddButton
              chipList={{
                showInput: false,
                labelField: 'label',
                valueField: 'value',
                wordwrap: true,
              }}
              actionNode={<Button variant="text" label={t('대상자')} />}
            />
          }
        />
      </ContentsRow>
      <ContentsRow>
        <div className={formStyles.form_item}>
          <label className={formStyles.form_label}>
            <span className={formStyles.form_text}>채널 대상자 제외</span>
          </label>
          <p className={formStyles.guide_text}>선택한 사용자는 해당 채널 대상자에서 제외됩니다.</p>
        </div>
      </ContentsRow>
      <SearchBox provider={searchProvider} onSearch={handleOnSearch} />

      <div className="grid_wrap">
        <GridBox
          config={gConfig}
          columns={columns}
          height={440}
          // showColumnSettings={false}
          // showNumberingColumn={true}
          multiple
          title="채널 대상자 제외 목록"
          customButtonNode={
            <>
              <Button
                variant="text"
                size="sm"
                //onClick={handleAddMode}
              >
                <IcoPlus width={16} height={16} stroke="#131C30" />
                {t('LABEL.button.add')}
              </Button>
              <Button
                variant="text"
                size="sm"
                //onClick={handleAddMode}
              >
                <IcoMinus width={16} height={16} stroke="#131C30" />
                {t('LABEL.button.delete')}
              </Button>
            </>
          }
        />
      </div>

      <FormSubTitle label={'교육 및 과정 연관 설정 정보'} />
      <ContentsRow type={'horizontal'}>
        <FormRow provider={provider} name={'useApprovalProcess'} />
        <FormRow provider={provider} name={'learningTimeLimit'} />
      </ContentsRow>
      <ContentsRow type={'horizontal'}>
        <FormRow provider={provider} name={'dayProgressLimit'} />
        <FormRow provider={provider} name={'resetProgress'} />
      </ContentsRow>
      <ContentsRow type={'horizontal'}>
        <FormRow provider={provider} name={'useTextbook'} />
        <FormRow provider={provider} name={'useTrainingCost'} />
      </ContentsRow>
      <ContentsRow type={'horizontal'}>
        <FormRow provider={provider} name={'useEmploymentInsuranceRefunds'} />
        <FormRow provider={provider} name={'availabilityOfCertificates'} />
      </ContentsRow>
      <ContentsRow type={'horizontal'}>
        <FormRow provider={provider} name={'useLearningPoint'} />
        <FormRow provider={provider} name={'usePreLevelTesting'} />
      </ContentsRow>
      <ContentsRow type={'horizontal'}>
        <FormRow provider={provider} name={'useCourseFlag'} className={dynamicFormStyles.w_half} />
      </ContentsRow>
      {mode === 'view' && <ContentsHistoryInfoFormField />}
    </>
  );
};

export const ChannelDetail = ChannelDetailComponent;

const formConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'channelOpenMethod',
      type: 'radio-group',
      label: t('채널 개설 방식'),
      value: 'request',
      options: [
        { value: 'request', label: '채널 신청 개설' },
        { value: 'direct', label: '채널 직접 개설' },
      ],
    },
    {
      name: 'channelOpenMethod2',
      type: 'radio-group',
      label: t('채널 개설 방식'),
      value: 'request',
      options: [
        { value: 'request', label: '채널 신청 개설' },
        { value: 'direct', label: '채널 직접 개설' },
      ],
    },
    {
      name: 'channelRequestId',
      type: 'text',
      label: t('신청 ID'),
      value: '',
      placeholder: '',
    },
    {
      name: 'channelRequestId2',
      type: 'text',
      label: t('신청 ID'),
      value: '',
      placeholder: '',
    },
    {
      name: 'tenantName',
      type: 'text',
      label: t('테넌트'),
      value: '',
      placeholder: '',
    },
    {
      name: 'requestDate',
      type: 'text',
      label: t('신청일'),
      value: '',
      placeholder: '',
    },
    {
      name: 'status',
      type: 'text',
      label: t('신청 상태'),
      value: '',
      placeholder: '',
    },
    {
      name: 'channelLearningContent',
      type: 'textarea',
      label: t('채널 학습 대상'),
      value: '',
      placeholder: '',
      maxLength: 500,
    },
    {
      name: 'channelPurposeContent',
      type: 'textarea',
      label: t('채널 목적'),
      value: '',
      placeholder: '',
      maxLength: 500,
    },
    {
      name: 'channelName',
      type: 'text',
      label: t('채널명'),
      value: '',
      placeholder: '',
    },
    {
      name: 'channelId',
      type: 'custom',
      label: t('채널 아이디'),
      value: '',
      placeholder: '',
    },
    {
      name: 'channelMainLinkContent',
      type: 'text',
      label: t('채널 URL'),
      value: '',
      placeholder: '',
    },
    {
      name: 'channelType',
      type: 'radio-group',
      label: t('채널 유형'),
      value: 'PUBLIC',
      options: [
        {
          value: 'PUBLIC',
          label: '일반 채널',
        },
        {
          value: 'UNIVERSAL',
          label: '유니버셜 채널',
        },
      ],
    },
    {
      name: 'tenantList',
      label: t('테넌트'),
      type: 'custom',
      value: [],
      format: 'array',
      guideText: '일반 채널은 1개의 테넌트만 선택할 수 있습니다.',
    },
    {
      name: 'channelDivision',
      type: 'radio-group',
      label: t('채널 구분'),
      value: 'PUBLIC',
      optionsConfig: {
        codeGroup: CODE_GROUP['pms.channel.ChannelSecretType'],
      },
    },
    {
      name: 'subscribeType',
      type: 'radio-group',
      label: t('구독 방식'),
      value: 'MANUAL',
      options: [
        { label: '수동 구독', value: 'MANUAL' },
        { label: '자동 구독', value: 'AUTOMATIC' },
      ],
      guideText: '자동 구독은 채널 대상자를 구독자로 자동 설정합니다.',
    },
    {
      name: 'channelOwnerList',
      label: t('채널 소유자'),
      type: 'custom',
      format: 'array',
      value: [],
      placeholder: '',
    },
    {
      name: 'isSecureChannel',
      type: 'switch',
      label: t('보안 채널 여부'),
      value: true,
      placeholder: '',
      switchConfig: {
        label: (value: boolean) => (value ? '보안 적용' : '보안 미적용'),
        guideText: (value: boolean) =>
          value
            ? t('보안채널 설정 시 학습자원의 불법 배포와 보안 위협에 강합니다.')
            : t('보안채널 미 설정 시 학습자원의 불법 배포와 보안 위협에 취약합니다.'),
      },
    },
    {
      name: 'isActived',
      type: 'switch',
      label: t('활성화 여부'),
      value: false,
      placeholder: '',
      guideText: t('채널이 활성회되어야 과정을 등록할 수 있습니다.'),
      switchConfig: {
        label: (value: boolean) => (value ? '활성화' : '비활성화'),
      },
    },
    {
      name: 'isUsed',
      type: 'switch',
      label: t('사용 여부'),
      value: false,
      placeholder: '',
      guideText: t('채널이 사용 상태인 경우 학습자가 채널에 접속할 수 있습니다.'),
      switchConfig: {
        label: (value: boolean) => (value ? '사용' : '미사용'),
      },
    },
    {
      label: t('프로필'),
      name: 'profileImageUrl',
      type: 'custom',
      format: 'array',
      value: [],
      guideText: t(
        '파일 사이즈 000 x 000 / 확장자 JPEG, JPG, PNG, GIF / 업로드 가능 1개 / 파일용량 최대 50 MB',
      ),
    },
    {
      label: t('이미지'),
      name: 'imageUrl',
      type: 'custom',
      format: 'array',
      value: [],
      guideText: t(
        '파일 사이즈 000 x 000 / 확장자 JPEG, JPG, PNG, GIF / 업로드 가능 1개 / 파일용량 최대 50 MB',
      ),
    },
    {
      name: 'channelGuide',
      type: 'textarea',
      label: t('채널 안내'),
      value: '',
      placeholder: '',
      maxLength: 500,
    },
    {
      label: t('태그'),
      name: 'tags',
      format: 'array',
      type: 'chip-list',
      guideText: t('태그는 최대 20개까지 등록할 수 있습니다.'),
      value: [],
    },
    {
      name: 'channelTargetType',
      type: 'radio-group',
      label: t('채널 대상자 설정'),
      value: 'USER_GROUP',
      options: [
        { label: '유저그룹 설정', value: 'USER_GROUP' },
        { label: '직접 설정', value: 'DIRECT' },
      ],
      guideText: '선택한 1개의 방식만 채널 대상자로 설정됩니다.',
    },
    {
      name: 'userGroups',
      type: 'custom',
      label: t('LABEL.form.label.userGroupSetting'),
      format: 'array',
      placeholder: '',
      description: '',
      value: [],
    },
    {
      name: 'useApprovalProcess',
      type: 'switch',
      label: t('수강 신청 결재라인 사용'),
      value: true,
      placeholder: '',
      guideText: t('수강 신청할 때 승인하는 결제 라인을 설정합니다.'),
      switchConfig: {
        label: (value: boolean) => (value ? '사용' : '미사용'),
      },
    },
    {
      name: 'learningTimeLimit',
      type: 'switch',
      label: t('학습시간 제한'),
      value: true,
      placeholder: '',
      guideText: t('정해진 시간에만 학습을 할 수 있도록 설정합니다.'),
      switchConfig: {
        label: (value: boolean) => (value ? '사용' : '미사용'),
      },
    },
    {
      name: 'dayProgressLimit',
      type: 'switch',
      label: t('1일 진도 제한'),
      value: true,
      placeholder: '',
      guideText: t('하루에 학습할 수 있는 진도 제한을 설정합니다.'),
      switchConfig: {
        label: (value: boolean) => (value ? '사용' : '미사용'),
      },
    },
    {
      name: 'resetProgress',
      type: 'switch',
      label: t('진도 초기화'),
      value: true,
      placeholder: '',
      guideText: t('수강했던 학습 자원의 재학습 여부를 설정합니다.'),
      switchConfig: {
        label: (value: boolean) => (value ? '사용' : '미사용'),
      },
    },
    {
      name: 'useTextbook',
      type: 'switch',
      label: t('교재 사용'),
      value: true,
      placeholder: '',
      guideText: t('과정 등록 시 교재와 교재 정보 사용 여부를 설정합니다.'),
      switchConfig: {
        label: (value: boolean) => (value ? '사용' : '미사용'),
      },
    },
    {
      name: 'useTrainingCost',
      type: 'switch',
      label: t('1인당 교육비 사용'),
      value: true,
      placeholder: '',
      guideText: t('교육비 사용 여부를 설정합니다.'),
      switchConfig: {
        label: (value: boolean) => (value ? '사용' : '미사용'),
      },
    },
    {
      name: 'useEmploymentInsuranceRefunds',
      type: 'switch',
      label: t('고용보험 환급 사용'),
      value: false,
      placeholder: '',
      guideText: t('과정 등록 시 고융보험 환급 사용 여부를 설정합니다.'),
      switchConfig: {
        label: (value: boolean) => (value ? '사용' : '미사용'),
      },
    },
    {
      name: 'availabilityOfCertificates',
      type: 'switch',
      label: t('수료증 제공 여부'),
      value: true,
      placeholder: '',
      guideText: t('과정 이수 시 수료증 제공 여부를 설정합니다.'),
      switchConfig: {
        label: (value: boolean) => (value ? '사용' : '미사용'),
      },
    },
    {
      name: 'useLearningPoint',
      type: 'switch',
      label: t('학습 포인트(마일리지) 사용'),
      value: false,
      placeholder: '',
      guideText: t('학습 포인트 사용 여부를 설정합니다.'),
      switchConfig: {
        label: (value: boolean) => (value ? '사용' : '미사용'),
      },
    },
    {
      name: 'usePreLevelTesting',
      type: 'switch',
      label: t('사전 레벨 테스트 사용'),
      value: true,
      placeholder: '',
      guideText: t('학습자가 해당 과청 수강 신청 시 사전 레벨 테스트 필요 여부를 설정합니다.'),
      switchConfig: {
        label: (value: boolean) => (value ? '사용' : '미사용'),
      },
    },
    {
      name: 'useCourseFlag',
      type: 'switch',
      label: t('과정 플래그 사용'),
      value: true,
      placeholder: '',
      guideText: t(
        '수강신청 마스터, 과정 추출, 교육 통계에 사용하는 과정 분류 값 사용 여부를 설정합니다.',
      ),
      switchConfig: {
        label: (value: boolean) => (value ? '사용' : '미사용'),
      },
    },
  ],
  validator: {
    channelName: true,
    channelId: true,
    tenantList: true,
    channelOwnerList: true,
    profileImageUrl: true,
    imageUrl: true,
    channelGuide: true,
    tags: true,
    channelTargetType: true,
    userGroups: true,
  },
};

const searchConfig: SearchBoxConfig = {
  builders: [
    [
      {
        name: 'company',
        type: 'dropdown',
        label: t('회사'),
        value: '',
        optionsConfig: {
          codeGroup: CODE_GROUP['manual.company.companyCode'],
        },
      },
      {
        name: 'userNo',
        type: 'text',
        label: t('사번'),
        value: '',
        placeholder: '',
      },
      {
        name: 'userName',
        type: 'text',
        label: t('이름'),
        value: '',
        placeholder: '',
      },
    ],
  ],
};

const gridConfig: useGridBoxConfig = {
  query: '',
  columns: [],
  data: [],

  pagination: {
    pageSize: 10,
    pageIndex: 0,
    totalRows: 0,
  },
  excel: {
    upload: '/upload',
  },
};

const columnHelper = createColumnHelper<any>();

const columns = [
  columnHelper.accessor('company', {
    cell: (info) => info.getValue(),
    header: '회사',
    size: 200,
    enableGrouping: false,
  }),
  columnHelper.accessor('part', {
    cell: (info) => info.getValue(),
    header: '본부/사업부',
    size: 200,
    enableGrouping: false,
  }),
  columnHelper.accessor('dept', {
    cell: (info) => info.getValue(),
    header: '부서',
    size: 200,
    enableGrouping: false,
  }),
  columnHelper.accessor('affiliation', {
    cell: (info) => info.getValue(),
    header: '소속',
    size: 200,
    enableGrouping: false,
  }),
  columnHelper.accessor('employeeNumber', {
    cell: (info) => info.getValue(),
    header: '사번',
    size: 200,
    enableGrouping: false,
  }),
  columnHelper.accessor('name', {
    cell: (info) => info.getValue(),
    header: '이름',
    size: 200,
    enableGrouping: false,
  }),
  columnHelper.accessor('employmentStatus', {
    cell: (info) => info.getValue(),
    header: '재직여부',
    size: 200,
    enableGrouping: false,
  }),
  columnHelper.accessor('accountStatus', {
    cell: (info) => info.getValue(),
    header: '계정상태',
    size: 100,
  }),
];
