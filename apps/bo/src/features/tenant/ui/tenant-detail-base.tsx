import { FC, useEffect, useRef, useState } from 'react';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
import { useRouterState } from '@tanstack/react-router';

import { cn } from '@learnway/shared';
import { DynamicFormConfig, useDynamicForm } from '@learnway/hooks';
import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';
import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css'; // 화면 내 컨텐츠 레이아웃 css
import titleStyles from '@learnway/styles/bo/assets/styles/modules/title.module.css';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';
import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';
import searchStyles from '@learnway/styles/bo/assets/styles/modules/search-box.module.css';
import popupStyles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';
import { IcoFormRequired, IcoAlertCircle, IcoRefresh02, IcoSearch } from '@learnway/icons';
import { TenantManagerModal } from './tenant-manager-modal';
import { CompanyModal } from './company-modal';

import {
  Tabs,
  ContentsRow,
  Input,
  Textarea,
  CheckboxGroupFormField,
  Tooltip,
  Button,
  Switch,
  ThumbnailImageUpload,
  ImageOption,
  ChipListModalSelectorFormField,
  useModal,
  ModalTitle,
  ModalContainer,
  ModalBody,
  ModalFooter,
  Dropdown,
  GridBox,
  DynamicFormField,
  InputModalSelectorFormField,
} from '@learnway/ui';
import { FormRow, ContentsHistoryInfoFormField } from '@shared/ui';
import { ThumbnailUploaderFormField } from '@features/learning';

/* image */
import selectedImg from '@assets/images/thumb/img_thumb_default.jpg';

const TenantDetailBaseComponent: FC<any> = () => {
  const routerState = useRouterState();
  const tenantId = routerState.location.state?.tenantId || '1';

  const { t } = useTranslation();

  const { provider, fetchData, onSubmit, onFormChange, getValues, clearFormError, setFormError } =
    useDynamicForm(formConfig);

  const [checked, setChecked] = useState<{ [key: number]: boolean }>({
    1: false,
  });

  // 상태 변경 함수 (Switch id에 따라 상태를 업데이트)
  const handleCheckedChange = (id: number) => (checked: boolean) => {
    setChecked((prev) => ({ ...prev, [id]: checked }));
  };

  return (
    <>
      <div className="title_wrap">
        <strong className="title">{'기본 정보'}</strong>
      </div>
      <ContentsRow>
        <FormRow provider={provider}>
          <DynamicFormField name={'tenantName'} />
          <Button variant="gray" size="sm">
            {'중복'}
          </Button>
        </FormRow>
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider}>
          <DynamicFormField name="tenantLogo">
            <ThumbnailUploaderFormField />
          </DynamicFormField>
        </FormRow>
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider}>
          <DynamicFormField name={'managerName'}>
            <ChipListModalSelectorFormField
              chipList={{
                labelField: 'name',
                valueField: 'value',
                hideBorder: true,
              }}
              modalConfig={{
                title: '',
                width: 'xl',
                content: <TenantManagerModal />,
              }}
            />
          </DynamicFormField>
        </FormRow>
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider}>
          <DynamicFormField name={'tenantJungsanTag'} />
        </FormRow>
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider}>
          <DynamicFormField name={'company'}>
            <ChipListModalSelectorFormField
              chipList={{
                labelField: 'name',
                valueField: 'value',
                hideBorder: true,
              }}
              modalConfig={{
                title: '',
                width: 'xl',
                content: <CompanyModal />,
              }}
            />
          </DynamicFormField>
        </FormRow>
      </ContentsRow>

      <ContentsRow type={'horizontal'}>
        <FormRow provider={provider}>
          <DynamicFormField name={'isUsed'} />
        </FormRow>
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider}>
          <DynamicFormField name={'description'} resize="none" />
        </FormRow>
      </ContentsRow>
      <div className="title_wrap no_line">
        <strong className="title">{'시스템 설정'}</strong>
      </div>
      <ContentsRow>
        <FormRow provider={provider}>
          <DynamicFormField name={'device'} />
        </FormRow>
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider}>
          <DynamicFormField name={'useCategory'} />
        </FormRow>
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider}>
          <DynamicFormField name={'language'} />
        </FormRow>
      </ContentsRow>
      <ContentsRow className={cn(formStyles.no_line, formStyles.space2)}>
        <ContentsHistoryInfoFormField />
      </ContentsRow>
    </>
  );
};

export const TenantDetailBase = TenantDetailBaseComponent;

const formConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'tenantName',
      type: 'text',
      label: t('테넌트명'),
      value: '',
      placeholder: '',
    },
    {
      label: t('테넌트 로고 (Size : 000x000)'),
      name: 'tenantLogo',
      type: 'custom',
      format: 'array',
      value: [],
      tooltip: '테넌트에 사용할 로고로 파일 1개만 등록할 수 있습니다.',
    },
    {
      name: 'managerName',
      label: t('테넌트 담당자'),
      type: 'custom',
      value: '',
    },
    {
      name: 'tenantJungsanTag',
      type: 'text',
      label: t('테넌트 정산 태그'),
      value: '',
      placeholder: '',
      maxLength: 150,
    },
    {
      name: 'company',
      label: t('회사 선택'),
      type: 'custom',
      value: '',
      tooltip:
        '테넌트 소속 회사를 여러개 선택할 수 있습니다. 회사가 여러 개인 경우 회사별로 개별 설정이 필요합니다.',
    },
    {
      name: 'isUsed',
      type: 'switch',
      label: t('사용 여부'),
      value: true,
      format: 'boolean',
      tooltip:
        '테넌트 사용이 ON이면 학습자 사이트에 로그인 할 수 있으며, OFF이면 로그인 할 수 없습니다.',
      switchConfig: {
        label: (value: boolean) => (value ? '사용' : '미사용'),
      },
      guideText: '테넌트 사용 여부를 설정할 수 있습니다.',
    },
    {
      name: 'description',
      type: 'textarea',
      label: t('설명'),
      value: '',
      maxLength: 2000,
      placeholder: '설명을 입력해 주세요.',
    },
    {
      name: 'device',
      type: 'checkbox-group',
      label: t('디바이스'),
      format: 'array',
      tooltip:
        'PC, 모바일, APP 모두 사용가능하며 과정 등록 시 PC, 모바일 학습 여부를 설정할 수 있습니다.',
      value: [],
      options: [
        {
          value: 'all',
          label: '전체',
        },
        {
          value: 'isWebExposed',
          label: 'PC',
        },
        {
          value: 'isMobileExposed',
          label: 'Mobile',
        },
        {
          value: 'isAppExposed',
          label: 'APP',
        },
      ],
    },
    {
      name: 'language',
      type: 'checkbox-group',
      label: t('언어'),
      format: 'array',
      tooltip: '테넌트에서 사용할 언어를 선택하고, 선택한 언어에서 다국어 설정을 할 수 있습니다.',
      value: [],
      options: [
        { value: 'all', label: '전체' },
        { value: 'b', label: '한국어' },
        { value: 'c', label: '영어' },
        { value: 'd', label: '네팔어' },
        { value: 'e', label: '루미나이어' },
        { value: 'f', label: '말레이어' },
        { value: 'g', label: '베트남어' },
        { value: 'h', label: '스페인어' },
      ],
    },
    {
      name: 'useCategory',
      type: 'checkbox-group',
      label: t('카테고리 사용 여부'),
      format: 'array',
      tooltip: '테넌트 - 카테고리 관리에서 사용할 카테고리를 선택할 수 있습니다',
      value: [],
      options: [
        {
          value: 'all',
          label: '전체',
        },
        {
          value: 'common',
          label: '공통 카테고리',
        },
        {
          value: 'tenant',
          label: '테넌트 카테고리',
        },
      ],
    },
  ],
  validator: {
    tenantName: { required: true },
    tenantLogo: { required: true },
    managerName: { required: true },
    tenantJungsanTag: { required: true },
    company: { required: true },
    isUsed: { required: true },
    device: {
      required: {
        fn: (values) => {
          return (
            !values.isMobileExposed && !values.isWebExposed && !values.isAppExposed && !values.all
          );
        },
        message: t('1개 이상 선택하세요.'),
      },
    },
    useCategory: {
      required: {
        fn: (values) => {
          return !values.common && !values.tenant && !values.all;
        },
        message: t('1개 이상 선택하세요.'),
      },
    },
    language: {
      required: {
        fn: (values) => {
          return !values.common && !values.tenant && !values.all;
        },
        message: t('1개 이상 선택하세요.'),
      },
    },
  },
};
