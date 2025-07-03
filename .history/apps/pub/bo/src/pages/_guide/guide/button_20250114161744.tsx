import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { buttonComponent } from './components/button';

export const Route = createFileRoute('/_guide/guide/button')({
  component: RouteComponent,
});

function RouteComponent() {
  const examples = [
    {
      title: 'Default Button',
      button: <>준비중</>,
      code: `
  준비중
        `,
    },
  ];

  return (
    <div>
      <h2 className="guide_tit2">Button Component Guide</h2>
      <p className="loc react">
        퍼블 컴포넌트 위치 : /src/components/Button.jsx (퍼블 미리보기 작업용)
      </p>
      <p className="loc react">
        개발 컴포넌트 위치 : libs/ui/shadcn/button.tsx (실제 적용시에 사용해야함)
      </p>
      <pre className="code_block">
        <code className="code_noti">
          import &#123; Button &#125; from '@learnway/ui'; // 버튼 컴포넌트
          <br />
          import styles from "./button.module.css"; // 버튼 스타일
        </code>
      </pre>

      <div className="">
        {examples.map((example, index) => (
          <div key={index}>
            <h3 className="guide_tit3">{example.title}</h3>
            {example.button}
            <div className="code_example">
              <pre className="code_block">
                <code>{example.code.trim()}</code>
              </pre>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
