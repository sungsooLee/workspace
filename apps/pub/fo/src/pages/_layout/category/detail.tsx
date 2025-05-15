import { createFileRoute, Link } from '@tanstack/react-router';
import React, { useState } from 'react';
import { cn } from '@learnway/shared';
import {
  Dropdown,
  Button,
  Pagination,
  Input,
  ContentsRow,
  Carousel,
  EmptyText,
  Popover,
} from '@learnway/ui';
import { isMobile } from 'react-device-detect';
import { Arrays, Filter } from '../../../features/layout';
import {
  IcoArray,
  IcoDotpoints,
  IcoPlay,
  IcoRating,
  IcoHeart,
  IcoEye,
  IcoPhone02,
  IcoMonitor01,
  IcoArrowDown,
} from '@learnway/icons';

import dropdownPopoverStyles from '../../../shared/ui/dropdown-popover/dropdown-popover.module.css';
import thumnailStyles from '../../../shared/ui/thumnail/thumnail.module.css';
import thumnailImgStyles from '../../../shared/ui/thumnail/thumnail-img.module.css';
import styles from './detail.module.css';

import bnrCImage1 from '@learnway/styles/fo/assets/images/banner/banner_category_01.png';
import bnrCImage2 from '@learnway/styles/fo/assets/images/banner/banner_category_02.png';
import listImage1 from '@learnway/styles/fo/assets/images/temp/category_product_01.png';

export const Route = createFileRoute('/_layout/category/detail')({
  component: RouteComponent,
});

function RouteComponent() {
  // 상단 배너 스와이퍼
  const items = [
    <Link to="">
      <img src={bnrCImage1} alt="" />
    </Link>,
    <Link to="">
      <img src={bnrCImage2} alt="" />
    </Link>,
    <Link to="">
      <img src={bnrCImage1} alt="" />
    </Link>,
  ];

  // pagenation
  const [page, setPage] = React.useState(1);
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  // dropdown
  const [searchValues01, setSearchValues01] = useState<string[]>(['대분류']);
  const [searchValues02, setSearchValues02] = useState<string[]>(['중분류']);
  const [searchValues03, setSearchValues03] = useState<string[]>(['소분류']);

  // 퍼블수정 20250513 : popover 추가
  const DropdownPopoverCompoment = () => {
    return (
      <div className={`${dropdownPopoverStyles.start} ${dropdownPopoverStyles.dropdown_wrap}`}>
        <Button>20개씩</Button>
        <Button>50개씩</Button>
        <Button>80개씩</Button>
      </div>
    );
  };

  const arrays = {
    items: ['최신순', '과정명순', '조회순'],
    initialSelectedItem: 0, // 초기 선택값
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
  // 썸네일 찜
  const [icoHeart, setIcoHeart] = useState(true);
  const handleHeartClick = () => {
    if (icoHeart === true) {
      setIcoHeart(false);
    } else {
      setIcoHeart(true);
    }
  };

  return (
    <div className={styles.start}>
      <div className={styles.swiper}>
        <Carousel
          items={items}
          className={`${styles.recent_swiper} category_swiper`}
          spaceBetween={20}
          slidesPerView={2.2}
          navigation={true}
        />
      </div>

      <div className={styles.gray_box}>
        <ul className={styles.divisio_box}>
          <li>
            <div className={styles.search_division}>
              <Dropdown
                className={styles.search_select}
                size="lg"
                options={[
                  { value: 'a', label: '대분류' },
                  { value: 'b', label: 'ST1' },
                  { value: 'c', label: '아이오닉 6' },
                  { value: 'd', label: '아이오닉 5' },
                  { value: 'e', label: '코나' },
                  { value: 'f', label: '넥쏘' },
                  { value: 'g', label: '포터' },
                  { value: 'h', label: '캐스퍼' },
                ]}
                value={searchValues01}
                onChange={(selected) => setSearchValues01(selected)}
              />
              <Dropdown
                className={styles.search_select}
                size="lg"
                options={[
                  { value: 'a', label: '중분류' },
                  { value: 'b', label: 'NE PE(2024)' },
                  { value: 'c', label: 'NE(2021)' },
                ]}
                value={searchValues02}
                onChange={(selected) => setSearchValues02(selected)}
              />
              <Dropdown
                className={styles.search_select}
                size="lg"
                options={[
                  { value: 'a', label: '소분류' },
                  { value: 'b', label: '상품정보' },
                  { value: 'c', label: '기술정보' },
                ]}
                value={searchValues03}
                onChange={(selected) => setSearchValues03(selected)}
              />
              <ContentsRow className={styles.search}>
                <Input id="" type="text" placeholder="과정명 검색" showSearchIcon={true} />
              </ContentsRow>
            </div>
          </li>
          <li>
            <Filter></Filter>
          </li>
        </ul>
      </div>

      <div className={styles.lists_wrap}>
        <p className={styles.search_text}>“파파파파”의 검색결과</p>

        <div className={styles.align}>
          <div className={styles.left}>
            <span className={styles.txt}>
              <em>32</em>개
            </span>
          </div>
          <div className={styles.right}>
            {/* 퍼블수정 20250313 : arraysData 데이터 삽입 */}
            <Arrays arraysData={arrays} className={styles.array}></Arrays>
            <div className={styles.box}>
              {/* 퍼블수정 20250513 : dropdown > popover로 변경 */}
              <Popover
                popoverContent={<DropdownPopoverCompoment />}
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
                {/* 퍼블수정 20250313 : 아이콘 사이즈 수정 */}
                {direction === 'horizontal' ? (
                  <IcoArray width={20} height={20} stroke="#4c515e" fill="none" />
                ) : (
                  <IcoDotpoints width={20} height={20} stroke="#4c515e" fill="none" />
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
                      <li style={{ backgroundColor: '#06226a' }}>접수중</li>
                      <li style={{ backgroundColor: '#ff4646' }}>D-7</li>
                    </ul>
                    <div className={thumnailImgStyles.img}>
                      <img src={listImage1} alt="" />
                    </div>

                    <div className={thumnailImgStyles.heart}>
                      <Button
                        className={cn(
                          thumnailStyles.btn_heart,
                          icoHeart === true ? thumnailStyles.active : '',
                        )}
                        onClick={handleHeartClick}
                      >
                        <IcoHeart
                          width={24}
                          height={24}
                          fill={icoHeart === true ? '#fff' : 'none'}
                          stroke="#fff"
                        ></IcoHeart>
                      </Button>
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

                    <div className={thumnailStyles.ico_box}>
                      <span className={thumnailStyles.ico_rating}>
                        <IcoRating className={thumnailStyles.ico}></IcoRating>
                        {/* rating */}
                        <span className={thumnailStyles.txt}>4.2</span>
                      </span>
                      <span className={thumnailStyles.ico_heart}>
                        <IcoHeart
                          className={thumnailStyles.ico}
                          fill="none"
                          stroke="#a9afb8"
                        ></IcoHeart>
                        {/* heart */}
                        <span className={thumnailStyles.txt}>33</span>
                      </span>
                      <span className={thumnailStyles.ico_eye}>
                        <IcoEye className={thumnailStyles.ico} fill="none" stroke="#a9afb8" />
                        {/* eye */}
                        <span className={thumnailStyles.txt}>55</span>
                      </span>
                    </div>

                    <div className={thumnailStyles.related_box}>
                      <span className={thumnailStyles.related}>
                        <IcoPhone02 className={thumnailStyles.ico} fill="none" stroke="#4c515e" />
                        <span className={thumnailStyles.txt}>모바일전용</span>
                      </span>
                      <span className={thumnailStyles.related}>
                        <IcoMonitor01 className={thumnailStyles.ico} fill="none" stroke="#4c515e" />
                        <span className={thumnailStyles.txt}>사내IP전용</span>
                      </span>
                      <span className={thumnailStyles.related}>
                        <span className={thumnailStyles.txt}>#AI기술</span>
                      </span>
                      <span className={thumnailStyles.related}>
                        <span className={thumnailStyles.txt}>#AI기술</span>
                      </span>
                      <span className={thumnailStyles.related}>
                        <span className={thumnailStyles.txt}>#AI기술</span>
                      </span>
                    </div>
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
                      <li style={{ backgroundColor: '#06226a' }}>접수중</li>
                      <li style={{ backgroundColor: '#ff4646' }}>D-7</li>
                    </ul>
                    <div className={thumnailImgStyles.img}>
                      <img src={listImage1} alt="" />
                    </div>

                    <div className={thumnailImgStyles.heart}>
                      <Button
                        className={cn(
                          thumnailStyles.btn_heart,
                          icoHeart === true ? thumnailStyles.active : '',
                        )}
                        onClick={handleHeartClick}
                      >
                        <IcoHeart
                          width={24}
                          height={24}
                          fill={icoHeart === true ? '#fff' : 'none'}
                          stroke="#fff"
                        ></IcoHeart>
                      </Button>
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

                    <div className={thumnailStyles.ico_box}>
                      <span className={thumnailStyles.ico_rating}>
                        <IcoRating className={thumnailStyles.ico}></IcoRating>
                        {/* rating */}
                        <span className={thumnailStyles.txt}>4.2</span>
                      </span>
                      <span className={thumnailStyles.ico_heart}>
                        <IcoHeart
                          className={thumnailStyles.ico}
                          fill="none"
                          stroke="#a9afb8"
                        ></IcoHeart>
                        {/* heart */}
                        <span className={thumnailStyles.txt}>33</span>
                      </span>
                      <span className={thumnailStyles.ico_eye}>
                        <IcoEye className={thumnailStyles.ico} fill="none" stroke="#a9afb8" />
                        {/* eye */}
                        <span className={thumnailStyles.txt}>55</span>
                      </span>
                    </div>

                    <div className={thumnailStyles.related_box}>
                      <span className={thumnailStyles.related}>
                        <IcoPhone02 className={thumnailStyles.ico} fill="none" stroke="#4c515e" />
                        <span className={thumnailStyles.txt}>모바일전용</span>
                      </span>
                      <span className={thumnailStyles.related}>
                        <IcoMonitor01 className={thumnailStyles.ico} fill="none" stroke="#4c515e" />
                        <span className={thumnailStyles.txt}>사내IP전용</span>
                      </span>
                      <span className={thumnailStyles.related}>
                        <span className={thumnailStyles.txt}>#AI기술</span>
                      </span>
                      <span className={thumnailStyles.related}>
                        <span className={thumnailStyles.txt}>#AI기술</span>
                      </span>
                      <span className={thumnailStyles.related}>
                        <span className={thumnailStyles.txt}>#AI기술</span>
                      </span>
                    </div>
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
                      <li style={{ backgroundColor: '#06226a' }}>접수중</li>
                      <li style={{ backgroundColor: '#ff4646' }}>D-7</li>
                    </ul>
                    <div className={thumnailImgStyles.img}>
                      <img src={listImage1} alt="" />
                    </div>

                    <div className={thumnailImgStyles.heart}>
                      <Button
                        className={cn(
                          thumnailStyles.btn_heart,
                          icoHeart === true ? thumnailStyles.active : '',
                        )}
                        onClick={handleHeartClick}
                      >
                        <IcoHeart
                          width={24}
                          height={24}
                          fill={icoHeart === true ? '#fff' : 'none'}
                          stroke="#fff"
                        ></IcoHeart>
                      </Button>
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

                    <div className={thumnailStyles.ico_box}>
                      <span className={thumnailStyles.ico_rating}>
                        <IcoRating className={thumnailStyles.ico}></IcoRating>
                        {/* rating */}
                        <span className={thumnailStyles.txt}>4.2</span>
                      </span>
                      <span className={thumnailStyles.ico_heart}>
                        <IcoHeart
                          className={thumnailStyles.ico}
                          fill="none"
                          stroke="#a9afb8"
                        ></IcoHeart>
                        {/* heart */}
                        <span className={thumnailStyles.txt}>33</span>
                      </span>
                      <span className={thumnailStyles.ico_eye}>
                        <IcoEye className={thumnailStyles.ico} fill="none" stroke="#a9afb8" />
                        {/* eye */}
                        <span className={thumnailStyles.txt}>55</span>
                      </span>
                    </div>

                    <div className={thumnailStyles.related_box}>
                      <span className={thumnailStyles.related}>
                        <IcoPhone02 className={thumnailStyles.ico} fill="none" stroke="#4c515e" />
                        <span className={thumnailStyles.txt}>모바일전용</span>
                      </span>
                      <span className={thumnailStyles.related}>
                        <IcoMonitor01 className={thumnailStyles.ico} fill="none" stroke="#4c515e" />
                        <span className={thumnailStyles.txt}>사내IP전용</span>
                      </span>
                      <span className={thumnailStyles.related}>
                        <span className={thumnailStyles.txt}>#AI기술</span>
                      </span>
                      <span className={thumnailStyles.related}>
                        <span className={thumnailStyles.txt}>#AI기술</span>
                      </span>
                      <span className={thumnailStyles.related}>
                        <span className={thumnailStyles.txt}>#AI기술</span>
                      </span>
                    </div>
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
                      <li style={{ backgroundColor: '#06226a' }}>접수중</li>
                      <li style={{ backgroundColor: '#ff4646' }}>D-7</li>
                    </ul>
                    <div className={thumnailImgStyles.img}>
                      <img src={listImage1} alt="" />
                    </div>

                    <div className={thumnailImgStyles.heart}>
                      <Button
                        className={cn(
                          thumnailStyles.btn_heart,
                          icoHeart === true ? thumnailStyles.active : '',
                        )}
                        onClick={handleHeartClick}
                      >
                        <IcoHeart
                          width={24}
                          height={24}
                          fill={icoHeart === true ? '#fff' : 'none'}
                          stroke="#fff"
                        ></IcoHeart>
                      </Button>
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

                    <div className={thumnailStyles.ico_box}>
                      <span className={thumnailStyles.ico_rating}>
                        <IcoRating className={thumnailStyles.ico}></IcoRating>
                        {/* rating */}
                        <span className={thumnailStyles.txt}>4.2</span>
                      </span>
                      <span className={thumnailStyles.ico_heart}>
                        <IcoHeart
                          className={thumnailStyles.ico}
                          fill="none"
                          stroke="#a9afb8"
                        ></IcoHeart>
                        {/* heart */}
                        <span className={thumnailStyles.txt}>33</span>
                      </span>
                      <span className={thumnailStyles.ico_eye}>
                        <IcoEye className={thumnailStyles.ico} fill="none" stroke="#a9afb8" />
                        {/* eye */}
                        <span className={thumnailStyles.txt}>55</span>
                      </span>
                    </div>

                    <div className={thumnailStyles.related_box}>
                      <span className={thumnailStyles.related}>
                        <IcoPhone02 className={thumnailStyles.ico} fill="none" stroke="#4c515e" />
                        <span className={thumnailStyles.txt}>모바일전용</span>
                      </span>
                      <span className={thumnailStyles.related}>
                        <IcoMonitor01 className={thumnailStyles.ico} fill="none" stroke="#4c515e" />
                        <span className={thumnailStyles.txt}>사내IP전용</span>
                      </span>
                      <span className={thumnailStyles.related}>
                        <span className={thumnailStyles.txt}>#AI기술</span>
                      </span>
                      <span className={thumnailStyles.related}>
                        <span className={thumnailStyles.txt}>#AI기술</span>
                      </span>
                      <span className={thumnailStyles.related}>
                        <span className={thumnailStyles.txt}>#AI기술</span>
                      </span>
                    </div>
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

        {/* 검색결과 없음 */}
        <div className={styles.empty}>
          <EmptyText
            text={'검색 결과를 찾을 수 없습니다.'}
            description={'다른 과정명으로 검색해 보세요.'}
          />
        </div>
      </div>
    </div>
  );
}
