import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_guide/guide/info')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h2 className="guide_tit2">Guide Info</h2>
      <h3 className="guide_tit3">소개</h3>
      <div className="group">
        <div className="info">리액트,테일윈드,module.css로 진행한다.</div>

        <div className="code_example">
          <pre className="code_block">
            <code>{``}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
