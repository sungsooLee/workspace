import { createFileRoute } from '@tanstack/react-router';
import { Button, useModalControl, useModalContext } from '@learnway/ui';

export const Route = createFileRoute('/_guide/guide/modal')({
  component: RouteComponent,
});

function RouteComponent() {
  const { open: openModal } = useModalControl();
  const BasicModalContent = () => {
    return (
      <div>
        <p>11111</p>
        <p>11111</p>
        <p>11111</p>
        <p>11111</p>
        <p>11111</p>
        <p>11111</p>
      </div>
    );
  };
  const CustomFooter = () => {
    const { closeModal } = useModalContext();
    return (
      <>
        <Button variant="gray" size="lg" onClick={() => closeModal()}>
          취소
        </Button>
        <Button variant="primary" size="lg" onClick={() => closeModal()}>
          확인
        </Button>
      </>
    );
  };

  return (
    <div className="content">
      <h2 className="guide_tit2">Modal Component Guide(작업중)</h2>
      <p className="loc react">/libs/ui/src/lib/modal/modal.tsx</p>
      <p className="info">
        모달 size(가로 기준) : sm(600px), md(800px), lg(1024px), xl(1400px) width 속성 적용
      </p>

      <div className="code_example">
        <pre className="code_block">
          <code>
            {`// 초기 import
import { Button, useModalControl, useModalContext } from '@learnway/ui';

// 실행 함수
const { open: openModal } = useModalControl();`}
          </code>
        </pre>
      </div>

      <div className="group">
        <h3 className="guide_tit3">Modal</h3>
        <div className="flex_box">
          <div className="desc">
            <Button
              onClick={() =>
                openModal(<BasicModalContent />, {
                  title: '타이틀',
                  width: 'full', // sm(600px), md(800px), lg(1024px), xl(1400px)
                  footer: <CustomFooter />,
                })
              }>
              모달 팝업 열기
            </Button>
          </div>
        </div>

        <div className="code_example">
          <pre className="code_block">
            <code>{`<Button
onClick={() =>
  openModal(<BasicModalContent />, {
    title: '타이틀',
    width: 'sm', // sm(600px), md(800px), lg(1024px), xl(1400px)
    footer: <CustomFooter />,
  })
}>
모달 팝업 열기
</Button>`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
