import { memo, useState, useEffect, useRef } from 'react';
import { MobileView, BrowserView, isMobile } from 'react-device-detect';
import { Link, useRouter } from '@tanstack/react-router';
import { cn } from '@learnway/shared';
import { IcoArrowDown, IcoCaution03, IcoPlay } from '@learnway/icons';
import { Button, Panel, Progress, useModal, TableBox, Accordion, Popover } from '@learnway/ui';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import styles from './dashboard.module.css';
import statusStyles from './status.module.css';
import thumnailStyles from '../../../../shared/ui/thumnail/thumnail.module.css';
import thumnailImgStyles from '../../../../shared/ui/thumnail/thumnail-img.module.css';
import packageSideStyles from '../../../../pages/_layout/course-introduction/package-side.module.css';
import relatedSideStyles from '../../../../pages/_layout/course-introduction/related-side.module.css';
import pdsStyles from './pds.module.css';
import tableListStyles from '../../../../shared/ui/list/table-list.module.css';
import dropdownPopoverStyles from '../../../../shared/ui/dropdown-popover/dropdown-popover.module.css';
import { CurriculumStudy } from '../../../../features/layout';

import listImage1 from '@learnway/styles/fo/assets/images/temp/category_product_01.png';
const DropdownPopoverCompoment = () => {
  return (
    <div className={`${dropdownPopoverStyles.start} ${dropdownPopoverStyles.dropdown_wrap}`}>
      <Button>1차 | 25-03-01 ~ 26-03-31</Button>
      <Button>2차 | 25-03-01 ~ 26-03-31</Button>
    </div>
  );
};
const CourseDashboardCompoment = () => {
  const [selectedValues, setSelectedValues] = useState<null>(null);

  const progress = 80;

  const { open: openModal } = useModal();
  const { close: closeModal } = useModal();

  const [detail, setDetail] = useState<boolean>();

  const columnHelper = createColumnHelper<any>();

  // thead : 'value'
  const data: any[] = [
    {
      name: '총점',
      name2: '70점이상',
      name3: '100%',
      name4: '-',
      name5: '-',
    },
  ];

  // Thead 정의
  const columns = [
    columnHelper.accessor('name', {
      meta: {
        headerAlign: 'center', // 헤더 정렬
        cellAlign: 'center', // 셀 정렬
      },
      header: '구분',
    }),
    columnHelper.accessor('name2', {
      meta: {
        headerAlign: 'center', // 헤더 정렬
        cellAlign: 'center', // 셀 정렬
      },
      header: '이수기준',
    }),
    columnHelper.accessor('name3', {
      meta: {
        headerAlign: 'center', // 헤더 정렬
        cellAlign: 'center', // 셀 정렬
      },
      header: '가중치',
    }),
    columnHelper.accessor('name4', {
      meta: {
        headerAlign: 'center', // 헤더 정렬
        cellAlign: 'center', // 셀 정렬
      },
      header: '취득점수',
    }),
    columnHelper.accessor('name5', {
      meta: {
        headerAlign: 'center', // 헤더 정렬
        cellAlign: 'center', // 셀 정렬
      },
      header: '환산점수',
    }),
  ] as ColumnDef<any, unknown>[];

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
                  <img src={listImage1} alt="" />
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
                  <img src={listImage1} alt="" />
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
    <div className={styles.start}>
      <div className={styles.tit_box}>
        <h3>대시보드</h3>
        <Popover
          popoverContent={<DropdownPopoverCompoment />}
          className={`${dropdownPopoverStyles.btn} ${dropdownPopoverStyles.text}`}
          side="bottom"
          align="end"
          sideOffset={10}
        >
          <span>{'차수보기'}</span>
          <IcoArrowDown width={16} height={16} stroke="#131C30" />
        </Popover>
      </div>

      <div className={statusStyles.start}>
        {/* 이수 : completed 
            미이수 : incomplete
        */}
        <Panel
          type="rounded"
          hideHeaderUnderline
          className={`${statusStyles.panel_degreey} ${/* statusStyles.complete */ ''}`}
        >
          <div className={statusStyles.list}>
            <h3>학습중</h3>
            <div className={statusStyles.date_status}>
              <div className={statusStyles.date_box}>
                교육기간
                <span className={statusStyles.date}>25-03-01 ~ 26-03-31 (374차)</span>
              </div>
              <div className={statusStyles.date_box}>
                남은학습기간
                <span className={`${statusStyles.date} ${statusStyles.time}`}>D-27</span>{' '}
                {/* 남은기간 적을 시 className="time" */}
              </div>
            </div>
          </div>
        </Panel>

        <Panel type="rounded" hideHeaderUnderline className={statusStyles.progress_box}>
          <div className={statusStyles.progress_rate}>
            <h3>나의진도율</h3>
            <Progress value={progress} className={statusStyles.progress_bar} />
            <div className={statusStyles.info}>
              <span className={statusStyles.progress}>{progress}%</span>
            </div>
          </div>
        </Panel>

        <Panel type="rounded" hideHeaderUnderline className={statusStyles.status_box}>
          <div className={statusStyles.status_list}>
            <div className={statusStyles.status_info}>
              <span className={statusStyles.tt}>출석 (40%)</span>
              <div className={statusStyles.score_box}>
                <div className={statusStyles.score}>80%</div>
              </div>
            </div>

            <div className={statusStyles.status_info}>
              <span className={statusStyles.tt}>평가 (1/2, 30%)</span>
              <div className={statusStyles.score_box}>
                <div className={statusStyles.score}>38점</div>
              </div>
            </div>

            <div className={statusStyles.status_info}>
              <span className={statusStyles.tt}>과제 (30%)</span>
              <div className={statusStyles.score_box}>
                <div className={statusStyles.score}>
                  <IcoCaution03 width={18} height={18} stroke="#FF4646" /> -
                </div>
              </div>
            </div>

            <div className={statusStyles.status_info}>
              <span className={statusStyles.tt}>설문 (0%)</span>
              <div className={statusStyles.score_box}>
                <div className={statusStyles.score}>완료</div>
              </div>
            </div>

            <div className={statusStyles.status_info}>
              <span className={statusStyles.tt}>총점 (100%)</span>
              <div className={statusStyles.score_box}>
                <div className={statusStyles.score}>-</div>
              </div>
              <div className={statusStyles.default}>(80점)</div>
            </div>
          </div>

          {detail === true ? (
            <div className={statusStyles.status_table}>
              <BrowserView>
                <TableBox data={data} columns={columns} tableMode={true} showTotalCount={false} />
              </BrowserView>

              <MobileView>
                <div className={`${tableListStyles.start} ${tableListStyles.table_list}`}>
                  <div className={tableListStyles.list_row}>
                    <span className={tableListStyles.tit}>총점</span>
                    <div className={tableListStyles.row}>
                      <span className={tableListStyles.dt}>이수기준</span>
                      <span className={tableListStyles.dd}>70점이상</span>
                    </div>
                    <div className={tableListStyles.row}>
                      <span className={tableListStyles.dt}>가중치</span>
                      <span className={tableListStyles.dd}>100%</span>
                    </div>
                    <div className={tableListStyles.row}>
                      <span className={tableListStyles.dt}>취득점수</span>
                      <span className={tableListStyles.dd}>-</span>
                    </div>
                    <div className={tableListStyles.row}>
                      <span className={tableListStyles.dt}>환산점수</span>
                      <span className={tableListStyles.dd}>-</span>
                    </div>
                  </div>

                  <div className={tableListStyles.list_row}>
                    <span className={tableListStyles.tit}>진도/출석</span>
                    <div className={tableListStyles.row}>
                      <span className={tableListStyles.dt}>이수기준</span>
                      <span className={tableListStyles.dd}>70점이상</span>
                    </div>
                    <div className={tableListStyles.row}>
                      <span className={tableListStyles.dt}>가중치</span>
                      <span className={tableListStyles.dd}>100%</span>
                    </div>
                    <div className={tableListStyles.row}>
                      <span className={tableListStyles.dt}>취득점수</span>
                      <span className={tableListStyles.dd}>-</span>
                    </div>
                    <div className={tableListStyles.row}>
                      <span className={tableListStyles.dt}>환산점수</span>
                      <span className={tableListStyles.dd}>-</span>
                    </div>
                  </div>

                  <div className={tableListStyles.list_row}>
                    <span className={tableListStyles.tit}>과제</span>
                    <div className={tableListStyles.row}>
                      <span className={tableListStyles.dt}>이수기준</span>
                      <span className={tableListStyles.dd}>70점이상</span>
                    </div>
                    <div className={tableListStyles.row}>
                      <span className={tableListStyles.dt}>가중치</span>
                      <span className={tableListStyles.dd}>100%</span>
                    </div>
                    <div className={tableListStyles.row}>
                      <span className={tableListStyles.dt}>취득점수</span>
                      <span className={tableListStyles.dd}>-</span>
                    </div>
                    <div className={tableListStyles.row}>
                      <span className={tableListStyles.dt}>환산점수</span>
                      <span className={tableListStyles.dd}>-</span>
                    </div>
                  </div>
                </div>
              </MobileView>
            </div>
          ) : (
            ''
          )}

          <div className={statusStyles.btn_action}>
            <Button
              className={detail === true ? statusStyles.active : ''}
              onClick={() => (detail === true ? setDetail(false) : setDetail(true))}
            >
              <span>{detail === true ? '성적 접기' : '성적 자세히'}</span>
              <IcoArrowDown width={16} height={16} stroke="#131c30" />
            </Button>
          </div>
        </Panel>
      </div>

      {/* 커리큘럼 */}
      <div className={`${styles.info_box} ${styles.curriculum}`}>
        <div className={styles.tit_box}>
          <h3>커리큘럼</h3>
        </div>

        {/* curriculum */}
        <CurriculumStudy />

        {/* 자료실 */}
        <div className={`${styles.info_box} ${styles.pds}`}>
          <div className={styles.tit_box}>
            <h3>자료실</h3>
            <Button variant="line" size={isMobile ? 'ts' : 'sm'} className={styles.btn}>
              전체 다운로드
            </Button>
          </div>

          <div className={pdsStyles.start}>
            <Panel hideHeaderUnderline actions="" className="w_full" type="rounded">
              <div className={pdsStyles.pds_box}>
                <span className={pdsStyles.txt}>비즈니스 영어 단어&숙어집.pdf</span>
                <div className={pdsStyles.info}>
                  <span className={pdsStyles.size}>200MB</span>
                  <Button variant="line" size={isMobile ? 'ts' : 'sm'} className={pdsStyles.btn}>
                    다운로드
                  </Button>
                </div>
              </div>
            </Panel>

            <Panel hideHeaderUnderline actions="" className="w_full" type="rounded">
              <div className={pdsStyles.pds_box}>
                <span className={pdsStyles.txt}>비즈니스 영어 단어&숙어집.pdf</span>
                <div className={pdsStyles.info}>
                  <span className={pdsStyles.size}>200MB</span>
                  <Button variant="line" size={isMobile ? 'ts' : 'sm'} className={pdsStyles.btn}>
                    다운로드
                  </Button>
                </div>
              </div>
            </Panel>
          </div>
        </div>

        <MobileView>
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
          </div>
        </MobileView>
      </div>
    </div>
  );
};

export const CourseDashboard = memo(CourseDashboardCompoment);
