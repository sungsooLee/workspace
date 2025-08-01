import {
  IcLogOut01,
  IcoAlarmFill,
  IcoAlertCircle,
  IcoAlertCircle03,
  IcoAlertCircleGray,
  IcoAlertComplete,
  IcoAnnouncement03,
  IcoArray,
  IcoArrow,
  IcoArrowBackward,
  IcoArrowDown,
  IcoArrowDownDouble,
  IcoArrowDownFilled,
  IcoArrowForward,
  IcoArrowLineTop,
  IcoArrowNext,
  IcoArrowPrev,
  IcoArrowUp,
  IcoArrowUpDouble,
  IcoAvatar,
  IcoAvatar02,
  IcoBackward,
  IcoBell02,
  IcoBell03,
  IcoBell04,
  IcoBlog,
  IcoBook,
  IcoBoxMinus,
  IcoBoxPlus,
  IcoBuilding,
  IcoBuilding01,
  IcoCalendar01,
  IcoCategory,
  IcoCaution,
  IcoCaution02,
  IcoCaution03,
  IcoChair,
  IcoChart,
  IcoCheck,
  IcoCheck02,
  IcoCheckboxChecked,
  IcoChevronDown,
  IcoChevronLeft,
  IcoChevronLeftDisabled,
  IcoChevronLeftDouble,
  IcoChevronLeftDoubleDisabled,
  IcoChevronRight,
  IcoChevronRightDisabled,
  IcoChevronRightDouble,
  IcoChevronRightDoubleDisabled,
  IcoCircleProgress,
  IcoClass,
  IcoClipboard,
  IcoClock01,
  IcoClock10Back,
  IcoClock10Forward,
  IcoClose,
  IcoClose02,
  IcoCloseCircle,
  IcoCompanion,
  IcoComplete,
  IcoComplete02,
  IcoConfirm,
  IcoCopy,
  IcoDelete03,
  IcoDelete04,
  IcoDivice,
  IcoDocument,
  IcoDotpoints,
  IcoDownArrow,
  IcoDownload,
  IcoDownload02,
  IcoEntrust,
  IcoError,
  IcoError02,
  IcoEssential,
  IcoEtc,
  IcoExam,
  IcoExpand,
  IcoEye,
  IcoFaceId01,
  IcoFile01,
  IcoFileExcel,
  IcoFileImg,
  IcoFileMp4,
  IcoFilePng,
  IcoFileUpload,
  IcoFileVideo,
  IcoFillActive,
  IcoFilter,
  IcoFolder,
  IcoFolderOpen,
  IcoFormRequired,
  IcoGrid01,
  IcoGridFilter,
  IcoGridOrder,
  IcoHeart,
  IcoHistory,
  IcoHome02,
  IcoHome03,
  IcoHomework,
  IcoHtml,
  IcoImage01,
  IcoImport,
  IcoInfoCircle,
  IcoLang,
  IcoLearning01,
  IcoLearning02,
  IcoLearning03,
  IcoLearning04,
  IcoLearning05,
  IcoLearning06,
  IcoLevel,
  IcoLink,
  IcoLinkblank,
  IcoList,
  IcoLive,
  IcoLiveHive,
  IcoLoading,
  IcoLocation,
  IcoLock,
  IcoMail,
  IcoMail02,
  IcoMenu01,
  IcoMenu02,
  IcoMessageCircle,
  IcoMessageText,
  IcoMinus,
  IcoModify,
  IcoMoney,
  IcoMonitor01,
  IcoMoreHorizontal,
  IcoMoreVertical,
  IcoMove01,
  IcoMultiScorm,
  IcoMybook,
  IcoNarrowRight,
  IcoNextPlayFill,
  IcoNudge01,
  IcoNudge03,
  IcoNudge04,
  IcoNudge05,
  IcoNudge10,
  IcoOverseasDealer,
  IcoPaper,
  IcoPaperClip,
  IcoPause,
  IcoPdf,
  IcoPhone02,
  IcoPhone03,
  IcoPin,
  IcoPlay,
  IcoPlay02,
  IcoPlayerPause,
  IcoPlayerPlay,
  IcoPlayerSetting,
  IcoPlus,
  IcoPoint,
  IcoPpt,
  IcoPrevNext,
  IcoPrevPlay,
  IcoPrevPlayFill,
  IcoPrize,
  IcoProgress,
  IcoProgressComplete,
  IcoQuestionBank,
  IcoRating,
  IcoReduce,
  IcoRefresh,
  IcoRefresh02,
  IcoReview,
  IcoRocket,
  IcoSearch,
  IcoSearchWrite,
  IcoSetting,
  IcoSetting01,
  IcoSettingsFill,
  IcoShare,
  IcoShieldTick01,
  IcoSpeakerFill,
  IcoSpeakerOffFill,
  IcoSpinner,
  IcoSpinnerBlue,
  IcoStar,
  IcoStar02,
  IcoStatusFail,
  IcoSubtitles,
  IcoSubtitles02,
  IcoSucess,
  IcoSucess02,
  IcoSucess03,
  IcoSurvey,
  IcoSymbol,
  IcoTeacher,
  IcoThumbsUp,
  IcoTime,
  IcoTooltipArrow,
  IcoTooltipArrow02,
  IcoTranslation,
  IcoTrash,
  IcoTrash03,
  IcoUploadCloud,
  IcoUser01,
  IcoVideo01,
  IcoVideo02,
  IcoVideoPlay,
  IcoVideoStop,
  IcoWarning,
  IcoWordArrow,
  IcoXclose,
} from '@learnway/icons';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_guide/guide/icon')({
  component: RouteComponent,
});

function RouteComponent() {
  const icons = [
    {
      name: 'IcoArrowDown',
      Component: <IcoArrowDown width={30} height={30} stroke="#4C515E" />,
      file: 'ic_arrow_down.svg',
    },
    {
      name: 'IcoArrowUp',
      Component: <IcoArrowUp width={30} height={30} stroke="#4C515E" />,
      file: 'ic_arrow_up.svg',
    },
    {
      name: 'IcoAlarmFill',
      Component: <IcoAlarmFill width={30} height={30} stroke="#4C515E" />,
      file: 'ic_alarm_fill.svg',
    },
    {
      name: 'IcoCheck',
      Component: <IcoCheck width={20} height={20} stroke="#4C515E" />,
      file: 'ic_check.svg',
    },
    {
      name: 'IcoCheck02',
      Component: <IcoCheck02 width={20} height={20} stroke="#4C515E" />,
      file: 'ic_check02.svg',
    },
    {
      name: 'IcoStar',
      Component: <IcoStar width={20} height={20} stroke="#4C515E" />,
      file: 'ic_star.svg',
    },
    {
      name: 'IcoStar02',
      Component: <IcoStar02 width={20} height={20} stroke="#4C515E" />,
      file: 'ic_star02.svg',
    },
    {
      name: 'IcoGridFilter',
      Component: <IcoGridFilter width={16} height={16} stroke="#4C515E" />,
      file: 'ic_grid_filter.svg',
    },
    {
      name: 'IcoDownload',
      Component: <IcoDownload width={16} height={16} stroke="#4C515E" />,
      file: 'ic_download.svg',
    },
    {
      name: 'IcoDownload02',
      Component: <IcoDownload02 width={16} height={16} stroke="#4C515E" />,
      file: 'ic_download02.svg',
    },
    {
      name: 'IcoMinus',
      Component: <IcoMinus width={16} height={16} stroke="#4C515E" />,
      file: 'ic_minus.svg',
    },
    {
      name: 'IcoPlus',
      Component: <IcoPlus width={16} height={16} stroke="#4C515E" />,
      file: 'ic_plus.svg',
    },
    {
      name: 'IcoSetting',
      Component: <IcoSetting width={16} height={16} stroke="#4C515E" />,
      file: 'ic_setting.svg',
    },
    {
      name: 'IcoClose',
      Component: <IcoClose width={24} height={24} stroke="#4C515E" />,
      file: 'ic_close.svg',
    },
    {
      name: 'IcoClose02',
      Component: <IcoClose02 width={24} height={24} stroke="#4C515E" />,
      file: 'ic_close02.svg',
    },
    {
      name: 'IcoFillActive',
      Component: <IcoFillActive width={24} height={24} stroke="#4C515E" />,
      file: 'ic_fill_active.svg',
    },
    {
      name: 'IcoArrowForward',
      Component: <IcoArrowForward width={24} height={24} stroke="#4C515E" />,
      file: 'ic_arrow_forward.svg',
    },
    {
      name: 'IcoHome02',
      Component: <IcoHome02 width={12} height={12} stroke="#4C515E" />,
      file: 'ic_home02.svg',
    },
    {
      name: 'IcoHome03',
      Component: <IcoHome03 width={16} height={16} stroke="#4C515E" />,
      file: 'ic_home-03.svg',
    },
    {
      name: 'IcoBell02',
      Component: <IcoBell02 width={24} height={24} stroke="#4C515E" />,
      file: 'ic_bell-02.svg',
    },
    {
      name: 'IcoBell03',
      Component: <IcoBell03 width={24} height={24} stroke="#4C515E" />,
      file: 'ic_bell_03.svg',
    },
    {
      name: 'IcoBell04',
      Component: <IcoBell04 width={40} height={40} stroke="#4C515E" />,
      file: 'ic_bell_04.svg',
    },
    {
      name: 'IcoLinkblank',
      Component: <IcoLinkblank width={24} height={24} stroke="#4C515E" />,
      file: 'ic_btn_pop.svg',
    },
    {
      name: 'IcoChevronDown',
      Component: <IcoChevronDown width={24} height={24} stroke="#4C515E" />,
      file: 'ic_chevron_down.svg',
    },
    {
      name: 'IcoChevronLeft',
      Component: <IcoChevronLeft width={24} height={24} stroke="#4C515E" />,
      file: 'ic_chevron_left.svg',
    },
    {
      name: 'IcoArrowPrev',
      Component: <IcoArrowPrev width={24} height={24} stroke="#4C515E" />,
      file: 'ic_arrow_prev.svg',
    },
    {
      name: 'IcoArrowNext',
      Component: <IcoArrowNext width={24} height={24} stroke="#4C515E" />,
      file: 'ic_arrow_next.svg',
    },
    {
      name: 'IcoChevronLeftDouble',
      Component: <IcoChevronLeftDouble width={24} height={24} stroke="#4C515E" />,
      file: 'ic_chevron_left_double.svg',
    },
    {
      name: 'IcoChevronRight',
      Component: <IcoChevronRight width={24} height={24} stroke="#4C515E" />,
      file: 'ic_chevron_right.svg',
    },
    {
      name: 'IcoChevronRightDouble',
      Component: <IcoChevronRightDouble width={24} height={24} stroke="#4C515E" />,
      file: 'ic_chevron_right_double.svg',
    },
    {
      name: 'IcoChevronLeftDisabled',
      Component: <IcoChevronLeftDisabled width={24} height={24} stroke="#4C515E" />,
      file: 'ic_chevron_left_disabled.svg',
    },
    {
      name: 'IcoChevronLeftDoubleDisabled',
      Component: <IcoChevronLeftDoubleDisabled width={24} height={24} stroke="#4C515E" />,
      file: 'ic_chevron_left_double_disabled.svg',
    },
    {
      name: 'IcoChevronRightDisabled',
      Component: <IcoChevronRightDisabled width={24} height={24} stroke="#4C515E" />,
      file: 'ic_chevron_right_disabled.svg',
    },
    {
      name: 'IcoChevronRightDoubleDisabled',
      Component: <IcoChevronRightDoubleDisabled width={24} height={24} stroke="#4C515E" />,
      file: 'ic_chevron_right_double_disabled.svg',
    },
    {
      name: 'IcoArrowBackward',
      Component: <IcoArrowBackward width={24} height={24} stroke="#4C515E" />,
      file: 'ic_arrow_backward.svg',
    },
    {
      name: 'IcoMenu01',
      Component: <IcoMenu01 width={24} height={24} stroke="#4C515E" />,
      file: 'ic_menu-01.svg',
    },
    {
      name: 'IcoMenu02',
      Component: <IcoMenu02 width={24} height={24} stroke="#4C515E" />,
      file: 'ic_menu-02.svg',
    },
    {
      name: 'IcoConfirm',
      Component: <IcoConfirm width={24} height={24} stroke="#4C515E" />,
      file: 'ic_success_alt.svg',
    },
    {
      name: 'IcoModify',
      Component: <IcoModify width={24} height={24} stroke="#4C515E" />,
      file: 'ic_pencil_fill.svg',
    },
    {
      name: 'IcoTrash',
      Component: <IcoTrash width={24} height={24} stroke="#4C515E" />,
      file: 'ic_trash.svg',
    },
    {
      name: 'IcoSearch',
      Component: <IcoSearch width={24} height={24} stroke="#4C515E" />,
      file: 'ic_search.svg',
    },
    {
      name: 'IcoSearchWrite',
      Component: <IcoSearchWrite width={24} height={24} stroke="#4C515E" />,
      file: 'ic_search_write.svg',
    },
    {
      name: 'IcoXclose',
      Component: <IcoXclose width={24} height={24} stroke="#4C515E" />,
      file: 'ic_x_close.svg',
    },
    {
      name: 'IcoCaution',
      Component: <IcoCaution width={48} height={48} stroke="#4C515E" />,
      file: 'ic_caution.svg',
    },
    {
      name: 'IcoCaution02',
      Component: <IcoCaution02 width={24} height={25} stroke="#4C515E" />,
      file: 'ic_caution02.svg',
    },
    {
      name: 'IcoCaution03',
      Component: <IcoCaution03 width={24} height={24} stroke="#4C515E" />,
      file: 'ic_caution03.svg',
    },
    {
      name: 'IcoWarning',
      Component: <IcoWarning width={48} height={48} stroke="#4C515E" />,
      file: 'ic_warning.svg',
    },
    {
      name: 'IcoError',
      Component: <IcoError width={48} height={48} stroke="#4C515E" />,
      file: 'ic_error.svg',
    },
    {
      name: 'IcoComplete',
      Component: <IcoComplete width={48} height={48} stroke="#4C515E" />,
      file: 'ic_complete.svg',
    },
    {
      name: 'IcoAlertComplete',
      Component: <IcoAlertComplete width={48} height={48} stroke="#4C515E" />,
      file: 'ic_alert_complete.svg',
    },
    {
      name: 'IcoDelete03',
      Component: <IcoDelete03 width={48} height={48} stroke="#4C515E" />,
      file: 'ic_delete_03.svg',
    },
    {
      name: 'IcoDelete04',
      Component: <IcoDelete04 width={24} height={24} stroke="#4C515E" />,
      file: 'ic_close_circle02.svg',
    },
    {
      name: 'IcoFormRequired',
      Component: <IcoFormRequired width={9} height={8} stroke="#4C515E" />,
      file: 'ic_form_required.svg',
    },
    {
      name: 'IcoCheckboxChecked',
      Component: <IcoCheckboxChecked width={12} height={13} stroke="#4C515E" />,
      file: 'ic_checkbox_checked.svg',
    },
    {
      name: 'IcoAlertCircle',
      Component: <IcoAlertCircle width={24} height={24} stroke="#4C515E" />,
      file: 'ic_alert_circle02.svg',
    },
    {
      name: 'IcoAlertCircleGray',
      Component: <IcoAlertCircleGray width={24} height={24} stroke="#4C515E" />,
      file: 'ic_alert_circle_gray.svg',
    },
    {
      name: 'IcoAlertCircle03',
      Component: <IcoAlertCircle03 width={24} height={24} stroke="#4C515E" />,
      file: 'ic_alert_circle_03.svg',
    },
    {
      name: 'IcoTooltipArrow',
      Component: <IcoTooltipArrow width={12} height={13} stroke="#4C515E" />,
      file: 'ic_tooltip_arrow.svg',
    },
    {
      name: 'IcoTooltipArrow02',
      Component: <IcoTooltipArrow02 width={12} height={13} stroke="#4C515E" />,
      file: 'ic_tooltip_arrow02.svg',
    },
    {
      name: 'IcoCloseCircle',
      Component: <IcoCloseCircle width={24} height={24} stroke="#4C515E" />,
      file: 'ic_close_circle.svg',
    },
    {
      name: 'IcLogOut01',
      Component: <IcLogOut01 width={24} height={24} stroke="#4C515E" />,
      file: 'ic_log_out_01.svg',
    },
    {
      name: 'IcoUploadCloud',
      Component: <IcoUploadCloud width={24} height={24} stroke="#4C515E" />,
      file: 'ic_upload_cloud.svg',
    },
    {
      name: 'IcoFileUpload',
      Component: <IcoFileUpload width={24} height={24} stroke="#4C515E" />,
      file: 'ic_file_upload.svg',
    },
    {
      name: 'IcoClipboard',
      Component: <IcoClipboard width={24} height={24} stroke="#4C515E" />,
      file: 'ic_clipboard.svg',
    },
    {
      name: 'IcoLoading',
      Component: <IcoLoading width={24} height={24} stroke="#4C515E" />,
      file: 'ic_loading.svg',
    },
    {
      name: 'IcoTrash03',
      Component: <IcoTrash03 width={24} height={24} stroke="#4C515E" />,
      file: 'ic_trash_03.svg',
    },
    {
      name: 'IcoCalendar01',
      Component: <IcoCalendar01 width={24} height={24} stroke="#4C515E" />,
      file: 'ic_calendar_01.svg',
    },
    {
      name: 'IcoBuilding01',
      Component: <IcoBuilding01 width={24} height={24} stroke="#4C515E" />,
      file: 'ic_building-01.svg',
    },
    {
      name: 'IcoOverseasDealer',
      Component: <IcoOverseasDealer width={24} height={24} stroke="#4C515E" />,
      file: 'ic_overseas_dealer.svg',
    },
    {
      name: 'IcoMail',
      Component: <IcoMail width={40} height={40} stroke="#4C515E" />,
      file: 'ic_mail.svg',
    },
    {
      name: 'IcoMail02',
      Component: <IcoMail02 width={40} height={40} stroke="#4C515E" />,
      file: 'ic_mail-02.svg',
    },
    {
      name: 'IcoPhone02',
      Component: <IcoPhone02 width={40} height={40} stroke="#4C515E" />,
      file: 'ic_phone-02.svg',
    },
    {
      name: 'IcoPhone03',
      Component: <IcoPhone03 width={40} height={40} stroke="#4C515E" />,
      file: 'ic_phone-03.svg',
    },
    {
      name: 'IcoDotpoints',
      Component: <IcoDotpoints width={24} height={24} stroke="#4C515E" />,
      file: 'ic_dotpoints-02.svg',
    },
    {
      name: 'IcoGrid01',
      Component: <IcoGrid01 width={24} height={24} stroke="#4C515E" />,
      file: 'ic_grid-01.svg',
    },
    {
      name: 'IcoMybook',
      Component: <IcoMybook width={24} height={24} stroke="#4C515E" />,
      file: 'ic_mybook.svg',
    },
    {
      name: 'IcoPlay02',
      Component: <IcoPlay02 width={24} height={24} stroke="#4C515E" />,
      file: 'ic_play-02.svg',
    },
    {
      name: 'IcoMoreHorizontal',
      Component: <IcoMoreHorizontal width={24} height={24} stroke="#4C515E" />,
      file: 'ic_more_horizontal.svg',
    },
    {
      name: 'IcoEye',
      Component: <IcoEye width={24} height={24} stroke="#4C515E" />,
      file: 'ic_eye.svg',
    },
    {
      name: 'IcoAnnouncement03',
      Component: <IcoAnnouncement03 width={24} height={24} stroke="#4C515E" />,
      file: 'ic_announcement_03.svg',
    },
    {
      name: 'IcoClock01',
      Component: <IcoClock01 width={24} height={24} stroke="#4C515E" />,
      file: 'ic_clock_01.svg',
    },
    {
      name: 'IcoRefresh',
      Component: <IcoRefresh width={24} height={24} stroke="#4C515E" />,
      file: 'ic_refresh.svg',
    },
    {
      name: 'IcoRefresh02',
      Component: <IcoRefresh02 width={24} height={24} stroke="#4C515E" />,
      file: 'ic_refresh02.svg',
    },
    {
      name: 'IcoPause',
      Component: <IcoPause width={24} height={24} stroke="#4C515E" />,
      file: 'ic_pause.svg',
    },
    {
      name: 'IcoComplete02',
      Component: <IcoComplete02 width={24} height={24} stroke="#4C515E" />,
      file: 'ic_complete02.svg',
    },
    {
      name: 'IcoProgressComplete',
      Component: <IcoProgressComplete width={24} height={24} stroke="#4C515E" />,
      file: 'ic_complete03.svg',
    },
    {
      name: 'IcoFileMp4',
      Component: <IcoFileMp4 width={24} height={24} stroke="#4C515E" />,
      file: 'ic_file_mp4.svg',
    },
    {
      name: 'IcoFileExcel',
      Component: <IcoFileExcel width={24} height={24} stroke="#4C515E" />,
      file: 'ic_file_excel.svg',
    },
    {
      name: 'IcoBlog',
      Component: <IcoBlog width={24} height={24} stroke="#4C515E" />,
      file: 'ic_blog.svg',
    },
    {
      name: 'IcoEntrust',
      Component: <IcoEntrust width={24} height={24} stroke="#4C515E" />,
      file: 'ic_entrust.svg',
    },
    {
      name: 'IcoInfoCircle',
      Component: <IcoInfoCircle width={24} height={24} stroke="#4C515E" />,
      file: 'ic_info_circle.svg',
    },
    {
      name: 'IcoImage01',
      Component: <IcoImage01 width={24} height={24} stroke="#4C515E" />,
      file: 'ic_image_01.svg',
    },
    {
      name: 'IcoVideo01',
      Component: <IcoVideo01 width={24} height={24} stroke="#4C515E" />,
      file: 'ic_video_recorder_01.svg',
    },
    {
      name: 'IcoVideo02',
      Component: <IcoVideo02 width={24} height={24} stroke="#4C515E" />,
      file: 'ic_video_recorder_02.svg',
    },
    {
      name: 'IcoClass',
      Component: <IcoClass width={24} height={24} stroke="#4C515E" />,
      file: 'ic_users_plus.svg',
    },
    {
      name: 'IcoQuestionBank',
      Component: <IcoQuestionBank width={24} height={24} stroke="#4C515E" />,
      file: 'ic_questionbank.svg',
    },
    {
      name: 'IcoLive',
      Component: <IcoLive width={24} height={24} stroke="#4C515E" />,
      file: 'ic_live.svg',
    },
    {
      name: 'IcoLiveHive',
      Component: <IcoLiveHive width={24} height={24} stroke="#4C515E" />,
      file: 'ic_livehive.svg',
    },
    {
      name: 'IcoHtml',
      Component: <IcoHtml width={24} height={24} stroke="#4C515E" />,
      file: 'ic_html.svg',
    },
    {
      name: 'IcoEtc',
      Component: <IcoEtc width={24} height={24} stroke="#4C515E" />,
      file: 'ic_etc.svg',
    },
    {
      name: 'IcoUser01',
      Component: <IcoUser01 width={24} height={24} stroke="#4C515E" />,
      file: 'ic_user_01.svg',
    },
    {
      name: 'IcoSpinner',
      Component: <IcoSpinner width={24} height={24} stroke="#4C515E" />,
      file: 'ic_spinner.svg',
    },
    {
      name: 'IcoSpinnerBlue',
      Component: <IcoSpinnerBlue width={24} height={24} stroke="#4C515E" />,
      file: 'ic_spinner_blue.svg',
    },
    {
      name: 'IcoSucess',
      Component: <IcoSucess width={24} height={24} stroke="#4C515E" />,
      file: 'ic_sucess.svg',
    },
    {
      name: 'IcoArray',
      Component: <IcoArray width={24} height={24} stroke="#4C515E" />,
      file: 'ic_array.svg',
    },
    {
      name: 'IcoPlay',
      Component: <IcoPlay width={24} height={24} stroke="#4C515E" />,
      file: 'ic_play.svg',
    },
    {
      name: 'IcoRating',
      Component: <IcoRating width={24} height={24} stroke="#4C515E" />,
      file: 'ic_rating.svg',
    },
    {
      name: 'IcoHeart',
      Component: <IcoHeart width={24} height={24} stroke="#4C515E" />,
      file: 'ic_heart.svg',
    },
    {
      name: 'IcoMonitor01',
      Component: <IcoMonitor01 width={24} height={24} stroke="#4C515E" />,
      file: 'ic_monitor-01.svg',
    },
    {
      name: 'IcoStatusFail',
      Component: <IcoStatusFail width={24} height={24} stroke="#4C515E" />,
      file: 'ic_status_failed.svg',
    },
    {
      name: 'IcoShieldTick01',
      Component: <IcoShieldTick01 width={24} height={24} stroke="#4C515E" />,
      file: 'ic_shield-tick-01.svg',
    },
    {
      name: 'IcoFaceId01',
      Component: <IcoFaceId01 width={24} height={24} stroke="#4C515E" />,
      file: 'ic_face-id-01.svg',
    },
    {
      name: 'IcoCompanion',
      Component: <IcoCompanion width={24} height={24} stroke="#4C515E" />,
      file: 'ic_companion.svg',
    },
    {
      name: 'IcoProgress',
      Component: <IcoProgress width={24} height={24} stroke="#4C515E" />,
      file: 'ic_progress.svg',
    },
    {
      name: 'IcoFilter',
      Component: <IcoFilter width={24} height={24} stroke="#4C515E" />,
      file: 'ic_filter.svg',
    },
    {
      name: 'IcoArrowDownDouble',
      Component: <IcoArrowDownDouble width={24} height={24} stroke="#4C515E" />,
      file: 'ic_arrow_down_double.svg',
    },
    {
      name: 'IcoArrowUpDouble',
      Component: <IcoArrowUpDouble width={24} height={24} stroke="#4C515E" />,
      file: 'ic_arrow_up_double.svg',
    },
    {
      name: 'IcoNarrowRight',
      Component: <IcoNarrowRight width={24} height={24} stroke="#4C515E" />,
      file: 'ic_arrow_narrow_right.svg',
    },
    {
      name: 'IcoGridOrder',
      Component: <IcoGridOrder width={24} height={24} stroke="#4C515E" />,
      file: 'ic_grid_order.svg',
    },
    {
      name: 'IcoFileImg',
      Component: <IcoFileImg width={24} height={24} stroke="#4C515E" />,
      file: 'ic_file_img.svg',
    },
    {
      name: 'IcoFileVideo',
      Component: <IcoFileVideo width={24} height={24} stroke="#4C515E" />,
      file: 'ic_file_video.svg',
    },
    {
      name: 'IcoExam',
      Component: <IcoExam width={24} height={24} stroke="#4C515E" />,
      file: 'ic_exam.svg',
    },
    {
      name: 'IcoFolder',
      Component: <IcoFolder width={24} height={24} stroke="#4C515E" />,
      file: 'ic_folder.svg',
    },
    {
      name: 'IcoHomework',
      Component: <IcoHomework width={24} height={24} stroke="#4C515E" />,
      file: 'ic_homework.svg',
    },
    {
      name: 'IcoMultiScorm',
      Component: <IcoMultiScorm width={24} height={24} stroke="#4C515E" />,
      file: 'ic_multi_scorm.svg',
    },
    {
      name: 'IcoSurvey',
      Component: <IcoSurvey width={24} height={24} stroke="#4C515E" />,
      file: 'ic_survey.svg',
    },
    {
      name: 'IcoSetting01',
      Component: <IcoSetting01 width={24} height={24} stroke="#4C515E" />,
      file: 'ic_setting_01.svg',
    },
    {
      name: 'IcoReview',
      Component: <IcoReview width={24} height={24} stroke="#4C515E" />,
      file: 'ic_review.svg',
    },
    {
      name: 'IcoSucess02',
      Component: <IcoSucess02 width={24} height={24} stroke="#4C515E" />,
      file: 'ic_sucess_02.svg',
    },
    {
      name: 'IcoPaperClip',
      Component: <IcoPaperClip width={24} height={24} stroke="#4C515E" />,
      file: 'ic_paperclip.svg',
    },
    {
      name: 'IcoPpt',
      Component: <IcoPpt width={24} height={24} stroke="#4C515E" />,
      file: 'ic_ppt.svg',
    },
    {
      name: 'IcoShare',
      Component: <IcoShare width={24} height={24} stroke="#4C515E" />,
      file: 'ic_share.svg',
    },
    {
      name: 'IcoPin',
      Component: <IcoPin width={24} height={24} stroke="#4C515E" />,
      file: 'ic_pin.svg',
    },
    {
      name: 'IcoThumbsUp',
      Component: <IcoThumbsUp width={24} height={24} stroke="#4C515E" />,
      file: 'ic_thumbs_up.svg',
    },
    {
      name: 'IcoMessageCircle',
      Component: <IcoMessageCircle width={24} height={24} stroke="#4C515E" />,
      file: 'ic_message_circle.svg',
    },
    {
      name: 'IcoMoreVertical',
      Component: <IcoMoreVertical width={24} height={24} stroke="#4C515E" />,
      file: 'ic_more_vertical.svg',
    },
    {
      name: 'IcoDownArrow',
      Component: <IcoDownArrow width={24} height={24} stroke="#4C515E" />,
      file: 'ic_down_arrow.svg',
    },
    {
      name: 'IcoArrowLineTop',
      Component: <IcoArrowLineTop width={24} height={24} stroke="#4C515E" />,
      file: 'ic_arrow_line_top.svg',
    },
    {
      name: 'IcoFolderOpen',
      Component: <IcoFolderOpen width={24} height={24} stroke="#4C515E" />,
      file: 'ic_folder_open.svg',
    },
    {
      name: 'IcoBoxMinus',
      Component: <IcoBoxMinus width={24} height={24} stroke="#4C515E" />,
      file: 'ic_box_minus.svg',
    },
    {
      name: 'IcoBoxPlus',
      Component: <IcoBoxPlus width={24} height={24} stroke="#4C515E" />,
      file: 'ic_box_plus.svg',
    },
    {
      name: 'IcoMessageText',
      Component: <IcoMessageText width={24} height={24} stroke="#4C515E" />,
      file: 'ic_message-text-square.svg',
    },
    {
      name: 'IcoMove01',
      Component: <IcoMove01 width={24} height={24} stroke="#4C515E" />,
      file: 'ic_move_01.svg',
    },
    {
      name: 'IcoFile01',
      Component: <IcoFile01 width={24} height={24} stroke="#4C515E" />,
      file: 'ic_file_01.svg',
    },
    {
      name: 'IcoCopy',
      Component: <IcoCopy width={24} height={24} stroke="#4C515E" />,
      file: 'ic_copy.svg',
    },
    {
      name: 'IcoLearning01',
      Component: <IcoLearning01 width={24} height={24} stroke="#4C515E" />,
      file: 'ic_learning_01.svg',
    },
    {
      name: 'IcoLearning02',
      Component: <IcoLearning02 width={24} height={24} stroke="#4C515E" />,
      file: 'ic_learning_02.svg',
    },
    {
      name: 'IcoLearning03',
      Component: <IcoLearning03 width={24} height={24} stroke="#4C515E" />,
      file: 'ic_learning_03.svg',
    },
    {
      name: 'IcoLearning04',
      Component: <IcoLearning04 width={24} height={24} stroke="#4C515E" />,
      file: 'ic_learning_04.svg',
    },
    {
      name: 'IcoLearning05',
      Component: <IcoLearning05 width={24} height={24} stroke="#4C515E" />,
      file: 'ic_learning_05.svg',
    },
    {
      name: 'IcoLearning06',
      Component: <IcoLearning06 width={24} height={24} stroke="#4C515E" />,
      file: 'ic_learning_06.svg',
    },
    {
      name: 'IcoPrevPlay',
      Component: <IcoPrevPlay width={24} height={24} stroke="#4C515E" />,
      file: 'ic_prev_play.svg',
    },
    {
      name: 'IcoPrevNext',
      Component: <IcoPrevNext width={24} height={24} stroke="#4C515E" />,
      file: 'ic_next_play.svg',
    },
    {
      name: 'IcoArrowDownFilled',
      Component: <IcoArrowDownFilled width={24} height={24} stroke="#4C515E" />,
      file: 'ic_arrow_down_filled.svg',
    },
    {
      name: 'IcoSubtitles',
      Component: <IcoSubtitles width={24} height={24} stroke="#4C515E" />,
      file: 'ic_subtitles.svg',
    },
    {
      name: 'IcoPlayerSetting',
      Component: <IcoPlayerSetting width={24} height={24} stroke="#4C515E" />,
      file: 'ic_player_setting.svg',
    },
    {
      name: 'IcoPlayerPlay',
      Component: <IcoPlayerPlay width={24} height={24} stroke="#4C515E" />,
      file: 'ic_player_play.svg',
    },
    {
      name: 'IcoPlayerPause',
      Component: <IcoPlayerPause width={24} height={24} stroke="#4C515E" />,
      file: 'ic_player_pause.svg',
    },
    {
      name: 'IcoExpand',
      Component: <IcoExpand width={24} height={24} stroke="#4C515E" />,
      file: 'ic_expand.svg',
    },
    {
      name: 'IcoReduce',
      Component: <IcoReduce width={24} height={24} stroke="#4C515E" />,
      file: 'ic_reduce.svg',
    },
    {
      name: 'IcoClock10Back',
      Component: <IcoClock10Back width={24} height={24} stroke="#4C515E" />,
      file: 'ic_clock_10_back.svg',
    },
    {
      name: 'IcoClock10Forward',
      Component: <IcoClock10Forward width={24} height={24} stroke="#4C515E" />,
      file: 'ic_clock_10_forward.svg',
    },
    {
      name: 'IcoBackward',
      Component: <IcoBackward width={24} height={24} stroke="#4C515E" />,
      file: 'ic_backward.svg',
    },
    {
      name: 'IcoList',
      Component: <IcoList width={24} height={24} stroke="#4C515E" />,
      file: 'ic_list.svg',
    },
    {
      name: 'IcoAvatar',
      Component: <IcoAvatar width={24} height={24} stroke="#4C515E" />,
      file: 'ic_avatar.svg',
    },
    {
      name: 'IcoAvatar02',
      Component: <IcoAvatar02 width={24} height={24} stroke="#4C515E" />,
      file: 'ic_avatar_02.svg',
    },
    {
      name: 'IcoSymbol',
      Component: <IcoSymbol width={24} height={24} stroke="#4C515E" />,
      file: 'ic_symbol.svg',
    },
    {
      name: 'IcoFilePng',
      Component: <IcoFilePng width={24} height={24} stroke="#4C515E" />,
      file: 'ic_file_png.svg',
    },
    {
      name: 'IcoBook',
      Component: <IcoBook width={24} height={24} stroke="#4C515E" />,
      file: 'ic_book.svg',
    },
    {
      name: 'IcoBuilding',
      Component: <IcoBuilding width={24} height={24} stroke="#4C515E" />,
      file: 'ic_building.svg',
    },
    {
      name: 'IcoCategory',
      Component: <IcoCategory width={24} height={24} stroke="#4C515E" />,
      file: 'ic_category.svg',
    },
    {
      name: 'IcoDivice',
      Component: <IcoDivice width={24} height={24} stroke="#4C515E" />,
      file: 'ic_divice.svg',
    },
    {
      name: 'IcoLevel',
      Component: <IcoLevel width={24} height={24} stroke="#4C515E" />,
      file: 'ic_level.svg',
    },
    {
      name: 'IcoLocation',
      Component: <IcoLocation width={24} height={24} stroke="#4C515E" />,
      file: 'ic_location.svg',
    },
    {
      name: 'IcoPrize',
      Component: <IcoPrize width={24} height={24} stroke="#4C515E" />,
      file: 'ic_prize.svg',
    },
    {
      name: 'IcoSubtitles02',
      Component: <IcoSubtitles02 width={24} height={24} stroke="#4C515E" />,
      file: 'ic_subtitles_02.svg',
    },
    {
      name: 'IcoTime',
      Component: <IcoTime width={24} height={24} stroke="#4C515E" />,
      file: 'ic_time.svg',
    },
    {
      name: 'IcoPdf',
      Component: <IcoPdf width={24} height={24} stroke="#4C515E" />,
      file: 'ic_pdf.svg',
    },
    {
      name: 'IcoLock',
      Component: <IcoLock width={24} height={24} stroke="#4C515E" />,
      file: 'ic_lock.svg',
    },
    {
      name: 'IcoEssential',
      Component: <IcoEssential width={24} height={24} stroke="#4C515E" />,
      file: 'ic_essential.svg',
    },
    {
      name: 'IcoTeacher',
      Component: <IcoTeacher width={24} height={24} stroke="#4C515E" />,
      file: 'ic_teacher.svg',
    },
    {
      name: 'IcoMoney',
      Component: <IcoMoney width={24} height={24} stroke="#4C515E" />,
      file: 'ic_money.svg',
    },
    {
      name: 'IcoChair',
      Component: <IcoChair width={24} height={24} stroke="#4C515E" />,
      file: 'ic_chair.svg',
    },
    {
      name: 'IcoTranslation',
      Component: <IcoTranslation width={24} height={24} stroke="#4C515E" />,
      file: 'ic_translation.svg',
    },
    {
      name: 'IcoImport',
      Component: <IcoImport width={24} height={24} stroke="#4C515E" />,
      file: 'ic_import.svg',
    },
    {
      name: 'IcoSucess03',
      Component: <IcoSucess03 width={24} height={24} stroke="#4C515E" />,
      file: 'ic_sucess_03.svg',
    },
    {
      name: 'IcoError02',
      Component: <IcoError02 width={24} height={24} stroke="#4C515E" />,
      file: 'ic_error_02.svg',
    },
    {
      name: 'IcoHistory',
      Component: <IcoHistory width={24} height={24} stroke="#4C515E" />,
      file: 'ic_history.svg',
    },
    {
      name: 'IcoLang',
      Component: <IcoLang width={24} height={24} stroke="#4C515E" />,
      file: 'ic_lang.svg',
    },
    {
      name: 'IcoLink',
      Component: <IcoLink width={24} height={24} stroke="#4C515E" />,
      file: 'ic_link.svg',
    },
    {
      name: 'IcoArrow',
      Component: <IcoArrow width={24} height={24} stroke="#4C515E" />,
      file: 'ic_arrow.svg',
    },
    {
      name: 'IcoSpeakerFill',
      Component: <IcoSpeakerFill width={24} height={24} stroke="#4C515E" />,
      file: 'ic_speaker_fill.svg',
    },
    {
      name: 'IcoNextPlayFill',
      Component: <IcoNextPlayFill width={24} height={24} stroke="#4C515E" />,
      file: 'ic_nextplay_fill.svg',
    },
    {
      name: 'IcoPrevPlayFill',
      Component: <IcoPrevPlayFill width={24} height={24} stroke="#4C515E" />,
      file: 'ic_prevplay_fill.svg',
    },
    {
      name: 'IcoVideoPlay',
      Component: <IcoVideoPlay width={24} height={24} stroke="#4C515E" />,
      file: 'ic_video_play.svg',
    },
    {
      name: 'IcoVideoStop',
      Component: <IcoVideoStop width={24} height={24} stroke="#4C515E" />,
      file: 'ic_video_stop.svg',
    },
    {
      name: 'IcoSettingsFill',
      Component: <IcoSettingsFill width={24} height={24} stroke="#4C515E" />,
      file: 'ic_settings_fill.svg',
    },
    {
      name: 'IcoSpeakerOffFill',
      Component: <IcoSpeakerOffFill width={24} height={24} stroke="#4C515E" />,
      file: 'ic_speaker_off_fill.svg',
    },
    {
      name: 'IcoCircleProgress',
      Component: <IcoCircleProgress width={24} height={24} stroke="#4C515E" />,
      file: 'ic_circle_progress.svg',
    },
    {
      name: 'IcoPoint',
      Component: <IcoPoint width={24} height={24} stroke="#FF8245" />,
      file: 'ic_point.svg',
    },
    {
      name: 'IcoChart',
      Component: <IcoChart width={67} height={62} />,
      file: 'ic_chart.svg (색상변경금지)',
    },
    {
      name: 'IcoPaper',
      Component: <IcoPaper width={75} height={72} />,
      file: 'ic_paper.svg (색상변경금지)',
    },
    {
      name: 'IcoRocket',
      Component: <IcoRocket width={64} height={61} />,
      file: 'ic_rocket.svg (색상변경금지)',
    },
    {
      name: 'IcoNudge01',
      Component: <IcoNudge01 width={24} height={24} />,
      file: 'ic_nudge01.svg (색상변경금지)',
    },
    {
      name: 'IcoNudge03',
      Component: <IcoNudge03 width={24} height={24} />,
      file: 'ic_nudge03.svg (색상변경금지)',
    },
    {
      name: 'IcoNudge04',
      Component: <IcoNudge04 width={24} height={24} />,
      file: 'ic_nudge04.svg (색상변경금지)',
    },
    {
      name: 'IcoNudge05',
      Component: <IcoNudge05 width={24} height={24} />,
      file: 'ic_nudge05.svg (색상변경금지)',
    },
    {
      name: 'IcoNudge10',
      Component: <IcoNudge10 width={24} height={24} />,
      file: 'ic_nudge10.svg (색상변경금지)',
    },
    {
      name: 'IcoWordArrow',
      Component: <IcoWordArrow width={15} height={10} />,
      file: 'ic_word_arrow.svg (색상변경금지)',
    },
    {
      name: 'IcoDocument',
      Component: <IcoDocument width={48} height={48} />,
      file: 'ic_document.svg (색상변경금지)',
    },
    {
      name: 'IcoAiSymbol',
      Component: <IcoDocument width={12} height={12} />,
      file: 'ico_ai_symbol.svg (색상변경금지)',
    },
  ];
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

 // CSS활용 예시 (권장)
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
        <h3 className="guide_tit3">SVG Preview</h3>
        <div className="flex_box">
          {icons.map(({ name, Component, file }) => (
            <div key={name} className="icon_item">
              <div>{Component}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="group">
        <h3 className="guide_tit3">SVG Lists Detail</h3>
        <div className="flex_box">
          {icons.map(({ name, Component, file }) => (
            <div key={name} className="icon_item">
              <div className="item">
                <div>{Component}</div>
                <div>이름 : {name}</div>
                <div>파일명 : {file}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
