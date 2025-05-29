/* eslint-disable @nx/enforce-module-boundaries */
import { FC, useState } from 'react';
import { cn } from '@learnway/shared';
import { FormSubTitle } from '../../../../../../../bo/src/shared/ui/form';
import { Button, ContentsRow, Input, Dropdown } from '@learnway/ui';
import { ContentsHistoryInfoFormField } from '../../../../../../../bo/src/shared/ui/form/contents-history-info-form-field';
import { IcoFormRequired, IcoRefresh02, IcoSearch } from '@learnway/icons';

/* style */
import styles from '@learnway/styles/bo/features/role/role-info.module.css';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css'; // form
import searchStyles from '@learnway/styles/bo/assets/styles/modules/search-box.module.css';

const RoleGrantComponent: FC<{}> = ({}) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const options = [
    { value: 'option1', label: '전체' },
    { value: 'option2', label: '옵션 2' },
    { value: 'option3', label: '옵션 3' },
  ];
  return (
    <div className={cn(styles.start, styles.wrap)}>
      <FormSubTitle
        label={'역할 정보'}
        actionNode={<Button label={'저장'} variant={'save'} size={'sm'} />}
        lineType={'light'}
      />
      <div className={styles.contents_wrap}>
        {/* search-box */}
        <ContentsRow>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-id" className={formStyles.form_label}>
              <span className={formStyles.form_text}>{'개별사용자 역할부여'}</span>
              {/* 필수 케이스 */}
              <span className={cn(formStyles.status, formStyles.required)}>
                <IcoFormRequired width={12} height={12} />
              </span>
            </label>
            <div className={formStyles.input_box}>
              {/* 4개인 CASE */}
              <div className={cn(searchStyles.start, searchStyles.wrap)}>
                <div className={searchStyles.contents}>
                  <div className={searchStyles.item_row}>
                    <div className={searchStyles.item_wrap}>
                      <div className={searchStyles.inner}>
                        <div className={searchStyles.item}>
                          <label htmlFor="name-label" className={searchStyles.label}>
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
                      <div className={searchStyles.inner}>
                        <div className={searchStyles.item}>
                          <label htmlFor="name-label2" className={searchStyles.label}>
                            <span className={searchStyles.text}>조직</span>
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
                      <div className={searchStyles.inner}>
                        <div className={searchStyles.item}>
                          <label htmlFor="name-label3" className={searchStyles.label}>
                            <span className={searchStyles.text}>호칭</span>
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
                      <div className={searchStyles.inner}>
                        <div className={searchStyles.item}>
                          <label htmlFor="name-label4" className={searchStyles.label}>
                            <span className={searchStyles.text}>이름</span>
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
          </div>
        </ContentsRow>
        <ContentsHistoryInfoFormField />
      </div>
    </div>
  );
};

RoleGrantComponent.displayName = 'RoleGrant';
export const RoleGrant = RoleGrantComponent;
