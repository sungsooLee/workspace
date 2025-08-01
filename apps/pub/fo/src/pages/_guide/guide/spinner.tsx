import { createFileRoute } from '@tanstack/react-router';
import { Spinner } from '@learnway/ui/spinner';

export const Route = createFileRoute('/_guide/guide/spinner')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h2 className="guide_tit2">Spinner Component Guide</h2>
      <p className="loc react">/libs/ui/src/lib/spinner/spinner.tsx</p>
      <p className="info">로딩 애니메이션</p>
      <div className="code_example">
        <pre className="code_block">
          <code>
            {`// 초기 import
  import { Spinner } from '@learnway/ui/spinner';`}
          </code>
        </pre>
      </div>

      <div className="group">
        <h3 className="guide_tit3">Spinner (기본-blue)</h3>
        <div className="flex_box">
          <div className="desc">
            <Spinner isLoading={true} showBackdrop iconType={'blue'} />
          </div>
        </div>

        <div className="code_example">
          <pre className="code_block">
            <code>{`<Spinner isLoading={true} showBackdrop iconType={'blue'} />`}</code>
          </pre>
        </div>
      </div>

      <div className="group">
        <h3 className="guide_tit3">Spinner (기본-mint)</h3>
        <div className="flex_box">
          <div className="desc">
            <Spinner isLoading={true} showBackdrop iconType={'mint'} />
          </div>
        </div>

        <div className="code_example">
          <pre className="code_block">
            <code>{`<Spinner isLoading={true} showBackdrop iconType={'mint'} />`}</code>
          </pre>
        </div>
      </div>

      <div className="group">
        <h3 className="guide_tit3">Spinner (Dot 타입)</h3>
        <div className="flex_box">
          <div className="desc">
            <Spinner isLoading={true} showBackdrop={true} iconType={'dots'} />
          </div>
        </div>

        <div className="code_example">
          <pre className="code_block">
            <code>{`<Spinner isLoading={true} showBackdrop={true} iconType={'dots'} />`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
