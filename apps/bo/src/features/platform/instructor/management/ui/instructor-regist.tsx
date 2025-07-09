import React, { useRef, useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import { useWatch } from 'react-hook-form';
import { useRouter, useRouterState } from '@tanstack/react-router';
import { t } from 'i18next';
import { queryOptions, mutateOptions } from '@entities/instructor/service/instructor.queries';
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import {
  useCreateInstructor,
  useUpdateInstructor,
  useDeleteInstructor,
} from '@entities/instructor/service/instructor.hook';

import {
  ContentsRow,
  useModal,
  RadioGroupFormField,
  Input,
  DatePicker,
  InputModalSelectorFormField,
  TextareaFormField,
} from '@learnway/ui';
import { DynamicFormConfig, useDynamicForm, CODE_GROUP, S3_PATH } from '@learnway/hooks';

import { FormRow, FormSubTitle, AttachmentFormField } from '@shared/ui';
import { FormDisplay } from '@features/form/ui/form-display';
import { DuplicateCheckInputFormField, DuplicateState } from '@features/form';
import { UserChoiceModal } from '@features/shared';

import { SingleAttachmentFormField } from '@shared/ui/form/single-attachment-form-field';
import { EnFormMode } from '@types';

const EMAIL_REGEX =
  /(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;

const duplicateCheckEmail = async (employeeIdOrEmail: string) => {
  const result = false;

  if (result) return DuplicateState.duplicated;
  else return DuplicateState.ok;
};

/**
 * 화면번호: NLP_BO_LMS_0028
 * @param props
 * @param ref
 * @returns
 */

const InstructorRegistComponent = (props: any, ref: any) => {
  const router = useRouter();
  const routerState = useRouterState();
  const queryClient = useQueryClient();

  const [roleIdOptions, setRoleIdOptions] = useState();

  const {
    open: openModal,
    confirm: openConfirm,
    alert: openAlert,
    showSaveComplete,
    showUpdateComplete,
    showDeleteComplete,
  } = useModal();

  const { create: createInstructor } = useCreateInstructor({});
  const { update: updateInstructor } = useUpdateInstructor({});
  const { delete: deleteInstructor } = useDeleteInstructor({});

  const formRef = useRef<HTMLFormElement>(null);

  const formConfig: DynamicFormConfig = {
    builders: [
      {
        name: 'isView',
        type: 'text',
        value: props.instructorId ? EnFormMode.VIEW : EnFormMode.ADD,
      },
      {
        name: 'tenantId',
        type: 'dropdown',
        label: t('LABEL.form.label.tenant', '테넌트'),
        value: '',
        format: 'number',
        presetOptionLabel: t('LABEL.form.label.select', '선택'),
        optionsConfig: {
          codeGroup: CODE_GROUP['manual.bo.my.tenant.tenantId'],
        },
        disabled: props.instructorId,
      },
      {
        name: 'instructorType',
        type: 'radio-group',
        label: t('강사 타입'),
        value: 'INTERNAL_INSTRUCTOR',
        options: [
          { label: '사내', value: 'INTERNAL_INSTRUCTOR' },
          { label: '사외', value: 'EXTERNAL_INSTRUCTOR' },
        ],
        disabled: props.instructorId,
      },
      {
        name: 'isFulltimeInstructor',
        type: 'radio-group',
        label: t('전임강사 여부'),
        value: 1,
        options: [
          { label: '비전임', value: 1 },
          { label: '전임', value: 2 },
        ],
        disabled: props.instructorId,
      },
      {
        name: 'roleId',
        type: 'dropdown',
        label: t('LABEL.form.label.roleId', '역할 선택'),
        value: '',
        format: 'number',
        presetOptionLabel: t('LABEL.form.label.select', '선택'),
        options: roleIdOptions,
        disabled: props.instructorId,
      },
      {
        label: t('역할 부여 기간(시작)'),
        name: 'startDate',
        type: 'text',
        format: 'object',
        value: undefined,
      },
      {
        label: t('역할 부여 기간(종료)'),
        name: 'endDate',
        type: 'text',
        format: 'object',
        value: undefined,
      },
      {
        name: 'instructorName',
        label: t('이름'),
        type: 'custom',
        format: 'string',
        value: '',
        placeholder: ' ',
        disabled: props.instructorId,
      },
      {
        name: 'companyName',
        type: 'text',
        label: t('회사'),
        value: '',
        placeholder: ' ',
        disabled: props.instructorId,
      },
      {
        name: 'profileFileUuid',
        type: 'text',
        format: 'string',
        label: t('프로필 사진'),
        value: '',
        max: 1,
        uploadConfig: {
          affairsType: 'LMS',
          s3Path: S3_PATH['upload/content/image'], // BE에 확인 필요
          acceptFiles: ['JPEG', 'JPG', 'PNG', 'GIF'],
          maxFileCount: 1,
        },
      },
      {
        name: 'employeeIdOrEmail',
        type: 'custom',
        format: 'object',
        label: t('계정(사번/이메일)'),
        value: { fieldValue: '', checkState: DuplicateState.needInput },
        placeholder: ' ',
        disabled: props.instructorId,
      },
      {
        label: t('연락처'),
        name: 'telNo',
        type: 'phone-number',
        format: 'string',
        value: '',
        fields: {
          nationCode: 'telCountryCode',
          number: 'telNo',
        },
        disabled: props.instructorId,
      },
      {
        label: '',
        name: 'telCountryCode',
        type: 'hidden',
        format: 'string',
        value: 'KOR_82',
        disabled: props.instructorId,
      },
      {
        name: 'nationCd',
        type: 'text',
        label: t('국가코드'),
        value: 'ko_KR',
        disabled: props.instructorId,
      },
      {
        name: 'password',
        type: 'text',
        label: t('비밀번호'),
        value: '',
      },
      {
        name: 'passwordConfirm',
        type: 'text',
        label: t('비밀번호 확인'),
        value: '',
      },
      {
        name: 'birthday',
        label: t('생년월일'),
        type: 'text',
        format: 'object',
        value: undefined,
        disabled: props.instructorId,
      },
      {
        name: 'carNumber',
        type: 'text',
        label: t('차량번호'),
        value: '',
      },
      {
        name: 'introduction',
        type: 'textarea',
        label: t('강사 소개'),
        value: '',
        maxLength: 500,
        placeholder: '강사 소개를 입력해 주세요.',
      },
      {
        name: 'career',
        type: 'textarea',
        label: t('강사 경력'),
        value: '',
        maxLength: 500,
        placeholder: '강사 경력을 입력해 주세요.',
      },
      {
        name: 'carreerFileGroupUuid',
        type: 'thumbnail-list',
        format: 'array',
        label: t('강사 경력 인정 파일'),
        value: [],
        max: 10,
        uploadConfig: {
          affairsType: 'LMS',
          s3Path: S3_PATH['upload/content/image'], // TODO: groupUUID개발 완료 후 테스트 필요 / BE에 확인 필요
          acceptFiles: ['JPEG', 'JPG', 'PNG', 'GIF'],
          maxFileCount: 10,
        },
        description:
          '파일 사이즈 000x000 / 확장자 JPEG, JPG, PNG, GIF / 업로드 가능 1개 / 파일용량 최대 50MB',
      },
      {
        name: 'carreerYear',
        type: 'number',
        label: t('강사 경력 년'),
        value: 0,
      },
      {
        name: 'carreerMonth',
        type: 'number',
        label: t('강사 경력 월'),
        value: 0,
      },
    ],
    validator: {
      tenantId: true,
      instructorType: true,
      isFulltimeInstructor: true,
      instructorName: true,
      companyName: true,
      employeeIdOrEmail: {
        required: true,
        conditions: [
          {
            fn: (values) => {
              const value =
                values.instructorType === 'INTERNAL_INSTRUCTOR'
                  ? values.employeeIdOrEmail
                  : values.employeeIdOrEmail?.fieldValue;
              if (value.trim().length === 0) return false;
              const pattern = new RegExp(EMAIL_REGEX, 'i');
              return !pattern.test(value.trim());
            },
            message: t('이메일 형식에 맞게 입력해 주세요.'),
          },
        ],
      },
      telCountryCode: true,
      telNo: true,
      nationCd: true,
      birthday: true,
      introduction: true,
    },
  };

  const {
    provider,
    updateFormData,
    onSubmit,
    onFormChange,
    onFormValid,
    getValues,
    setValue,
    formState,
    control,
  } = useDynamicForm(formConfig);

  const tenantIdWatch = useWatch({ control: provider.control, name: 'tenantId' });
  const instructorTypeWatch = useWatch({ control: provider.control, name: 'instructorType' });

  const handleOnSubmit = async (data: any) => {
    console.log('#### handleOnSubmit', data);

    if (!props.instructorId) {
      if (data.instructorType === 'EXTERNAL_INSTRUCTOR') {
        if (data.password !== data.passwordConfirm) {
          openAlert({
            title: '비밀번호가 불일치',
            content: '비밀번호를 확인해주세요.',
          });
          return false;
        }
      }
      handleOnInsert(data);
    } else {
      handleOnUpdate(data);
    }
  };

  const handleOnInsert = async (data: any) => {
    const payload = {
      tenantId: data.tenantId,
      instructorType: data.instructorType,
      isFulltimeInstructor: data.isFulltimeInstructor === 2,
      roleId: data.roleId,
      startDate: data.startDate !== '' ? dayjs(data.startDate).format('YYYY-MM-DD') : null,
      endDate: data.endDate !== '' ? dayjs(data.endDate).format('YYYY-MM-DD') : null,
      instructorName: data.instructorName,
      companyName: data.companyName,
      profileFileUuid: data.profileFileUuid,
      employeeIdOrEmail:
        data.instructorType === 'INTERNAL_INSTRUCTOR'
          ? data.employeeIdOrEmail
          : data.employeeIdOrEmail?.fieldValue,
      password: data.instructorType === 'INTERNAL_INSTRUCTOR' ? null : data.password,
      telCountryCode: data.telCountryCode,
      telNo: data.telNo,
      nationCd: data.nationCd,
      birthday: dayjs(data.birthday).format('YYYY-MM-DD'),
      carNumber: data.carNumber,
      introduction: data.introduction,
      career: data.career,
      // carreerFileGroupUuid: data.carreerFileGroupUuid, // TODO: string[] 타입으로 BE확인필요
      carreerFileGroupUuid: '',
      carreerYear: data.carreerYear,
      carreerMonth: data.carreerMonth,
    };

    if (await openConfirm('저장 하시겠습니까?')) {
      createInstructor(payload, {
        onSuccess: async () => {
          await showSaveComplete();
          router.navigate({ to: '/platform/instructor/management' });
        },
        isError: () => {
          console.error('error');
        },
      });
    }
  };

  const handleOnUpdate = async (data: any) => {
    const payload = {
      startDate: dayjs(data.startDate).format('YYYY-MM-DD'),
      endDate: dayjs(data.endDate).format('YYYY-MM-DD'),
      profileFileUuid: data.profileFileUuid,
      carNumber: data.carNumber,
      introduction: data.introduction,
      career: data.career,
      // carreerFileGroupUuid: data.carreerFileGroupUuid,
      carreerFileGroupUuid: '',
      carreerYear: data.carreerYear,
      carreerMonth: data.carreerMonth,
      instructorId: props.instructorId,
    };

    if (await openConfirm('수정 하시겠습니까?')) {
      updateInstructor(payload, {
        onSuccess: async (data: any) => {
          await showUpdateComplete();
          router.navigate({ to: '/platform/instructor/management' });
        },
        isError: () => {
          console.error('error');
        },
      });
    }
  };

  const handleOnDelete = async () => {
    if (await openConfirm('삭제 하시겠습니까?')) {
      deleteInstructor(props.instructorId, {
        onSuccess: async () => {
          await showDeleteComplete();
          router.navigate({ to: '/platform/instructor/management' });
        },
        isError: () => {
          console.error('error');
        },
      });
    }
  };

  useImperativeHandle(ref, () => ({
    saveData() {
      console.log('saveData');
      const form = formRef.current;
      if (form) {
        form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
      }
    },
    deleteData() {
      console.log('deleteData');
      handleOnDelete();
    },
    clearForm() {
      onFormChange();
    },
  }));

  useEffect(() => {
    if (tenantIdWatch) {
      (async () => {
        const roles = await queryClient.fetchQuery(queryOptions.rolesByTenantId(tenantIdWatch));
        console.log('##roles =>', roles);
        if (roles) {
          const roleIdOptions = roles.map((item: any) => ({
            label: item.name,
            value: item.roleId,
          }));
          setRoleIdOptions(roleIdOptions);
        }
      })();
    }
  }, [tenantIdWatch]);

  useEffect(() => {
    if (props.instructorId) {
      (async () => {
        const info: any = await queryClient.fetchQuery(queryOptions.detail(props.instructorId));
        console.log('##info =>', info);
        if (info) {
          const data = {
            isView: props.instructorId ? EnFormMode.VIEW : EnFormMode.ADD,
            ...info,
            isFulltimeInstructor: info.isFulltimeInstructor ? 2 : 1,
            // carreerFileGroupUuid: '', // TODO: Swagger에 string타입으로 확인필요
            carreerFileGroupUuid: [],
            password: '',
            passwordConfirm: '',
          };

          updateFormData(data);
        }
      })();
    }
  }, []);

  return (
    <form ref={formRef} onSubmit={onSubmit(handleOnSubmit)}>
      <FormSubTitle label={t('기본 정보')} lineType="dark" />
      <ContentsRow>
        <FormRow provider={provider} name="tenantId" />
        <FormRow provider={provider} name="instructorType" element={<RadioGroupFormField />} />
        <FormDisplay
          provider={provider}
          dependencies={[{ name: 'instructorType', value: 'INTERNAL_INSTRUCTOR' }]}
        >
          <FormRow
            provider={provider}
            name="isFulltimeInstructor"
            element={<RadioGroupFormField />}
          />
        </FormDisplay>
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider} name="roleId" />
        <FormRow provider={provider} name="startDate" element={<DatePicker displayType="day" />} />
        <FormRow provider={provider} name="endDate" element={<DatePicker displayType="day" />} />
      </ContentsRow>

      <FormSubTitle label={t('강사 정보')} lineType="dark" />
      {/* 강사 타입(사내) 시작 */}
      <FormDisplay
        provider={provider}
        condition={'or'}
        dependencies={[
          { name: 'instructorType', value: 'INTERNAL_INSTRUCTOR' },
          { name: 'isView', value: EnFormMode.VIEW },
        ]}
      >
        <ContentsRow>
          <FormRow
            provider={provider}
            name="instructorName"
            element={
              <InputModalSelectorFormField
                transformModalData={(data: any) => ({
                  instructorName: data.name,
                  companyName: data.company?.name,
                  employeeIdOrEmail: data.email,
                  telNo: data.phoneNumber,
                  birthday: data.birthday,
                })}
                modalConfig={{
                  title: '',
                  width: 'xl',
                  content: <UserChoiceModal />,
                }}
              />
            }
          />
          <FormRow provider={provider} name="companyName" element={<Input disabled={true} />} />
          <FormRow
            provider={provider}
            name="profileFileUuid"
            element={<SingleAttachmentFormField />}
          />
        </ContentsRow>
        <ContentsRow>
          <FormRow
            provider={provider}
            name="employeeIdOrEmail"
            element={<Input disabled={true} />}
          />
          <FormRow provider={provider} name="telNo" />
          <FormRow provider={provider} name="nationCd" element={<Input disabled={true} />} />
        </ContentsRow>
        <ContentsRow>
          <FormRow
            provider={provider}
            name="birthday"
            element={<DatePicker displayType="day" disabled={true} />}
          />
          <FormRow provider={provider} name="carNumber" />
        </ContentsRow>
      </FormDisplay>
      {/* 강사 타입(사내) 끝 */}
      {/* 강사 타입(사외) 시작 */}
      <FormDisplay
        provider={provider}
        condition={'and'}
        dependencies={[
          { name: 'instructorType', value: 'EXTERNAL_INSTRUCTOR' },
          { name: 'isView', value: EnFormMode.ADD },
        ]}
      >
        <ContentsRow>
          <FormRow provider={provider} name="instructorName" element={<Input />} />
          <FormRow provider={provider} name="companyName" element={<Input />} />
          <FormRow
            provider={provider}
            name="profileFileUuid"
            element={<SingleAttachmentFormField />}
          />
        </ContentsRow>
        <ContentsRow>
          <FormRow
            provider={provider}
            name="employeeIdOrEmail"
            element={<DuplicateCheckInputFormField onDuplicationCheck={duplicateCheckEmail} />}
          />
          <FormRow provider={provider} name="password" element={<Input type="password" />} />
          <FormRow provider={provider} name="passwordConfirm" element={<Input type="password" />} />
        </ContentsRow>
        <ContentsRow>
          <FormRow provider={provider} name="telNo" />
          <FormRow provider={provider} name="nationCd" element={<Input />} />
          <FormRow provider={provider} name="birthday" element={<DatePicker displayType="day" />} />
        </ContentsRow>
        <ContentsRow>
          <FormRow provider={provider} name="carNumber" />
        </ContentsRow>
      </FormDisplay>
      {/* 강사 타입(사외) 끝 */}
      {/* 강사 타입(사내/사외) 시작 */}
      <ContentsRow>
        <FormRow
          provider={provider}
          name="introduction"
          element={<TextareaFormField resize="none" />}
        />
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider} name="career" element={<TextareaFormField resize="none" />} />
      </ContentsRow>
      <ContentsRow>
        <FormRow
          provider={provider}
          name="carreerFileGroupUuid"
          element={<AttachmentFormField />}
        />
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider} name="carreerYear" />
        <FormRow provider={provider} name="carreerMonth" />
      </ContentsRow>
      {/* 강사 타입(사내/사외) 끝 */}
    </form>
  );
};

export const InstructorRegist = forwardRef(InstructorRegistComponent);
