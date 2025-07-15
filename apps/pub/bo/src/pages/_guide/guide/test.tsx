import { useState } from 'react';
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
import { cn } from '@learnway/shared';
import { Navigation } from 'swiper/modules';
import { IcoHeart } from '@learnway/icons';

import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css'; // form

/* images */
import thumbnailImg from '../../../assets/images/thumb/thumbnail_image.jpg';

// import styles from './count-list.module.css';
// import btnStyles from './segment-button.module.css';
import listStyles from './order-list.module.css';

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

interface ListInfo {
  title: string;
  status?: string;
  list?: {
    label: string;
    time?: string;
  }[];
}

const data: ListInfo[] = [
  {
    title: '안전교육 | 강사 이승훈(현대오토에버 L&D플랫폼팀) ',
    status: '완료',
    list: [
      { label: '산업안전보건/공정안전관리/산업보건관리/물질안전보건/일반안전관리', time: '8시간' },
      { label: '산업안전보건/공정안전관리/산업보건관리/물질안전보건/일반안전관리', time: '4시간' },
    ],
  },
  {
    title: '사업장 교육 1 (강사 김지선)',
    list: [
      { label: '산업안전보건/공정안전관리/산업보건관리/물질안전보건/일반안전관리', time: '8시간' },
    ],
  },
  {
    title: '사업장 교육 2 (강사 : 이승훈 ) ',
    list: [
      { label: '산업안전보건/공정안전관리/산업보건관리/물질안전보건/일반안전관리', time: '8시간' },
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

  const buttonLabels = ['버튼1', '버튼2'];
  const [selectedIndex, setSelectedIndex] = useState<number | null>(0);
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
      <br />
      <br />
      <br />
      {/* count list */}
      {/* <div className={styles.start}>
        <div className={styles.item}>
          <span className={styles.label}>{'조회'}</span>
          <strong className={styles.num}>
            {'000,000'} 
          </strong>
        </div>
        <div className={styles.item}>
          <span className={styles.label}>{'조회'}</span>
          <strong className={styles.num}>
            {'000,000'} 
          </strong>
        </div>
        <div className={styles.item}>
          <span className={styles.label}>{'조회'}</span>
          <strong className={styles.num}>
            {'000,000'} 
          </strong>
        </div>
        <div className={styles.item}>
          <span className={styles.label}>{'조회'}</span>
          <strong className={styles.num}>
            {'000,000'} 
          </strong>
        </div>
      </div> */}
      {/* segment button */}
      {/* <div className={btnStyles.start}>
        {buttonLabels.map((label, index) => {
          const isActive = selectedIndex === index;

          return (
            <Button
              key={index}
              variant="text"
              size="sm"
              label={label}
              onClick={() => setSelectedIndex(index)}
              className={cn(btnStyles.btn, isActive && btnStyles.active)}
              aria-selected={isActive ? 'true' : undefined}
            />
          );
        })}
      </div> */}
      {/* order list */}
      <div className={cn(listStyles.start, listStyles.procedure_wrap)}>
        {data.map((item, index) => (
          <div className={listStyles.item} key={index}>
            <div className={listStyles.title_wrap}>
              <strong className={listStyles.title}>
                <span className={listStyles.index}>{`${index + 1}.`}</span> {item.title}
              </strong>
              {item.status && <span className={listStyles.status}>{item.status}</span>}
            </div>
            {item.list && (
              <ul className={listStyles.list}>
                {item.list.map((child, index) => (
                  <li key={index}>
                    <p className={listStyles.label}>{child.label}</p>
                    {child.time && <span className={listStyles.time}>{child.time}</span>}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
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
