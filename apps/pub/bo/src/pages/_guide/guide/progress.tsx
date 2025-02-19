import { createFileRoute } from '@tanstack/react-router';
import { Progress } from '@learnway/ui';

export const Route = createFileRoute('/_guide/guide/progress')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h2 className="guide_tit2">Progress Component Guide</h2>
      <p className="loc react">/libs/ui/src/lib/progress/progress.tsx</p>
      <div className="code_example">
        <pre className="code_block">
          <code>
            {`// 초기 import
  import { Progress } from '@learnway/ui';
  
  // 적용방법(예시)
  <Progress value={40} />`}
          </code>
        </pre>
      </div>
      <div className="group">
        <h3 className="guide_tit3">
          Chips 개별로 사용하는 경우(안에 label이 버튼인 경우 typeBtn props 추가)
        </h3>
        <div className="flex_box">
          <div className="desc">
            <Progress value={150} label={'mb'} max={150} />
          </div>
        </div>
      </div>
    </div>
  );
}
