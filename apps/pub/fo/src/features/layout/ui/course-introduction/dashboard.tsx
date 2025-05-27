import { memo, useState } from 'react';
import { BrowserView, isMobile, MobileView } from 'react-device-detect';
import { IcoArrowDown, IcoCaution03 } from '@learnway/icons';
import { Button, Panel, Popover, ProgressBar, TableBox, useModal } from '@learnway/ui';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import styles from './dashboard.module.css';
import statusStyles from './status.module.css';
import pdsStyles from './pds.module.css';
import tableListStyles from '../../../../shared/ui/list/table-list.module.css';
import dropdownPopoverStyles from '../../../../shared/ui/dropdown-popover/dropdown-popover.module.css';
import { CurriculumStudy } from '../../../../features/layout';

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
      </div>
    </div>
  );
};

export const CourseDashboard = memo(CourseDashboardCompoment);
