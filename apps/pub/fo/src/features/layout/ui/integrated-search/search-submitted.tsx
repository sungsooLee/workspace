import {
  IcoAiSymbol,
  IcoHeart,
  IcoNarrowRight,
  IcoPlus,
  IcoSearch,
  IcoWordArrow,
} from '@learnway/icons';
import { cn, getRandomId } from '@learnway/shared';
import { Badge } from '@learnway/ui/badge';

/* images */
import bannerImg from '@learnway/styles/fo/assets/images/banner/img_banner_sample.jpg';
import avatarImg from '@learnway/styles/fo/assets/images/menu/course/img_avatar.jpg';

/* styles */
import { Button } from '@learnway/ui/button';
import { ImageFallBack } from '@learnway/ui/image-fallback/image-fallback';
import { Link } from '@tanstack/react-router';
import ThumbnailList from '../../../../pages/-components/thumb/thumb-nail-list';
import styles from './search-submitted.module.css';

type linkListProps = {
  label: string;
  external?: boolean;
};

type wordListProps = {
  label: React.ReactNode;
  link?: string;
  showDeleteBtn?: boolean;
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
    },
    {
      label: '더 많은 콘텐츠를 한번에 볼래요',
      external: true,
    },
  ];
  const linkList2: linkListProps[] = [
    {
      label: '‘리더십’과  관련된 다른 검색어가 궁금해요',
      external: false,
    },
    {
      label: '학습 유형별로 골라보고 싶어요',
      external: true,
    },
    {
      label: '더 많은 콘텐츠를 한번에 볼래요',
      external: true,
    },
  ];

  const wordItems: wordListProps[] = [
    {
      label: (
        <span className={styles.label}>
          <em className={styles.point}>{'리더십'}</em> 강의 추천
        </span>
      ),
      link: '/',
    },
    {
      label: (
        <span className={styles.label}>
          일을 성장으로 바꾸는 법, 강의 추천 <em className={styles.point}>{'리더십'}</em>
        </span>
      ),
      link: '/',
    },
    {
      label: (
        <span className={styles.label}>
          신임 리더 생존 패키지 <em className={styles.point}>{'리더십'}</em> 올리기 강좌
        </span>
      ),
      link: '/',
    },
  ];

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
              <ImageFallBack imageUrl={bannerImg} className={styles.img_wrap} />
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
        {/* link list */}
        {linkList.length > 0 && (
          <ul className={styles.select_list}>
            {linkList.map((item, index) => (
              <li key={index}>
                <Button
                  className={styles.link}
                  label={item.label}
                  icon={item.external && <IcoPlus width={16} height={16} stroke="#131416" />}
                  size={'md'}
                  iconAlign={'right'}
                />
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
        {/* link list */}
        {linkList2.length > 0 && (
          <ul className={styles.select_list}>
            {linkList2.map((item, index) => (
              <li key={index}>
                <Button
                  className={styles.link}
                  label={item.label}
                  icon={item.external && <IcoPlus width={16} height={16} stroke="#131416" />}
                  iconAlign={'right'}
                  size={'md'}
                />
              </li>
            ))}
          </ul>
        )}
        {/* question_wrap */}
        <p className={styles.question_wrap}>
          <span className={styles.text}>
            {'‘리더십’과  관련된 다른 검색어가 궁금해요'}
            <IcoWordArrow className={styles.icon_arrow} />
          </span>
        </p>
        {/* title */}
        <div className={styles.title_wrap}>
          <strong className={styles.title}>
            <em className={styles.point}>{'리더십'}</em>과 관련해서 많은 사람들이 검색한 연관
            검색어를 추천해 드릴게요.
          </strong>
        </div>
        {/* word list */}
        {wordItems.length > 0 && (
          <ul className={styles.word_list}>
            {wordItems.map((item, index) => (
              <li key={index}>
                <IcoSearch className={styles.icon_search} />
                <Link to={item.link}>{item.label}</Link>
                <IcoNarrowRight className={styles.icon_arrow} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
