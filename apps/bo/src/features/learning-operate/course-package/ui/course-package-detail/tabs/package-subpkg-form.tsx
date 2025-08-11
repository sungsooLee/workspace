import { useCoursePackageDetailPackageInfo } from '@features/learning-operate/course-package/hooks/use-course-package-detail-package-info';
import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css'; // 화면 내 컨텐츠 레이아웃 css
import { FormRow2 } from '@learnway/ui/base-form';
import { ContentsRow } from '@learnway/ui/contents-row';
import { TextareaFormField } from '@learnway/ui/form-field';
import { useModal } from '@learnway/ui/modal';
import { InputFormField } from '@shared/ui/form';
import { useTranslation } from 'react-i18next';

const PackageSubPkgFormComponent = () => {
  const { t } = useTranslation();
  const { openModal } = useModal();

  const { provider, getValues, onFormChange } = useCoursePackageDetailPackageInfo();

  return (
    <div className={layoutStyles.inner_contents}>
      <ContentsRow>
        <FormRow2
          provider={provider}
          name={'location'}
          element={<InputFormField disabled={true} />}
        />
      </ContentsRow>
      <ContentsRow>
        <FormRow2
          provider={provider}
          label={t('서브 패키지명')}
          name={'subPkgName'}
          format={'string'}
          validation={{ required: true }}
          element={<InputFormField maxLength={40} />}
        />
      </ContentsRow>
      <ContentsRow>
        <FormRow2
          provider={provider}
          label={t('서브 패키지 설명')}
          name={'description'}
          element={<TextareaFormField resize={'none'} />}
        />
      </ContentsRow>
    </div>
  );
};

export const PackageSubPkgForm = PackageSubPkgFormComponent;
