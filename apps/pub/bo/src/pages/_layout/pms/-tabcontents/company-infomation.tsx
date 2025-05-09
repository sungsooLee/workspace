import { FC, useState } from 'react';
import { cn } from '@learnway/shared';
import styles from './company-infomation.module.css';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css'; // form
import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';
import {
  Button,
  ContentsRow,
  Textarea,
  CheckboxGroupFormField,
  Switch,
  PhoneNumber,
  Tooltip,
  Input,
  RadioGroupFormField,
} from '@learnway/ui';
import { IcoFormRequired, IcoAlertCircle } from '@learnway/icons';
// eslint-disable-next-line no-empty-pattern
const CompanyInfomationComponent: FC<{}> = ({}) => {
  // switch : 사용기한
  const [checked, setChecked] = useState<{ [key: number]: boolean }>({
    1: false,
    2: false,
    // 3: false,
    // 4: false,
    // 5: false,
  });

  // 상태 변경 함수 (Switch id에 따라 상태를 업데이트)
  const handleCheckedChange = (id: number) => (checked: boolean) => {
    setChecked((prev) => ({ ...prev, [id]: checked }));
  };
  return (
    <div className={cn(styles.start, styles.wrap)}>
      <div className="title_wrap">
        <strong className="title">{'회사 기본 정보'}</strong>
      </div>
      <ContentsRow>
        {/* form_item */}
        <div className={formStyles.form_item}>
          <label htmlFor="name-menu" className={formStyles.form_label}>
            <span className={formStyles.form_text}>{'회사(법인) 유형구분'}</span>
            {/* 필수 케이스 */}
            <span className={cn(formStyles.status, formStyles.required)}>
              <IcoFormRequired width={12} height={12} />
            </span>
            <Tooltip
              className={formStyles.tooltip}
              side="bottom"
              align="start"
              content={'툴팁내용'}
            >
              <Button onlyIcon>
                <IcoAlertCircle width={16} height={16} fill="#A9AFB8" stroke="#ffffff" />
              </Button>
            </Tooltip>
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
        </div>
      </ContentsRow>
      <ContentsRow>
        {/* form_item */}
        <div className={formStyles.form_item}>
          <label htmlFor="name-companyName" className={formStyles.form_label}>
            <span className={formStyles.form_text}>{'회사/법인 명'}</span>
            {/* 필수 케이스 */}
            <span className={cn(formStyles.status, formStyles.required)}>
              <IcoFormRequired width={12} height={12} />
            </span>
          </label>
          <div className={formStyles.input_box}>
            <Input
              id="name-companyName"
              type="text"
              placeholder="회사/법인 명을 입력하세요."
              value=""
              className={formStyles.input}
            />
          </div>
        </div>
        {/* form_item */}
        <div className={formStyles.form_item}>
          <label htmlFor="name-companyNameEng" className={formStyles.form_label}>
            <span className={formStyles.form_text}>{'회사/법인 명(영문)'}</span>
            {/* 필수 케이스 */}
            <span className={cn(formStyles.status, formStyles.required)}>
              <IcoFormRequired width={12} height={12} />
            </span>
          </label>
          <div className={formStyles.input_box}>
            <Input
              id="name-companyNameEng"
              type="text"
              placeholder="회사/법인 명을 입력하세요."
              value=""
              className={formStyles.input}
            />
          </div>
        </div>
        {/* form_item */}
        <div className={formStyles.form_item}>
          <label htmlFor="name-companyNameAbb" className={formStyles.form_label}>
            <span className={formStyles.form_text}>{'법인 약어'}</span>
            {/* 필수 케이스 */}
            <span className={cn(formStyles.status, formStyles.required)}>
              <IcoFormRequired width={12} height={12} />
            </span>
          </label>
          <div className={formStyles.input_box}>
            <Input
              id="name-companyNameAbb"
              type="text"
              placeholder="법인 약어를 입력하세요."
              value=""
              className={formStyles.input}
            />
          </div>
        </div>
      </ContentsRow>
      <ContentsRow>
        {/* form_item */}
        <div className={formStyles.form_item}>
          <label htmlFor="name-ownerRegisterNum" className={formStyles.form_label}>
            <span className={formStyles.form_text}>{'사업자등록번호'}</span>
            {/* 필수 케이스 */}
            <span className={cn(formStyles.status, formStyles.required)}>
              <IcoFormRequired width={12} height={12} />
            </span>
          </label>
          <div className={formStyles.input_box}>
            <Input
              id="name-ownerRegisterNum"
              type="text"
              placeholder="사업자등록번호를 입력하세요."
              value=""
              className={formStyles.input}
            />
          </div>
        </div>
        {/* form_item */}
        <div className={formStyles.form_item}>
          <label htmlFor="name-owner" className={formStyles.form_label}>
            <span className={formStyles.form_text}>{'대표자명'}</span>
          </label>
          <div className={formStyles.input_box}>
            <Input
              id="name-owner"
              type="text"
              placeholder="대표자명을 입력하세요."
              value=""
              className={formStyles.input}
            />
          </div>
        </div>
      </ContentsRow>
      <ContentsRow>
        {/* form_item */}
        <div className={formStyles.form_item}>
          <label htmlFor="name-ownerNum" className={formStyles.form_label}>
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
          <label htmlFor="name-ownerFaxNum" className={formStyles.form_label}>
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
        {/* form_item */}
        <div className={formStyles.form_item}>
          <label htmlFor="name-ownerEmail" className={formStyles.form_label}>
            <span className={formStyles.form_text}>{'대표 이메일'}</span>
          </label>
          <div className={formStyles.input_box}>
            <Input
              id="name-ownerEmail"
              type="text"
              placeholder="대표 이메일를 입력하세요."
              value=""
              className={formStyles.input}
            />
          </div>
        </div>
      </ContentsRow>
      <div className="title_wrap">
        <strong className="title">{'연동 정보 설정'}</strong>
      </div>
      <ContentsRow type="horizontal" className="mb-[16px]">
        {/* form_item */}
        <div className={formStyles.form_item}>
          <label htmlFor="name-hrSystem" className={formStyles.form_label}>
            <span className={formStyles.form_text}>HR 시스템 연동 사용</span>
            {/* 필수 케이스 */}
            <span className={cn(formStyles.status, formStyles.required)}>
              <IcoFormRequired width={12} height={12} />
            </span>
          </label>
          <div className={formStyles.input_box}>
            {/* Switch 텍스트 : '사용' : '미사용' */}
            <Switch
              id="switch01"
              className={formStyles.btn_switch}
              label={checked[1] ? '사용' : '미사용'}
              checked={checked[1]}
              onCheckedChange={handleCheckedChange(1)}
            />
          </div>
        </div>
      </ContentsRow>
      <ContentsRow type="horizontal">
        {/* form_item */}
        <div className={formStyles.form_item}>
          <label htmlFor="name-information" className={formStyles.form_label}>
            <span className={formStyles.form_text}>조직정보 수정 사용</span>
            {/* 필수 케이스 */}
            <span className={cn(formStyles.status, formStyles.required)}>
              <IcoFormRequired width={12} height={12} />
            </span>
          </label>
          <div className={formStyles.input_box}>
            {/* Switch 텍스트 : '사용' : '미사용' */}
            <Switch
              id="switch02"
              className={formStyles.btn_switch}
              label={checked[2] ? '사용' : '미사용'}
              checked={checked[2]}
              onCheckedChange={handleCheckedChange(2)}
            />
          </div>
        </div>
      </ContentsRow>
      <ContentsRow>
        <div className={formStyles.form_item}>
          <label htmlFor="name-secondCertifyType" className={formStyles.form_label}>
            <span className={formStyles.form_text}>2차 인증 유형</span>
            {/* 필수 케이스 */}
            <span className={cn(formStyles.status, formStyles.required)}>
              <IcoFormRequired width={12} height={12} />
            </span>
          </label>
          <div className={formStyles.input_box}>
            <div className={dynamicFormStyles.radio_wrap}>
              <RadioGroupFormField
                options={[
                  { value: 'a', label: 'MPASS(OTP / FIDO)' },
                  { value: 'b', label: 'MPASS(FIDO)' },
                  { value: 'c', label: 'MPASS(OTP)' },
                  { value: 'd', label: '구글 OTP' },
                ]}
              />
            </div>
          </div>
          <p className={formStyles.guide_text}>
            사외과정 신청 시에 수강신청 결재라인을 설정할 수 있습니다.
          </p>
        </div>
      </ContentsRow>
    </div>
  );
};

CompanyInfomationComponent.displayName = 'CompanyInfomation';
export const CompanyInfomation = CompanyInfomationComponent;
