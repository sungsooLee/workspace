import { DynamicFormProvider } from '@learnway/hooks';
import { FormRow2 } from '@learnway/ui/base-form';
import { ContentsRow } from '@learnway/ui/contents-row';
import { t } from 'i18next';
import { CheckBoxFormField } from './checkbox-form-field';
import { FormGroup } from './form-group';

type ContentRequiredCheckProps = {
  provider: DynamicFormProvider;
  title?: string;
  required?: boolean;
};

const MediaContentRequiredCheckFormFieldComponent = ({
  provider,
  title = '최종 확인',
  required = true,
}: ContentRequiredCheckProps) => {
  return (
    <FormGroup title={t(title)} required={required}>
      {/* 검수 확인 */}
      <ContentsRow>
        <FormRow2
          provider={provider}
          name="isInspected"
          label={t('검수 확인')}
          format="boolean"
          value={false}
          validation={{
            required: true,
            conditions: [
              {
                fn: (values: Record<string, any>) => !values.isInspected,
                message: t("'검수 확인' 체크하세요."),
              },
            ],
          }}
          element={<CheckBoxFormField checkConfig={{ reverse: true }} />}
          guideText={t('등록하고자 한 교육자원이며, 정상적으로 보여짐이 확인되었습니다.')}
        />
      </ContentsRow>
      {/* 저작권 확인 */}
      <ContentsRow>
        <FormRow2
          provider={provider}
          name="isCopyrighted"
          label={t('저작권 확인')}
          format="boolean"
          value={false}
          validation={{
            required: true,
            conditions: [
              {
                fn: (values: Record<string, any>) => !values.isCopyrighted,
                message: t("'저작권 확인' 체크하세요."),
              },
            ],
          }}
          element={<CheckBoxFormField checkConfig={{ reverse: true }} />}
          guideText={t(
            '저작권법(제25조2항)에 따라 교육자원(동영상,이미지 등)은 해당 학습플랫폼에서만 이용가능하며, 이 외의 공간에서 저작물을 공유 또는 게시하는 행위는 저작권법 위반에 해당될 수 있음에  동의합니다.',
          )}
        />
      </ContentsRow>
    </FormGroup>
  );
};

MediaContentRequiredCheckFormFieldComponent.displayName = 'MediaContentRequiredCheckFormField';

export const MediaContentRequiredCheckFormField = MediaContentRequiredCheckFormFieldComponent;
