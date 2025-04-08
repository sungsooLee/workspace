import { useState, useEffect } from 'react';
import { createFileRoute } from '@tanstack/react-router';
export const Route = createFileRoute('/_guide/guide/color')({
  component: RouteComponent,
});

function RouteComponent() {
  const exampleCss = [
    {
      code: `// 적용방법(예시)
.title {
  color: var(--white);
}
  
// 테일윈드(예시)
.title {
  @apply text-[var(--white)];
}`,
    },
  ];

  interface Color {
    name: string;
    textColor: string;
    code: string;
    border?: string;
  }

  interface ColorGroup {
    title: string;
    description: string[];
    colors: Color[];
  }

  const colorGroups = [
    {
      title: 'Gray Scale',
      description: [
        'Text, Icon, line 등 서비스를 구성하는 기본 UI에 사용되는 Color입니다.',
        'UI Color는 명도 변화로 정의하며, 정보의 강약을 나타내고 우선순위의 계층을 구분하는데 사용됩니다.',
        'Text Color는 WCAG 2.0의 접근성지침을 반영하여 최소 3:1의 명도대비를 준수하는 권장 컬러를 사용합니다.',
      ],
      colors: [
        { name: '--gray10', textColor: '--white', code: '' },
        { name: '--gray9', textColor: '--white', code: '' },
        { name: '--gray8', textColor: '--white', code: '' },
        { name: '--gray7', textColor: '', code: '' },
        { name: '--gray6', textColor: '', code: '' },
        { name: '--gray5', textColor: '', code: '' },
        { name: '--gray4', textColor: '', code: '' },
        { name: '--gray3', textColor: '', code: '' },
        { name: '--gray2', textColor: '', code: '' },
        { name: '--gray1', textColor: '', code: '' },
        {
          name: '--white',
          textColor: '--gray9',
          code: '#ffffff',
          border: '1px solid var(--gray3)',
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
        { name: '--primary1', textColor: '--white', code: '' },
        { name: '--primary2', textColor: '--white', code: '' },
        { name: '--primary3', textColor: '--white', code: '' },
        { name: '--primary4', textColor: '--white', code: '' },
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
        { name: '--secondary1', textColor: '--white', code: '' },
        { name: '--secondary2', textColor: '--white', code: '' },
        { name: '--secondary3', textColor: '--white', code: '' },
        { name: '--secondary4', textColor: '', code: '' },
        { name: '--secondary4', textColor: '', code: '' },
        { name: '--secondary5', textColor: '', code: '' },
        { name: '--secondary6', textColor: '', code: '' },
        { name: '--secondary7', textColor: '', code: '' },
        { name: '--secondary8', textColor: '', code: '' },
        { name: '--secondary9', textColor: '', code: '' },
        { name: '--secondary10', textColor: '', code: '' },
      ],
    },
    {
      title: 'Support',
      description: [
        '보조 Color입니다.',
        'Error, Warning, Process/Positive, Success의 상태를 나타낼 때 사용합니다. ',
      ],
      colors: [
        { name: '--status1', textColor: '--white', code: '' },
        { name: '--status2', textColor: '', code: '' },
      ],
    },
  ];

  const [updatedColorGroups, setUpdatedColorGroups] = useState<ColorGroup[]>([]);

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
  const getCssVariableValue = (variableName: string): string => {
    const rootStyles = getComputedStyle(document.documentElement); // :root의 스타일 정보 가져오기
    return rootStyles.getPropertyValue(variableName).trim(); // 값 읽기
  };

  return (
    <div>
      <h2 className="guide_tit2">Color Guide</h2>
      <p className="loc css">CSS 위치 : /src/assets/styles/_color.css</p>
      <p className="info">
        /src/assets/styles/_color.css 컬러값을 수정하면 가이드에 자동 반영됩니다.
      </p>
      <div className="code_example">
        <pre className="code_block css">
          <code>{exampleCss[0].code}</code>
        </pre>
      </div>
      {updatedColorGroups.map((group, groupIndex) => (
        <div className="color_sec" key={groupIndex}>
          <h3 className="guide_tit3">{group.title}</h3>
          <ul className="info_ul">
            {group.description.map((desc, index) => (
              <li key={index}>{desc}</li>
            ))}
          </ul>
          <div className="color_box">
            {group.colors.map((color, index) => (
              <div className="color_info" key={index}>
                <i
                  style={{
                    backgroundColor: `var(${color.name})`,
                    border: color.border || 'none',
                  }}
                ></i>
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
