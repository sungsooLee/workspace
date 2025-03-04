import { createFileRoute, Link } from '@tanstack/react-router';
import { cn } from '@learnway/shared';
import { Button, Input, ContentsRow } from '@learnway/ui';
import signupStyles from './signup.module.css';
import formStyles from '../../assets/styles/modules/form.module.css';
import { IcoCaution, IcoFormRequired } from '@learnway/icons';

export const Route = createFileRoute('/_auth/password-modify')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <form className="form_row">
      <div
        className={`${signupStyles.start} ${signupStyles.auth_wrap} ${signupStyles.password_modify}`}>
        <div className={signupStyles.auth_box}>
          <div className={signupStyles.success_info}>
            <div className={`${signupStyles.noti_box} ${signupStyles.type2}`}>
              마지막 변경일 : <strong>2025-01-01(목) 12:50:52</strong>
            </div>
          </div>
          <div className={cn(signupStyles.auth_form, 'no_line', 'col')}>
            <ContentsRow className="row">
              <div className={formStyles.form_item}>
                <label htmlFor="name" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>현재 비밀번호</span>
                  {/* 필수 케이스 */}
                  <span className={cn(formStyles.status, formStyles.required)}>
                    <IcoFormRequired width={12} height={12} />
                  </span>
                </label>
                <div className={formStyles.input_box}>
                  <Input id="name" type="text" placeholder="비밀번호" value="" />
                </div>
              </div>
            </ContentsRow>

            <ContentsRow className="row">
              <div className={formStyles.form_item}>
                <label htmlFor="name" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>새로운 비밀번호</span>
                  {/* 필수 케이스 */}
                  <span className={cn(formStyles.status, formStyles.required)}>
                    <IcoFormRequired width={12} height={12} />
                  </span>
                </label>
                <div className={formStyles.input_box}>
                  <Input
                    id="name"
                    type="text"
                    placeholder="비밀번호(영문자, 숫자, 특수문자 3가지 조합 8자리 이상)"
                    value=""
                  />
                </div>
              </div>
            </ContentsRow>

            <ContentsRow className="row">
              <div className={formStyles.form_item}>
                <label htmlFor="name" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>새로운 비밀번호 확인</span>
                  {/* 필수 케이스 */}
                  <span className={cn(formStyles.status, formStyles.required)}>
                    <IcoFormRequired width={12} height={12} />
                  </span>
                </label>
                <div className={formStyles.input_box}>
                  <Input id="name" type="text" placeholder="새로운 비밀번호 재입력" value="" />
                </div>
              </div>
            </ContentsRow>
          </div>

          <div className={signupStyles.noti_info_txt}>
            <Link to="" className={signupStyles.btn_txt}>
              1개월 후 변경
            </Link>
          </div>

          <div className={signupStyles.signup_noti}>
            <dl className={signupStyles.check_point}>
              <dt>
                <IcoCaution width={16} height={16} stroke="#6F798B" />
                유의사항
              </dt>
              <dd>
                영문 대/소문자, 숫자, 특수문자 중 3가지 이상을 조합하여 8-20자리로 입력해 주세요.
              </dd>
              <dd>직전에 사용한 비밀번호는 사용하실 수 없습니다.</dd>

              <dd>아이디와 동일한 비밀번호는 사용하실 수 없습니다.</dd>
              <dd>
                생년월일, 전화번호와 동일하거나 일부를 포함한 비밀번호는 사용하실 수 없습니다.
              </dd>
              <dd>
                3글자 이상의 동일한 숫자/문자 또는 연속된 숫자/문자, 키보드 상 연속된 배열의 문자는
                입력하실 수 없습니다.
              </dd>
              <dd>
                법인명의 휴대전화(법인폰)는 통신사에서 본인인증 서비스 신청 후 휴대폰 인증을 하실 수
                있습니다.
                <Link to="" className={signupStyles.link}>
                  구글 OTP 인증 가이드
                </Link>
              </dd>
            </dl>
          </div>

          <div className={signupStyles.btn_wrap}>
            <Button variant="gray" size="xl">
              취소
            </Button>
            <Button variant="primary" size="xl">
              확인
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
