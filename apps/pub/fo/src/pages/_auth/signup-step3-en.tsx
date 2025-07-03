import { isMobile } from 'react-device-detect';
import { cn } from '@learnway/shared';
import { createFileRoute } from '@tanstack/react-router';
import { IcoFormRequired, IcoArrowForward, IcoPlus, IcoClose02 } from '@learnway/icons';
import styles from './signup-step3.module.css';
import dynamicFormStyles from '@learnway/styles/fo/assets/styles/modules/dynamic.form.module.css';
import formStyles from '@learnway/styles/fo/assets/styles/modules/form.module.css';
import {
  Button,
  Stepper,
  SelectOption,
  Input,
  Checkbox,
  Dropdown,
  ContentsRow,
  PhoneNumber,
  InputTimer,
} from '@learnway/ui';

import { MobileView, BrowserView } from 'react-device-detect';
import { MobileContainerFooter } from '../../shared/m.ui/container-footer/container-footer';

export const Route = createFileRoute('/_auth/signup-step3-en')({
  component: RouteComponent,
});

function RouteComponent() {
  const items = [
    { label: 'Select Membership Type', subLabel: '', value: 'step1' },
    { label: 'Dealer & Region Select', subLabel: '', value: 'step2' },
    { label: 'Required Information', subLabel: '', value: 'step3' },
  ];
  const handleChange = (event: SelectOption) => {
    console.log(event);
  };
  return (
    <div className="form_row">
      <div className={`${styles.start} ${styles.auth_wrap} ${styles.signup_step}`}>
        <div className={cn(styles.auth_box, 'auth--box')}>
          <div className={styles.signup_info}>
            <div className={styles.step_box}>
              <Stepper items={items} onChange={handleChange} variant="check" selectedStep="step3" />
            </div>
          </div>

          <h4 className={cn(styles.title, 'auth--title')}>Enter Required Information</h4>

          <div className="no_line col">
            <ContentsRow>
              <div className={formStyles.form_item}>
                <label htmlFor="name" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>Name</span>
                  {/* 필수 케이스 */}
                  <span className={cn(formStyles.status, formStyles.required)}>
                    <IcoFormRequired width={12} height={12} />
                  </span>
                </label>
                <div className={formStyles.input_box}>
                  <Input id="name" type="text" placeholder="First name" value="" />
                  <Input id="name" type="text" placeholder="Last name" value="" />
                </div>
              </div>
            </ContentsRow>

            <ContentsRow>
              <div className={formStyles.form_item}>
                <label htmlFor="name" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>Employee No.</span>
                  {/* 필수 케이스 */}
                  <span className={cn(formStyles.status, formStyles.required)}>
                    <IcoFormRequired width={12} height={12} />
                  </span>
                </label>
                <div className={formStyles.input_box}>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Employee No.(Optional Infromation)"
                    value=""
                  />
                </div>
              </div>
            </ContentsRow>

            <ContentsRow>
              <div className={formStyles.form_item}>
                <label htmlFor="name" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>Email</span>
                  {/* 필수 케이스 */}
                  <span className={cn(formStyles.status, formStyles.required)}>
                    <IcoFormRequired width={12} height={12} />
                  </span>
                </label>
                <div className={formStyles.input_box}>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Email(hyundai.kim@hyundail.com)"
                    value=""
                  />
                  <Button variant="gray" size="lg" className="min-w-auto">
                    Authentication
                  </Button>
                </div>
              </div>
            </ContentsRow>

            <ContentsRow>
              <div className={formStyles.form_item}>
                <label htmlFor="name" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>인증번호</span>
                  {/* 필수 케이스 */}
                  <span className={cn(formStyles.status, formStyles.required)}>
                    <IcoFormRequired width={12} height={12} />
                  </span>
                </label>
                <div className={formStyles.input_box}>
                  <InputTimer
                    startTimer={1}
                    initialTime={300}
                    placeholder="Enter authentication number"
                    resetLabel="New Code"
                  />
                </div>
              </div>
            </ContentsRow>

            <ContentsRow>
              <div className={formStyles.form_item}>
                <label htmlFor="name" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>New Password</span>
                  {/* 필수 케이스 */}
                  <span className={cn(formStyles.status, formStyles.required)}>
                    <IcoFormRequired width={12} height={12} />
                  </span>
                </label>
                <div className={formStyles.input_box}>
                  <div className={dynamicFormStyles.item_col_full}>
                    <Input
                      id="name"
                      type="password"
                      placeholder="Password(a combination of letters, numbers & special characters, 8 to 16 characters long)"
                      value=""
                    />
                    <Input id="name" type="password" placeholder="Confirm New Password" value="" />
                  </div>
                </div>
              </div>
            </ContentsRow>

            <ContentsRow>
              <div className={formStyles.form_item}>
                <label htmlFor="name-1-6" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>Mobile phone Number</span>
                  {/* 필수 케이스 */}
                  <span className={cn(formStyles.status, formStyles.required)}>
                    <IcoFormRequired width={12} height={12} />
                  </span>
                </label>
                <div className={formStyles.input_box}>
                  {/* 퍼블수정 20250313 : 공통 변경 */}
                  <PhoneNumber
                    options={[
                      { value: 'type1', label: '+82' },
                      { value: 'type2', label: '+83' },
                    ]}
                    size="lg"
                    placeholder="-없이 휴대폰 번호입력(0102345678)"
                  />
                </div>
              </div>
            </ContentsRow>

            <ContentsRow>
              <div className={formStyles.form_item}>
                <label htmlFor="name" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>Organization Division</span>
                </label>
                <div className={formStyles.input_box}>
                  <Input id="name" type="text" placeholder="" value="Dealer User" readOnly />
                </div>
              </div>
            </ContentsRow>

            <ContentsRow>
              <div className={formStyles.form_item}>
                <label htmlFor="name" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>Dealer User</span>
                  {/* 필수 케이스 */}
                  <span className={cn(formStyles.status, formStyles.required)}>
                    <IcoFormRequired width={12} height={12} />
                  </span>
                </label>
                <div className={formStyles.input_box}>
                  <div className={dynamicFormStyles.item_col_full}>
                    <div className={dynamicFormStyles.flex_plus}>
                      <Dropdown
                        size="lg"
                        options={[{ value: 'type1', label: 'Select Job Domin' }]}
                        className="flex-1"
                      />
                      <Dropdown
                        size="lg"
                        options={[{ value: 'type2', label: 'Select Role' }]}
                        className="flex-1"
                      />

                      <Dropdown
                        size="lg"
                        options={[{ value: 'type2', label: 'Select Role' }]}
                        className="flex-1"
                      />

                      <Button onlyIcon className={dynamicFormStyles.btn_ico}>
                        <IcoPlus width={20} height={20} />
                      </Button>
                    </div>
                    <div className={dynamicFormStyles.item_col_full}>
                      <div className={dynamicFormStyles.flex_plus}>
                        <Dropdown
                          size="lg"
                          options={[{ value: 'type1', label: 'Select Job Domin' }]}
                          className="flex-1"
                        />
                        <Dropdown
                          size="lg"
                          options={[{ value: 'type2', label: 'Select Role' }]}
                          className="flex-1"
                        />

                        <Dropdown
                          size="lg"
                          options={[{ value: 'type2', label: 'Select Role' }]}
                          className="flex-1"
                        />

                        <Button onlyIcon className={dynamicFormStyles.btn_ico}>
                          <IcoClose02 width={20} height={20} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ContentsRow>
          </div>

          <div className={styles.title_box}>
            <h4 className={styles.title}>Agree to the Terms of Use and Privacy Policy</h4>
            <p className={styles.txt_info}>
              Please carefully review the following information before agreeing.
            </p>
          </div>

          <div className={styles.signup_check}>
            <div className={styles.check_all}>
              <Checkbox label="I accept the Terms of use and  Privacy policy." />
            </div>
            <ul className={styles.check_list}>
              <li>
                <Checkbox label="Terms of Use" />
                <Button className={styles.btn_view}>
                  <IcoArrowForward width={14} height={14} stroke="#6F798B" />{' '}
                </Button>
              </li>
              <li>
                <Checkbox label="Privacy Policy" />
                <Button className={styles.btn_view}>
                  <IcoArrowForward width={14} height={14} stroke="#6F798B" />{' '}
                </Button>
              </li>
            </ul>
          </div>

          {/* 퍼블수정 20250324 : 버튼 모바일 분기처리 */}
          <BrowserView>
            <div className={cn(styles.btn_wrap, 'auth--btn_wrap')}>
              <Button variant="gray" size="xl">
                Previous
              </Button>
              <Button variant="primary" size="xl">
                OK
              </Button>
            </div>
          </BrowserView>

          <MobileView>
            <MobileContainerFooter>
              <Button variant="primary" size="xl">
                OK
              </Button>
            </MobileContainerFooter>
          </MobileView>
        </div>
      </div>
    </div>
  );
}
