import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';

import { getRandomId } from '@learnway/shared';
import {
  IcoHeart,
  IcoStar,
  IcoBook,
  IcoBuilding,
  IcoCategory,
  IcoDivice,
  IcoLevel,
  IcoLocation,
  IcoPrize,
  IcoSubtitles02,
  IcoTime,
  IcoEye,
  IcoArrowDown,
  IcoPlay,
  IcoChevronDown,
} from '@learnway/icons';
import {
  CourseFixedButton, // 수강신청 버튼
} from '../../../features/layout';
import ThumbnailList from '../../-components/thumb/thumb-nail-list';

import pageContentsStyles from '../../_page-contents.module.css';
import operatorStyles from './operator.module.css';
import definitionListStyles from './definition-list.module.css';
import packageInformationStyles from './package-information.module.css';

import styles from './package.module.css';

// 이미지
import listImage1 from '@learnway/styles/fo/assets/images/temp/category_product_01.png';
import package1 from '@learnway/styles/fo/assets/images/temp/img_package_01.png';
import logoHyundai from '@learnway/styles/fo/assets/images/common/logo_hyundai.png';
import avatarDefault from '@learnway/styles/fo/assets/images/common/img_avatar.png';
import bannerImg from '@learnway/styles/fo/assets/images/banner/img_banner_sample.jpg';
import { SelectOption } from '@learnway/ui/type';
import { Badge } from '@learnway/ui/badge';
import { useToast } from '@learnway/ui/toast';
import { Button } from '@learnway/ui/button';
import { ChipList } from '@learnway/ui/chips';
import { Accordion } from '@learnway/ui/accordion';
import { Avatar } from '@learnway/ui/avatar';

export const Route = createFileRoute('/_layout/course-introduction/package')({
  component: RouteComponent,
});

function RouteComponent() {
  const tagValue: SelectOption[] = [
    { label: '스마트팩토리', value: 'A' },
    { label: '디지털혁신', value: 'B' },
    { label: '정보보안기술', value: 'C' },
    { label: '정보보안기술', value: 'D' },
    { label: '정보보안기술', value: 'E' },
    { label: '정보보안기술', value: 'F' },
    { label: '정보보안기술', value: 'G' },
  ];

  // 퍼블수정 20250724 썸네일 item 추가
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

  // toast popup (공통)
  const { open: openToast } = useToast();
  const handleSubscribeToast = () => {
    openToast({
      title: '채널을 구독하였습니다.',
      // actionLabel: '버튼',
      type: 'success',
      // onActionClick: () => {
      //   console.log('버튼 클릭');
      // },
    });
  };

  const [subPackageValue, setSubPackageValue] = useState<string>('a');
  const subPackageValueOptions = [
    {
      value: 'a',
      title: (
        <div className={styles.sub_package_title}>
          <span className={styles.number}>1</span>
          <strong>
            서브 패키지 1 타이틀<em>9</em>
          </strong>
          <p>
            서브 패키지 1에 대한 소개 서브 패키지 1에 대한 소개 서브 패키지 1에 대한 소개 서브
            패키지 1에 대한 소개
          </p>
        </div>
      ),
      children: (
        <div className={styles.sub_package_content}>
          {/* 퍼블수정 20250724 썸네일 추가 */}
          <ThumbnailList items={item} cols={3} />
          <div className={styles.btn_box}>
            <Button variant="secondary" size="lx">
              더보기
              <IcoChevronDown width={16} height={16} stroke="#131416" />
            </Button>
          </div>
        </div>
      ),
    },
    {
      value: 'b',
      title: (
        <div className={styles.sub_package_title}>
          <span className={styles.number}>2</span>
          <strong>
            서브 패키지 2 타이틀<em>5</em>
          </strong>
          <p>
            서브 패키지 2에 대한 소개서브 패키지 2에 대한 소개서브 패키지 2에 대한 소개서브 패키지
            2에 대한 소개서브 패키지 2에 대한 소개
          </p>
        </div>
      ),
      children: (
        <div className={styles.sub_package_content}>
          {/* 퍼블수정 20250724 썸네일 추가 */}
          <ThumbnailList items={item} cols={3} />
        </div>
      ),
    },
  ];

  // 학습유형 리스트 open, close
  const [listCategoryOpen, setListCategoryOpen] = useState<boolean>(true);
  const [listSubTitleOpen, setListSubTitleOpen] = useState<boolean>(false);

  return (
    <div className={`${styles.start} ${styles.package_wrap}`}>
      {/* page contents */}
      <div className={pageContentsStyles.start}>
        {/* main content */}
        <div className={pageContentsStyles.main_contents}>
          <div className={styles.thumbnail_img}>
            <img src={listImage1} alt="" />
          </div>
          <div className={styles.package_txt_box}>
            <strong>패키지소개</strong>
            <p>
              패키지에 대한 소개 공백포함 한글 300자 패키지에 대한 소개 공백포함 한글 300자 패키지에
              대한 소개 공백포함 한글 300자 패키지에 대한 소개 공백패키지에 대한 소개 공백포함 한글
              300자 패키지에 대한 소개 공백포
            </p>
          </div>
          <div className={styles.package_box}>
            <div className={styles.img_box}>
              <img src={package1} alt="" />
            </div>
            <div className={styles.chip_box}>
              <ChipList options={tagValue} prefixCharacter="#" hideCloseButton />
            </div>
          </div>

          <div className={styles.sub_package}>
            <Accordion
              items={subPackageValueOptions}
              value={subPackageValue}
              onValueChange={(value2) => setSubPackageValue(value2 as string)}
              type={'multiple'}
            />
          </div>

          <div className={styles.operator_box}>
            <strong>과정 운영자</strong>
            {/* operator */}
            <div className={`${operatorStyles.start} ${operatorStyles.operator}`}>
              <div className={operatorStyles.avatar}>
                <Avatar imageUrl={avatarDefault} className={styles.info_avata} size="2xl" />
              </div>
              <div className={operatorStyles.txt_box}>
                <div className={operatorStyles.profile}>
                  <strong>김지민 책임</strong>
                  <div>
                    <span>현대오토에버</span>
                    <span>L&D플랫폼팀</span>
                  </div>
                </div>
                <div className={operatorStyles.definition_list}>
                  {/* definition list */}
                  <div className={`${definitionListStyles.start} ${definitionListStyles.list}`}>
                    <dl>
                      <dt>이메일</dt>
                      <dd>abc@hyundai.conm</dd>
                    </dl>
                    <dl>
                      <dt>전화</dt>
                      <dd>02-555-2323</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* sub content */}
        <div className={pageContentsStyles.sub_contents}>
          <div className={styles.sub_box}>
            {/* packageInformationStyles module */}
            <div
              className={`${packageInformationStyles.start} ${packageInformationStyles.information}`}
            >
              <strong className={packageInformationStyles.tit}>
                패키지 타이틀패키지 타이틀패키지 타이틀패키지 타이틀패키지 타이틀
              </strong>
              {/* 퍼블수정 20250624 아이콘 변경 및 색상 수정 */}
              <div className={packageInformationStyles.count_box}>
                <div className={packageInformationStyles.box}>
                  <IcoStar width={16} height={16} stroke="#0056ff" fill="#0056ff" />
                  <span>4.2</span>
                </div>
                <div className={packageInformationStyles.box}>
                  <IcoHeart width={16} height={16} stroke="#f58b75" fill="#f58b75" />
                  <span>500</span>
                </div>
                <div className={packageInformationStyles.box}>
                  <IcoEye width={16} height={16} stroke="#0056ff" />
                  <span>77,500</span>
                </div>
              </div>
              {/* 구독 */}
              <div className={packageInformationStyles.subscribe_box}>
                {/* 퍼블수정 20250624 로고 삭제 */}
                <strong className={packageInformationStyles.channel_name}>
                  현대오토에버 (elBls)
                </strong>
                <Button
                  className={packageInformationStyles.btn_subscribe}
                  variant="primary"
                  size="xl"
                  onClick={() => handleSubscribeToast()}
                >
                  구독하기
                </Button>
              </div>
              {/* 학습정보 */}
              <div className={packageInformationStyles.list_box}>
                <ul>
                  <li>
                    <IcoBook width={20} height={20} stroke="#4d525c" fill="none" />
                    <p>동영상</p>
                  </li>
                  <li className={listCategoryOpen === true ? packageInformationStyles.open : ''}>
                    <IcoCategory width={20} height={20} fill="#4d525c" />
                    <p>Quality Service Hydrogen/Electricitysf Service Hydrogen/Electricitysf</p>
                    <Button
                      onClick={() =>
                        listCategoryOpen === true
                          ? setListCategoryOpen(false)
                          : setListCategoryOpen(true)
                      }
                    >
                      <IcoArrowDown width={20} height={20} stroke="#4d525c" />
                    </Button>
                  </li>
                  <li>
                    <IcoLocation width={20} height={20} stroke="#4d525c" />
                    <p>온라인 비대면</p>
                  </li>
                  <li>
                    <IcoTime width={20} height={20} fill="#4d525c" />
                    <p>1시간 24분</p>
                  </li>
                  <li>
                    <IcoBuilding width={20} height={20} fill="#4d525c" />
                    <p>야나두</p>
                  </li>
                  <li>
                    <IcoDivice width={20} height={20} fill="#4d525c" />
                    <p>앱, 웹, 모바일전용, 사외IP전용</p>
                  </li>
                  <li>
                    <IcoLevel width={20} height={20} fill="#4d525c" />
                    <p>중급</p>
                  </li>
                  <li>
                    <IcoPrize width={20} height={20} fill="#4d525c" />
                    <p>발급</p>
                  </li>
                  <li className={listSubTitleOpen === true ? packageInformationStyles.open : ''}>
                    <IcoSubtitles02 width={20} height={20} fill="#4d525c" />
                    <p>
                      한국어, Aracic, Chinese Taiwan, Deutsch, English, Frensh, Indonesian,
                      Japanese, Malay, Nepali, Portuguese
                    </p>
                    <Button
                      onClick={() =>
                        listSubTitleOpen === true
                          ? setListSubTitleOpen(false)
                          : setListSubTitleOpen(true)
                      }
                    >
                      <IcoArrowDown width={20} height={20} stroke="#4d525c" />
                    </Button>
                  </li>
                </ul>
              </div>

              {/* 찜/공유 수강신청 Button */}
              <div className={styles.course_btn_wrap}>
                <CourseFixedButton course={true} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
