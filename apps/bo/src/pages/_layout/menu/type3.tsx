import { useFieldArray } from 'react-hook-form';
import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@learnway/ui';
import { ContentsButtons } from '../../../widgets/layout/ui/container/slot/contents-buttons';
import { MainContents } from '../../../widgets/layout/ui/container/slot/main-contents';
import { SubContents } from '../../../widgets/layout/ui/container/slot/sub-contents';
import { ContentsRow } from '../../../widgets/layout/ui/container/parts/contents-row';
import { PageContainer } from '../../../widgets/layout/ui/container/page-container';
import { MovieInfo } from '../../../widgets/contents/movie-info';
import { useRef } from 'react';
import { DynamicFormConfig, useDynamicForm } from '@learnway/hooks';
import { FormRow } from '../../../shared/ui/form';
import { CustomFormField } from '../../../shared/ui/form/custom-form-field';

export const Route = createFileRoute('/_layout/menu/type3')({
  component: RouteComponent,
});

const formConfigA: DynamicFormConfig = {
  builders: [
    {
      name: 'channel',
      label: '폼A 채널',
      type: 'text',
      value: '',
    },
  ],
  validator: {
    /*channel: z.string().required(),*/
  },
};
const formConfigB: DynamicFormConfig = {
  builders: [
    {
      name: 'channel',
      label: '폼B 채널',
      type: 'text',
      value: '',
    },
  ],
  validator: {
    /*channel: z.string().required(),*/
  },
};

function RouteComponent() {
  /* react hook form custom */
  const { provider, onSubmit, control, onFormChange, setFormError, clearFormError } =
    useDynamicForm(detailConfig);
  const { fields, remove, append } = useFieldArray({
    control,
    name: 'userInfos',
  });

  const formARef = useRef<HTMLFormElement>(null);
  const formBRef = useRef<HTMLFormElement>(null);
  const {
    provider: formAProvider,
    onSubmit: formAOnSubmit,
    onFormChange: formAOnFormChange,
  } = useDynamicForm(formConfigA);
  const {
    provider: formBProvider,
    onSubmit: formBOnSubmit,
    onFormChange: formBOnFormChange,
  } = useDynamicForm(formConfigB);

  /**
   *
   * @param data
   */
  const handleOnSubmit = (data: any) => {
    console.log('data {} => ', data);
  };

  const handleOnReset = () => {
    onFormChange();
  };
  const handleOnChange = () => {
    onFormChange({ contentName: '1234' });
  };

  const triggerFormReset = (formName: 'A' | 'B') => {
    if (formName === 'A') {
      formAOnFormChange();
    } else {
      formBOnFormChange();
    }
  };

  const triggerFormSubmit = (formName: 'A' | 'B') => {
    if (formName === 'A') {
      if (formARef?.current) {
        formARef?.current.requestSubmit();
      }
    } else {
      if (formBRef?.current) {
        formBRef.current.requestSubmit();
      }
    }
  };

  const handleMultiFormOnSubmit = (data: any) => {
    console.log(data);
  };

  const handleSetError = () => {
    console.log('set error');
    setFormError('channel2', 'custom message');
  };

  const handleClearError = () => {
    console.log('clear error');
    clearFormError('channel2');
  };

  return (
    <div>
      <form onSubmit={onSubmit(handleOnSubmit)}>
        <PageContainer>
          <ContentsButtons>
            <Button type="submit" variant="point" size="sm">
              저장
            </Button>
            <Button type={'button'} variant="point" size="sm" onClick={handleOnChange}>
              공유이력 보기
            </Button>
            <Button type={'button'} variant="point" size="sm" onClick={handleOnReset}>
              초기화
            </Button>
            <Button type={'button'} variant="point" size="sm" onClick={handleSetError}>
              강제 에러 세팅
            </Button>
            <Button type={'button'} variant="point" size="sm" onClick={handleClearError}>
              강제 에러 해제
            </Button>
            <Button type={'button'} variant="primary" size="sm">
              목록
            </Button>
          </ContentsButtons>
          <MainContents>
            <ContentsRow>
              <FormRow provider={provider} name={'channel'} />
              <FormRow provider={provider} name={'channel2'} />
            </ContentsRow>

            <ContentsRow>
              <FormRow provider={provider} name={'custom'} element={<CustomFormField />} />
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

/**
 * 필수값 : name, type
 */
const detailConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'channel2',
      type: 'text',
      label: '텍스트 2',
      value: '',
    },
    {
      name: 'channel',
      type: 'text',
      label: '텍스트 1',
      value: '',
      placeholder: '최근 콘테츠 등록한 채널명 또는 최근 생성된 채널명',
      description: '기본 메세지',
    },
    {
      name: 'custom',
      type: 'custom',
      label: '커스텀',
      value: '',
    },
  ],
  validator: {
    custom: true,
  },
};
