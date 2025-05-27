import React, { FC, useEffect, useState } from 'react';
import { t } from 'i18next';
import { useRouter } from '@tanstack/react-router';
import { cn } from '@learnway/shared';
import { IcoPpt, IcoTrash03 } from '@learnway/icons';
import { PageContainer } from '@widgets/layout/ui/container/page-container';
import { ContentsHistoryInfoFormField, FormRow, FormSubTitle } from '@shared/ui';

import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';
import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';
import fileUploadStyles from '@learnway/styles/bo/assets/styles/modules/file-upload.module.css'; // 파일 업로드
import {
  Button,
  ChipListModalSelectorFormField,
  ContentsRow,
  Input,
  Textarea,
  useModal,
} from '@learnway/ui';
import { MainContents } from '@widgets/layout/ui/container/slot/main-contents';
import { CODE_GROUP, DynamicFormConfig, useDynamicForm } from '@learnway/hooks';
import { ContentsButtons } from '@widgets/layout/ui/container/slot/contents-buttons';
import { LinkBox } from '@widgets/layout/ui/container/slot/link-box';

import {
  useCreateTrainingPlace,
  useDeleteTrainingPlace,
  useFetchTrainingPlace,
  useUpdateTrainingPlace,
} from '@entities/training-place/service/training-place.hook';
import { AddressSearchModal, TenantChoiceModal } from '@features/shared/ui/modal';

const TrainingPlaceDetailComponent: FC<any> = ({ mode, placeUUID }) => {
  const router = useRouter();

  const { open: openModal, confirm: openConfirm } = useModal();
  const { provider, fetchData, onSubmit, getValues, onFormChange } = useDynamicForm(formConfig);

  const { create: createTraningPlace } = useCreateTrainingPlace({});
  const { update: updateTrainingPlace } = useUpdateTrainingPlace({});
  const { delete: deleteTrainingPlace } = useDeleteTrainingPlace({});

  const { data, refetch } = useFetchTrainingPlace(placeUUID);
  const [pageMode, setPageMode] = useState(mode);

  useEffect(() => {
    if (pageMode === 'add') {
      const initialData = {
        educationPlaceType: '',
        educationPlaceCode: '',
        educationPlaceName: '',
        tenantList: [],
        linkAddress: '',
        educationPlaceRemarkContent: '',
        isReservationUsed: 'Y',
        isUsed: 'Y',
        zipNo: '',
        address: '',
        addressDetail: '',
      };
      fetchData(initialData);
    } else if (pageMode === 'view' && data) {
      const initialData = {
        educationPlaceType: data.educationPlaceTypecd,
        educationPlaceCode: data.educationPlaceCode,
        educationPlaceName: data.educationPlaceCodeName,
        tenantList: data.tenantList.map((d: any) => ({
          tenantName: d.tenantName,
          tenantId: d.tenantId,
        })),
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
  }, [data, pageMode]);

  const handleListButtonClick = () => {
    router.navigate({ to: '/learning/training-place' });
  };

  const handleResetButtonClick = () => {
    onFormChange();
  };

  const handleDeleteButtonClick = () => {
    if (pageMode === 'view') {
      openConfirm({
        title: t('LABEL.confirm.delete.title'),
        content: <p>{t('삭제버튼을 누르면 선택하신 항목이 모두 저장되며, 복구할 수 없습니다.')}</p>,
        onClose: (value: boolean) => {
          if (value) {
            deleteTrainingPlace(placeUUID, {
              onSuccess: (data: any) => {
                router.navigate({ to: '/learning/training-place' });
              },
            });
          }
        },
      });
    }
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
            tenantList: node.tenantList.map((item: any) => ({ tenantId: item.tenantId })),
            mapImageLinkContent: node.linkAddress,
            isReservationUsed: node.isReservationUsed === 'Y' ? true : false,
            zipNo: node.zipNo,
            addr: node.address,
            addrDetail: node.addressDetail,
            educationPlaceRemarkContent: node.educationPlaceRemarkContent,
            isUsed: node.isUsed === 'Y' ? true : false,
          };
          if (pageMode === 'add') {
            createTraningPlace(payload, {
              onSuccess: (data: any) => {
                placeUUID = data.educationPlaceUuid;
                setPageMode('view');
                refetch();
              },
            });
          } else if (pageMode === 'view') {
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

          {pageMode === 'add' && (
            <Button variant="point" size="sm" onClick={handleResetButtonClick}>
              {t('LABEL.button.reset')}
            </Button>
          )}
          {pageMode === 'view' && (
            <Button variant="point" size="sm" onClick={handleDeleteButtonClick}>
              {t('LABEL.button.delete')}
            </Button>
          )}
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
            />
          </ContentsRow>
          <ContentsRow>
            <FormRow
              provider={provider}
              className={dynamicFormStyles.w_half}
              name={'educationPlaceCode'}
            />
            <FormRow
              provider={provider}
              className={dynamicFormStyles.w_half}
              name={'educationPlaceName'}
            />
          </ContentsRow>
          <ContentsRow>
            <FormRow
              provider={provider}
              name={'tenantList'}
              element={
                <ChipListModalSelectorFormField
                  chipList={{
                    labelField: 'tenantName',
                    valueField: 'tenantId',
                    hideBorder: true,
                  }}
                  modalConfig={{
                    title: '',
                    width: 'xl',
                    content: <TenantChoiceModal />,
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
              element={<Textarea resize="none" size="sm" />}
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
      optionsConfig: {
        codeGroup: CODE_GROUP['pms.education.EducationPlaceType'],
      },
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
    linkAddress: {
      required: false,
      conditions: [
        {
          fn: (values) => {
            if (values.linkAddress.trim().length === 0) return false;
            const pattern = new RegExp(
              '^(https?:\\/\\/)?' + // protocol
                '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
                '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
                '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
                '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
                '(\\#[-a-z\\d_]*)?$', // fragment locator
              'i',
            );
            return !pattern.test(values.linkAddress.trim());
          },
          message: t('LABEL.form.validation.invalidUrl'),
        },
      ],
    },
  },
};
