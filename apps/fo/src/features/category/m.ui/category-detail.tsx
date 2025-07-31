import React, { FC, useEffect, useState } from 'react';
import { Input } from '@learnway/ui/input';
import { Button } from '@learnway/ui/button';
import { Popover } from '@learnway/ui/popover';
import { EmptyText } from '@learnway/ui/empty-text';
import { Pagination } from '@learnway/ui/pagination';
import { useModal } from '@learnway/ui/modal';
import { cn } from '@learnway/shared';
import { IcoArray, IcoArrowDown, IcoDotpoints, IcoFilter, IcoPlay } from '@learnway/icons';
import dropdownPopoverStyles from '../../../shared/ui/dropdown-popover/dropdown-popover.module.css';
import styles from '@learnway/styles/fo/pages/_layout/category/category_m.module.css';

import { FilterPopup, ThumbnailList } from '@features/layout';
import CategoryService from '@entities/category/api/category';
import { t } from 'i18next'
import { useFetchCategoryDetail } from '@entities/category';
import { CategoryDetailComponentProps } from '@pages/_layout/_category/category';


const CategoryDetailComponent: FC<any> = ({categoryId} : CategoryDetailComponentProps) => {
  const { openModal } = useModal();

  const { data: categoryInfo } = useFetchCategoryDetail(categoryId);

  const [depth, setDepth] = useState(3);
  const [page, setPage] = useState(0);
  const [size , setSize] = useState(20);
  const [sorting, setSorting] = useState(['createdDate,DESC']);
  const [courseName, setCourseName] = useState('');
  const [coursePayload, setCoursePayload] = useState({
    page, size, sort: sorting, categoryId, courseName
  });
  const [data, setData] = useState<any>({});
  const [sortingDisabled, setSortingDisabled] = useState(true);
  // 필터 선택된 값이 있으면 true 변경
  const [selectCheck, setSelectCheck] = useState(false);

  const arrays = {
    items: [t('최신순'), t('과정명순'), t('조회순')],
    initialSelectedItem: 0, // 초기 선택값
  };

  const handlePageChange = (value: number) => {
    setPage(value);
  };
  const handlePageSizeChange = (value: number) => {
    setSize(value)
  }

  const handleFilterOptionChange = async (options: any) => {
    const payload = {
      ...coursePayload,
      courseType: options.map( (row: any) => row.value),
    }
    setCoursePayload(payload);
    await fetchCoursesCategory(payload)
  };

  const handleOnSearch = async () => {
    const payload = {
      ...coursePayload,
      courseName
    }
    setCoursePayload(payload)
    await fetchCoursesCategory(payload)
  }

  const handleSearchSortable = async (sortingIdx: any) => {
    const payload = {
      ...coursePayload,
    }
    switch (sortingIdx) {
      case 1:
        setSorting(['courseName']);
        payload.sort = ['courseName'];
        setCoursePayload(payload)
        break;
      case 2:
        setSorting(['likeCount,DESC']);
        payload.sort = ['likeCount,DESC'];
        setCoursePayload(payload)
        break;
      default:
        setSorting(['createdDate,DESC']);
        payload.sort = ['createdDate,DESC'];
        setCoursePayload(payload)
        break;
    }
    await fetchCoursesCategory(payload)
  }

  useEffect(() => {
    if( categoryInfo ) {
      (async () => {
        console.log('### categoryInfo => ', categoryInfo);
        const payload = {
          ...coursePayload,
          categoryId: categoryInfo.categoryId,
        }
        setCoursePayload(payload);
        await fetchCoursesCategory(payload)
      })();
    }
  }, [categoryInfo, page, size])

  const fetchCoursesCategory = async (payload: any) => {
    const courses = await CategoryService.getFetchCoursesCategory(payload);
    setData(courses)
  }

  return (
    <div className={cn(styles.start, styles.detail_m)}>
      <div className={styles.gray_box}>
        <div className={styles.box}>
          {/* 분류가 1개인 경우 */}
          {/* <Dropdown
            className={styles.select}
            options={[
              { value: 'a', label: '분류선택' },
              { value: 'b', label: 'ST1' },
              { value: 'c', label: '아이오닉 6' },
              { value: 'd', label: '아이오닉 5' },
              { value: 'e', label: '코나' },
              { value: 'f', label: '넥쏘' },
              { value: 'g', label: '포터' },
              { value: 'h', label: '캐스퍼' },
            ]}
            value={divisionValues}
            onChange={(selected) => setDivisionValues(selected)}
          /> */}
          {/* 분류가 2개 이상인 경우 */}
          {/*<Button*/}
          {/*  className={styles.btn_drop}*/}
          {/*  onClick={() =>*/}
          {/*    openModal({*/}
          {/*      width: 'm_bottom_sheet',*/}
          {/*      content: <CategoryDepthPopupM />,*/}
          {/*    })*/}
          {/*  }*/}
          {/*  icon={<IcoArrowDown width={16} height={16} stroke="#131c30" />}*/}
          {/*  label={'분류선택'}*/}
          {/*/>*/}
        </div>
        <div className={styles.box}>
          <div className={styles.search_input}>
            <Input id="" type="text" placeholder="과정명 검색" inputSize={'lg'} showSearchIcon />
          </div>

          <div className={styles.filter_wrap}>
            <Button
              className={cn(styles.btn_filter, selectCheck === true ? styles.selected : '')}
              onClick={() =>
                openModal({
                  width: 'm_bottom_sheet',
                  content: <FilterPopup />,
                })
              }
            >
              <IcoFilter
                width={20}
                height={20}
                fill="none"
                stroke={selectCheck === true ? '#fff' : '#07287e'}
              />
            </Button>
          </div>
        </div>
      </div>

      <div className={styles.lists_wrap}>
        <div className={styles.align}>
          <div className={styles.left}>
            <span className={styles.txt}>
              <em>{data.totalElements ? data.totalElements : 0}</em>개
            </span>
          </div>
          <div className={styles.right}>
            <div className={styles.box}>
              <Popover
                popoverContent={
                  <div className={`${dropdownPopoverStyles.start} ${dropdownPopoverStyles.dropdown_wrap}`}>
                    <Button>최신순</Button>
                    <Button>과정명순</Button>
                    <Button>조회순</Button>
                  </div>
                }
                className={cn(dropdownPopoverStyles.btn, dropdownPopoverStyles.text)}
                side="bottom"
                align="end"
                sideOffset={10}
              >
                <span>{'최신순'}</span>
                <IcoArrowDown width={16} height={16} stroke="#131C30" />
              </Popover>
            </div>
            <div className={styles.box}>
              {/* 퍼블수정 20250513 : dropdown > popover로 변경 */}
              <Popover
                popoverContent={
                  <div className={`${dropdownPopoverStyles.start} ${dropdownPopoverStyles.dropdown_wrap}`}>
                    <Popover.Close onClick={() => handlePageSizeChange(20)}>{20 + t('개씩')}</Popover.Close>
                    <Popover.Close onClick={() => handlePageSizeChange(50)}>{50 + t('개씩')}</Popover.Close>
                    <Popover.Close onClick={() => handlePageSizeChange(80)}>{80 + t('개씩')}</Popover.Close>
                  </div>
                }
                className={`${dropdownPopoverStyles.btn} ${dropdownPopoverStyles.text}`}
                side="bottom"
                align="end"
                sideOffset={10}
              >
                <span>{size + t('개씩')}</span>
                <IcoArrowDown width={16} height={16} stroke="#131C30" />
              </Popover>
            </div>
            <div className={styles.btn_box}>
              <Button
                onClick={() => {
                  setSortingDisabled(!sortingDisabled);
                }}
              >
                {sortingDisabled ? (
                  <IcoArray width={20} height={20} stroke="#4c515e" fill="none" />
                ) : (
                  <IcoDotpoints width={20} height={20} stroke="#4c515e" fill="none" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Thumnail List */}
        {data.content && data.content.length > 0 ? (
          <ThumbnailList
            items={data.content}
            cols={sortingDisabled ? 2 : 1}
            direction={sortingDisabled ? 'vertical' : 'horizontal'}
          />
        ) : (
          <div className={styles.empty}>
            <EmptyText
              text={t('검색 결과를 찾을 수 없습니다.')}
              description={t('다른 과정명으로 검색해 보세요.')}
            />
          </div>
          )
        }
        {/* pagination */}
        {data.content && data.content.length > 0 && (
          <Pagination
            className={cn(styles.pagenation, styles.paginationItem)}
            pageNumber={0}
            totalPages={5}
            hidePageSizeOptions={true}
            hidePageInfo={true}
            showFirstButton={false}
            showLastButton={false}
            onChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}

export const CategoryDetail = CategoryDetailComponent;
