import { createFileRoute } from '@tanstack/react-router';
import { Panel } from '@learnway/ui';

export const Route = createFileRoute('/_guide/guide/panel')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h2 className="guide_tit2">Panel Component Guide</h2>
      <p className="loc react">/libs/ui/src/lib/panel/panel.tsx</p>
      <p className="info">
        필요 시에 컨텐츠 내에 wrap 영역에 사용
        <br />
        옵션 : title, actions, className, children, collapsible, collapsed, hideHeaderUnderline =
        false, type,
        <br /> type: 'line' | 'fill' | 'rounded'; (추가 타입이 있을경우 추가해야함)
        <br />
        패널안에 padding은 별도로 구성
      </p>
      <div className="code_example">
        <pre className="code_block">
          <code>
            {`// 초기 import
import { Panel } from '@learnway/ui';

// 적용방법(예시) 
<Panel type="line" hideHeaderUnderline>
  <div className="p-10">content</div> // 내용은 자유
</Panel>`}
          </code>
        </pre>
      </div>

      <div className="group">
        <h3 className="guide_tit3">박스형태 활용 예시</h3>
        <div className="flex_box">
          <div className="desc w-full">
            <Panel
              title="타이틀"
              hideHeaderUnderline
              collapsible
              actions="전체 펼침"
              className="w-full"
              type="rounded"
            >
              <div className="p-10">content</div>
            </Panel>
          </div>
        </div>
        <div className="code_example">
          <pre className="code_block">
            <code>
              {`// 초기 import
import { Panel } from '@learnway/ui';

// 적용방법(예시) 
<Panel
  title="타이틀"
  hideHeaderUnderline
  collapsible
  actions="전체 펼침"
  className="w-full"
  type="rounded"
>
  <p>content</p>
</Panel>`}
            </code>
          </pre>
        </div>
      </div>

      <div className="group">
        <h3 className="guide_tit3">라운드박스 활용 예시</h3>
        <div className="flex_box">
          <div className="desc w-full">
            <Panel hideHeaderUnderline actions="" className="w-full" type="rounded">
              <div className="p-10">content</div>
            </Panel>
          </div>
        </div>
        <div className="code_example">
          <pre className="code_block">
            <code>
              {`// 초기 import
import { Panel } from '@learnway/ui';

// 적용방법(예시) 
<Panel
  hideHeaderUnderline
  actions=""
  className="w-full"
  type="rounded"
>
  <div className="p-10">content</div>
</Panel>`}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}
