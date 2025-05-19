import React, { FC, useEffect } from 'react';
import { t } from 'i18next';
import { useRouter } from '@tanstack/react-router';
import { cn } from '@learnway/shared';
import { IcoTrash03, IcoPpt } from '@learnway/icons';
import { PageContainer } from '@widgets/layout/ui/container/page-container';
import { ContentsHistoryInfoFormField, FormSubTitle } from '@shared/ui';

import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';
import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';
import fileUploadStyles from '@learnway/styles/bo/assets/styles/modules/file-upload.module.css'; // 파일 업로드
import { ChipListModalSelectorFormField, Textarea, TextareaFormField } from '@learnway/ui';
import { AddressSearchModal } from '@features/shared';

import { Button, ContentsRow, useModal, DynamicFormField, Input } from '@learnway/ui';
import { MainContents } from '@widgets/layout/ui/container/slot/main-contents';
import { useDynamicForm, DynamicFormConfig } from '@learnway/hooks';
import { FormRow } from '@shared/ui';
import { ContentsButtons } from '@widgets/layout/ui/container/slot/contents-buttons';
import { LinkBox } from '@widgets/layout/ui/container/slot/link-box';

import {
  useCreateTrainingPlace,
  useFetchTrainingPlace,
  useUpdateTrainingPlace,
} from '@entities/training-place/service/training-place.hook';

const TrainingPlaceDetailComponent: FC<any> = ({ mode, placeUUID }) => {
  const router = useRouter();

  const { open: openModal, confirm: openConfirm } = useModal();
  const { provider, fetchData, onSubmit, getValues, onFormChange } = useDynamicForm(formConfig);

  const { create: createTraningPlace } = useCreateTrainingPlace({});
  const { update: updateTrainingPlace } = useUpdateTrainingPlace({});

  const { data, refetch } = useFetchTrainingPlace(placeUUID);

  useEffect(() => {
    if (mode === 'add') {
      // TODO. 테넌트 조회 적용 이전
      const initialData = {
        educationPlaceType: '',
        educationPlaceCode: '',
        educationPlaceName: '',
        tenantList: [
          {
            name: '현대제철',
            value: 1,
          },
        ],
        linkAddress: '',
        educationPlaceRemarkContent: '',
        isReservationUsed: 'Y',
        isUsed: 'Y',
        zipNo: '',
        address: '',
        addressDetail: '',
      };
      fetchData(initialData);
    } else if (mode === 'view' && data) {
      const initialData = {
        educationPlaceType: data.educationPlaceTypecd,
        educationPlaceCode: data.educationPlaceCode,
        educationPlaceName: data.educationPlaceCodeName,
        tenantList: data.tenantList.map((d: any) => ({ name: d.tenantName, value: d.tenantId })),
        linkAddress: data.mapImageLinkContent,
        educationPlaceRemarkContent: data.educationPlaceRemarkContent,
        isReservationUsed: data.isReservationUsed ? 'Y' : 'N',
        isUsed: data.isUsed ? 'Y' : 'N',
        zipNo: data.zipNo,
        address: data.addr,
        addressDetail: data.addrDetail,
      };
      fetchData(initialData);
    }
  }, [data]);

  const handleListButtonClick = () => {
    router.navigate({ to: '/learning/training-place' });
  };

  const handleResetButtonClick = () => {
    onFormChange();
  };

  const handleAddressSearchResult = (address: any) => {
    fetchData({ ...getValues(), zipNo: address.zipNo, address: address.roadAddr });
  };

  const handleAddressSearch = () => {
    openModal({
      width: 'sm',
      content: <AddressSearchModal onSelect={handleAddressSearchResult} />,
    });
  };

  const handleOnSubmit = (node: any) => {
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
            mapImageLinkContent: node.linkAddress,
            isReservationUsed: node.isReservationUsed === 'Y' ? true : false,
            zipNo: node.zipNo,
            addr: node.address,
            addrDetail: node.addressDetail,
            educationPlaceRemarkContent: node.educationPlaceRemarkContent,
            isUsed: node.isUsed === 'Y' ? true : false,
          };
          if (mode === 'add') {
            createTraningPlace(payload, {
              onSuccess: (data: any) => {
                placeUUID = data.educationPlaceUuid;
                refetch();
                mode = 'view';
              },
            });
          } else if (mode === 'view') {
            updateTrainingPlace(
              { ...payload, educationPlaceUuid: placeUUID },
              {
                onSuccess: (data: any) => {
                  refetch();
                },
              },
            );
          }
        }
      },
    });
  };

  return (
    <form className="form_row" onSubmit={onSubmit(handleOnSubmit)}>
      <PageContainer>
        <ContentsButtons>
          <LinkBox>
            <Button variant="point" size="sm" onClick={handleListButtonClick}>
              {t('LABEL.button.list')}
            </Button>
          </LinkBox>

          <Button variant="point" size="sm" onClick={handleResetButtonClick}>
            {t('LABEL.button.reset')}
          </Button>
          <Button type="submit" variant="primary" size="sm">
            {t('LABEL.button.save')}
          </Button>
        </ContentsButtons>
        <MainContents>
          <FormSubTitle label={'LABEL.common.trainingPlaceInfo'} />
          <ContentsRow>
            <FormRow
              provider={provider}
              className={dynamicFormStyles.w_half}
              name={'educationPlaceType'}
              element={<input />}
            />
          </ContentsRow>
          <ContentsRow>
            <FormRow
              provider={provider}
              className={dynamicFormStyles.w_half}
              name={'educationPlaceCode'}
              element={<input />}
            />
            <FormRow
              provider={provider}
              className={dynamicFormStyles.w_half}
              name={'educationPlaceName'}
              element={<input />}
            />
          </ContentsRow>
          <ContentsRow>
            <FormRow
              provider={provider}
              name={'tenantList'}
              element={
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
              }
            />
          </ContentsRow>

          <ContentsRow>
            <div className={formStyles.form_item}>
              <label htmlFor="name-map" className={formStyles.form_label}>
                <span className={formStyles.form_text}>
                  {t('LABEL.form.label.mapImageAttachment')}
                </span>
              </label>
              <div className={formStyles.input_box}>
                <div className={cn(fileUploadStyles.start, fileUploadStyles.wrap)}>
                  <div className={fileUploadStyles.upload_single}>
                    <div className={fileUploadStyles.view_file}>
                      <div className={fileUploadStyles.attach_area}>
                        <p className={fileUploadStyles.text}>
                          {t('LABEL.form.guideText.clickToAttachFile')}
                        </p>
                      </div>
                    </div>
                    <Button className={fileUploadStyles.btn_attach} size={'sm'} variant={'gray'}>
                      <input type="file" className={fileUploadStyles.input_file} />
                      {t('LABEL.button.attachFile')}
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
                      {t('LABEL.button.attachFile')}
                    </Button>
                  </div>
                </div>
              </div>
              <p className={cn(formStyles.guide_text)}>
                {t('LABEL.form.guideText.mapImageAttachment')}
              </p>
            </div>
            {/* form_item */}
            <FormRow
              provider={provider}
              className={dynamicFormStyles.w_half}
              name={'linkAddress'}
              element={<Input />}
            />
          </ContentsRow>

          <ContentsRow>
            <div className={dynamicFormStyles.address_wrap}>
              <div className={dynamicFormStyles.info_address}>
                <FormRow
                  provider={provider}
                  name={'zipNo'}
                  className={dynamicFormStyles.post_input}
                  element={<Input disabled={true} />}
                />
                <FormRow
                  provider={provider}
                  name={'address'}
                  className={dynamicFormStyles.address_input}
                  element={<Input disabled={true} />}
                >
                  <Button
                    className={dynamicFormStyles.btn_find}
                    variant={'gray'}
                    size={'sm'}
                    onClick={handleAddressSearch}
                  >
                    {t('LABEL.button.searchZipNo')}
                  </Button>
                </FormRow>
              </div>
              <div className={dynamicFormStyles.detail_address}>
                <FormRow provider={provider} name={'addressDetail'} element={<Input />} />
              </div>
            </div>
          </ContentsRow>
          <ContentsRow>
            <FormRow
              provider={provider}
              name={'educationPlaceRemarkContent'}
              element={<TextareaFormField resize="none" size="sm" />}
            />
          </ContentsRow>

          <ContentsRow>
            <FormRow
              provider={provider}
              className={dynamicFormStyles.w_half}
              name={'isReservationUsed'}
            />
            <FormRow provider={provider} className={dynamicFormStyles.w_half} name={'isUsed'} />
          </ContentsRow>

          <ContentsRow className={cn(formStyles.no_line, formStyles.space2)}>
            <ContentsHistoryInfoFormField />
          </ContentsRow>
        </MainContents>
      </PageContainer>
    </form>
  );
};

export const TrainingPlaceDetail = TrainingPlaceDetailComponent;

const formConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'educationPlaceType',
      type: 'dropdown',
      label: t('LABEL.form.label.division'),
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
      label: t('LABEL.form.label.placeCode'),
      value: '',
      placeholder: '',
    },
    {
      name: 'educationPlaceName',
      type: 'text',
      label: t('LABEL.form.label.placeName'),
      value: '',
      placeholder: '',
    },
    {
      name: 'tenantList',
      type: 'custom',
      label: t('LABEL.form.label.tenantName'),
      value: [],
      format: 'array',
    },
    {
      name: 'linkAddress',
      type: 'text',
      label: t('LABEL.form.label.linkAddress'),
      value: '',
      placeholder: t('LABEL.form.placeholder.linkAddress'),
    },
    {
      name: 'educationPlaceRemarkContent',
      type: 'textarea',
      label: t('LABEL.form.label.note'),
      value: '',
      maxLength: 2000,
      placeholder: t('LABEL.form.placeholder.note'),
      guideText: t('LABEL.form.guideText.notVisibleToUsers'),
    },
    {
      name: 'isReservationUsed',
      type: 'radio-group',
      label: t('LABEL.form.label.isReservationUsed'),
      value: 'Y',
      options: [
        { value: 'Y', label: t('LABEL.form.radio.reservationAvailable') },
        { value: 'N', label: t('LABEL.form.radio.reservationNotAvailable') },
      ],
    },
    {
      name: 'isUsed',
      type: 'radio-group',
      label: t('LABEL.form.label.isUsed'),
      value: 'Y',
      options: [
        { value: 'Y', label: t('LABEL.form.radio.usable') },
        { value: 'N', label: t('LABEL.form.radio.unusable') },
      ],
    },
    {
      name: 'zipNo',
      type: 'text',
      label: t('LABEL.form.label.address'),
      value: '',
      placeholder: t('LABEL.form.placeholder.zipNo'),
    },
    {
      name: 'address',
      type: 'text',
      label: t('LABEL.form.label.address'),
      value: '',
      placeholder: t('LABEL.form.placeholder.address'),
    },
    {
      name: 'addressDetail',
      type: 'text',
      label: '',
      value: '',
      placeholder: t('LABEL.form.placeholder.addressDetail'),
    },
  ],
  validator: {
    educationPlaceType: true,
    educationPlaceCode: true,
    educationPlaceName: true,
    tenantList: true,
    isUsed: true,
    zipNo: true,
    address: true,
    addressDetail: true,
  },
};
