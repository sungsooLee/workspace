import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_guide/guide/info')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h2 className="guide_tit2">Guide Info</h2>
      <h3 className="guide_tit3">소개</h3>
      <div className="info">APP : FO(학습자),BO(관리자),libs(공통)</div>
      <h3 className="guide_tit3">체크사항</h3>
      <ul className="info_ul">
        <li>
          CSS는 tailwind 지정 class명을 사용한다. (없을경우 필요시 테일윈드 설정파일에서 추가
          사용한다)
        </li>
        <li>
          각 화면 페이지는 따로 콤포넌트로 분류하고 같은 위치에 같은 파일명으로 module.css를
          생성한다. ex) test.tsx / test.module.css
        </li>
        <li>모듈 css 사용시 클래스명에 '-' 하이폰 대신 '_'를 사용한다.</li>
      </ul>
      <div className="group"></div>
    </div>
  );
}
