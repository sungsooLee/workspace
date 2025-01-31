import { createFileRoute } from '@tanstack/react-router';
import { Button, useModalControl } from '@learnway/ui';

export const Route = createFileRoute('/_layout/modal')({
  component: RouteComponent,
});

function RouteComponent() {
  const { open } = useModalControl();
  const BasicModalContent = () => {
    return <div>Content</div>;
  };
  const info = () => ({
    title: '모달 제목',
    description: '이것은 모달 설명입니다.',
  });

  return (
    <div className="content">
      <Button onClick={() => open(<BasicModalContent />, info())}>OPEN</Button>
    </div>
  );
}
