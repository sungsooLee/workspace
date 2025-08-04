import { createFileRoute } from '@tanstack/react-router';
import React, { useEffect, useRef, useState } from 'react';

export const Route = createFileRoute('/_guide/guide/typography')({
  component: RouteComponent,
});

type FontPreviewProps = {
  className: string;
  tag: keyof JSX.IntrinsicElements;
  text?: string;
};

function FontPreview({
  className,
  tag = 'div',
  text = '현대자동차 교육플랫폼에 오신 걸을 환영합니다.',
}: FontPreviewProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [styles, setStyles] = useState<{
    fontSize?: string;
    fontWeight?: string;
  }>({});

  useEffect(() => {
    if (ref.current) {
      const computed = getComputedStyle(ref.current);
      setStyles({
        fontSize: computed.fontSize,
        fontWeight: computed.fontWeight,
      });
    }
  }, []);

  return (
    <div className="flex_box">
      <div className="desc">
        <code>
          <strong>{className}</strong>
        </code>
        <ul className="font-info">
          <li>font-size: {styles.fontSize}</li>
          <li>font-weight: {styles.fontWeight}</li>
        </ul>
      </div>

      {React.createElement(tag, {
        className,
        ref,
        children: text,
      })}
    </div>
  );
}

type TypographyGroup = {
  groupName: string;
  items: {
    title: string;
    className: string;
    tag: keyof JSX.IntrinsicElements;
  }[];
};

function RouteComponent() {
  const groups: TypographyGroup[] = [
    {
      groupName: 'Display',
      items: [
        { title: 'Display', className: 'display1', tag: 'div' },
        { title: 'Display', className: 'display1-b', tag: 'div' },
      ],
    },
    {
      groupName: 'Headline',
      items: [
        { title: 'Headline', className: 'headline1', tag: 'h4' },
        { title: 'Headline', className: 'headline1-b', tag: 'h4' },
        { title: 'Headline', className: 'headline2', tag: 'h3' },
        { title: 'Headline', className: 'headline2-b', tag: 'h3' },
        { title: 'Headline', className: 'headline3', tag: 'h3' },
        { title: 'Headline', className: 'headline3-b', tag: 'h3' },
        { title: 'Headline', className: 'headline4', tag: 'h2' },
        { title: 'Headline', className: 'headline4-b', tag: 'h2' },
      ],
    },
    {
      groupName: 'Title',
      items: [
        { title: 'Title', className: 'title1', tag: 'h4' },
        { title: 'Title', className: 'title1-b', tag: 'h4' },
        { title: 'Title', className: 'title2', tag: 'h4' },
        { title: 'Title', className: 'title2-b', tag: 'h4' },
        { title: 'Title', className: 'title3', tag: 'h3' },
        { title: 'Title', className: 'title3-b', tag: 'h3' },
        { title: 'Title', className: 'title4', tag: 'h3' },
        { title: 'Title', className: 'title4-b', tag: 'h3' },
        { title: 'Title', className: 'title5', tag: 'h4' },
      ],
    },
    {
      groupName: 'Body',
      items: [
        { title: 'Body', className: 'body-lg', tag: 'span' },
        { title: 'Body', className: 'body-lg-b', tag: 'span' },
        { title: 'Body', className: 'body-md', tag: 'span' },
        { title: 'Body', className: 'body-md-b', tag: 'span' },
        { title: 'Body', className: 'body-sm', tag: 'span' },
        { title: 'Body', className: 'body-sm-b', tag: 'span' },
        { title: 'Body', className: 'body-xsm', tag: 'span' },
        { title: 'Body', className: 'body-xsm-b', tag: 'span' },
      ],
    },
    {
      groupName: 'Label',
      items: [
        { title: 'Label', className: 'label-xl', tag: 'span' },
        { title: 'Label', className: 'label-xl-b', tag: 'span' },
        { title: 'Label', className: 'label-lg', tag: 'span' },
        { title: 'Label', className: 'label-lg-b', tag: 'span' },
        { title: 'Label', className: 'label-md', tag: 'span' },
        { title: 'Label', className: 'label-md-b', tag: 'span' },
        { title: 'Label', className: 'label-sm', tag: 'span' },
        { title: 'Label', className: 'label-sm-b', tag: 'span' },
        { title: 'Label', className: 'label-xs', tag: 'span' },
        { title: 'Label', className: 'label-xs-b', tag: 'span' },
      ],
    },
  ];

  return (
    <div>
      <h2 className="guide_tit2">Typography Guide</h2>
      <p className="loc react">
        설정파일 위치(공통) : /libs/config/src/lib/style/<strong>tailwind.preset.js</strong>
      </p>
      <p className="info">
        타이틀은 h1~h6까지 의미있는(시멘틱) 태그를 부여한다.
        <br />
        테일윈드 <strong>tailwind.preset.js</strong> 에 디자인(피그마) 클래스명과 동일하게 추가 후
        @apply title1 형식으로 활용해서 사용한다.
      </p>

      <div>
        {groups.map((group, groupIndex) => (
          <div key={groupIndex} className="group">
            <h3 className="guide_tit3">{group.groupName}</h3>
            {group.items.map((example, itemIndex) => (
              <div key={itemIndex}>
                <FontPreview className={example.className} tag={example.tag} />
                <div className="code_example">
                  <pre className="code_block css">
                    <code>@apply {example.className};</code>
                  </pre>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
