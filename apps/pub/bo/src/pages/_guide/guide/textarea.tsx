import { createFileRoute, Link } from '@tanstack/react-router';
import { Textarea } from '@learnway/ui';
import formStyles from '@learnway/styles/fo/assets/styles/modules/form.module.css';

export const Route = createFileRoute('/_guide/guide/textarea')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h2 className="guide_tit2">Textarea Component Guide</h2>
      <p className="loc react">/libs/ui/src/lib/textarea/textarea.tsx</p>
      <p className="info">
        여러 케이스는 <Link to="/guide/form">Form</Link>에서 확인
      </p>
      <div className="code_example">
        <pre className="code_block">
          <code>
            {`// 초기 import
import { Textarea } from '@learnway/ui';

// 필요에 따라
import formStyles from '@learnway/styles/fo/assets/styles/modules/form.module.css';

// 적용방법(예시) 
 <Textarea
    id=""
    rows={5}
    cols={33}
    resize="none"
    placeholder="글자수 입력시 옵션 추가 maxLength={2500}"
    maxLength={2500}
    className={formStyles.textarea}
    />
</div>`}
          </code>
        </pre>
      </div>

      <div className="group">
        <h3 className="guide_tit3">Textarea (기본)</h3>
        <div className="flex_box">
          <div className="desc w-full">
            <Textarea id="" rows={5} cols={33} resize="none" placeholder="기본" />
          </div>
        </div>

        <h3 className="guide_tit3">Textarea (글자수 체크)</h3>
        <div className="flex_box">
          <div className="desc w-full">
            <Textarea
              id=""
              rows={5}
              cols={33}
              resize="none"
              placeholder="글자수 입력시 옵션 추가 maxLength={2500}"
              maxLength={2500}
              className={formStyles.textarea}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
