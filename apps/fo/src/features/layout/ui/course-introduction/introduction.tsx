import { memo, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { isMobile } from 'react-device-detect';
import { cn } from '@learnway/shared';
import { ChipList, Avatar, Button, Accordion } from '@learnway/ui';
import { IcoSymbol, IcoEssential, IcoArrowDown } from '@learnway/icons';
import { Curriculum, PackageCardList } from '../../../../features/layout/';

import operatorStyles from '@learnway/styles/fo/pages/_layout/course-introduction/operator.module.css';
import definitionListStyles from '@learnway/styles/fo/pages/_layout/course-introduction/definition-list.module.css';
import dataNoticeStyles from '@learnway/styles/fo/shared/ui/data-display/notice.module.css';
import bulletStyles from '@learnway/styles/fo/shared/ui/list/bullet.module.css';
import styles from '@learnway/styles/fo/features/layout/ui/course-introduction/introduction.module.css';

// 이미지
import discriminationImg from '@learnway/styles/fo/assets/images/temp/img_discrimination.png';
import listImage1 from '@learnway/styles/fo/assets/images/temp/category_product_01.png';
import avatarDefault from '@learnway/styles/fo/assets/images/common/img_avatar.png';

const CourseIntroductionCompoment = ({
  preRequired,
  introduction,
}: {
  preRequired: Array<any>;
  introduction: any;
}) => {
  const [preRequiredData, setPreRequiredData] = useState(preRequired);

  const tagValue = introduction.tags;

  const prePackageCardValueFn = (arr: Array<any>) => {
    return arr.map((a) => ({
      imgSrc: listImage1,
      // imgSrc: a.thumbnail,
      text: a.name,
    }));
  };

  // 사전 필수 과정 아코디언
  const [aforetimeValue, setAforetimeValue] = useState<string>(preRequired[0].id || '');
  // const aforetimeValueItems = [
  //   {
  //     value: 'a',
  //     title: (
  //       <div className={styles.aforetime_title}>
  //         <p>
  //           <IcoEssential width={32} height={32} />
  //           사전 필수 과정이 있는 과정입니다.
  //         </p>
  //         <span>{aforetimeValue === 'a' ? '닫기' : '더보기'}</span>
  //       </div>
  //     ),
  //     children: (
  //       <div className={styles.aforetime_contents}>
  //         <PackageCardList cardListData={packageCardValue} />
  //       </div>
  //     ),
  //   },
  // ];
  const aforetimeValueItems = preRequired
    ? preRequired.map((p: any) => ({
        value: p.id,
        title: (
          <div className={styles.aforetime_title}>
            <p>
              <IcoEssential width={32} height={32} />
              {p.name}
            </p>
            <span>{aforetimeValue === p.id ? '닫기' : '더보기'}</span>
          </div>
        ),
        children: (
          <div className={styles.aforetime_contents}>
            <PackageCardList cardListData={prePackageCardValueFn(p.course)} />
          </div>
        ),
      }))
    : [];

  // 커리큘럼 컨텐츠 리스트
  const CurriculumData = [
    { txt: '현업사례로 보는 업무자동화에 파이썬이 필요한 이유', type: '이북', time: '1시간 28분' },
    { txt: '현업사례로 보는 업무자동화에 파이썬이 필요한 이유', type: '동영상', time: '30분' },
  ];
  const CurriculumDataFn = (arr: Array<any>) => {
    return arr.map((a) => ({
      txt: a.courseName,
      type: a.courseType,
      time: a.duration,
    }));
  };

  // 커리큘럼 아코디언
  const [curriculumValue, setCurriculumValue] = useState<string>('a');
  const curriculumValueItems = introduction.curriculum?.map((i: any) => ({
    value: i.id,
    title: (
      <div className={styles.title}>
        <p>
          {i.name}
          <span>{i.totalTime}</span>
        </p>
      </div>
    ),
    children: <Curriculum curriculumData={CurriculumDataFn(i.course)} />,
  }));

  // 과정 정보 더보기
  const [more, setMore] = useState<boolean>(false);

  return (
    <div className={`${styles.start} ${styles.introduction}`}>
      <div className={styles.aforetime_box}>
        <Accordion
          items={aforetimeValueItems}
          value={aforetimeValue}
          onValueChange={(value) => setAforetimeValue(value as string)}
          // type="multiple"
        />
      </div>

      <h2>과정 한눈에 파악하기</h2>

      {/* dataNoticeStyles module */}
      {introduction.aiSummary && (
        <div className={`${dataNoticeStyles.start} ${dataNoticeStyles.notice} ${styles.notice}`}>
          <div className={dataNoticeStyles.tit}>
            <IcoSymbol width={20} height={20} />
            AI가 요약한 과정 핵심내용
          </div>
          <p className={dataNoticeStyles.txt}>{introduction.aiSummary}</p>
        </div>
      )}

      {/* chip */}
      <div className={styles.chip_box}>
        <ChipList options={tagValue} prefixCharacter="#" hideCloseButton />
      </div>

      {/* 교육목표 */}
      {introduction.goal && (
        <div className={styles.info_box}>
          <div className={styles.tit_box}>
            <strong>교육목표</strong>
          </div>
          {/* bullet number module */}
          <div className={`${bulletStyles.start} ${bulletStyles.list}`}>
            <ul>
              {introduction.goal?.map((item: any, index: any) => <li key={index}>{item.text}</li>)}
            </ul>
          </div>
        </div>
      )}

      {/* 교육내용 */}
      {introduction.contentsSummary && (
        <div className={styles.info_box}>
          <div className={styles.tit_box}>
            <strong>교육내용</strong>
          </div>
          {/* bullet module */}
          <div className={`${bulletStyles.start} ${bulletStyles.list}`}>
            <ul>
              {introduction.contentsSummary?.map((summary: any, index: any) => (
                <li key={index}>{summary.text}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className={cn(styles.more_box, more === true ? styles.show : '')}>
        {/* 다른 강의와의 차별점 */}
        {introduction.content && (
          <div className={styles.info_box}>
            <div className={styles.tit_box}>
              <strong>다른 강의와의 차별점</strong>
            </div>

            <div className={styles.img_box}>
              <img src={introduction.content.contentImage} alt="" />
              <img src={discriminationImg} alt="" />
            </div>
          </div>
        )}

        {/* 이런 학습자에게 유익해요! */}
        {introduction.recommand && (
          <div className={styles.info_box}>
            <div className={styles.tit_box}>
              <strong>이런 학습자에게 유익해요!</strong>
            </div>
            {/* bullet module */}
            <div className={`${bulletStyles.start} ${bulletStyles.list}`}>
              <ul>
                {introduction.contentsSummary?.map((item: any, index: any) => (
                  <li key={index}>{item.text}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* 커리큘럼 */}
        {introduction.curriculum && (
          <div className={styles.info_box}>
            <div className={styles.tit_box}>
              <strong>커리큘럼</strong>
            </div>

            <div className={styles.curriculum_box}>
              <Accordion
                items={curriculumValueItems}
                value={curriculumValue}
                className={styles.acc_curriculum}
                onValueChange={(value) => setCurriculumValue(value as string)}
                type="multiple"
              />
            </div>
          </div>
        )}

        {/* 이수기준 */}
        {introduction.completionCriteria && (
          <div className={styles.info_box}>
            <div className={styles.tit_box}>
              <strong>이수기준</strong>
            </div>
            <div className={styles.evaluation_box}>
              <ul>
                {introduction.completionCriteria?.scores?.map((item: any, index: any) => (
                  <li key={index}>
                    <span>{item.title}</span>
                    <strong>{item.attendance}</strong>
                  </li>
                ))}
              </ul>
              {/* bulletStyles */}
              <div className={`${bulletStyles.start} ${bulletStyles.list}`}>
                <ul>
                  {introduction.completionCriteria?.description?.map((item: any, index: any) => (
                    <li key={index}>{item.text}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* 강사소개 */}
        {introduction.teachers && (
          <div className={styles.info_box}>
            <div className={styles.tit_box}>
              <strong>강사소개</strong>
            </div>
            <div className={styles.operator_box}>
              {introduction.teachers?.map((item: any, index: any) => (
                <div key={index} className={`${operatorStyles.start} ${operatorStyles.operator}`}>
                  {item.teacherProfileImage ? (
                    <div className={operatorStyles.avatar}>
                      <Avatar
                        imageUrl="https://github.com/shadcn.png"
                        size={isMobile ? 'xl' : '2xl'}
                        className={styles.info_avata}
                      />
                    </div>
                  ) : (
                    <div className={operatorStyles.avatar}>
                      <Avatar
                        imageUrl={avatarDefault}
                        size={isMobile ? 'xl' : '2xl'}
                        className={styles.info_avata}
                      />
                    </div>
                  )}
                  <div className={operatorStyles.txt_box}>
                    <div className={operatorStyles.profile}>
                      <strong>{item.teacherName}</strong>
                      {item.email && (
                        <div>
                          <span>이메일</span>
                          <span>{item.email}</span>
                        </div>
                      )}
                    </div>
                    {item.historys && (
                      <div className={operatorStyles.definition_list}>
                        {item.historys?.map((h: any, index: any) => (
                          <span key={index} className={operatorStyles.txt}>
                            {h.text}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 과정 운영자 */}
        {introduction.operators && (
          <div className={styles.info_box}>
            <div className={styles.tit_box}>
              <strong>과정 운영자</strong>
            </div>
            <div className={styles.operator_box}>
              {introduction.operators?.map((item: any, index: any) => (
                <div key={index} className={`${operatorStyles.start} ${operatorStyles.operator}`}>
                  {item.operatorProfileImage ? (
                    <div className={operatorStyles.avatar}>
                      <Avatar
                        imageUrl="https://github.com/shadcn.png"
                        size={isMobile ? 'xl' : '2xl'}
                        className={styles.info_avata}
                      />
                    </div>
                  ) : (
                    <div className={operatorStyles.avatar}>
                      <Avatar
                        imageUrl={avatarDefault}
                        size={isMobile ? 'xl' : '2xl'}
                        className={styles.info_avata}
                      />
                    </div>
                  )}
                  <div className={operatorStyles.txt_box}>
                    <div className={operatorStyles.profile}>
                      <strong>{item.operatorName}</strong>
                      <div>
                        <span>{item.position}</span>
                        <span>{item.teams}</span>
                      </div>
                    </div>
                    <div className={operatorStyles.definition_list}>
                      {/* definition module */}
                      <div className={`${definitionListStyles.start} ${definitionListStyles.list}`}>
                        {item.email && (
                          <dl>
                            <dt>이메일</dt>
                            <dd>{item.email}</dd>
                          </dl>
                        )}
                        {item.phone && (
                          <dl>
                            <dt>전화</dt>
                            <dd>{item.phone}</dd>
                          </dl>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 과정 및 학습제한 안내 */}
        {introduction.information && (
          <div className={styles.info_box}>
            <div className={styles.tit_box}>
              <strong>과정 및 학습제한 안내</strong>
            </div>
            {/* bullet module */}
            <div className={`${bulletStyles.start} ${bulletStyles.list}`}>
              <ul>
                <li>
                  보안프로그램 : 본 과정은 보안프로그램을 설치해야 하는 과정입니다. 학습 전,
                  <Link to="">보안프로그램</Link>을 먼저 설치해주세요.
                </li>
                {introduction.information?.map((item: any, index: any) => (
                  <li key={index}>
                    {item.title}: {item.content}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* 과정 정보 접기/펼치기 */}
      <div className={styles.btn_more}>
        <Button onClick={() => setMore((prev) => !prev)} className={more ? styles.active : ''}>
          {more === true ? '과정 정보 접기' : '과정 정보 펼치기'}
          <IcoArrowDown width={16} height={16} stroke="#4d525c" />
        </Button>
      </div>
    </div>
  );
};

export const CourseIntroduction = memo(CourseIntroductionCompoment);
