import { createFileRoute, Link } from '@tanstack/react-router';
import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@learnway/shared';
import { Button, ContentsRow, Input, Dropdown, Pagination, useModal, Popover } from '@learnway/ui';
import {
  IcoArrowDown,
  IcoArrowForward,
  IcoFilter,
  IcoArray,
  IcoDotpoints,
  IcoPlay,
} from '@learnway/icons';
import { CategoryDepthPopupM, FilterPopup } from '../../../features/layout';

import dropdownPopoverStyles from '../../../shared/ui/dropdown-popover/dropdown-popover.module.css';
import thumnailStyles from '../../../shared/ui/thumnail/thumnail.module.css';
import thumnailImgStyles from '../../../shared/ui/thumnail/thumnail-img.module.css';

import styles from './detail_m.module.css';

import listImage1 from '@learnway/styles/fo/assets/images/temp/category_product_01.png';

export const Route = createFileRoute('/_layout/category/detail_m')({
  component: RouteComponent,
});

function RouteComponent() {
  const { open: openModal } = useModal();

  // dropdown
  const [divisionValues, setDivisionValues] = useState<string[]>(['분류선택']);

  // 퍼블수정 20250513 : popover 추가
  const DropdownPopoverCompoment = () => {
    return (
      <div className={`${dropdownPopoverStyles.start} ${dropdownPopoverStyles.dropdown_wrap}`}>
        <Button>최신순</Button>
        <Button>과정명순</Button>
        <Button>조회순</Button>
      </div>
    );
  };

  // 퍼블수정 20250513 : popover 추가
  const DropdownPopoverCompoment2 = () => {
    return (
      <div className={`${dropdownPopoverStyles.start} ${dropdownPopoverStyles.dropdown_wrap}`}>
        <Button>20개씩</Button>
        <Button>50개씩</Button>
        <Button>80개씩</Button>
      </div>
    );
  };

  // 필터 선택된 값이 있으면 true 변경
  const [selectCheck, setSelectCheck] = useState(true);

  // pagenation
  const [page, setPage] = React.useState(1);
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  // 썸네일 list (가로형, 세로형) 변경
  const [direction, setDirection] = useState('vertical');
  const list_ui = () => {
    if (direction === 'vertical') {
      setDirection('horizontal'); // 가로형
    } else {
      setDirection('vertical'); // 세로형
    }
  };

  return (
    <div className={`${styles.start} ${styles.detail_m}`}>
      <ul className={styles.category_box}>
        <li>
          <Button>
            서비스
            <span>
              <IcoArrowDown width={16} height={16} stroke="#6f798b"></IcoArrowDown>
            </span>
            <IcoArrowForward
              width={12}
              height={12}
              stroke="#6f798b"
              className={styles.arr}
            ></IcoArrowForward>
          </Button>
        </li>
        <li>
          <Button>
            차량정보
            <span>
              <IcoArrowDown width={16} height={16} stroke="#6f798b"></IcoArrowDown>
            </span>
            <IcoArrowForward
              width={12}
              height={12}
              stroke="#6f798b"
              className={styles.arr}
            ></IcoArrowForward>
          </Button>
        </li>
        <li>
          <Button>
            수소/전기차
            <span>
              <IcoArrowDown width={16} height={16} stroke="#6f798b"></IcoArrowDown>
            </span>
          </Button>
        </li>
      </ul>

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
          <Button
            className={styles.btn_drop}
            onClick={() =>
              openModal({
                width: 'm_bottom_sheet',
                content: <CategoryDepthPopupM />,
              })
            }
          >
            분류선택
            <IcoArrowDown width={16} height={16} stroke="#131c30" />
          </Button>
        </div>
        <div className={styles.box}>
          <ContentsRow className={styles.search}>
            <Input id="" type="text" placeholder="과정명 검색" showSearchIcon={true} />
          </ContentsRow>

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
              ></IcoFilter>
            </Button>
          </div>
        </div>
      </div>

      <div className={styles.lists_wrap}>
        <div className={styles.align}>
          <div className={styles.left}>
            <span className={styles.txt}>
              <em>32</em>개
            </span>
          </div>
          <div className={styles.right}>
            <div className={styles.box}>
              {/* 퍼블수정 20250513 : dropdown > popover로 변경 */}
              <Popover
                popoverContent={<DropdownPopoverCompoment />}
                className={`${dropdownPopoverStyles.btn} ${dropdownPopoverStyles.text}`}
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
                popoverContent={<DropdownPopoverCompoment2 />}
                className={`${dropdownPopoverStyles.btn} ${dropdownPopoverStyles.text}`}
                side="bottom"
                align="end"
                sideOffset={10}
              >
                <span>{'20개씩'}</span>
                <IcoArrowDown width={16} height={16} stroke="#131C30" />
              </Popover>
            </div>
            <div className={styles.box}>
              <Button onClick={list_ui}>
                {direction === 'horizontal' ? (
                  <IcoArray width={16} height={16} stroke="#4c515e" fill="none" />
                ) : (
                  <IcoDotpoints width={16} height={16} stroke="#4c515e" fill="none" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* 검색결과 있음 */}
        <div className={styles.list}>
          <ul className={cn(styles.list_box, styles[direction])}>
            <li>
              {/* thumnail module */}
              <div
                className={cn(
                  thumnailStyles.start,
                  thumnailStyles.thumbnail,
                  direction && thumnailStyles[direction],
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
                  direction && thumnailStyles[direction],
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
                  direction && thumnailStyles[direction],
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
                  direction && thumnailStyles[direction],
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

          {/* pagination */}
          <Pagination
            className={cn(styles.pagenation, styles.paginationItem)}
            count={3}
            page={page}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
