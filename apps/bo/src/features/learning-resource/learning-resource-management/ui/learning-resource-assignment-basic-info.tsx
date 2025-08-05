import { forwardRef, useImperativeHandle } from 'react';
import { useTranslation } from 'react-i18next';
import { UseDynamicFormResult } from '@learnway/hooks';
import { SplitPanel } from '@learnway/ui/elements';
import { FormSubTitle } from '@learnway/ui/base-form';
import { AssignmentBasicInfoFormData, AssignmentTabRef } from '../service/assignment/type';
import { LearningResourceBaseForm } from './learning-resource-base-form';

import styles from '@learnway/styles/bo/pages/_layout/learning/assignment-detail.module.css';
import movieInfoStyles from '@learnway/styles/bo/assets/styles/modules/movie-info.module.css';
import previewImg from '@assets/images/temp/img_exam_basic.jpg';
import { ContentBaseInfo, ContentInformation, Tag } from '@types';
import { useAssignmentBasicInfoForm } from '@features/learning-resource/learning-resource-management/service/assignment/use-assignment-basic-info-form';

type AssignmentBasicInfoProps = {
  basicInfoForm: UseDynamicFormResult;
  content?: Partial<ContentInformation>;
};

const LearningResourceAssignmentBasicInfoComponent = forwardRef<
  AssignmentTabRef,
  AssignmentBasicInfoProps
>(({ basicInfoForm, content = {} }, ref) => {
  const { t } = useTranslation();

  const { provider, onFormChange } = basicInfoForm;

  const { saveBasicInfo } = useAssignmentBasicInfoForm({ contentUuid: content?.contentUuid });

  useImperativeHandle(ref, () => ({
    save: (data: Record<string, any>) => {
      const payload = {
        ...data,
        contentUseStartDate: data.contentUseDate?.from,
        contentUseEndDate: data.contentUseDate?.to,
        // tags: data.tags.map((tag: Tag | string) => ({
        //   tagName: typeof tag === 'string' ? tag : tag.tagName,
        // })),
      } as AssignmentBasicInfoFormData;

      if (content?.contentUuid) {
        Object.assign(payload, {
          contentUuid: content.contentUuid,
        });
      }

      delete payload.contentUseDate;

      saveBasicInfo(payload as ContentBaseInfo);
    },
  }));

  return (
    <SplitPanel size={['auto', 416]} divider>
      <div key="base1">
        <div className={styles.wrap}>
          <FormSubTitle label={t('기본 정보')} />
          {/* 교육자원 공통 정보 입력 영역 */}
          <LearningResourceBaseForm provider={provider} />
        </div>
      </div>

      <div key="base2">
        <FormSubTitle noLine label={t('cms.content.ContentType.EXAM')} />
        <div className={movieInfoStyles.media}>
          <img src={previewImg} width="100%" alt="" />
        </div>
      </div>
    </SplitPanel>
  );
});

LearningResourceAssignmentBasicInfoComponent.displayName = 'LearningResourceAssignmentBasicInfo';

export const LearningResourceAssignmentBasicInfo = LearningResourceAssignmentBasicInfoComponent;
