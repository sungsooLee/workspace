import { createFileRoute } from '@tanstack/react-router';
export const Route = createFileRoute('/_guide/guide/typography')({
  component: RouteComponent,
});

function RouteComponent() {
  const groups = [
    {
      groupName: 'Title',
      items: [
        {
          title: 'Title',
          className: 'title_1_b',
          preview: `<h1 class="{className}">현대자동차 교육플랫폼에 오신 걸을 환영합니다.</h1>`,
          code: `
              .title_1_b {
      @apply title_1_b;
}
              `,
        },
        {
          title: 'Title',
          className: 'title_1_r',
          preview: `<h1 class="{className}">현대자동차 교육플랫폼에 오신 걸을 환영합니다.</h1>`,
          code: `
              .title_1_r {
      @apply title_1_r;
}
              `,
        },
        {
          title: 'Title',
          className: 'title_2_b',
          preview: `<h2 class="{className}">현대자동차 교육플랫폼에 오신 걸을 환영합니다.</h2>`,
          code: `
              .title_2_b {
      @apply title_2_b;
} // 메인 타이틀
              `,
        },
        {
          title: 'Title',
          className: 'title_2_r',
          preview: `<h2 class="{className}">현대자동차 교육플랫폼에 오신 걸을 환영합니다.</h2>`,
          code: `
              .title_2_r {
      @apply title_2_r;
}
              `,
        },
        {
          title: 'Title',
          className: 'title_3_b',
          preview: `<h3 class="{className}">현대자동차 교육플랫폼에 오신 걸을 환영합니다.</h3>`,
          code: `
              .title_3_b {
      @apply title_3_b;
} // 서브 타이틀
              `,
        },
        {
          title: 'Title',
          className: 'title_3_r',
          preview: `<h3 class="{className}">현대자동차 교육플랫폼에 오신 걸을 환영합니다.</h3>`,
          code: `
              .title_3_r {
      @apply title_3_r;
}
              `,
        },
        {
          title: 'Title',
          className: 'title_4_b',
          preview: `<h4 class="{className}">현대자동차 교육플랫폼에 오신 걸을 환영합니다.</h4>`,
          code: `
              .title_4_b {
      @apply title_4_b;
} // 카드 타이틀
              `,
        },
        {
          title: 'Title',
          className: 'title_4_r',
          preview: `<h4 class="{className}">현대자동차 교육플랫폼에 오신 걸을 환영합니다.</h4>`,
          code: `
              .title_4_r {
      @apply title_4_r;
}
              `,
        },
        {
          title: 'Title',
          className: 'title_5_b',
          preview: `<h5 class="{className}">현대자동차 교육플랫폼에 오신 걸을 환영합니다.</h5>`,
          code: `
              .title_5_b {
      @apply title_5_b;
} // 카드 타이틀
              `,
        },
        {
          title: 'Title',
          className: 'title_5_r',
          preview: `<h5 class="{className}">현대자동차 교육플랫폼에 오신 걸을 환영합니다.</h5>`,
          code: `
              .title_5_r {
      @apply title_5_r;
}
              `,
        },
      ],
    },
    {
      groupName: 'Body',
      items: [
        {
          title: 'Body',
          className: 'body_1_b',
          preview: `<span class="{className}">현대자동차 교육플랫폼에 오신 걸을 환영합니다.</span>`,
          code: `
              .body_1_b {
      @apply body_1_b;
}
              `,
        },
        {
          title: 'Body',
          className: 'body_1_r',
          preview: `<span class="{className}">현대자동차 교육플랫폼에 오신 걸을 환영합니다.</span>`,
          code: `
              .body_1_r {
      @apply body_1_r;
}
              `,
        },
        {
          title: 'Body',
          className: 'body_2_b',
          preview: `<span class="{className}">현대자동차 교육플랫폼에 오신 걸을 환영합니다.</span>`,
          code: `
              .body_2_b {
      @apply body_2_b;
}
              `,
        },
        {
          title: 'Body',
          className: 'body_2_r',
          preview: `<span class="{className}">현대자동차 교육플랫폼에 오신 걸을 환영합니다.</span>`,
          code: `
              .body_2_r {
      @apply body_2_r;
}
              `,
        },
        {
          title: 'Body',
          className: 'body_3_b',
          preview: `<span class="{className}">현대자동차 교육플랫폼에 오신 걸을 환영합니다.</span>`,
          code: `
              .body_3_b {
      @apply body_3_b;
}
              `,
        },
        {
          title: 'Body',
          className: 'body_3_r',
          preview: `<span class="{className}">현대자동차 교육플랫폼에 오신 걸을 환영합니다.</span>`,
          code: `
              .body_3_r {
      @apply body_3_r;
}
              `,
        },
        {
          title: 'Body',
          className: 'body_4_b',
          preview: `<span class="{className}">현대자동차 교육플랫폼에 오신 걸을 환영합니다.</span>`,
          code: `
              .body_4_b {
      @apply body_4_b;
}
              `,
        },
        {
          title: 'Body',
          className: 'body_4_r',
          preview: `<span class="{className}">현대자동차 교육플랫폼에 오신 걸을 환영합니다.</span>`,
          code: `
              .body_4_r {
      @apply body_4_r;
}
              `,
        },
      ],
    },
    {
      groupName: 'Input',
      items: [
        {
          title: 'Input',
          className: 'input_1_b',
          preview: `<span class="{className}">현대자동차 교육플랫폼에 오신 걸을 환영합니다.</span>`,
          code: `
              .input_1_b {
      @apply input_1_b;
}
              `,
        },
        {
          title: 'Input',
          className: 'input_1_r',
          preview: `<span class="{className}">현대자동차 교육플랫폼에 오신 걸을 환영합니다.</span>`,
          code: `
              .input_1_r {
      @apply input_1_r;
}
              `,
        },
        {
          title: 'Input',
          className: 'input_2_b',
          preview: `<span class="{className}">현대자동차 교육플랫폼에 오신 걸을 환영합니다.</span>`,
          code: `
              .input_2_b {
      @apply input_2_b;
}
              `,
        },
        {
          title: 'Input',
          className: 'input_2_r',
          preview: `<span class="{className}">현대자동차 교육플랫폼에 오신 걸을 환영합니다.</span>`,
          code: `
              .input_2_r {
      @apply input_2_r;
}
              `,
        },
        {
          title: 'Input',
          className: 'input_3_b',
          preview: `<span class="{className}">현대자동차 교육플랫폼에 오신 걸을 환영합니다.</span>`,
          code: `
              .input_3_b {
      @apply input_3_b;
}
              `,
        },
        {
          title: 'Input',
          className: 'input_3_r',
          preview: `<span class="{className}">현대자동차 교육플랫폼에 오신 걸을 환영합니다.</span>`,
          code: `
              .input_3_r {
      @apply input_3_r;
}
              `,
        },
      ],
    },
    {
      groupName: 'Button',
      items: [
        {
          title: 'Button',
          className: 'button_1_b',
          preview: `<span class="{className}">현대자동차 교육플랫폼에 오신 것을 환영합니다.</span>`,
          code: `
              .button_1_b {
      @apply button_1_b;
}
              `,
        },
        {
          title: 'Button',
          className: 'button_l_r',
          preview: `<span class="{className}">현대자동차 교육플랫폼에 오신 것을 환영합니다.</span>`,
          code: `
              .button_l_r {
      @apply button_l_r;
}
              `,
        },
        {
          title: 'Button',
          className: 'button_2_b',
          preview: `<span class="{className}">현대자동차 교육플플랫폼에 오신 것을 환영합니다.</span>`,
          code: `
              .button_2_b {
      @apply button_2_b;
}
              `,
        },
        {
          title: 'Button',
          className: 'button_2_r',
          preview: `<span class="{className}">현대자동차 교육플랫폼에 오신 것을 환영합니다.</span>`,
          code: `
              .button_2_r {
      @apply button_2_r;
}
              `,
        },
        {
          title: 'Button',
          className: 'button_3_b',
          preview: `<span class="{className}">현대자동차 교육플랫폼에 오신 것을 환영합니다.</span>`,
          code: `
              .button_3_b {
      @apply button_3_b;
}
              `,
        },
        {
          title: 'Button',
          className: 'button_3_r',
          preview: `<span class="{className}">현대자동차 교육플랫폼에 오신 것을 환영합니다.</span>`,
          code: `
              .button_3_r {
      @apply button_3_r;
}
              `,
        },
        {
          title: 'Button',
          className: 'button_4_b',
          preview: `<span class="{className}">현대자동차 교육플랫폼에 오신 것을 환영합니다.</span>`,
          code: `
              .button_4_b {
      @apply button_4_b;
}
              `,
        },
        {
          title: 'Button',
          className: 'button_4_r',
          preview: `<span class="{className}">현대자동차 교육플랫폼에 오신 것을 환영합니다.</span>`,
          code: `
              .button_4_r {
      @apply button_4_r;
}
              `,
        },
        {
          title: 'Button',
          className: 'button_4_r',
          preview: `<span class="{className}">현대자동차 교육플랫폼에 오신 것을 환영합니다.</span>`,
          code: `
              .button_4_r {
      @apply button_4_r;
}
              `,
        },
      ],
    },
    {
      groupName: 'Label & Badge', // New group for Label and Badge
      items: [
        {
          title: 'Label',
          className: 'label_1_b',
          preview: `<span class="{className}">현대자동차 교육플랫폼에 오신 걸을 환영합니다.</span>`,
          code: `
              .label_1_b {
      @apply label_1_b;
}
              `,
        },
        {
          title: 'Label',
          className: 'label_1_r',
          preview: `<span class="{className}">현대자동차 교육플랫폼에 오신 걸을 환영합니다.</span>`,
          code: `
              .label_1_r {
      @apply label_1_r;
}
              `,
        },
        {
          title: 'Label',
          className: 'label_2_b',
          preview: `<span class="{className}">현대자동차 교육플랫폼에 오신 걸을 환영합니다.</span>`,
          code: `
              .label_2_b {
      @apply label_2_b;
}
              `,
        },
        {
          title: 'Label',
          className: 'label_2_r',
          preview: `<span class="{className}">현대자동차 교육플랫폼에 오신 걸을 환영합니다.</span>`,
          code: `
              .label_2_r {
      @apply label_2_r;
}
              `,
        },
      ],
    },
  ];

  return (
    <div>
      <h2 className="guide_tit2">Typography Guide</h2>
      <p className="loc react">
        설장파일 위치(공통) : /libs/config/src/lib/style/<strong>tailwind.preset.js</strong>
      </p>
      <p className="info">
        타이틀은 h1~h6까지 의미있는(시멘틱) 태그를 부여한다.
        <br />
        테일윈드 <strong>tailwind.config.js</strong> 에 디자인(피그마) 클래스명과 동일하게 추가 후
        @apply body_2_r 형식으로 활용해서 사용한다.
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
