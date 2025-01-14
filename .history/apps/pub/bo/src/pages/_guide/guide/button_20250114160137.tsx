import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { buttonComponent } from './components/button';

export const Route = createFileRoute('/_guide/guide/button')({
  component: RouteComponent,
});

function RouteComponent() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1); // 상태 업데이트
  };
  console.log(count);
  // 각 버튼의 코드 예시를 저장
  const examples = [
    {
      title: 'Primary Button',
      button: (
        <>
          <Button label="Primary" styleClass={styles.primary} onClick={handleClick} />
          <span style={{ marginLeft: '10px' }}>현재 값(useStats): {count}</span>
        </>
      ),
      code: `
  <Button 
    label="Primary" 
    styleClass={styles.primary} 
  />
        `,
    },
    {
      title: 'Secondary Button',
      button: <Button label="Secondary" styleClass={styles.secondary} />,
      code: `
  <Button 
    label="Secondary" 
    styleClass={styles.secondary} 
  />
        `,
    },
    {
      title: 'Disabled Button',
      button: <Button label="Disabled" styleClass={styles.disabled} />,
      code: `
  <Button 
    label="Disabled" 
    styleClass={styles.disabled} 
  />
        `,
    },
    {
      title: 'Small Button',
      button: <Button label="Small" styleClass={styles.small} />,
      code: `
  <Button 
    label="Small" 
    styleClass={styles.small} 
  />
        `,
    },
    {
      title: 'Large Button',
      button: <Button label="Large" styleClass={styles.large} />,
      code: `
  <Button 
    label="Large" 
    styleClass={styles.large} 
  />
        `,
    },
  ];

  return (
    <div className={styles.guideContainer}>
      <h2 className="guide-tit2">Button Component Guide</h2>
      <p className="loc react">컴포넌트 위치 : /src/components/Button.jsx</p>
      <pre className="code-block">
        <code className="code-noti">
          import Button from "../components/Button"; // 버튼 컴포넌트
          <br />
          import styles from "/styles/components/Button.module.scss"; // 버튼 스타일
        </code>
      </pre>

      <div className={styles.buttonExamples}>
        {examples.map((example, index) => (
          <div key={index}>
            <h3 className="guide-tit3">{example.title}</h3>
            {example.button}
            <div className="code-example">
              <pre className="code-block">
                <code>{example.code.trim()}</code>
              </pre>
              <CodeCopy code={example.code.trim()} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
