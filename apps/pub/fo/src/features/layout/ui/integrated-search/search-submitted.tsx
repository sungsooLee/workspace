import { IcoAiSymbol, IcoHeart, IcoPlus, IcoWordArrow } from '@learnway/icons';
import { cn, getRandomId } from '@learnway/shared';
import { Badge } from '@learnway/ui/badge';

/* images */
import bannerImg from '@learnway/styles/fo/assets/images/banner/img_banner_sample.jpg';
import avatarImg from '@learnway/styles/fo/assets/images/menu/course/img_avatar.jpg';

/* styles */
import { Thumbnail } from '@learnway/ui/thumbnail';
import { Link } from '@tanstack/react-router';
import ThumbnailList from '../../../../pages/-components/thumb/thumb-nail-list';
import styles from './search-submitted.module.css';

type linkListProps = {
  label: string;
  external?: boolean;
  linkUrl?: string;
};

export const SearchSubmitted: React.FC = () => {
  const items = ['이러닝', '리더십', '직무필수'];
  const bannerItems = [
    {
      imageUrl: bannerImg,
      title: '단번에 끌리는 메시지, 짧게 쓰는 카피라이팅 공식',
      labelCustomNode: [
        <Badge
          variant="text"
          status="primary"
          size="xs"
          option={{ label: '과정', value: `${getRandomId()}` }}
        />,
      ],
      toggleButton: true,
    },
    {
      imageUrl: bannerImg,
      title: '단번에 끌리는 메시지, 짧게 쓰는 카피라이팅 공식',
      labelCustomNode: [
        <Badge
          variant="text"
          status="primary"
          size="xs"
          option={{ label: '채널', value: `${getRandomId()}` }}
        />,
      ],
      toggleButton: true,
    },
    {
      imageUrl: bannerImg,
      title: '단번에 끌리는 메시지, 짧게 쓰는 카피라이팅 공식',
      labelCustomNode: [
        <Badge
          variant="text"
          status="primary"
          size="xs"
          option={{ label: '소모임', value: `${getRandomId()}` }}
        />,
      ],
      toggleButton: true,
    },
    {
      imageUrl: bannerImg,
      title: '단번에 끌리는 메시지, 짧게 쓰는 카피라이팅 공식',
      labelCustomNode: [
        <Badge
          variant="text"
          status="primary"
          size="xs"
          option={{ label: '패키지', value: `${getRandomId()}` }}
        />,
      ],
      toggleButton: true,
    },
    {
      imageUrl: bannerImg,
      title: '단번에 끌리는 메시지, 짧게 쓰는 카피라이팅 공식',
      labelCustomNode: [
        <Badge
          variant="text"
          status="primary"
          size="xs"
          option={{ label: '과정', value: `${getRandomId()}` }}
        />,
      ],
      toggleButton: true,
    },
    {
      imageUrl: bannerImg,
      title: '단번에 끌리는 메시지, 짧게 쓰는 카피라이팅 공식',
      labelCustomNode: [
        <Badge
          variant="text"
          status="primary"
          size="xs"
          option={{ label: '채널', value: `${getRandomId()}` }}
        />,
      ],
      toggleButton: true,
    },
    {
      imageUrl: bannerImg,
      title: '단번에 끌리는 메시지, 짧게 쓰는 카피라이팅 공식',
      labelCustomNode: [
        <Badge
          variant="text"
          status="primary"
          size="xs"
          option={{ label: '과정', value: `${getRandomId()}` }}
        />,
      ],
      toggleButton: true,
    },
    {
      imageUrl: bannerImg,
      title: '단번에 끌리는 메시지, 짧게 쓰는 카피라이팅 공식',
      labelCustomNode: [
        <Badge
          variant="text"
          status="primary"
          size="xs"
          option={{ label: '채널', value: `${getRandomId()}` }}
        />,
      ],
      toggleButton: true,
    },
  ];
  const linkList: linkListProps[] = [
    {
      label: '다른 맞춤 추천을 받을래요',
      external: false,
      linkUrl: '/',
    },
    {
      label: '더 많은 콘텐츠를 한번에 볼래요',
      external: true,
      linkUrl: '/',
    },
  ];

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault(); // 기본 이동 막기
    console.log('링크 클릭됨');
  };
  return (
    <div className={cn(styles.start, styles.search_submitted)}>
      <div className={styles.message_wrap}>
        {/* question_wrap */}
        <p className={styles.question_wrap}>
          <span className={styles.text}>
            {'리더십'}
            <IcoWordArrow className={styles.icon_arrow} />
          </span>
        </p>
        {/* title */}
        <div className={styles.title_wrap}>
          <strong className={styles.title}>
            <em className={styles.point}>{'리더십 인기 콘텐츠'}</em>입니다.
          </strong>
          <p className={styles.text}>{'동료들의 추천이 높은 순으로 보여드릴게요.'}</p>
        </div>
        {/* result_wrap */}
        <div className={styles.result_wrap}>
          {/* recommand_wrap */}
          <div className={styles.recommand_wrap}>
            <div className={styles.recommand_view}>
              <Thumbnail path={bannerImg} enableHover={false} />
              <div className={styles.info_wrap}>
                {items.length > 0 && (
                  <div className={styles.badge_wrap}>
                    {items.map((item, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        status="gray"
                        size="xs"
                        option={{ label: `${item}`, value: `${index}` }}
                      />
                    ))}
                  </div>
                )}

                <p className={styles.title}>
                  {'AI 리더십 : 창의력과 데이터가 만나는 리더십의 미래'}
                </p>
                <div className={styles.count_info}>
                  <span className={styles.attend_view}>
                    <img src={avatarImg} alt="" className={styles.img_avatar} />
                    <em className={styles.num}>
                      {`${new Intl.NumberFormat().format(2100)}`}
                      {'명'}
                    </em>
                    이 수강했어요
                  </span>
                  <span className={styles.favorite_view}>
                    <IcoHeart width={20} height={20} stroke="#F58B75" fill="#F58B75" />
                    <em>{`${new Intl.NumberFormat().format(9999)}`}</em>
                  </span>
                </div>
                <div className={styles.summary_view}>
                  <strong className={styles.tit_summary}>
                    <IcoAiSymbol width={12} height={12} className={styles.icon_symbol} />
                    {'AI가 요약한 과정 핵심내용'}
                  </strong>
                  <p className={styles.text}>
                    {'목표 없는 지시는 실행되지 않고, 피드백 없는 실행은 반복되지 않습니다. '}
                  </p>
                </div>
              </div>
            </div>
            <ThumbnailList items={bannerItems} cols={4} direction={'vertical'} />
          </div>
        </div>
        {/* title */}
        <div className={styles.title_wrap}>
          <strong className={styles.title}>
            <em className={styles.point}>{'리더십 콘텐츠'}</em>를 좀 더 알아보시겠어요?
          </strong>
        </div>
        {/* button list */}
        {linkList.length > 0 && (
          <ul className={styles.select_list}>
            {linkList.map((item, index) => (
              <li key={index}>
                <Link to={item.linkUrl} onClick={handleClick} className={styles.link}>
                  {item.label}
                  {item.external && <IcoPlus width={16} height={16} stroke="#131416" />}
                </Link>
              </li>
            ))}
          </ul>
        )}
        {/* question_wrap */}
        <p className={styles.question_wrap}>
          <span className={styles.text}>
            {'다른 맞춤 추천을 받을래요'}
            <IcoWordArrow className={styles.icon_arrow} />
          </span>
        </p>
        {/* title */}
        <div className={styles.title_wrap}>
          <strong className={styles.title}>
            <em className={styles.point}>{'리더십 다른 학습 콘텐츠'}</em>를 추천할게요.
          </strong>
          <p className={styles.text}>{'최근 관심도가 급증한 순으로 보여드릴게요.'}</p>
        </div>
        {/* result_wrap */}
        <div className={styles.result_wrap}>
          <ThumbnailList items={bannerItems} cols={4} direction={'vertical'} />
        </div>
        {/* title */}
        <div className={styles.title_wrap}>
          <strong className={styles.title}>
            <em className={styles.point}>{'찾으시는 콘텐츠'}</em>찾으시는 콘텐츠 가 없으시나요?
            원하시는 콘텐츠를 자세히 알려주시겠어요?
          </strong>
        </div>
      </div>
    </div>
  );
};
