import { createFileRoute } from '@tanstack/react-router';
import React, { useEffect, useState } from 'react';
export const Route = createFileRoute('/_guide/guide/color')({
  component: RouteComponent,
});

function RouteComponent() {
  const exampleCss = [
    {
      code: `// 적용방법(예시)
    .title {
      color: var(--FO_white);
    }
    `,
    },
  ];

  const colorGroups = [
    {
      title: 'Grey Scale',
      description: [
        'Text, Icon, line 등 서비스를 구성하는 기본 UI에 사용되는 Color입니다.',
        'UI Color는 명도 변화로 정의하며, 정보의 강약을 나타내고 우선순위의 계층을 구분하는데 사용됩니다.',
        'Text Color는 WCAG 2.0의 접근성지침을 반영하여 최소 3:1의 명도대비를 준수하는 권장 컬러를 사용합니다.',
      ],
      colors: [
        { name: '--FO_grey9', textColor: '--FO_white', code: '' },
        { name: '--FO_grey8', textColor: '--FO_white', code: '' },
        { name: '--FO_grey7', textColor: '--FO_white', code: '' },
        { name: '--FO_grey6', textColor: '', code: '' },
        { name: '--FO_grey5', textColor: '', code: '' },
        { name: '--FO_grey4', textColor: '', code: '' },
        { name: '--FO_grey3', textColor: '', code: '' },
        { name: '--FO_grey2', textColor: '', code: '' },
        { name: '--FO_grey1', textColor: '', code: '' },
        {
          name: '--FO_white',
          textColor: '',
          code: '',
          border: '1px solid var(--FO_grey3)',
        },
      ],
    },
    {
      title: 'Primary',
      description: [
        '서비스의 Identity 및 행동유도를 이끄는 Color입니다.',
        'Primary Color는 브랜드 이미지를 전달하는 중요한 기능을 합니다.',
        'Primary Color는 화면에서 강조하고자 하는 정보를 하이라이트 하거나 사용자가 해야하는 최종 행동을 유도할 때 사용합니다.',
      ],
      colors: [
        { name: '--FO_pri', textColor: '--FO_white', code: '' },
        { name: '--FO_pri_01', textColor: '--FO_white', code: '' },
        { name: '--FO_pri_01_02', textColor: '--FO_white', code: '' },
        {
          name: '--FO_pri_01_03',
          textColor: '--FO_white',
          code: '',
        },
      ],
    },
    {
      title: 'Secondary',
      description: [
        'Secondary Color는 기본 컬러와 함께 사용되는 보조 색상으로 주로 버튼, 링크, 알림 등을 강조할 때 사용합니다.',
        'Secondary Color를 선택할 때는 Primary Color와 조화를 이루는 색상을 선택해야 합니다.',
        '너무 많은 세컨더리 컬러를 사용하면 색의 조화가 깨질 수 있으므로 적절한 수의 컬러를 선택해야 합니다.',
      ],
      colors: [
        { name: '--FO_sec_01', textColor: '--FO_white', code: '' },
        { name: '--FO_sec_01_01', textColor: '--FO_white', code: '' },
        { name: '--FO_sec_01_02', textColor: '--FO_white', code: '' },
        { name: '--FO_sec_02', textColor: '', code: '' },
      ],
    },
    {
      title: 'Support',
      description: [
        '보조 Color입니다.',
        'Error, Warning, Process/Positive, Success의 상태를 나타낼 때 사용합니다. ',
      ],
      colors: [
        { name: '--FO_su_01', textColor: '--FO_white', code: '' },
        { name: '--FO_su_02', textColor: '', code: '' },
        { name: '--FO_su_03', textColor: '--FO_white', code: '' },
        { name: '--FO_su_04', textColor: '--FO_white', code: '' },
      ],
    },
  ];

  const [updatedColorGroups, setUpdatedColorGroups] = useState([]);

  useEffect(() => {
    // 색상 값을 CSS Custom Property에서 읽어와서 업데이트
    const updatedColors = colorGroups.map((group) => ({
      ...group,
      colors: group.colors.map((color) => ({
        ...color,
        code: getCssVariableValue(color.name), // CSS Custom Property 값 읽기
      })),
    }));

    setUpdatedColorGroups(updatedColors);
  }, []);

  // CSS Custom Property 값을 가져오는 함수
  const getCssVariableValue = (variableName) => {
    const rootStyles = getComputedStyle(document.documentElement); // :root의 스타일 정보 가져오기
    return rootStyles.getPropertyValue(variableName).trim(); // 값 읽기
  };
  return (
    <div>
      <h2 className="guide-tit2">Color Guide (FO)</h2>
      <p className="loc sass">SCSS 위치 : /src/assets/styles/_color.scss</p>
      <p className="info">
        /src/assets/styles/_color.scss 컬러값을 수정하면 가이드에 자동 반영됩니다.
      </p>
      <div className="code-example">
        <pre className="code-block css">
          <code>{exampleCss[0].code}</code>
        </pre>
      </div>
      {updatedColorGroups.map((group, groupIndex) => (
        <div className="color-sec" key={groupIndex}>
          <h3 className="guide-tit3">{group.title}</h3>
          <ul className="info-ul">
            {group.description.map((desc, index) => (
              <li key={index}>{desc}</li>
            ))}
          </ul>
          <div className="color-box">
            {group.colors.map((color, index) => (
              <div className="color-info" key={index}>
                <i
                  style={{
                    backgroundColor: `var(${color.name})`,
                    border: color.border || 'none',
                  }}></i>
                <span className="txt">{color.name}</span>
                <span className="code" style={{ color: `var(${color.textColor})` }}>
                  {color.code}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
