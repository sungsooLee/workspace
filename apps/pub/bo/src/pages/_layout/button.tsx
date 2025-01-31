import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@learnway/ui';
import { IcoSearch, IcoPlus, IcoDownload, IcoClose } from '@learnway/icons';

export const Route = createFileRoute('/_layout/button')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="content">
      <div>
        <Button variant="primary" size="xs" disabled>
          버튼
        </Button>
        <Button variant="primary" size="sm">
          버튼
        </Button>
        <Button variant="primary" size="md">
          버튼
        </Button>
        <Button variant="primary" size="lg">
          버튼
        </Button>
      </div>
      <div>
        <Button variant="line" size="sm" disabled>
          버튼
        </Button>
        <Button variant="line" size="lg">
          버튼
        </Button>
      </div>
      <div>
        <Button variant="gray" size="sm" disabled>
          버튼
        </Button>
        <Button variant="gray" size="md">
          버튼
        </Button>
        <Button variant="gray" size="lg">
          버튼
        </Button>
      </div>
      <div>
        <Button variant="gray2" size="sm" disabled>
          111
        </Button>
        <Button variant="gray2" size="xs">
          111
        </Button>
        <Button variant="gray2" size="xs" iconAlign="left" disabled>
          <IcoDownload width={16} height={16} />
          엑셀다운로드
        </Button>
      </div>
      <div>
        <Button variant="search" size="sm" iconAlign="left">
          <IcoSearch width={16} height={16} stroke="#131C30" /> 검색
        </Button>
        <Button variant="search" size="sm">
          111
        </Button>
      </div>
      <div>
        <Button variant="expand" size="sm" onlyIcon disabled>
          <IcoPlus width={16} height={16} stroke="#131C30" />
        </Button>
        <Button variant="expand" size="sm" onlyIcon>
          <IcoPlus width={16} height={16} stroke="#131C30" /> 확장
        </Button>
        <Button variant="expand" size="xs" onlyIcon>
          <IcoPlus width={16} height={16} stroke="#131C30" />
        </Button>
      </div>
      <div>
        <Button variant="expand2" size="sm" iconAlign="left">
          <IcoPlus width={16} height={16} stroke="#131C30" /> 확장
        </Button>
      </div>
      <div>
        <Button variant="save" size="sm">
          저장
        </Button>
        <Button variant="save" size="sm" disabled>
          저장
        </Button>
      </div>
      <div>
        <Button variant="point" size="sm">
          포인트
        </Button>
        <Button variant="point" size="sm" disabled>
          포인트
        </Button>
      </div>
      <div>
        <Button variant="text" size="sm">
          선택
        </Button>
        <Button variant="text" size="sm" iconAlign="left">
          <IcoDownload width={16} height={16} /> 선택
        </Button>
        <Button variant="text" size="sm" disabled>
          선택
        </Button>
      </div>
      <div>
        <Button variant="chips" size="sm">
          선택
        </Button>
        <Button variant="chips" size="sm" iconAlign="right">
          선택
          <IcoClose width={12} height={12} stroke="#131C30" />
        </Button>
      </div>
    </div>
  );
}
