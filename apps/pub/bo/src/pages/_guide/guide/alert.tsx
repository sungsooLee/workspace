import { createFileRoute } from '@tanstack/react-router';
import { Button, useModal } from '@learnway/ui';

export const Route = createFileRoute('/_guide/guide/alert')({
  component: RouteComponent,
});

function RouteComponent() {
  const { alert: openAlert, confirm: openConfirm } = useModal();
  const handleClickAlert = () => {
    openConfirm({
      title: (
        <>
          컨펌 타이틀 입니다. <br /> 줄바꿈 적용
        </>
      ),
      content: (
        <>
          이것은 description 입니다. <br /> 줄바꿈 적용 <br /> 줄바꿈 적용방법
        </>
      ),
      okButtonLabel: '확인 버튼명',
      cancelButtonLabel: '취소 버튼명',
    });
  };
  const handleClickAlert2 = () => {
    openConfirm({
      title: (
        <>
          컨펌 (아이콘 케이스) <br /> 줄바꿈 적용
        </>
      ),
      content: (
        <>
          이것은 description 입니다. <br /> 줄바꿈 적용 <br /> 줄바꿈 적용
        </>
      ),
      type: 'caution',
    });
  };
  const handleClickAlert3 = () => {
    openAlert({
      title: (
        <>
          알럿 타이틀 입니다. <br /> 줄바꿈 적용
        </>
      ),
      content: (
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
      content: (
        <>
          이것은 description 입니다. <br /> 줄바꿈 적용 <br /> 줄바꿈 적용
        </>
      ),
      type: 'error',
    });
  };
  const handleClickAlert5 = () => {
    openAlert({
      title: (
        <>
          알럿 (아이콘 케이스 : warning) <br /> 줄바꿈 적용
        </>
      ),
      content: (
        <>
          이것은 description 입니다. <br /> 줄바꿈 적용 <br /> 줄바꿈 적용
        </>
      ),
      type: 'warning',
    });
  };
  const handleClickAlert6 = () => {
    openAlert({
      title: (
        <>
          알럿 (아이콘 케이스 : complete) <br /> 줄바꿈 적용
        </>
      ),
      content: (
        <>
          이것은 description 입니다. <br /> 줄바꿈 적용 <br /> 줄바꿈 적용
        </>
      ),
      type: 'complete',
    });
  };
  return (
    <div className="content">
      <h2 className="guide_tit2">Confirm, Alert Component Guide</h2>
      <p className="loc react">/libs/ui/src/lib/alert/alert.tsx</p>
      <div className="code_example">
        <pre className="code_block">
          <code>
            {`// 초기 import
import { Button, useModal } from '@learnway/ui';

// 실행 함수 (한번만 선언)
const { alert: openAlert } = useModal();

// 적용방법(예시)
<Button variant="text" onClick={() => handleClickAlert()}>Confirm창 열기</Button>`}
          </code>
        </pre>
      </div>
      <div className="group">
        <h3 className="guide_tit3">Confirm</h3>
        <div className="flex_box">
          <div className="desc">
            <Button variant="text" onClick={() => handleClickAlert()}>
              Confirm창 열기
            </Button>
          </div>
        </div>

        <div className="code_example">
          <pre className="code_block">
            <code>
              {`// 실행 함수
  const { alert: openAlert } = useModal();

// 예시 함수
const handleClickAlert = () => {
    openAlert({
      title: (
        <>
          컨펌 타이틀 입니다. <br /> 줄바꿈 적용
        </>
      ),
      content: (
        <>
          이것은 description 입니다. <br /> 줄바꿈 적용 <br /> 줄바꿈 적용
          <br /> 줄바꿈 적용
          <br /> 줄바꿈 적용
          <br /> 줄바꿈 적용
          <br /> 줄바꿈 적용
        </>
      ),
      okButtonLabel: '확인 버튼명',
      cancelButtonLabel: '취소 버튼명',
    });
  };

    
  // 사용 코드
  <Button variant="text" onClick={() => handleClickAlert()}>Confirm창 열기</Button>`}
            </code>
          </pre>
        </div>

        <div className="flex_box">
          <div className="desc">
            <Button variant="text" onClick={() => handleClickAlert2()}>
              Confirm창 열기(아이콘 case)
            </Button>
          </div>
        </div>

        <div className="code_example">
          <pre className="code_block">
            <code>
              {`// 실행 함수
const { alert: openAlert } = useModal();

// 예시 함수
 const handleClickAlert2 = () => {
  openAlert({
    title: (
      <>
        컨펌 (아이콘 케이스) <br /> 줄바꿈 적용
      </>
    ),
    content: (
      <>
        이것은 description 입니다. <br /> 줄바꿈 적용 <br /> 줄바꿈 적용
      </>
    ),
    type: 'caution',
  });
};

    
// 사용 코드
<Button variant="text" onClick={() => handleClickAlert2()}>Confirm창 열기(아이콘 case)</Button>`}
            </code>
          </pre>
        </div>

        <h3 className="guide_tit3">Alert</h3>
        <div className="flex_box">
          <div className="desc">
            <Button variant="text" onClick={() => handleClickAlert3()}>
              Alert창 열기(아이콘 X)
            </Button>
          </div>
        </div>

        <div className="code_example">
          <pre className="code_block">
            <code>
              {`// 실행 함수
  const { alert: openAlert } = useModal();

// 예시 함수
 const handleClickAlert3 = () => {
    openAlert({
      title: (
        <>
          알럿 타이틀 입니다. <br /> 줄바꿈 적용
        </>
      ),
      content: (
        <>
          이것은 description 입니다. <br /> 줄바꿈 적용 <br /> 줄바꿈 적용
        </>
      ),
    });
  };

    
  // 사용 코드
  <Button variant="text" onClick={() => handleClickAlert3()}>Alert창 열기(아이콘 X)</Button>`}
            </code>
          </pre>
        </div>

        <div className="flex_box">
          <div className="desc">
            <Button variant="text" onClick={() => handleClickAlert4()}>
              Alert창 열기(아이콘 error)
            </Button>
          </div>
        </div>

        <div className="code_example">
          <pre className="code_block">
            <code>
              {`// 실행 함수
  const { alert: openAlert } = useModal();

// 예시 함수
const handleClickAlert4 = () => {
  openAlert({
    title: (
      <>
        알럿 (아이콘 케이스 : error) <br /> 줄바꿈 적용
      </>
    ),
    content: (
      <>
        이것은 description 입니다. <br /> 줄바꿈 적용 <br /> 줄바꿈 적용
      </>
    ),
    type: 'error',
  });
};

    
  // 사용 코드
  <Button variant="text" onClick={() => handleClickAlert4()}>Alert창 열기(아이콘 error)</Button>`}
            </code>
          </pre>
        </div>

        <div className="flex_box">
          <div className="desc">
            <Button variant="text" onClick={() => handleClickAlert5()}>
              Alert창 열기(아이콘 warning)
            </Button>
          </div>
        </div>

        <div className="code_example">
          <pre className="code_block">
            <code>
              {`// 실행 함수
  const { alert: openAlert } = useModal();

// 예시 함수
const handleClickAlert5 = () => {
  openAlert({
    title: (
      <>
        알럿 (아이콘 케이스 : warning) <br /> 줄바꿈 적용
      </>
    ),
    content: (
      <>
        이것은 description 입니다. <br /> 줄바꿈 적용 <br /> 줄바꿈 적용
      </>
    ),
    type: 'warning',
  });
};

    
  // 사용 코드
  <Button variant="text" onClick={() => handleClickAlert5()}>Alert창 열기(아이콘 warning)</Button>`}
            </code>
          </pre>
        </div>

        <div className="flex_box">
          <div className="desc">
            <Button variant="text" onClick={() => handleClickAlert6()}>
              Alert창 열기(아이콘 complete)
            </Button>
          </div>
        </div>

        <div className="code_example">
          <pre className="code_block">
            <code>
              {`// 실행 함수
  const { alert: openAlert } = useModal();

// 예시 함수
const handleClickAlert6 = () => {
    openAlert({
      title: (
        <>
          알럿 (아이콘 케이스 : complete) <br /> 줄바꿈 적용
        </>
      ),
      content: (
        <>
          이것은 description 입니다. <br /> 줄바꿈 적용 <br /> 줄바꿈 적용
        </>
      ),
      type: 'complete',
    });
  };

    
  // 사용 코드
 <Button variant="text" onClick={() => handleClickAlert6()}>Alert창 열기(아이콘 complete)</Button>`}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}
