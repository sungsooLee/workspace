import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { ChipList, SelectOption, Accordion } from '@learnway/ui';

import pageContentsStyles from '../../_page-contents.module.css';
import operatorStyles from './operator.module.css';
import styles from './package.module.css';

// 예시 이미지
import bnrImage1 from '@learnway/styles/fo/assets/images/temp/category_product_01.png';
import package1 from '@learnway/styles/fo/assets/images/temp/img_package_01.png';

export const Route = createFileRoute('/_layout/course-introduction/package')({
  component: RouteComponent,
});

function RouteComponent() {
  const options: SelectOption[] = [
    { label: '스마트팩토리', value: 'A' },
    { label: '디지털혁신', value: 'B' },
    { label: '정보보안기술', value: 'C' },
  ];

  const [value2, setValue2] = useState<string>('');
  const dummyItems2 = [
    {
      value: 'aaaa',
      title: <div>aaa</div>,
      children: <div>Content A</div>,
    },
    {
      value: 'bbbb',
      title: 'title B',
      children: <div>Content B</div>,
    },
  ];

  return (
    <div className={`${pageContentsStyles.start} ${styles.start} ${styles.package_wrap}`}>
      {/* main content */}
      <div className={pageContentsStyles.main_contents}>
        <div className={styles.thumbnail_img}>
          <img src={bnrImage1} alt="" />
        </div>
        <div className={styles.package_box}>
          <div className={styles.txt_box}>
            <strong>패키지소개</strong>
            <p>
              패키지에 대한 소개 공백포함 한글 300자 패키지에 대한 소개 공백포함 한글 300자 패키지에
              대한 소개 공백포함 한글 300자 패키지에 대한 소개 공백패키지에 대한 소개 공백포함 한글
              300자 패키지에 대한 소개 공백포
            </p>
          </div>
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
              <div className={operatorStyles.information}>
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

      {/* sub content */}
      <div className={pageContentsStyles.sub_contents}>aa</div>
    </div>
  );
}
