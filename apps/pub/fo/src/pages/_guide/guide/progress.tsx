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
  
  // 적용방법(예시) % 기준으로 value값 추가, 실패인 경우 isFailed 속성 추가, 90%이상일때, 100%일때 컬러 변경됨
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
            <Progress value={0} label={'대기중'} />
          </div>
          <div className="desc">
            <Progress value={40} label={'진행중'} />
          </div>
          <div className="desc">
            <Progress value={50} label={'실패'} isFailed />
          </div>
          <div className="desc">
            <Progress value={100} label={'완료'} />
          </div>
        </div>
      </div>
    </div>
  );
}
