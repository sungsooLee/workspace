import { createFileRoute } from '@tanstack/react-router';
export const Route = createFileRoute('/_guide/guide/typography')({
  component: RouteComponent,
});

function RouteComponent() {
  const groups = [
    {
      groupName: 'Display',
      items: [
        {
          title: 'Display',
          className: 'display1',
          preview: `<div class="{className}">현대자동차 교육플랫폼에 오신 걸을 환영합니다.</div>`,
          code: `@apply display1;`,
        },
        {
          title: 'Display',
          className: 'display1-b',
          preview: `<div class="{className}">현대자동차 교육플랫폼에 오신 걸을 환영합니다.</div>`,
          code: `@apply display1-b;`,
        },
      ],
    },
    {
      groupName: 'Headline',
      items: [
        {
          title: 'Headline',
          className: 'headline1',
          preview: `<h4 class="{className}">현대자동차 교육플랫폼에 오신 걸을 환영합니다.</h4>`,
          code: `@apply headline1;`,
        },
        {
          title: 'Headline',
          className: 'headline1-b',
          preview: `<h4 class="{className}">현대자동차 교육플랫폼에 오신 걸을 환영합니다.</h4>`,
          code: `@apply headline1-b;`,
        },
        {
          title: 'Headline',
          className: 'headline2',
          preview: `<h3 class="{className}">현대자동차 교육플랫폼에 오신 걸을 환영합니다.</h3>`,
          code: `@apply headline2;`,
        },
        {
          title: 'Headline',
          className: 'headline2-b',
          preview: `<h3 class="{className}">현대자동차 교육플랫폼에 오신 걸을 환영합니다.</h3>`,
          code: `@apply headline2-b;`,
        },
        {
          title: 'Headline',
          className: 'headline3',
          preview: `<h3 class="{className}">현대자동차 교육플랫폼에 오신 걸을 환영합니다.</h3>`,
          code: `@apply headline3;`,
        },
        {
          title: 'Headline',
          className: 'headline3-b',
          preview: `<h3 class="{className}">현대자동차 교육플랫폼에 오신 걸을 환영합니다.</h3>`,
          code: ` @apply headline3-b;`,
        },
        {
          title: 'Headline',
          className: 'headline4',
          preview: `<h2 class="{className}">현대자동차 교육플랫폼에 오신 걸을 환영합니다.</h2>`,
          code: `@apply headline4;`,
        },

        {
          title: 'Headline',
          className: 'headline4-b',
          preview: `<h2 class="{className}">현대자동차 교육플랫폼에 오신 걸을 환영합니다.</h2>`,
          code: `@apply headline4-b;`,
        },
      ],
    },
    {
      groupName: 'Title',
      items: [
        {
          title: 'Title',
          className: 'title1',
          preview: `<h4 class="{className}">현대자동차 교육플랫폼에 오신 걸을 환영합니다.</h4>`,
          code: `@apply title1;`,
        },
        {
          title: 'Title',
          className: 'title1-b',
          preview: `<h4 class="{className}">현대자동차 교육플랫폼에 오신 걸을 환영합니다.</h4>`,
          code: `@apply title1-b;`,
        },
        {
          title: 'Title',
          className: 'title2',
          preview: `<h4 class="{className}">현대자동차 교육플랫폼에 오신 걸을 환영합니다.</h4>`,
          code: `@apply title2;`,
        },
        {
          title: 'Title',
          className: 'title2-b',
          preview: `<h4 class="{className}">현대자동차 교육플랫폼에 오신 걸을 환영합니다.</h4>`,
          code: `@apply title2-b;`,
        },
        {
          title: 'Title',
          className: 'title3',
          preview: `<h3 class="{className}">현대자동차 교육플랫폼에 오신 걸을 환영합니다.</h3>`,
          code: `@apply title3;`,
        },
        {
          title: 'Title',
          className: 'title3-b',
          preview: `<h3 class="{className}">현대자동차 교육플랫폼에 오신 걸을 환영합니다.</h3>`,
          code: `@apply title3-b;`,
        },
        {
          title: 'Title',
          className: 'title4',
          preview: `<h3 class="{className}">현대자동차 교육플랫폼에 오신 걸을 환영합니다.</h3>`,
          code: `@apply title4;`,
        },
        {
          title: 'Title',
          className: 'title4-b',
          preview: `<h3 class="{className}">현대자동차 교육플랫폼에 오신 걸을 환영합니다.</h3>`,
          code: `@apply title1-b;`,
        },
        {
          title: 'Title',
          className: 'title5',
          preview: `<h4 class="{className}">현대자동차 교육플랫폼에 오신 걸을 환영합니다.</h4>`,
          code: `@apply title1;`,
        },
        {
          title: 'Title',
          className: 'title5-b',
          preview: `<h2 class="{className}">현대자동차 교육플랫폼에 오신 걸을 환영합니다.</h2>`,
          code: `@apply title5-b;`,
        },
      ],
    },
    {
      groupName: 'Body',
      items: [
        {
          title: 'Body',
          className: 'body-lg',
          preview: `<span class="{className}">현대자동차 교육플랫폼에 오신 걸을 환영합니다.</span>`,
          code: `@apply body-lg;`,
        },
        {
          title: 'Body',
          className: 'body-lg-b',
          preview: `<span class="{className}">현대자동차 교육플랫폼에 오신 걸을 환영합니다.</span>`,
          code: `@apply body-lg-b;`,
        },
        {
          title: 'Body',
          className: 'body-md',
          preview: `<span class="{className}">현대자동차 교육플랫폼에 오신 걸을 환영합니다.</span>`,
          code: `@apply body-md;`,
        },
        {
          title: 'Body',
          className: 'body-md-b',
          preview: `<span class="{className}">현대자동차 교육플랫폼에 오신 걸을 환영합니다.</span>`,
          code: `@apply body-md-b;`,
        },
        {
          title: 'Body',
          className: 'body-sm',
          preview: `<span class="{className}">현대자동차 교육플랫폼에 오신 걸을 환영합니다.</span>`,
          code: `@apply body-sm;`,
        },
        {
          title: 'Body',
          className: 'body-sm-b',
          preview: `<span class="{className}">현대자동차 교육플랫폼에 오신 걸을 환영합니다.</span>`,
          code: `@apply body-sm-b;`,
        },
        {
          title: 'Body',
          className: 'body-xsm',
          preview: `<span class="{className}">현대자동차 교육플랫폼에 오신 걸을 환영합니다.</span>`,
          code: `@apply body-xsm;`,
        },
        {
          title: 'Body',
          className: 'body-xsm-b',
          preview: `<span class="{className}">현대자동차 교육플랫폼에 오신 걸을 환영합니다.</span>`,
          code: `@apply body-xsm-b;`,
        },
      ],
    },
    {
      groupName: 'Label',
      items: [
        {
          title: 'Label',
          className: 'label-xl',
          preview: `<span class="{className}">현대자동차 교육플랫폼에 오신 걸을 환영합니다.</span>`,
          code: ` @apply label-xl;`,
        },
        {
          title: 'Label',
          className: 'label-xl-b',
          preview: `<span class="{className}">현대자동차 교육플랫폼에 오신 걸을 환영합니다.</span>`,
          code: ` @apply label-xl-b;`,
        },
        {
          title: 'Label',
          className: 'label-lg',
          preview: `<span class="{className}">현대자동차 교육플랫폼에 오신 걸을 환영합니다.</span>`,
          code: ` @apply label-lg;`,
        },
        {
          title: 'Label',
          className: 'label-lg-b',
          preview: `<span class="{className}">현대자동차 교육플랫폼에 오신 걸을 환영합니다.</span>`,
          code: ` @apply label-lg-b;`,
        },
        {
          title: 'Label',
          className: 'label-md',
          preview: `<span class="{className}">현대자동차 교육플랫폼에 오신 걸을 환영합니다.</span>`,
          code: ` @apply label-md;`,
        },
        {
          title: 'Label',
          className: 'label-md-b',
          preview: `<span class="{className}">현대자동차 교육플랫폼에 오신 걸을 환영합니다.</span>`,
          code: ` @apply label-md-b;`,
        },
        {
          title: 'Label',
          className: 'label-sm',
          preview: `<span class="{className}">현대자동차 교육플랫폼에 오신 걸을 환영합니다.</span>`,
          code: ` @apply label-sm;`,
        },
        {
          title: 'Label',
          className: 'label-sm-b',
          preview: `<span class="{className}">현대자동차 교육플랫폼에 오신 걸을 환영합니다.</span>`,
          code: ` @apply label-sm-b;`,
        },
        {
          title: 'Label',
          className: 'label-xs',
          preview: `<span class="{className}">현대자동차 교육플랫폼에 오신 걸을 환영합니다.</span>`,
          code: ` @apply label-xs;`,
        },
        {
          title: 'Label',
          className: 'label-xs-b',
          preview: `<span class="{className}">현대자동차 교육플랫폼에 오신 걸을 환영합니다.</span>`,
          code: ` @apply label-xs-b;`,
        },
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
                <div className="flex_box">
                  <div className="desc">
                    <code>
                      <strong>{example.className}</strong>
                    </code>
                  </div>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: example.preview.replace('{className}', example.className),
                    }}
                  />
                </div>
                <div className="code_example">
                  <pre className="code_block css">
                    <code>{example.code.trim()}</code>
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
