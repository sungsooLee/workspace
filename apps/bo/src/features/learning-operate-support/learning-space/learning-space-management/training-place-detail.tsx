import { useSpaceMutation } from '@entities/training-place';
import SpaceService from '@entities/training-place/api/space';
import { DropdownFormField, DuplicateCheckInputFormField, DuplicateState } from '@features/form';
import { FormDisplay } from '@features/form/ui/form-display';
import { CODE_GROUP, DynamicFormConfig, S3_PATH, useDynamicForm } from '@learnway/hooks';
import {
  ContentsRow,
  FormSubTitle,
  Input,
  RadioGroupFormField,
  TextareaFormField,
  useModal,
  useToast,
} from '@learnway/ui';
import { FormRow } from '@shared/ui';
import { AddressSearchFormField } from '@shared/ui/form/address-search-form-field';
import { SingleAttachmentFormField } from '@shared/ui/form/single-attachment-form-field';
import { AddressSearchModal } from '@shared/ui/modal/address-search-modal';
import { useRouter } from '@tanstack/react-router';
import { EnFormMode, EnPageMode } from '@types';
import { t } from 'i18next';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Space } from 'src/types/entities/space';

const URL_REGEX =
  /((https?:\/\/(www\.)?)|(www\.))[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)(?<![-.+():%])/;

interface TrainingPlaceDetailProps {
  spaceId?: number;
  pageMode: EnPageMode;
  mode: EnFormMode;
  onComplete?: (data: any) => void;
}

const TrainingPlaceDetailComponent = (props: TrainingPlaceDetailProps, ref: any) => {
  const router = useRouter();
  const { openModal, alert: openAlert, confirm: openConfirm, closeModal } = useModal();
  const { open: openToast } = useToast();
  const [savedId, setSavedId] = useState(undefined);
  const { provider, updateFormData, onSubmit, onFormChange, getValues } =
    useDynamicForm(formConfig());

  const [detailData, setDetailData] = useState<Space>();

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    (async () => {
      if (props.spaceId) setDetailData(await SpaceService.fetch(props.spaceId));
    })();
  }, []);

  useEffect(() => {
    if (props.mode === EnFormMode.VIEW && detailData) {
      console.log('### detailData', detailData);
      const initialData = {
        ...detailData,
        learningSpaceCode: {
          fieldValue: detailData.learningSpaceCode,
          checkState: DuplicateState.okStart,
        },
      };
      console.log('### initialData', initialData);
      updateFormData(initialData);
    }
  }, [detailData]);

  useEffect(() => {
    if (savedId && props.onComplete) props.onComplete({ spaceId: savedId });
  }, [savedId, props]);

  useImperativeHandle(ref, () => ({
    saveData() {
      console.log('saveData');
      const form = formRef.current;
      if (form) {
        console.log('formValue');
        form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
      }
    },
    deleteData() {
      openConfirm({
        title: t('삭제 하시겠습니까?'),
        onClose: (value: boolean) => {
          value && deleteSpace(props.spaceId);
        },
      });
    },
    clearForm() {
      onFormChange();
    },
  }));

  const mutationHandler = (data: any, title: string) => {
    openToast({ title, type: 'success' });
    if (props.pageMode === EnPageMode.MODAL && data) {
      setSavedId(data);
    } else router.navigate({ to: '/learning/training-place' });
  };

  const { mutate: createSpace } = useSpaceMutation('create', {
    onSuccess: (data: any) => mutationHandler(data, t('저장 하였습니다.')),
  });

  const { mutate: updateSpace } = useSpaceMutation('update', {
    onSuccess: () => mutationHandler(undefined, t('저장 하였습니다.')),
  });

  const { mutate: deleteSpace } = useSpaceMutation('delete', {
    onSuccess: () => mutationHandler(undefined, t('삭제 하였습니다.')),
  });

  const duplicateCheck = async (learningSpaceCode: string) => {
    const result: boolean = await SpaceService.existsCode(learningSpaceCode);

    if (result) return DuplicateState.duplicated;
    else return DuplicateState.ok;
  };

  const handleAddressSearchResult = (address: any) => {
    console.log('address', address);
    updateFormData({ ...getValues(), address: address.roadAddr, postalCode: address.zipNo });
  };

  const handleSearchAddress = async () => {
    openModal({
      width: 'sm',
      content: <AddressSearchModal onSelect={handleAddressSearchResult} />,
    });
  };

  const formDisabled = props.mode === EnFormMode.VIEW && props.pageMode === EnPageMode.MODAL;

  const isUsedFormField = (
    <FormRow
      provider={provider}
      name={'isUsed'}
      element={<RadioGroupFormField disabled={formDisabled} />}
    />
  );

  const handleOnSubmit = async (data: any) => {
    if (props.mode === EnFormMode.VIEW && props.pageMode === EnPageMode.MODAL) {
      closeModal();
      return;
    }
    console.log('#### handleOnSubmit', data);

    if (props.mode === EnFormMode.ADD) {
      const payload = {
        ...data,
        learningSpaceCode: data.learningSpaceCode.fieldValue,
      };
      if (await openConfirm(t('저장 하시겠습니까?'))) {
        createSpace(payload);
      }
    } else if (props.mode === EnFormMode.VIEW) {
      const payload = {
        ...data,
        learningSpaceId: props.spaceId,
        learningSpaceCode: data.learningSpaceCode.fieldValue,
      };
      if (await openConfirm(t('수정 하시겠습니까?'))) {
        updateSpace(payload);
      }
    }
  };

  return (
    <form ref={formRef} onSubmit={onSubmit(handleOnSubmit)}>
      <FormSubTitle label={t('기본정보')} lineType="dark" />
      <ContentsRow>
        <FormRow
          provider={provider}
          name={'tenantId'}
          element={<DropdownFormField readOnly={props.mode === EnFormMode.VIEW} />}
        />
        <FormRow
          provider={provider}
          name={'onOffLineType'}
          element={<RadioGroupFormField disabled={props.mode === EnFormMode.VIEW} />}
        />
      </ContentsRow>
      <ContentsRow>
        <FormRow
          provider={provider}
          name={'learningSpaceName'}
          element={<Input readOnly={formDisabled} />}
        />
        <FormRow
          provider={provider}
          name={'learningSpaceCode'}
          element={
            <DuplicateCheckInputFormField
              onDuplicationCheck={duplicateCheck}
              readOnly={formDisabled}
            />
          }
        />
      </ContentsRow>
      {/* Online */}
      <FormDisplay provider={provider} dependencies={[{ name: 'onOffLineType', value: 'ONLINE' }]}>
        <ContentsRow>
          <FormRow
            provider={provider}
            name={'linkUrl'}
            element={<Input readOnly={formDisabled} />}
          />
          {isUsedFormField}
        </ContentsRow>
      </FormDisplay>
      {/* Offline */}
      <FormDisplay provider={provider} dependencies={[{ name: 'onOffLineType', value: 'OFFLINE' }]}>
        <ContentsRow>
          <FormRow provider={provider} name={'address'} element={<AddressSearchFormField />} />
          <FormRow
            provider={provider}
            name={'addressDetail'}
            element={<Input readOnly={formDisabled} />}
          />
        </ContentsRow>
        <ContentsRow>
          <FormRow
            provider={provider}
            name={'mapFileGroupUuid'}
            element={<SingleAttachmentFormField readOnly={formDisabled} />}
          />
          {isUsedFormField}
        </ContentsRow>
      </FormDisplay>

      <FormSubTitle label={t('기타정보')} lineType="dark" />
      <ContentsRow>
        <FormRow
          provider={provider}
          name={'notes'}
          element={<TextareaFormField resize={'none'} size="sm" readOnly={formDisabled} />}
        />
      </ContentsRow>
    </form>
  );
};

export const TrainingPlaceDetail = forwardRef(TrainingPlaceDetailComponent);

const formConfig = (): DynamicFormConfig => ({
  builders: [
    {
      name: 'tenantId',
      type: 'dropdown',
      format: 'object',
      label: t('테넌트'),
      value: '',
      presetOptionLabel: t('선택'),
      optionsConfig: {
        codeGroup: CODE_GROUP['manual.bo.my.tenant.tenantId'],
      },
    },
    {
      name: 'onOffLineType',
      type: 'radio-group',
      label: t('교육공간 타입'),
      value: 'ONLINE',
      optionsConfig: {
        codeGroup: CODE_GROUP['lms.space.OnOffLineType'],
      },
    },
    {
      name: 'learningSpaceCode',
      type: 'custom',
      label: t('교육공간 코드'),
      value: { fieldValue: '', checkState: DuplicateState.needInput },
      format: 'object',
      placeholder: '',
      maxlength: 20,
    },
    {
      name: 'learningSpaceName',
      type: 'text',
      label: t('교육공간명'),
      value: '',
      placeholder: '',
      maxLength: 40,
    },
    {
      name: 'isUsed',
      type: 'radio-group',
      label: t('사용 여부'),
      value: true,
      format: 'boolean',
      options: [
        { value: true, label: t('사용') },
        { value: false, label: t('미사용') },
      ],
    },
    {
      name: 'linkUrl',
      type: 'text',
      label: t('링크주소'),
      value: '',
      placeholder: t('http://를 포함한 전체 URL을 입력하세요.'),
    },
    {
      name: 'address',
      type: 'custom',
      label: t('주소'),
      value: '',
      format: 'string',
      fields: {
        postalCode: 'postalCode',
        address: 'address',
      },
    },
    {
      label: '',
      name: 'postalCode',
      type: 'hidden',
      format: 'string',
      value: '',
    },
    {
      name: 'addressDetail',
      type: 'text',
      label: t('상세 주소'),
      value: '',
      placeholder: '',
      maxLength: 50,
    },
    {
      name: 'mapFileGroupUuid',
      type: 'single-attachment',
      label: t('약도 파일'),
      uploadConfig: {
        affairsType: 'LMS',
        s3Path: S3_PATH['upload/content/image'],
        acceptFiles: ['JPEG', 'JPG', 'PNG', 'GIF'],
        maxFileSize: 10 * 1024 * 1024,
      },
      value: '',
    },
    {
      name: 'notes',
      type: 'textarea',
      label: t('메모'),
      value: '',
      placeholder: '',
      maxLength: 500,
    },
  ],
  validator: {
    tenantId: true,
    onOffLineType: true,
    learningSpaceName: true,
    learningSpaceCode: {
      format: 'object',
      required: true,
      conditions: [
        {
          fn: (values) => {
            const fieldValue = values.learningSpaceCode.fieldValue;
            if (fieldValue === '') return true;
            return false;
          },
          message: t('LABEL.form.validation.needInput', { code: t('교육공간 코드') }),
        },
        {
          fn: (values: Record<string, any>) =>
            values.learningSpaceCode.checkState === DuplicateState.check ||
            values.learningSpaceCode.checkState === DuplicateState.needInput,
          message: t('LABEL.form.validation.check', { code: t('교육공간 코드') }),
        },
        {
          fn: (values: Record<string, any>) =>
            values.learningSpaceCode.checkState === DuplicateState.duplicated,
          message: t('LABEL.form.validation.duplicated', { code: t('교육공간 코드') }),
        },
      ],
    },
    isUsed: true,
    linkUrl: {
      required: (values) => values.onOffLineType === 'ONLINE',
      conditions: [
        {
          fn: (values) => {
            if (values.linkUrl.trim().length === 0) return false;
            const pattern = new RegExp(URL_REGEX, 'i');
            return !pattern.test(values.linkUrl.trim());
          },
          message: t('URL 형식에 맞게 입력해 주세요.'),
        },
      ],
    },
    address: {
      required: (values) => values.onOffLineType === 'OFFLINE',
    },
    addressDetail: {
      required: (values) => values.onOffLineType === 'OFFLINE',
    },
  },
});
