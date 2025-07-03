import { createFileRoute } from '@tanstack/react-router';
import {
  CODE_GROUP,
  DynamicFormConfig,
  SelectOption,
  useCodeStore,
  useDynamicForm,
} from '@learnway/hooks';
import { PageContainer } from '@widgets/layout/ui/container/page-container';
import { ContentsButtons } from '@widgets/layout/ui/container/slot/contents-buttons';
import { Button, CheckboxGroupFormField, RadioGroupFormField } from '@learnway/ui';
import { MainContents } from '@widgets/layout/ui/container/slot/main-contents';
import { ContentsRow } from '@widgets/layout/ui/container/parts/contents-row';
import { FormRow } from '@shared/ui';
import { CustomFormField } from '@shared/ui/form/custom-form-field';
import { SubContents } from '@widgets/layout/ui/container/slot/sub-contents';
import { MovieInfo } from '@widgets/contents/movie-info';
import { DropdownFormField } from '@features/form';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/_layout/menu/type2')({
  component: RouteComponent,
});
const defaultOptions = [{ value: '', label: '전체' }];
function RouteComponent() {
  const { provider, onSubmit } = useDynamicForm(formConfig);
  const { getCode } = useCodeStore();
  const [manualOptions, setManualOptions] = useState<SelectOption[]>([]);

  const handleOnSubmit = (data: Record<string, any>) => {
    console.log('data => ', data);
  };

  const initCodes = async () => {
    setManualOptions(await getCode(CODE_GROUP['manual.code']));
  };

  useEffect(() => {
    initCodes();
  }, []);
  return (
    <div>
      <form onSubmit={onSubmit(handleOnSubmit)}>
        <PageContainer>
          <ContentsButtons>
            <Button type="submit" variant="point" size="sm">
              저장
            </Button>
          </ContentsButtons>
          <MainContents>
            <ContentsRow>
              <FormRow provider={provider} name={'manual-code'} />
            </ContentsRow>
            <ContentsRow>
              <FormRow
                provider={provider}
                name={'manual-code2'}
                element={<DropdownFormField options={[...defaultOptions, ...manualOptions]} />}
              />
            </ContentsRow>
            <ContentsRow>
              <FormRow provider={provider} name={'manual-code3'} />
            </ContentsRow>
            <ContentsRow>
              <FormRow
                provider={provider}
                name={'manual-code4'}
                element={<CheckboxGroupFormField options={manualOptions} />}
              />
            </ContentsRow>
            <ContentsRow>
              <FormRow provider={provider} name={'manual-code5'} />
            </ContentsRow>
            <ContentsRow>
              <FormRow
                provider={provider}
                name={'manual-code6'}
                element={<RadioGroupFormField options={manualOptions} />}
              />
            </ContentsRow>
          </MainContents>
          <SubContents>
            <MovieInfo />
          </SubContents>
        </PageContainer>
      </form>
    </div>
  );
}

const formConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'manual-code',
      label: 'DROPDOWN - CONFIG 로 불러오는 케이스',
      type: 'dropdown',
      value: '',
      optionsConfig: {
        options: [{ value: '', label: '전체' }],
        codeGroup: CODE_GROUP['vps.video.FfmpegTaskType'],
      },
    },
    {
      name: 'manual-code2',
      label: 'DROPDOWN - 직접 세팅 케이스',
      type: 'dropdown',
      value: '',
      optionsConfig: {
        options: [{ value: '', label: '전체' }],
        codeGroup: CODE_GROUP['manual.code'],
      },
    },
    {
      name: 'manual-code3',
      label: 'CHECKBOX GROUP - CONFIG 세팅 케이스',
      type: 'checkbox-group',
      value: [],
      showSelectAll: true,
      optionsConfig: {
        codeGroup: CODE_GROUP['manual.code'],
      },
    },
    {
      name: 'manual-code4',
      label: 'CHECKBOX GROUP - 직접 세팅 케이스',
      type: 'checkbox-group',
      value: [],
      showSelectAll: true,
    },
    {
      name: 'manual-code5',
      label: 'RADIO GROUP - CONFIG 세팅 케이스',
      type: 'radio-group',
      value: '',
      showSelectAll: true,
      optionsConfig: {
        codeGroup: CODE_GROUP['pms.terms.TermsTypeCode'],
      },
    },
    {
      name: 'manual-code6',
      label: 'RADIO GROUP - 직접 세팅 케이스',
      type: 'radio-group',
      value: '',
      showSelectAll: true,
    },
  ],
};
