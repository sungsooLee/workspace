import { createFileRoute } from '@tanstack/react-router';
import { cn } from '@learnway/shared';
import { IcoCaution, IcoFaceId01, IcoFormRequired, IcoShieldTick01 } from '@learnway/icons';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';
import signupStyles from './signup.module.css';
import modalStyles from './mpass-modal.module.css';
import { Button, ContentsRow, Input, RadioCard, useModal } from '@learnway/ui';
import imgGuide1 from '../../assets/images/modal/img_mpass_guide1.png';
import imgGuide2 from '../../assets/images/modal/img_mpass_guide2.png';

export const Route = createFileRoute('/_auth/mpass-cert')({
  component: RouteComponent,
});

function RouteComponent() {
  const { open: openModal } = useModal();
  const MpassModalContent = () => {
    return (
      <div className={`${modalStyles.start} ${modalStyles.mpass_modal}`}>
        <div className={modalStyles.title_box}>
          <h3 className={modalStyles.tit}>현재 본인 확인이 진행 중입니다.</h3>
          <p className={modalStyles.txt}>모바일 MPASS 앱에서 인증을 진행해 주세요</p>
        </div>

        <div className={modalStyles.guide_info}>
          <div className={modalStyles.info_box}>
            <div className={modalStyles.time}>
              남은 시간 <strong>30</strong>초
            </div>
            <p className={modalStyles.info}>
              남은 시간 내에 모바일 MPASS 앱에서 본인 확인을 진행해 주세요. <br />
              현재 창을 닫으면 본인 확인이 종료됩니다.
            </p>
          </div>

          <div className={modalStyles.guide_box}>
            <div className={modalStyles.item}>
              <figure className={modalStyles.img}>
                <img src={imgGuide1} alt="" />
              </figure>
              <p className={modalStyles.desc}>
                1. 모바일에서 MPASS 앱을 실행하거나
                <br /> PUSH 메시지를 터치해 주세요.
              </p>
            </div>

            <div className={modalStyles.item}>
              <figure className={modalStyles.img}>
                <img src={imgGuide2} alt="" />
              </figure>
              <p className={modalStyles.desc}>
                2. MPASS 앱에서 FIDO 인증을 완료하면
                <br /> 로그인할 수 있습니다.
              </p>
            </div>
          </div>
        </div>

        <div className={modalStyles.inquiry}>지원 문의 계정인증 개발팀 : +82-2-6296-6409</div>
      </div>
    );
  };
  return (
    <form className="form_row">
      <div className={`${signupStyles.start} ${signupStyles.auth_wrap} ${signupStyles.mpass_cert}`}>
        <div className={signupStyles.auth_box}>
          <div className={signupStyles.search_info}>
            안전한 로그인을 위해 <strong>2차 인증</strong>을 진행해 주세요.
          </div>
          <div className={signupStyles.signup_select} role="radiogroup">
            <RadioCard
              className={signupStyles.radio_card}
              options={[
                {
                  value: 'type1',
                  label: (
                    <div>
                      <IcoShieldTick01 width={48} height={48} className={signupStyles.ico1} />
                      <span>OTP</span>
                    </div>
                  ),
                },
                {
                  value: 'type2',
                  label: (
                    <div>
                      <IcoFaceId01 width={48} height={48} className={signupStyles.ico2} />
                      <span>FIDO</span>
                    </div>
                  ),
                },
              ]}
            />
          </div>

          <div className={signupStyles.select_txt}>
            {/* FIDO 일때 문구 */}
            생체인증(지문/안면인식) 인증 옵션을 선택하셨습니다. <br />
            MPASS 인증 버튼 클릭 후 모바일 앱으로 인증을 진행해 주세요.
          </div>

          {/* OTP 인증폼 */}
          <div className={cn(signupStyles.auth_form, 'no_line', 'col')}>
            <ContentsRow>
              <div className={formStyles.form_item}>
                <label htmlFor="name" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>OTP 번호</span>
                  {/* 필수 케이스 */}
                  <span className={cn(formStyles.status, formStyles.required)}>
                    <IcoFormRequired width={12} height={12} />
                  </span>
                </label>
                <div className={formStyles.input_box}>
                  <Input id="name" type="text" placeholder="OTP 번호 입력" value="" />
                </div>
              </div>
            </ContentsRow>
          </div>

          <div className={signupStyles.signup_noti}>
            <dl className={signupStyles.check_point}>
              <dt>
                <IcoCaution width={16} height={16} stroke="#6F798B" />
                유의사항
              </dt>
              {/* OTP일때 문구 출력 */}
              <dd>OTP를 선택한 경우 MPASS 앱에서 OTP번호를 확인하고 입력해 주세요.</dd>
              {/* FIDO 문구 출력 */}
              <dd>
                FIDO를 선택한 경우 MPASS 앱에서 생체인식(지문/안면) 후 로그인을 진행해 주세요.{' '}
              </dd>
            </dl>
          </div>

          <div className={signupStyles.btn_wrap}>
            <Button variant="gray" size="xl">
              취소
            </Button>

            <Button
              size="xl"
              variant="primary"
              onClick={() =>
                openModal({
                  // title: 'FIDO 인증',
                  width: 'sm',
                  content: <MpassModalContent />,
                })
              }>
              MPASS 인증
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
