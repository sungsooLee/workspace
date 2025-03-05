import { memo } from 'react';
import modalStyles from './mpass-modal.module.css';
import imgGuide1 from '../../assets/images/modal/img_mpass_guide1.png';
import imgGuide2 from '../../assets/images/modal/img_mpass_guide2.png';

const MpassModalCompoment = () => {
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

export const MpassModal = memo(MpassModalCompoment);
