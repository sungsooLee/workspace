import { createFileRoute } from '@tanstack/react-router';
import {
  Information,
  IcoArrowDown,
  IcoArrowUp,
  IcoAlarmFill,
  IcoCheck,
  IcoCheck02,
  IcoStar,
  IcoGridFilter,
  IcoDownload,
  IcoMinus,
  IcoPlus,
  IcoSetting,
  IcoClose,
  IcoArrowForward,
  IcoHome02,
  IcoHome03,
  IcoBell02,
  IcoLinkblank,
  IcoChevronDown,
  IcoChevronLeft,
  IcoChevronLeftDouble,
  IcoChevronRight,
  IcoChevronRightDouble,
  IcoChevronLeftDisabled,
  IcoChevronLeftDoubleDisabled,
  IcoChevronRightDisabled,
  IcoChevronRightDoubleDisabled,
  IcoArrowBackward,
  IcoMenu01,
  IcoConfirm,
  IcoModify,
  IcoTrash,
  IcoSearch,
  IcoXclose,
  IcoCaution,
  IcoCaution02,
  IcoWarning,
  IcoError,
  IcoComplete,
  IcoDelete03,
  IcoFormRequired,
  IcoCheckboxChecked,
  IcoAlertCircle,
  IcoAlertCircleGray,
  IcoTooltipArrow,
  IcoCloseCircle,
  IcLogOut01,
  IcoUploadCloud,
  IcoLoading,
} from '@learnway/icons';

export const Route = createFileRoute('/_guide/guide/icon')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h2 className="guide_tit2">Icon Component Guide</h2>
      <p className="loc react">/libs/icons/src/index.ts</p>
      <p className="info">
        1. /libs/icons/src/lib 에 svg 파일 업로드 후 파일 실행
        <br />
        2. 변경되는 부분 current로 변경 ex) width="current" stroke="current"
        <br />
        3. /libs/icons/src/index.ts에 코드추가
        <br />
        4. 사이즈와 색상만 다른경우 동일아이콘에서 사이즈,색상만 수정해서 하나의 아이콘으로
        사용한다. <br />
        5. 단색일 경우 SVG로 저장하며, 단색외의 이미지,아이콘은 png(2x)로 저장한다.
      </p>
      <div className="code_example">
        <pre className="code_block">
          <code>
            {`// 초기 import
import { IcoAlertCircleGray } from '@learnway/icons'; // 사용할 icon 함수명 호출
  
// 적용방법(예시)
<IcoAlertCircleGray width={24} height={24} stroke="#444" fill="" />`}
          </code>
        </pre>
      </div>
      <div className="group">
        <h3 className="guide_tit3">SVG Lists</h3>
        <div className="flex_box">
          <div className="desc col">
            <Information width={30} height={30} stroke="#4C515E" />
            <IcoArrowDown width={30} height={30} stroke="#4C515E" />
            <IcoArrowUp width={30} height={30} stroke="#4C515E" />
            <IcoAlarmFill width={30} height={30} stroke="#4C515E" />
            <IcoCheck width={30} height={30} stroke="#4C515E" />
            <IcoCheck02 width={30} height={30} stroke="#4C515E" />
            <IcoStar width={30} height={30} stroke="#4C515E" />
            <IcoGridFilter width={30} height={30} stroke="#4C515E" />
            <IcoDownload width={30} height={30} stroke="#4C515E" />
            <IcoMinus width={30} height={30} stroke="#4C515E" />
            <IcoPlus width={30} height={30} stroke="#4C515E" />
            <IcoSetting width={30} height={30} stroke="#4C515E" />
            <IcoClose width={30} height={30} stroke="#4C515E" />
            <IcoArrowForward width={30} height={30} stroke="#4C515E" />
            <IcoHome02 width={30} height={30} stroke="#4C515E" />
            <IcoHome03 width={30} height={30} stroke="#4C515E" />
            <IcoBell02 width={30} height={30} stroke="#4C515E" />
            <IcoLinkblank width={30} height={30} stroke="#4C515E" />
            <IcoChevronDown width={30} height={30} stroke="#4C515E" />
            <IcoChevronLeft width={30} height={30} stroke="#4C515E" />
            <IcoChevronLeftDouble width={30} height={30} stroke="#4C515E" />
            <IcoChevronRight width={30} height={30} stroke="#4C515E" />
            <IcoChevronRightDouble width={30} height={30} stroke="#4C515E" />
            <IcoChevronLeftDisabled width={30} height={30} stroke="#4C515E" />
            <IcoChevronLeftDoubleDisabled width={30} height={30} stroke="#4C515E" />
            <IcoChevronRightDisabled width={30} height={30} stroke="#4C515E" />
            <IcoChevronRightDoubleDisabled width={30} height={30} stroke="#4C515E" />
            <IcoArrowBackward width={30} height={30} stroke="#4C515E" />
            <IcoMenu01 width={30} height={30} stroke="#4C515E" />
            <IcoConfirm width={30} height={30} stroke="#4C515E" />
            <IcoModify width={30} height={30} stroke="#4C515E" />
            <IcoTrash width={30} height={30} stroke="#4C515E" />
            <IcoSearch width={30} height={30} stroke="#4C515E" />
            <IcoXclose width={30} height={30} stroke="#4C515E" />
            <IcoCaution width={30} height={30} stroke="#4C515E" />
            <IcoCaution02 width={30} height={30} stroke="#4C515E" />
            <IcoWarning width={30} height={30} stroke="#4C515E" />
            <IcoError width={30} height={30} stroke="#4C515E" />
            <IcoComplete width={30} height={30} stroke="#4C515E" />
            <IcoDelete03 width={30} height={30} stroke="#4C515E" />
            <IcoFormRequired width={30} height={30} stroke="#4C515E" />
            <IcoCheckboxChecked width={30} height={30} stroke="#4C515E" />
            <IcoAlertCircle width={30} height={30} stroke="#4C515E" />
            <IcoAlertCircleGray width={30} height={30} stroke="#4C515E" />
            <IcoTooltipArrow width={30} height={30} stroke="#4C515E" />
            <IcoCloseCircle width={30} height={30} stroke="#4C515E" />
            <IcLogOut01 width={30} height={30} stroke="#4C515E" />
            <IcoUploadCloud width={30} height={30} stroke="#4C515E" />
            <IcoLoading width={30} height={30} stroke="#4C515E" />
          </div>
        </div>

        <div className="code_example">
          <pre className="code_block">
            <code>{`<IcoAlertCircleGray width={24} height={24} stroke='#444' />`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
