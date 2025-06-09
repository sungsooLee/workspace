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
        </ContentsRow>
        {/* 퍼블수정 20250609 : 회원가입 유형 아래로 수정 */}
        <ContentsRow>
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
        <ContentsRow>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-loginType" className={formStyles.form_label}>
              <span className={formStyles.form_text}>{'로그인 2차 인증 사용'}</span>
              <span className={formStyles.info_area}>
                <Switch
                  id="switch02"
                  className={formStyles.btn_switch}
                  label={checked[2] ? '사용' : '미사용'}
                  checked={checked[2]}
                  onCheckedChange={handleCheckedChange(2)}
                />
              </span>
            </label>
            <div className={formStyles.input_box}>
              <CheckboxGroupFormField
                options={[
                  { value: 'option01', label: 'FO 로그인' },
                  { value: 'option02', label: 'BO 로그인' },
                ]}
                value={['option01']}
              />
            </div>
            <p className={cn(formStyles.guide_text)}>
              {'2차 로그인 인증 여부를 설정할 수 있습니다. '}
            </p>
          </div>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-certifyType" className={formStyles.form_label}>
              <span className={formStyles.form_text}>{'2차 인증 유형'}</span>
            </label>
            <div className={formStyles.input_box}>
              <div className={dynamicFormStyles.radio_wrap}>
                <RadioGroupFormField
                  options={[
                    { value: 'a', label: 'MPASS(OTP / FIDO) ' },
                    { value: 'b', label: 'MPASS(FIDO)' },
                    { value: 'c', label: 'MPASS(OTP)' },
                    { value: 'd', label: '구글 OTP' },
                  ]}
                />
              </div>
            </div>
            <p className={cn(formStyles.guide_text)}>
              {'로그인 2차 인증 사용하는 경우 2차 인증 유형을 선택할 수 있습니다. '}
            </p>
          </div>
        </ContentsRow>
        <FormSubTitle label={'보안 설정 정보'} lineType={'dark'} />
        <ContentsRow>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-mark" className={formStyles.form_label}>
              <span className={formStyles.form_text}>{'워터 마크 사용'}</span>
              <span className={formStyles.info_area}>
                <Switch
                  id="switch03"
                  className={formStyles.btn_switch}
                  label={checked[3] ? '사용' : '미사용'}
                  checked={checked[3]}
                  onCheckedChange={handleCheckedChange(3)}
                />
              </span>
            </label>
            <div className={formStyles.input_box}>
              <p className={formStyles.sub_text}>
                {
                  '워터마크는 학습창(동영상과 e-book)에서만 노출되며, 과정 등록 시 설정 옵션이 우선 적용됩니다. '
                }
              </p>
            </div>
          </div>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-markText" className={formStyles.form_label}>
              <span className={formStyles.form_text}>{'워터마크 문구 '}</span>
              {/* 필수 케이스 */}
              <span className={cn(formStyles.status, formStyles.required)}>
                <IcoFormRequired width={12} height={12} />
              </span>
            </label>
            <div className={formStyles.input_box}>
              <Input type={'text'} placeholder={'입력'} value={'테스트'} maxLength={10} />
            </div>
            <p className={cn(formStyles.guide_text)}>
              {'입력한 문구와 성명, 사번이 학습창에 노출됩니다. '}
            </p>
          </div>
        </ContentsRow>
        <ContentsRow>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-openPosition" className={formStyles.form_label}>
              <span className={formStyles.form_text}>{'워터마크 노출 위치 '}</span>
            </label>
            <div className={formStyles.input_box}>
              <div className={dynamicFormStyles.radio_wrap}>
                <RadioGroupFormField
                  options={[
                    { value: 'a', label: '하단 우측' },
                    { value: 'b', label: '하단 중앙' },
                    { value: 'c', label: '하단 좌측' },
                    { value: 'd', label: '중단 우측' },
                    { value: 'e', label: '중단 중앙' },
                    { value: 'f', label: '중단 좌측' },
                    { value: 'g', label: '상단 우측' },
                    { value: 'h', label: '상단 중앙' },
                    { value: 'i', label: '상단 좌측' },
                  ]}
                />
              </div>
            </div>
            <p className={cn(formStyles.guide_text)}>
              {'워터마크 노출 위치를 지정할 수 있습니다.'}
            </p>
          </div>
        </ContentsRow>
        <ContentsRow>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-playerControl" className={formStyles.form_label}>
              <span className={formStyles.form_text}>{'플레이어 재생바 제어 제한'}</span>
            </label>
            <div className={formStyles.input_box}>
              <div className={dynamicFormStyles.radio_wrap}>
                <RadioGroupFormField
                  options={[
                    { value: 'a', label: '회사 설정 기준' },
                    { value: 'b', label: '과정 설정 기준' },
                    { value: 'c', label: '미사용' },
                  ]}
                />
              </div>
            </div>
            <p className={cn(formStyles.guide_text)}>
              {
                '사용 설정 시 학습창 내 플레이어의 재생바를 이동할 수 없으며, 배속 기능도 사용할 수 없습니다.'
              }
            </p>
          </div>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-eLearning" className={formStyles.form_label}>
              <span className={formStyles.form_text}>{'이러닝 집중 모드'}</span>
            </label>
            <div className={formStyles.input_box}>
              <div className={dynamicFormStyles.radio_wrap}>
                <RadioGroupFormField
                  options={[
                    { value: 'a', label: '회사 설정 기준' },
                    { value: 'b', label: '과정 설정 기준' },
                    { value: 'c', label: '미사용' },
                  ]}
                />
              </div>
            </div>
            <p className={cn(formStyles.guide_text)}>
              {
                '사용 설정 시 학습창 내 플레이어의 재생바를 이동할 수 없으며, 배속 기능도 사용할 수 없습니다.'
              }
            </p>
          </div>
        </ContentsRow>
        <ContentsRow>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-capture" className={formStyles.form_label}>
              <span className={formStyles.form_text}>{'학습창 캡쳐 방지'}</span>
            </label>
            <div className={formStyles.input_box}>
              <div className={dynamicFormStyles.radio_wrap}>
                <RadioGroupFormField
                  options={[
                    { value: 'a', label: '회사 설정 기준' },
                    { value: 'b', label: '과정 설정 기준' },
                    { value: 'c', label: '미사용' },
                  ]}
                />
              </div>
            </div>
            <p className={cn(formStyles.guide_text)}>
              {'사용 설정 시 학습창 화면을 캡쳐할 수 없습니다.'}
            </p>
          </div>
        </ContentsRow>
        <FormSubTitle label={'회사 사용 설정'} lineType={'dark'} />
        <ContentsRow type={'horizontal'}>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-useable" className={formStyles.form_label}>
              <span className={formStyles.form_text}>{'사용 여부'}</span>
            </label>
            <div className={formStyles.input_box}>
              <Switch
                id="switch04"
                className={formStyles.btn_switch}
                label={checked[4] ? '사용' : '미사용'}
                checked={checked[4]}
                onCheckedChange={handleCheckedChange(4)}
              />
            </div>
            <p className={cn(formStyles.guide_text)}>
              {'OFF인  경우 해당 회사 사용자는 테넌트에 로그인 할 수 없습니다. '}
            </p>
          </div>
          {/* form_item */}
          <div className={formStyles.form_item}></div>
          {/* form_item */}
          <div className={formStyles.form_item}></div>
        </ContentsRow>
        <FormSubTitle label={'담당자 정보'} lineType={'dark'} />
        <ContentsRow>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-charge" className={formStyles.form_label}>
              <span className={formStyles.form_text}>{'담당부서'}</span>
            </label>
            <div className={formStyles.input_box}>
              <Input id={'name-charge'} type={'text'} placeholder={'입력'} value={''} />
            </div>
          </div>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-charge2" className={formStyles.form_label}>
              <span className={formStyles.form_text}>{'직위/직책'}</span>
            </label>
            <div className={formStyles.input_box}>
              <Input id={'name-charge2'} type={'text'} placeholder={'입력'} value={''} />
            </div>
          </div>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-charge3" className={formStyles.form_label}>
              <span className={formStyles.form_text}>{'성명'}</span>
            </label>
            <div className={formStyles.input_box}>
              <Input id={'name-charge3'} type={'text'} placeholder={'입력'} value={''} />
            </div>
          </div>
        </ContentsRow>
        <ContentsRow>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-charge4" className={formStyles.form_label}>
              <span className={formStyles.form_text}>{'이메일'}</span>
            </label>
            <div className={formStyles.input_box}>
              <Input id={'name-charge'} type={'text'} placeholder={'입력'} value={''} />
            </div>
          </div>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-charge5" className={formStyles.form_label}>
              <span className={formStyles.form_text}>{'전화번호(사무실)'}</span>
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
            <label htmlFor="name-charge6" className={formStyles.form_label}>
              <span className={formStyles.form_text}>{'휴대폰 번호'}</span>
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
      </div>
    </PageContainer>
  );
}
