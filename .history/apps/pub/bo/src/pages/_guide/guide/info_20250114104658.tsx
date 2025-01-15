import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_guide/guide/info')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h2 className="guide-tit2">Guide Info</h2>
      <h3 className="guide-tit3">링크(a), 버튼(button)</h3>
      <div className="desc">
        <p>
          <code>&lt;a&gt;</code> 링크를 만들고 페이지 전환
        </p>
        <p>
          <code>&lt;button&gt;</code> 폼 제출 버튼, 팝업 열기, 토글 기능
        </p>
      </div>
    </div>
  );
}
