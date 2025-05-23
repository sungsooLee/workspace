import React, { FC, useEffect, useState } from 'react';
import { t } from 'i18next';
import { createFileRoute, useRouter, useRouterState } from '@tanstack/react-router';
import { cn, DATE_TIME_FORMAT, getDateToString } from '@learnway/shared';
import {
  Button,
  ContentsRow,
  useModal,
  Input,
  RadioGroupFormField,
  TextareaFormField,
} from '@learnway/ui';
import { useDynamicForm, DynamicFormConfig, CODE_GROUP } from '@learnway/hooks';
import { MainContents } from '@widgets/layout/ui/container/slot/main-contents';
import { PageContainer } from '@widgets/layout/ui/container/page-container';
import { ContentsButtons } from '@widgets/layout/ui/container/slot/contents-buttons';
import { LinkBox } from '@widgets/layout/ui/container/slot/link-box';
import { FormSubTitle, FormRow } from '@shared/ui';

import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';
import { useGetRequestChannelDetail } from '@entities/channel/service/request-channel.hook';

export const Route = createFileRoute('/_layout/tenant/channel/request/detail')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const routerState = useRouterState();
  const channelRequestUuid = routerState.location.state?.channelRequestUuid;

  const { data, refetch } = useGetRequestChannelDetail(channelRequestUuid);

  const { provider, fetchData, onSubmit, getValues, onFormChange } = useDynamicForm(formConfig);

  useEffect(() => {
    if (data) {
      const initialData = {
        channelRequestId: data.channelRequestId,
        tenantName: data.tenantName,
        channelName: data.channelName,
        channelId: data.channelId,
        channelType: 'PUBLIC',
        channelDivision: data.isSecretChannel ? 'SECRET' : 'PUBLIC',
        channelMainLinkContent: '',
        channelLearningContent: data.channelLearningContent,
        channelPurposeContent: data.channelPurposeContent,
        companyName: data.companyName,
        affiliation: data.departmentName,
        sabun: '',
        name: data.reqeusterName,
        requestDate: getDateToString(new Date(data.requestDate), DATE_TIME_FORMAT.DATETIME_SEC),
        status: t('pms.channel.ChannelApprovalStatus.' + data.approvalStatusTypecd),
        approval: data.approverName,
        approvalDate:
          data.approvalDate !== null
            ? getDateToString(new Date(data.approvalDate), DATE_TIME_FORMAT.DATETIME_SEC)
            : '',
        rejectReason: '',
        open: '',
        openDate: '',
        isEnabled: '',
        isUsed: '',
      };
      fetchData(initialData);
    }
  }, [data]);

  const handleListButtonClick = () => {
    router.navigate({ to: '/tenant/channel/request' });
  };

  return (
    <PageContainer>
      <ContentsButtons>
        <LinkBox>
          <Button variant="point" size="sm" onClick={handleListButtonClick}>
            {t('LABEL.button.list')}
          </Button>
        </LinkBox>
        {data && data.approvalStatusTypecd === 'PENDING' && (
          <>
            <Button variant="point" size="sm">
              {t('접수')}
            </Button>
            <Button variant="point" size="sm">
              {t('반려')}
            </Button>
          </>
        )}
        {data && data.approvalStatusTypecd === 'ACCEPTED' && (
          <Button variant="point" size="sm">
            {t('채널 개설')}
          </Button>
        )}
        {data && data.approvalStatusTypecd === 'APPROVED' && (
          <Button variant="point" size="sm">
            {t('채널 상세')}
          </Button>
        )}
        {data && data.approvalStatusTypecd !== 'PENDING' && (
          <Button type="submit" variant="primary" size="sm">
            {t('저장')}
          </Button>
        )}
      </ContentsButtons>
      <MainContents>
        <FormSubTitle label={'채널 신청 정보'} />
        <ContentsRow>
          <FormRow
            provider={provider}
            name={'channelRequestId'}
            element={<Input disabled={true} />}
          />
          <FormRow provider={provider} name={'tenantName'} element={<Input disabled={true} />} />
        </ContentsRow>
        <ContentsRow>
          <FormRow provider={provider} name={'channelName'} element={<Input disabled={true} />} />
          <FormRow provider={provider} name={'channelId'} element={<Input disabled={true} />} />
        </ContentsRow>
        <ContentsRow>
          <FormRow
            provider={provider}
            name={'channelType'}
            element={<RadioGroupFormField disabled={true} />}
          />
          <FormRow provider={provider} name={'channelDivision'} />
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
        <FormSubTitle label={'채널 신청자 정보'} />
        <ContentsRow>
          <FormRow provider={provider} name={'companyName'} element={<Input disabled={true} />} />
          <FormRow provider={provider} name={'affiliation'} element={<Input disabled={true} />} />
        </ContentsRow>
        <ContentsRow>
          <FormRow provider={provider} name={'sabun'} element={<Input disabled={true} />} />
          <FormRow provider={provider} name={'name'} element={<Input disabled={true} />} />
        </ContentsRow>
        <ContentsRow>
          <FormRow provider={provider} name={'requestDate'} element={<Input disabled={true} />} />
          <FormRow provider={provider} name={'status'} element={<Input disabled={true} />} />
        </ContentsRow>
        <FormSubTitle label={'결재 정보'} />
        <ContentsRow>
          <FormRow provider={provider} name={'approval'} element={<Input disabled={true} />} />
          <FormRow provider={provider} name={'approvalDate'} element={<Input disabled={true} />} />
        </ContentsRow>
        {data && data.approvalStatusTypecd === 'REJECTED' && (
          <ContentsRow>
            <FormRow
              provider={provider}
              name={'rejectReason'}
              element={<TextareaFormField disabled={true} resize={'none'} />}
            />
          </ContentsRow>
        )}
        <FormSubTitle label={'채널 개설 정보'} />
        <ContentsRow>
          <FormRow provider={provider} name={'open'} element={<Input disabled={true} />} />
          <FormRow provider={provider} name={'openDate'} element={<Input disabled={true} />} />
        </ContentsRow>
        <ContentsRow>
          <FormRow provider={provider} name={'isEnabled'} element={<Input disabled={true} />} />
          <FormRow provider={provider} name={'isUsed'} element={<Input disabled={true} />} />
        </ContentsRow>
      </MainContents>
    </PageContainer>
  );
}

const formConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'channelRequestId',
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
      name: 'channelName',
      type: 'text',
      label: t('채널명'),
      value: '',
      placeholder: '',
    },
    {
      name: 'channelId',
      type: 'text',
      label: t('채널 아이디'),
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
      name: 'channelDivision',
      type: 'radio-group',
      label: t('채널 구분'),
      value: 'PUBLIC',
      optionsConfig: {
        codeGroup: CODE_GROUP['pms.channel.ChannelSecretType'],
      },
    },
    {
      name: 'channelMainLinkContent',
      type: 'text',
      label: t('채널 URL'),
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
      name: 'companyName',
      type: 'text',
      label: t('회사'),
      value: '',
      placeholder: '',
    },
    {
      name: 'affiliation',
      type: 'text',
      label: t('소속'),
      value: '',
      placeholder: '',
    },
    {
      name: 'sabun',
      type: 'text',
      label: t('사번'),
      value: '',
      placeholder: '',
    },
    {
      name: 'name',
      type: 'text',
      label: t('이름'),
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
      name: 'approval',
      type: 'text',
      label: t('결재자'),
      value: '',
      placeholder: '',
    },
    {
      name: 'approvalDate',
      type: 'text',
      label: t('접수/반려일'),
      value: '',
      placeholder: '',
    },
    {
      name: 'rejectReason',
      type: 'textarea',
      label: t('반려 사유'),
      value: '',
      placeholder: '',
      maxLength: 500,
    },

    {
      name: 'open',
      type: 'text',
      label: t('채널 개설 여부'),
      value: '',
      placeholder: '',
    },
    {
      name: 'openDate',
      type: 'text',
      label: t('채널 개설일'),
      value: '',
      placeholder: '',
    },
    {
      name: 'isEnabled',
      type: 'text',
      label: t('활성화 여부'),
      value: '',
      placeholder: '',
    },
    {
      name: 'isUsed',
      type: 'text',
      label: t('사용 여부'),
      value: '',
      placeholder: '',
    },
  ],
};
