import { createFileRoute, Link } from '@tanstack/react-router';
import React, { useState } from 'react';
import { cn } from '@learnway/shared';
import { Button } from '@learnway/ui';

import thumnailStyles from '../../../shared/ui/thumnail/thumnail.module.css';
import thumnailImgStyles from '../../../shared/ui/thumnail/thumnail-img.module.css';

import { IcoPlay, IcoRating, IcoHeart, IcoEye, IcoPhone02, IcoMonitor01 } from '@learnway/icons';

import listImage1 from '@learnway/styles/fo/assets/images/temp/category_product_01.png';

export const Route = createFileRoute('/_guide/guide/thumnail')({
  component: RouteComponent,
});

function RouteComponent() {
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
        import thumnailStyles from '../../../shared/ui/thumnail/thumnail.module.css';
        <br />
        import thumnailImgStyles from '../../../shared/ui/thumnail/thumnail-img.module.css';
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
                thumnailStyles.start,
                thumnailStyles.thumbnail,
                thumnailStyles.vertical,
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
          </div>
        </div>

        <div className="code_example">
          <pre className="code_block">
            <code>{`// 기본 호출방법
import { Link } from '@tanstack/react-router';
import thumnailStyles from '../../../shared/ui/thumnail/thumnail.module.css';
import thumnailImgStyles from '../../../shared/ui/thumnail/thumnail-img.module.css';
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
import listImage1 from '@learnway/styles/fo/assets/images/temp/category_product_01.png';

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
    thumnailStyles.start,
    thumnailStyles.thumbnail,
    thumnailStyles.vertical,
  )}
>
  {/* link (찜 기능과 겹침으로 따로 빠짐) */}
  <Link to="" className={thumnailStyles.link}></Link>

  <div className={thumnailStyles.thumnail_box}>
    {
  /* img */
}
<div className={\`\${thumnailImgStyles.start} \${thumnailImgStyles.img_box}\`}>
  <ul className={thumnailImgStyles.label}>
    <li style={{ backgroundColor: "#00afd5" }}>New</li>
    <li style={{ backgroundColor: "#06226a" }}>접수중</li>
    <li style={{ backgroundColor: "#ff4646" }}>D-7</li>
  </ul>
  <div className={thumnailImgStyles.img}>
    <img src={listImage1} alt="" />
  </div>

  <div className={thumnailImgStyles.heart}>
    <Button
      className={cn(
        thumnailStyles.btn_heart,
        icoHeart === true ? thumnailStyles.active : ""
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
</div>;

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
          <IcoPhone02
            className={thumnailStyles.ico}
            fill="none"
            stroke="#4c515e"
          />
          <span className={thumnailStyles.txt}>모바일전용</span>
        </span>
        <span className={thumnailStyles.related}>
          <IcoMonitor01
            className={thumnailStyles.ico}
            fill="none"
            stroke="#4c515e"
          />
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
          </div>
        </div>

        <div className="code_example">
          <pre className="code_block">
            <code>{`// 기본 호출방법
import { Link } from '@tanstack/react-router';
import thumnailStyles from '../../../shared/ui/thumnail/thumnail.module.css';
import thumnailImgStyles from '../../../shared/ui/thumnail/thumnail-img.module.css';
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
import listImage1 from '@learnway/styles/fo/assets/images/temp/category_product_01.png';

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
    thumnailStyles.start,
    thumnailStyles.thumbnail,
    thumnailStyles.horizontal,
  )}
>
  {/* link (찜 기능과 겹침으로 따로 빠짐) */}
  <Link to="" className={thumnailStyles.link}></Link>

  <div className={thumnailStyles.thumnail_box}>
    {/* img */}
    <div className={\`\${thumnailImgStyles.start} \${thumnailImgStyles.img_box}\`}>
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
          <IcoPhone02
            className={thumnailStyles.ico}
            fill="none"
            stroke="#4c515e"
          />
          <span className={thumnailStyles.txt}>모바일전용</span>
        </span>
        <span className={thumnailStyles.related}>
          <IcoMonitor01
            className={thumnailStyles.ico}
            fill="none"
            stroke="#4c515e"
          />
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
`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
