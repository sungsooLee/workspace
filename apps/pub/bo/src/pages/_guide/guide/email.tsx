import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_guide/guide/email')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h2 className="guide_tit2">E-mail(html)</h2>
      <p className="loc html">파일위치 : /apps/pub/fo/publish/html/</p>
      <div className="info">
        피드백 메일 (FO,BO)
        <br />
        publish/html/에 보관하고 개발자에게는 따로 전달해준다.(메일,메신저 이용)
        <br />
        이미지는 한폴더에 포함해서 전달
      </div>

      <div className="info mt-[10px]">미리보기는 FO 가이드에서 확인</div>
      <div className="group">
        <h3 className="guide_tit3">이메일인증 (회원가입)</h3>
        <div className="flex_box">
          <div className="desc w-full">이메일인증 (회원가입)</div>
        </div>

        <h3 className="guide_tit3">승인완료</h3>
        <div className="flex_box">
          <div className="desc w-full">승인완료</div>
        </div>

        <h3 className="guide_tit3">이용약관 개정 안내</h3>
        <div className="flex_box">
          <div className="desc w-full">이용약관 개정 안내</div>
        </div>
      </div>
    </div>
  );
}
