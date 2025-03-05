import { OptionCard } from '@/libs/ui/src';
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
    { label: '기타', value: getRandomId(), icon: <IcoEtc />, description: '설명문구2줄설명' },
    { label: '기타', value: getRandomId(), icon: <IcoEtc />, description: '설명문구2줄설명' },
    { label: '기타', value: getRandomId(), icon: <IcoEtc />, description: '설명문구2줄설명' },
    { label: '기타', value: getRandomId(), icon: <IcoEtc />, description: '설명문구2줄설명' },
    { label: '기타', value: getRandomId(), icon: <IcoEtc />, description: '설명문구2줄설명' },
    { label: '기타', value: getRandomId(), icon: <IcoEtc />, description: '설명문구2줄설명' },
    { label: '기타', value: getRandomId(), icon: <IcoEtc />, description: '설명문구2줄설명' },
    { label: '기타', value: getRandomId(), icon: <IcoEtc />, description: '설명문구2줄설명' },
    { label: '기타', value: getRandomId(), icon: <IcoEtc />, description: '설명문구2줄설명' },
    { label: '기타', value: getRandomId(), icon: <IcoEtc />, description: '설명문구2줄설명' },
  ];
  return (
    <div>
      <OptionCard
        cols={4}
        options={dummyOptions}
        multiple
        onOptionsSelect={(options) => console.log('selected', options)}
      />
      <br />
      <OptionCard
        cols={5}
        size="lg"
        options={dummyOptions2}
        onOptionsSelect={(options) => console.log('selected', options)}
      />
    </div>
  );
}
