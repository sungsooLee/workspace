/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * SSCO CMI 저장 정보
 */
export type com_ever_edu_cms_scorm_dto_rte_ScoCmiObjectInfoDto = {
    /**
     * SCO 학습목표 정보 목록
     */
    objectives?: Record<string, string>;
    /**
     * 학습자 ID
     */
    'cmi.learner_id': string;
    /**
     * 학습자이름
     */
    'cmi.learner_name'?: string;
    /**
     * 총 시간
     */
    'cmi.total_time'?: string;
    /**
     * 학습목표 횟수
     */
    'cmi.objectives._count'?: string;
    /**
     * 스콤완료상태(read-write), 학습자가 SCO의 학습을 모두 완료했는지 여부를 나타냄.
     */
    'cmi.completion_status'?: string;
    /**
     * 스콤완료기준(read-only), SCO의 완료여부를 결정하는데 사용하는 0.0~1.0 사이의 값
     */
    'cmi.completion_threshold'?: string;
    /**
     * 참가 정보(read-only),  ex>"ab-inito" : 처음 SCO에 접근함,  "resume" : 이전에 SCO에 접근한 적이 있음.,""
     */
    'cmi.entry'?: string;
    /**
     * 학점이수과정 여부(read-only), "credit" : 학점 이수 과정, "no-credit" : 학점 이수 과정 아님.
     */
    'cmi.credit'?: string;
    /**
     * 종료 상태(write-only), ex> timeout, suspend, logout, normal, ""
     */
    'cmi.exit'?: string;
    /**
     * 출시 데이터(read-only),  SCO를 초기화할 때 사용할 수 있는 데이터. 4000자
     */
    'cmi.launch_data'?: string;
    /**
     * 현재 학습하고 있는 SCO의 위치(read-write). location은 SCO에 대한 학습이 종료될 때. 즉, terminate()가 호출될 때 기본적으로 저장
     */
    'cmi.location'?: string;
    /**
     * 스콤최대학습시간(read-only)
     */
    'cmi.max_time_allowed'?: string;
    /**
     * 스콤학습모드(read-only), ex> browse, normal, review
     */
    'cmi.mode'?: string;
    /**
     * 학습진행정도값(read-write), 학습자의 학습진행 정도를 0 ~ 1 사이의 값으로 표시
     */
    'cmi.progress_measure'?: string;
    /**
     * 스콤진도측정값(read-only), SCO를 master하기 위해 요구되는 Pass 점수. -1.0 ~ 1.0 사이의 값으로 표시
     */
    'cmi.scaled_passing_score'?: string;
    /**
     * 스콤합격상태(read-write), 학습자가 SCO를 마스터(master) 했는지 여부. "passed", "failed", "unknown" 값 중의 하나.
     */
    'cmi.success_status'?: string;
    /**
     * 스콤보류데이터(read-write), cmi.exit로 빠져나깔 때, 잠시 중지(suspend)하는 경우 다시 돌아왔을 때 전에 사용하던 데이터를 유지
     */
    'cmi.suspend_data'?: string;
    /**
     * 스콤시간초과액션(read-only), cmi.max_time_allowed가 초과되었을 때 SCO가 처리해야 하는 방식<br> "exit_message", "continue_message", "exit_no_message", "continue_no_message"
     */
    'cmi.time_limit_action'?: string;
    /**
     * 스콤최종점수(read-write), SCO에 대한 학습자의 점수를 비율로 적용한 값. -1 ~ 1 사이의 값.
     */
    'cmi.score.scaled'?: string;
    /**
     * 학습자실제점수(read-write), SCO에 대한 학습자의 실제 점수
     */
    'cmi.score.raw'?: string;
    /**
     * 스콤최대점수(read-write), CO에 대한 가능한 최대 점수
     */
    'cmi.score.max'?: string;
    /**
     * 스콤최저점수(read-write), SCO에 대한 가능한 최소 점수
     */
    'cmi.score.min'?: string;
    /**
     * 스콤학습자선호오디오레벨(read-write)
     */
    'cmi.learner_preference.audio_level'?: string;
    /**
     * 스콤학습자선호언어(read-write), 학습자가 선호하는 언어를 나타냄
     */
    'cmi.learner_preference.language'?: string;
    /**
     * 스콤학습자선호전달속도(read-write), 콘텐츠에 대한 속도 조절. 2배 빠르게 혹은 2배 느리게.. 등으로 설정
     */
    'cmi.learner_preference.delivery_speed'?: string;
    /**
     * 스콤학습자선호오디오캡션닝(read-write), 음성에 대한 자막을 보여줄지 여부를 나타냄,<br>- "-1": "off", "0": - "no_change", - "1": "on"
     */
    'cmi.learner_preference.audio_captioning'?: string;
    /**
     * 스콤학습횟수, cmi.attempt
     */
    'cmi.attempt'?: number;
    /**
     * 마지막 본 동영상재생위치
     */
    'cmi.vod_current_play_time'?: number;
};

