import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { buttonComponent } from './components/button';

export const Route = createFileRoute('/_guide/guide/button')({
  component: RouteComponent,
});

function RouteComponent() {
  const examples = [
    {
      title: 'Primary Button',
      button: <>준비중</>,
      code: `
  준비중
        `,
    },
  ];

  return (
    <div>
      <h2 className="guide_tit2">Button Component Guide</h2>
      <p className="loc react">컴포넌트 위치 : /src/components/Button.jsx</p>
      <pre className="code_block">
        <code className="code_noti">
          import Button from "../components/Button"; // 버튼 컴포넌트
          <br />
          import styles from "/styles/components/Button.module.scss"; // 버튼 스타일
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
