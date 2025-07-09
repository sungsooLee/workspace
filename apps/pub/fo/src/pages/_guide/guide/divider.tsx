import { createFileRoute } from '@tanstack/react-router';
import { Divider } from '@learnway/ui';

export const Route = createFileRoute('/_guide/guide/divider')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h2 className="guide_tit2">Divider Component Guide</h2>
      <p className="loc react">/libs/ui/src/lib/elements/divider/divider.tsx</p>
      <p className="info">구분선에 주로 사용</p>
      <div className="code_example">
        <pre className="code_block">
          <code>
            {`// 초기 import
  import { Divider } from '@learnway/ui';
    
  // 적용방법(예시) 입니다.
  <Divider />`}
          </code>
        </pre>
      </div>
      <div className="group">
        <h3 className="guide_tit3">기본 사용</h3>
        <div className="flex_box">
          <div className="desc w-full">
            <Divider />
          </div>
        </div>

        <h3 className="guide_tit3">진한 타입</h3>
        <div className="flex_box">
          <div className="desc w-full">
            <Divider bgType={'dark'} />
          </div>
        </div>
      </div>
    </div>
  );
}
