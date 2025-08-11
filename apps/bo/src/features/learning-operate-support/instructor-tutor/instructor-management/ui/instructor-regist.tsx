import {
  useCreateInstructor,
  useCreateTutor,
  useCreateUser,
  useDeleteInstructor,
  useUpdateInstructor,
} from '@entities/instructor/service/instructor.hook';
import { queryOptions } from '@entities/instructor/service/instructor.queries';
import { ContentsRow } from '@learnway/ui/contents-row';
import { Input } from '@learnway/ui/input';
import { useModal } from '@learnway/ui/modal';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter, useRouterState } from '@tanstack/react-router';
import dayjs from 'dayjs';
import { t } from 'i18next';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useWatch } from 'react-hook-form';

import { CODE_GROUP, S3_PATH, useDynamicForm2 } from '@learnway/hooks';
import { FormSubTitle, FormRow2 } from '@learnway/ui/base-form';
import {
  InputModalSelectorFormField,
  RadioGroupFormField,
  TextareaFormField,
} from '@learnway/ui/form-field';

import {
  AttachmentFormField,
  DatePickerFormField,
  DateRangePickerFormField,
  DropdownFormField,
  DuplicateCheckInputFormField,
  DuplicateState,
  FormDisplay,
  InputFormField,
  PhoneNumberFormField,
} from '@shared/ui/form';
import { UserChoiceModal } from '@shared/ui/modal';

import { EnFormMode, EnPageMode } from '@shared/types/enums';
import { SingleAttachmentFormField } from '@shared/ui/form/ui/single-attachment-form-field';

const EMAIL_REGEX =
  /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;

const passwordRegx01 =
  /^((?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,})|((?=(.*[A-Za-z].*[\d])|(.+[A-Za-z].*[!@#$%^&*(),.?":{}|<>])|(.+[\d].*[!@#$%^&*(),.?":{}|<>])).{10,})$/;
const passwordRegx02 = /^(?!.*(.)\1{4}).*$/;
const passwordRegx03 = /^(?!.*\d{5,}).*$/;

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
    openModal,
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
  } = useDynamicForm2();

  const tenantIdWatch = useWatch({ control: provider.control, name: 'tenantId' });

  const duplicateCheckEmail = async (employeeIdOrEmail: string) => {
    const result = false;
    const data = { ...getValues() };
    const params = {
      tenantId: data.tenantId,
      email: employeeIdOrEmail,
    };
    try {
      await queryClient.fetchQuery(queryOptions.duplicateCheckEmail(params));
      return DuplicateState.ok;
    } catch (error: any) {
      return DuplicateState.duplicated;
    }
  };

  const handleOnSubmit = async (data: any) => {
    console.log('#### handleOnSubmit', data);

    if (!props.instructorId) {
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
      nationCd: null,
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

    const confirmOk = await openConfirm(t('저장 하시겠습니까?'));
    if (!confirmOk) return;

    let validation = true;
    // [1] 사외 강사인 경우 회원가입 API호출
    if (data.instructorType === 'EXTERNAL_INSTRUCTOR') {
      await createTutor(payloadTutor, {
        onSuccess: async (data: any, variables: any, context: any) => {
          console.log('[1] onSuccess:', data);
          if (data && Object.keys(data).includes('uuid')) {
            payloadUser.body.addUserUuids[0].userUuid = data.uuid;
          }
        },
        onError: (data: any, variables: any, context: any) => {
          console.log('[1] onError:', data);
          validation = false;
        },
      });
    }

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
            router.navigate({ to: '/learning-operate-support/instructor/management' });
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

    if (await openConfirm(t('수정 하시겠습니까?'))) {
      updateInstructor(payload, {
        onSuccess: async (data: any) => {
          await showUpdateComplete();
          if (props.viewMode === EnPageMode.PAGE) {
            router.navigate({ to: '/learning-operate-support/instructor/management' });
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
    if (await openConfirm(t('삭제 하시겠습니까?'))) {
      deleteInstructor(props.instructorId, {
        onSuccess: async () => {
          await showDeleteComplete();
          router.navigate({ to: '/learning-operate-support/instructor/management' });
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
      <FormRow2
        provider={provider}
        name={'isView'}
        type={'hidden'}
        format={'string'}
        value={props.instructorId ? EnFormMode.VIEW : EnFormMode.ADD}
      />
      <FormRow2
        provider={provider}
        name={'userUuid'}
        type={'hidden'}
        format={'string'}
        value={''}
        disabled={true}
      />
      <ContentsRow>
        <FormRow2
          provider={provider}
          name="tenantId"
          type="dropdown"
          label={t('LABEL.form.label.tenant', '테넌트')}
          format={'number'}
          presetOptionLabel={t('LABEL.form.label.select', '선택')}
          optionsConfig={{
            codeGroup: CODE_GROUP['manual.bo.my.tenant.tenantId'],
          }}
          disabled={props.instructorId || props.readOnly}
          element={<DropdownFormField />}
          validation={{ required: true }}
        />
        <FormRow2
          provider={provider}
          name="instructorType"
          type={'radio-group'}
          label={t('강사 타입')}
          value={'INTERNAL_INSTRUCTOR'}
          options={[
            { label: t('사내'), value: 'INTERNAL_INSTRUCTOR' },
            { label: t('사외'), value: 'EXTERNAL_INSTRUCTOR' },
          ]}
          disabled={props.instructorId || props.readOnly}
          element={<RadioGroupFormField />}
          validation={{ required: true }}
        />
        <FormDisplay
          provider={provider}
          dependencies={[{ name: 'instructorType', value: 'INTERNAL_INSTRUCTOR' }]}
        >
          <FormRow2
            provider={provider}
            name="isFulltimeInstructor"
            type={'radio-group'}
            label={t('전임강사 여부')}
            value={1}
            options={[
              { label: t('비전임'), value: 1 },
              { label: t('전임'), value: 2 },
            ]}
            disabled={props.instructorId || props.readOnly}
            element={<RadioGroupFormField />}
            validation={{ required: true }}
          />
        </FormDisplay>
      </ContentsRow>
      <ContentsRow>
        <FormRow2
          provider={provider}
          name="roleId"
          type={'dropdown'}
          label={t('LABEL.form.label.roleId', '역할 선택')}
          format={'number'}
          presetOptionLabel={t('LABEL.form.label.select', '선택')}
          options={roleIdOptions}
          disabled={props.instructorId || props.readOnly}
          element={<DropdownFormField />}
          validation={{ required: true }}
        />
        <FormRow2
          provider={provider}
          name="dateRange"
          type={'date-range'}
          label={t('역할 부여 기간')}
          format={'object'}
          // value: { from: undefined, to: undefined },
          placeholder={''}
          maxLength={150}
          disabled={props.readOnly}
          element={<DateRangePickerFormField />}
          validation={{
            required: true,
            conditions: [
              {
                fn: (values: any) => !values.dateRange?.from,
                message: t('시작 날짜를 선택하세요'),
              },
              {
                fn: (values: any) => !values.dateRange?.to,
                message: t('종료 날짜를 선택하세요.'),
              },
              {
                fn: (values: any) => values.dateRange.from > values.dateRange.to,
                message: t('시작 날짜는 종료 날짜 보다 이전일 이어야 합니다.'),
              },
            ],
          }}
        />
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
          <FormRow2
            provider={provider}
            name="instructorName"
            label={t('이름')}
            type={'custom'}
            format={'string'}
            placeholder={' '}
            disabled={props.instructorId || props.readOnly}
            element={
              <InputModalSelectorFormField
                readOnly={props.readOnly}
                transformModalData={(data: any) => {
                  console.log('transData:', data);
                  return {
                    instructorName: data.name,
                    companyName: data.company?.name,
                    employeeIdOrEmail: data.email,
                    telNo: data.phoneNumber,
                    birthday: new Date(data.birthday),
                    userUuid: data.uuid,
                  };
                }}
                modalConfig={{
                  title: '',
                  width: 'xl',
                  content: <UserChoiceModal />,
                }}
              />
            }
            validation={{ required: true }}
          />
          <FormRow2
            provider={provider}
            name="companyName"
            type={'text'}
            label={t('회사')}
            placeholder={' '}
            disabled={props.instructorId || props.readOnly}
            element={<InputFormField disabled={true} />}
            validation={{ required: true }}
          />
          <FormRow2
            provider={provider}
            name="profileFileUuid"
            type={'text'}
            format={'string'}
            label={t('프로필 사진')}
            max={1}
            uploadConfig={{
              affairsType: 'LMS',
              s3Path: S3_PATH['upload/content/image'], // BE에 확인 필요
              acceptFiles: ['JPEG', 'JPG', 'PNG', 'GIF'],
              maxFileCount: 1,
            }}
            disabled={props.readOnly}
            element={<SingleAttachmentFormField />}
          />
        </ContentsRow>
        <ContentsRow>
          <FormRow2
            provider={provider}
            name="employeeIdOrEmail"
            type={'text'}
            format={'string'}
            label={t('계정(사번/이메일)')}
            placeholder={' '}
            disabled={props.instructorId || props.readOnly}
            element={<InputFormField disabled={true} />}
            validation={{
              required: true,
              conditions: [
                {
                  fn: (values: any) => {
                    if (!values.employeeIdOrEmail) return false;
                    const value = values.employeeIdOrEmail;
                    if (value.trim().length === 0) return false;
                    const pattern = new RegExp(EMAIL_REGEX, 'i');
                    return !pattern.test(value.trim());
                  },
                  message: t('이메일 형식에 맞게 입력해 주세요.'),
                },
              ],
            }}
          />
          <FormRow2
            provider={provider}
            name="telNo"
            type={'text'}
            format={'object'}
            label={t('연락처')}
            // fields={{
            //   nationCode: 'telCountryCode',
            //   number: 'telNo',
            // }}
            disabled={props.instructorId || props.readOnly}
            element={
              <PhoneNumberFormField
                phoneNumberConfig={{
                  options: [{ value: 'KOR_82', label: '+82' }],
                }}
              />
            }
            validation={{ required: true }}
          />

          <FormRow2
            provider={provider}
            name={'telCountryCode'}
            type={'hidden'}
            format={'string'}
            value={'KOR_82'}
            disabled={props.instructorId || props.readOnly}
            element={<DropdownFormField />}
            validation={{ required: true }}
          />
          <FormRow2
            provider={provider}
            name="nationCd"
            type={'text'}
            label={t('국가코드')}
            value={'ko_KR'}
            disabled={props.instructorId || props.readOnly}
            element={<InputFormField disabled={true} />}
            validation={{ required: true }}
          />
        </ContentsRow>
        <ContentsRow>
          <FormRow2
            provider={provider}
            name="birthday"
            label={t('생년월일')}
            type={'custom'}
            format={'object'}
            disabled={props.instructorId || props.readOnly}
            element={<DatePickerFormField displayType="day" disabled={true} />}
            validation={{ required: true }}
          />
          <FormRow2
            provider={provider}
            name="carNumber"
            type={'text'}
            label={t('차량번호')}
            disabled={props.readOnly}
            element={<InputFormField />}
          />
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
          <FormRow2
            provider={provider}
            name="instructorName"
            label={t('이름')}
            type={'text'}
            format={'string'}
            placeholder={' '}
            disabled={props.instructorId || props.readOnly}
            element={<InputFormField />}
            validation={{ required: true }}
          />
          <FormRow2
            provider={provider}
            name="companyName"
            type={'text'}
            label={t('회사')}
            placeholder={' '}
            disabled={props.instructorId || props.readOnly}
            element={<InputFormField />}
            validation={{ required: true }}
          />
          <FormRow2
            provider={provider}
            name="profileFileUuid"
            type={'text'}
            format={'string'}
            label={t('프로필 사진')}
            max={1}
            uploadConfig={{
              affairsType: 'LMS',
              s3Path: S3_PATH['upload/content/image'], // BE에 확인 필요
              acceptFiles: ['JPEG', 'JPG', 'PNG', 'GIF'],
              maxFileCount: 1,
            }}
            disabled={props.readOnly}
            element={<SingleAttachmentFormField />}
          />
        </ContentsRow>
        <ContentsRow>
          <FormRow2
            provider={provider}
            name="employeeIdOrEmail"
            type={'custom'}
            format={'object'}
            label={t('계정(사번/이메일)')}
            value={{ fieldValue: '', checkState: DuplicateState.needInput }}
            placeholder={' '}
            disabled={props.instructorId || props.readOnly}
            element={<DuplicateCheckInputFormField onDuplicationCheck={duplicateCheckEmail} />}
            validation={{
              required: true,
              conditions: [
                {
                  fn: (values: any) => {
                    if (!values.employeeIdOrEmail) return false;
                    const value = values.employeeIdOrEmail.fieldValue;
                    if (value.trim().length === 0) return false;
                    const pattern = new RegExp(EMAIL_REGEX, 'i');
                    return !pattern.test(value.trim());
                  },
                  message: t('이메일 형식에 맞게 입력해 주세요.'),
                },
                {
                  fn: (values: any) => {
                    console.log('checkState=>', values.employeeIdOrEmail.checkState);
                    const value = values.employeeIdOrEmail.checkState;
                    return value !== DuplicateState.ok;
                  },
                  message: t('이미 등록된 강사 정보입니다.'),
                },
              ],
            }}
          />
          <FormRow2
            provider={provider}
            name="password"
            type={'text'}
            label={t('LABEL.common.password')}
            element={<InputFormField type="password" />}
            validation={{
              required: true,
              conditions: [
                {
                  fn: (values: any) => {
                    if (!values.password || !values.passwordConfirm) return false;
                    return values.password.trim() !== values.passwordConfirm.trim();
                  },
                  message: t('LABEL.form.validation.password.04'),
                },
                {
                  fn: (values: any) => {
                    if (!values.password) return false;
                    const value = values.password;
                    if (value.trim().length === 0) return false;
                    return !passwordRegx01.test(value.trim());
                  },
                  message: t('LABEL.form.validation.password.01'),
                },
                {
                  fn: (values: any) => {
                    if (!values.password) return false;
                    const value = values.password;
                    if (value.trim().length === 0) return false;
                    return !passwordRegx02.test(value.trim());
                  },
                  message: t('LABEL.form.validation.password.02'),
                },
                {
                  fn: (values: any) => {
                    if (!values.password) return false;
                    const value = values.password;
                    if (value.trim().length === 0) return false;
                    return !passwordRegx03.test(value.trim());
                  },
                  message: t('LABEL.form.validation.password.03'),
                },
              ],
            }}
          />
          <FormRow2
            provider={provider}
            name="passwordConfirm"
            type={'text'}
            label={t('LABEL.common.passwordVerify')}
            element={<InputFormField type="password" />}
            validation={{
              required: true,
              conditions: [
                {
                  fn: (values: any) => {
                    if (!values.password || !values.passwordConfirm) return false;
                    return values.password.trim() !== values.passwordConfirm.trim();
                  },
                  message: t('LABEL.form.validation.password.04'),
                },
                {
                  fn: (values: any) => {
                    if (!values.passwordConfirm) return false;
                    const value = values.passwordConfirm;
                    if (value.trim().length === 0) return false;
                    return !passwordRegx01.test(value.trim());
                  },
                  message: t('LABEL.form.validation.password.01'),
                },
                {
                  fn: (values: any) => {
                    if (!values.passwordConfirm) return false;
                    const value = values.passwordConfirm;
                    if (value.trim().length === 0) return false;
                    return !passwordRegx02.test(value.trim());
                  },
                  message: t('LABEL.form.validation.password.02'),
                },
                {
                  fn: (values: any) => {
                    if (!values.passwordConfirm) return false;
                    const value = values.passwordConfirm;
                    if (value.trim().length === 0) return false;
                    return !passwordRegx03.test(value.trim());
                  },
                  message: t('LABEL.form.validation.password.03'),
                },
              ],
            }}
          />
        </ContentsRow>
        <ContentsRow>
          <FormRow2
            provider={provider}
            name="telNo"
            type={'phone-number'}
            format={'string'}
            label={t('연락처')}
            fields={{
              nationCode: 'telCountryCode',
              number: 'telNo',
            }}
            disabled={props.instructorId || props.readOnly}
            element={
              <PhoneNumberFormField
                phoneNumberConfig={{
                  options: [{ value: 'KOR_82', label: '+82' }],
                }}
              />
            }
            validation={{ required: true }}
          />
          <FormRow2
            provider={provider}
            name={'telCountryCode'}
            type={'hidden'}
            format={'string'}
            value={'KOR_82'}
            disabled={props.instructorId || props.readOnly}
            validation={{ required: true }}
            element={<InputFormField />}
          />
          <FormRow2
            provider={provider}
            name="nationCd"
            type={'text'}
            label={t('국가코드')}
            value={'ko_KR'}
            disabled={props.instructorId || props.readOnly}
            element={<InputFormField />}
            validation={{ required: true }}
          />
          <FormRow2
            provider={provider}
            name="birthday"
            label={t('생년월일')}
            type={'text'}
            format={'object'}
            disabled={props.instructorId || props.readOnly}
            element={<DatePickerFormField displayType="day" />}
            validation={{ required: true }}
          />
        </ContentsRow>
        <ContentsRow>
          <FormRow2
            provider={provider}
            name="carNumber"
            type={'text'}
            label={t('차량번호')}
            disabled={props.readOnly}
            element={<InputFormField />}
          />
        </ContentsRow>
      </FormDisplay>
      {/* 강사 타입(사외) 끝 */}
      {/* 강사 타입(사내/사외) 시작 */}
      <ContentsRow>
        <FormRow2
          provider={provider}
          name="introduction"
          type={'textarea'}
          label={t('강사 소개')}
          maxLength={500}
          placeholder={t('강사 소개를 입력해 주세요.')}
          disabled={props.readOnly}
          element={<TextareaFormField resize="none" />}
          validation={{ required: true }}
        />
      </ContentsRow>
      <ContentsRow>
        <FormRow2
          provider={provider}
          name="career"
          type={'textarea'}
          label={t('강사 경력')}
          maxLength={500}
          placeholder={t('강사 경력을 입력해 주세요.')}
          disabled={props.readOnly}
          element={<TextareaFormField resize="none" />}
          validation={{ required: true }}
        />
      </ContentsRow>
      <ContentsRow>
        <FormRow2
          provider={provider}
          name="carreerFileGroupUuid"
          type={'attachment'}
          uuidType={'group'}
          label={t('강사 경력 인정 파일')}
          max={10}
          uploadConfig={{
            affairsType: 'LMS',
            s3Path: S3_PATH['upload/content/image'], // TODO: groupUUID개발 완료 후 테스트 필요 / BE에 확인 필요
            acceptFiles: ['JPEG', 'JPG', 'PNG', 'GIF'],
            maxFileCount: 10,
          }}
          description={t(
            '파일 사이즈 000x000 / 확장자 JPEG, JPG, PNG, GIF / 업로드 가능 1개 / 파일용량 최대 50MB',
          )}
          disabled={props.readOnly}
          element={<AttachmentFormField />}
        />
      </ContentsRow>
      <ContentsRow>
        <FormRow2
          provider={provider}
          name="carreerYearMonth"
          type={'number'}
          label={t('강사 경력 년수')}
          format={'object'}
          value={{ year: carreerYearVal, month: carreerMonthVal }}
          placeholder={''}
          disabled={props.readOnly}
          element={
            <>
              <Input
                name="carreerYear"
                type="number"
                suffixText={t('년')}
                value={carreerYearVal}
                onChange={(e: any) => setCarreerYearVal(e.target.value)}
                disabled={props.readOnly}
              />
              <Input
                name="carreerMonth"
                type="number"
                suffixText={t('개월')}
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
