import { Button, useToast } from '@learnway/ui';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_guide/guide/toast')({
  component: RouteComponent,
});

function RouteComponent() {
  const { open } = useToast();

  const handleClickToast = () => {
    open({
      title: '토스트 메시지입니다.',
      actionLabel: '버튼', // 오른쪽 버튼 있는 경우
      type: 'success',
      duration: 500000,
      // showCloseButton: true,
      onActionClick: () => {
        console.log('버튼 클릭');
      },
    });
  };

  const handleClickToast2 = () => {
    open({
      title: '에러 메시지입니다.',
      // actionLabel: '버튼2',
      type: 'error',
      // duration: 5000,
      // showCloseButton: true,
      onActionClick: () => {
        console.log('버튼 클릭');
      },
    });
  };
  return (
    <div>
      <h2 className="guide_tit2">Toast Component Guide</h2>
      <p className="loc react">/libs/ui/src/lib/toast/toast.tsx</p>
      <p className="info">토스트 알림시 사용</p>
      <div className="code_example">
        <pre className="code_block">
          <code>
            {`// 초기 import
        import { useToast } from '@learnway/ui';
        
        const { open } = useToast();

        const handleClickToast = () => {
            open({
                title: '토스트 메시지입니다.',
                actionLabel: '버튼',
                type: 'success',
                // duration: 5000,
                // showCloseButton: true,
                onActionClick: () => {
                console.log('버튼 클릭');
                },
            });
        };
      `}
          </code>
        </pre>
      </div>

      <div className="group">
        <h3 className="guide_tit3">Toast 기본(success)</h3>
        <div className="flex_box">
          <div className="desc">
            <Button label="토스트 열기" onClick={handleClickToast} />
          </div>
        </div>
        <h3 className="guide_tit3">Toast(error)</h3>
        <div className="flex_box">
          <div className="desc">
            <Button label="토스트 열기" onClick={handleClickToast2} />
          </div>
        </div>
      </div>
    </div>
  );
}
