import { t } from 'i18next';
import { DynamicFormProvider } from '@learnway/hooks';
import { ContentsRow } from '@learnway/ui';
import { CheckBoxFormField, FormGroup, FormRow2 } from '@shared/ui';

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
                fn: (values: Record<string, any>) => !values.isContentSecured,
                message: t("'검수 확인' 체크하세요."),
              },
            ],
          }}
          element={<CheckBoxFormField checkConfig={{ reverse: true }} />}
          guideText={t('등록하고자 한 학습자원이며, 정상적으로 보여짐이 확인되었습니다.')}
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
                fn: (values: Record<string, any>) => !values.isContentSecured,
                message: t("'저작권 확인' 체크하세요."),
              },
            ],
          }}
          element={<CheckBoxFormField checkConfig={{ reverse: true }} />}
          guideText={t(
            '저작권법(제25조2항)에 따라 학습자원(동영상,이미지 등)은 해당 학습플랫폼에서만 이용가능하며, 이 외의 공간에서 저작물을 공유 또는 게시하는 행위는 저작권법 위반에 해당될 수 있음에  동의합니다.',
          )}
        />
      </ContentsRow>
      {/* 보안 확인 */}
      <ContentsRow>
        <FormRow2
          provider={provider}
          name="isContentSecured"
          label={t('보안 확인')}
          format="boolean"
          value={false}
          validation={{
            required: true,
            conditions: [
              {
                fn: (values: Record<string, any>) => !values.isContentSecured,
                message: t("'보안 확인' 체크하세요."),
              },
            ],
          }}
          element={<CheckBoxFormField checkConfig={{ reverse: true }} />}
          guideText={t(
            '캡쳐방지기능 사용 미 설정 시, 불법복제, 무단사용, 저작권 침해 위험에 노출되고, 이에 따른 피해를 입을 수 있음에 인지합니다.',
          )}
        />
      </ContentsRow>
    </FormGroup>
  );
};

MediaContentRequiredCheckFormFieldComponent.displayName = 'MediaContentRequiredCheckFormField';

export const MediaContentRequiredCheckFormField = MediaContentRequiredCheckFormFieldComponent;
