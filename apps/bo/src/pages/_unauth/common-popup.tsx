import { t } from 'i18next';
import { createFileRoute } from '@tanstack/react-router';
import {
  AddressSearchModal,
  ChannelListChoiceModal,
  ChannelShuttleModal,
  CompanyChoiceModal,
  CompanyShuttleModal,
  MenuChoiceModal,
  RoleChoiceModal,
  RoleShuttleModal,
  TenantChoiceModal,
  TenantShuttleModal,
  UserAndExternalUserTabsChoiceModal,
  UserChoiceForGroupModal,
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

export const Route = createFileRoute('/_unauth/common-popup')({
  component: RouteComponent,
});

function RouteComponent() {
  const { open } = useModal();
  const { open: openModal } = useModal();
  const { provider, onSubmit, control, getValues, fetchData } = useDynamicForm(formConfig);

  const handleOnSubmit = (data: any) => {
    console.log('data {} => ', data);
  };

  const handleAddressSearchResult = (address: any) => {
    console.log('address', address);
    fetchData({ zipNo: address.zipNo, address: address.roadAddr });
  };

  const handleAddressSearch = () => {
    open({
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
            <Button
              size={'xs'}
              className="btn_table"
              variant={'gray2'}
              onClick={(e) => {
                e.stopPropagation();
                openModal({
                  width: 'xl',
                  content: <RoleChoiceModal />,
                });
              }}
            >
              {'HRD 담당자 역할 조회'}
            </Button>
            <Button
              size={'xs'}
              className="btn_table"
              variant={'gray2'}
              onClick={(e) => {
                e.stopPropagation();
                openModal({
                  width: 'xl',
                  content: <RoleShuttleModal />,
                });
              }}
            >
              {'HRD 담당자 역할 조회(셔틀)'}
            </Button>
            <Button
              size={'xs'}
              className="btn_table"
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
            <Button
              size={'xs'}
              className="btn_table"
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
            <Button
              size={'xs'}
              className="btn_table"
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
            <Button
              size={'xs'}
              className="btn_table"
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
            <Button
              size={'xs'}
              className="btn_table"
              variant={'gray2'}
              onClick={(e) => {
                e.stopPropagation();
                openModal({
                  width: 'xl',
                  content: <MenuChoiceModal menuScopeCode={'BO'} />,
                });
              }}
            >
              {'메뉴 조회'}
            </Button>
            <Button
              size={'xs'}
              className="btn_table"
              variant={'gray2'}
              onClick={(e) => {
                e.stopPropagation();
                openModal({
                  width: 'xl',
                  content: <UserAndExternalUserTabsChoiceModal />,
                });
              }}
            >
              {'유저와 사외이용자 팝업에서 선택하는 경우(탭)'}
            </Button>
            <Button
              size={'xs'}
              className="btn_table"
              variant={'gray2'}
              onClick={(e) => {
                e.stopPropagation();
                openModal({
                  width: 'xl',
                  content: <UserChoiceForGroupModal />,
                });
              }}
            >
              {'유저그룹 조회'}
            </Button>
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
  ],
};
