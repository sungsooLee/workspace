import { createFileRoute } from '@tanstack/react-router';
import ThumbnailList from '../../-components/thumb/thumb-nail-list';

// 이미지
import bannerImg from '@learnway/styles/fo/assets/images/banner/img_banner_sample.jpg';
import { Badge } from '@learnway/ui';
import { getRandomId } from '@learnway/shared';
import { IcoPlay, IcoStar, IcoEye, IcoHeart } from '@learnway/icons';

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
      infoCustomNode: [
        <span>{'이러닝'}</span>,
        <span>
          <IcoPlay width={16} height={16} stroke="#4C515E" />
          {'05:00'}
        </span>,
      ],
      toggleButton: true,
      countInfoNode: [
        <span>
          <IcoStar width={20} height={20} stroke="#0056FF" fill="#0056FF" />
          <em>{'4.2'}</em>
        </span>,
        <span>
          <IcoEye width={20} height={20} fill="none" stroke="#4D525C" />
          <em>{'78,800'}</em>
        </span>,
        <span>
          <IcoHeart width={20} height={20} stroke="#F58B75" fill="#F58B75" />
          <em>{'153'}</em>
        </span>,
      ],
    },
  ];
  return <ThumbnailList stacked={true} items={item} />;
}
