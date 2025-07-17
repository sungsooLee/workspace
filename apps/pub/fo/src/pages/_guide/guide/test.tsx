import { createFileRoute } from '@tanstack/react-router';
import ThumbnailList from './-components/thumb/thumb-nail-list';
import { IcoHeart } from '@learnway/icons';

// 이미지
import bannerImg from '@learnway/styles/fo/assets/images/banner/img_banner_sample.jpg';
import { Badge } from '@learnway/ui';
import { getRandomId } from '@learnway/shared';

export const Route = createFileRoute('/_guide/guide/test')({
  component: RouteComponent,
});

function RouteComponent() {
  const item = [
    {
      imageUrl: bannerImg,
      title:
        '일을 쉽게 만드는 문제 해결 사고법 일을 쉽게 만드는 문제 해결 사고법 일을 쉽게 만드는 문제 해결 사고법 ',
      tagLabels: ['이러닝', '문제해결력', '논리적사고'],
      labelCustomNode: [
        <Badge
          variant="text"
          status="primary"
          size="xs"
          option={{ label: 'New', value: `${getRandomId()}` }}
        />,
        <Badge
          variant="text"
          status="gray"
          size="xs"
          option={{ label: '접수중', value: `${getRandomId()}` }}
        />,
        <Badge
          variant="text"
          status="caution"
          size="xs"
          option={{ label: 'D-7', value: `${getRandomId()}` }}
        />,
      ],
      toggleBtnLabel: '153',
      toggleBtnIcon: <IcoHeart width={20} height={20} stroke="#f58b75" fill="#f58b75" />,
    },
  ];
  return (
    <div>
      <ThumbnailList stacked={true} items={item} />
    </div>
  );
}
