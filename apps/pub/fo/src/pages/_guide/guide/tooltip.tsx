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
      <h2 className="guide_tit2">Tooltip Component Guide</h2>
      <p className="loc react">/libs/ui/src/lib/tooltip/tooltip.tsx</p>
      <p className="info">
        마우스 오버시 툴팁 노출
        <br />
        Side : 'top' | 'right' | 'bottom' | 'left' - 상황에 맞게 사용
        <br />
        align : 'start' | 'center' | 'end' - 상황에 맞게 사용
        <br />
        bg : 'black' | 'gray' (BO=black / FO=gray)
      </p>
      <div className="code_example">
        <pre className="code_block">
          <code>
            {`// 초기 import
import { Button, Tooltip } from '@learnway/ui';
import { IcoAlertCircle } from '@learnway/icons'; // 아이콘

// 적용방법(예시)
<Tooltip side="top" align="end" content={'tooltip content'} bgType="gray">
  <Button onlyIcon>
    <IcoAlertCircle width={16} height={17} fill="#A9AFB8" />
  </Button>
</Tooltip>
`}
          </code>
        </pre>
      </div>

      <div className="group">
        <h3 className="guide_tit3">툴립 (아이콘) side="top" align="start"</h3>
        <h4 className="guide_tit4">side="top" align="start"</h4>
        <div className="flex_box">
          <div className="desc">
            <Tooltip side="top" align="start" content={'tooltip content'} bgType="gray">
              <Button onlyIcon>
                <IcoAlertCircle width={16} height={17} fill="#A9AFB8" /> (side="top" align="start")
              </Button>
            </Tooltip>
          </div>
        </div>

        <h4 className="guide_tit4">side="top" align="center"</h4>
        <div className="flex_box">
          <div className="desc">
            <Tooltip side="top" align="center" content={'tooltip content'} bgType="gray">
              <Button onlyIcon>
                <IcoAlertCircle width={16} height={17} fill="#A9AFB8" />
              </Button>
            </Tooltip>
          </div>
        </div>

        <h4 className="guide_tit4">side="top" align="end"</h4>
        <div className="flex_box">
          <div className="desc">
            <Tooltip side="top" align="end" content={'tooltip content'} bgType="gray">
              <Button onlyIcon>
                <IcoAlertCircle width={16} height={17} fill="#A9AFB8" />
              </Button>
            </Tooltip>
          </div>
        </div>

        <h4 className="guide_tit4">side="right" align="start"</h4>
        <div className="flex_box">
          <div className="desc">
            <Tooltip side="right" align="start" content={'tooltip content'} bgType="gray">
              <Button onlyIcon>
                <IcoAlertCircle width={16} height={17} fill="#A9AFB8" />
              </Button>
            </Tooltip>
          </div>
        </div>

        <h4 className="guide_tit4">side="right" align="center"</h4>
        <div className="flex_box">
          <div className="desc">
            <Tooltip side="right" align="center" content={'tooltip content'} bgType="gray">
              <Button onlyIcon>
                <IcoAlertCircle width={16} height={17} fill="#A9AFB8" />
              </Button>
            </Tooltip>
          </div>
        </div>

        <h4 className="guide_tit4">side="right" align="end"</h4>
        <div className="flex_box">
          <div className="desc">
            <Tooltip side="right" align="end" content={'tooltip content'} bgType="gray">
              <Button onlyIcon>
                <IcoAlertCircle width={16} height={17} fill="#A9AFB8" />
              </Button>
            </Tooltip>
          </div>
        </div>

        <h4 className="guide_tit4">side="left" align="start"</h4>
        <div className="flex_box">
          <div className="desc">
            <Tooltip side="left" align="start" content={'tooltip content'} bgType="gray">
              <Button onlyIcon>
                <IcoAlertCircle width={16} height={17} fill="#A9AFB8" />
              </Button>
            </Tooltip>
          </div>
        </div>

        <h4 className="guide_tit4">side="left" align="center"</h4>
        <div className="flex_box">
          <div className="desc">
            <Tooltip side="left" align="center" content={'tooltip content'} bgType="gray">
              <Button onlyIcon>
                <IcoAlertCircle width={16} height={17} fill="#A9AFB8" />
              </Button>
            </Tooltip>
          </div>
        </div>

        <h4 className="guide_tit4">side="left" align="end"</h4>
        <div className="flex_box">
          <div className="desc">
            <Tooltip side="right" align="end" content={'tooltip content'} bgType="gray">
              <Button onlyIcon>
                <IcoAlertCircle width={16} height={17} fill="#A9AFB8" />
              </Button>
            </Tooltip>
          </div>
        </div>

        <h4 className="guide_tit4">side="bottom" align="start"</h4>
        <div className="flex_box">
          <div className="desc">
            <Tooltip side="bottom" align="start" content={'tooltip content'} bgType="gray">
              <Button onlyIcon>
                <IcoAlertCircle width={16} height={17} fill="#A9AFB8" />
              </Button>
            </Tooltip>
          </div>
        </div>

        <h4 className="guide_tit4">side="bottom" align="center"</h4>
        <div className="flex_box">
          <div className="desc">
            <Tooltip side="bottom" align="center" content={'tooltip content'} bgType="gray">
              <Button onlyIcon>
                <IcoAlertCircle width={16} height={17} fill="#A9AFB8" />
              </Button>
            </Tooltip>
          </div>
        </div>

        <h4 className="guide_tit4">side="bottom" align="end"</h4>
        <div className="flex_box">
          <div className="desc">
            <Tooltip side="bottom" align="end" content={'tooltip content'} bgType="gray">
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
            <Tooltip side="top" align="start" content={'tooltip content'} bgType="gray">
              <Button variant="text">텍스트</Button>
            </Tooltip>
            {/* <p className="loc react">Side : top , align : start</p>
      <Tooltip side="top" align="start" content={'tooltip content'} bgType="gray">
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
