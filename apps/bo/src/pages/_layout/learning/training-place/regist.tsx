import { useState } from 'react';
import { t } from 'i18next';
import { createFileRoute } from '@tanstack/react-router';
import { cn } from '@learnway/shared';
import { IcoRefresh02, IcoSearch, IcoFormRequired, IcoTrash03, IcoPpt } from '@learnway/icons';
import { PageContainer } from '@widgets/layout/ui/container/page-container';
import { ContentsHistoryInfoFormField, FormSubTitle } from '@shared/ui';

import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';
import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';
import fileUploadStyles from '@learnway/styles/bo/assets/styles/modules/file-upload.module.css'; // 파일 업로드
import { ChipListModalSelectorFormField } from '@learnway/ui';
import { AddressSearchModal } from '@features/shared';

import { Button, ContentsRow, useModal, DynamicFormField } from '@learnway/ui';
import { MainContents } from '@widgets/layout/ui/container/slot/main-contents';
import { useDynamicForm, DynamicFormConfig } from '@learnway/hooks';
import { FormRow } from '@shared/ui';
import { ContentsButtons } from '@widgets/layout/ui/container/slot/contents-buttons';
import { LinkBox } from '@widgets/layout/ui/container/slot/link-box';
import { useCreateTraningPlace } from '@entities/training-place/service/training-place.hook';

export const Route = createFileRoute('/_layout/learning/training-place/regist')({
  component: RouteComponent,
});

function RouteComponent() {
  const { open: openModal, confirm: openConfirm } = useModal();
  const { provider, fetchData, onSubmit, onFormChange, getValues, clearFormError, setFormError } =
    useDynamicForm(formConfig);

  const { create: createTraningPlace } = useCreateTraningPlace({});

  const handleAddressSearchResult = (address: any) => {
    console.log('address', address);
    fetchData({ zipNo: address.zipNo, address1: address.roadAddr });
  };

  const handleAddressSearch = () => {
    openModal({
      width: 'sm',
      content: <AddressSearchModal onSelect={handleAddressSearchResult} />,
    });
  };

  const handleOnSubmit = (node: any) => {
    console.log('### handleOnSubmit node', node);
    /*
    {
      "educationPlaceType": "CAMPUS",
      "educationPlaceCode": "ssdsd",
      "educationPlaceName": "sdsd",
      "tenantList": [
          {
              "name": "현대제철",
              "value": 1
          }
      ],
      "linkAddress": "",
      "educationPlaceRemarkContent": "test",
      "isReservationUsed": "N",
      "isUsed": "N",
      "zipNo": "07283",
      "address1": "서울특별시 영등포구 문래로4길 4 (문래동6가)",
      "address2": ""
  }
  */
    openConfirm({
      title: t('LABEL.confirm.save.title'),
      content: <p>{t('LABEL.confirm.save.message')}</p>,
      onClose: (value: boolean) => {
        if (value) {
          const payload = {
            educationPlaceTypecd: node.educationPlaceType,
            educationPlaceCode: node.educationPlaceCode,
            educationPlaceCodeName: node.educationPlaceName,
            tenantList: node.tenantList.map((item: any) => ({ tenantId: item.value })),
            isReservationUsed: node.isReservationUsed === 'Y' ? true : false,
            zipNo: node.zipNo,
            addr: node.address1,
            addrDetail: node.address2,
            educationPlaceRemarkContent: node.educationPlaceRemarkContent,
            isUsed: node.isUsed === 'Y' ? true : false,
          };
          createTraningPlace(payload, {
            onSuccess: (data: any) => {
              console.log('createTraningPlace response', data);
              const educationPlaceId = data.educationPlaceId;
              //refetch();
            },
          });
        }
      },
    });
  };

  return (
    <form className="form_row" onSubmit={onSubmit(handleOnSubmit)}>
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
          <Button type="submit" variant="primary" size="sm">
            {t('저장')}
          </Button>
        </ContentsButtons>
        <MainContents>
          <FormSubTitle label={'교육장소 정보 '} />
          <ContentsRow>
            <FormRow provider={provider} className={dynamicFormStyles.w_half}>
              <DynamicFormField name={'educationPlaceType'} />
            </FormRow>
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider} className={dynamicFormStyles.w_half}>
              <DynamicFormField name={'educationPlaceCode'} />
            </FormRow>
            <FormRow provider={provider} className={dynamicFormStyles.w_half}>
              <DynamicFormField name={'educationPlaceName'} />
            </FormRow>
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'tenantList'}>
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
              <DynamicFormField name={'zipNo'} disabled={true} />
              <DynamicFormField name={'address1'} disabled={true} />
              <Button variant={'gray'} size={'sm'} onClick={handleAddressSearch}>
                {'우편번호찾기'}
              </Button>
            </FormRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'address2'} />
            </FormRow>
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'educationPlaceRemarkContent'} size="sm" resize="none" />
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
      name: 'educationPlaceType',
      type: 'dropdown',
      label: t('구분'),
      value: '',
      options: [
        { value: '', label: t('전체') },
        { value: 'CAMPUS', label: t('캠퍼스') },
        { value: 'SERVISE_TECH', label: t('서비스기술교육') },
        { value: 'ME_CLUSTER', label: t('생기클러스터') },
        { value: 'OUTSIDE', label: t('외부') },
        { value: 'ABROAD', label: t('해외') },
      ],
    },
    {
      name: 'educationPlaceCode',
      type: 'text',
      label: t('장소 코드'),
      value: '',
      placeholder: '입력',
    },
    {
      name: 'educationPlaceName',
      type: 'text',
      label: t('장소 명'),
      value: '',
      placeholder: '입력',
    },
    {
      name: 'tenantList',
      type: 'custom',
      label: t('테넌트 명'),
      value: [{ name: '현대제철', value: 1 }],
      format: 'array',
    },
    {
      name: 'linkAddress',
      type: 'text',
      label: t('링크 주소'),
      value: '',
      placeholder: '전체 URL을 입력하세요. (예 : https:// campus.hyundai.com/doejf.log/map.jpg)',
    },
    {
      name: 'educationPlaceRemarkContent',
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
    {
      name: 'zipNo',
      type: 'text',
      label: t('주소'),
      value: '',
      placeholder: '우편번호',
    },
    {
      name: 'address1',
      type: 'text',
      label: t('주소'),
      value: '',
      placeholder: '기본주소',
    },
    {
      name: 'address2',
      type: 'text',
      label: '',
      value: '',
      placeholder: '',
    },
  ],
  validator: {
    educationPlaceType: { required: true },
    educationPlaceCode: { required: true },
    educationPlaceName: { required: true },
    tenantList: { required: true },
    isUsed: { required: true },
  },
};
