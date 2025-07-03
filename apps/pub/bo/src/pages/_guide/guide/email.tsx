import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_guide/guide/email')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h2 className="guide_tit2">E-mail(html)</h2>
      <p className="loc html">파일위치 : /apps/pub/bo/publish/html/email/</p>
      <div className="info">
        피드백 메일 (FO,BO)
        <br />
        publish/html/email/에 보관하고 개발자에게는 따로 전달해준다.(메일,메신저 이용)
        <br />
        이미지는 한폴더에 포함해서 전달
      </div>
      <div className="group">
        <h3 className="guide_tit3">이메일인증 (회원가입)</h3>
        <div className="flex_box">
          <div className="desc w-full">
            <a href="/pb-bo/html/email/이메일인증.html" target="_blank">
              이메일인증 (회원가입)
            </a>
          </div>
        </div>

        <h3 className="guide_tit3">회원가입 신청 승인</h3>
        <div className="flex_box">
          <div className="desc w-full">
            <a href="/pb-bo/html/email/회원가입신청승인.html" target="_blank">
              회원가입 신청 승인
            </a>
          </div>
        </div>

        <h3 className="guide_tit3">회원가입 신청 반려</h3>
        <div className="flex_box">
          <div className="desc w-full">
            <a href="/pb-bo/html/email/회원가입신청반려.html" target="_blank">
              회원가입 신청 반려
            </a>
          </div>
        </div>

        <h3 className="guide_tit3">승인완료</h3>
        <div className="flex_box">
          <div className="desc w-full">
            <a href="/pb-bo/html/email/승인완료.html" target="_blank">
              승인완료
            </a>
          </div>
        </div>

        <h3 className="guide_tit3">이용약관 개정 안내</h3>
        <div className="flex_box">
          <div className="desc w-full">
            <a href="/pb-bo/html/email/이용약관개정안내.html" target="_blank">
              이용약관 개정 안내
            </a>
          </div>
        </div>

        <h3 className="guide_tit3">교재 배송 주소 확인 안내</h3>
        <div className="flex_box">
          <div className="desc w-full">
            <a href="/pb-bo/html/email/교재배송주소확인.html" target="_blank">
              교재 배송 주소 확인 안내
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
