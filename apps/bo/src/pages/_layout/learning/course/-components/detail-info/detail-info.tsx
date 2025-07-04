import { DropdownFormField } from '@features/form';
import { ChannelListModal } from '@features/learning/course/ui/modal/channel-list-modal/channel-list-modal';
import { TeacherListModal } from '@features/learning/course/ui/modal/teacher-list-modal/teacher-list-modal';
import { CODE_GROUP, useDynamicForm2 } from '@learnway/hooks';
import {
  Button,
  CheckboxGroupFormField,
  ChipListModalSelectorFormField,
  ContentsRow,
  Input,
  InputModalSelectorFormField,
  RadioGroupFormField,
} from '@learnway/ui';
import { FormRow, FormRow2, FormSubTitle } from '@shared/ui';
import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { useTranslation } from 'react-i18next';
import { TabFormRef } from '../common/tab-form-ref';
import { Course, CourseConfig } from '@types';

interface DetailInfoProps {
  dummy?: any;
  // dynamicForm: UseDynamicFormResult;
  data: { formData: Course; courseConfig: CourseConfig };
}

const DetailInfoComponent = forwardRef<TabFormRef, DetailInfoProps>(
  ({ dummy, data: { formData, courseConfig } }, ref) => {
    const { t } = useTranslation();
    // const { provider, getValues, fetchData } = dynamicForm;
    const { provider, getValues, onSubmit, onFormValid, formState, updateFormData } =
      useDynamicForm2();

    const handleOnSubmit = (data: any) => {
      console.log('data {} => ', data);
    };

    // 부모 컴포넌트에서 호출할 수 있는 유효성 검사 메서드
    useImperativeHandle(ref, () => ({
      validate: async () => {
        // 모든 필드에 대해 유효성 검사 수행
        const isValid = await onFormValid();
        const data = getValues();
        const errors = formState.errors;

        return {
          isValid,
          data,
          errors,
        };
      },
    }));

    useEffect(() => {
      console.log('DetailInfoComponent init');
      // 초기 데이터가 있으면 설정
      if (formData) {
        updateFormData(formData);
      }
    }, [formData]);

    return (
      <div>
        {/*학습환경*/}
        <FormSubTitle label={t('학습환경')} />
        {/* 기기 제한, 네트워크 제한, 학습시간 제한 */}
        <ContentsRow>
          {/*기기 제한*/}
          <FormRow2
            provider={provider}
            name={'기기 제한'}
            label={'기기 제한'}
            element={
              <RadioGroupFormField
                optionsConfig={{
                  codeGroup: CODE_GROUP['lms.course.DeviceRestrictType'],
                }}
              />
            }
          />
          {/*네트워크 제한*/}
          <FormRow2
            provider={provider}
            name={'네트워크 제한'}
            label={'네트워크 제한'}
            element={
              <RadioGroupFormField
                optionsConfig={{
                  codeGroup: CODE_GROUP['mock.options.use'],
                }}
              />
            }
          />
          {/*학습시간 제한*/}
          <FormRow2
            provider={provider}
            name={'학습시간 제한'}
            label={'학습시간 제한'}
            element={
              <RadioGroupFormField
                optionsConfig={{
                  codeGroup: CODE_GROUP['lms.course.LearningRestrictTimeType'],
                }}
              />
            }
          />
        </ContentsRow>
        {/* 복습 제한, 화면캡쳐 방지, 학습전 보안 서약 */}
        <ContentsRow>
          {/*복습 제한*/}
          <FormRow2
            provider={provider}
            name={'복습 제한'}
            label={'복습 제한'}
            element={
              <RadioGroupFormField
                optionsConfig={{
                  codeGroup: CODE_GROUP['mock.options.use'],
                }}
              />
            }
          />
          {/*화면캡쳐 방지*/}
          <FormRow2
            provider={provider}
            name={'화면캡쳐 방지'}
            label={'화면캡쳐 방지'}
            element={
              <RadioGroupFormField
                optionsConfig={{
                  codeGroup: CODE_GROUP['mock.options.use'],
                }}
              />
            }
          />
          {/*학습전 보안 서약*/}
          <FormRow2
            provider={provider}
            name={'학습전 보안 서약'}
            label={'학습전 보안 서약'}
            element={
              <RadioGroupFormField
                optionsConfig={{
                  codeGroup: CODE_GROUP['mock.options.use'],
                }}
              />
            }
          />
        </ContentsRow>
        {/*학습제어*/}
        <FormSubTitle label={t('학습제어')} />
        {/* 1일 진도제한, 진도 초기화, 순차 학습  */}
        <ContentsRow>
          {/* 1일 진도제한 */}
          <FormRow2
            provider={provider}
            name={'1일 진도제한'}
            label={'1일 진도제한'}
            element={
              <RadioGroupFormField
                optionsConfig={{
                  codeGroup: CODE_GROUP['mock.options.use'],
                }}
              />
            }
          />
          {/* 진도 초기화 */}
          <FormRow2
            provider={provider}
            name={'진도 초기화'}
            label={'진도 초기화'}
            element={
              <RadioGroupFormField
                optionsConfig={{
                  codeGroup: CODE_GROUP['mock.options.use'],
                }}
              />
            }
          />
          {/* 순차 학습  */}
          <FormRow2
            provider={provider}
            name={'순차 학습'}
            label={'순차 학습'}
            element={
              <RadioGroupFormField
                optionsConfig={{
                  codeGroup: CODE_GROUP['mock.options.use'],
                }}
              />
            }
          />
        </ContentsRow>
        {/* 동영상 탐색바 제한, 동영상 배속 제한 */}
        <ContentsRow>
          {/* 동영상 탐색바 제한  */}
          <FormRow2
            provider={provider}
            name={'동영상 탐색바 제한'}
            label={'동영상 탐색바 제한'}
            element={
              <RadioGroupFormField
                optionsConfig={{
                  codeGroup: CODE_GROUP['mock.options.use'],
                }}
              />
            }
          />
          {/* 동영상 배속 제한 */}
          <FormRow2
            provider={provider}
            name={'동영상 배속 제한'}
            label={'동영상 배속 제한'}
            element={
              <RadioGroupFormField
                optionsConfig={{
                  codeGroup: CODE_GROUP['cms.video.PlayBackRate'],
                }}
              />
            }
          />
          {/* dummy */}
          <FormRow provider={provider} name={''} />
        </ContentsRow>
        {/*이수기준*/}
        <FormSubTitle label={t('이수기준')} />
        {/* 이수처리 설정, 수료증 제공 */}
        <ContentsRow>
          {/* 이수처리 설정  */}
          <FormRow2
            provider={provider}
            name={'이수처리 설정'}
            label={'이수처리 설정'}
            element={
              <RadioGroupFormField
                optionsConfig={{
                  codeGroup: CODE_GROUP['lms.course.PassMethodType'],
                }}
              />
            }
          />
          {/* 수료증 제공 */}
          <FormRow2
            provider={provider}
            name={'수료증 제공'}
            label={'수료증 제공'}
            element={
              <RadioGroupFormField
                optionsConfig={{
                  codeGroup: CODE_GROUP['mock.options.use'],
                }}
              />
            }
          />
          {/* dummy */}
          <FormRow provider={provider} name={''} />
        </ContentsRow>
        {/* 이수기준 설정 */}
        <ContentsRow>
          <FormRow provider={provider} name={'이수기준 설정'} element={<>EDIT GRID</>} />
        </ContentsRow>
        {/* 인정 학습시간, 학습 포인트 */}
        <ContentsRow>
          {/* 인정 학습시간  */}
          <FormRow2
            provider={provider}
            name={'인정 학습시간'}
            label={'인정 학습시간'}
            element={
              <RadioGroupFormField
                optionsConfig={{
                  codeGroup: CODE_GROUP['lms.course.RecognizedStudyMinType'],
                }}
              />
            }
          />
          {/* 학습 포인트 */}
          <FormRow2
            provider={provider}
            name={'학습 포인트'}
            label={'학습 포인트'}
            element={
              <RadioGroupFormField
                optionsConfig={{
                  codeGroup: CODE_GROUP['mock.options.use'],
                }}
              />
            }
          />
          {/* dummy */}
          <FormRow provider={provider} name={''} />
        </ContentsRow>
        {/*커뮤니티*/}
        <FormSubTitle label={t('커뮤니티')} />
        {/* 커뮤니티 및 공유 설정 */}
        <ContentsRow>
          <FormRow2
            provider={provider}
            name={'커뮤니티'}
            label={'커뮤니티'}
            element={
              <CheckboxGroupFormField
                optionsConfig={{
                  codeGroup: CODE_GROUP['lms.course.CommunityType'],
                }}
              />
            }
          />
          <FormRow2
            provider={provider}
            name={'과정공유'}
            label={'과정공유'}
            element={
              <CheckboxGroupFormField
                optionsConfig={{
                  codeGroup: CODE_GROUP['mock.options.use'],
                }}
              />
            }
          />
        </ContentsRow>
        {/*강사*/}
        <FormSubTitle label={t('강사')} />
        {/* 강사 */}
        <ContentsRow>
          {/* 강사  */}
          <FormRow2
            provider={provider}
            name={'강사'}
            label={'강사'}
            element={
              <RadioGroupFormField
                optionsConfig={{
                  codeGroup: CODE_GROUP['lms.course.InstructorAssignType'],
                }}
              />
            }
          />
        </ContentsRow>
        {/*교재*/}
        <FormSubTitle label={t('교재')} />
        {/*교재명, 교재비*/}
        <ContentsRow>
          {/*교재명*/}
          <FormRow2 provider={provider} name={'교재명'} element={<Input />} />
          {/*교재비*/}
          <FormRow2 provider={provider} name={'교재비'} element={<Input />} />
        </ContentsRow>
        {/*사전/연관학습*/}
        <FormSubTitle label={t('사전/연관학습')} />
        {/*사전 필수과정*/}
        <ContentsRow>
          <FormRow2
            provider={provider}
            name={'사전 필수과정'}
            label={'사전 필수과정'}
            element={
              <ChipListModalSelectorFormField
                modalConfig={{ content: <TeacherListModal channelId={getValues()?.channelId} /> }}
                chipList={{
                  labelField: 'name',
                  valueField: 'id',
                  wordwrap: true,
                }}
                actionNode={<Button variant="text" size="sm" label={t('추가')} />}
              />
            }
          />
        </ContentsRow>
        {/*연관 과정*/}
        <ContentsRow>
          <FormRow2
            provider={provider}
            name={'연관 과정'}
            label={'연관 과정'}
            element={
              <ChipListModalSelectorFormField
                modalConfig={{ content: <TeacherListModal channelId={getValues()?.channelId} /> }}
                chipList={{
                  labelField: 'name',
                  valueField: 'id',
                  wordwrap: true,
                }}
                actionNode={<Button variant="text" size="sm" label={t('추가')} />}
              />
            }
          />
        </ContentsRow>
        {/*행정항목*/}
        <FormSubTitle label={t('행정항목')} />
        {/*HMG 과정 데이터 표준 대분류, 중분류*/}
        <ContentsRow>
          {/* 대분류  */}
          <FormRow2
            provider={provider}
            name={'대분류'}
            label={'대분류'}
            element={
              <DropdownFormField
                optionsConfig={{
                  codeGroup: CODE_GROUP['lms.course.CourseType'],
                }}
              />
            }
          />
          {/* 중분류 */}
          <FormRow2
            provider={provider}
            name={'중분류'}
            label={'중분류'}
            element={
              <DropdownFormField
                optionsConfig={{
                  codeGroup: CODE_GROUP['lms.course.CourseType'],
                }}
              />
            }
          />
        </ContentsRow>
        {/* 1인당 교육비, 고용보험 환급비용 */}
        <ContentsRow>
          {/* 1인당 교육비  */}
          <FormRow2
            provider={provider}
            name={'1인당 교육비'}
            label={'1인당 교육비'}
            element={
              <RadioGroupFormField
                optionsConfig={{
                  codeGroup: CODE_GROUP['mock.options.use'],
                }}
              />
            }
          />
          {/* 고용보험 환급비용 */}
          <FormRow2
            provider={provider}
            name={'고용보험 환급비용'}
            label={'고용보험 환급비용'}
            element={
              <RadioGroupFormField
                optionsConfig={{
                  codeGroup: CODE_GROUP['mock.options.use'],
                }}
              />
            }
          />
        </ContentsRow>
        {/* 숙박 여부, 추가예정 항목 */}
        <ContentsRow>
          {/* 숙박 여부  */}
          <FormRow2
            provider={provider}
            name={'숙박 여부'}
            label={'숙박 여부'}
            element={
              <RadioGroupFormField
                optionsConfig={{
                  codeGroup: CODE_GROUP['mock.options.use'],
                }}
              />
            }
          />
          {/* 추가예정 항목 */}
          <FormRow2
            provider={provider}
            name={'추가예정 항목'}
            label={'추가예정 항목'}
            element={<></>}
          />
        </ContentsRow>
        오토에버 위탁 전용
        <FormSubTitle label={t('오토에버 위탁 전용')} />
        {/* 사전 레벨테스트, 교재 배송지 수집 */}
        <ContentsRow>
          {/* 사전 레벨테스트  */}
          <FormRow2
            provider={provider}
            name={'사전 레벨테스트'}
            label={'사전 레벨테스트'}
            element={
              <RadioGroupFormField
                optionsConfig={{
                  codeGroup: CODE_GROUP['lms.course.CourseType'],
                }}
              />
            }
          />
          {/* 교재 배송지 수집 */}
          <FormRow2
            provider={provider}
            name={'교재 배송지 수집'}
            label={'교재 배송지 수집'}
            element={
              <RadioGroupFormField
                optionsConfig={{
                  codeGroup: CODE_GROUP['lms.course.CourseType'],
                }}
              />
            }
          />
        </ContentsRow>
        {/*튜터*/}
        <ContentsRow>
          {/* 튜터 */}
          <FormRow2
            provider={provider}
            name={'튜터'}
            label={'튜터'}
            element={
              <InputModalSelectorFormField
                modalConfig={{
                  content: <ChannelListModal />,
                }}
              />
            }
          />
          {/* 위탁 소유회사 */}
          <FormRow2
            provider={provider}
            name={'위탁 소유회사'}
            label={'위탁 소유회사'}
            element={
              <InputModalSelectorFormField
                modalConfig={{
                  content: <ChannelListModal />,
                }}
              />
            }
          />
        </ContentsRow>
      </div>
    );
  },
);

export const DetailInfo = DetailInfoComponent;

// const formConfig: DynamicFormConfig = {
//   builders: [
//     // 기기 제한
//     {
//       name: '기기 제한',
//       type: 'custom',
//       label: '기기 제한',
//       format: 'string',
//       value: '',
//     },
//     // 네트워크 제한
//     {
//       name: '네트워크 제한',
//       type: 'custom',
//       label: '네트워크 제한',
//       format: 'string',
//       value: '',
//     },
//     // 학습시간 제한
//     {
//       name: '학습시간 제한',
//       type: 'custom',
//       label: '학습시간 제한',
//       format: 'string',
//       value: '',
//     },
//     // 복습 제한
//     {
//       name: '복습 제한',
//       type: 'custom',
//       label: '복습 제한',
//       format: 'string',
//       value: '',
//     },
//     // 화면캡쳐 방지
//     {
//       name: '화면캡쳐 방지',
//       type: 'custom',
//       label: '화면캡쳐 방지',
//       format: 'string',
//       value: '',
//     },
//     // 학습전 보안 서약
//     {
//       name: '학습전 보안 서약',
//       type: 'custom',
//       label: '학습전 보안 서약',
//       format: 'string',
//       value: '',
//     },
//     // 1일 진도제한
//     {
//       name: '1일 진도제한',
//       type: 'custom',
//       label: '1일 진도제한',
//       format: 'string',
//       value: '',
//     },
//     // 진도 초기화
//     {
//       name: '진도 초기화',
//       type: 'custom',
//       label: '진도 초기화',
//       format: 'string',
//       value: '',
//     },
//     // 순차 학습
//     {
//       name: '순차 학습',
//       type: 'custom',
//       label: '순차 학습',
//       format: 'string',
//       value: '',
//     },
//     // 동영상 탐색바 제한
//     {
//       name: '동영상 탐색바 제한',
//       type: 'custom',
//       label: '동영상 탐색바 제한',
//       format: 'string',
//       value: '',
//     },
//     // 동영상 배속 제한
//     {
//       name: '동영상 배속 제한',
//       type: 'custom',
//       label: '동영상 배속 제한',
//       format: 'string',
//       value: '',
//     },
//     // 이수처리 설정
//     {
//       name: '이수처리 설정',
//       type: 'custom',
//       label: '이수처리 설정',
//       format: 'string',
//       value: '',
//     },
//     // 수료증 제공
//     {
//       name: '수료증 제공',
//       type: 'custom',
//       label: '수료증 제공',
//       format: 'string',
//       value: '',
//     },
//     // 이수기준 설정
//     {
//       name: '이수기준 설정',
//       type: 'custom',
//       label: '이수기준 설정',
//       format: 'object',
//       value: {},
//     },
//     // 인정 학습시간
//     {
//       name: '인정 학습시간',
//       type: 'custom',
//       label: '인정 학습시간',
//       format: 'string',
//       value: '',
//     },
//     // 학습 포인트
//     {
//       name: '학습 포인트',
//       type: 'custom',
//       label: '학습 포인트',
//       format: 'string',
//       value: '',
//     },
//     // 강사
//     {
//       name: '강사',
//       type: 'custom',
//       label: '강사',
//       format: 'string',
//       value: '',
//     },
//     // 교재명
//     {
//       name: '교재명',
//       type: 'custom',
//       label: '교재명',
//       format: 'string',
//       value: '',
//     },
//     // 교재비
//     {
//       name: '교재비',
//       type: 'custom',
//       label: '교재비',
//       format: 'string',
//       value: '',
//     },
//     // 사전 필수과정
//     {
//       name: '사전 필수과정',
//       type: 'custom',
//       label: '사전 필수과정',
//       format: 'array',
//       value: [],
//     },
//     // 연관 과정
//     {
//       name: '연관 과정',
//       type: 'custom',
//       label: '연관 과정',
//       format: 'array',
//       value: [],
//     },
//     // 대분류
//     {
//       name: '대분류',
//       type: 'custom',
//       label: '대분류',
//       format: 'string',
//       value: '',
//     },
//     // 중분류
//     {
//       name: '중분류',
//       type: 'custom',
//       label: '중분류',
//       format: 'string',
//       value: '',
//     },
//     // 1인당 교육비
//     {
//       name: '1인당 교육비',
//       type: 'custom',
//       label: '1인당 교육비',
//       format: 'string',
//       value: '',
//     },
//     // 고용보험 환급비용
//     {
//       name: '고용보험 환급비용',
//       type: 'custom',
//       label: '고용보험 환급비용',
//       format: 'string',
//       value: '',
//     },
//     // 숙박 여부
//     {
//       name: '숙박 여부',
//       type: 'custom',
//       label: '숙박 여부',
//       format: 'string',
//       value: '',
//     },
//     // 추가예정 항목
//     {
//       name: '추가예정 항목',
//       type: 'custom',
//       label: '추가예정 항목',
//       format: 'string',
//       value: '',
//     },
//     // 사전 레벨테스트
//     {
//       name: '사전 레벨테스트',
//       type: 'custom',
//       label: '사전 레벨테스트',
//       format: 'string',
//       value: '',
//     },
//     // 교재 배송지 수집
//     {
//       name: '교재 배송지 수집',
//       type: 'custom',
//       label: '교재 배송지 수집',
//       format: 'string',
//       value: '',
//     },
//     // 튜터
//     {
//       name: '튜터',
//       type: 'custom',
//       label: '튜터',
//       format: 'string',
//       value: '',
//     },
//     // 튜터 ID
//     {
//       name: '튜터',
//       type: 'hidden',
//       value: '',
//     },
//     // 위탁 소유회사
//     {
//       name: '위탁 소유회사',
//       type: 'custom',
//       label: '위탁 소유회사',
//       format: 'string',
//       value: '',
//     },
//     // 위탁 소유회사 ID
//     {
//       name: '위탁 소유회사',
//       type: 'hidden',
//       value: '',
//     },
//   ],
//   // validator: {
//   //   '승인 결재 라인': {
//   //     format: 'string',
//   //     required: true,
//   //   },
//   //   정원: {
//   //     format: 'string',
//   //     required: true,
//   //   },
//   //   '수강신청 대기': {
//   //     format: 'string',
//   //     required: true,
//   //   },
//   //   '차수 중복수강': {
//   //     format: 'string',
//   //     required: true,
//   //   },
//   //   '사전 레벨테스트': {
//   //     format: 'string',
//   //     required: true,
//   //   },
//   //   '교재 배송지 수집': {
//   //     format: 'string',
//   //     required: true,
//   //   },
//   // },
// };
