import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_guide/guide/mobile')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h2 className="guide_tit2">Mobile Guide</h2>
      <h3 className="guide_tit3">모바일 분기처리</h3>

      <div className="code_example">
        <pre className="code_block">
          <code>{`// 분기처리 import
import { isMobile } from 'react-device-detect';

{isMobile ? 'mobile 내용' : 'PC 내용'}`}</code>
        </pre>
      </div>

      <h3 className="guide_tit3">반응형 CSS</h3>

      <div className="code_example">
        <pre className="code_block">
          <code>{`
// 반응형 일때
ex) test.module.css

:global(body.mobile) {
  @screen mobile {
    .start {
      @apply hidden;
    }
  }
}`}</code>
        </pre>
      </div>
      <div className="info">
        0~767px(mobile), 768px이상부터 pc화면으로 노출된다. <br />
        (PC화면은 화면이 작아지면 가로스크롤로 처리)
        <br />
        적응형 형태(디바이스 분기)이면서 CSS로 가능한 페이지는 한파일에서 반응형 CSS를 활용한다.
      </div>
    </div>
  );
}
