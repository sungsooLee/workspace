import { createFileRoute } from '@tanstack/react-router';
import ThumbnailList from './-components/thumb/thumb-nail-list';
import { IcoHeart } from '@learnway/icons';

export const Route = createFileRoute('/_guide/guide/test')({
  component: RouteComponent,
});

function RouteComponent() {
  const item = [
    {
      imageUrl: 'https://picsum.photos/200',
      title: '일을 쉽게 만드는 문제 해결 사고법',
      showNewLabel: true,
      showTimeText: '23:12',
      tagLabels: ['이러닝', '문제해결력', '논리적사고'],
      toggleBtnLabel: '153',
      toggleBtnIcon: <IcoHeart width={20} height={20} stroke="#f58b75" fill="#f58b75" />,
    },

    // imageUrl: string;
    //   title: string;
    //   showNewLabel?: boolean;
    //   showTimeText?: string;
    //   tagLabels?: string[];
    //   toggleBtnLabel?: string;
    //   toggleBtnIcon?: React.ReactNode;
  ];
  return (
    <div>
      <ThumbnailList items={item} />
    </div>
  );
}
