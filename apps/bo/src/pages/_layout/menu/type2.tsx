import { useFieldArray } from 'react-hook-form';
import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import { t } from 'i18next';
import { Button } from '@learnway/ui';
import { CODE_GROUP } from '@learnway/config';

import useCustomForm from '../../../shared/ui/dynamic-form-field/use-dynamic-fom';
import { ContentsButtons } from '../../../widgets/layout/ui/container/slot/contents-buttons';
import { MainContents } from '../../../widgets/layout/ui/container/slot/main-contents';
import { SubContents } from '../../../widgets/layout/ui/container/slot/sub-contents';
import { ContentsRow } from '../../../widgets/layout/ui/container/parts/contents-row';
import { PageContainer } from '../../../widgets/layout/ui/container/page-container';
import DynamicFormField from '../../../shared/ui/dynamic-form-field';
import { queryOptions as codeQueryOptions } from '../../../entities/api-mock/service/mock-code.queries';

export const Route = createFileRoute('/_layout/menu/type2')({
  component: RouteComponent,
});

function RouteComponent() {
  const { provider, onSubmit, reset, control } = useCustomForm(detailConfig);
  const { fields, remove, append } = useFieldArray({
    control,
    name: 'userInfos',
  });
  const handleOnSubmit = (data: any) => {
    console.log('data {} => ', data);
  };

  const handleOnReset = () => {
    reset();
  };
  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('on form submit?');
    onSubmit(handleOnSubmit);
  };
  return (
    <form onSubmit={handleFormSubmit}>
      <PageContainer panel>
        <ContentsButtons>
          <Button type="submit" variant="point" size="sm">
            저장
          </Button>
          <Button type={'button'} variant="point" size="sm">
            공유이력 보기
          </Button>
          <Button type={'button'} variant="point" size="sm">
            삭제
          </Button>
          <Button type={'button'} variant="point" size="sm">
            수정
          </Button>
          <Button type={'button'} variant="primary" size="sm">
            목록
          </Button>
        </ContentsButtons>
        <h1>CODE</h1>
        <MainContents>
          <ContentsRow>
            <DynamicFormField provider={provider} name={'language'} />
            <DynamicFormField provider={provider} name={'language_detail'} />
          </ContentsRow>
        </MainContents>
        <SubContents></SubContents>
        <ContentsRow>
          <DynamicFormField provider={provider} name={'language'} />
          <DynamicFormField provider={provider} name={'language_detail'} />
        </ContentsRow>
        <h1>fetch</h1>
        <ContentsRow>
          <DynamicFormField provider={provider} name={'language2'} />
          <DynamicFormField provider={provider} name={'language2_detail'} />
        </ContentsRow>
        <ContentsRow>
          <DynamicFormField provider={provider} name={'title'} />
        </ContentsRow>
        <ContentsRow>
          <DynamicFormField provider={provider} name={'subdivision'} />
        </ContentsRow>
        <ContentsRow>
          <DynamicFormField provider={provider} name={'check'} />
        </ContentsRow>
        <ContentsRow>
          <DynamicFormField provider={provider} name={'tenant'} />
        </ContentsRow>
        <ContentsRow>
          <DynamicFormField provider={provider} name={'category'} />
        </ContentsRow>
        <ContentsRow>
          <DynamicFormField provider={provider} name={'thumbnails'} />
        </ContentsRow>
        <ContentsRow>
          <div>
            <div>
              <Button
                type={'button'}
                variant="gray"
                size="sm"
                onClick={() => append({ 'user-age': '', 'user-name': '', 'user-hobby': '' })}>
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
                    <tr>
                      <td>
                        <DynamicFormField
                          key={index}
                          provider={provider}
                          name={`userInfos.${index}.user-name`}
                        />
                      </td>
                      <td>
                        <DynamicFormField
                          key={index}
                          provider={provider}
                          name={`userInfos.${index}.user-age`}
                        />
                      </td>
                      <td>
                        <DynamicFormField
                          key={index}
                          provider={provider}
                          name={`userInfos.${index}.user-hobby`}
                        />
                      </td>
                      <td>
                        <Button
                          type={'button'}
                          variant="gray"
                          size="sm"
                          onClick={() => remove(index)}>
                          삭제
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </ContentsRow>
      </PageContainer>
    </form>
  );
}

const detailConfig = {
  builders: [
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
      options: [{ value: '', label: '언어2를 선택하세요.' }],
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
      checkLabel: '테넌트A',
      label: '체크박스',
      value: true,
    },
    {
      name: 'tenant',
      type: 'check-group',
      label: '테넌트 선택',
      value: ['tenantA'],
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
    },
    {
      name: 'category',
      type: 'category-selector',
      label: '카테고리 선택',
      value: '',
    },
    {
      name: 'thumbnails',
      type: 'contents-thumbnail',
      label: '썸네일',
      value: [],
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
  ],
  validator: {
    category: z.string().nonempty(t('유효성 테스트')),
    language_code: z.string().nonempty(t('유효성 테스트')),
    subdivision: z.string().nonempty(t('유효성 테스트')),
    check: z.boolean(),
    tenant: z.array(z.string()).nonempty(t('유효성 테스트')),
  },
};
