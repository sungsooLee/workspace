import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { ChipList, SelectOption, Accordion, Button, useToast, Avatar } from '@learnway/ui';
import {
  IcoHeart,
  IcoArrowDown,
  IcoEye,
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
} from '@learnway/icons';
import { MobileView } from 'react-device-detect';
import { MobileContainerFooter } from '../../../shared/m.ui/container-footer/container-footer';

import {
  CourseFixedButton, // 수강신청 버튼
} from '../../../features/layout';

import operatorStyles from './operator.module.css';
import definitionListStyles from './definition-list.module.css';
import packageInformationStyles from './package-information.module.css';
import styles from './package-m.module.css';

// 예시 이미지
import listImage1 from '@learnway/styles/fo/assets/images/temp/category_product_01.png';
import package1 from '@learnway/styles/fo/assets/images/temp/img_package_01.png';
import avatarDefault from '@learnway/styles/fo/assets/images/common/img_avatar.png';

export const Route = createFileRoute('/_layout/course-introduction/package-m')({
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

  // 썸네일 찜
  const [icoHeart, setIcoHeart] = useState(true);
  const handleHeartClick = () => {
    if (icoHeart === true) {
      setIcoHeart(false);
    } else {
      setIcoHeart(true);
    }
  };

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

  // 패키지 자세한 정보 아코디언
  const [packageInformation, setPackageInformation] = useState(true);

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
      children: <div className={styles.sub_package_content}>공통 컴포넌트 대기중</div>,
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
      children: <div className={styles.sub_package_content}>공통 컴포넌트 대기중</div>,
    },
  ];

  // 학습유형 리스트 open, close
  const [listCategoryOpen, setListCategoryOpen] = useState<boolean>(true);
  const [listSubTitleOpen, setListSubTitleOpen] = useState<boolean>(false);

  return (
    <div className={`${styles.start} ${styles.package_wrap}`}>
      <div className={styles.thumbnail_img}>
        <img src={listImage1} alt="" />
      </div>

      <div className={styles.sub_box}>
        {/* package information */}
        <div
          className={`${packageInformationStyles.start} ${packageInformationStyles.information}`}
        >
          <strong className={packageInformationStyles.tit}>
            패키지 타이틀패키지 타이틀패키지 타이틀패키지 타이틀패키지 타이틀
          </strong>
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

            <Button
              className={`${packageInformationStyles.btn_acc} ${packageInformation === true ? packageInformationStyles.active : ''}`}
              onClick={() =>
                packageInformation === true
                  ? setPackageInformation(false)
                  : setPackageInformation(true)
              }
            >
              {packageInformation === true ? '닫기' : '자세히'}
              <IcoArrowDown width={16} height={16} stroke="#6f798b" />
            </Button>
          </div>
          {/* 학습정보 */}
          <div
            className={`${packageInformationStyles.list_box} ${packageInformation === true ? packageInformationStyles.active : ''}`}
          >
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
                  한국어, Aracic, Chinese Taiwan, Deutsch, English, Frensh, Indonesian, Japanese,
                  Malay, Nepali, Portuguese
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
          {/* 구독 */}
          <div className={packageInformationStyles.subscribe_box}>
            <strong className={packageInformationStyles.channel_name}>현대오토에버 (elBls)</strong>
            <Button
              className={packageInformationStyles.btn_subscribe}
              variant="primary"
              size="md"
              onClick={() => handleSubscribeToast()}
            >
              구독하기
            </Button>
          </div>
        </div>
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
            <Avatar imageUrl={avatarDefault} size="xl" className={styles.info_avata} />
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
              {/* definition module */}
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

      {/* button fix */}
      <MobileView>
        <MobileContainerFooter>
          {/* 찜/공유 Button */}
          <CourseFixedButton course={false} />
        </MobileContainerFooter>
      </MobileView>
    </div>
  );
}
