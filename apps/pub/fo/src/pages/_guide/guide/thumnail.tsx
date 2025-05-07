import { createFileRoute, Link } from '@tanstack/react-router';
import React, { useState } from 'react';
import { cn } from '@learnway/shared';
import { Button } from '@learnway/ui';

import ThumnailStyles from '../../../shared/ui/thumnail/thumnail.module.css';

import { IcoPlay, IcoRating, IcoHeart, IcoEye, IcoPhone02, IcoMonitor01 } from '@learnway/icons';

import playImg from '@learnway/styles/fo/assets/images/common/img_play.png';
import listImage1 from '@learnway/styles/fo/assets/images/temp/category_product_01.png';

export const Route = createFileRoute('/_guide/guide/thumnail')({
  component: RouteComponent,
});

function RouteComponent() {
  // 썸네일 라벨
  const label = [
    { text: 'New', color: '#00afd5' },
    { text: '접수중', color: '#06226a' },
    { text: 'D-7', color: '#ff4646' },
  ];
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
    <div>
      <h2 className="guide_tit2">썸네일 Page Component</h2>
      <p className="loc css">
        import ThumnailStyles from '../../../shared/ui/thumnail/thumnail.module.css';
      </p>
      <p className="loc react">
        <Link to="/category/detail">예제링크</Link>
      </p>

      <div className="group">
        <h3 className="guide_tit3">썸네일 세로형 미리보기</h3>
        <div className="flex_box">
          <div className="desc">
            <div
              className={cn(
                ThumnailStyles.start,
                ThumnailStyles.thumbnail,
                ThumnailStyles.vertical,
              )}
            >
              {/* link (찜 기능과 겹침으로 따로 빠짐) */}
              <Link to="" className={ThumnailStyles.link}></Link>

              <div className={ThumnailStyles.thumnail_box}>
                {/* img */}
                <div className={ThumnailStyles.img_box}>
                  <ul className={ThumnailStyles.label}>
                    {label.map((labels, index) => (
                      <li key={index} style={{ backgroundColor: labels.color }}>
                        {labels.text}
                      </li>
                    ))}
                  </ul>
                  <div className={ThumnailStyles.img}>
                    <img src={listImage1} alt="" />
                    {/* play img */}
                    <div className={ThumnailStyles.img_play}>
                      <img src={playImg} alt="" />
                    </div>
                  </div>

                  <div className={ThumnailStyles.heart}>
                    <Button
                      className={cn(
                        ThumnailStyles.btn_heart,
                        icoHeart === true ? ThumnailStyles.active : '',
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
                <div className={ThumnailStyles.text_box}>
                  <div className={ThumnailStyles.type}>
                    {/* type */}
                    <span className={ThumnailStyles.txt}>동영상</span>
                    <span className={ThumnailStyles.time}>
                      {/* time icon */}
                      <IcoPlay width={12} height={12} fill="#6f798b" />
                      {/* time */}
                      04:59
                    </span>
                  </div>
                  <p className={ThumnailStyles.text}>필수개발과정</p>

                  <div className={ThumnailStyles.ico_box}>
                    <span className={ThumnailStyles.ico_rating}>
                      <IcoRating className={ThumnailStyles.ico}></IcoRating>
                      {/* rating */}
                      <span className={ThumnailStyles.txt}>4.2</span>
                    </span>
                    <span className={ThumnailStyles.ico_heart}>
                      <IcoHeart
                        className={ThumnailStyles.ico}
                        fill="none"
                        stroke="#a9afb8"
                      ></IcoHeart>
                      {/* heart */}
                      <span className={ThumnailStyles.txt}>33</span>
                    </span>
                    <span className={ThumnailStyles.ico_eye}>
                      <IcoEye className={ThumnailStyles.ico} fill="none" stroke="#a9afb8" />
                      {/* eye */}
                      <span className={ThumnailStyles.txt}>55</span>
                    </span>
                  </div>

                  <div className={ThumnailStyles.related_box}>
                    <span className={ThumnailStyles.related}>
                      <IcoPhone02 className={ThumnailStyles.ico} fill="none" stroke="#4c515e" />
                      <span className={ThumnailStyles.txt}>모바일전용</span>
                    </span>
                    <span className={ThumnailStyles.related}>
                      <IcoMonitor01 className={ThumnailStyles.ico} fill="none" stroke="#4c515e" />
                      <span className={ThumnailStyles.txt}>사내IP전용</span>
                    </span>
                    <span className={ThumnailStyles.related}>
                      <span className={ThumnailStyles.txt}>#AI기술</span>
                    </span>
                    <span className={ThumnailStyles.related}>
                      <span className={ThumnailStyles.txt}>#AI기술</span>
                    </span>
                    <span className={ThumnailStyles.related}>
                      <span className={ThumnailStyles.txt}>#AI기술</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="code_example">
          <pre className="code_block">
            <code>{`// 기본 호출방법
import { Link } from '@tanstack/react-router';
import ThumnailStyles from '../../../shared/ui/thumnail/thumnail.module.css';
import { cn } from '@learnway/shared';
import { Button } from '@learnway/ui';
import {
  IcoPlay,
  IcoRating,
  IcoHeart,
  IcoEye,
  IcoPhone02,
  IcoMonitor01,
} from '@learnway/icons';
 import playImg from '@learnway/styles/fo/assets/images/common/img_play.png';
import listImage1 from '@learnway/styles/fo/assets/images/temp/category_product_01.png';

  // 썸네일 라벨
  const label = [
    { text: 'New', color: '#00afd5' },
    { text: '접수중', color: '#06226a' },
    { text: 'D-7', color: '#ff4646' },
  ];
  // 썸네일 찜
  const [icoHeart, setIcoHeart] = useState(true);
  const handleHeartClick = () => {
    if (icoHeart === true) {
      setIcoHeart(false);
    } else {
      setIcoHeart(true);
    }
  };

// 사용 예제
<div
  className={cn(
    ThumnailStyles.start,
    ThumnailStyles.thumbnail,
    ThumnailStyles.vertical,
  )}
>
  {/* link (찜 기능과 겹침으로 따로 빠짐) */}
  <Link to="" className={ThumnailStyles.link}></Link>

  <div className={ThumnailStyles.thumnail_box}>
    {/* img */}
    <div className={ThumnailStyles.img_box}>
      <ul className={ThumnailStyles.label}>
        {label.map((labels, index) => (
          <li key={index} style={{ backgroundColor: labels.color }}>
            {labels.text}
          </li>
        ))}
      </ul>
      <div className={ThumnailStyles.img}>
        <img src={listImage1} alt="" />
        {/* play img */}
        <div className={ThumnailStyles.img_play}>
          <img src={playImg} alt="" />
        </div>
      </div>

      <div className={ThumnailStyles.heart}>
        <Button
          className={cn(
            ThumnailStyles.btn_heart,
            icoHeart === true ? ThumnailStyles.active : ""
          )}
          onClick={handleHeartClick}
        >
          <IcoHeart
            width={24}
            height={24}
            fill={icoHeart === true ? "#fff" : "none"}
            stroke="#fff"
          ></IcoHeart>
        </Button>
      </div>
    </div>
    {/* txt */}
    <div className={ThumnailStyles.text_box}>
      <div className={ThumnailStyles.type}>
        {/* type */}
        <span className={ThumnailStyles.txt}>동영상</span>
        <span className={ThumnailStyles.time}>
          {/* time icon */}
          <IcoPlay width={12} height={12} fill="#6f798b" />
          {/* time */}
          04:59
        </span>
      </div>
      <p className={ThumnailStyles.text}>필수개발과정</p>

      <div className={ThumnailStyles.ico_box}>
        <span className={ThumnailStyles.ico_rating}>
          <IcoRating className={ThumnailStyles.ico}></IcoRating>
          {/* rating */}
          <span className={ThumnailStyles.txt}>4.2</span>
        </span>
        <span className={ThumnailStyles.ico_heart}>
          <IcoHeart
            className={ThumnailStyles.ico}
            fill="none"
            stroke="#a9afb8"
          ></IcoHeart>
          {/* heart */}
          <span className={ThumnailStyles.txt}>33</span>
        </span>
        <span className={ThumnailStyles.ico_eye}>
          <IcoEye className={ThumnailStyles.ico} fill="none" stroke="#a9afb8" />
          {/* eye */}
          <span className={ThumnailStyles.txt}>55</span>
        </span>
      </div>

      <div className={ThumnailStyles.related_box}>
        <span className={ThumnailStyles.related}>
          <IcoPhone02
            className={ThumnailStyles.ico}
            fill="none"
            stroke="#4c515e"
          />
          <span className={ThumnailStyles.txt}>모바일전용</span>
        </span>
        <span className={ThumnailStyles.related}>
          <IcoMonitor01
            className={ThumnailStyles.ico}
            fill="none"
            stroke="#4c515e"
          />
          <span className={ThumnailStyles.txt}>사내IP전용</span>
        </span>
        <span className={ThumnailStyles.related}>
          <span className={ThumnailStyles.txt}>#AI기술</span>
        </span>
        <span className={ThumnailStyles.related}>
          <span className={ThumnailStyles.txt}>#AI기술</span>
        </span>
        <span className={ThumnailStyles.related}>
          <span className={ThumnailStyles.txt}>#AI기술</span>
        </span>
      </div>
    </div>
  </div>
</div>
`}</code>
          </pre>
        </div>
      </div>

      <div className="group">
        <h3 className="guide_tit3">썸네일 가로형 미리보기</h3>
        <div className="flex_box">
          <div className="desc">
            <div
              className={cn(
                ThumnailStyles.start,
                ThumnailStyles.thumbnail,
                ThumnailStyles.horizontal,
              )}
            >
              {/* link (찜 기능과 겹침으로 따로 빠짐) */}
              <Link to="" className={ThumnailStyles.link}></Link>

              <div className={ThumnailStyles.thumnail_box}>
                {/* img */}
                <div className={ThumnailStyles.img_box}>
                  <ul className={ThumnailStyles.label}>
                    {label.map((labels, index) => (
                      <li key={index} style={{ backgroundColor: labels.color }}>
                        {labels.text}
                      </li>
                    ))}
                  </ul>
                  <div className={ThumnailStyles.img}>
                    <img src={listImage1} alt="" />
                    {/* play img */}
                    <div className={ThumnailStyles.img_play}>
                      <img src={playImg} alt="" />
                    </div>
                  </div>

                  <div className={ThumnailStyles.heart}>
                    <Button
                      className={cn(
                        ThumnailStyles.btn_heart,
                        icoHeart === true ? ThumnailStyles.active : '',
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
                <div className={ThumnailStyles.text_box}>
                  <div className={ThumnailStyles.type}>
                    {/* type */}
                    <span className={ThumnailStyles.txt}>동영상</span>
                    <span className={ThumnailStyles.time}>
                      {/* time icon */}
                      <IcoPlay width={12} height={12} fill="#6f798b" />
                      {/* time */}
                      04:59
                    </span>
                  </div>
                  <p className={ThumnailStyles.text}>필수개발과정</p>

                  <div className={ThumnailStyles.ico_box}>
                    <span className={ThumnailStyles.ico_rating}>
                      <IcoRating className={ThumnailStyles.ico}></IcoRating>
                      {/* rating */}
                      <span className={ThumnailStyles.txt}>4.2</span>
                    </span>
                    <span className={ThumnailStyles.ico_heart}>
                      <IcoHeart
                        className={ThumnailStyles.ico}
                        fill="none"
                        stroke="#a9afb8"
                      ></IcoHeart>
                      {/* heart */}
                      <span className={ThumnailStyles.txt}>33</span>
                    </span>
                    <span className={ThumnailStyles.ico_eye}>
                      <IcoEye className={ThumnailStyles.ico} fill="none" stroke="#a9afb8" />
                      {/* eye */}
                      <span className={ThumnailStyles.txt}>55</span>
                    </span>
                  </div>

                  <div className={ThumnailStyles.related_box}>
                    <span className={ThumnailStyles.related}>
                      <IcoPhone02 className={ThumnailStyles.ico} fill="none" stroke="#4c515e" />
                      <span className={ThumnailStyles.txt}>모바일전용</span>
                    </span>
                    <span className={ThumnailStyles.related}>
                      <IcoMonitor01 className={ThumnailStyles.ico} fill="none" stroke="#4c515e" />
                      <span className={ThumnailStyles.txt}>사내IP전용</span>
                    </span>
                    <span className={ThumnailStyles.related}>
                      <span className={ThumnailStyles.txt}>#AI기술</span>
                    </span>
                    <span className={ThumnailStyles.related}>
                      <span className={ThumnailStyles.txt}>#AI기술</span>
                    </span>
                    <span className={ThumnailStyles.related}>
                      <span className={ThumnailStyles.txt}>#AI기술</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="code_example">
          <pre className="code_block">
            <code>{`// 기본 호출방법
import { Link } from '@tanstack/react-router';
import ThumnailStyles from '../../../shared/ui/thumnail/thumnail.module.css';
import { cn } from '@learnway/shared';
import { Button } from '@learnway/ui';
import {
  IcoPlay,
  IcoRating,
  IcoHeart,
  IcoEye,
  IcoPhone02,
  IcoMonitor01,
} from '@learnway/icons';
 import playImg from '@learnway/styles/fo/assets/images/common/img_play.png';
import listImage1 from '@learnway/styles/fo/assets/images/temp/category_product_01.png';

// 썸네일 라벨
  const label = [
    { text: 'New', color: '#00afd5' },
    { text: '접수중', color: '#06226a' },
    { text: 'D-7', color: '#ff4646' },
  ];
  // 썸네일 찜
  const [icoHeart, setIcoHeart] = useState(true);
  const handleHeartClick = () => {
    if (icoHeart === true) {
      setIcoHeart(false);
    } else {
      setIcoHeart(true);
    }
  };

// 사용 예제
<div
  className={cn(
    ThumnailStyles.start,
    ThumnailStyles.thumbnail,
    ThumnailStyles.horizontal,
  )}
>
  {/* link (찜 기능과 겹침으로 따로 빠짐) */}
  <Link to="" className={ThumnailStyles.link}></Link>

  <div className={ThumnailStyles.thumnail_box}>
    {/* img */}
    <div className={ThumnailStyles.img_box}>
      <ul className={ThumnailStyles.label}>
        {label.map((labels, index) => (
          <li key={index} style={{ backgroundColor: labels.color }}>
            {labels.text}
          </li>
        ))}
      </ul>
      <div className={ThumnailStyles.img}>
        <img src={listImage1} alt="" />
        {/* play img */}
        <div className={ThumnailStyles.img_play}>
          <img src={playImg} alt="" />
        </div>
      </div>

      <div className={ThumnailStyles.heart}>
        <Button
          className={cn(
            ThumnailStyles.btn_heart,
            icoHeart === true ? ThumnailStyles.active : ""
          )}
          onClick={handleHeartClick}
        >
          <IcoHeart
            width={24}
            height={24}
            fill={icoHeart === true ? "#fff" : "none"}
            stroke="#fff"
          ></IcoHeart>
        </Button>
      </div>
    </div>
    {/* txt */}
    <div className={ThumnailStyles.text_box}>
      <div className={ThumnailStyles.type}>
        {/* type */}
        <span className={ThumnailStyles.txt}>동영상</span>
        <span className={ThumnailStyles.time}>
          {/* time icon */}
          <IcoPlay width={12} height={12} fill="#6f798b" />
          {/* time */}
          04:59
        </span>
      </div>
      <p className={ThumnailStyles.text}>필수개발과정</p>

      <div className={ThumnailStyles.ico_box}>
        <span className={ThumnailStyles.ico_rating}>
          <IcoRating className={ThumnailStyles.ico}></IcoRating>
          {/* rating */}
          <span className={ThumnailStyles.txt}>4.2</span>
        </span>
        <span className={ThumnailStyles.ico_heart}>
          <IcoHeart
            className={ThumnailStyles.ico}
            fill="none"
            stroke="#a9afb8"
          ></IcoHeart>
          {/* heart */}
          <span className={ThumnailStyles.txt}>33</span>
        </span>
        <span className={ThumnailStyles.ico_eye}>
          <IcoEye className={ThumnailStyles.ico} fill="none" stroke="#a9afb8" />
          {/* eye */}
          <span className={ThumnailStyles.txt}>55</span>
        </span>
      </div>

      <div className={ThumnailStyles.related_box}>
        <span className={ThumnailStyles.related}>
          <IcoPhone02
            className={ThumnailStyles.ico}
            fill="none"
            stroke="#4c515e"
          />
          <span className={ThumnailStyles.txt}>모바일전용</span>
        </span>
        <span className={ThumnailStyles.related}>
          <IcoMonitor01
            className={ThumnailStyles.ico}
            fill="none"
            stroke="#4c515e"
          />
          <span className={ThumnailStyles.txt}>사내IP전용</span>
        </span>
        <span className={ThumnailStyles.related}>
          <span className={ThumnailStyles.txt}>#AI기술</span>
        </span>
        <span className={ThumnailStyles.related}>
          <span className={ThumnailStyles.txt}>#AI기술</span>
        </span>
        <span className={ThumnailStyles.related}>
          <span className={ThumnailStyles.txt}>#AI기술</span>
        </span>
      </div>
    </div>
  </div>
</div>
`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
