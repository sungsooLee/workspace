import { createFileRoute } from '@tanstack/react-router';
import {
  Carousel,
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalTitle,
  useModal,
  Button,
  ContentsRow,
  DatePicker,
  Editor,
  Badge,
} from '@learnway/ui';
import { Navigation } from 'swiper/modules';
import { IcoHeart } from '@learnway/icons';

import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css'; // form

/* images */
import thumbnailImg from '../../../assets/images/thumb/thumbnail_image.jpg';

export const Route = createFileRoute('/_guide/guide/test')({
  component: RouteComponent,
});

interface badgeItemInfo {
  id?: string;
  name?: string;
}
interface CarouselItemInfo {
  title?: string;
  user?: string;
  count?: number;
  showNewLabel?: boolean;
  time?: string;
  badges: badgeItemInfo[];
}

const items: CarouselItemInfo[] = [
  {
    title: '일을 쉽게 만드는 문제 해결 사고법',
    user: `2,111`,
    count: 100,
    showNewLabel: true,
    badges: [
      { id: '1', name: '태그 라벨1' },
      { id: '2', name: '태그 라벨2' },
    ],
  },
];

function RouteComponent() {
  const { open: openModal } = useModal();
  const carouselItems = items.map((item) => (
    <div>
      <div>
        {item.showNewLabel && (
          <Badge variant="text" status="primary" size="sm" option={{ label: 'New', value: 'a' }} />
        )}
        <span>
          <img src={thumbnailImg} alt="이미지" />
        </span>
        <span>{}</span>
      </div>

      {item.badges && (
        <div>
          {item.badges.map((list) => (
            <span key={list.id}>
              <Badge
                variant="text"
                status="primary"
                size="sm"
                option={{ label: `${list.name}`, value: `${list.id}` }}
              />
            </span>
          ))}
        </div>
      )}

      <strong>{item.title}</strong>
      <div>
        <p>
          <span>{item.user}</span>
          <em>{'명'}</em>
          {'이 학습했어요'}
        </p>
        <div>
          <Button
            onlyIcon
            icon={<IcoHeart width={20} height={20} stroke="#f58b75" fill="#f58b75" />}
            label={`${item.count}`}
          />
        </div>
      </div>
    </div>
  ));
  return (
    <div>
      Hello "/_guide/guide/test"!
      <br />
      <Button
        onClick={() =>
          openModal({
            width: 'md', // sm(600px), md(800px), lg(1024px), xl(1400px)
            height: 'fix',
            content: <ContentModal />,
          })
        }
      >
        모달 팝업 열기
      </Button>
      <Editor value={undefined} />
      <br />
      <br />
      <Carousel
        items={carouselItems}
        modules={[Navigation]}
        slidesPerView={3}
        showNavigation={true}
        loop={false}
      />
    </div>
  );
}

const ContentModal = () => {
  const { close: closeModal } = useModal();
  return (
    <ModalContainer>
      <ModalTitle>{'타이틀'}</ModalTitle>
      <ModalBody>
        {/* <p>컨텐츠 영역</p>
        <p>컨텐츠 영역</p>
        <p>컨텐츠 영역</p>
        <p>컨텐츠 영역</p> */}
        <p>컨텐츠 영역</p>
        <p>컨텐츠 영역</p>
        <p>컨텐츠 영역</p>
        <p>컨텐츠 영역</p>
        <p>컨텐츠 영역</p>
        <ContentsRow>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name" className={formStyles.form_label}>
              <span className={formStyles.form_text}>파일 올리기</span>
            </label>
            <div className={formStyles.input_box}>
              <DatePicker displayType={'day'} />
            </div>
          </div>
        </ContentsRow>
      </ModalBody>
      <ModalFooter>
        <Button label={'취소'} variant={'gray'} size={'lg'} onClick={() => closeModal()} />
        <Button label={'확인'} variant={'primary'} size={'lg'} onClick={() => closeModal()} />
      </ModalFooter>
    </ModalContainer>
  );
};
