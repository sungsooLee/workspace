import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_guide/guide/info')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h2 className="guide_tit2">Guide Info</h2>
      <h3 className="guide_tit3">링크, 버튼</h3>
      <div className="desc">
        <p>
          <code>&lt;Link to=&#123;&quot;&quot;&#125;&gt;링크&lt;/Link&gt;</code>
          페이지 전환
        </p>
        <p>
          <code>&lt;Button&gt;버튼컴포넌트 활용&lt;/Button&gt;</code> 폼 제출 버튼, 팝업 열기, 토글
          기능등, 페이지 전환 제외
        </p>
      </div>
    </div>
  );
}
