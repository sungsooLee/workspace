import { createFileRoute } from '@tanstack/react-router';
import { Spinner } from '@learnway/ui';

export const Route = createFileRoute('/_guide/guide/spinner')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h2 className="guide_tit2">Spinner Component Guide</h2>
      <p className="loc react">/libs/ui/src/lib/spinner/spinner.tsx</p>
      <p className="info">로딩시 호출</p>
      <div className="code_example">
        <pre className="code_block">
          <code>
            {`// 초기 import
  import { Spinner } from '@learnway/ui';`}
          </code>
        </pre>
      </div>

      <div className="group">
        <h3 className="guide_tit3">Spinner 기본</h3>
        <div className="flex_box">
          <div className="desc">
            <Spinner isLoading={true} showBackdrop />
          </div>
        </div>
      </div>
      <div className="code_example">
        <pre className="code_block">
          <code>{`<Spinner isLoading={true} showBackdrop />`}</code>
        </pre>
      </div>
    </div>
  );
}
