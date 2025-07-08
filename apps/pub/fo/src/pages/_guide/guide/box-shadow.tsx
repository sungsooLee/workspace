import { createFileRoute } from '@tanstack/react-router';
import snsGoogleImage from '@learnway/styles/fo/assets/images/common/logo_sns_google.png';

export const Route = createFileRoute('/_guide/guide/box-shadow')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <style>
        {`
          .example-box {
            display:flex;justify-content: center; align-items: center;width:200px;height:200px;border-radius:16px;padding:10px;font-size:13px;color:#222;
          }
        `}
      </style>
      <h2 className="guide_tit2">Box Shadow Guide</h2>
      <p className="loc react">@learnway/styles/fo/assets/images</p>
      <p className="info">
        Box Shadow는 테일윈드를 활용해서 사용한다 ex) shadow-10
        <br />
        libs/config/src/lib/style/tailwind.preset.js
      </p>
      <div className="code_example">
        <pre className="code_block">
          <code>
            {`.example-box{
  @apply shadow-10;
}`}
          </code>
        </pre>
      </div>
      <div className="group">
        <h3 className="guide_tit3">shadow-10</h3>
        <div className="flex_box">
          <div className="desc col">
            <div className="example-box shadow-10">shadow-10</div>
          </div>
        </div>

        <div className="code_example">
          <pre className="code_block">
            <code>{`'0 1px 3px rgba(0, 0, 0, 0.10)'`}</code>
          </pre>
        </div>

        <h3 className="guide_tit3">shadow-20</h3>
        <div className="flex_box">
          <div className="desc col">
            <div className="example-box shadow-20">shadow-20</div>
          </div>
        </div>

        <div className="code_example">
          <pre className="code_block">
            <code>{'0 2px 6px rgba(0, 0, 0, 0.10)'}</code>
          </pre>
        </div>

        <h3 className="guide_tit3">shadow-30</h3>
        <div className="flex_box">
          <div className="desc col">
            <div className="example-box shadow-30">shadow-30</div>
          </div>
        </div>

        <div className="code_example">
          <pre className="code_block">
            <code>{'0 4px 8px rgba(0, 0, 0, 0.10)'}</code>
          </pre>
        </div>

        <h3 className="guide_tit3">shadow-40</h3>
        <div className="flex_box">
          <div className="desc col">
            <div className="example-box shadow-40">shadow-40</div>
          </div>
        </div>

        <div className="code_example">
          <pre className="code_block">
            <code>{'0 6px 15px rgba(0, 0, 0, 0.10)'}</code>
          </pre>
        </div>

        <h3 className="guide_tit3">shadow-50</h3>
        <div className="flex_box">
          <div className="desc col">
            <div className="example-box shadow-50">shadow-50</div>
          </div>
        </div>

        <div className="code_example">
          <pre className="code_block">
            <code>{'0 10px 25px rgba(0, 0, 0, 0.10)'}</code>
          </pre>
        </div>

        <h3 className="guide_tit3">shadow-60</h3>
        <div className="flex_box">
          <div className="desc col">
            <div className="example-box shadow-50">shadow-60</div>
          </div>
        </div>

        <div className="code_example">
          <pre className="code_block">
            <code>{'0 15px 35px rgba(0, 0, 0, 0.10)'}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
