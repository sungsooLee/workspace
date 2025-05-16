import { t } from 'i18next';
import { createFileRoute } from '@tanstack/react-router';
import { CompanyChoiceModal, CompanyShuttleModal, AddressSearchModal } from '@features/shared';
import {
  Button,
  ChipListModalSelectorFormField,
  ContentsRow,
  DynamicFormField,
  useModal,
} from '@learnway/ui';

import styles from '@learnway/styles/bo/pages/_auth/login.module.css';
import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css'; // 화면 내 컨텐츠 레이아웃 css
import titleStyles from '@learnway/styles/bo/assets/styles/modules/title.module.css';

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
  const { provider, onSubmit, control, getValues, fetchData } = useDynamicForm(formConfig);

  const handleOnSubmit = (data: any) => {
    console.log('data {} => ', data);
  };

  const handleAddressSearchResult = (address: any) => {
    console.log('address', address);
    fetchData({ zipCode: address.zipNo, defaultAddress: address.roadAddr });
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
            <FormRow provider={provider}>
              <DynamicFormField name={'companyModal'}>
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
              </DynamicFormField>
            </FormRow>
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'companyShuttle'}>
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
              </DynamicFormField>
            </FormRow>
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'zipCode'} disabled={true} />
              <DynamicFormField name={'defaultAddress'} disabled={true} />
              <Button variant={'gray'} size={'sm'} onClick={handleAddressSearch}>
                {'우편번호찾기'}
              </Button>
            </FormRow>
          </ContentsRow>
        </MainContents>
        <SubContents>
          <div>서브영역</div>
          <Button type={'button'} variant="point" size="sm">
            서브 영역
          </Button>
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
      name: 'zipCode',
      type: 'text',
      label: t('주소'),
      value: '',
      placeholder: '우편번호',
    },
    {
      name: 'defaultAddress',
      type: 'text',
      label: t('주소'),
      value: '',
      placeholder: '기본주소',
    },
  ],
};
