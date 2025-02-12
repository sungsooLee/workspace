import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@learnway/ui';
import { IcoSearch, IcoPlus, IcoDownload, IcoClose } from '@learnway/icons';

export const Route = createFileRoute('/_guide/guide/buttons')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="content">
      <div>
        <h2 className="guide_tit2">Button Component Guide</h2>
        <p className="loc react">/libs/ui/src/lib/button/button.tsx</p>
        <p className="info">size(높이 기준) : xs(28), sm(32), md(36), lg(40)</p>
        <div className="code_example">
          <pre className="code_block">
            <code>
              {`// 초기 import
import { Button } from '@learnway/ui';

// 적용방법(예시)
<Button variant="primary" size="xs">버튼</Button>`}
            </code>
          </pre>
        </div>

        <h3 className="guide_tit3">Primary Button</h3>
        <div className="flex_box">
          <div className="desc">
            <Button variant="primary" size="xs">
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
        </div>

        <div className="code_example">
          <pre className="code_block">
            <code>
              {`<Button variant="primary" size="xs">버튼</Button>
<Button variant="primary" size="sm">버튼</Button>
<Button variant="primary" size="md">버튼</Button>
<Button variant="primary" size="lg">버튼</Button>`}
            </code>
          </pre>
        </div>
      </div>
      <div>
        <h3 className="guide_tit3">line Button</h3>
        <div className="flex_box">
          <div className="desc">
            <Button variant="line" size="sm" disabled>
              버튼
            </Button>
            <Button variant="line" size="lg">
              버튼
            </Button>
          </div>
        </div>

        <div className="code_example">
          <pre className="code_block">
            <code>
              {`<Button variant="line" size="sm" disabled>버튼</Button>
<Button variant="line" size="lg">버튼</Button>`}
            </code>
          </pre>
        </div>
      </div>
      <div>
        <h3 className="guide_tit3">gray Button</h3>
        <div className="flex_box">
          <div className="desc">
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
        </div>
        <div className="code_example">
          <pre className="code_block">
            <code>
              {`<Button variant="gray" size="sm" disabled>버튼</Button>
<Button variant="gray" size="md">버튼</Button>
<Button variant="gray" size="lg">버튼</Button>`}
            </code>
          </pre>
        </div>
      </div>
      <div>
        <h3 className="guide_tit3">gray2 Button</h3>
        <div className="flex_box">
          <div className="desc">
            <Button variant="gray2" size="sm" disabled>
              버튼
            </Button>
            <Button variant="gray2" size="xs">
              버튼
            </Button>
            <Button variant="gray2" size="xs" iconAlign="left" disabled>
              <IcoDownload width={16} height={16} />
              엑셀다운로드
            </Button>
          </div>
        </div>
        <div className="code_example">
          <pre className="code_block">
            <code>
              {`<Button variant="gray2" size="sm" disabled>버튼</Button>
<Button variant="gray2" size="xs">버튼</Button>
<Button variant="gray2" size="xs" iconAlign="left" disabled>
  <IcoDownload width={16} height={16} /> 엑셀다운로드
</Button>`}
            </code>
          </pre>
        </div>
      </div>
      <div>
        <h3 className="guide_tit3">search Button</h3>
        <div className="flex_box">
          <div className="desc">
            <Button variant="search" size="sm" iconAlign="left">
              <IcoSearch width={16} height={16} stroke="#131C30" /> 검색
            </Button>
            <Button variant="search" size="sm">
              버튼
            </Button>
          </div>
        </div>
        <div className="code_example">
          <pre className="code_block">
            <code>
              {`<Button variant="search" size="sm" iconAlign="left">
    <IcoSearch width={16} height={16} stroke="#131C30" />검색
</Button>

<Button variant="search" size="sm">버튼</Button>`}
            </code>
          </pre>
        </div>
      </div>
      <div>
        <h3 className="guide_tit3">expand Button</h3>
        <div className="flex_box">
          <div className="desc">
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
        </div>

        <div className="code_example">
          <pre className="code_block">
            <code>
              {`<Button variant="expand" size="sm" onlyIcon disabled>
    <IcoPlus width={16} height={16} stroke="#131C30" />
</Button>

<Button variant="expand" size="sm" onlyIcon>
    <IcoPlus width={16} height={16} stroke="#131C30" /> 확장
</Button>

<Button variant="expand" size="xs" onlyIcon>
    <IcoPlus width={16} height={16} stroke="#131C30" />
</Button>`}
            </code>
          </pre>
        </div>
      </div>
      <div>
        <h3 className="guide_tit3">expand2 Button</h3>
        <div className="flex_box">
          <div className="desc">
            <Button variant="expand2" size="sm" iconAlign="left">
              <IcoPlus width={16} height={16} stroke="#131C30" /> 확장
            </Button>
          </div>
        </div>
        <div className="code_example">
          <pre className="code_block">
            <code>
              {`<Button variant="expand2" size="sm" iconAlign="left">
    <IcoPlus width={16} height={16} stroke="#131C30" /> 확장
</Button>`}
            </code>
          </pre>
        </div>
      </div>
      <div>
        <h3 className="guide_tit3">save Button</h3>
        <div className="flex_box">
          <div className="desc">
            <Button variant="save" size="sm">
              저장
            </Button>
            <Button variant="save" size="sm" disabled>
              저장
            </Button>
          </div>
        </div>
        <div className="code_example">
          <pre className="code_block">
            <code>
              {`<Button variant="save" size="sm">저장</Button>
<Button variant="save" size="sm" disabled>저장</Button>`}
            </code>
          </pre>
        </div>
      </div>
      <div>
        <h3 className="guide_tit3">point Button</h3>
        <div className="flex_box">
          <div className="desc">
            <Button variant="point" size="sm">
              포인트
            </Button>
            <Button variant="point" size="sm" disabled>
              포인트
            </Button>
          </div>
        </div>
        <div className="code_example">
          <pre className="code_block">
            <code>
              {`<Button variant="point" size="sm">포인트</Button>
<Button variant="point" size="sm" disabled>포인트</Button>`}
            </code>
          </pre>
        </div>
      </div>
      <div>
        <h3 className="guide_tit3">text Button</h3>
        <div className="flex_box">
          <div className="desc">
            <Button variant="text" size="sm">
              선택
            </Button>
            <Button variant="text" size="sm" iconAlign="left">
              <IcoDownload width={16} height={16} stroke="#3e4550" /> 선택
            </Button>
            <Button variant="text" size="sm" disabled>
              선택
            </Button>
          </div>
        </div>
        <div className="code_example">
          <pre className="code_block">
            <code>
              {`<Button variant="text" size="sm">선택</Button>

<Button variant="text" size="sm" iconAlign="left">
    <IcoDownload width={16} height={16} stroke="#3e4550" /> 선택
</Button>

<Button variant="text" size="sm" disabled>선택</Button>`}
            </code>
          </pre>
        </div>
      </div>
      <div>
        <h3 className="guide_tit3">chips Button</h3>
        <div className="flex_box">
          <div className="desc">
            <Button variant="chips" size="sm">
              선택
            </Button>
            <Button variant="chips" size="sm" iconAlign="right">
              선택
              <IcoClose width={12} height={12} stroke="#131C30" />
            </Button>
          </div>
        </div>

        <div className="code_example">
          <pre className="code_block">
            <code>
              {`<Button variant="chips" size="sm">선택</Button>
              
<Button variant="chips" size="sm" iconAlign="right">
    선택 <IcoClose width={12} height={12} stroke="#131C30" />
</Button>`}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}
