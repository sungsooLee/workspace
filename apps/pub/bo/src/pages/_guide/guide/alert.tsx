import { createFileRoute } from '@tanstack/react-router';
import { Button, useModalControl } from '@learnway/ui';

export const Route = createFileRoute('/_guide/guide/alert')({
  component: RouteComponent,
});

function RouteComponent() {
  const { alert: openAlert } = useModalControl();
  const handleClickAlert = () => {
    openAlert({
      title: (
        <>
          컨펌 타이틀 입니다. <br /> 줄바꿈 적용
        </>
      ),
      description: (
        <>
          이것은 description 입니다. <br /> 줄바꿈 적용 <br /> 줄바꿈 적용
          <br /> 줄바꿈 적용
          <br /> 줄바꿈 적용
          <br /> 줄바꿈 적용
          <br /> 줄바꿈 적용
        </>
      ),
      isConfirm: true,
    });
  };
  const handleClickAlert2 = () => {
    openAlert({
      title: (
        <>
          컨펌 (아이콘 케이스) <br /> 줄바꿈 적용
        </>
      ),
      description: (
        <>
          이것은 description 입니다. <br /> 줄바꿈 적용 <br /> 줄바꿈 적용
        </>
      ),
      isConfirm: true,
      iconVisible: true,
    });
  };
  const handleClickAlert3 = () => {
    openAlert({
      title: (
        <>
          알럿 타이틀 입니다. <br /> 줄바꿈 적용
        </>
      ),
      description: (
        <>
          이것은 description 입니다. <br /> 줄바꿈 적용 <br /> 줄바꿈 적용
        </>
      ),
    });
  };
  const handleClickAlert4 = () => {
    openAlert({
      title: (
        <>
          알럿 (아이콘 케이스 : error) <br /> 줄바꿈 적용
        </>
      ),
      description: (
        <>
          이것은 description 입니다. <br /> 줄바꿈 적용 <br /> 줄바꿈 적용
        </>
      ),
      iconVisible: true,
      alertType: 'error',
    });
  };
  const handleClickAlert5 = () => {
    openAlert({
      title: (
        <>
          알럿 (아이콘 케이스 : caution) <br /> 줄바꿈 적용
        </>
      ),
      description: (
        <>
          이것은 description 입니다. <br /> 줄바꿈 적용 <br /> 줄바꿈 적용
        </>
      ),
      iconVisible: true,
      alertType: 'caution',
    });
  };
  const handleClickAlert6 = () => {
    openAlert({
      title: (
        <>
          알럿 (아이콘 케이스 : complete) <br /> 줄바꿈 적용
        </>
      ),
      description: (
        <>
          이것은 description 입니다. <br /> 줄바꿈 적용 <br /> 줄바꿈 적용
        </>
      ),
      iconVisible: true,
      alertType: 'complete',
    });
  };
  return (
    <div className="content">
      <h2 className="guide_tit2">Confirm, Alert Component Guide</h2>
      <p className="loc react">Confirm, Alert(아이콘 케이스에 따라 사용)</p>
      <h3 className="guide_tit3">Confirm</h3>
      <Button variant="text" onClick={() => handleClickAlert()}>
        Confirm창 열기
      </Button>
      <br />
      <br />
      <Button variant="text" onClick={() => handleClickAlert2()}>
        Confirm창 열기(아이콘 case)
      </Button>
      <h3 className="guide_tit3">Alert</h3>
      <Button variant="text" onClick={() => handleClickAlert3()}>
        Alert창 열기(아이콘 X)
      </Button>
      <br />
      <br />
      <Button variant="text" onClick={() => handleClickAlert4()}>
        Alert창 열기(아이콘 error)
      </Button>
      <br />
      <br />
      <Button variant="text" onClick={() => handleClickAlert5()}>
        Alert창 열기(아이콘 caution)
      </Button>
      <br />
      <br />
      <Button variant="text" onClick={() => handleClickAlert6()}>
        Alert창 열기(아이콘 complete)
      </Button>
    </div>
  );
}
