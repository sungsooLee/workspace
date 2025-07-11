const cimSchema = new Map();
const objectivesSchema = new Map();

class CimElementInfo {
  setAllow = false;
  constructor(setAllow?: boolean) {
    this.setAllow = setAllow || false;
  }
}
// cmi.comments_from_learner 학습자 의견 사용하지 않음.
// cmi.comments_from_lms 학습자 전달문 사용하자 않음.
// cmi.interactions 상호 작용 사용하지 않음.
// cmi._version 사용하지 않음. <- 직접 전달 필요?

/* 학습자 ID : SCO가 실행될때 학습자 ID 확인 */
cimSchema.set('cmi.learner_id', new CimElementInfo());
/* 학습자 이름 : 학습자의 이름 표시 */
cimSchema.set('cmi.learner_name', new CimElementInfo());
/* 학습자가 음성 볼륨 조절과 관련된 단계를 설정.*/
cimSchema.set('cmi.learner_preference.audio_level', new CimElementInfo(true));
/* 학습자가 선호하는 언어를 나타냄 */
cimSchema.set('cmi.learner_preference.language', new CimElementInfo(true));
/* 콘텐츠에 대한 속도 조절. 2배 빠르게 혹은 2배 느리게.. 등으로 설정 가능 */
cimSchema.set('cmi.learner_preference.delivery_speed', new CimElementInfo(true));
/* 음성에 대한 자막을 보여줄지 여부를 나타냄 */
cimSchema.set('cmi.learner_preference.audio_captioning', new CimElementInfo(true));
/* 학점 이수 과정 여부를 지정 : "credit" : 학점 이수 과정, "no-credit" : 학점 이수 과정 아님 */
cimSchema.set('cmi.credit', new CimElementInfo());
/* 실행초 전달문 */
cimSchema.set('cmi.launch_data', new CimElementInfo());
/* 학습 모드 : "browse" : 관람자 모드 "normal" : 일반 학생 모드(학습추적 데이터를 저장할 때 사용) "review" : 학습이 완료된 상태에서 복습하기 위해 들어온 경우 */
cimSchema.set('cmi.mode', new CimElementInfo());
/* 학습경험여부 : "ab-inito" : 처음 SCO에 접근함 "resume" : 이전에 SCO에 접근한 적이 있음 "" : 정보 없음 */
cimSchema.set('cmi.entry', new CimElementInfo());
/* 학습위치 북마크 */
cimSchema.set('cmi.location', new CimElementInfo(true));
/* 학습중단 종료 
"time-out" : max_time_allowed로 지정된 제한 시간을 넘겨서 종료할 때 
"suspend" : 일시정지 버튼을 통해 종료할 때. 
"logout" : 로그아웃을 통해 종료할 때. 
"normal" : 정상적으로 SCO를 종료할 때. 
"" : 종료 조건이 정의되지 않았을 때. */
cimSchema.set('cmi.exit', new CimElementInfo());
/* 임시정보 */
cimSchema.set('cmi.suspend_data', new CimElementInfo(true));
/* 총 학습시간 */
cimSchema.set('cmi.total_time', new CimElementInfo());
/* 최대 학습 허용 시간 */
cimSchema.set('cmi.max_time_allowed', new CimElementInfo());
/* 최대허용학습시간초과시 동작 */
cimSchema.set('cmi.time_limit_action', new CimElementInfo());
/* 	진도 값 : 0 : "not attempted" 1 : "completed" 0<n< 1 : "incompleted"*/
cimSchema.set('cmi.progress_measure', new CimElementInfo(true));
/* 학습이수 상태 : 
"completed" : SCO의 학습이 모두 완료된 상태. 학습완료
"incomplete" : SCO의 학습은 시작했으나 아직 완료되지 않은 상태. 학습중
"not attempted" : 아직 SCO의 학습이 시작되지 않은 상태. 미학습
"unknown" : 상태값이 확정되지 않은 상태 - 시퀀싱을 적용할 때 나타날 수 있음 */
cimSchema.set('cmi.completion_status', new CimElementInfo(true));
/* 학습이수 기준값 0 ~ 1 사이값 */
cimSchema.set('cmi.completion_threshold', new CimElementInfo());
/* SCO에 대한 학습자의 점수를  비율로 적용한 값 0 ~ 1 사이값 */
cimSchema.set('cmi.score.scaled', new CimElementInfo(true));
/* SCO에 대한 학습자의 실제 점수 */
cimSchema.set('cmi.score.raw', new CimElementInfo(true));
/* SCO에 대한 가능한 최소 점수 */
cimSchema.set('cmi.score.min', new CimElementInfo());
/* SCO에 대한 가능한 최대 점수 */
cimSchema.set('cmi.score.max', new CimElementInfo());
/* 정산된 합격점수 */
cimSchema.set('cmi.scaled_passing_score', new CimElementInfo());
/* 학습자가 SCO를 마스터(master) 했는지 여부 */
cimSchema.set('cmi.success_status', new CimElementInfo(true));

/* n번째 학습목표에 대한 구분자 */
objectivesSchema.set('id', new CimElementInfo(true));
/* n번째 학습목표에 대한 학습자의 점수를 비율로 적용한 값, -1~1 사이의 값 */
objectivesSchema.set('score.scaled', new CimElementInfo(true));
/* n번째 학습목표에 대한 학습자의 실제 점수 */
objectivesSchema.set('score.raw', new CimElementInfo(true));
/* n번째 학습목표에 대한 가능한 최소 점수 */
objectivesSchema.set('score.min', new CimElementInfo());
/* n번째 학습목표에 대한가능한 최대 점수 */
objectivesSchema.set('score.max', new CimElementInfo());
/* n번째 학습목표에 대한 pass 여부입니다.  "passed" "failed" "unknown"*/
objectivesSchema.set('success_status', new CimElementInfo(true));
/* n번째 학습목표에 대한 완료 여부입니다. "completed" "incomplete" "not-attempted" "unknown" */
objectivesSchema.set('completion_status', new CimElementInfo(true));
/* 	n번째 학습목표에 대한 진행정도를 나타냅니다. */
objectivesSchema.set('progress_measure', new CimElementInfo(true));
/* n번째 학습목표에 대한 설명 */
objectivesSchema.set('description', new CimElementInfo(true));

export function checkSetValue(element: string): boolean {
  // 현재 서비스에서 제공되지 않는 규격
  if (
    element.startsWith('cmi.comments_from_learner') ||
    element.startsWith('cmi.comments_from_lms') ||
    element.startsWith('cmi.interactions') ||
    element.startsWith('cmi._version')
  )
    return false;

  if (element.startsWith('cmi.objectives')) {
    const fields = element.split('.');
    if (fields.length > 5 || fields.length < 3) return false;
    const objIndex = parseInt(fields[3 - 1]);
    if (isNaN(objIndex)) return false;
    let elimInfo = objectivesSchema.get(fields[4 - 1]);
    if (fields.length === 5) {
      const chkkey = `${fields[4 - 1]}.${fields[5 - 1]}`;
      elimInfo = objectivesSchema.get(chkkey);
    }
    if (elimInfo) {
      return elimInfo.setAllow;
    }
  } else if (element.startsWith('cmi.')) {
    const elimInfo = cimSchema.get(element);
    if (elimInfo) {
      return elimInfo.setAllow;
    }
  } else {
    return false;
  }
  return false;
}
