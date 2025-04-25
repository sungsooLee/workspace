import { FC, useEffect, useRef, useState } from 'react';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';

import { cn } from '@learnway/shared';
import { DynamicFormConfig, useDynamicForm } from '@learnway/hooks';
import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';
import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css'; // 화면 내 컨텐츠 레이아웃 css
import titleStyles from '@learnway/styles/bo/assets/styles/modules/title.module.css';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';
import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';
import searchStyles from '@learnway/styles/bo/assets/styles/modules/search-box.module.css';
import popupStyles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';
import { IcoFormRequired, IcoAlertCircle, IcoRefresh02, IcoSearch } from '@learnway/icons';
import { TenantManagerModal } from './tenant-manager-modal';

import {
  Tabs,
  ContentsRow,
  Input,
  Textarea,
  CheckboxGroupFormField,
  Tooltip,
  Button,
  Switch,
  ThumbnailImageUpload,
  ImageOption,
  ChipListModalSelectorFormField,
  useModal,
  ModalTitle,
  ModalContainer,
  ModalBody,
  ModalFooter,
  Dropdown,
  GridBox,
  DynamicFormField,
  InputModalSelectorFormField,
} from '@learnway/ui';
import { FormRow, ContentsHistoryInfoFormField } from '@shared/ui';
import { ThumbnailUploaderFormField } from '@features/learning';
import { ManagerChoiceModal } from '@features/shared';

/* image */
import selectedImg from '@assets/images/thumb/img_thumb_default.jpg';

const TenantDetailBaseComponent: FC<any> = () => {
  const { t } = useTranslation();

  const { provider, fetchData, onSubmit, onFormChange, getValues, clearFormError, setFormError } =
    useDynamicForm(formConfig);

  const [checked, setChecked] = useState<{ [key: number]: boolean }>({
    1: false,
  });

  // 상태 변경 함수 (Switch id에 따라 상태를 업데이트)
  const handleCheckedChange = (id: number) => (checked: boolean) => {
    setChecked((prev) => ({ ...prev, [id]: checked }));
  };

  return (
    <>
      <div className="title_wrap">
        <strong className="title">{'기본 정보'}</strong>
      </div>
      <ContentsRow>
        <FormRow provider={provider}>
          <DynamicFormField name={'tenantName'} />
          <Button variant="gray" size="sm">
            {'중복'}
          </Button>
        </FormRow>
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider}>
          <ThumbnailUploaderFormField name="tenantLogo" />
        </FormRow>
      </ContentsRow>
      <ContentsRow>
        {/* form_item */}
        <div className={formStyles.form_item}>
          <label htmlFor="name-tenantLog" className={formStyles.form_label}>
            <span className={formStyles.form_text}>{'테넌트 로그(Size : 000x000)'}</span>
            {/* 필수 케이스 */}
            <span className={cn(dynamicFormStyles.status, dynamicFormStyles.required)}>
              <IcoFormRequired width={12} height={12} />
            </span>
            <Tooltip
              className={formStyles.tooltip}
              side="right"
              align="start"
              content={'테넌트에 사용할 로고로 파일 1개만 등록할 수 있습니다.'}
            >
              <Button onlyIcon>
                <IcoAlertCircle width={16} height={16} fill="#A9AFB8" stroke="#ffffff" />
              </Button>
            </Tooltip>
          </label>
          <div className={formStyles.input_box}>
            <ThumbnailImageUpload
              options={[{ id: '1', path: selectedImg }]}
              onChange={(options: ImageOption[]) => console.log('onChange', options)}
              onCheckedChange={(options: ImageOption[]) => console.log('onCheckedChange', options)}
            />
          </div>
        </div>
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider}>
          <DynamicFormField name={'managerName'}>
            <ChipListModalSelectorFormField
              chipList={{
                labelField: 'name',
                valueField: 'value',
                hideBorder: true,
              }}
              modalConfig={{
                title: '',
                width: 'xl',
                content: <TenantManagerModal />,
              }}
            />
          </DynamicFormField>
        </FormRow>
      </ContentsRow>
      <ContentsRow>
        {/* form_item */}
        <div className={formStyles.form_item}>
          <label htmlFor="name-owner" className={formStyles.form_label}>
            <span className={formStyles.form_text}>테넌트 담당자</span>
            {/* 필수 케이스 */}
            <span className={cn(formStyles.status, formStyles.required)}>
              <IcoFormRequired width={12} height={12} />
            </span>
          </label>
          <div className={formStyles.input_box}>
            <ChipListModalSelectorFormField
              /* modalConfig={{ width: 'xl', content: <ModalOwnerSearchContent /> }}*/
              chipList={{
                labelField: 'name',
                valueField: 'value',
                hideBorder: true,
              }}
            />
          </div>
        </div>
      </ContentsRow>
      <ContentsRow>
        {/* form_item */}
        <div className={formStyles.form_item}>
          <label htmlFor="name-tag" className={formStyles.form_label}>
            <span className={formStyles.form_text}>테넌트 정산 태그</span>
            {/* 필수 케이스 */}
            <span className={cn(formStyles.status, formStyles.required)}>
              <IcoFormRequired width={12} height={12} />
            </span>
          </label>
          <div className={formStyles.input_box}>
            <Input
              id="name-tag"
              type="text"
              placeholder="입력"
              className={formStyles.input}
              maxLength={150}
            />
          </div>
        </div>
      </ContentsRow>
      <ContentsRow>
        {/* form_item */}
        <div className={formStyles.form_item}>
          <label htmlFor="name-companySelect" className={formStyles.form_label}>
            <span className={formStyles.form_text}>회사 선택</span>
            {/* 필수 케이스 */}
            <span className={cn(formStyles.status, formStyles.required)}>
              <IcoFormRequired width={12} height={12} />
            </span>
            <Tooltip
              className={formStyles.tooltip}
              side="right"
              align="start"
              content={
                '테넌트 소속 회사를 여러개 선택할 수 있습니다. 회사가 여러 개인 경우 회사별로 개별 설정이 필요합니다. '
              }
            >
              <Button onlyIcon>
                <IcoAlertCircle width={16} height={16} fill="#A9AFB8" stroke="#ffffff" />
              </Button>
            </Tooltip>
          </label>
          <div className={formStyles.input_box}>
            <ChipListModalSelectorFormField
              /*modalConfig={{ width: 'xl', content: <ModalCompanySearchContent /> }}*/
              chipList={{
                labelField: 'name',
                valueField: 'value',
                hideBorder: true,
                type: 'round2',
              }}
            />
          </div>
        </div>
      </ContentsRow>
      <ContentsRow type="horizontal">
        <div className={formStyles.form_item}>
          <label htmlFor="name-toggle01" className={formStyles.form_label}>
            <span className={formStyles.form_text}>사용 여부</span>
            {/* 필수 케이스 */}
            <span className={cn(formStyles.status, formStyles.required)}>
              <IcoFormRequired width={12} height={12} />
            </span>
            <Tooltip
              className={formStyles.tooltip}
              side="right"
              align="start"
              content={
                '테넌트 사용이 ON이면 학습자 사이트에 로그인 할 수 있으며, OFF이면 로그인 할 수 없습니다.'
              }
            >
              <Button onlyIcon>
                <IcoAlertCircle width={16} height={16} fill="#A9AFB8" stroke="#ffffff" />
              </Button>
            </Tooltip>
          </label>
          <div className={formStyles.input_box}>
            <Switch
              id="name-use"
              className={dynamicFormStyles.btn_switch}
              label={checked[1] ? '사용' : '미사용'}
              checked={checked[1]}
              onCheckedChange={handleCheckedChange(1)}
            />
          </div>
          <p className={formStyles.guide_text}>
            테넌트 사용 여부를 설정할 수 {checked[1] ? ' 있습니다.' : ' 없습니다.'}
          </p>
        </div>
      </ContentsRow>
      <ContentsRow>
        {/* Textarea type */}
        <div className={formStyles.form_item}>
          <label htmlFor="name-auto" className={formStyles.form_label}>
            <span className={formStyles.form_text}>설명</span>
          </label>
          <div className={formStyles.input_box}>
            <Textarea
              id="name-auto"
              rows={5}
              cols={33}
              placeholder="설명을 입력해 주세요."
              resize="none"
              size="md"
              maxLength={2000}
            />
          </div>
        </div>
      </ContentsRow>
      <div className="title_wrap no_line">
        <strong className="title">{'시스템 설정'}</strong>
      </div>
      <ContentsRow>
        {/* form_item */}
        <div className={formStyles.form_item}>
          <label htmlFor="name-device" className={formStyles.form_label}>
            <span className={formStyles.form_text}>디바이스</span>
            {/* 필수 케이스 */}
            <span className={cn(formStyles.status, formStyles.required)}>
              <IcoFormRequired width={12} height={12} />
            </span>
            <Tooltip
              className={formStyles.tooltip}
              side="right"
              align="start"
              content={
                'PC, 모바일, APP 모두 사용가능하며 과정 등록 시 PC, 모바일 학습 여부를 설정할 수 있습니다. '
              }
            >
              <Button onlyIcon>
                <IcoAlertCircle width={16} height={16} fill="#A9AFB8" stroke="#ffffff" />
              </Button>
            </Tooltip>
          </label>
          <div className={formStyles.input_box}>
            <div className={dynamicFormStyles.check_wrap}>
              <CheckboxGroupFormField
                options={[
                  { value: 'all', label: '전체' },
                  { value: 'pc', label: 'PC' },
                  { value: 'mobile', label: 'Mobile' },
                  { value: 'app', label: 'APP' },
                ]}
                value={['all']}
              />
            </div>
          </div>
        </div>
      </ContentsRow>
      <ContentsRow>
        {/* form_item */}
        <div className={formStyles.form_item}>
          <label htmlFor="name-device" className={formStyles.form_label}>
            <span className={formStyles.form_text}>카테고리 사용 여부</span>
            {/* 필수 케이스 */}
            <span className={cn(formStyles.status, formStyles.required)}>
              <IcoFormRequired width={12} height={12} />
            </span>
            <Tooltip
              className={formStyles.tooltip}
              side="right"
              align="start"
              content={'테넌트 - 카테고리 관리에서 사용할 카테고리를 선택할 수 있습니다.'}
            >
              <Button onlyIcon>
                <IcoAlertCircle width={16} height={16} fill="#A9AFB8" stroke="#ffffff" />
              </Button>
            </Tooltip>
          </label>
          <div className={formStyles.input_box}>
            <div className={dynamicFormStyles.check_wrap}>
              <CheckboxGroupFormField
                options={[
                  { value: 'all', label: '전체' },
                  { value: 'common', label: '공통 카테고리' },
                  { value: 'tenant', label: '테넌트 카테고리' },
                ]}
                value={['all', 'common', 'tenant']}
              />
            </div>
          </div>
        </div>
      </ContentsRow>
      <ContentsRow>
        {/* form_item */}
        <div className={formStyles.form_item}>
          <label htmlFor="name-device" className={formStyles.form_label}>
            <span className={formStyles.form_text}>언어</span>
            {/* 필수 케이스 */}
            <span className={cn(formStyles.status, formStyles.required)}>
              <IcoFormRequired width={12} height={12} />
            </span>
            <Tooltip
              className={formStyles.tooltip}
              side="right"
              align="start"
              content={
                '테넌트에서 사용할 언어를 선택하고, 선택한 언어에서 다국어 설정을 할 수 있습니다. '
              }
            >
              <Button onlyIcon>
                <IcoAlertCircle width={16} height={16} fill="#A9AFB8" stroke="#ffffff" />
              </Button>
            </Tooltip>
          </label>
          <div className={formStyles.input_box}>
            <div className={dynamicFormStyles.check_wrap}>
              <CheckboxGroupFormField
                options={[
                  { value: 'a', label: '전체' },
                  { value: 'b', label: '한국어' },
                  { value: 'c', label: '영어' },
                  { value: 'd', label: '네팔어' },
                  { value: 'e', label: '루미나이어' },
                  { value: 'f', label: '말레이어' },
                  { value: 'g', label: '베트남어' },
                  { value: 'h', label: '스페인어' },
                  { value: 'i', label: '영어' },
                ]}
                value={['all', 'common', 'tenant']}
              />
            </div>
          </div>
        </div>
      </ContentsRow>
      <ContentsRow className={cn(formStyles.no_line, formStyles.space2)}>
        <ContentsHistoryInfoFormField />
      </ContentsRow>
    </>
  );
};

export const TenantDetailBase = TenantDetailBaseComponent;

const formConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'tenantName',
      type: 'text',
      label: t('테넌트명'),
      value: '',
      placeholder: '',
    },
    {
      label: t('테넌트 로고 (Size : 000x000)'),
      name: 'tenantLogo',
      type: 'custom',
      format: 'array',
      value: [],
    },
    {
      name: 'managerName',
      label: t('테넌트 담당자'),
      type: 'custom',
      value: '',
    },
  ],
  validator: {
    tenantName: { required: true },
    thumbnails: { required: true },
  },
};
