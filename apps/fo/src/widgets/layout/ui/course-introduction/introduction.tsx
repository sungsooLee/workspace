import { IcoArrowDown, IcoEssential, IcoSymbol } from '@learnway/icons';
import { cn } from '@learnway/shared';
import { Accordion } from '@learnway/ui/accordion';
import { Avatar } from '@learnway/ui/avatar';
import { Button } from '@learnway/ui/button';
import { ChipList } from '@learnway/ui/chips';
import { Link } from '@tanstack/react-router';
import { forwardRef, memo, useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { Curriculum, PackageCardList } from '../../../../widgets/layout';
// import { initialConfig as editorConfig } from '@learnway/ui/src/lib/editor/config/editor.config';
// import { HtmlContent } from '@learnway/ui/src/lib/html-content/html-content';
import { initialConfig as editorConfig } from '../../../../../../../libs/ui/src/lib/editor/config/editor.config'; // 임시로 상대경로
import { HtmlContent } from '../../../../../../../libs/ui/src/lib/html-content/html-content'; // 임시로 상대경로

import styles from '@learnway/styles/fo/features/layout/ui/course-introduction/introduction.module.css';
import definitionListStyles from '@learnway/styles/fo/pages/_layout/course-introduction/definition-list.module.css';
import operatorStyles from '@learnway/styles/fo/pages/_layout/course-introduction/operator.module.css';
import dataNoticeStyles from '@learnway/styles/fo/shared/ui/data-display/notice.module.css';
import bulletStyles from '@learnway/styles/fo/shared/ui/list/bullet.module.css';

// 이미지
import avatarDefault from '@learnway/styles/fo/assets/images/common/img_avatar.png';
import listImage1 from '@learnway/styles/fo/assets/images/temp/category_product_01.png';
import { $generateHtmlFromNodes } from '@lexical/html';
import { t } from 'i18next';
import { createEditor } from 'lexical';

interface Props {
  preRequired: Array<any>;
  introduction: any;
  curriculum: any;
}

const CourseIntroductionCompoment = forwardRef<HTMLDivElement, Props>(
  ({ preRequired, introduction, curriculum }, ref) => {
    const [preRequiredData, setPreRequiredData] = useState(preRequired);

    const tagValue = introduction.tags;

    const prePackageCardValueFn = (arr: Array<any>) => {
      return arr.map((a) => ({
        imgSrc: listImage1,
        // imgSrc: a.thumbnail,
        text: a.courseName,
      }));
    };

    // 사전 필수 과정 아코디언
    const [aforetimeValue, setAforetimeValue] = useState<string>(preRequired?.[0].id || '');
    const [aforetimeView, setAforetimeView] = useState<boolean>(false);
    const aforetimeValueItems =
      preRequired && preRequired.length
        ? [
            {
              value: '1',
              title: (
                <div className={styles.aforetime_title}>
                  <p>
                    <IcoEssential width={32} height={32} />
                    {t('사전 필수 과정이 있는 과정입니다')}
                  </p>
                  <span>{aforetimeValue === '1' ? '닫기' : '더보기'}</span>
                </div>
              ),
              children: (
                <div className={styles.aforetime_contents}>
                  <PackageCardList cardListData={prePackageCardValueFn(preRequired)} />
                </div>
              ),
            },
          ]
        : [];

    // 커리큘럼 컨텐츠 리스트
    const CurriculumData = [
      {
        txt: '현업사례로 보는 업무자동화에 파이썬이 필요한 이유',
        type: '이북',
        time: '1시간 28분',
      },
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
    const curriculumValueItems = curriculum?.moduleList
      ?.filter((item: any) => item.lessonList && item.lessonList.length)
      .map((module: any) => ({
        value: module.moduleId,
        isDummy: module.isDummy,
        title: (
          <div className={styles.title}>
            <p>
              {module.moduleName}
              <span>{module.totalTime && module.totalTime + '분'}</span>
            </p>
          </div>
        ),
        children: module.lessonList ? <Curriculum curriculumData={module.lessonList} /> : undefined,
      }));

    // 과정 정보 더보기
    const [more, setMore] = useState<boolean>(false);

    const parseContent = (contentString: string) => {
      try {
        const parsed = JSON.parse(contentString);
        return parsed;
      } catch (error) {
        console.error('JSON 파싱 실패', error);
        return null;
      }
    };

    const [htmlString, setHtmlString] = useState<string>('');

    useEffect(() => {
      if (!introduction) return;

      const content = parseContent(introduction.content?.content);
      // console.log(content);

      const newJsonInfo = introduction.content?.content;
      const editor = createEditor(editorConfig);
      editor.setEditorState(editor.parseEditorState(newJsonInfo));
      let htmlContent = '';
      editor.update(() => {
        htmlContent = $generateHtmlFromNodes(editor, null);
      });

      // console.log(htmlContent);
      setHtmlString(htmlContent);
    }, [introduction]);

    return (
      <div ref={ref} className={`${styles.start} ${styles.introduction}`}>
        <div className={styles.aforetime_box}>
          <Accordion
            items={aforetimeValueItems}
            value={aforetimeValue}
            onValueChange={(value) => {
              setAforetimeValue(String(value));
            }}
            // type="multiple"
            collapsible={true}
          />
        </div>

        <h2>{t('과정 한눈에 파악하기')}</h2>

        {/* dataNoticeStyles module */}
        {introduction.aiSummary && (
          <div className={`${dataNoticeStyles.start} ${dataNoticeStyles.notice} ${styles.notice}`}>
            <div className={dataNoticeStyles.tit}>
              <IcoSymbol width={20} height={20} />
              {t('AI가 요약한 과정 핵심내용')}
            </div>
            <p className={dataNoticeStyles.txt} style={{ whiteSpace: 'pre-line' }}>
              {introduction.aiSummary}
            </p>
          </div>
        )}

        {/* chip */}
        <div className={styles.chip_box}>
          <ChipList options={tagValue} prefixCharacter="#" hideCloseButton />
        </div>

        <div className={cn(styles.more_box, more === true ? styles.show : '')}>
          <HtmlContent>{htmlString}</HtmlContent>

          {/* 커리큘럼 */}
          {curriculum && (
            <div className={styles.info_box}>
              <div className={styles.tit_box}>
                <strong>{t('커리큘럼')}</strong>
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
                <strong>{t('이수기준')}</strong>
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
                    <li>{t('이수기준은 차수별로 달라질 수 있습니다')}.</li>
                    <li>{t('항목의 이수기준을 교육기간 내 충족해야 수료 처리됩니다')}.</li>
                    <li>
                      {t('최종평가, 과제평가가 있을 시 반드시 기한 내 제출해야 합니다')}. (
                      {t('단, 제출기회는 1회')})
                    </li>
                    <li>{t('과제물은 반드시 문서보안을 해제해 등록해야 평가가 가능합니다')}.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* 강사소개 */}
          {introduction.teachers && (
            <div className={styles.info_box}>
              <div className={styles.tit_box}>
                <strong>{t('강사소개')}</strong>
              </div>
              <div className={styles.operator_box}>
                {introduction.teachers?.map((item: any, index: any) => (
                  <div key={index} className={`${operatorStyles.start} ${operatorStyles.operator}`}>
                    {item.profileImage ? (
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
                        <strong>{item.name}</strong>
                        {item.email && (
                          <div>
                            <span>{t('이메일')}</span>
                            <span>{item.email}</span>
                          </div>
                        )}
                      </div>
                      {item.historys && (
                        <div className={operatorStyles.definition_list}>
                          <p className={operatorStyles.txt} style={{ whiteSpace: 'pre-line' }}>
                            {item.career}
                          </p>
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
                <strong>{t('과정 운영자')}</strong>
              </div>
              <div className={styles.operator_box}>
                {introduction.operators?.map((item: any, index: any) => (
                  <div key={index} className={`${operatorStyles.start} ${operatorStyles.operator}`}>
                    {item.profileImage ? (
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
                        <strong>{item.name}</strong>
                        <div>
                          {item.position ? <span>{item.position}</span> : ''}
                          {item.teams ? <span>{item.teams}</span> : ''}
                        </div>
                      </div>
                      <div className={operatorStyles.definition_list}>
                        {/* definition module */}
                        <div
                          className={`${definitionListStyles.start} ${definitionListStyles.list}`}
                        >
                          {item.email && (
                            <dl>
                              <dt>{t('이메일')}</dt>
                              <dd>{item.email}</dd>
                            </dl>
                          )}
                          {item.phone && (
                            <dl>
                              <dt>{t('전화')}</dt>
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

          {/* 과정 담당자 */}
          {introduction.coordinator && (
            <div className={styles.info_box}>
              <div className={styles.tit_box}>
                <strong>{t('과정 담당자')}</strong>
              </div>
              <div className={styles.operator_box}>
                {introduction.coordinator?.map((item: any, index: any) => (
                  <div key={index} className={`${operatorStyles.start} ${operatorStyles.operator}`}>
                    {item.profileImage ? (
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
                        <strong>{item.name}</strong>
                        <div>
                          {item.position ? <span>{item.position}</span> : ''}
                          {item.teams ? <span>{item.teams}</span> : ''}
                        </div>
                      </div>
                      <div className={operatorStyles.definition_list}>
                        {/* definition module */}
                        <div
                          className={`${definitionListStyles.start} ${definitionListStyles.list}`}
                        >
                          {item.email && (
                            <dl>
                              <dt>{t('이메일')}</dt>
                              <dd>{item.email}</dd>
                            </dl>
                          )}
                          {item.phone && (
                            <dl>
                              <dt>{t('전화')}</dt>
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
                <strong>{t('과정 및 학습제한 안내')}</strong>
              </div>
              {/* bullet module */}
              <div className={`${bulletStyles.start} ${bulletStyles.list}`}>
                <ul>
                  {/* {introduction.information?.map((item: any, index: any) => (
                    <li key={index}>
                    {item.title}: {item.content}
                    </li>
                    ))} */}
                  <li>
                    {t('연계학습')} : {t('본 과정은 야나두 웹사이트 및 앱을 사용하는 과정입니다')}.{' '}
                    {t('앱을 다운로드 받아주세요')}.
                  </li>
                  <li>
                    {t('보안프로그램')} : {t('본 과정은 보안프로그램을 설치해야 하는 과정입니다')}.{' '}
                    {t('학습 전')}, <Link to=".">{t('보안프로그램')}</Link>
                    {t('을 먼저 설치해주세요')}.
                  </li>
                  <li>
                    {t('승인필요')} :{' '}
                    {t('본 과정은 수강신청 후 팀장 및 교육담당자 승인이 필요합니다')}.
                  </li>
                  <li>
                    {t('학습장소')} : {t('본 과정은 사내에서만 학습 하실 수 있습니다')}.
                  </li>
                  <li>
                    {t('학습시간')} : {t('근무시간(오전9시 ~ 오후 6시)에는 학습 하실 수 없습니다')}.
                  </li>
                  <li>
                    {t('학습시간')} : {t('근무시간(오전9시 ~ 오후 6시)에만 학습 하실 수 있습니다')}.
                  </li>
                  <li>
                    1일 {t('진도')} : {t('하루에 30%만 학습 하실 수 있습니다')}.
                  </li>
                  <li>
                    {t('복습제한')} : {t('본 과정은 복습을 하실 수 없습니다')}.
                  </li>
                  <li>
                    {t('중복수강')} : {t('본 과정은 중복 수강을 하실 수 없습니다')}.
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* 과정 정보 접기/펼치기 */}
        <div className={styles.btn_more}>
          <Button onClick={() => setMore((prev) => !prev)} className={more ? styles.active : ''}>
            {more === true ? t('과정 정보 접기') : t('과정 정보 펼치기')}
            <IcoArrowDown width={16} height={16} stroke="#4d525c" />
          </Button>
        </div>
      </div>
    );
  },
);

export const CourseIntroduction = memo(CourseIntroductionCompoment);
