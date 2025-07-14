import React, { FC, useEffect, useState } from 'react';
import { t } from 'i18next';
import { createLazyFileRoute, useRouter, useRouterState } from '@tanstack/react-router';
import { cn, DATE_TIME_FORMAT, getDateToString } from '@learnway/shared';
import {
  Button,
  ContentsRow,
  FormSubTitle,
  Input,
  RadioGroupFormField,
  TextareaFormField,
} from '@learnway/ui';
import { useDynamicForm, DynamicFormConfig, CODE_GROUP } from '@learnway/hooks';
import { useGetRequestChannelDetail } from '@entities/channel/service/request-channel.hook';
import { EnGlobalConst } from '@types';
import {
  FormRow,
  FormItem,
  MainContents,
  PageContainer,
  LinkBox,
  ContentsButtons,
} from '@shared/ui';
import { getChannelUrl } from '@features/channel';

export const Route = createLazyFileRoute('/_layout/tenant/channel/request/detail')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const routerState = useRouterState();
  const channelRequestUuid = routerState.location.state?.channelRequestUuid;

  const { data, refetch } = useGetRequestChannelDetail(channelRequestUuid);

  const { provider, updateFormData, onSubmit, getValues, onFormChange } =
    useDynamicForm(formConfig);

  useEffect(() => {
    if (data) {
      const initialData = {
        channelRequestId: data.channelRequestId,
        tenantName: data.tenantName,
        channelName: data.channelName,
        channelMainId: data.channelMainId,
        channelTenatMappingType: data.channelTenatMappingType,
        channelSecretType: data.channelSecretType,
        channelUrl: getChannelUrl(data.channelMainId),
        channelLearningContent: data.channelLearningContent ?? ' ',
        channelPurposeContent: data.channelPurposeContent ?? ' ',
        companyName: data.companyName,
        departmentName: data.departmentName,
        reqeusterEmployeeNumber: data.reqeusterEmployeeNumber,
        reqeusterName: data.reqeusterName,
        createdDate: getDateToString(new Date(data.createdDate), DATE_TIME_FORMAT.DATETIME_SEC),
        approvalStatusType: t(
          `${EnGlobalConst.SYSTEM_COMMON_CODE}.pms.channel.ChannelApprovalStatusType.${data.approvalStatusType}`,
        ),
        approverName: data.approverName ?? ' ',
        approvalDate:
          data.approvalDate !== null
            ? getDateToString(new Date(data.approvalDate), DATE_TIME_FORMAT.DATETIME_SEC)
            : ' ',
        rejectedReasonContent: data.rejectedReasonContent ?? ' ',
        channelInfo: data.approvalStatusType === 'APPROVED' ? t('개설 완료') : t('개설 전'),
        channelInfoCreatedDate:
          data.channelInfoCreatedDate !== null
            ? getDateToString(new Date(data.channelInfoCreatedDate), DATE_TIME_FORMAT.DATETIME_SEC)
            : ' ',
        channelInfoIsDisplay:
          data.approvalStatusType === 'APPROVED'
            ? data.channelInfoIsDisplay
              ? t('노출')
              : t('비노출')
            : ' ',
        channelInfoIsUsedChannel:
          data.approvalStatusType === 'APPROVED'
            ? data.channelInfoIsUsedChannel
              ? t('사용')
              : t('미사용')
            : ' ',
      };
      updateFormData(initialData);
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
        {data && data.approvalStatusType === 'PENDING' && (
          <>
            <Button variant="point" size="sm">
              {t('접수')}
            </Button>
            <Button variant="point" size="sm">
              {t('반려')}
            </Button>
          </>
        )}
        {data && data.approvalStatusType === 'ACCEPTED' && (
          <Button variant="point" size="sm">
            {t('채널 개설')}
          </Button>
        )}
        {data && data.approvalStatusType === 'APPROVED' && (
          <Button variant="point" size="sm">
            {t('채널 상세')}
          </Button>
        )}
        {data && data.approvalStatusType !== 'PENDING' && (
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
            element={<Input readOnly={true} />}
          />
          <FormRow provider={provider} name={'tenantName'} element={<Input readOnly={true} />} />
          <FormRow provider={provider} name={'channelName'} element={<Input readOnly={true} />} />
        </ContentsRow>
        <ContentsRow>
          <FormRow provider={provider} name={'channelMainId'} element={<Input readOnly={true} />} />
          <FormRow
            provider={provider}
            name={'channelTenatMappingType'}
            element={<RadioGroupFormField disabled={true} />}
          />
          <FormRow
            provider={provider}
            name={'channelSecretType'}
            element={<RadioGroupFormField disabled={true} />}
          />
        </ContentsRow>
        <ContentsRow>
          <FormRow provider={provider} name={'channelUrl'} element={<Input readOnly={true} />} />
        </ContentsRow>
        <ContentsRow>
          <FormRow
            provider={provider}
            name={'channelLearningContent'}
            element={<TextareaFormField readOnly={true} resize={'none'} />}
          />
        </ContentsRow>
        <ContentsRow>
          <FormRow
            provider={provider}
            name={'channelPurposeContent'}
            element={<TextareaFormField readOnly={true} resize={'none'} />}
          />
        </ContentsRow>
        <FormSubTitle label={'채널 신청자 정보'} />
        <ContentsRow>
          <FormRow provider={provider} name={'companyName'} element={<Input readOnly={true} />} />
          <FormRow
            provider={provider}
            name={'departmentName'}
            element={<Input readOnly={true} />}
          />
          <FormRow
            provider={provider}
            name={'reqeusterEmployeeNumber'}
            element={<Input readOnly={true} />}
          />
        </ContentsRow>
        <ContentsRow>
          <FormRow provider={provider} name={'reqeusterName'} element={<Input readOnly={true} />} />
          <FormRow provider={provider} name={'createdDate'} element={<Input readOnly={true} />} />
          <FormRow
            provider={provider}
            name={'approvalStatusType'}
            element={<Input readOnly={true} />}
          />
        </ContentsRow>
        <FormSubTitle label={'결재 정보'} />
        <ContentsRow>
          <FormRow provider={provider} name={'approverName'} element={<Input readOnly={true} />} />
          <FormRow provider={provider} name={'approvalDate'} element={<Input readOnly={true} />} />
          <FormItem />
        </ContentsRow>
        {data && data.approvalStatusType === 'REJECTED' && (
          <ContentsRow>
            <FormRow
              provider={provider}
              name={'rejectedReasonContent'}
              element={<TextareaFormField readOnly={true} resize={'none'} />}
            />
          </ContentsRow>
        )}
        <FormSubTitle label={'채널 개설 정보'} />
        <ContentsRow>
          <FormRow provider={provider} name={'channelInfo'} element={<Input readOnly={true} />} />
          <FormRow
            provider={provider}
            name={'channelInfoCreatedDate'}
            element={<Input readOnly={true} />}
          />
          <FormRow
            provider={provider}
            name={'channelInfoIsUsedChannel'}
            element={<Input readOnly={true} />}
          />
        </ContentsRow>
        <ContentsRow>
          <FormRow
            provider={provider}
            name={'channelInfoIsDisplay'}
            element={<Input readOnly={true} />}
          />
          <FormItem />
          <FormItem />
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
      name: 'channelMainId',
      type: 'text',
      label: t('채널 핸들'),
      value: '',
      placeholder: '',
    },
    {
      name: 'channelTenatMappingType',
      type: 'radio-group',
      label: t('채널 유형'),
      value: '',
      optionsConfig: {
        codeGroup: CODE_GROUP['pms.channel.ChannelTenatMappingType'],
      },
    },
    {
      name: 'channelSecretType',
      type: 'radio-group',
      label: t('채널 구분'),
      value: '',
      optionsConfig: {
        codeGroup: CODE_GROUP['pms.channel.ChannelSecretType'],
      },
    },
    {
      name: 'channelUrl',
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
      name: 'departmentName',
      type: 'text',
      label: t('소속'),
      value: '',
      placeholder: '',
    },
    {
      name: 'reqeusterEmployeeNumber',
      type: 'text',
      label: t('사번'),
      value: '',
      placeholder: '',
    },
    {
      name: 'reqeusterName',
      type: 'text',
      label: t('이름'),
      value: '',
      placeholder: '',
    },
    {
      name: 'createdDate',
      type: 'text',
      label: t('신청일'),
      value: '',
      placeholder: '',
    },
    {
      name: 'approvalStatusType',
      type: 'text',
      label: t('신청 상태'),
      value: '',
      placeholder: '',
    },
    {
      name: 'approverName',
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
      name: 'rejectedReasonContent',
      type: 'textarea',
      label: t('반려 사유'),
      value: '',
      placeholder: '',
      maxLength: 500,
    },

    {
      name: 'channelInfo',
      type: 'text',
      label: t('채널 개설 여부'),
      value: '',
      placeholder: '',
    },
    {
      name: 'channelInfoCreatedDate',
      type: 'text',
      label: t('채널 개설일'),
      value: '',
      placeholder: '',
    },
    {
      name: 'channelInfoIsDisplay',
      type: 'text',
      label: t('노출 여부'),
      value: '',
      placeholder: '',
    },
    {
      name: 'channelInfoIsUsedChannel',
      type: 'text',
      label: t('사용 여부'),
      value: '',
      placeholder: '',
    },
  ],
};
