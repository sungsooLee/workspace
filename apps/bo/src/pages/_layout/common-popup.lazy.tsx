import { useState } from 'react';
import { t } from 'i18next';
import { createLazyFileRoute } from '@tanstack/react-router';
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
} from '@features/shared';
import {
  Button,
  ChipListModalSelectorFormField,
  ContentsRow,
  Input,
  LearningWindowLayout,
  PreviewImage,
  useModal,
} from '@learnway/ui';
import { AddressSearchFormField } from '@shared/ui/form/address-search-form-field';
import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css'; // 화면 내 컨텐츠 레이아웃 css
import titleStyles from '@learnway/styles/bo/assets/styles/modules/title.module.css';
import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';

import { MainContents } from '@widgets/layout/ui/container/slot/main-contents';
import { PageContainer } from '@widgets/layout/ui/container/page-container';
import { FormRow } from '@shared/ui';
import { DynamicFormConfig, S3_PATH, useDynamicForm } from '@learnway/hooks';
import { SubContents } from '@widgets/layout/ui/container/slot/sub-contents';
import { ContentsButtons } from '@widgets/layout/ui/container/slot/contents-buttons';

import langCodes from '@entities/mock/i18n-resource-ko.json';
import TranslationService from '@entities/translation/api/translation';

import LabelMessagesService from '@entities/label-messages/api/label-messages';
import { IcoDownload } from '@learnway/icons';

import { EnFormMode } from '@types';

import {
  useDeployTranslation,
  useTranslation,
} from '@entities/translation/service/translation.hook';
import { PreviewLearningWindow } from '@features/learning-resource/learning-resource-management/ui/preview-learning-window';

export const Route = createLazyFileRoute('/_layout/common-popup')({
  component: RouteComponent,
});

const imageFileUrl =
  'https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';

function RouteComponent() {
  const { open: openModal } = useModal();
  const [organizations, setOrganizations] = useState<any>([]);
  const { provider, onSubmit, control, getValues, updateFormData } = useDynamicForm(formConfig);

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

  const { deploy } = useDeployTranslation({});
  const handleDeployKorMenu = () => {
    deploy({ locale: 'ko' });
  };

  const handleOnSubmit = (data: any) => {
    console.log('data {} => ', data);
  };

  const handleAddressSearchResult = (address: any) => {
    console.log('address', address);
    updateFormData({ zipNo: address.zipNo, address: address.roadAddr });
  };

  const downloadByUrl = (url: string) => {
    const link = document.createElement('a');
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAddressSearch = () => {
    openModal({
      width: 'sm',
      content: <AddressSearchModal onSelect={handleAddressSearchResult} />,
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
                    labelField: 'name',
                    valueField: 'companyId',
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
                    labelField: 'name',
                    valueField: 'companyId',
                    wordwrap: true,
                  }}
                />
              }
            />
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider} name={'address'} element={<AddressSearchFormField />} />
            <FormRow provider={provider} name={'addressDetail'} />
          </ContentsRow>
          <ContentsRow>
            <Button
              label="Label 처리"
              type="button"
              variant="primary"
              size="sm"
              onClick={handleLabelUpdate}
            />
            <Button
              label="한국어 다국어 배포"
              type="button"
              variant="primary"
              size="sm"
              onClick={handleDeployKorMenu}
            />
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider} name="thumbnails" />
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider} name="attachment" />
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider} name="singleAttachment" />
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
                    content: <UserGroupOrganizationShuttleModal tenantIds={[1, 2, 3]} />,
                  });
                }}
              >
                {'유저그룹 조회 팝업(조직만)'}
              </Button>
              <span className="text-green-400">{'완료'}</span>
            </div>
            <div className="h-1 w-full border-white bg-slate-700" />
            <Button
              size={'xs'}
              className="btn_table flex-1"
              variant={'gray2'}
              onClick={(e) => {
                e.stopPropagation();
                openModal({
                  width: 'xl',
                  content: (
                    <UserGroupTabsChoiceModal
                      tenantIds={[1, 2, 3, 4]}
                      option={[
                        {
                          combiners: [
                            { combineName: '현대제철', combineType: 'USER_GROUP', combineValue: 1 },
                          ],
                          fullName: '현대제철',
                          key: '1',
                          id: 1,
                        },
                      ]}
                      initialTab="ORGANIZATION"
                    />
                  ),
                });
              }}
            >
              {'유저그룹검색'}
            </Button>
            <div className="flex justify-between gap-4">
              <span>유저그룹 조회(조직) 팝업</span>
              <span className="text-green-400">{'완료'}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span>유저그룹 조회(보직) 팝업</span>
              <span className="text-green-400">{'완료'}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span>유저그룹 조회(직군) 팝업</span>
              <span className="text-green-400">{'완료'}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span>유저그룹 조회(호칭) 팝업</span>
              <span className="text-green-400">{'완료'}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span>유저그룹 조회(직무) 팝업</span>
              <span className="text-green-400">{'완료'}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span>유저그룹 조회(사용자 정의) 팝업</span>
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
                    width: 'full',
                    height: 'full',
                    content: <PreviewImage imageUrl={imageFileUrl} />,
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
              <span className="text-green-400">{'완료'}</span>
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
              <span className="text-green-400">{'완료'}</span>
            </div>
            <div className="h-1 w-full border-white bg-slate-700" />
            <div className="flex gap-4">
              <Button
                size={'xs'}
                className="btn_table flex-1"
                variant={'gray2'}
                stopPropagation
                onClick={(e) => {
                  openModal({
                    width: 'xl',
                    content: <TrainingPlaceDetailModal mode={EnFormMode.VIEW} spaceId={10} />,
                  });
                }}
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
                stopPropagation
                onClick={(e) => {
                  openModal({
                    width: 'xl',
                    content: <TrainingPlaceChoiceModal />,
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
                onClick={(e) => {
                  openModal({
                    width: 'xl',
                    content: <TrainingPlaceDetailModal mode={EnFormMode.ADD} />,
                    onClose(data: any) {
                      console.log('교육공간 등록 결과', data);
                    },
                  });
                }}
              >
                {'교육공간 등록 결과'}
              </Button>
              <span className="text-yellow-500">{'진행중'}</span>
            </div>
            <div className="flex gap-4">
              <Button
                size={'xs'}
                className="btn_table flex-1"
                variant={'gray2'}
                stopPropagation
                onClick={(e) => {
                  openModal({
                    width: 'full',
                    content: (
                      // <PreviewLearningWindow contentUuid="0d325ece-c155-4927-944d-dfc873fff97b" />
                      // <PreviewLearningWindow contentUuid="809fad98-0911-4712-a989-7848671c8e4c" />
                      <PreviewLearningWindow contentUuid="8dba64eb-a04c-4f37-95ff-19df7e25fea5" />
                    ),
                    onClose(data: any) {
                      console.log('컨텐츠 미리 보기 팝업', data);
                    },
                  });
                }}
              >
                {'컨텐츠 미리 보기 팝업'}
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
      name: 'thumbnails',
      label: t('썸네일'),
      type: 'thumbnail-list',
      imageStorageType: 'public',
      max: 1,
      format: 'array',
      value: [],
      description:
        '파일 사이즈 000 x 000 / 확장자 JPEG, JPG, PNG, GIF / 업로드 가능 00개 / 파일용량 최대 00 MB',
    },
    {
      name: 'attachment',
      type: 'attachment',
      uploadConfig: {
        affairsType: 'PMS',
        s3Path: 'upload/temp/attachment',
      },
      value: [],
    },
    {
      name: 'singleAttachment',
      type: 'single-attachment',
      label: '약도 이미지 첨부',
      uploadConfig: {
        affairsType: 'LMS',
        s3Path: S3_PATH['upload/content/image'],
        acceptFiles: ['JPEG', 'JPG', 'PNG', 'GIF'],
      },
      value: '',
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
