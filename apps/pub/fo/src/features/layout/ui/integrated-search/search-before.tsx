import {
  IcoArrowDownFilled,
  IcoNarrowRight,
  IcoNudge01,
  IcoNudge03,
  IcoNudge04,
  IcoNudge05,
} from '@learnway/icons';
import { cn } from '@learnway/shared';
import { Button } from '@learnway/ui/button';
import { Link } from '@tanstack/react-router';

/* css */
import styles from './search-before.module.css';

/* image */
import cardImg from '@learnway/styles/fo/assets/images/banner/img_banner_sample.jpg';
import { ImageFallBack } from '@learnway/ui/image-fallback/image-fallback';

type btnProps = {
  label: string;
};

type cardProps = {
  imgUrl: string;
  label: string;
  text: string;
  link: string;
};

type keywordProps = {
  iconNode?: React.ReactNode;
  label: string;
  link: string;
};

export const SearchBefore: React.FC = () => {
  const items: btnProps[] = [
    { label: '실무세례 중심 학습' },
    { label: '현직자 피드백 제공' },
    { label: '프로그래밍 스킬 성장' },
    { label: '중급 이상 난이도에 적합' },
    { label: '프로그래밍 스킬 성장' },
    { label: '마케터 필수 역량' },
    { label: '경쟁사 벤치마크 잘하는 방법' },
    { label: '소셜 캠페인 트렌드' },
  ];

  const items2: btnProps[] = [
    { label: 'AI 교육' },
    { label: '현직자 피드백 제공' },
    { label: '리더십' },
    { label: '데이터 드리븐' },
    { label: '아이오닉9' },
  ];

  const items3: cardProps[] = [
    {
      imgUrl: cardImg,
      label: '한 문장으로 끌리는 세일즈 : 고객을 움직이는 말하기 전략',
      text: '00:30',
      link: '/',
    },
    {
      imgUrl: cardImg,
      label: '2024년 소비자는 무엇에 반응하는가 : MZ 세대 마케팅 인사이트',
      text: '00:30',
      link: '/',
    },
    {
      imgUrl: cardImg,
      label: '한 문장으로 끌리는 세일즈 : 고객을 움직이는 말하기 전략',
      text: '00:30',
      link: '/',
    },
    {
      imgUrl: cardImg,
      label: '2024년 소비자는 무엇에 반응하는가 : MZ 세대 마케팅 인사이트',
      text: '00:30',
      link: '/',
    },
  ];

  const items4: keywordProps[] = [
    {
      iconNode: <IcoArrowDownFilled width={12} height={12} className={styles.icon_up} />,
      label: 'Confluence',
      link: '/',
    },
    {
      iconNode: <IcoArrowDownFilled width={12} height={12} className={styles.icon_same} />,
      label: '글로벌 커뮤니케이션',
      link: '/',
    },
    {
      iconNode: <IcoArrowDownFilled width={12} height={12} className={styles.icon_down} />,
      label: '데이터 드리븐',
      link: '/',
    },
    {
      iconNode: <IcoArrowDownFilled width={12} height={12} className={styles.icon_down} />,
      label: '데이터 드리븐',
      link: '/',
    },
    {
      iconNode: <IcoArrowDownFilled width={12} height={12} className={styles.icon_down} />,
      label: '데이터 드리븐2',
      link: '/',
    },
    {
      iconNode: <IcoArrowDownFilled width={12} height={12} className={styles.icon_down} />,
      label: '데이터 드리븐3',
      link: '/',
    },
  ];

  return (
    <div className={cn(styles.start, styles.search_before)}>
      {/* title */}
      <div className={styles.title_wrap}>
        <IcoNudge03 width={24} height={24} className={styles.title_icon} />
        <strong className={styles.title}>{'처음이라면 가볍게 시작해보는게 어떠세요?'}</strong>
      </div>
      {/* button list */}
      {items.length > 0 && (
        <div className={styles.btn_list}>
          {items.map((item, index) => (
            <Button key={index} label={item.label} className={styles.btn} size={'md'} />
          ))}
        </div>
      )}
      {/* title */}
      <div className={styles.title_wrap}>
        <IcoNudge01 width={24} height={24} className={styles.title_icon} />
        <strong className={styles.title}>
          {'벌써 감 잡으셨나요? 어울릴 만한 과정도 골라봤어요!'}
        </strong>
      </div>
      {/* button list */}
      {items2.length > 0 && (
        <div className={styles.btn_list}>
          {items2.map((item, index) => (
            <Button key={index} label={item.label} className={styles.btn} size={'md'} />
          ))}
        </div>
      )}
      {/* title */}
      <div className={styles.title_wrap}>
        <IcoNudge04 width={24} height={24} className={styles.title_icon} />
        <strong className={styles.title}>
          {'벌써 감 잡으셨나요? 어울릴 만한 과정도 골라봤어요!'}
        </strong>
      </div>
      {/* card list */}
      {items3.length > 0 && (
        <ul className={styles.card_list}>
          {items3.map((item, index) => (
            <li key={index}>
              <Link to={item.link} className={styles.link}>
                <div className={styles.img_wrap}>
                  <ImageFallBack imageUrl={item.imgUrl} />
                </div>
                <div className={styles.info}>
                  <strong className={styles.label}>{item.label}</strong>
                  <span className={styles.text}>{item.text}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
      {/* title */}
      <div className={styles.title_wrap}>
        <IcoNudge05 width={24} height={24} className={styles.title_icon} />
        <strong className={styles.title}>{'열정적인 당신, 요즘 핫한 키워드 추천해요!'}</strong>
      </div>
      {/* keyword list */}
      {items4.length > 0 && (
        <ul className={styles.keyword_list}>
          {items4.map((item, index) => (
            <li key={index}>
              <Link to={item.link} className={styles.link}>
                <strong className={styles.index}>{index + 1}</strong>
                {item.iconNode && <span className={styles.icon_area}>{item.iconNode}</span>}
                <span className={styles.label}>{item.label}</span>
                <IcoNarrowRight
                  width={16}
                  height={16}
                  stroke={'#B7BBC3'}
                  className={styles.icon_arrow}
                />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
