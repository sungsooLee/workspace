import { useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { ChipList, SelectOption, Accordion, Button, useToast } from '@learnway/ui';
import { cn } from '@learnway/shared';
import {
  IcoHeart,
  IcoUser01,
  IcoArrowDown,
  IcoPlay,
  IcoRating,
  IcoEye,
  IcoPhone02,
  IcoMonitor01,
} from '@learnway/icons';
import { MobileView } from 'react-device-detect';
import { MobileContainerFooter } from '../../../shared/m.ui/container-footer/container-footer';

import {
  CourseFixedButton, // 수강신청 버튼
} from '../../../features/layout';

import operatorStyles from './operator.module.css';
import definitionListStyles from './definition-list.module.css';
import packageInformationStyles from './package-information.module.css';
import thumnailStyles from '../../../shared/ui/thumnail/thumnail.module.css';
import thumnailImgStyles from '../../../shared/ui/thumnail/thumnail-img.module.css';
import styles from './package-m.module.css';

// 예시 이미지
import listImage1 from '@learnway/styles/fo/assets/images/temp/category_product_01.png';
import package1 from '@learnway/styles/fo/assets/images/temp/img_package_01.png';
import logoHyundai from '@learnway/styles/fo/assets/images/common/logo_hyundai.png';

export const Route = createFileRoute('/_layout/course-introduction/package-m')({
  component: RouteComponent,
});

function RouteComponent() {
  const options: SelectOption[] = [
    { label: '스마트팩토리', value: 'A' },
    { label: '디지털혁신', value: 'B' },
    { label: '정보보안기술', value: 'C' },
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

  // 공통 컴포넌트 수정 요청중 (수정예정)
  // toast popup
  const { open: openToast } = useToast();
  const handleClickToast = () => {
    openToast({
      title: '채널을 구독하였습니다',
    });
  };

  // 패키지 자세한 정보 아코디언
  const [packageInformation, setPackageInformation] = useState(true);

  const [value2, setValue2] = useState<string>('');
  const dummyItems2 = [
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
          <ul>
            <li>
              {/* thumnail module */}
              <div
                className={cn(
                  thumnailStyles.start,
                  thumnailStyles.thumbnail,
                  thumnailStyles.vertical,
                )}
              >
                {/* link (찜 기능과 겹침으로 따로 빠짐) */}
                <Link to="" className={thumnailStyles.link}></Link>

                <div className={thumnailStyles.thumnail_box}>
                  {/* img */}
                  <div className={`${thumnailImgStyles.start} ${thumnailImgStyles.img_box}`}>
                    <ul className={thumnailImgStyles.label}>
                      <li style={{ backgroundColor: '#00afd5' }}>New</li>
                    </ul>
                    <div className={thumnailImgStyles.img}>
                      <img src={listImage1} alt="" />
                    </div>
                  </div>
                  {/* txt */}
                  <div className={thumnailStyles.text_box}>
                    <div className={thumnailStyles.type}>
                      {/* type */}
                      <span className={thumnailStyles.txt}>동영상</span>
                      <span className={thumnailStyles.time}>
                        {/* time icon */}
                        <IcoPlay width={12} height={12} fill="#6f798b" />
                        {/* time */}
                        04:59
                      </span>
                    </div>
                    <p className={thumnailStyles.text}>필수개발과정</p>
                  </div>
                </div>
              </div>
            </li>
            <li>
              {/* thumnail module */}
              <div
                className={cn(
                  thumnailStyles.start,
                  thumnailStyles.thumbnail,
                  thumnailStyles.vertical,
                )}
              >
                {/* link (찜 기능과 겹침으로 따로 빠짐) */}
                <Link to="" className={thumnailStyles.link}></Link>

                <div className={thumnailStyles.thumnail_box}>
                  {/* img */}
                  <div className={`${thumnailImgStyles.start} ${thumnailImgStyles.img_box}`}>
                    <ul className={thumnailImgStyles.label}>
                      <li style={{ backgroundColor: '#00afd5' }}>New</li>
                    </ul>
                    <div className={thumnailImgStyles.img}>
                      <img src={listImage1} alt="" />
                    </div>
                  </div>
                  {/* txt */}
                  <div className={thumnailStyles.text_box}>
                    <div className={thumnailStyles.type}>
                      {/* type */}
                      <span className={thumnailStyles.txt}>동영상</span>
                      <span className={thumnailStyles.time}>
                        {/* time icon */}
                        <IcoPlay width={12} height={12} fill="#6f798b" />
                        {/* time */}
                        04:59
                      </span>
                    </div>
                    <p className={thumnailStyles.text}>필수개발과정</p>
                  </div>
                </div>
              </div>
            </li>
            <li>
              {/* thumnail module */}
              <div
                className={cn(
                  thumnailStyles.start,
                  thumnailStyles.thumbnail,
                  thumnailStyles.vertical,
                )}
              >
                {/* link (찜 기능과 겹침으로 따로 빠짐) */}
                <Link to="" className={thumnailStyles.link}></Link>

                <div className={thumnailStyles.thumnail_box}>
                  {/* img */}
                  <div className={`${thumnailImgStyles.start} ${thumnailImgStyles.img_box}`}>
                    <ul className={thumnailImgStyles.label}>
                      <li style={{ backgroundColor: '#00afd5' }}>New</li>
                    </ul>
                    <div className={thumnailImgStyles.img}>
                      <img src={listImage1} alt="" />
                    </div>
                  </div>
                  {/* txt */}
                  <div className={thumnailStyles.text_box}>
                    <div className={thumnailStyles.type}>
                      {/* type */}
                      <span className={thumnailStyles.txt}>동영상</span>
                      <span className={thumnailStyles.time}>
                        {/* time icon */}
                        <IcoPlay width={12} height={12} fill="#6f798b" />
                        {/* time */}
                        04:59
                      </span>
                    </div>
                    <p className={thumnailStyles.text}>필수개발과정</p>
                  </div>
                </div>
              </div>
            </li>
            <li>
              {/* thumnail module */}
              <div
                className={cn(
                  thumnailStyles.start,
                  thumnailStyles.thumbnail,
                  thumnailStyles.vertical,
                )}
              >
                {/* link (찜 기능과 겹침으로 따로 빠짐) */}
                <Link to="" className={thumnailStyles.link}></Link>

                <div className={thumnailStyles.thumnail_box}>
                  {/* img */}
                  <div className={`${thumnailImgStyles.start} ${thumnailImgStyles.img_box}`}>
                    <ul className={thumnailImgStyles.label}>
                      <li style={{ backgroundColor: '#00afd5' }}>New</li>
                    </ul>
                    <div className={thumnailImgStyles.img}>
                      <img src={listImage1} alt="" />
                    </div>
                  </div>
                  {/* txt */}
                  <div className={thumnailStyles.text_box}>
                    <div className={thumnailStyles.type}>
                      {/* type */}
                      <span className={thumnailStyles.txt}>동영상</span>
                      <span className={thumnailStyles.time}>
                        {/* time icon */}
                        <IcoPlay width={12} height={12} fill="#6f798b" />
                        {/* time */}
                        04:59
                      </span>
                    </div>
                    <p className={thumnailStyles.text}>필수개발과정</p>
                  </div>
                </div>
              </div>
            </li>
          </ul>
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
          <ul>
            <li>
              {/* thumnail module */}
              <div
                className={cn(
                  thumnailStyles.start,
                  thumnailStyles.thumbnail,
                  thumnailStyles.vertical,
                )}
              >
                {/* link (찜 기능과 겹침으로 따로 빠짐) */}
                <Link to="" className={thumnailStyles.link}></Link>

                <div className={thumnailStyles.thumnail_box}>
                  {/* img */}
                  <div className={`${thumnailImgStyles.start} ${thumnailImgStyles.img_box}`}>
                    <ul className={thumnailImgStyles.label}>
                      <li style={{ backgroundColor: '#00afd5' }}>New</li>
                    </ul>
                    <div className={thumnailImgStyles.img}>
                      <img src={listImage1} alt="" />
                    </div>
                  </div>
                  {/* txt */}
                  <div className={thumnailStyles.text_box}>
                    <div className={thumnailStyles.type}>
                      {/* type */}
                      <span className={thumnailStyles.txt}>동영상</span>
                      <span className={thumnailStyles.time}>
                        {/* time icon */}
                        <IcoPlay width={12} height={12} fill="#6f798b" />
                        {/* time */}
                        04:59
                      </span>
                    </div>
                    <p className={thumnailStyles.text}>필수개발과정</p>
                  </div>
                </div>
              </div>
            </li>
            <li>
              {/* thumnail module */}
              <div
                className={cn(
                  thumnailStyles.start,
                  thumnailStyles.thumbnail,
                  thumnailStyles.vertical,
                )}
              >
                {/* link (찜 기능과 겹침으로 따로 빠짐) */}
                <Link to="" className={thumnailStyles.link}></Link>

                <div className={thumnailStyles.thumnail_box}>
                  {/* img */}
                  <div className={`${thumnailImgStyles.start} ${thumnailImgStyles.img_box}`}>
                    <ul className={thumnailImgStyles.label}>
                      <li style={{ backgroundColor: '#00afd5' }}>New</li>
                    </ul>
                    <div className={thumnailImgStyles.img}>
                      <img src={listImage1} alt="" />
                    </div>
                  </div>
                  {/* txt */}
                  <div className={thumnailStyles.text_box}>
                    <div className={thumnailStyles.type}>
                      {/* type */}
                      <span className={thumnailStyles.txt}>동영상</span>
                      <span className={thumnailStyles.time}>
                        {/* time icon */}
                        <IcoPlay width={12} height={12} fill="#6f798b" />
                        {/* time */}
                        04:59
                      </span>
                    </div>
                    <p className={thumnailStyles.text}>필수개발과정</p>
                  </div>
                </div>
              </div>
            </li>
            <li>
              {/* thumnail module */}
              <div
                className={cn(
                  thumnailStyles.start,
                  thumnailStyles.thumbnail,
                  thumnailStyles.vertical,
                )}
              >
                {/* link (찜 기능과 겹침으로 따로 빠짐) */}
                <Link to="" className={thumnailStyles.link}></Link>

                <div className={thumnailStyles.thumnail_box}>
                  {/* img */}
                  <div className={`${thumnailImgStyles.start} ${thumnailImgStyles.img_box}`}>
                    <ul className={thumnailImgStyles.label}>
                      <li style={{ backgroundColor: '#00afd5' }}>New</li>
                    </ul>
                    <div className={thumnailImgStyles.img}>
                      <img src={listImage1} alt="" />
                    </div>
                  </div>
                  {/* txt */}
                  <div className={thumnailStyles.text_box}>
                    <div className={thumnailStyles.type}>
                      {/* type */}
                      <span className={thumnailStyles.txt}>동영상</span>
                      <span className={thumnailStyles.time}>
                        {/* time icon */}
                        <IcoPlay width={12} height={12} fill="#6f798b" />
                        {/* time */}
                        04:59
                      </span>
                    </div>
                    <p className={thumnailStyles.text}>필수개발과정</p>
                  </div>
                </div>
              </div>
            </li>
            <li>
              {/* thumnail module */}
              <div
                className={cn(
                  thumnailStyles.start,
                  thumnailStyles.thumbnail,
                  thumnailStyles.vertical,
                )}
              >
                {/* link (찜 기능과 겹침으로 따로 빠짐) */}
                <Link to="" className={thumnailStyles.link}></Link>

                <div className={thumnailStyles.thumnail_box}>
                  {/* img */}
                  <div className={`${thumnailImgStyles.start} ${thumnailImgStyles.img_box}`}>
                    <ul className={thumnailImgStyles.label}>
                      <li style={{ backgroundColor: '#00afd5' }}>New</li>
                    </ul>
                    <div className={thumnailImgStyles.img}>
                      <img src={listImage1} alt="" />
                    </div>
                  </div>
                  {/* txt */}
                  <div className={thumnailStyles.text_box}>
                    <div className={thumnailStyles.type}>
                      {/* type */}
                      <span className={thumnailStyles.txt}>동영상</span>
                      <span className={thumnailStyles.time}>
                        {/* time icon */}
                        <IcoPlay width={12} height={12} fill="#6f798b" />
                        {/* time */}
                        04:59
                      </span>
                    </div>
                    <p className={thumnailStyles.text}>필수개발과정</p>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      ),
    },
  ];

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
              <IcoHeart width={16} height={16} stroke="#6f798b" fill="none" />
              <span>500</span>
            </div>
            <div className={packageInformationStyles.box}>
              <IcoUser01 width={16} height={16} stroke="#6f798b" />
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
            {/* definition module */}
            <div className={`${definitionListStyles.start} ${definitionListStyles.list}`}>
              <dl>
                <dt>학습유형</dt>
                <dd>패키지</dd>
              </dl>
              <dl>
                <dt>카테고리</dt>
                <dd>
                  Quality &gt; Service &gt; Hydrogen/Electricity &gt; Ioniq 5 &gt; NE PE &gt;
                  Technical Information
                </dd>
              </dl>
            </div>
          </div>
          {/* 구독 */}
          <div className={packageInformationStyles.subscribe_box}>
            <span className={packageInformationStyles.channel}>
              <img src={logoHyundai} alt="" />
            </span>
            <strong className={packageInformationStyles.channel_name}>현대오토에버 (elBls)</strong>
            <Button
              className={packageInformationStyles.btn_subscribe}
              variant="primary"
              size="sm"
              onClick={() => handleClickToast()}
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
          <ChipList options={options} prefixCharacter="#" hideCloseButton />
        </div>
      </div>

      <div className={styles.sub_package}>
        <Accordion
          items={dummyItems2}
          value={value2}
          onValueChange={(value2) => setValue2(value2 as string)}
          type={'multiple'}
        />
      </div>

      <div className={styles.operator_box}>
        <strong>과정 운영자</strong>
        {/* operator */}
        <div className={`${operatorStyles.start} ${operatorStyles.operator}`}>
          <div className={operatorStyles.avatar}>
            <span>김</span>
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
