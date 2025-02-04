import { createFileRoute } from '@tanstack/react-router';
import { Button, useModalControl, useModalContext } from '@learnway/ui';

export const Route = createFileRoute('/_layout/modal')({
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
        <p>11111</p>
        <p>11111</p>
        <p>11111</p>
        <p>11111</p>
        <p>11111</p>
        <p>11111</p>
        <p>11111</p>
        <p>11111</p>
        <p>11111</p>
        <p>11111</p>
        <p>11111</p>
        <p>11111</p>
        <p>11111</p>
        <p>11111</p>
        <p>11111</p>
        <p>11111</p>
        <p>11111</p>
        <p>11111</p>
        <p>11111</p>
        <p>11111</p>
        <p>11111</p>
        <p>11111</p>
        <p>11111</p>
        <p>11111</p>
        <p>11111</p>
        <p>11111</p>
        <p>11111</p>
        <p>11111</p>
        <p>11111</p>
        <p>11111</p>
        <p>11111</p>
        <p>11111</p>
        <p>11111</p>
        <p>11111</p>
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
      <Button
        onClick={() =>
          openModal(<BasicModalContent />, {
            title: '타이틀',
            width: 'xl',
            footer: <CustomFooter />,
          })
        }>
        OPEN
      </Button>
    </div>
  );
}
