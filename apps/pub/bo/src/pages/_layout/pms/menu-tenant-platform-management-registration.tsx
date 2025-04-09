import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { PageContainer } from '../../../widgets/layout/ui/container/page-container';
import { cn } from '@learnway/shared';
import { useTranslation } from 'react-i18next';
import { IcoFormRequired, IcoAlertCircle, IcoRefresh02, IcoSearch } from '@learnway/icons';
import {
  ContentsRow,
  Input,
  Textarea,
  CheckboxGroupFormField,
  Tooltip,
  Button,
  Switch,
  ThumbnailImageUpload,
  ImageOption,
  InputModalSelectorFormField,
  useModal,
  ModalTitle,
  ModalContainer,
  ModalBody,
  ModalFooter,
  Dropdown,
} from '@learnway/ui';

/* style */
import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';
import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';
import popSearchStyles from '@learnway/styles/bo/assets/styles/modules/popup-search.module.css';
import searchStyles from '@learnway/styles/bo/assets/styles/modules/search-box.module.css';
import popupStyles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';

/* image */
import selectedImg from '../../../assets/images/thumb/img_thumb_hyundai.jpg';

export const Route = createFileRoute('/_layout/pms/menu-tenant-platform-management-registration')({
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useTranslation();

  // switch
  const [checked, setChecked] = useState<{ [key: number]: boolean }>({
    1: false,
  });

  // 상태 변경 함수 (Switch id에 따라 상태를 업데이트)
  const handleCheckedChange = (id: number) => (checked: boolean) => {
    setChecked((prev) => ({ ...prev, [id]: checked }));
  };

  const { close: closeModal } = useModal();
  const ModalChannelContent = () => {
    const [selectedValues, setSelectedValues] = useState<string[]>([]);
    const options = [
      { value: 'type1', label: '전체' },
      { value: 'type2', label: '항목' },
    ];
    const [value, setValue] = useState<any>();

    return (
      <ModalContainer>
        <ModalTitle>회사 조회</ModalTitle>
        <ModalBody>
          {/* 퍼블수정 20240318 : 수정 S */}
          <div className={popupStyles.wrap}>
            <div className={cn(searchStyles.start, searchStyles.wrap)}>
              <div className={searchStyles.contents}>
                <div className={searchStyles.item_row}>
                  <div className={searchStyles.item_wrap}>
                    <div className={searchStyles.inner}>
                      <div className={searchStyles.item}>
                        <label htmlFor="name-select1" className={searchStyles.label}>
                          <span className={searchStyles.text}>회사구분</span>
                        </label>
                        <div className={searchStyles.box}>
                          <Dropdown
                            options={options}
                            value={selectedValues}
                            onChange={(selected) => setSelectedValues(selected)}
                            variant="default"
                            size={'sm'}
                          />
                        </div>
                      </div>
                      <div className={searchStyles.item}>
                        <label htmlFor="name-select2" className={searchStyles.label}>
                          <span className={searchStyles.text}>회사</span>
                        </label>
                        <div className={searchStyles.box}>
                          <Dropdown
                            options={options}
                            value={selectedValues}
                            onChange={(selected) => setSelectedValues(selected)}
                            variant="default"
                            size={'sm'}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={searchStyles.btn_box}>
                  <Button
                    type="button"
                    className={searchStyles.btn_refresh}
                    variant="search"
                    size="sm"
                    onlyIcon
                  >
                    <IcoRefresh02 className={searchStyles.icon_refresh} />
                  </Button>
                  <Button
                    type="button"
                    variant="search"
                    size="sm"
                    className={searchStyles.btn_search}
                  >
                    <IcoSearch className={searchStyles.icon_sm_search} />
                    조회
                  </Button>
                </div>
              </div>
            </div>
          </div>
          {/* 퍼블수정 20240318 : 수정 E */}
        </ModalBody>
        <ModalFooter>
          <Button label={'확인'} variant={'primary'} size={'lg'} onClick={() => closeModal()} />
        </ModalFooter>
      </ModalContainer>
    );
  };

  return (
    <PageContainer>
      {/* main_contents */}
      <div className={cn(styles.main_contents)}>
        <div className="title_wrap">
          <strong className="title">{'기본 정보'}</strong>
        </div>
        <ContentsRow>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-tenantName" className={formStyles.form_label}>
              <span className={formStyles.form_text}>{t('테넌트명')}</span>
              {/* 필수 케이스 */}
              <span className={cn(dynamicFormStyles.status, dynamicFormStyles.required)}>
                <IcoFormRequired width={12} height={12} />
              </span>
            </label>
            <div className={formStyles.input_box}>
              <Input
                id="name-tenantName"
                type="text"
                placeholder="입력"
                className={formStyles.input}
              />
            </div>
          </div>
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
            </label>
            <div className={formStyles.input_box}>
              <ThumbnailImageUpload
                options={[{ id: '1', path: selectedImg }]}
                onChange={(options: ImageOption[]) => console.log('onChange', options)}
                onCheckedChange={(options: ImageOption[]) =>
                  console.log('onCheckedChange', options)
                }
              />
            </div>
          </div>
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
            {/* 퍼블수정 20240317 : Modal 수정 S  */}
            <div className={formStyles.input_box}>
              <InputModalSelectorFormField
                modalConfig={{
                  width: 'md',
                  content: <ModalChannelContent />,
                }}
              />
            </div>
            {/* 퍼블수정 20240317 : Modal 수정 E  */}
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
                side="bottom"
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
      </div>
    </PageContainer>
  );
}
