import { isMobile } from 'react-device-detect';
import { cn } from '@learnway/shared';
import { createFileRoute } from '@tanstack/react-router';
import { IcoFormRequired } from '@learnway/icons';
import styles from './signup-step2.module.css';
import formStyles from '@learnway/styles/fo/assets/styles/modules/form.module.css';
import { Button, Stepper, SelectOption, Dropdown, ContentsRow, RadioCard } from '@learnway/ui';

import { MobileView, BrowserView } from 'react-device-detect';
import { MobileContainerFooter } from '../../shared/m.ui/container-footer/container-footer';

import dynamicFormStyles from '@learnway/styles/fo/assets/styles/modules/dynamic.form.module.css';

export const Route = createFileRoute('/_auth/signup-step2-en')({
  component: RouteComponent,
});

function RouteComponent() {
  const items = [
    { label: 'Select\n Membership Type', subLabel: '', value: 'step1' },
    { label: 'Dealer & Region\n Select', subLabel: '', value: 'step2' },
    { label: 'Required\n Information', subLabel: '', value: 'step3' },
  ];
  const handleChange = (event: SelectOption) => {
    console.log(event);
  };
  return (
    <form className="form_row">
      <div className={`${styles.start} ${styles.auth_wrap} ${styles.signup_step}`}>
        <div className={cn(styles.auth_box, 'auth--box')}>
          <div className={styles.signup_info}>
            <div className={styles.step_box}>
              <Stepper items={items} onChange={handleChange} variant="check" selectedStep="step2" />
            </div>
          </div>

          <div className={styles.select_txt}>
            Please select Passenger/Commercial
            <br />
            and then choose an organization.
          </div>
          <ContentsRow>
            <div className={formStyles.form_item}>
              <label htmlFor="name" className={formStyles.form_label}>
                <span className={formStyles.form_text}>Name</span>
                {/* 필수 케이스 */}
                <span className={cn(formStyles.status, formStyles.required)}>
                  <IcoFormRequired width={12} height={12} />
                </span>
              </label>
              <div className={cn(styles.signup_select, 'auth--signup-select')} role="radiogroup">
                <RadioCard
                  className="radio_card"
                  options={[
                    {
                      value: 'type1',
                      label: (
                        <div>
                          <span>HTA</span>
                        </div>
                      ),
                    },
                    {
                      value: 'type2',
                      label: (
                        <div>
                          <span>HTACV</span>
                        </div>
                      ),
                    },
                  ]}
                />
              </div>
            </div>
          </ContentsRow>
          <div className={cn(styles.auth_form, 'no_line', 'col')}>
            <ContentsRow>
              <div className={formStyles.form_item}>
                <label htmlFor="name" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>Select Organization</span>
                  {/* 필수 케이스 */}
                  <span className={cn(formStyles.status, formStyles.required)}>
                    <IcoFormRequired width={12} height={12} />
                  </span>
                </label>
                <div className={formStyles.input_box}>
                  <div className={dynamicFormStyles.item_col_full}>
                    <Dropdown
                      size="lg"
                      options={[{ value: 'type1', label: 'Select Region' }]}
                      className={formStyles.select_option}
                    />
                    <Dropdown
                      size="lg"
                      options={[{ value: 'type1', label: 'Select Distributor' }]}
                      className={formStyles.select_option}
                    />
                    <Dropdown
                      size="lg"
                      options={[{ value: 'type1', label: 'Select Dealer' }]}
                      className={formStyles.select_option}
                    />
                  </div>
                </div>
              </div>
            </ContentsRow>
          </div>

          {/* 퍼블수정 20250324 : 버튼 모바일 분기처리 */}
          <BrowserView>
            <div className={cn(styles.btn_wrap, 'auth--btn_wrap')}>
              <Button variant="gray" size="xl">
                이전
              </Button>
              <Button variant="primary" size="xl">
                다음
              </Button>
            </div>
          </BrowserView>

          <MobileView>
            <MobileContainerFooter>
              <Button variant="primary" size="xl">
                다음
              </Button>
            </MobileContainerFooter>
          </MobileView>
        </div>
      </div>
    </form>
  );
}
