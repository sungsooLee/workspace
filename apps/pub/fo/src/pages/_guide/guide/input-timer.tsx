import { createFileRoute } from '@tanstack/react-router';
import { InputTimer } from '@learnway/ui';

export const Route = createFileRoute('/_guide/guide/input-timer')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h2 className="guide_tit2">InputTimer Component Guide</h2>
      <p className="loc react">/libs/ui/src/lib/input-timer/input-timer.tsx</p>
      <p className="info">input에 시간이 노출되는 경우 사용</p>
      <div className="code_example">
        <pre className="code_block">
          <code>
            {`// 초기 import
        import { InputTimer } from '@learnway/ui';
        
        // 적용방법(예시) 
        <InputTimer
            startTimer={1}
            initialTime={300}
            placeholder={'인증번호 입력'}
            resetLabel={'버튼명'}
          />`}
          </code>
        </pre>
      </div>
      <div className="group">
        <h3 className="guide_tit3">InputTimer</h3>
        <div className="flex_box">
          <div className="desc w-full">
            <InputTimer
              startTimer={1}
              initialTime={300}
              placeholder={'인증번호 입력'}
              resetLabel={'버튼명'}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
