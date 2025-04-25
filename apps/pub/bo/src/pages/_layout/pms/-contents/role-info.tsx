/* eslint-disable @nx/enforce-module-boundaries */
import { FC, useState } from 'react';
import { cn } from '@learnway/shared';
import { FormSubTitle } from '../../../../../../../bo/src/shared/ui/form';
import {
  Button,
  ContentsRow,
  Input,
  Textarea,
  Switch,
  RadioGroupFormField,
  ChipListModalSelectorFormField,
  ModalTitle,
  ModalContainer,
  ModalBody,
  ModalFooter,
  Dropdown,
  useModal,
} from '@learnway/ui';
import { ContentsHistoryInfoFormField } from '../../../../../../../bo/src/shared/ui/form/contents-history-info-form-field';
import { IcoFormRequired, IcoRefresh02, IcoSearch } from '@learnway/icons';

/* style */
import styles from './role-info.module.css';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css'; // form
import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';
import searchStyles from '@learnway/styles/bo/assets/styles/modules/search-box.module.css';
import popupStyles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';

const RoleInfoComponent: FC<{}> = ({}) => {
  // switch : 사용기한
  const [checked, setChecked] = useState<{ [key: number]: boolean }>({
    1: false,
  });

  // 상태 변경 함수 (Switch id에 따라 상태를 업데이트)
  const handleCheckedChange = (id: number) => (checked: boolean) => {
    setChecked((prev) => ({ ...prev, [id]: checked }));
  };

  const [selectedValue, setSelectedValue] = useState<string>('option01');

  const handleValueChange = (value: string) => {
    setSelectedValue(value);
  };

  const ModalOwnerSearchContent = () => {
    const [selectedValues, setSelectedValues] = useState<string[]>([]);
    const [selectedValues2, setSelectedValues2] = useState<string[]>([]);
    const [selectedValues3, setSelectedValues3] = useState<string[]>([]);
    const options = [
      { value: 'type1-1', label: '전체' },
      { value: 'type1-2', label: '항목' },
    ];
    const options2 = [
      { value: 'type2-1', label: '전체' },
      { value: 'type2-2', label: '항목' },
    ];
    const options3 = [
      { value: 'type3-1', label: '전체' },
      { value: 'type3-2', label: '항목' },
    ];

    const { close: closeModal } = useModal();

    return (
      <ModalContainer>
        <ModalTitle>HRD 담당자 역할 조회</ModalTitle>
        <ModalBody>
          <div className={popupStyles.wrap}>
            <div className={cn(searchStyles.start, searchStyles.wrap)}>
              <div className={searchStyles.contents}>
                <div className={searchStyles.item_row}>
                  <div className={searchStyles.item_wrap}>
                    <div className={searchStyles.inner}>
                      <div className={searchStyles.item}>
                        <label htmlFor="name-tenant" className={searchStyles.label}>
                          <span className={searchStyles.text}>테넌트</span>
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
                          <span className={searchStyles.text}>채널</span>
                        </label>
                        <div className={searchStyles.box}>
                          <Dropdown
                            options={options2}
                            value={selectedValues2}
                            onChange={(selected) => setSelectedValues2(selected)}
                            variant="default"
                            size={'sm'}
                          />
                        </div>
                      </div>
                      <div className={searchStyles.item}>
                        <label htmlFor="name-companyName" className={searchStyles.label}>
                          <span className={searchStyles.text}>회사명</span>
                        </label>
                        <div className={searchStyles.box}>
                          <Dropdown
                            options={options3}
                            value={selectedValues3}
                            onChange={(selected) => setSelectedValues3(selected)}
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
            <div className={popupStyles.container}></div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button label={'취소'} variant={'gray'} size={'lg'} onClick={() => closeModal()} />
          <Button label={'적용'} variant={'primary'} size={'lg'} onClick={() => closeModal()} />
        </ModalFooter>
      </ModalContainer>
    );
  };
  return (
    <div className={cn(styles.start, styles.wrap)}>
      <FormSubTitle
        label={'역할 정보'}
        actionNode={
          <>
            <Button label={'초기화'} variant={'text'} size={'sm'} className="btn_text" disabled />
            <Button label={'삭제'} variant={'text'} size={'sm'} className="btn_text" disabled />
            <Button label={'저장'} variant={'save'} size={'sm'} disabled />
          </>
        }
        underLine={true}
      />
      <div className={styles.contents_wrap}>
        <ContentsRow>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-id" className={formStyles.form_label}>
              <span className={formStyles.form_text}>{'역할 ID'}</span>
              {/* 필수 케이스 */}
              <span className={cn(formStyles.status, formStyles.required)}>
                <IcoFormRequired width={12} height={12} />
              </span>
            </label>
            <div className={formStyles.input_box}>
              <Input id="name-id" type="text" placeholder="입력" value="러닝웨이" disabled />
            </div>
          </div>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-code" className={formStyles.form_label}>
              <span className={formStyles.form_text}>{'역할 코드'}</span>
              {/* 필수 케이스 */}
              <span className={cn(formStyles.status, formStyles.required)}>
                <IcoFormRequired width={12} height={12} />
              </span>
            </label>
            <div className={formStyles.input_box}>
              <Input id="name-code" type="text" placeholder="입력" value="러닝웨이" disabled />
            </div>
          </div>
        </ContentsRow>
        <ContentsRow>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-roleName" className={formStyles.form_label}>
              <span className={formStyles.form_text}>{'역할명'}</span>
              {/* 필수 케이스 */}
              <span className={cn(formStyles.status, formStyles.required)}>
                <IcoFormRequired width={12} height={12} />
              </span>
            </label>
            <div className={formStyles.input_box}>
              <Input id="name-id" type="text" placeholder="입력" value="역할명" maxLength={40} />
            </div>
          </div>
        </ContentsRow>
        <ContentsRow>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-roleExplain" className={formStyles.form_label}>
              <span className={formStyles.form_text}>{'역할 설명'}</span>
            </label>
            <div className={formStyles.input_box}>
              <Textarea
                className={formStyles.input}
                maxLength={300}
                size={'sm'}
                resize={'none'}
                placeholder={'입력'}
              />
            </div>
          </div>
        </ContentsRow>
        <ContentsRow>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-applyRange" className={formStyles.form_label}>
              <span className={formStyles.form_text}>{'회사 적용 범위 '}</span>
              {/* 필수 케이스 */}
              <span className={cn(formStyles.status, formStyles.required)}>
                <IcoFormRequired width={12} height={12} />
              </span>
            </label>
            <div className={formStyles.input_box}>
              <RadioGroupFormField
                options={[
                  { value: 'option01', label: '모든 회사' },
                  { value: 'option02', label: '소속 회사' },
                  { value: 'option03', label: '직접 선택' },
                ]}
                onValueChange={handleValueChange}
              />
            </div>
          </div>
        </ContentsRow>
        {selectedValue === 'option03' && (
          <div className="chiplist_modal_wrap">
            <ChipListModalSelectorFormField
              modalConfig={{ width: 'xl', content: <ModalOwnerSearchContent /> }}
              chipList={{
                labelField: 'name',
                valueField: 'value',
                hideBorder: true,
              }}
            />
          </div>
        )}

        <ContentsRow type={'horizontal'}>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-roleUseable" className={formStyles.form_label}>
              <span className={formStyles.form_text}>{'역할 사용 여부'}</span>
              {/* 필수 케이스 */}
              <span className={cn(formStyles.status, formStyles.required)}>
                <IcoFormRequired width={12} height={12} />
              </span>
            </label>
            <div className={formStyles.input_box}>
              <Switch
                id="name-use"
                className={dynamicFormStyles.btn_switch}
                label={checked[2] ? '활용 가능' : '활용 불가'}
                checked={checked[2]}
                onCheckedChange={handleCheckedChange(2)}
              />
            </div>
          </div>
        </ContentsRow>
        <ContentsHistoryInfoFormField />
      </div>
    </div>
  );
};

RoleInfoComponent.displayName = 'RoleInfo';
export const RoleInfo = RoleInfoComponent;
