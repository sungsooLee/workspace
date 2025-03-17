import { OptionCard } from '@learnway/ui';
import { createFileRoute } from '@tanstack/react-router';
import { getRandomId } from '@learnway/shared';

import {
  IcoMybook,
  IcoBlog,
  IcoEntrust,
  IcoInfoCircle,
  IcoImage01,
  IcoVideo01,
  IcoVideo02,
  IcoHtml,
  IcoEtc,
} from '@learnway/icons';

export const Route = createFileRoute('/_guide/guide/optionCard')({
  component: RouteComponent,
});

function RouteComponent() {
  const dummyOptions = [
    { label: '메뉴 A', value: getRandomId() },
    { label: '메뉴 B', value: getRandomId() },
    { label: '메뉴 c', value: getRandomId() },
    { label: '메뉴 d', value: getRandomId() },
  ];
  const dummyOptions2 = [
    {
      label: '동영상',
      value: getRandomId(),
      icon: <IcoVideo01 />,
      description: '1개 동영상 업로드',
    },
    {
      label: '멀티 동영상',
      value: getRandomId(),
      icon: <IcoVideo02 />,
      description:
        '설명 문구는 최대 2줄까지 노출됩니다. 설명문구2줄설명 문구는 최대 2줄까지 노출됩니다. 설명문구2줄',
    },
    {
      label: 'HTML 동영상',
      value: getRandomId(),
      icon: <IcoHtml />,
      description: '설명 문구는 최대 2줄까지 노출됩니다. ',
    },
    {
      label: '이미지',
      value: getRandomId(),
      icon: <IcoImage01 />,
      description: '설명 문구는 최대 2줄까지 노출됩니다. ',
    },
    { label: '기타', value: getRandomId(), icon: <IcoEtc />, description: '설명문구2줄설명' },
    {
      label: '외부 링크',
      value: getRandomId(),
      icon: <IcoInfoCircle />,
      description: '설명문구2줄설명',
    },
    {
      label: '외부 위탁',
      value: getRandomId(),
      icon: <IcoEntrust />,
      description: '설명문구2줄설명',
    },
    { label: '블로그', value: getRandomId(), icon: <IcoBlog />, description: '설명문구2줄설명' },
    {
      label: '이북',
      value: getRandomId(),
      icon: <IcoMybook />,
      description: '설명문구2줄설명',
    },
    { label: '스콤', value: getRandomId(), icon: <IcoEtc />, description: '설명문구2줄설명' },
    { label: '멀티 스콤', value: getRandomId(), icon: <IcoEtc />, description: '설명문구2줄설명' },
    { label: '설문지', value: getRandomId(), icon: <IcoEtc />, description: '설명문구2줄설명' },
    { label: '시험지', value: getRandomId(), icon: <IcoEtc />, description: '설명문구2줄설명' },
    { label: '과제', value: getRandomId(), icon: <IcoEtc />, description: '설명문구2줄설명' },
  ];
  return (
    <div className="content">
      <h2 className="guide_tit2">OptionCard Component Guide</h2>
      <p className="loc react">/libs/ui/src/lib/option-card/option-card.tsx</p>
      <div className="code_example">
        <pre className="code_block">
          <code>
            {`// 초기 import
  import { OptionCard } from '@/libs/ui/src';
  
  // 적용방법(예시) 단일선택인 경우 아닌 경우 props :  multiple
  multiple인 경우 onOptionsSelect 아닌경우 onOptionSelect
  한줄에 나열된 length 정의 props : cols 
  <Progress value={40} />`}
          </code>
        </pre>
      </div>
      <div className="group">
        <h3 className="guide_tit3">멀티 선택인 경우</h3>
        <div className="flex_box">
          <div className="desc w-full">
            <OptionCard
              cols={4}
              options={dummyOptions}
              multiple
              onOptionsSelect={(options) => console.log('selected', options)} // multiple
            />
          </div>
        </div>
        <h3 className="guide_tit3">단일 선택인 경우</h3>
        <div className="flex_box">
          <div className="desc">
            <OptionCard
              cols={5}
              size="lg"
              options={dummyOptions2}
              onOptionSelect={(option) => console.log('selected', option)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
