import { useFieldArray } from 'react-hook-form';
import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@learnway/ui';
import { CODE_GROUP } from '@learnway/config';
import { z } from '@learnway/shared';
import { ContentsButtons } from '../../../widgets/layout/ui/container/slot/contents-buttons';
import { MainContents } from '../../../widgets/layout/ui/container/slot/main-contents';
import { SubContents } from '../../../widgets/layout/ui/container/slot/sub-contents';
import { ContentsRow } from '../../../widgets/layout/ui/container/parts/contents-row';
import { PageContainer } from '../../../widgets/layout/ui/container/page-container';
import { queryOptions as codeQueryOptions } from '../../../entities/api-mock/service/mock-code.queries';
import { MovieInfo } from '../../../widgets/contents/movie-info';
import { FC, useRef } from 'react';
import { useDynamicForm } from '@learnway/hooks';
import { DynamicFormConfig } from '@/libs/hooks/src/lib/form-builder/type';
import { FormRow } from '../../../shared/ui/form';
import { DynamicFormField } from '@learnway/ui';
import { DropdownFormField } from '../../../features/form/ui/dropdown-form-field';

export const Route = createFileRoute('/_layout/menu/type2')({
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
  validator: {},
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
  validator: {},
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
              <FormRow provider={provider}>
                <DynamicFormField name={'channel'} />
              </FormRow>
              <FormRow provider={provider}>
                <DynamicFormField name={'channel'} />
              </FormRow>
            </ContentsRow>
            <ContentsRow>
              <FormRow provider={provider}>
                <DynamicFormField name={'contentName'} disabled />
              </FormRow>
            </ContentsRow>
            <ContentsRow>
              <FormRow provider={provider}>
                <DynamicFormField name={'language'} />
              </FormRow>
              <FormRow provider={provider}>
                <DynamicFormField name={'language_detail'} />
              </FormRow>
            </ContentsRow>
            <ContentsRow>
              <FormRow provider={provider}>
                <DynamicFormField name={'language2'} />
              </FormRow>
              <FormRow provider={provider}>
                <DynamicFormField name={'language2_detail'} />
              </FormRow>
            </ContentsRow>

            <ContentsRow>
              <FormRow provider={provider}>
                <DynamicFormField name={'title'} />
              </FormRow>
            </ContentsRow>
            <ContentsRow>
              <FormRow provider={provider}>
                <DynamicFormField name={'subdivision'} />
              </FormRow>
            </ContentsRow>
            <ContentsRow>
              <FormRow provider={provider}>
                <DynamicFormField name={'check'} />
              </FormRow>
            </ContentsRow>
            <ContentsRow>
              <FormRow provider={provider}>
                <DynamicFormField name={'tenant'} />
              </FormRow>
            </ContentsRow>
            <ContentsRow>
              <FormRow provider={provider}>
                <DynamicFormField name={'eLeaning'}>삭제</DynamicFormField>
              </FormRow>
            </ContentsRow>
            <ContentsRow>
              <FormRow provider={provider}>
                <DynamicFormField name={'channel2'} />
              </FormRow>
            </ContentsRow>
            <ContentsRow>
              <FormRow provider={provider}>
                <DynamicFormField name={'lowerGubun'}>
                  <DropdownFormField />
                </DynamicFormField>
              </FormRow>
            </ContentsRow>
            <ContentsRow>
              <FormRow provider={provider} name={'userInfos'}>
                <div>
                  <div>
                    <Button
                      type={'button'}
                      variant="gray"
                      size="sm"
                      onClick={() => append({ 'user-age': '', 'user-name': '', 'user-hobby': '' })}
                    >
                      추가
                    </Button>
                  </div>
                  <div>
                    <table>
                      <thead>
                        <tr>
                          <th>이름</th>
                          <th>나이</th>
                          <th>취미</th>
                          <th>삭제</th>
                        </tr>
                      </thead>
                      <tbody>
                        {fields.map((_, index) => (
                          <tr key={index}>
                            <td>
                              <DynamicFormField name={`userInfos.${index}.user-name`} />
                            </td>
                            <td>
                              <DynamicFormField
                                provider={provider}
                                name={`userInfos.${index}.user-age`}
                              />
                            </td>
                            <td>
                              <DynamicFormField
                                provider={provider}
                                name={`userInfos.${index}.user-hobby`}
                              />
                            </td>
                            <td>
                              <Button
                                type={'button'}
                                variant="gray"
                                size="sm"
                                onClick={() => remove(index)}
                              >
                                삭제
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </FormRow>
            </ContentsRow>
            <ContentsRow>
              <TestComponent provider={provider} />
            </ContentsRow>
          </MainContents>
          <SubContents>
            <MovieInfo />
          </SubContents>
        </PageContainer>
      </form>
      <PageContainer>
        <MainContents>
          <div className={'mt-3'}>
            <h1 style={{ fontSize: 40, fontWeight: 800 }}>멀티 폼 예제</h1>
          </div>
          <div className={'mb-10 mt-10'}>
            <Button type="button" variant="point" size="sm" onClick={() => triggerFormReset('A')}>
              초기화 A
            </Button>
            <Button type="button" variant="point" size="sm" onClick={() => triggerFormReset('B')}>
              초기화 B
            </Button>
            <Button type="button" variant="point" size="sm" onClick={() => triggerFormSubmit('A')}>
              저장 A
            </Button>
            <Button type="button" variant="point" size="sm" onClick={() => triggerFormSubmit('B')}>
              저장 B
            </Button>
          </div>
          <div>
            <form ref={formARef} onSubmit={formAOnSubmit(handleMultiFormOnSubmit)}>
              <h1 style={{ fontSize: 20, fontWeight: 800 }}>FORM A</h1>
              <ContentsRow>
                <FormRow provider={formAProvider}>
                  <DynamicFormField name={'channel'} />
                </FormRow>
              </ContentsRow>
            </form>
            <form ref={formBRef} onSubmit={formBOnSubmit(handleMultiFormOnSubmit)}>
              <h1 style={{ fontSize: 20, fontWeight: 800 }}>FORM B</h1>
              <ContentsRow>
                <FormRow provider={formBProvider}>
                  <DynamicFormField name={'channel'} />
                </FormRow>
              </ContentsRow>
            </form>
          </div>
        </MainContents>
      </PageContainer>
    </div>
  );
}

/**
 * 필수값 : name, type
 */
const detailConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'channel',
      type: 'text-popup-button',
      label: '채널',
      value: '',
      placeholder: '최근 콘테츠 등록한 채널명 또는 최근 생성된 채널명',
      description: '기본 메세지',
    },
    {
      name: 'contentName',
      type: 'text',
      label: '학습자원명',
      maxLength: 10,
      value: '',
      placeholder: '업로드 파일명',
    },
    {
      name: 'category',
      type: 'text-popup-button',
      label: '카테고리',
      value: '',
      placeholder: '학습자원을 분류할 카테고리를 선택하세요.',
      button: {
        label: '선택',
        variant: 'gray',
        size: 'sm',
      },
    },
    {
      name: 'language',
      type: 'dropdown',
      label: '언어',
      value: '',
      options: [{ value: '', label: '언어전체' }],
      description: '총 학습 시간은 차수별 학습 기간 입니다.',
      optionsConfig: {
        type: 'self',
        codeGroup: CODE_GROUP.LANGUAGE_CODE,
      },
    },
    {
      name: 'language_detail',
      type: 'dropdown',
      label: '언어상세',
      value: '',
      description: '총 학습 시간은 차수별 학습 기간 입니다.',
      options: [{ value: '', label: '언어코드를 선택하세요.' }],
      optionsConfig: {
        type: 'target',
        target: 'language',
        options: [{ value: '', label: '언어 상세를 선택하세요.' }],
        codeGroup: CODE_GROUP.LANGUAGE_CODE,
      },
    },
    {
      name: 'language2',
      type: 'dropdown',
      label: '언어2',
      value: '',
      options: [{ value: '', label: '언어전체2' }],
      optionsConfig: {
        type: 'self',
        api: codeQueryOptions.getTestCodes,
        callback: (response: any) => {
          console.log('response', response);
          return response.data.map((res: any) => ({
            ...res,
            value: res.code,
            label: res.name,
          }));
        },
      },
    },
    {
      name: 'language2_detail',
      type: 'dropdown',
      label: '언어2_상세',
      value: '',
      options: [{ value: '', label: '언어2 코드를 선택하세요.' }],
      optionsConfig: {
        type: 'target',
        target: 'language2',
        api: codeQueryOptions.getTestCode,
        options: [{ value: '', label: '언어2 상세를 선택하세요.' }],
        callback: (response: any) => {
          return response.data.map((res: any) => ({
            ...res,
            value: res.code,
            label: res.name,
          }));
        },
      },
    },
    {
      name: 'title',
      type: 'text',
      label: '제목',
      value: '',
      description: '총 학습 시간은 차수별 학습 기간 입니다.',
    },
    {
      name: 'subdivision',
      type: 'radio-group',
      label: '하위 구분',
      value: '',
      options: [
        {
          value: '01',
          label: '사내',
        },
        {
          value: '02',
          label: '사외',
        },
      ],
    },
    {
      name: 'check',
      type: 'checkbox',
      label: '체크박스',
      value: true,
      checkConfig: {
        label: '테넌트A',
      },
    },
    {
      name: 'tenant',
      type: 'checkbox-group',
      label: '테넌트 선택',
      value: ['tenantA', 'tenantB', 'tenantC'],
      options: [
        {
          value: 'tenantA',
          label: '테넌트 A',
        },
        {
          value: 'tenantB',
          label: '테넌트 B',
        },
        {
          value: 'tenantC',
          label: '테넌트 C',
        },
      ],
      checkGroupConfig: {},
    },
    {
      name: 'lowerGubun',
      label: '하위구분',
      type: 'object',
      value: {
        gubun: '01',
        select: ['01', '02'],
        url: 'adsfasfsdaf',
      },
    },
    {
      name: 'userInfos',
      type: 'array',
      label: '사용자정보모음',
      fields: [
        {
          name: 'user-name',
          type: 'text',
        },
        {
          name: 'user-age',
          type: 'text',
        },
        {
          name: 'user-hobby',
          type: 'dropdown',
          options: [
            {
              value: '',
              label: '취미를 선택해주세요',
            },
            {
              value: 'soccer',
              label: '축구',
            },
            {
              value: 'basketball',
              label: '농구',
            },
          ],
        },
      ],
      value: [
        {
          'user-name': '',
          'user-age': '',
          'user-hobby': '',
        },
      ],
    },
    {
      name: 'eLeaning',
      type: 'text',
      label: '이러닝 카테고리',
      value: '',
    },
    {
      name: 'channel2',
      type: 'text',
      label: '채널',
      value: '',
      placeholder: '최근 콘테츠 등록한 채널명 또는 최근 생성된 채널명',
      description: '기본 메세지',
    },
    {
      name: 'contentName2',
      type: 'text',
      label: '학습자원명',
      value: '',
      placeholder: '업로드 파일명',
    },
    {
      name: 'a',
      type: 'text',
      value: '',
      placeholder: 'A 파일명',
    },
    {
      name: 'b',
      type: 'text',
      label: 'ABCD 모음',
      value: '',
      placeholder: 'B 파일명',
    },
    {
      name: 'c',
      type: 'text',
      value: '',
      placeholder: 'C 파일명',
    },
    {
      name: 'd',
      type: 'text',
      value: '',
      placeholder: 'D 파일명',
    },
  ],
  validator: {
    /*channel2: z.string().required(),
    b: z.string().required('B 를 입력해주세요'),
    d: z.string().required('A 를 입력해주세요'),*/
  },
};
const TestComponent: FC<any> = ({ provider }) => {
  return (
    <FormRow provider={provider}>
      <div>
        <div className={'a'}>
          <DynamicFormField name={'a'} />
        </div>
        <div className={'b'}>
          <DynamicFormField name={'b'} />
        </div>
        <div className={'c'}>
          <DynamicFormField name={'c'} />
        </div>
        <div className={'d'}>
          <DynamicFormField name={'d'} />
        </div>
      </div>
    </FormRow>
  );
};
