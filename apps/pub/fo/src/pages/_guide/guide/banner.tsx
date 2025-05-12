import { createFileRoute, Link } from '@tanstack/react-router';
import React, { useState } from 'react';
import { cn } from '@learnway/shared';
import { Button } from '@learnway/ui';

import bannerStyles from '../../../shared/ui/visual/banner.module.css';

import ImgNotice from '@learnway/styles/fo/assets/images/thumb/img_notice_01.png';

export const Route = createFileRoute('/_guide/guide/banner')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h2 className="guide_tit2">banner Page Component</h2>
      <p className="loc css">
        import thumnailStyles from '../../../shared/ui/visual/banner.module.css';
      </p>
      <p className="loc react">
        pc : <Link to="/integrated-search/integrated-all">예제링크</Link>
        <br />
        mobile : <Link to="/integrated-search/integrated-all-m">예제링크</Link>
      </p>

      <div className="group">
        <h3 className="guide_tit3">banner 미리보기</h3>
        <div className="flex_box">
          <div className="desc">
            <div className={`${bannerStyles.start} ${bannerStyles.banner}`}>
              <img src={ImgNotice} alt="" />
              <div className={bannerStyles.txt_box}>
                <strong>“파이썬” 관련해 만족할 만한 결과를 찾지 못하셨나요?</strong>
                <p>필요한 교육 과정이나 채널이 있다면 요청해 주세요.</p>
              </div>
              <div className={bannerStyles.btn_box}>
                <Button variant="gray" size="lg">
                  교육 요청
                </Button>
                <Button variant="gray" size="lg">
                  채널 요청
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="code_example">
          <pre className="code_block">
            <code>{`// 기본 호출방법
import thumnailStyles from '../../../shared/ui/visual/banner.module.css';

// 사용 예제
<div className={\`\${bannerStyles.start} \${bannerStyles.banner}\`}>
  <img src={ImgNotice} alt="" />
  <div className={bannerStyles.txt_box}>
    <strong>“파이썬” 관련해 만족할 만한 결과를 찾지 못하셨나요?</strong>
    <p>필요한 교육 과정이나 채널이 있다면 요청해 주세요.</p>
  </div>
  <div className={bannerStyles.btn_box}>
    <Button variant="gray" size="lg">
      교육 요청
    </Button>
    <Button variant="gray" size="lg">
      채널 요청
    </Button>
  </div>
</div>
`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
