import { createFileRoute } from '@tanstack/react-router';
import {
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
  IcoClose02,
  IcoFillActive,
  IcoArrowForward,
  IcoHome02,
  IcoHome03,
  IcoBell02,
  IcoBell03,
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
  IcoCaution03,
  IcoWarning,
  IcoError,
  IcoComplete,
  IcoAlertComplete,
  IcoDelete03,
  IcoFormRequired,
  IcoCheckboxChecked,
  IcoAlertCircle,
  IcoAlertCircleGray,
  IcoAlertCircle03,
  IcoTooltipArrow,
  IcoCloseCircle,
  IcLogOut01,
  IcoUploadCloud,
  IcoLoading,
  IcoTrash03,
  IcoCalendar01,
  IcoBuilding01,
  IcoOverseasDealer,
  IcoMail,
  IcoPhone02,
  IcoDotpoints,
  IcoGrid01,
  IcoMybook,
  IcoPlay02,
  IcoMoreHorizontal,
  IcoEye,
  IcoAnnouncement03,
  IcoClock01,
  IcoRefresh,
  IcoRefresh02,
  IcoPause,
  IcoComplete02,
  IcoFileMp4,
  IcoBlog,
  IcoEntrust,
  IcoInfoCircle,
  IcoImage01,
  IcoVideo01,
  IcoVideo02,
  IcoHtml,
  IcoEtc,
  IcoUser01,
  IcoSpinner,
  IcoSucess,
  IcoArray,
  IcoPlay,
  IcoRating,
  IcoHeart,
  IcoMonitor01,
  IcoStatusFail,
  IcoShieldTick01,
  IcoFaceId01,
  IcoCompanion,
  IcoProgress,
  IcoFilter,
  IcoArrowDownDouble,
  IcoNarrowRight,
  IcoGridOrder,
  IcoFileImg,
  IcoFileVideo,
  IcoExam,
  IcoFolder,
  IcoHomework,
  IcoMultiScorm,
  IcoSurvey,
  IcoSetting01,
  IcoReview,
  IcoSucess02,
  IcoPaperClip,
  IcoPpt,
  IcoShare,
  IcoPin,
  IcoThumbsUp,
  IcoMessageCircle,
  IcoMoreVertical,
  IcoDownArrow,
  IcoArrowLineTop,
  IcoFolderOpen,
  IcoBoxMinus,
  IcoBoxPlus,
  IcoMessageText,
  IcoProgressComplete,
  IcoTooltipArrow02,
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
<IcoAlertCircleGray width={24} height={24} stroke="#444" fill="" />

 // CSS활용 예시
<IcoAlertCircleGray className={styles.ico} />

// CSS
.ico {
  @apply w-[30px] h-[30px] stroke-[var(--white)];
}
`}
          </code>
        </pre>
      </div>
      <div className="group">
        <h3 className="guide_tit3">SVG Lists</h3>
        <div className="flex_box">
          <div className="desc flex-wrap">
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
            <IcoClose02 width={30} height={30} stroke="#4C515E" />
            <IcoFillActive width={30} height={30} stroke="#4C515E" />
            <IcoArrowForward width={30} height={30} stroke="#4C515E" />
            <IcoHome02 width={30} height={30} stroke="#4C515E" />
            <IcoHome03 width={30} height={30} stroke="#4C515E" />
            <IcoBell02 width={30} height={30} stroke="#4C515E" />
            <IcoBell03 width={30} height={30} stroke="#4C515E" />
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
            <IcoMenu01 width={30} height={30} fill="#A9AFB8" stroke="#8c97ae" />
            <IcoConfirm width={30} height={30} stroke="none" fill="#A9AFB8" />
            <IcoModify width={30} height={30} stroke="#4C515E" />
            <IcoTrash width={30} height={30} stroke="#4C515E" />
            <IcoSearch width={30} height={30} stroke="#4C515E" />
            <IcoXclose width={30} height={30} stroke="#4C515E" />
            <IcoCaution width={30} height={30} stroke="#4C515E" />
            <IcoCaution02 width={30} height={30} stroke="#4C515E" />
            <IcoCaution03 width={30} height={30} stroke="#4C515E" />
            <IcoWarning width={30} height={30} stroke="#4C515E" />
            <IcoError width={30} height={30} stroke="#4C515E" />
            <IcoComplete width={30} height={30} stroke="#4C515E" />
            <IcoProgressComplete width={30} height={30} />
            <IcoAlertComplete width={30} height={30} stroke="#4C515E" />
            <IcoDelete03 width={30} height={30} stroke="#4C515E" />
            <IcoFormRequired width={30} height={30} stroke="#4C515E" />
            <IcoCheckboxChecked width={30} height={30} stroke="#4C515E" />
            <IcoAlertCircle width={30} height={30} stroke="#4C515E" />
            <IcoAlertCircleGray width={30} height={30} stroke="#4C515E" />
            <IcoAlertCircle03 width={30} height={30} />
            <IcoTooltipArrow width={30} height={30} stroke="#4C515E" />
            <IcoCloseCircle width={30} height={30} stroke="#4C515E" />
            <IcLogOut01 width={30} height={30} stroke="#4C515E" />
            <IcoUploadCloud width={30} height={30} stroke="#4C515E" />
            <IcoLoading width={30} height={30} stroke="#4C515E" />
            <IcoTrash03 width={30} height={30} stroke="#131C30" />
            <IcoCalendar01 width={30} height={30} stroke="#131C30" />
            <IcoBuilding01 width={30} height={30} stroke="#131C30" />
            <IcoOverseasDealer width={30} height={30} stroke="#131C30" />
            <IcoMail width={30} height={30} stroke="#131C30" />
            <IcoPhone02 width={30} height={30} stroke="#131C30" />
            <IcoDotpoints width={30} height={30} stroke="#4C515E" />
            <IcoGrid01 width={30} height={30} stroke="#131C30" />
            <IcoMybook width={30} height={30} stroke="#131C30" />
            <IcoPlay02 width={30} height={30} stroke="#131C30" />
            <IcoMoreHorizontal width={30} height={30} stroke="#131C30" />
            <IcoEye width={30} height={30} stroke="#4C515E" />
            <IcoAnnouncement03 width={30} height={30} stroke="#4C515E" />
            <IcoClock01 width={30} height={30} stroke="#4C515E" />
            <IcoRefresh width={30} height={30} fill="#4c515e" />
            <IcoRefresh02 width={30} height={30} stroke="#4c515e" fill="none" />
            <IcoPause width={30} height={30} stroke="#4C515E" fill="#4c515e" />
            <IcoComplete02 width={30} height={30} stroke="#4C515E" fill="#4c515e" />
            <IcoBlog width={30} height={30} stroke="#4C515E" />
            <IcoEntrust width={30} height={30} stroke="#4C515E" />
            <IcoInfoCircle width={30} height={30} stroke="#4C515E" fill="none" />
            <IcoImage01 width={30} height={30} stroke="#4C515E" />
            <IcoVideo01 width={30} height={30} stroke="#4C515E" />
            <IcoVideo02 width={30} height={30} stroke="#4C515E" />
            <IcoHtml width={30} height={30} stroke="#4C515E" />
            <IcoEtc width={30} height={30} stroke="#4C515E" />
            <IcoUser01 width={30} height={30} stroke="#4C515E" />
            <IcoSpinner width={30} height={30} stroke="#4C515E" />
            <IcoSucess width={30} height={30} stroke="#4C515E" />
            <IcoArray width={30} height={30} stroke="#4C515E" />
            <IcoPlay width={30} height={30} stroke="#4C515E" />
            <IcoRating width={30} height={30} stroke="#4C515E" />
            <IcoHeart width={30} height={30} stroke="#4C515E" />
            <IcoMonitor01 width={30} height={30} stroke="#4C515E" />
            <IcoStatusFail width={30} height={30} stroke="#4C515E" />
            <IcoShieldTick01 width={30} height={30} stroke="#4C515E" />
            <IcoFaceId01 width={30} height={30} stroke="#4C515E" />
            <IcoCompanion width={30} height={30} stroke="#4C515E" />
            <IcoProgress width={30} height={30} stroke="#4C515E" />
            <IcoFilter width={30} height={30} stroke="#4C515E" />
            <IcoArrowDownDouble width={30} height={30} stroke="#4C515E" />
            <IcoNarrowRight width={30} height={30} stroke="#4C515E" />
            <IcoGridOrder width={30} height={30} stroke="#4C515E" />
            <IcoFileVideo width={48} height={48} stroke="#4C515E" />
            <IcoFileImg width={48} height={48} stroke="#4C515E" />
            <IcoExam width={30} height={30} stroke="#4C515E" />
            <IcoFolder width={30} height={30} stroke="#4C515E" />
            <IcoHomework width={30} height={30} stroke="#4C515E" />
            <IcoMultiScorm width={30} height={30} stroke="#4C515E" />
            <IcoSurvey width={30} height={30} stroke="#4C515E" />
            <IcoSetting01 width={30} height={30} stroke="#4C515E" />
            <IcoReview width={30} height={30} stroke="#4C515E" />
            <IcoSucess02 width={30} height={30} stroke="#4C515E" />
            <IcoPaperClip width={30} height={30} stroke="#4C515E" />
            <IcoPpt width={30} height={30} stroke="#4C515E" />
            <IcoFileMp4 width={30} height={30} stroke="#4C515E" />
            <IcoShare width={30} height={30} stroke="#4C515E" />
            <IcoPin width={30} height={30} stroke="#4C515E" />
            <IcoThumbsUp width={30} height={30} stroke="#4C515E" />
            <IcoMessageCircle width={30} height={30} stroke="#4C515E" />
            <IcoMoreVertical width={30} height={30} stroke="#4C515E" />
            <IcoDownArrow width={30} height={30} stroke="#4C515E" />
            <IcoArrowLineTop width={30} height={30} stroke="#4C515E" />
            <IcoFolderOpen width={30} height={30} stroke="#4C515E" />
            <IcoBoxMinus width={30} height={30} stroke="#4C515E" />
            <IcoBoxPlus width={30} height={30} stroke="#4C515E" />
            <IcoMessageText width={30} height={30} stroke="#4C515E" />
            <IcoTooltipArrow02 width={12} height={8} fill="#4D525C" />
          </div>
        </div>
      </div>
    </div>
  );
}
