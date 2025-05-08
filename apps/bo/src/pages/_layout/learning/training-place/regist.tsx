import { useState } from 'react';
import { t } from 'i18next';
import { createFileRoute } from '@tanstack/react-router';
import { cn } from '@learnway/shared';
import { IcoRefresh02, IcoSearch, IcoFormRequired, IcoTrash03, IcoPpt } from '@learnway/icons';
import { PageContainer } from '@widgets/layout/ui/container/page-container';
import { ContentsHistoryInfoFormField, FormSubTitle } from '@shared/ui';

import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';
import searchStyles from '@learnway/styles/bo/assets/styles/modules/search-box.module.css';
import popupStyles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';
import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';
import fileUploadStyles from '@learnway/styles/bo/assets/styles/modules/file-upload.module.css'; // 파일 업로드
import { ChipListModalSelectorFormField } from '@learnway/ui';

import {
  Button,
  Input,
  Dropdown,
  ContentsRow,
  InputModalSelectorFormField,
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalTitle,
  useModal,
  DynamicFormField,
  Textarea,
  RadioGroupFormField,
} from '@learnway/ui';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { MainContents } from '@widgets/layout/ui/container/slot/main-contents';
import { useDynamicForm } from '@/libs/hooks/src';
import { FormRow } from '@shared/ui';
import { DynamicFormConfig } from '@/libs/hooks/src';
import { ContentsButtons } from '@widgets/layout/ui/container/slot/contents-buttons';
import { LinkBox } from '@widgets/layout/ui/container/slot/link-box';

export const Route = createFileRoute('/_layout/learning/training-place/regist')({
  component: RouteComponent,
});

function RouteComponent() {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const options = [
    { value: 'option1', label: '전체' },
    { value: 'option2', label: '옵션 2' },
    { value: 'option3', label: '옵션 3' },
  ];

  const { provider, fetchData, onSubmit, onFormChange, getValues, clearFormError, setFormError } =
    useDynamicForm(formConfig);

  return (
    <form className="form_row">
      <PageContainer>
        <ContentsButtons>
          <LinkBox>
            <Button variant="point" size="sm">
              {t('목록')}
            </Button>
          </LinkBox>

          <Button variant="point" size="sm">
            {t('초기화')}
          </Button>
          <Button variant="primary" size="sm">
            {t('저장')}
          </Button>
        </ContentsButtons>
        <MainContents>
          <FormSubTitle label={'교육장소 정보 '} />
          <ContentsRow>
            <FormRow provider={provider} className={dynamicFormStyles.w_half}>
              <DynamicFormField name={'placeDivision'} />
            </FormRow>
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider} className={dynamicFormStyles.w_half}>
              <DynamicFormField name={'placeCode'} />
            </FormRow>
            <FormRow provider={provider} className={dynamicFormStyles.w_half}>
              <DynamicFormField name={'placeName'} />
            </FormRow>
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'tenantName'}>
                <ChipListModalSelectorFormField
                  chipList={{
                    labelField: 'name',
                    valueField: 'value',
                    hideBorder: true,
                  }}
                  modalConfig={{
                    title: '',
                    width: 'xl',
                    content: '',
                  }}
                />
              </DynamicFormField>
            </FormRow>
          </ContentsRow>

          <ContentsRow>
            {/* form_item */}
            <div className={formStyles.form_item}>
              <label htmlFor="name-map" className={formStyles.form_label}>
                <span className={formStyles.form_text}>약도 이미지 첨부</span>
              </label>
              <div className={formStyles.input_box}>
                <div className={cn(fileUploadStyles.start, fileUploadStyles.wrap)}>
                  {/* 첨부 전 */}
                  <div className={fileUploadStyles.upload_single}>
                    <div className={fileUploadStyles.view_file}>
                      <div className={fileUploadStyles.attach_area}>
                        <p className={fileUploadStyles.text}>버튼 클릭 후 파일을 첨부하세요.</p>
                      </div>
                    </div>
                    <Button className={fileUploadStyles.btn_attach} size={'sm'} variant={'gray'}>
                      <input type="file" className={fileUploadStyles.input_file} />
                      {'파일첨부'}
                    </Button>
                  </div>
                  <div className={fileUploadStyles.upload_single}>
                    <div className={fileUploadStyles.view_file}>
                      <div className={fileUploadStyles.attach_area}>
                        <p className={fileUploadStyles.attach_view}>
                          <IcoPpt
                            width={'20'}
                            height={'21'}
                            className={fileUploadStyles.icon_type}
                          />
                          <span className={fileUploadStyles.attached_name}>{'파일명.png'}</span>
                        </p>
                        <Button className={fileUploadStyles.btn_clear} onlyIcon>
                          <IcoTrash03 width={20} height={20} stroke="#131C30" />
                        </Button>
                      </div>
                    </div>
                    <Button className={fileUploadStyles.btn_attach} size={'sm'} variant={'gray'}>
                      <input type="file" className={fileUploadStyles.input_file} />
                      {'파일첨부'}
                    </Button>
                  </div>
                </div>
              </div>
              <p className={cn(formStyles.guide_text)}>
                {
                  '※ 첨부파일은 png, jpg, gif 형식만 업로드 가능하며, 이미지 사이즈는 500 X 500으로 업로드해 주세요.'
                }
              </p>
            </div>
            {/* form_item */}
            <FormRow provider={provider} className={dynamicFormStyles.w_half}>
              <DynamicFormField name={'linkAddress'} />
            </FormRow>
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'description'} size="sm" resize="none" />
            </FormRow>
          </ContentsRow>

          <ContentsRow>
            <FormRow provider={provider} className={dynamicFormStyles.w_half}>
              <DynamicFormField name={'isReservationUsed'} />
            </FormRow>
            <FormRow provider={provider} className={dynamicFormStyles.w_half}>
              <DynamicFormField name={'isUsed'} />
            </FormRow>
          </ContentsRow>

          <ContentsRow className={cn(formStyles.no_line, formStyles.space2)}>
            <ContentsHistoryInfoFormField />
          </ContentsRow>
        </MainContents>
      </PageContainer>
    </form>
  );
}

const formConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'placeDivision',
      type: 'dropdown',
      label: t('구분'),
      value: '',
      options: [
        { label: '선택', value: '' },
        { value: 'campus', label: t('캠퍼스') },
        { value: 'option1', label: t('서비스기술교육') },
        { value: 'option2', label: t('생기클러스터') },
        { value: 'external', label: t('외부') },
        { value: 'overseas', label: t('해외') },
      ],
    },
    {
      name: 'placeCode',
      type: 'text',
      label: t('장소 코드'),
      value: '',
      placeholder: '입력',
    },
    {
      name: 'placeName',
      type: 'text',
      label: t('장소 명'),
      value: '',
      placeholder: '입력',
    },
    {
      name: 'tenantName',
      type: 'custom',
      label: t('테넌트 명'),
      value: '',
    },
    {
      name: 'linkAddress',
      type: 'text',
      label: t('링크 주소'),
      value: '',
      placeholder: 'http:// 또는 https:// 전체 URL을 입력하세요.',
    },
    {
      name: 'description',
      type: 'textarea',
      label: t('비고'),
      value: '',
      maxLength: 2000,
      placeholder: '비고 내용을 입력하세요.',
      guideText: '※ 사용자에게 노출되지 않습니다.',
    },
    {
      name: 'isReservationUsed',
      type: 'radio-group',
      label: t('예약 가능'),
      value: 'Y',
      options: [
        { value: 'Y', label: '예약 가능' },
        { value: 'N', label: '예약 불가' },
      ],
    },
    {
      name: 'isUsed',
      type: 'radio-group',
      label: t('사용 가능'),
      value: 'Y',
      options: [
        { value: 'Y', label: '사용 가능' },
        { value: 'N', label: '사용 불가' },
      ],
    },
  ],
  validator: {
    placeDivision: { required: true },
    placeCode: { required: true },
    placeName: { required: true },
    tenantName: { required: true },
    isUsed: { required: true },
  },
};
