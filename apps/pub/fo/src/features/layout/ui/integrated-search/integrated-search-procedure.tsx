import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import { cn } from '@learnway/shared';
import { Button, EmptyText } from '@learnway/ui';
import { MobileView, BrowserView } from 'react-device-detect';
import { isMobile } from 'react-device-detect';

import { IcoPlay, IcoRating, IcoHeart, IcoEye, IcoPhone02, IcoMonitor01 } from '@learnway/icons';

import thumnailStyles from '../../../../shared/ui/thumnail/thumnail.module.css';
import styles from './integrated-search-procedure.module.css';

import listImage1 from '@learnway/styles/fo/assets/images/temp/category_product_01.png';

const IntegratedSearchProcedureComponent = () => {
  // 썸네일 list 세로형 : vertical, 가로형 : horizontal
  const [direction, setDirection] = useState('vertical');
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
    <div className={`${styles.start} ${styles.procedure}`}>
      {/* 검색결과 있음 */}
      <div className={styles.list}>
        {/* PC list */}
        <BrowserView>
          <ul className={cn(styles.list_box, direction && styles[direction])}>
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
                  <div className={thumnailStyles.img_box}>
                    <ul className={thumnailStyles.label}>
                      <li style={{ backgroundColor: '#00afd5' }}>New</li>
                      <li style={{ backgroundColor: '#06226a' }}>접수중</li>
                      <li style={{ backgroundColor: '#ff4646' }}>D-7</li>
                    </ul>
                    <div className={thumnailStyles.img}>
                      <img src={listImage1} alt="" />
                    </div>

                    <div className={thumnailStyles.heart}>
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
                  <div className={thumnailStyles.img_box}>
                    <ul className={thumnailStyles.label}>
                      <li style={{ backgroundColor: '#00afd5' }}>New</li>
                      <li style={{ backgroundColor: '#06226a' }}>접수중</li>
                      <li style={{ backgroundColor: '#ff4646' }}>D-7</li>
                    </ul>
                    <div className={thumnailStyles.img}>
                      <img src={listImage1} alt="" />
                    </div>

                    <div className={thumnailStyles.heart}>
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
                  <div className={thumnailStyles.img_box}>
                    <ul className={thumnailStyles.label}>
                      <li style={{ backgroundColor: '#00afd5' }}>New</li>
                      <li style={{ backgroundColor: '#06226a' }}>접수중</li>
                      <li style={{ backgroundColor: '#ff4646' }}>D-7</li>
                    </ul>
                    <div className={thumnailStyles.img}>
                      <img src={listImage1} alt="" />
                    </div>

                    <div className={thumnailStyles.heart}>
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
                  <div className={thumnailStyles.img_box}>
                    <ul className={thumnailStyles.label}>
                      <li style={{ backgroundColor: '#00afd5' }}>New</li>
                      <li style={{ backgroundColor: '#06226a' }}>접수중</li>
                      <li style={{ backgroundColor: '#ff4646' }}>D-7</li>
                    </ul>
                    <div className={thumnailStyles.img}>
                      <img src={listImage1} alt="" />
                    </div>

                    <div className={thumnailStyles.heart}>
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
        </BrowserView>

        {/* MO list */}
        <MobileView>
          <ul className={cn(styles.list_box, direction && styles[direction])}>
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
                  <div className={thumnailStyles.img_box}>
                    <ul className={thumnailStyles.label}>
                      <li style={{ backgroundColor: '#00afd5' }}>New</li>
                    </ul>
                    <div className={thumnailStyles.img}>
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
                  <div className={thumnailStyles.img_box}>
                    <ul className={thumnailStyles.label}>
                      <li style={{ backgroundColor: '#00afd5' }}>New</li>
                    </ul>
                    <div className={thumnailStyles.img}>
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
        </MobileView>
      </div>

      {/* 검색결과 없음 */}
      <div className={styles.empty}>
        <EmptyText
          hideTitle
          size="lg"
          description={'검색 결과를 찾을 수 없습니다.'}
          footer={isMobile ? <Button variant={'primary'} size={'sm'} label={'교육요청'} /> : ''}
        />
      </div>
    </div>
  );
};

export const IntegratedSearchProcedure = IntegratedSearchProcedureComponent;
