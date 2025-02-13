import { createFileRoute } from '@tanstack/react-router';
import { Button, Tooltip } from '@learnway/ui';
import { IcoAlertCircle } from '@learnway/icons';

export const Route = createFileRoute('/_guide/guide/tooltip')({
  component: RouteComponent,
});

function RouteComponent() {
  //   const Content = () => (
  //     <div className="w-80">
  //       <h3 className="bg-green-50">Content Header</h3>
  //       <h4 className="bg-gray-3 h-20">Content Body</h4>
  //     </div>
  //   );
  return (
    <div>
      <h2 className="guide_tit2">Tootip Component Guide</h2>
      <p className="loc react">/libs/ui/src/lib/tooltip/tooltip.tsx</p>
      <p className="info">
        마우스 오버시 툴팁 노출
        <br />
        Side : 'top' | 'right' | 'bottom' | 'left' - 상황에 맞게 사용
        <br />
        align : 'start' | 'center' | 'end' - 상황에 맞게 사용
      </p>
      <div className="code_example">
        <pre className="code_block">
          <code>
            {`// 초기 import
import { Button, Tooltip } from '@learnway/ui';
import { IcoAlertCircle } from '@learnway/icons'; // 아이콘

// 적용방법(예시)
<Tooltip side="top" align="end" content={'tooltip content'}>
  <Button onlyIcon>
    <IcoAlertCircle width={16} height={17} fill="#A9AFB8" />
  </Button>
</Tooltip>
`}
          </code>
        </pre>
      </div>

      <div className="group">
        <h3 className="guide_tit3">툴립 (아이콘)</h3>
        <div className="flex_box">
          <div className="desc">
            <Tooltip side="top" align="end" content={'tooltip content'}>
              <Button onlyIcon>
                <IcoAlertCircle width={16} height={17} fill="#A9AFB8" />
              </Button>
            </Tooltip>
          </div>
        </div>

        <div className="code_example">
          <pre className="code_block">
            <code>{`<Tooltip side="top" align="end" content={'tooltip content'}>
    <Button onlyIcon>
        <IcoAlertCircle width={16} height={17} fill="#A9AFB8" />
    </Button>
</Tooltip>`}</code>
          </pre>
        </div>

        <h3 className="guide_tit3">툴립 (텍스트)</h3>
        <div className="flex_box">
          <div className="desc">
            <Tooltip side="right" align="start" content={'tooltip content'}>
              <Button variant="text">텍스트</Button>
            </Tooltip>
            {/* <p className="loc react">Side : right , align : center</p>
      <Tooltip side="right" align="center" content={'tooltip content'}>
        <Button onlyIcon>
          <IcoAlertCircle width={16} height={17} fill="#A9AFB8" />
        </Button>
      </Tooltip> */}
          </div>
        </div>

        <div className="code_example">
          <pre className="code_block">
            <code>{`<Tooltip side="right" align="start" content={'tooltip content'}>
    <Button variant="text">텍스트</Button>
</Tooltip>`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
