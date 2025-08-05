import { forwardRef, useEffect, useImperativeHandle, useMemo } from 'react';
import { t } from 'i18next';
import { FormSubTitle } from '@learnway/ui/base-form';
import { SplitPanel } from '@learnway/ui/elements';
import { RadioGroupFormField, TextareaFormField } from '@learnway/ui/form-field';
import { ExamResultVisibleMoment, ExamTemplateType } from '@types';
import { CheckBoxFormField, FormRow2, SwitchFormField } from '@shared/ui';
import { ContentsRow } from '@learnway/ui/contents-row';
import { Input } from '@learnway/ui/input';
import { isEmptyData } from '@learnway/shared';

import { FormDisplay } from '@features/form';
import movieInfoStyles from '@learnway/styles/bo/assets/styles/modules/movie-info.module.css';
import previewImg from '@assets/images/temp/img_exam_basic.jpg';

import { convertDetailInfoToFormData } from '../service/test-paper/common';
import { ExamBasicInfoProps, TabFormRef } from '../service/test-paper/type';
import { LearningResourceBaseForm } from './learning-resource-base-form';

import styles from '@learnway/styles/bo/pages/_layout/learning/test-detail.module.css';

const TestPaperInfoComponent = forwardRef<TabFormRef, ExamBasicInfoProps>(
  ({ basicInfoForm, saveBasicInfo, contentUuid = '', data = {}, hasMapping = false }, ref) => {
    const { provider, onFormChange } = basicInfoForm;

    const examTemplateTypeOptions = useMemo(
      () => [
        { label: t('일반 시험지'), value: ExamTemplateType.EXAM },
        { label: t('OMR 시험지'), value: ExamTemplateType.OMR },
        { label: t('OX 퀴즈'), value: ExamTemplateType.QUIZ },
      ],
      [],
    );

    const resultVisibleMomentOptions = useMemo(
      () => [
        { label: t('시험 종료 후'), value: ExamResultVisibleMoment.ON_EXAM_END },
        { label: t('시험 제출 후'), value: ExamResultVisibleMoment.ON_SUBMIT },
      ],
      [],
    );

    useImperativeHandle(ref, () => ({
      save: (data: Record<string, any>) => {
        saveBasicInfo?.(data);
      },
    }));

    useEffect(() => {
      // 상세 설정
      if (contentUuid && !isEmptyData(data) && onFormChange) {
        convertDetailInfoToFormData(data, onFormChange);
      }
    }, [data]);

    return (
      <SplitPanel size={['auto', 416]} divider>
        <div key="base1">
          <div className={styles.wrap}>
            <FormSubTitle label={t('기본 정보')} />

            <ContentsRow>
              {/* 시험지 유형 */}
              <FormRow2
                provider={provider}
                name="examTemplateType"
                label={t('시험지 유형')}
                value={ExamTemplateType.EXAM}
                validation={{ required: true }}
                element={
                  <RadioGroupFormField options={examTemplateTypeOptions} disabled={hasMapping} />
                }
              />
            </ContentsRow>

            {/* 학습자원 공통 정보 입력 영역 */}
            <LearningResourceBaseForm provider={provider} contentNameMaxLength={10} />

            <FormSubTitle label={t('시험지 상세 설정')} lineType="dark" />
            <ContentsRow>
              {/* 시험문항 */}
              <FormRow2
                provider={provider}
                name="questionCount"
                label={t('시험문항')}
                format="number"
                validation={{
                  required: {
                    fn: (values: Record<string, any>) => {
                      return !values.questionCount || values.questionCount < 1;
                    },
                  },
                }}
                element={<Input type="number" suffixText={t('개')} min={0} disabled={hasMapping} />}
                placeholder="0"
              />
              {/* 페이지별 문항수 */}
              <FormRow2
                provider={provider}
                name="questionCountPerPage"
                label={t('페이지별 문항수')}
                format="number"
                validation={{ required: true }}
                element={<Input type="number" suffixText={t('개')} min={0} disabled={hasMapping} />}
                placeholder="0"
              />
              {/* 시험시간 */}
              <FormRow2
                provider={provider}
                name="examLimitTime"
                label={t('시험시간')}
                format="number"
                validation={{ required: true }}
                element={<Input type="number" suffixText={t('분')} min={0} disabled={hasMapping} />}
                placeholder="0"
              />
              {/* 시험 응시 가능 횟수 (0이면 재시험 불가) */}
              <FormRow2
                provider={provider}
                name="maxAttemptCount"
                label={t('시험응시 횟수')}
                format="number"
                validation={{ required: true }}
                element={<Input type="number" suffixText={t('회')} min={0} disabled={hasMapping} />}
                placeholder="0"
              />
            </ContentsRow>

            <ContentsRow type="horizontal" className="inactive">
              {/* 문항이동 제어 */}
              <FormRow2
                provider={provider}
                name="isMoveQuestion"
                label={t('문항이동 제어')}
                format="boolean"
                value={false}
                element={
                  <SwitchFormField
                    switchConfig={{
                      label: (value: boolean) => (value ? '제어' : '제어안함 '),
                    }}
                    disabled={hasMapping}
                  />
                }
                tooltip={t('시험 문항을 순차적으로 풀어야 한다면 문항이동 제어기능을 사용하세요.')}
              />
            </ContentsRow>

            <ContentsRow type="horizontal" className="inactive">
              {/* 시험 응시 후 결과 공개 여부 */}
              <FormRow2
                provider={provider}
                name="isShowResult"
                label={t('시험응시 후 결과 공개')}
                format="boolean"
                value={false}
                element={
                  <SwitchFormField
                    switchConfig={{
                      label: (value: boolean) => (value ? '공개' : '비공개 '),
                    }}
                    disabled={hasMapping}
                  />
                }
                tooltip={t(
                  '결과 공개는 시험 응시 후 총점, 시험문항, 문항별 채점(정답을 맞췄는지 여부), 문항별 정답, 정답의 해설을 학습자에게 공개할지, 공개한다면 언제 공개할지 설정합니다.',
                )}
              />
            </ContentsRow>
            {/* 결과 공개 범위 상세 설정 */}
            <FormDisplay provider={provider} dependencies={[{ name: 'isShowResult', value: true }]}>
              <ContentsRow className="pt-0">
                <FormRow2
                  provider={provider}
                  name="isShowTotalScore"
                  format="boolean"
                  value={false}
                  element={
                    <CheckBoxFormField checkConfig={{ label: t('총점') }} disabled={hasMapping} />
                  }
                />
                <FormRow2
                  provider={provider}
                  name="isShowQuestion"
                  format="boolean"
                  value={false}
                  element={
                    <CheckBoxFormField
                      checkConfig={{ label: t('시험 문항') }}
                      disabled={hasMapping}
                    />
                  }
                />
                <FormRow2
                  provider={provider}
                  name="isShowScore"
                  format="boolean"
                  value={false}
                  element={
                    <CheckBoxFormField
                      checkConfig={{ label: t('문항별 채점') }}
                      disabled={hasMapping}
                    />
                  }
                />
                <FormRow2
                  provider={provider}
                  name="isShowCorrectAnswer"
                  format="boolean"
                  value={false}
                  element={
                    <CheckBoxFormField
                      checkConfig={{ label: t('문항별 정답') }}
                      disabled={hasMapping}
                    />
                  }
                />
                <FormRow2
                  provider={provider}
                  name="isShowAnswerExplain"
                  format="boolean"
                  value={false}
                  element={
                    <CheckBoxFormField
                      checkConfig={{ label: t('정답의 해설') }}
                      disabled={hasMapping}
                    />
                  }
                />
              </ContentsRow>
              <ContentsRow>
                {/* 결과보기 가능 시점 - 시험 종료 후 / 시험 제출 후 */}
                <FormRow2
                  provider={provider}
                  name="resultVisibleTime"
                  label={t('결과보기 가능 시점')}
                  value={ExamResultVisibleMoment.ON_EXAM_END}
                  element={
                    <RadioGroupFormField
                      options={resultVisibleMomentOptions}
                      disabled={hasMapping}
                    />
                  }
                />
              </ContentsRow>
            </FormDisplay>

            <ContentsRow type="horizontal" className="inactive">
              {/* 재응시 시 이전 선택 오답 비활성화 */}
              <FormRow2
                provider={provider}
                name="isDisableWrongRetry"
                label={t('재응시 시 이전 선택 오답 비활성화')}
                format="boolean"
                value={false}
                element={
                  <SwitchFormField
                    switchConfig={{
                      label: (value: boolean) => (value ? t('LABEL.button.apply') : '미적용 '),
                    }}
                    disabled={hasMapping}
                  />
                }
                tooltip={t(
                  '비활성화 적용 시 이전 응시 때 선택한 오답 보기들은 재응시 시 선택을 할 수 없는 상태로 보여집니다.',
                )}
              />
            </ContentsRow>

            <ContentsRow type="horizontal" className="inactive">
              {/* 제한시간 초과 시 자동 제출 */}
              <FormRow2
                provider={provider}
                name="isAutoSubmit"
                label={t('시험제한시간 초과 시 자동제출')}
                format="boolean"
                value={true}
                element={
                  <SwitchFormField
                    switchConfig={{
                      label: (value: boolean) => (value ? '자동제출' : '직접제출 '),
                    }}
                    disabled={hasMapping}
                  />
                }
                tooltip={t(
                  '자동제출 설정 시 시험 제한시간이 지나면 시험지가 자동제출됩니다. 직접제출 설정 시 시험 제한시간이 지나더라도 ‘제출’버튼을 클릭해야 시험지가 제출됩니다.',
                )}
              />
            </ContentsRow>

            <ContentsRow type="horizontal" className="inactive">
              {/* 시험 종료 안내 여부 */}
              <FormRow2
                provider={provider}
                name="isExamEndNotice"
                label={t('시험 종료 안내')}
                format="boolean"
                value={false}
                element={
                  <SwitchFormField
                    switchConfig={{
                      label: (value: boolean) => (value ? '종료안내' : '안내안함 '),
                    }}
                    disabled={hasMapping}
                  />
                }
                tooltip={t('시험 응시 중 시험 종료 시간에 대한 안내를 받을 수 있습니다.')}
              />
            </ContentsRow>
            <FormDisplay
              provider={provider}
              dependencies={[{ name: 'isExamEndNotice', value: true }]}
            >
              <ContentsRow className="w-1/2 pt-0">
                <FormRow2
                  provider={provider}
                  name="examEndNoticeOffsetMinutes"
                  label={t('시험시간 종료')}
                  format="number"
                  element={<Input type="number" suffixText={t('분전')} disabled={hasMapping} />}
                  placeholder={t('LABEL.form.placeholder.input')}
                />
              </ContentsRow>
              <ContentsRow>
                <FormRow2
                  provider={provider}
                  name="examEndNoticeMessage"
                  label={t('종료메세지')}
                  element={<TextareaFormField maxLength={500} disabled={hasMapping} />}
                  placeholder={t('LABEL.form.placeholder.input')}
                />
              </ContentsRow>
            </FormDisplay>
          </div>
        </div>
        {/* 시험지 기본 이미지 영역 */}
        <div key="base2">
          <FormSubTitle noLine label={t('cms.content.ContentType.EXAM')} />
          <div className={movieInfoStyles.media}>
            <img src={previewImg} width="100%" alt="" />
          </div>
        </div>
      </SplitPanel>
    );
  },
);

TestPaperInfoComponent.displayName = 'LearningResourceTestPaperInfo';

export const LearningResourceTestPaperInfo = TestPaperInfoComponent;
