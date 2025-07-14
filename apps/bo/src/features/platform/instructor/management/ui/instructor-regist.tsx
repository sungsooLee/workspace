import React, { useRef, useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import { useWatch } from 'react-hook-form';
import { useRouter, useRouterState } from '@tanstack/react-router';
import { t } from 'i18next';
import { queryOptions, mutateOptions } from '@entities/instructor/service/instructor.queries';
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import {
  useCreateTutor,
  useCreateUser,
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
  PhoneNumberFormField,
} from '@learnway/ui';
import { DynamicFormConfig, useDynamicForm, CODE_GROUP, S3_PATH } from '@learnway/hooks';

import { FormRow, FormSubTitle, AttachmentFormField, DateRangeFormField } from '@shared/ui';
import { FormDisplay } from '@features/form/ui/form-display';
import { DuplicateCheckInputFormField, DuplicateState } from '@features/form';
import { UserChoiceModal } from '@shared/ui';

import { SingleAttachmentFormField } from '@shared/ui/form/single-attachment-form-field';
import { EnFormMode, EnPageMode } from '@types';

const EMAIL_REGEX =
  /(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;

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

  const [roleIdOptions, setRoleIdOptions] = useState<any>();

  const {
    open: openModal,
    confirm: openConfirm,
    alert: openAlert,
    showSaveComplete,
    showUpdateComplete,
    showDeleteComplete,
  } = useModal();

  const [carreerYearVal, setCarreerYearVal] = useState(0);
  const [carreerMonthVal, setCarreerMonthVal] = useState(0);

  const { create: createTutor } = useCreateTutor({});
  const { create: createUser } = useCreateUser({});
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
        name: 'userUuid',
        type: 'text',
        value: '',
        disabled: true,
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
        disabled: props.instructorId || props.readOnly,
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
        disabled: props.instructorId || props.readOnly,
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
        disabled: props.instructorId || props.readOnly,
      },
      {
        name: 'roleId',
        type: 'dropdown',
        label: t('LABEL.form.label.roleId', '역할 선택'),
        value: '',
        format: 'number',
        presetOptionLabel: t('LABEL.form.label.select', '선택'),
        options: roleIdOptions,
        disabled: props.instructorId || props.readOnly,
      },
      {
        name: 'dateRange',
        type: 'date-range',
        label: t('역할 부여 기간'),
        format: 'object',
        value: { from: undefined, to: undefined },
        placeholder: '',
        maxLength: 150,
        disabled: props.readOnly,
      },
      {
        name: 'instructorName',
        label: t('이름'),
        type: 'custom',
        format: 'string',
        value: '',
        placeholder: ' ',
        disabled: props.instructorId || props.readOnly,
      },
      {
        name: 'companyName',
        type: 'text',
        label: t('회사'),
        value: '',
        placeholder: ' ',
        disabled: props.instructorId || props.readOnly,
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
        disabled: props.readOnly,
      },
      {
        name: 'employeeIdOrEmail',
        type: 'custom',
        format: 'object',
        label: t('계정(사번/이메일)'),
        value: { fieldValue: '', checkState: DuplicateState.needInput },
        placeholder: ' ',
        disabled: props.instructorId || props.readOnly,
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
        disabled: props.instructorId || props.readOnly,
      },
      {
        label: '',
        name: 'telCountryCode',
        type: 'hidden',
        format: 'string',
        value: 'KOR_82',
        disabled: props.instructorId || props.readOnly,
      },
      {
        name: 'nationCd',
        type: 'text',
        label: t('국가코드'),
        value: 'ko_KR',
        disabled: props.instructorId || props.readOnly,
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
        disabled: props.instructorId || props.readOnly,
      },
      {
        name: 'carNumber',
        type: 'text',
        label: t('차량번호'),
        value: '',
        disabled: props.readOnly,
      },
      {
        name: 'introduction',
        type: 'textarea',
        label: t('강사 소개'),
        value: '',
        maxLength: 500,
        placeholder: '강사 소개를 입력해 주세요.',
        disabled: props.readOnly,
      },
      {
        name: 'career',
        type: 'textarea',
        label: t('강사 경력'),
        value: '',
        maxLength: 500,
        placeholder: '강사 경력을 입력해 주세요.',
        disabled: props.readOnly,
      },
      {
        name: 'carreerFileGroupUuid',
        type: 'attachment',
        uuidType: 'group',
        label: t('강사 경력 인정 파일'),
        value: '',
        max: 10,
        uploadConfig: {
          affairsType: 'LMS',
          s3Path: S3_PATH['upload/content/image'], // TODO: groupUUID개발 완료 후 테스트 필요 / BE에 확인 필요
          acceptFiles: ['JPEG', 'JPG', 'PNG', 'GIF'],
          maxFileCount: 10,
        },
        description:
          '파일 사이즈 000x000 / 확장자 JPEG, JPG, PNG, GIF / 업로드 가능 1개 / 파일용량 최대 50MB',
        disabled: props.readOnly,
      },
      {
        name: 'carreerYearMonth',
        type: 'number',
        label: t('강사 경력 년수'),
        format: 'object',
        value: { year: carreerYearVal, month: carreerMonthVal },
        placeholder: '',
        disabled: props.readOnly,
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
                typeof values.employeeIdOrEmail === 'string'
                  ? values.employeeIdOrEmail
                  : values.employeeIdOrEmail.fieldValue;
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
      roleId: true,
      dateRange: {
        required: true,
        conditions: [
          {
            fn: (values) => values.activeIndex === 1 && !values.dateRange?.from,
            message: t('시작 및 종료 날짜를 선택하세요'),
          },
          {
            fn: (values) => values.activeIndex === 1 && !values.dateRange?.from,
            message: t('시작 날짜를 선택하세요'),
          },
          {
            fn: (values) => values.activeIndex === 1 && !values.dateRange?.to,
            message: t('종료 날짜를 선택하세요.'),
          },
          {
            fn: (values) => values.activeIndex === 1 && values.dateRange.from > values.dateRange.to,
            message: t('시작 날짜는 종료 날짜 보다 이전일 이어야 합니다.'),
          },
        ],
      },
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

  const duplicateCheckEmail = async (employeeIdOrEmail: string) => {
    const result = false;
    const data = { ...getValues() };
    const params = {
      tenantId: data.tenantId,
      email: employeeIdOrEmail,
    };
    try {
      const valid = await queryClient.fetchQuery(queryOptions.duplicateCheckEmail(params));
      return DuplicateState.ok;
    } catch (error: any) {
      return DuplicateState.duplicated;
    }
  };

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
    console.log('############################ data=>', data);
    const startDate = data.dateRange.from;
    const endDate = data.dateRange.to;

    const payloadTutor = {
      name: data.instructorName,
      birthday: dayjs(data.birthday).format('YYYY-MM-DD'),
      email:
        data.instructorType === 'INTERNAL_INSTRUCTOR'
          ? data.employeeIdOrEmail
          : data.employeeIdOrEmail?.fieldValue,
      password: data.instructorType === 'INTERNAL_INSTRUCTOR' ? null : data.password,
      phoneNationNumber: data.telCountryCode,
      phoneNumber: data.telNo,
      // TODO: 확인 필요
      nationCd: {
        language: 'string',
        script: 'string',
        variant: 'string',
        displayName: 'string',
        country: 'string',
        unicodeLocaleAttributes: ['string'],
        unicodeLocaleKeys: ['string'],
        displayLanguage: 'string',
        displayScript: 'string',
        displayCountry: 'string',
        displayVariant: 'string',
        extensionKeys: ['string'],
        iso3Language: 'string',
        iso3Country: 'string',
      },
    };
    const payloadUser = {
      roleId: data?.roleId,
      body: {
        addUserUuids: [
          {
            userUuid: data.userUuid,
            startDate: startDate ? dayjs(startDate) : null,
            endDate: endDate ? dayjs(endDate) : null,
            isUsed: true,
          },
        ],
      },
    };
    const payloadInstructor = {
      tenantId: data.tenantId,
      instructorType: data.instructorType,
      isFulltimeInstructor: data.isFulltimeInstructor === 2,
      roleId: data.roleId,
      startDate: startDate ? dayjs(startDate).format('YYYY-MM-DD') : null,
      endDate: endDate ? dayjs(endDate).format('YYYY-MM-DD') : null,
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
      carreerFileGroupUuid: data.carreerFileGroupUuid,
      carreerYear: carreerYearVal,
      carreerMonth: carreerMonthVal,
    };

    const confirmOk = await openConfirm('저장 하시겠습니까?');
    if (!confirmOk) return;

    let validation = true;
    // [1] 사외 강사인 경우 회원가입 API호출
    // if (data.instructorType === 'EXTERNAL_INSTRUCTOR') {
    //   await createTutor(payloadTutor, {
    //     onSuccess: async (data: any, variables: any, context: any) => {
    //       console.log('[1] onSuccess:', data);
    //       if (data && Object.keys(data).includes('uuid')) {
    //         payloadUser.addUserUuids[0].userUuid = data.uuid;
    //       }
    //     },
    //     onError: (data: any, variables: any, context: any) => {
    //       console.log('[1] onError:', data);
    //       validation = false;
    //     },
    //   });
    // }

    // [2] 역할 저장
    if (validation) {
      await createUser(payloadUser, {
        onSuccess: async (data: any, variables: any, context: any) => {
          console.log('[2] onSuccess:', data);
        },
        onError: (data: any, variables: any, context: any) => {
          console.log('[2] onError:', data);
          validation = false;
        },
      });
    }

    // [3] 강사 등록
    if (validation) {
      await createInstructor(payloadInstructor, {
        onSuccess: async (data: any, variables: any, context: any) => {
          console.log('[3] onSuccess:', data);
          await showSaveComplete();
          if (props.viewMode === EnPageMode.PAGE) {
            router.navigate({ to: '/platform/instructor/management' });
          } else {
            if (typeof props.handleSubmitSuccess === 'function') props.handleSubmitSuccess();
          }
        },
        onError: (data: any, variables: any, context: any) => {
          console.log('[3] onError:', data);
        },
      });
    }
    // }
  };

  const handleOnUpdate = async (data: any) => {
    const startDate = data.dateRange.from;
    const endDate = data.dateRange.to;
    const payload = {
      startDate: startDate ? dayjs(startDate).format('YYYY-MM-DD') : null,
      endDate: endDate ? dayjs(endDate).format('YYYY-MM-DD') : null,
      profileFileUuid: data.profileFileUuid,
      carNumber: data.carNumber,
      introduction: data.introduction,
      career: data.career,
      carreerFileGroupUuid: data.carreerFileGroupUuid,
      carreerYear: carreerYearVal,
      carreerMonth: carreerMonthVal,
      instructorId: props.instructorId,
    };

    if (await openConfirm('수정 하시겠습니까?')) {
      updateInstructor(payload, {
        onSuccess: async (data: any) => {
          await showUpdateComplete();
          if (props.viewMode === EnPageMode.PAGE) {
            router.navigate({ to: '/platform/instructor/management' });
          } else {
            if (typeof props.handleSubmitSuccess === 'function') props.handleSubmitSuccess();
          }
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
            userUuid: '',
            isView: EnFormMode.VIEW,
            ...info,
            isFulltimeInstructor: info.isFulltimeInstructor ? 2 : 1,
            dateRange: { from: new Date(info.startDate), to: new Date(info.endDate) },
            password: '',
            passwordConfirm: '',
          };
          setCarreerYearVal(info.carreerYear);
          setCarreerMonthVal(info.carreerMonth);
          updateFormData(data);
        }
      })();
    } else {
      const data = {
        ...getValues(),
        isView: EnFormMode.ADD,
        employeeIdOrEmail: '',
        carreerFileGroupUuid: '',
      };
      updateFormData(data);
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
        <FormRow provider={provider} name="dateRange" element={<DateRangeFormField />} />
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
                readOnly={props.readOnly}
                transformModalData={(data: any) => ({
                  instructorName: data.name,
                  companyName: data.company?.name,
                  employeeIdOrEmail: data.email,
                  telNo: data.phoneNumber,
                  birthday: data.birthday,
                  userUuid: data.uuid,
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
          <FormRow
            provider={provider}
            name="telNo"
            element={
              <PhoneNumberFormField
                phoneNumberConfig={{
                  options: [{ value: 'KOR_82', label: '+82' }],
                }}
              />
            }
          />
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
          <FormRow
            provider={provider}
            name="telNo"
            element={
              <PhoneNumberFormField
                phoneNumberConfig={{
                  options: [{ value: 'KOR_82', label: '+82' }],
                }}
              />
            }
          />
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
        <FormRow
          provider={provider}
          name="carreerYearMonth"
          element={
            <>
              <Input
                name="carreerYear"
                type="number"
                value={carreerYearVal}
                onChange={(e: any) => setCarreerYearVal(e.target.value)}
                disabled={props.readOnly}
              />
              <Input
                name="carreerMonth"
                type="number"
                value={carreerMonthVal}
                onChange={(e: any) => setCarreerMonthVal(e.target.value)}
                disabled={props.readOnly}
              />
            </>
          }
        />
      </ContentsRow>
      {/* 강사 타입(사내/사외) 끝 */}
    </form>
  );
};

export const InstructorRegist = forwardRef(InstructorRegistComponent);
