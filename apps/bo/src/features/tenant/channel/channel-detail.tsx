import { FC, useEffect, useMemo, useState } from 'react';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
import {
  Button,
  ContentsRow,
  Input,
  ChipListModalSelectorFormField,
  Tabs,
  useGridBox,
  GridBox,
  TextareaFormField,
} from '@learnway/ui';

import { cn } from '@learnway/shared';
import { FormInfoArea, FormRow, ContentsHistoryInfoFormField } from '@shared/ui';
import { FormDisplay } from '@features/form/ui/form-display';
import { TenantChoiceModal } from '@features/shared';
import { DynamicFormConfig, useDynamicForm } from '@learnway/hooks';

import { IcoFormRequired } from '@learnway/icons';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css'; // form

const ChannelDetailComponent: FC<any> = ({ mode, channelId }) => {
  //TODO. mode add 인 경우 분기 처리
  const { t } = useTranslation();
  const [pageMode, setPageMode] = useState(mode);

  const { provider, fetchData, onSubmit, onFormChange, setFormError, clearFormError } =
    useDynamicForm(formConfig);

  const { config: userListGridConfig } = useGridBox(gridConfig);
  const { config: userRestraintGridConfig } = useGridBox(gridConfig);

  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const [selectedTabKey] = useState<string>('USER_GROUP_LIST');

  const items = [
    {
      title: '유저그룹 설정',
      key: 'USER_GROUP_LIST',
      content: (
        <FormRow provider={provider} name={'userGroups'}>
          <FormInfoArea>
            <Button variant="text" size="sm">
              + {t('LABEL.button.add')}
            </Button>
          </FormInfoArea>
        </FormRow>
      ),
    },
    {
      title: '직접 설정',
      key: 'USER_LIST',
      content: (
        <GridBox
          title={'대상자 목록'}
          multiple={true}
          config={userListGridConfig}
          showNumberingColumn={true}
          pagination={{
            pageNumber: 0,
            totalPages: 33,
            onPageChange: setPageIndex,
            onPageSizeChange: setPageSize,
          }}
          height={439}
        />
      ),
    },
    {
      title: '학습자 제외 설정',
      key: 'USER_RESTRAINT_LIST',
      content: (
        <GridBox
          title={'대상자 목록'}
          multiple={true}
          config={userRestraintGridConfig}
          showNumberingColumn={true}
          pagination={{
            pageNumber: 0,
            totalPages: 33,
            onPageChange: setPageIndex,
            onPageSizeChange: setPageSize,
          }}
          height={439}
        />
      ),
    },
  ];

  useEffect(() => {
    // TODO.
  }, [pageMode]);
  return (
    <>
      <ContentsRow>
        <FormRow provider={provider} name={'channelId'} element={<Input disabled={true} />}>
          <p className={formStyles.info_text}>{'(접수ID 45785566322)'}</p>
        </FormRow>
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider} name={'channelName'} />
      </ContentsRow>
      <ContentsRow>
        <FormRow
          provider={provider}
          name={'channelLearningContent'}
          element={<TextareaFormField resize="none" size="sm" />}
        />
        <FormRow
          provider={provider}
          name={'channelPurposeContent'}
          element={<TextareaFormField resize="none" size="sm" />}
        />
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider} name={'channelMainLinkContent'}>
          <Button variant={'gray'} size={'sm'}>
            {'중복확인'}
          </Button>
          <Button variant={'gray'} size={'sm'}>
            {'자동생성'}
          </Button>
        </FormRow>
      </ContentsRow>
      <ContentsRow type={'horizontal'}>
        <FormRow
          provider={provider}
          className={formStyles.direction_col}
          name={'isSecretChannel'}
        />
        <FormRow provider={provider} name={'isSecureChannel'} />
      </ContentsRow>
      <ContentsRow>
        <FormRow
          provider={provider}
          name={'channelOwnerId'}
          element={
            <ChipListModalSelectorFormField
              chipList={{
                labelField: 'name',
                valueField: 'value',
                hideBorder: true,
              }}
              modalConfig={{
                title: '',
                width: 'xl',
                //content: <TenantManagerModal />,
              }}
            />
          }
        />
      </ContentsRow>
      {/** 플랫폼 담당자만 노출 */}
      <ContentsRow>
        <FormRow provider={provider} name={'isUniversalChannel'} />
      </ContentsRow>
      {/** 플랫폼 담당자만 노출 */}
      <ContentsRow>
        <FormRow provider={provider} name={'isAllTenant'} />
      </ContentsRow>
      {/** 플랫폼 담당자가 직접 선택 or 테넌트 관리자만 노출 */}
      <FormDisplay provider={provider} dependencies={[{ name: 'isAllTenant', value: 'N' }]}>
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
      </FormDisplay>
      <ContentsRow>
        <FormRow
          provider={provider}
          name={'courseAvailableSetting'}
          element={
            <ChipListModalSelectorFormField
              chipList={{
                labelField: 'name',
                valueField: 'value',
                hideBorder: true,
              }}
              modalConfig={{
                title: '',
                width: 'xl',
                //content: <TenantModal />,
              }}
            />
          }
        />
      </ContentsRow>

      <ContentsRow>
        <div className={formStyles.form_item}>
          <label htmlFor="name-learning" className={formStyles.form_label}>
            <span className={formStyles.form_text}>학습 대상자 설정</span>
            <span className={cn(formStyles.status, formStyles.required)}>
              <IcoFormRequired width={12} height={12} />
            </span>
          </label>
          <div className={formStyles.input_box}>
            <Tabs selectedTabKey={selectedTabKey} items={items} type="round" />
          </div>
        </div>
      </ContentsRow>

      <ContentsHistoryInfoFormField />
    </>
  );
};

export const ChannelDetail = ChannelDetailComponent;

const formConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'channelId',
      type: 'text',
      label: t('채널ID'),
      value: '',
      placeholder: '',
    },
    {
      name: 'channelName',
      type: 'text',
      label: t('채널명'),
      value: '',
      placeholder: '',
      maxLength: 40,
    },
    {
      name: 'channelLearningContent',
      type: 'textarea',
      label: t('채널 학습대상'),
      value: '',
      placeholder: '',
      maxLength: 2000,
    },
    {
      name: 'channelPurposeContent',
      type: 'textarea',
      label: t('채널 운영목적'),
      value: '',
      placeholder: '',
      maxLength: 2000,
    },
    {
      name: 'channelMainLinkContent',
      type: 'text',
      label: t('채널주소'),
      value: '',
      placeholder: '',
    },
    {
      name: 'isSecretChannel',
      type: 'radio-group',
      label: t('채널구분'),
      value: 'N',
      options: [
        {
          value: 'N',
          label: t('공개'),
        },
        {
          value: 'Y',
          label: t('비밀'),
        },
      ],
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
      name: 'channelOwnerId',
      label: t('채널 소유자'),
      type: 'custom',
      value: '',
      placeholder: '이름 / 소속 / 팀명',
    },
    {
      name: 'isUniversalChannel',
      type: 'radio-group',
      label: t('채널유형'),
      value: 'N',
      options: [
        {
          value: 'Y',
          label: t('유니버설'),
        },
        {
          value: 'N',
          label: t('일반'),
        },
      ],
    },
    {
      name: 'isAllTenant',
      type: 'radio-group',
      label: t('테넌트 선택'),
      value: 'N',
      options: [
        {
          value: 'Y',
          label: t('모든 테넌트'),
        },
        {
          value: 'N',
          label: t('직접 선택'),
        },
      ],
    },
    {
      name: 'tenantList',
      label: t('테넌트 목록'),
      type: 'custom',
      value: [],
      format: 'array',
    },
    {
      name: 'courseAvailableSetting',
      label: t('과정 사용 가능한 설정'),
      type: 'custom',
      value: '',
    },
    {
      name: 'userGroups',
      type: 'chip-list',
      label: t('LABEL.form.label.userGroupSetting'),
      format: 'array',
      placeholder: '',
      description: '',
      value: [],
      chipListConfig: {
        showInput: false,
        labelField: 'label',
        valueField: 'value',
        wordwrap: true,
      },
    },
  ],
  validator: {
    channelName: true,
    channelMainLinkContent: true,
    isSecretChannel: true,
    isSecureChannel: true,
    isUniversalChannel: true,
    isAllTenant: true,
    tenantList: true,
    courseAvailableSetting: true,
    userGroups: true,
  },
};

const gridConfig = {
  query: '',
  data: [
    {
      name: '김현대',
      company: '현대자동차',
      workPlace: '경영지원본부',
      dept: '경영지원실',
      affiliation: '경영지원1팀',
      appellation: '경영지원1팀',
      employeeNumber: '1234567',
      tenure: '재직',
      stateCode: '정상',
    },
    {
      name: '김현대',
      company: '현대자동차',
      workPlace: '경영지원본부',
      dept: '경영지원실',
      affiliation: '경영지원1팀',
      appellation: '경영지원1팀',
      employeeNumber: '1234567',
      tenure: '재직',
      stateCode: '정상',
    },
    {
      name: '김현대',
      company: '현대자동차',
      workPlace: '경영지원본부',
      dept: '경영지원실',
      affiliation: '경영지원1팀',
      appellation: '경영지원1팀',
      employeeNumber: '1234567',
      tenure: '재직',
      stateCode: '정상',
    },
    {
      name: '김현대',
      company: '현대자동차',
      workPlace: '경영지원본부',
      dept: '경영지원실',
      affiliation: '경영지원1팀',
      appellation: '경영지원1팀',
      employeeNumber: '1234567',
      tenure: '재직',
      stateCode: '정상',
    },
    {
      name: '김현대',
      company: '현대자동차',
      workPlace: '경영지원본부',
      dept: '경영지원실',
      affiliation: '경영지원1팀',
      appellation: '경영지원1팀',
      employeeNumber: '1234567',
      tenure: '재직',
      stateCode: '정상',
    },
    {
      name: '김현대',
      company: '현대자동차',
      workPlace: '경영지원본부',
      dept: '경영지원실',
      affiliation: '경영지원1팀',
      appellation: '경영지원1팀',
      employeeNumber: '1234567',
      tenure: '재직',
      stateCode: '정상',
    },
    {
      name: '김현대',
      company: '현대자동차',
      workPlace: '경영지원본부',
      dept: '경영지원실',
      affiliation: '경영지원1팀',
      appellation: '경영지원1팀',
      employeeNumber: '1234567',
      tenure: '재직',
      stateCode: '정상',
    },
    {
      name: '김현대',
      company: '현대자동차',
      workPlace: '경영지원본부',
      dept: '경영지원실',
      affiliation: '경영지원1팀',
      appellation: '경영지원1팀',
      employeeNumber: '1234567',
      tenure: '재직',
      stateCode: '정상',
    },
    {
      name: '김현대',
      company: '현대자동차',
      workPlace: '경영지원본부',
      dept: '경영지원실',
      affiliation: '경영지원1팀',
      appellation: '경영지원1팀',
      employeeNumber: '1234567',
      tenure: '재직',
      stateCode: '정상',
    },
    {
      name: '김현대',
      company: '현대자동차',
      workPlace: '경영지원본부',
      dept: '경영지원실',
      affiliation: '경영지원1팀',
      appellation: '경영지원1팀',
      employeeNumber: '1234567',
      tenure: '재직',
      stateCode: '정상',
    },
    {
      name: '김현대',
      company: '현대자동차',
      workPlace: '경영지원본부',
      dept: '경영지원실',
      affiliation: '경영지원1팀',
      appellation: '경영지원1팀',
      employeeNumber: '1234567',
      tenure: '재직',
      stateCode: '정상',
    },
    {
      name: '김현대',
      company: '현대자동차',
      workPlace: '경영지원본부',
      dept: '경영지원실',
      affiliation: '경영지원1팀',
      appellation: '경영지원1팀',
      employeeNumber: '1234567',
      tenure: '재직',
      stateCode: '정상',
    },
    {
      name: '김현대',
      company: '현대자동차',
      workPlace: '경영지원본부',
      dept: '경영지원실',
      affiliation: '경영지원1팀',
      appellation: '경영지원1팀',
      employeeNumber: '1234567',
      tenure: '재직',
      stateCode: '정상',
    },
    {
      name: '김현대',
      company: '현대자동차',
      workPlace: '경영지원본부',
      dept: '경영지원실',
      affiliation: '경영지원1팀',
      appellation: '경영지원1팀',
      employeeNumber: '1234567',
      tenure: '재직',
      stateCode: '정상',
    },
    {
      name: '김현대',
      company: '현대자동차',
      workPlace: '경영지원본부',
      dept: '경영지원실',
      affiliation: '경영지원1팀',
      appellation: '경영지원1팀',
      employeeNumber: '1234567',
      tenure: '재직',
      stateCode: '정상',
    },
    {
      name: '김현대',
      company: '현대자동차',
      workPlace: '경영지원본부',
      dept: '경영지원실',
      affiliation: '경영지원1팀',
      appellation: '경영지원1팀',
      employeeNumber: '1234567',
      tenure: '재직',
      stateCode: '정상',
    },
    {
      name: '김현대',
      company: '현대자동차',
      workPlace: '경영지원본부',
      dept: '경영지원실',
      affiliation: '경영지원1팀',
      appellation: '경영지원1팀',
      employeeNumber: '1234567',
      tenure: '재직',
      stateCode: '정상',
    },
    {
      name: '김현대',
      company: '현대자동차',
      workPlace: '경영지원본부',
      dept: '경영지원실',
      affiliation: '경영지원1팀',
      appellation: '경영지원1팀',
      employeeNumber: '1234567',
      tenure: '재직',
      stateCode: '정상',
    },
    {
      name: '김현대',
      company: '현대자동차',
      workPlace: '경영지원본부',
      dept: '경영지원실',
      affiliation: '경영지원1팀',
      appellation: '경영지원1팀',
      employeeNumber: '1234567',
      tenure: '재직',
      stateCode: '정상',
    },
    {
      name: '김현대',
      company: '현대자동차',
      workPlace: '경영지원본부',
      dept: '경영지원실',
      affiliation: '경영지원1팀',
      appellation: '경영지원1팀',
      employeeNumber: '1234567',
      tenure: '재직',
      stateCode: '정상',
    },
    {
      name: '김현대',
      company: '현대자동차',
      workPlace: '경영지원본부',
      dept: '경영지원실',
      affiliation: '경영지원1팀',
      appellation: '경영지원1팀',
      employeeNumber: '1234567',
      tenure: '재직',
      stateCode: '정상',
    },
    {
      name: '김현대',
      company: '현대자동차',
      workPlace: '경영지원본부',
      dept: '경영지원실',
      affiliation: '경영지원1팀',
      appellation: '경영지원1팀',
      employeeNumber: '1234567',
      tenure: '재직',
      stateCode: '정상',
    },
    {
      name: '김현대',
      company: '현대자동차',
      workPlace: '경영지원본부',
      dept: '경영지원실',
      affiliation: '경영지원1팀',
      appellation: '경영지원1팀',
      employeeNumber: '1234567',
      tenure: '재직',
      stateCode: '정상',
    },
    {
      name: '김현대',
      company: '현대자동차',
      workPlace: '경영지원본부',
      dept: '경영지원실',
      affiliation: '경영지원1팀',
      appellation: '경영지원1팀',
      employeeNumber: '1234567',
      tenure: '재직',
      stateCode: '정상',
    },
    {
      name: '김현대',
      company: '현대자동차',
      workPlace: '경영지원본부',
      dept: '경영지원실',
      affiliation: '경영지원1팀',
      appellation: '경영지원1팀',
      employeeNumber: '1234567',
      tenure: '재직',
      stateCode: '정상',
    },
    {
      name: '김현대',
      company: '현대자동차',
      workPlace: '경영지원본부',
      dept: '경영지원실',
      affiliation: '경영지원1팀',
      appellation: '경영지원1팀',
      employeeNumber: '1234567',
      tenure: '재직',
      stateCode: '정상',
    },
    {
      name: '김현대',
      company: '현대자동차',
      workPlace: '경영지원본부',
      dept: '경영지원실',
      affiliation: '경영지원1팀',
      appellation: '경영지원1팀',
      employeeNumber: '1234567',
      tenure: '재직',
      stateCode: '정상',
    },
    {
      name: '김현대',
      company: '현대자동차',
      workPlace: '경영지원본부',
      dept: '경영지원실',
      affiliation: '경영지원1팀',
      appellation: '경영지원1팀',
      employeeNumber: '1234567',
      tenure: '재직',
      stateCode: '정상',
    },
    {
      name: '김현대',
      company: '현대자동차',
      workPlace: '경영지원본부',
      dept: '경영지원실',
      affiliation: '경영지원1팀',
      appellation: '경영지원1팀',
      employeeNumber: '1234567',
      tenure: '재직',
      stateCode: '정상',
    },
    {
      name: '김현대',
      company: '현대자동차',
      workPlace: '경영지원본부',
      dept: '경영지원실',
      affiliation: '경영지원1팀',
      appellation: '경영지원1팀',
      employeeNumber: '1234567',
      tenure: '재직',
      stateCode: '정상',
    },
    {
      name: '김현대',
      company: '현대자동차',
      workPlace: '경영지원본부',
      dept: '경영지원실',
      affiliation: '경영지원1팀',
      appellation: '경영지원1팀',
      employeeNumber: '1234567',
      tenure: '재직',
      stateCode: '정상',
    },
    {
      name: '김현대',
      company: '현대자동차',
      workPlace: '경영지원본부',
      dept: '경영지원실',
      affiliation: '경영지원1팀',
      appellation: '경영지원1팀',
      employeeNumber: '1234567',
      tenure: '재직',
      stateCode: '정상',
    },
    {
      name: '김현대',
      company: '현대자동차',
      workPlace: '경영지원본부',
      dept: '경영지원실',
      affiliation: '경영지원1팀',
      appellation: '경영지원1팀',
      employeeNumber: '1234567',
      tenure: '재직',
      stateCode: '정상',
    },
  ],
  columns: [
    {
      name: 'no1',
      label: 'NO.',
      type: 'numbering',
    },
    {
      name: 'name',
      label: '이름',
    },
    { name: 'company', label: t('회사') },
    { name: 'workPlace', label: '본부/사업부' },
    { name: 'dept', label: '부서' },
    { name: 'affiliation', label: '소속' },
    { name: 'appellation', label: '호칭' },
    { name: 'employeeNumber', label: '사번' },
    { name: 'tenure', label: '재직여부' },
    { name: 'stateCode', label: '계정상태' },
  ],
  pagination: {
    pageSize: 10,
    pageIndex: 0,
    totalRows: 33,
  },
};
