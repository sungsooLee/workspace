import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { PageContainer } from '../../../widgets/layout/ui/container/page-container';
import { FormSubTitle } from '../../../../../../bo/src/shared/ui';
import { cn } from '@learnway/shared';
import {
  Button,
  ContentsRow,
  CheckboxGroupFormField,
  Switch,
  PhoneNumber,
  Input,
  RadioGroupFormField,
} from '@learnway/ui';
import { IcoFormRequired, IcoAlertCircle } from '@learnway/icons';

/** style */
import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css'; // form
import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';

export const Route = createFileRoute('/_layout/pms/group-management-register')({
  component: RouteComponent,
});

function RouteComponent() {
  // switch
  const [checked, setChecked] = useState<{ [key: number]: boolean }>({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
  });

  // 상태 변경 함수 (Switch id에 따라 상태를 업데이트)
  const handleCheckedChange = (id: number) => (checked: boolean) => {
    setChecked((prev) => ({ ...prev, [id]: checked }));
  };
  return (
    <PageContainer>
      {/* main_contents */}
      <div className={styles.main_contents}>
        <FormSubTitle label={'회사 인사 데이터 관리 정보'} lineType={'dark'} />
        <ContentsRow>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-menu" className={formStyles.form_label}>
              <span className={formStyles.form_text}>{'그룹 선택'}</span>
            </label>
            <div className={formStyles.input_box}>
              <div className={dynamicFormStyles.radio_wrap}>
                <RadioGroupFormField
                  options={[
                    { value: 'a', label: '완성차' },
                    { value: 'b', label: '그룹사' },
                    { value: 'c', label: '현대 해외법인' },
                    { value: 'd', label: '현대 해외딜러' },
                    { value: 'e', label: '현대 판매대리점' },
                    { value: 'f', label: '현대 서비스 협력사' },
                    { value: 'g', label: '현대 생산 협력사' },
                    { value: 'h', label: '기아 해외법인' },
                    { value: 'i', label: '기아 해외딜러' },
                    { value: 'j', label: '기아 판매대리점' },
                    { value: 'k', label: '기아 서비스 협력사 ' },
                    { value: 'l', label: '기아 생산 협력사' },
                    { value: 'm', label: '기타' },
                  ]}
                />
              </div>
            </div>
            <p className={cn(formStyles.guide_text)}>
              {'회원 가입하는 회사는 직접 등록하며, HR 시스템 연동 회사는 자동 등록됩니다. '}
            </p>
          </div>
        </ContentsRow>
        <ContentsRow>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-menu2" className={formStyles.form_label}>
              <span className={formStyles.form_text}>{'인사 데이터 관리 방식'}</span>
            </label>
            <div className={formStyles.input_box}>
              <div className={dynamicFormStyles.radio_wrap}>
                <RadioGroupFormField
                  options={[
                    { value: 'a', label: '자동 관리 ' },
                    { value: 'b', label: '수동 관리 ' },
                  ]}
                />
              </div>
            </div>
            <p className={cn(formStyles.guide_text)}>
              {'자동관리와 수동관리 선택에 따라서 아래 회원가입 유형의 옵션이 달라집니다. '}
            </p>
          </div>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-type" className={formStyles.form_label}>
              <span className={formStyles.form_text}>{'회원가입 유형'}</span>
              {/* 필수 케이스 */}
              <span className={cn(formStyles.status, formStyles.required)}>
                <IcoFormRequired width={12} height={12} />
              </span>
            </label>
            <div className={formStyles.input_box}>
              <div className={dynamicFormStyles.radio_wrap}>
                <CheckboxGroupFormField
                  options={[
                    { value: 'option01', label: 'FO 회원가입(해외딜러)' },
                    { value: 'option02', label: 'FO회원가입(일반)' },
                    { value: 'option03', label: 'BO 회원가입(협력사)' },
                  ]}
                  value={['option01']}
                />
              </div>
            </div>
            <p className={cn(formStyles.guide_text)}>
              {'수동 관리는 다수 선택할 수 있으며, 자동 관리는 하나만 선택할 수 있습니다. '}
            </p>
          </div>
        </ContentsRow>
        <FormSubTitle label={'회사 기본 정보'} lineType={'dark'} />
        <ContentsRow>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-company1" className={formStyles.form_label}>
              <span className={formStyles.form_text}>{'회사 코드'}</span>
            </label>
            <div className={formStyles.input_box}>
              <Input id={'name-company1'} type={'text'} placeholder={'입력'} value={''} />
              <Button variant={'gray'} size={'sm'} label={'중복'} />
            </div>
          </div>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-company2" className={formStyles.form_label}>
              <span className={formStyles.form_text}>{'회사명'}</span>
            </label>
            <div className={formStyles.input_box}>
              <Input id={'name-company2'} type={'text'} placeholder={'입력'} value={''} />
            </div>
          </div>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-company3" className={formStyles.form_label}>
              <span className={formStyles.form_text}>{'회사명(영문)'}</span>
            </label>
            <div className={formStyles.input_box}>
              <Input id={'name-company3'} type={'text'} placeholder={'입력'} value={''} />
            </div>
          </div>
        </ContentsRow>
        <ContentsRow>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-owner1" className={formStyles.form_label}>
              <span className={formStyles.form_text}>{'사업자등록번호'}</span>
              {/* 필수 케이스 */}
              <span className={cn(formStyles.status, formStyles.required)}>
                <IcoFormRequired width={12} height={12} />
              </span>
            </label>
            <div className={formStyles.input_box}>
              <Input id={'name-owner1'} type={'text'} placeholder={'입력'} value={''} />
            </div>
          </div>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-owner2" className={formStyles.form_label}>
              <span className={formStyles.form_text}>{'대표자명'}</span>
            </label>
            <div className={formStyles.input_box}>
              <Input id={'name-owner2'} type={'text'} placeholder={'입력'} value={''} />
            </div>
          </div>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-owner3" className={formStyles.form_label}>
              <span className={formStyles.form_text}>{'법인 약어'}</span>
            </label>
            <div className={formStyles.input_box}>
              <Input id={'name-owner3'} type={'text'} placeholder={'입력'} value={''} />
            </div>
          </div>
        </ContentsRow>
        <ContentsRow>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-email" className={formStyles.form_label}>
              <span className={formStyles.form_text}>{'대표 이메일'}</span>
            </label>
            <div className={formStyles.input_box}>
              <Input id={'name-email'} type={'text'} placeholder={'입력'} value={''} />
            </div>
          </div>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-phone" className={formStyles.form_label}>
              <span className={formStyles.form_text}>{'대표 전화번호'}</span>
            </label>
            <div className={formStyles.input_box}>
              <PhoneNumber
                options={[
                  { value: 'type1', label: '+82' },
                  { value: 'type2', label: '+83' },
                ]}
              />
            </div>
          </div>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-fax" className={formStyles.form_label}>
              <span className={formStyles.form_text}>{'대표 팩스번호'}</span>
            </label>
            <div className={formStyles.input_box}>
              <PhoneNumber
                options={[
                  { value: 'type1', label: '+82' },
                  { value: 'type2', label: '+83' },
                ]}
              />
            </div>
          </div>
        </ContentsRow>
        <FormSubTitle label={'플랫폼 계약 설정 정보'} lineType={'dark'} />
        <ContentsRow>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-serviceType" className={formStyles.form_label}>
              <span className={formStyles.form_text}>{'서비스 유형 선택'}</span>
              {/* 필수 케이스 */}
              <span className={cn(formStyles.status, formStyles.required)}>
                <IcoFormRequired width={12} height={12} />
              </span>
            </label>
            <div className={formStyles.input_box}>
              <div className={dynamicFormStyles.radio_wrap}>
                <CheckboxGroupFormField
                  options={[
                    { value: 'option01', label: '베이직' },
                    { value: 'option02', label: '코어' },
                    { value: 'option03', label: '엔터프라이즈' },
                    { value: 'option04', label: '위탁' },
                    { value: 'option05', label: '무료' },
                  ]}
                  value={['option01']}
                />
              </div>
            </div>
          </div>
        </ContentsRow>
        <FormSubTitle label={'로그인 및 인증 설정 정보'} lineType={'dark'} />
        <ContentsRow>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-serviceType" className={formStyles.form_label}>
              <span className={formStyles.form_text}>{'SSO 로그인 사용 및 SSO 로그인 유형'}</span>
              <span className={formStyles.info_area}>
                <Switch
                  id="switch01"
                  className={formStyles.btn_switch}
                  label={checked[1] ? '사용' : '미사용'}
                  checked={checked[1]}
                  onCheckedChange={handleCheckedChange(1)}
                />
              </span>
            </label>
            <div className={formStyles.input_box}>
              <CheckboxGroupFormField
                options={[
                  { value: 'option01', label: 'HMG SSO' },
                  { value: 'option02', label: 'Autoway' },
                  { value: 'option03', label: 'AES Link' },
                ]}
                value={['option01']}
              />
            </div>
            <p className={cn(formStyles.guide_text)}>{'SSO 로그인 사용 여부를 설정합니다. '}</p>
          </div>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-pwType" className={formStyles.form_label}>
              <span className={formStyles.form_text}>{'비밀번호 인증 유형'}</span>
            </label>
            <div className={formStyles.input_box}>
              <div className={dynamicFormStyles.radio_wrap}>
                <RadioGroupFormField
                  options={[
                    { value: 'a', label: '플랫폼 ' },
                    { value: 'b', label: 'HMG-SSO' },
                    { value: 'c', label: 'Autoway' },
                  ]}
                />
              </div>
            </div>
            <p className={cn(formStyles.guide_text)}>
              {
                '플랫폼은 플랫폼에서 비밀번호를 관리하고, 그외의 유형은 각 시스템에서 비밀번호를 관리합니다. '
              }
            </p>
          </div>
        </ContentsRow>
      </div>
    </PageContainer>
  );
}
