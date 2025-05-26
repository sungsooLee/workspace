/* eslint-disable @nx/enforce-module-boundaries */
import { createFileRoute } from '@tanstack/react-router';
import { cn } from '@learnway/shared';
import { PageContainer } from '../../../widgets/layout/ui/container/page-container';
import { Input, Button, Dropdown, DatePicker, ContentsRow, PhoneNumber } from '@learnway/ui';

/* style */
import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';
import { FormSubTitle } from '../../../../../../bo/src/shared/ui';

export const Route = createFileRoute('/_layout/pms/private_search_detail')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <form className="form_row">
      <PageContainer>
        {/* main_contents */}
        <div className={styles.main_contents}>
          <FormSubTitle label={'과정 소개'} underLine />
          <ContentsRow>
            <div className={formStyles.form_item}>
              <label htmlFor={'name-1'} className={formStyles.form_label}>
                <span className={formStyles.form_text}>{'아이디(이메일)'}</span>
              </label>
              <div className={formStyles.input_box}>
                <Input
                  type={'text'}
                  id={'name-1'}
                  readOnly
                  value={'mail@mail.com'}
                  placeholder={'입력'}
                />
              </div>
            </div>
            <div className={formStyles.form_item}>
              <label htmlFor={'name-2'} className={formStyles.form_label}>
                <span className={formStyles.form_text}>{'사번'}</span>
              </label>
              <div className={formStyles.input_box}>
                <Input
                  type={'text'}
                  id={'name-2'}
                  readOnly
                  value={'mail@mail.com'}
                  placeholder={'입력'}
                />
              </div>
            </div>
            <div className={formStyles.form_item}>
              <label htmlFor={'name-3'} className={formStyles.form_label}>
                <span className={formStyles.form_text}>{'이름'}</span>
              </label>
              <div className={formStyles.input_box}>
                <Input type={'text'} id={'name-3'} readOnly value={'홍길동'} placeholder={'입력'} />
              </div>
            </div>
          </ContentsRow>
          <ContentsRow>
            <div className={formStyles.form_item}>
              <label htmlFor={'name-4'} className={formStyles.form_label}>
                <span className={formStyles.form_text}>{'회사'}</span>
              </label>
              <div className={formStyles.input_box}>
                <Input
                  type={'text'}
                  id={'name-4'}
                  readOnly
                  value={'기아자동차'}
                  placeholder={'입력'}
                />
              </div>
            </div>
            <div className={formStyles.form_item}>
              <label htmlFor={'name-5'} className={formStyles.form_label}>
                <span className={formStyles.form_text}>{'소속'}</span>
              </label>
              <div className={formStyles.input_box}>
                <Input
                  type={'text'}
                  id={'name-5'}
                  readOnly
                  value={'인사지원1팀'}
                  placeholder={'입력'}
                />
              </div>
            </div>
            <div className={formStyles.form_item}>
              <label htmlFor={'name-6'} className={formStyles.form_label}>
                <span className={formStyles.form_text}>{'직위'}</span>
              </label>
              <div className={formStyles.input_box}>
                <Input type={'text'} id={'name-6'} readOnly value={'차장'} placeholder={'입력'} />
              </div>
            </div>
          </ContentsRow>
          <ContentsRow>
            <div className={formStyles.form_item}>
              <label htmlFor={'name-7'} className={formStyles.form_label}>
                <span className={formStyles.form_text}>{'휴대폰 번호'}</span>
              </label>
              <div className={formStyles.input_box}>
                <PhoneNumber
                  options={[
                    { value: 'type1', label: '010' },
                    { value: 'type2', label: '016' },
                    { value: 'type3', label: '017' },
                  ]}
                  readOnly
                />
              </div>
            </div>
            <div className={formStyles.form_item}>
              <label htmlFor={'name-8'} className={formStyles.form_label}>
                <span className={formStyles.form_text}>{'연락처(사무실)'}</span>
              </label>
              <div className={formStyles.input_box}>
                <PhoneNumber
                  options={[
                    { value: 'type1', label: '010' },
                    { value: 'type2', label: '016' },
                    { value: 'type3', label: '017' },
                  ]}
                  disabled
                />
              </div>
            </div>
          </ContentsRow>
        </div>
      </PageContainer>
    </form>
  );
}
