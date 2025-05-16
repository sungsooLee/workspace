import { useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { cn } from '@learnway/shared';
import { Button, Tabs, useModal, Textarea, Accordion } from '@learnway/ui';
import { IcoHeart, IcoUser01, IcoArrowDown, IcoPlay } from '@learnway/icons';
import { MobileView } from 'react-device-detect';
import { MobileContainerFooter } from '../../../shared/m.ui/container-footer/container-footer';

import {
  CourseDashboard,
  CourseIntroduction,
  CourseInformationPopup, // 수강신청 불가 팝업창들 및 반려 팝업
  CourseFixedButton, // 수강신청 버튼
} from '../../../features/layout';

import packageSideStyles from './package-side.module.css';
import relatedSideStyles from './related-side.module.css';
import thumnailStyles from '../../../shared/ui/thumnail/thumnail.module.css';
import thumnailImgStyles from '../../../shared/ui/thumnail/thumnail-img.module.css';
import formStyles from '@learnway/styles/fo/assets/styles/modules/form.module.css';
import definitionListStyles from './definition-list.module.css';
import packageInformationStyles from './package-information.module.css';
import styles from './detail-m.module.css';

// 예시 이미지
import bnrImage1 from '@learnway/styles/fo/assets/images/temp/category_product_01.png';
import logoHyundai from '@learnway/styles/fo/assets/images/common/logo_hyundai.png';
import playImg from '@learnway/styles/fo/assets/images/common/img_play.png';

export const Route = createFileRoute('/_layout/course-introduction/detail-m')({
  component: RouteComponent,
});

function RouteComponent() {
  const { open: openModal } = useModal();
  const { confirm: openConfirm } = useModal();
  const { alert: openAlert } = useModal();

  // 패키지 자세한 정보 아코디언
  const [packageInformation, setPackageInformation] = useState(true);

  // 탭
  const [selectedTabKey, setSelectedTabKey] = useState<string>('');
  const [selectedTabTitle, setSelectedTabTitle] = useState<number>(0);

  // 탭 타이틀
  const tabTitle = [
    { title: '대시보드', key: 'a' },
    { title: '과정소개', key: 'b' },
    { title: '후기', count: '0', key: 'b' }, // 과정소개 탭 안에서 후기가 있기 때문에 key값 동일
  ];
  const handleTab = (key: string, index: number) => {
    setSelectedTabKey(key);
    setSelectedTabTitle(index);
  };

  const items = [
    {
      title: '대시보드',
      key: 'a',
      content: (
        <div className={styles.dashboard_content}>
          <CourseDashboard />
        </div>
      ),
    },
    {
      title: '과정소개',
      key: 'b',
      content: (
        <div className={styles.introduction_content}>
          <CourseIntroduction />
        </div>
      ),
    },
  ];

  // 수강신청 취소 신청
  const CourseCencelConfirm = () => {
    openConfirm({
      title: <>수강 신청을 취소하시겠습니까?</>,
      content: (
        <>
          지금 취소하실 경우,
          <br />
          다시 수강신청을 해주셔야 합니다.
        </>
      ),
      okButtonLabel: '취소하기',
      cancelButtonLabel: '아니요',
    });
  };

  // 수강신청 취소 사유 입력
  const CourseCencelReasonConfirm = () => {
    openConfirm({
      title: <>수강신청 취소 사유를 입력해주세요</>,
      content: (
        <div className={`${formStyles.form_item} ${styles.form_item}`}>
          <div className={formStyles.input_box}>
            <Textarea
              id="textarea"
              rows={2}
              cols={2}
              resize="none"
              placeholder="Text"
              maxLength={100}
              className={formStyles.textarea}
            />
          </div>
        </div>
      ),
      okButtonLabel: '확인',
      cancelButtonLabel: '취소',
    });
  };

  // 수창취소 완료
  const CourseCencelCompleteAlert = () => {
    openAlert({
      title: <>수강취소 되었습니다</>,
    });
  };

  // 수강신청 알림
  const CourseAlarmAlert = () => {
    openAlert({
      title: <>수강신청 알림</>,
      content: (
        <>
          수강신청이 가능할 때 연락드리겠습니다.
          <br />
          감사합니다.
        </>
      ),
    });
  };

  // 수강대기자 등록
  const CourseWaitAlert = () => {
    openAlert({
      title: <>수강대기자 등록</>,
      content: (
        <>
          본 과정의 수강신청 대기자로 등록되었습니다.
          <br />
          수강 취소 발생시 순차적으로 연락드리겠습니다.
          <br />
          감사합니다.
        </>
      ),
    });
  };

  // 차수 알림 등록
  const CourseTimeAlert = () => {
    openAlert({
      title: <>차수 알림 등록</>,
      content: (
        <>
          본 과정의 차수 오픈시 연락드리겠습니다.
          <br />
          감사합니다.
        </>
      ),
    });
  };

  // 패키지 아코디언
  const [accordionValue, setAccordionValue] = useState<string>('');
  const accordionValueItems = [
    {
      value: 'a',
      title: (
        <div className={packageSideStyles.sub_package_title}>
          <div
            className={cn(
              thumnailStyles.start,
              thumnailStyles.thumbnail,
              thumnailStyles.horizontal,
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
                  <img src={bnrImage1} alt="" />
                </div>
              </div>
              {/* txt */}
              <div className={thumnailStyles.text_box}>
                <p className={thumnailStyles.text}>
                  필수개발과정필수개발과정필수개발과정필수개발과정필수개발과정필수개발과정필수개발과정필수개발과정필수개발과정필수개발과정필수개발과정
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
      children: (
        <div className={packageSideStyles.sub_package_content}>
          <p>필수 개발 과정 Spring Framework활한 OpenAPI 서비스 개발</p>
          <p>필수 개발 과정 Spring Framework활한 OpenAPI 서비스 개발</p>
          <p>필수 개발 과정 Spring Framework활한 OpenAPI 서비스 개발</p>
          <p>필수 개발 과정 Spring Framework활한 OpenAPI 서비스 개발</p>
        </div>
      ),
    },
    {
      value: 'b',
      title: (
        <div className={packageSideStyles.sub_package_title}>
          <div
            className={cn(
              thumnailStyles.start,
              thumnailStyles.thumbnail,
              thumnailStyles.horizontal,
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
                  <img src={bnrImage1} alt="" />
                </div>
              </div>
              {/* txt */}
              <div className={thumnailStyles.text_box}>
                <p className={thumnailStyles.text}>필수개발과정</p>
              </div>
            </div>
          </div>
        </div>
      ),
      children: <div className={packageSideStyles.sub_package_content}>Content B</div>,
    },
  ];

  return (
    <div className={`${styles.start} ${styles.package_wrap}`}>
      <div className={styles.thumbnail_img}>
        {/* 플레이 버튼 o */}
        <Button>
          <img src={bnrImage1} alt="" />
          <div className={styles.img_play}>
            <img src={playImg} alt="" />
          </div>
        </Button>
        {/* 플레이 버튼 x */}
        {/* <img src={bnrImage1} alt="" /> */}
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
            <Button className={packageInformationStyles.btn_subscribe} variant="primary" size="sm">
              구독하기
            </Button>
          </div>
        </div>
      </div>

      <div className={styles.tab_wrap}>
        <div className={styles.tab_title}>
          <div className={styles.box}>
            {tabTitle.map((item, index) => (
              <Button
                key={item.key}
                className={selectedTabTitle === index ? styles.active : ''}
                onClick={() => handleTab(item.key, index)}
              >
                {item.title}
                <em>{item.count}</em>
              </Button>
            ))}
          </div>
        </div>
        <Tabs className={styles.tab} selectedTabKey={selectedTabKey} items={items} type="line" />
      </div>

      {/* sub content */}
      <div className={styles.sub_contents}>
        {/* 패키지 */}
        <div
          className={`${packageSideStyles.start} ${packageSideStyles.package} ${styles.sub_box} `}
        >
          <div className={styles.tit_box}>
            <strong>
              패키지<em>10</em>
            </strong>
          </div>
          <div className={packageSideStyles.package_box}>
            <Accordion
              items={accordionValueItems}
              value={accordionValue}
              className={packageSideStyles.acc_package}
              onValueChange={(value) => setAccordionValue(value as string)}
              type={'multiple'}
            />
          </div>
        </div>

        {/* 연관 과정 */}
        <div
          className={`${relatedSideStyles.start} ${relatedSideStyles.related} ${styles.sub_box} `}
        >
          <div className={styles.tit_box}>
            <strong>
              연관 과정<em>20</em>
            </strong>
          </div>
          <ul className={relatedSideStyles.procedure_box}>
            <li>
              {/* thumnail module */}
              <div
                className={cn(
                  thumnailStyles.start,
                  thumnailStyles.thumbnail,
                  thumnailStyles.horizontal,
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
                      <img src={bnrImage1} alt="" />
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
      </div>

      {/* button fix */}
      <MobileView>
        <MobileContainerFooter>
          {/* 찜/공유 수강신청 Button */}
          <CourseFixedButton course={true} />
        </MobileContainerFooter>
      </MobileView>
    </div>
  );
}
