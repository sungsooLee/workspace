import { createFileRoute } from '@tanstack/react-router';
import { CODE_GROUP, DynamicFormConfig, useDynamicForm } from '@learnway/hooks';
import { PageContainer } from '@widgets/layout/ui/container/page-container';
import { ContentsButtons } from '@widgets/layout/ui/container/slot/contents-buttons';
import { Button } from '@learnway/ui';
import { MainContents } from '@widgets/layout/ui/container/slot/main-contents';
import { ContentsRow } from '@widgets/layout/ui/container/parts/contents-row';
import { FormRow } from '@shared/ui';
import { CustomFormField } from '@shared/ui/form/custom-form-field';
import { SubContents } from '@widgets/layout/ui/container/slot/sub-contents';
import { MovieInfo } from '@widgets/contents/movie-info';

export const Route = createFileRoute('/_layout/menu/type2')({
  component: RouteComponent,
});

function RouteComponent() {
  const { provider, onSubmit } = useDynamicForm(formConfig);

  const handleOnSubmit = (data: Record<string, any>) => {
    console.log('data => ', data);
  };
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
      label: 'manual.code',
      type: 'dropdown',
      value: '',
      options: [{ value: '', label: '전체' }],
      optionsConfig: {
        codeGroup: CODE_GROUP['manual.code'],
      },
    },
  ],
};
