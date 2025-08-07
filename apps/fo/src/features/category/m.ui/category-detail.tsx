import React, { FC, useEffect, useState } from 'react';
import { Input } from '@learnway/ui/input';
import { Button } from '@learnway/ui/button';
import { Popover } from '@learnway/ui/popover';
import { EmptyText } from '@learnway/ui/empty-text';
import { Pagination } from '@learnway/ui/pagination';
import { useModal } from '@learnway/ui/modal';
import { cn } from '@learnway/shared';
import { IcoArray, IcoArrowDown, IcoDotpoints, IcoFilter } from '@learnway/icons';
import dropdownPopoverStyles from '../../../shared/ui/dropdown-popover/dropdown-popover.module.css';
import styles from '@learnway/styles/fo/pages/_layout/category/category_m.module.css';

import CategoryService from '@entities/category/api/category';
import { t } from 'i18next'
import { useFetchCategoryDetail } from '@entities/category';
import { ThumbnailList } from '@shared/ui/thumnail/list/thumbnail-list';
import { CategoryFilterPopup } from '@shared/ui/category/category-filter-popup';
import { CODE_GROUP, useCodeStore } from '@learnway/hooks';
import { CategoryDepthPopupM } from '@features/layout';
import { useRouterState } from '@tanstack/react-router';
import { CategoryDetailComponentProps, collectDepths, findNodeById } from '@features/category';
import { Dropdown } from '@learnway/ui/dropdown';

type DivisionOptionsType = { label: string; value: number; }

const CategoryDetailComponent: FC<any> = ({categoryId} : CategoryDetailComponentProps) => {
  const showLanguageCode = ['KO', 'EN', 'ZH', 'JA']
  const routerState = useRouterState();
  const { getCode } = useCodeStore();
  const { openModal } = useModal();
  const { data: categoryInfo } = useFetchCategoryDetail(categoryId);

  const [depth, setDepth] = useState(0);
  const [division, setDivision] = useState<boolean>(false);
  const [divisionOptions, setDivisionOptions] = useState<DivisionOptionsType[]>([]);
  const [divisionValues, setDivisionValues] = useState<string|null>();
  const [buttonLabel, setButtonLabel] = useState<string>(t('분류선택'));

  const [targetNode, setTargetNode] = useState(null);
  const [tenantId, setTenantId] = useState(routerState.location.state.tenantId);
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

  const [selectedCardOptions, setSelectedCardOptions] = useState({
    lecture: [], enrollment: [], difficulty: [], language: []
  });
  const [filter, setFilter] = useState<any>();
  const [difficultyCodes, setDifficultyCodes] = useState<any>();
  const [languageCodes, setLanguageCodes] = useState<any>();
  const [initialSelectedItem, setInitialSelectedItem] = useState<any>(0);

  const arrays = [t('최신순'), t('과정명순'), t('조회순')];

  const handlePageChange = (value: number) => {
    setPage(value);
  };
  const handlePageSizeChange = (value: number) => {
    setSize(value)
    setPage(0)
  }
  const handleOpenFilterModal = () => {
    // 현재 선택된 필터 칩에서 카테고리별 필터 값 추출
    const codes = {
      lectureType: filter,
      enrollment: [
        {label: t('수강신청 가능'), value: 'allow'},
        {label: t('수강신청 불가능'), value: 'reject'}
      ],
      difficulty: difficultyCodes,
      language: languageCodes,
    }
    openModal({
      // title: '필터',
      width: 'm_bottom_sheet',
      content: <CategoryFilterPopup initialFilters={selectedCardOptions} filterCodes={codes}/>,
      onClose: (data: any) => {
        if( data ) {
          const isAllEmpty = Object.values(data).some((item: any) => item.length > 0);
          setSelectCheck(isAllEmpty);
          setSelectedCardOptions(data)
        }
      },
    });
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
    setInitialSelectedItem(sortingIdx)
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

  const fetchCoursesCategory = async (payload: any) => {
    const courses = await CategoryService.getFetchCoursesCategory(payload);
    setData(courses)
  }

  const handleShowDepthSelector = async (option: number) => {
    if( option === 0 ) {
      const payload = {
        ...coursePayload,
        categoryId,
      }
      setCoursePayload(payload)
      await fetchCoursesCategory(payload)
    } else {
      const { depth4 } = collectDepths(targetNode);
      const value = depth4.flat().filter((row: DivisionOptionsType) => row.value === option);
      setDivisionValues(value[0].label)
      const payload = {
        ...coursePayload,
        categoryId: value[0].value,
      }
      setCoursePayload(payload)
      await fetchCoursesCategory(payload)
    }
  }

  const handleCategoryDepthPopup = async (data: any) => {
    console.log('#### filter popup data => ', data)
    let targetId: number = categoryId
    let label: string = buttonLabel;
    if( data ) {
      const hasParentId = Object.values(data).some((obj: any) => {
        return 'parentId' in obj;
      });
      const foundBottom: any = Object.values(data).find((obj: any) => 'parentId' in obj);
      const foundTop: any = Object.values(data).find((obj: any) => !('parentId' in obj));
      if (hasParentId) {
        targetId = foundBottom.value;
        label = `${foundTop.label} > ${foundBottom.label}`
      } else {
        targetId = foundTop.value;
        label = `${foundTop.label}`
      }
    }
    const payload = {
      ...coursePayload,
      categoryId: targetId,
    }
    setCoursePayload(payload)
    setButtonLabel(label)
    await fetchCoursesCategory(payload)
  }

  useEffect(() => {
    if( depth === 3) {
      (async() => {
        const categoryTree = await CategoryService.getFetchCategoryTree(tenantId);
        const targetCategory = findNodeById(categoryTree.children, categoryId);
        const { depth4, depth5 } = collectDepths(targetCategory);
        setTargetNode(targetCategory);
        setDivisionOptions(depth4);
        if( depth5 && depth5.length > 0 ) {
          setDivision(true);
        }
      })();
    }
  }, [depth]);

  useEffect(() => {
    (async () => {
      if( selectedCardOptions ) {
        const enrollment = selectedCardOptions.enrollment ? selectedCardOptions.enrollment.map((row: any) => row.value) : [];
        const payload = {
          ...coursePayload,
          courseType: selectedCardOptions.lecture ? selectedCardOptions.lecture.map( (row: any) => row.value) : null,
          trainingLevelType: selectedCardOptions.difficulty ? selectedCardOptions.difficulty.map( (row: any) => row.value) : null,
          language: selectedCardOptions.language ? selectedCardOptions.language.map( (row: any) => row.value) : null,
          isEnrollEnabled: enrollment.length !== 0 ? enrollment[0] === 'allow' : null,
        }
        setCoursePayload(payload);
        await fetchCoursesCategory(payload)
      }
    })();
  }, [selectedCardOptions]);

  useEffect(() => {
    if( categoryInfo ) {
      (async () => {
        setDepth(routerState.location.state.depth);
        const payload = {
          ...coursePayload,
          page, size,
          categoryId: categoryInfo.categoryId,
        }
        setCoursePayload(payload);
        await fetchCoursesCategory(payload)
      })();
    }
  }, [categoryInfo, page, size])

  useEffect(() => {
    (async () => {
      const data = await getCode(CODE_GROUP['lms.course.CourseType']);
      const defaultOptions = data.map((item: any) => {
        return { label: item.cdName, value: item.value };
      });
      const difficultyData = await getCode(CODE_GROUP['lms.course.TrainingLevelType']);
      const difficultyOptions = difficultyData
        .filter((item: any) => item.cdId !== 'NONE')
        .map((item: any) => {
          return { label: item.cdContent, value: item.value };
        });
      const languageData = await getCode(CODE_GROUP['pms.multilingual.LangCountryCode']);
      const languageOptions = languageData
        .filter((item: any) => showLanguageCode.includes(item.cdId) )
        .map((item: any) => {
          return { label: item.referenceVal1.korLanguageName, value: item.value };
        });
      const etcLanguageValue = languageData
        .filter((item: any) => !showLanguageCode.includes(item.cdId) )
        .map((item: any) => item.value);
      languageOptions.push({label: t('기타 언어'), value: etcLanguageValue});

      setFilter(defaultOptions)
      setDifficultyCodes(difficultyOptions)
      setLanguageCodes(languageOptions)
    })();
  }, []);

  return (
    <div className={cn(styles.start, styles.detail_m)}>
      <div className={styles.gray_box}>
        <div className={styles.box}>
          {
            depth === 3 && (
              division ? (
                (
                  <Button
                    className={styles.btn_drop}
                    label={buttonLabel}
                    onClick={() =>
                      openModal({
                        width: 'm_bottom_sheet',
                        content: <CategoryDepthPopupM nodes={targetNode}/>,
                        onClose(data: any) {
                          handleCategoryDepthPopup(data);
                        },
                      })
                    }
                    icon={<IcoArrowDown width={16} height={16} stroke="#131c30" />}
                  />
                )
              ) : (
                <Dropdown
                  className={styles.select}
                  options={divisionOptions}
                  value={divisionValues}
                  placeholder={t('분류선택')}
                  onChange={handleShowDepthSelector}
                />
              )
            )
          }
        </div>
        <div className={styles.box}>
          <div className={styles.search_input}>
            <Input
              type="text"
              placeholder="과정명 검색"
              inputSize={'lg'}
              showSearchIcon
              value={courseName}
              onChange={(e) => {
                setCourseName(e.target.value);
              }}
              onEnterKeyDown={handleOnSearch}
            />
          </div>

          <div className={styles.filter_wrap}>
            <Button
              className={cn(styles.btn_filter, selectCheck === true ? styles.selected : '')}
              onClick={handleOpenFilterModal}
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
                  <div
                    className={`${dropdownPopoverStyles.start} ${dropdownPopoverStyles.dropdown_wrap}`}
                  >
                    <Popover.Close onClick={() => handleSearchSortable(0)}>{arrays[0]}</Popover.Close>
                    <Popover.Close onClick={() => handleSearchSortable(1)}>{arrays[1]}</Popover.Close>
                    <Popover.Close onClick={() => handleSearchSortable(2)}>{arrays[2]}</Popover.Close>
                  </div>
                }
                className={cn(dropdownPopoverStyles.btn, dropdownPopoverStyles.text)}
                side="bottom"
                align="end"
                sideOffset={10}
              >
                <span>{arrays[initialSelectedItem]}</span>
                <IcoArrowDown width={16} height={16} stroke="#131C30" />
              </Popover>
            </div>
            <div className={styles.box}>
              {/* 퍼블수정 20250513 : dropdown > popover로 변경 */}
              <Popover
                popoverContent={
                  <div
                    className={`${dropdownPopoverStyles.start} ${dropdownPopoverStyles.dropdown_wrap}`}
                  >
                    <Popover.Close onClick={() => handlePageSizeChange(20)}>
                      {20 + t('개씩')}
                    </Popover.Close>
                    <Popover.Close onClick={() => handlePageSizeChange(50)}>
                      {50 + t('개씩')}
                    </Popover.Close>
                    <Popover.Close onClick={() => handlePageSizeChange(80)}>
                      {80 + t('개씩')}
                    </Popover.Close>
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
            <div className={styles.box}>
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
        )}
        {/* pagination */}
        {data.content && data.content.length > 0 && (
          <Pagination
            className={cn(styles.pagenation, styles.paginationItem)}
            pageNumber={page}
            totalPages={data.totalPages}
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

export const CategoryDetailM = CategoryDetailComponent;
