import { useState, useEffect, useRef } from 'react';
import { createFileRoute, useRouter, useRouterState } from '@tanstack/react-router';
import { t } from 'i18next';

import { PageContainer } from '@widgets/layout/ui/container/page-container';
import { MainContents } from '@widgets/layout/ui/container/slot/main-contents';
import { ContentsButtons } from '@widgets/layout/ui/container/slot/contents-buttons';
import { LinkBox } from '@widgets/layout/ui/container/slot/link-box';

import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';
import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';

import { Input, ContentsRow, Button, Switch } from '@learnway/ui';
import {
  DynamicFormConfig,
  useDynamicForm,
  CODE_GROUP,
  useSearchBox,
  SearchBoxConfig,
} from '@learnway/hooks';

import { FormRow, FormSubTitle, SwitchFormField } from '@shared/ui';
import { SearchBox } from '@shared/ui/search-box';

import { FormDisplay } from '@features/form/ui/form-display';

import { EnTenantDetailTabKey } from '@types';

export const Route = createFileRoute(
  '/_layout/platform/tenant/management/usr-group/handmade-detail',
)({
  component: RouteComponent,
});

/**
 * 화면 번호: NLP_BO_PMS_2001 (유저그룹수동등록 등록/상세)
 *
 * @returns
 */
function RouteComponent() {
  const router = useRouter();
  const routerState = useRouterState();

  const [selectedTabKey, setSelectedTabKey] = useState<string>(EnTenantDetailTabKey.base);

  const { provider: searchMenualProvider } = useSearchBox(searchConfig);
  const { provider, fetchData, onSubmit, onFormChange, setFormError, clearFormError, getValues } =
    useDynamicForm(formConfig);

  const handleTabChange = (tabKey: string) => {
    if (tabKey !== selectedTabKey) {
      setSelectedTabKey(tabKey);
    }
  };
  // if (!routerState.location.state.tenantId) {
  //   router.navigate({ to: '/platform/tenant/management', state: { listParam: {} } });
  // }
  const handleListButtonClick = () => {
    const listParam = routerState.location.state?.listParam;

    router.navigate({ to: '/platform/tenant/management', state: { listParam: listParam } });
  };

  const handleResetButtonClick = () => {
    console.log('reset');
  };
  const handleModifyButtonClick = () => {
    console.log('save');
  };
  const handleOnSubmit = (formData: any) => {
    console.log('save', formData);
  };
  const handleOnSearchMenual = (searchData: any) => {
    console.log('search', searchData);
  };

  return (
    <PageContainer>
      <ContentsButtons>
        <LinkBox>
          <Button onClick={handleListButtonClick} variant="point" size="sm">
            목록
          </Button>
        </LinkBox>

        <Button onClick={handleResetButtonClick} variant="point" size="sm">
          초기화
        </Button>
        <Button variant="primary" size="sm" onClick={handleModifyButtonClick}>
          저장
        </Button>
      </ContentsButtons>
      <MainContents>
        <form onSubmit={onSubmit(handleOnSubmit)}>
          <FormSubTitle label={t('유저그룹 기본 정보')} lineType="dark" />
          <ContentsRow>
            <FormRow provider={provider} name={'c1'} />
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider} name={'c2'} element={<Input disabled={true} />} />
            <FormRow provider={provider} name={'c3'} />
            <FormRow
              provider={provider}
              name={'c4'}
              className={dynamicFormStyles.form_item_horizontal}
            />
          </ContentsRow>
          <FormSubTitle label={t('유저그룹 대상자 정보')} lineType="dark" />
          <ContentsRow>
            <FormRow provider={provider} name={'c5'} />
          </ContentsRow>
          <FormDisplay provider={provider} dependencies={[{ name: 'c5', value: true }]}>
            <ContentsRow>
              <FormRow provider={provider} name={'c6'} />
            </ContentsRow>
          </FormDisplay>
          <FormDisplay provider={provider} dependencies={[{ name: 'c5', value: false }]}>
            <SearchBox provider={searchMenualProvider} onSearch={handleOnSearchMenual} />
            <ContentsRow>
              <FormRow provider={provider} name={'c7'} />
            </ContentsRow>
          </FormDisplay>
        </form>
      </MainContents>
    </PageContainer>
  );
}

const formConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'c1',
      type: 'radio-group',
      label: t('유저그룹 유형'),
      value: 'tenant',
      options: [
        { label: t('테넌트 유저그룹'), value: 'tenant' },
        { label: t('채널 유저그룹'), value: 'channel' },
        { label: t('개인별 유저그룹'), value: 'manual' },
      ],
    },
    {
      name: 'c2',
      type: 'text',
      label: t('테넌트'),
      value: '테넌트1',
    },
    {
      name: 'c3',
      type: 'text',
      label: t('유저그룹명'),
      value: '',
    },
    {
      name: 'c4',
      type: 'switch',
      label: t('유저그룹명'),
      value: true,
      switchConfig: {
        label: (value: boolean) => (value ? t('사용') : t('미사용')),
      },
      guideText: t('사용상태인 경우 유저그룹에서 조회 할 수 있습니다.'),
    },
  ],
  validator: {
    c3: true,
  },
};

const searchConfig: SearchBoxConfig = {
  builders: [
    [
      {
        name: 'tenantId',
        type: 'text',
        label: t('테넌트명'),
        format: 'object',
        value: '',
        optionsConfig: {
          codeGroup: CODE_GROUP['manual.tenant.tenantId'],
        },
      },
      {
        name: 'companyName',
        type: 'text',
        label: t('유저그룹유형'),
        value: '',
      },
      {
        name: 'tenantManagerName',
        type: 'text',
        label: t('채널'),
        value: '',
      },
    ],
    [
      {
        name: 'companyManagerName',
        type: 'text',
        label: t('개인별'),
        value: '',
      },
      {
        name: 'opt2',
        type: 'text',
        label: t('유저그룹명'),
        value: '',
      },
      {
        name: 'isUsed',
        type: 'dropdown',
        label: t('사용여부'),
        value: '',
        options: [
          { value: '', label: t('전체') },
          { value: 'true', label: t('사용') },
          { value: 'false', label: t('미사용') },
        ],
      },
      {
        name: 'dateRange',
        type: 'date-range',
        label: t('수정기간'),
        format: 'object',
        value: { from: undefined, to: undefined },
      },
    ],
  ],
};
