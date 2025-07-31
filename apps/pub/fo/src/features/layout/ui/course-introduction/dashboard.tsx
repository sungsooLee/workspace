import { memo, useState } from 'react';
import { BrowserView, isMobile, MobileView } from 'react-device-detect';
import {
  IcoArrowDown,
  IcoCaution03,
  IcoLock,
  IcoPlus,
  IcoCalendar01,
  IcoLoading02,
  IcoPdf,
} from '@learnway/icons';

import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import styles from '@learnway/styles/fo/features/layout/ui/course-introduction/dashboard.module.css';
import statusStyles from '@learnway/styles/fo/features/layout/ui/course-introduction/status.module.css';
import pdsStyles from '@learnway/styles/fo/features/layout/ui/course-introduction/pds.module.css';
import tableListStyles from '@learnway/styles/fo/shared/ui/list/table-list.module.css';
import dropdownPopoverStyles from '@learnway/styles/fo/shared/ui/dropdown-popover/dropdown-popover.module.css';
import { CurriculumStudy } from '../../../../features/layout';
import { Button } from '@learnway/ui/button';
import { TableBox } from '@learnway/ui/grid/grid-box/table-box';
import { Popover } from '@learnway/ui/popover';

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
          {/* 퍼블수정 20250723 아이콘 추가 */}
          <IcoPlus width={16} height={16} stroke="#131C30" className={styles.plus} />
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
          className={`${statusStyles.panel_degreey} ${statusStyles.completed}`}
        >
          <div className={statusStyles.list}>
            <h3>학습중</h3>
            <div className={statusStyles.date_status}>
              <div className={statusStyles.date_box}>
                {isMobile ? <IcoCalendar01 width={24} height={24} stroke="#131416" /> : '교육기간'}
                <span className={statusStyles.date}>25-03-01 ~ 26-03-31 (374차)</span>
              </div>
              <div className={statusStyles.date_box}>
                {isMobile ? <IcoLoading02 width={24} height={24} fill="#131416" /> : '남은학습기간'}
                <span className={`${statusStyles.date} ${statusStyles.time}`}>D-27</span>
                {/* 남은기간 적을 시 className="time" */}
              </div>
            </div>
          </div>
        </Panel>

        <Panel type="rounded" hideHeaderUnderline className={statusStyles.progress_box}>
          <div className={statusStyles.progress_rate}>
            <h3>나의진도율</h3>
            <ProgressBar progress={progress} className={statusStyles.progress_bar} />
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
                <div className={statusStyles.score}>
                  <div className={statusStyles.deadline_box}>
                    <IcoCaution03 width={18} height={18} stroke="#FF4646" />
                    <div className={statusStyles.deadline}>
                      <p>마감 : 26-03-25 11:59pm</p>
                    </div>
                  </div>
                  -
                </div>
              </div>
            </div>

            <div className={statusStyles.status_info}>
              <span className={statusStyles.tt}>과제 (30%)</span>
              <div className={statusStyles.score_box}>
                {/* 퍼블수정 20250723 마감 추가 */}
                <div className={statusStyles.score}>
                  <div className={statusStyles.deadline_box}>
                    <IcoCaution03 width={18} height={18} stroke="#FF4646" />
                    <div className={statusStyles.deadline}>
                      <p>마감 : 26-03-25 11:59pm</p>
                    </div>
                  </div>
                  -
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
                {/* 퍼블수정 20250723 클래스 추가 */}
                <TableBox
                  className={statusStyles.table}
                  data={data}
                  columns={columns}
                  tableMode={false}
                  showTotalCount={false}
                  title=" "
                />
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
              {/* 퍼블수정 20250723 아이콘 추가 */}
              <IcoPlus width={20} height={20} stroke="#4d525c" />
              <span>{detail === true ? '접기' : '더보기'}</span>
              <IcoArrowDown
                width={20}
                height={20}
                stroke="#131416"
                className={statusStyles.ico_arrow}
              />
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
          {/* 퍼블수정 20250723 자료 개수 추가 및 버튼 수정 */}
          <div className={styles.tit_box}>
            <h3>
              자료실<em>2</em>
            </h3>
            {/* 퍼블수정 20250724 사이즈 수정 */}
            <Button variant="line" size={isMobile ? 'md' : 'lx'} className={styles.btn}>
              전체 다운로드
            </Button>
          </div>
          <div className={pdsStyles.start}>
            <Panel hideHeaderUnderline actions="" className="w_full" type="rounded">
              <div className={pdsStyles.pds_box}>
                <span className={pdsStyles.txt}>
                  {/* 퍼블수정 20250724 pdf 원복 */}
                  <IcoPdf className={styles.ico_pdf} />
                  <span>비즈니스 영어 단어&숙어집.pdf</span>
                  <IcoLock className={styles.ico_lock} />
                </span>
                <div className={pdsStyles.info}>
                  {/* 퍼블수정 20250724 mobile에서 hide */}
                  {isMobile || <span className={pdsStyles.size}>200MB</span>}
                  {/* 퍼블수정 20250724 버튼 사이즈 수정 */}
                  <Button variant="line" size="md" className={pdsStyles.btn}>
                    다운로드
                  </Button>
                </div>
              </div>
            </Panel>

            <Panel hideHeaderUnderline actions="" className="w_full" type="rounded">
              <div className={pdsStyles.pds_box}>
                <span className={pdsStyles.txt}>
                  <IcoPdf className={styles.ico_pdf} />
                  <span>비즈니스 영어 단어&숙어집.pdf</span>
                  <IcoLock className={styles.ico_lock} />
                </span>
                <div className={pdsStyles.info}>
                  {isMobile || <span className={pdsStyles.size}>200MB</span>}
                  <Button variant="line" size="md" className={pdsStyles.btn}>
                    다운로드
                  </Button>
                </div>
              </div>
            </Panel>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CourseDashboard = memo(CourseDashboardCompoment);
