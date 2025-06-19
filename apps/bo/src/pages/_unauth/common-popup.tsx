import { useState } from 'react';
import { t } from 'i18next';
import { createFileRoute } from '@tanstack/react-router';
import {
  AddressSearchModal,
  ChannelListChoiceModal,
  ChannelShuttleModal,
  CompanyChoiceModal,
  CompanyShuttleModal,
  TenantChoiceModal,
  TenantShuttleModal,
  UserChoiceModal,
  UserShuttleModal,
  MenuChoiceTreeModal,
  CategoryChoiceTreeModal,
  UserGroupChoiceModal,
  UserGroupTabsChoiceModal,
  UserGroupOrganizationShuttleModal,
  OrganizationChoiceTreeModal,
  OrganizationShuttleTreeModal,
  TrainingPlaceChoiceModal,
  TrainingPlaceDetailModal,
  ImagePreviewModal,
} from '@features/shared';
import { Button, ChipListModalSelectorFormField, ContentsRow, Input, useModal } from '@learnway/ui';
import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css'; // 화면 내 컨텐츠 레이아웃 css
import titleStyles from '@learnway/styles/bo/assets/styles/modules/title.module.css';
import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';

import { MainContents } from '@widgets/layout/ui/container/slot/main-contents';
import { PageContainer } from '@widgets/layout/ui/container/page-container';
import { FormRow } from '@shared/ui';
import { DynamicFormConfig, useDynamicForm } from '@learnway/hooks';
import { SubContents } from '@widgets/layout/ui/container/slot/sub-contents';
import { ContentsButtons } from '@widgets/layout/ui/container/slot/contents-buttons';

import langCodes from '@entities/mock/i18n-resource-ko.json';
import TranslationService from '@entities/translation/api/translation';

import LabelMessagesService from '@entities/label-messages/api/label-messages';
import { IcoDownload } from '@learnway/icons';

import { EnFormMode } from '@types';

export const Route = createFileRoute('/_unauth/common-popup')({
  component: RouteComponent,
});

const imageFileUrl =
  'https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';

function RouteComponent() {
  const { open } = useModal();
  const { open: openModal } = useModal();
  const [organizations, setOrganizations] = useState<any>([]);
  const { provider, onSubmit, control, getValues, fetchData } = useDynamicForm(formConfig);

  const handleLabelUpdate = async () => {
    const langPath = jsonToPaths(langCodes.LABEL);
    const data: any[] = [];
    let rowNum = 1;
    for (const item of langPath) {
      const result = await TranslationService.fetchTranslationExists({
        keyTypeCode: 'LABEL',
        messageCode: item.path,
      });
      if (!result) {
        const row = [rowNum.toString(), 'LABEL', item.path, item.value, item.value];
        data.push(row);
        rowNum++;
      }
    }
    const csvContent = data
      .map((row) => row.map((item: string) => `"${item.replace(/\n/gi, '\\n')}"`).join(','))
      .join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'data.csv';
    link.click();
    URL.revokeObjectURL(url);
    link.remove();
  };
  const handleOnSubmit = (data: any) => {
    console.log('data {} => ', data);
  };

  const handleAddressSearchResult = (address: any) => {
    console.log('address', address);
    fetchData({ zipNo: address.zipNo, address: address.roadAddr });
  };

  const downloadByUrl = (url: string) => {
    const link = document.createElement('a');
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAddressSearch = () => {
    open({
      width: 'sm',
      content: <AddressSearchModal onSelect={handleAddressSearchResult} />,
    });
  };

  const handleTrainingPlaceDetail = (mode: EnFormMode) => {
    openModal({
      width: 'xl',
      content: <TrainingPlaceDetailModal mode={mode} />,
      onClose(data: any) {
        console.log('교육공간 등록 결과', data);
      },
    });
  };

  return (
    <form onSubmit={onSubmit(handleOnSubmit)}>
      <PageContainer>
        <ContentsButtons>
          <Button type={'button'} variant="point" size="sm">
            컨텐츠 버튼1
          </Button>
          <Button type={'button'} variant="point" size="sm">
            컨텐츠 버튼2
          </Button>
        </ContentsButtons>
        <MainContents>
          <div className={titleStyles.title_wrap}>
            <h3 className={titleStyles.title}>{'상세정보'}</h3>
            <div className={layoutStyles.btn_wrap}>
              <Button type="submit" variant="save" size="sm" className={layoutStyles.btn_text}>
                저장
              </Button>
            </div>
          </div>
          <ContentsRow>
            <FormRow
              provider={provider}
              name={'companyModal'}
              element={
                <ChipListModalSelectorFormField
                  modalConfig={{
                    content: <CompanyChoiceModal />,
                    title: '',
                    width: 'xl',
                  }}
                  chipList={{
                    labelField: 'company',
                    valueField: 'id',
                    wordwrap: true,
                  }}
                />
              }
            />
          </ContentsRow>
          <ContentsRow>
            <FormRow
              provider={provider}
              name={'companyShuttle'}
              element={
                <ChipListModalSelectorFormField
                  modalConfig={{
                    content: <CompanyShuttleModal />,
                    title: '',
                    width: 'xl',
                  }}
                  chipList={{
                    labelField: 'company',
                    valueField: 'id',
                    wordwrap: true,
                  }}
                />
              }
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
            <Button
              label="Label 처리"
              type="button"
              variant="primary"
              size="sm"
              onClick={handleLabelUpdate}
            />
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider} name="thumbnails" />
          </ContentsRow>
        </MainContents>
        <SubContents>
          <div>서브영역</div>
          <Button type={'button'} variant="point" size="sm">
            서브 영역
          </Button>
        </SubContents>
        <SubContents>
          <div>공통팝업</div>
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <Button
                size={'xs'}
                className="btn_table flex-1"
                variant={'gray2'}
                onClick={(e) => {
                  e.stopPropagation();
                  openModal({
                    width: 'xl',
                    content: <UserChoiceModal />,
                  });
                }}
              >
                {'유저 검색(공통)'}
              </Button>
              <span className="text-green-400">{'완료'}</span>
            </div>
            <div className="flex gap-4">
              <Button
                size={'xs'}
                className="btn_table flex-1"
                variant={'gray2'}
                onClick={(e) => {
                  e.stopPropagation();
                  openModal({
                    width: 'xl',
                    content: <UserShuttleModal />,
                  });
                }}
              >
                {'유저 검색(셔틀)'}
              </Button>
              <span className="text-green-400">{'완료'}</span>
            </div>
            <div className="h-1 w-full border-white bg-slate-700" />

            <div className="flex gap-4">
              <Button
                size={'xs'}
                className="btn_table flex-1"
                variant={'gray2'}
                onClick={(e) => {
                  e.stopPropagation();
                  openModal({
                    width: 'xl',
                    content: <CompanyChoiceModal />,
                  });
                }}
              >
                {'회사 조회'}
              </Button>
              <span className="text-green-400">{'완료'}</span>
            </div>
            <div className="flex gap-4">
              <Button
                size={'xs'}
                className="btn_table flex-1"
                variant={'gray2'}
                onClick={(e) => {
                  e.stopPropagation();
                  openModal({
                    width: 'xl',
                    height: 'fix',
                    content: <CompanyShuttleModal />,
                  });
                }}
              >
                {'회사 조회(셔틀)'}
              </Button>
              <span className="text-green-500">{'완료'}</span>
            </div>

            <div className="h-1 w-full border-white bg-slate-700" />

            <div className="flex gap-4">
              <Button
                size={'xs'}
                className="btn_table flex-1"
                variant={'gray2'}
                onClick={(e) => {
                  e.stopPropagation();
                  openModal({
                    width: 'xl',
                    content: <TenantChoiceModal />,
                  });
                }}
              >
                {'테넌트 조회'}
              </Button>
              <span className="text-green-400">{'완료'}</span>
            </div>
            <div className="flex gap-4">
              <Button
                size={'xs'}
                className="btn_table flex-1"
                variant={'gray2'}
                onClick={(e) => {
                  e.stopPropagation();
                  openModal({
                    width: 'xl',
                    content: <TenantShuttleModal />,
                  });
                }}
              >
                {'테넌트 조회(셔틀)'}
              </Button>
              <span className="text-green-400">{'완료'}</span>
            </div>
            <div className="h-1 w-full border-white bg-slate-700" />
            <div className="flex gap-4">
              <Button
                size={'xs'}
                className="btn_table flex-1"
                variant={'gray2'}
                onClick={(e) => {
                  e.stopPropagation();
                  openModal({
                    width: 'xl',
                    content: <ChannelListChoiceModal />,
                  });
                }}
              >
                {'채널 조회'}
              </Button>
              <span className="text-green-400">{'완료'}</span>
            </div>
            <div className="flex gap-4">
              <Button
                size={'xs'}
                className="btn_table flex-1"
                variant={'gray2'}
                onClick={(e) => {
                  e.stopPropagation();
                  openModal({
                    width: 'xl',
                    content: <ChannelShuttleModal />,
                  });
                }}
              >
                {'채널 조회(셔틀)'}
              </Button>
              <span className="text-green-400">{'완료'}</span>
            </div>
            <div className="h-1 w-full border-white bg-slate-700" />
            <div className="flex gap-4">
              <Button
                size={'xs'}
                className="btn_table flex-1"
                variant={'gray2'}
                onClick={(e) => {
                  e.stopPropagation();
                  openModal({
                    width: 'xl',
                    content: <MenuChoiceTreeModal menuScopeCode="BO" />,
                  });
                }}
              >
                {'메뉴 조회 팝업(공통)'}
              </Button>
              <span className="text-green-400">{'완료'}</span>
            </div>
            <div className="flex gap-4">
              <Button
                size={'xs'}
                className="btn_table flex-1"
                variant={'gray2'}
                onClick={(e) => {
                  e.stopPropagation();
                  openModal({
                    width: 'xl',
                    content: <CategoryChoiceTreeModal />,
                  });
                }}
              >
                {'케테고리 조회 팝업(공통)'}
              </Button>
              <span className="text-green-400">{'완료'}</span>
            </div>
            <div className="h-1 w-full border-white bg-slate-700" />
            <div className="flex gap-4">
              <Button
                size={'xs'}
                className="btn_table flex-1"
                variant={'gray2'}
                onClick={(e) => {
                  e.stopPropagation();
                  openModal({
                    width: 'xl',
                    content: <UserGroupChoiceModal />,
                  });
                }}
              >
                {'유저그룹 대상자 조회 팝업(공통)'}
              </Button>
              <span className="text-yellow-500">{'진행중'}</span>
            </div>
            <div className="flex gap-4">
              <Button
                size={'xs'}
                className="btn_table flex-1"
                variant={'gray2'}
                onClick={(e) => {
                  e.stopPropagation();
                  openModal({
                    width: 'xl',
                    content: <UserGroupOrganizationShuttleModal />,
                  });
                }}
              >
                {'유저그룹 조회 팝업(조직만)'}
              </Button>
              <span className="text-yellow-500">{'진행중'}</span>
            </div>
            <div className="h-1 w-full border-white bg-slate-700" />
            <div className="flex gap-4">
              <Button
                size={'xs'}
                className="btn_table flex-1"
                variant={'gray2'}
                onClick={(e) => {
                  e.stopPropagation();
                  openModal({
                    width: 'xl',
                    content: <UserGroupTabsChoiceModal />,
                  });
                }}
              >
                {'유저그룹검색'}
              </Button>
              <span className="text-yellow-500">{'진행중'}</span>
            </div>
            <div className="h-1 w-full border-white bg-slate-700" />
            <div className="flex gap-4">
              <Button
                size={'xs'}
                className="btn_table flex-1"
                variant={'gray2'}
                onClick={(e) => {
                  e.stopPropagation();
                  openModal({
                    width: 'full',
                    height: 'full',
                    content: <ImagePreviewModal imageUrl={imageFileUrl} />,
                    headerActionNode: (
                      <Button onlyIcon onClick={() => downloadByUrl(imageFileUrl)}>
                        <IcoDownload width={40} height={40} stroke="#131C30" />
                      </Button>
                    ),
                  });
                }}
              >
                {'이미지 미리보기'}
              </Button>
              <span className="text-green-400">{'완료'}</span>
            </div>
            <div className="h-1 w-full border-white bg-slate-700" />
            <div className="flex gap-4">
              <Button
                size={'xs'}
                className="btn_table flex-1"
                variant={'gray2'}
                onClick={(e) => {
                  e.stopPropagation();
                  openModal({
                    width: 'md',
                    content: <OrganizationChoiceTreeModal companyCodes={['H199', 'H103']} />,
                  });
                }}
              >
                {'회사조직조회팝업'}
              </Button>
              <span className="text-yellow-500">{'진행중'}</span>
            </div>
            <div className="flex gap-4">
              <Button
                size={'xs'}
                className="btn_table flex-1"
                variant={'gray2'}
                onClick={async (e) => {
                  e.stopPropagation();
                  const retval = await openModal({
                    width: 'xl',
                    content: (
                      <OrganizationShuttleTreeModal
                        companyCodes={['H199', 'H103']}
                        originList={organizations}
                      />
                    ),
                  });
                  console.log(retval);
                  setOrganizations(retval);
                }}
              >
                {'회사조직조회 셔틀팝업'}
              </Button>
              <span className="text-yellow-500">{'진행중'}</span>
            </div>
            <div className="h-1 w-full border-white bg-slate-700" />
            <div className="flex gap-4">
              <Button
                size={'xs'}
                className="btn_table flex-1"
                variant={'gray2'}
                stopPropagation
                onClick={(e) => handleTrainingPlaceDetail(EnFormMode.VIEW)}
              >
                {'교육공간 조회 팝업'}
              </Button>
              <span className="text-yellow-500">{'진행중'}</span>
            </div>

            <div className="flex gap-4">
              <Button
                size={'xs'}
                className="btn_table flex-1"
                variant={'gray2'}
                onClick={(e) => {
                  e.stopPropagation();
                  openModal({
                    width: 'xl',
                    content: (
                      <TrainingPlaceChoiceModal
                        onAddClick={() => handleTrainingPlaceDetail(EnFormMode.ADD)}
                      />
                    ),
                    onClose(data: any) {
                      console.log('교육공간 선택 결과', data);
                    },
                  });
                }}
              >
                {'교육공간 선택 팝업'}
              </Button>
              <span className="text-yellow-500">{'진행중'}</span>
            </div>
            <div className="flex gap-4">
              <Button
                size={'xs'}
                className="btn_table flex-1"
                variant={'gray2'}
                stopPropagation
                onClick={(e) => handleTrainingPlaceDetail(EnFormMode.ADD)}
              >
                {'교육공간 등록 팝업'}
              </Button>
              <span className="text-yellow-500">{'진행중'}</span>
            </div>
          </div>
        </SubContents>
      </PageContainer>
    </form>
  );
}

const formConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'companyModal',
      type: 'custom',
      label: t('company - 회사선택'),
      format: 'array',
      value: [],
      placeholder: '',
      description: '',
    },
    {
      name: 'companyShuttle',
      type: 'custom',
      label: t('company - 회사선택 셔틀'),
      format: 'array',
      value: [],
      placeholder: '',
      description: '',
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
    {
      name: 'thumbnails',
      label: t('썸네일'),
      type: 'thumbnail-list-v2',
      max: 3,
      format: 'array',
      value: [],
      description:
        '파일 사이즈 000 x 000 / 확장자 JPEG, JPG, PNG, GIF / 업로드 가능 00개 / 파일용량 최대 00 MB',
    },
  ],
};

function jsonToPaths(obj: any, parentPath = ''): any[] {
  const result = [];

  for (const key in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(key)) {
      const currentPath = parentPath ? `${parentPath}.${key}` : key;

      if (typeof obj[key] === 'object' && obj[key] !== null) {
        result.push(...jsonToPaths(obj[key], currentPath));
      } else {
        result.push({ path: currentPath, value: obj[key] });
      }
    }
  }

  return result;
}
