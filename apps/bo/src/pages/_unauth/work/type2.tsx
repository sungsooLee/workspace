import { useFieldArray } from 'react-hook-form'
import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@learnway/ui'
import { CODE_GROUP } from '@learnway/config'
import { z } from '@learnway/shared'
import useDynamicForm from '../../../shared/ui/dynamic-form-field/use-dynamic-fom'
import { ContentsButtons } from '../../../widgets/layout/ui/container/slot/contents-buttons'
import { MainContents } from '../../../widgets/layout/ui/container/slot/main-contents'
import { SubContents } from '../../../widgets/layout/ui/container/slot/sub-contents'
import { ContentsRow } from '../../../widgets/layout/ui/container/parts/contents-row'
import { PageContainer } from '../../../widgets/layout/ui/container/page-container'
import {
  DynamicFormConfig,
  DynamicFormField,
} from '../../../shared/ui/dynamic-form-field'
import { queryOptions as codeQueryOptions } from '../../../entities/api-mock/service/mock-code.queries'
import { MovieInfo } from '../../../widgets/contents/movie-info'
import { FormRow } from '../../../shared/ui/form-row'
import { FC } from 'react'
import { ELearningCategory } from '../../../shared/ui/form-row/dialogs/e-learning-category'
import { LowerGubun } from '../../../shared/ui/form-row/dialogs/lower-gubun'

export const Route = createFileRoute('/_unauth/work/type2')({
  component: RouteComponent,
})

function RouteComponent() {
  /* react hook form custom */
  const { provider, onSubmit, reset, control } = useDynamicForm(detailConfig)
  const { fields, remove, append } = useFieldArray({
    control,
    name: 'userInfos',
  })
  /**
   *
   * @param data
   */
  const handleOnSubmit = (data: any) => {
    console.log('data {} => ', data)
  }

  const handleOnReset = () => {
    reset()
  }
  const handleOnChange = () => {
    reset({ contentName: '1234' })
  }

  return (
    <form onSubmit={onSubmit(handleOnSubmit)}>
      <PageContainer>
        <ContentsButtons>
          <Button type="submit" variant="point" size="sm">
            저장
          </Button>
          <Button
            type={'button'}
            variant="point"
            size="sm"
            onClick={handleOnChange}
          >
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
              <DynamicFormField name={'eLeaning'}>
                <ELearningCategory />
              </DynamicFormField>
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
                <LowerGubun testName={'kim'} />
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
                    onClick={() =>
                      append({
                        'user-age': '',
                        'user-name': '',
                        'user-hobby': '',
                      })
                    }
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
                            <DynamicFormField
                              name={`userInfos.${index}.user-name`}
                            />
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
  )
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
          return response.data.map((res: any) => ({
            ...res,
            value: res.code,
            label: res.name,
          }))
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
          }))
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
      type: 'checkbox-group',
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
    channel2: z.string().required(),
    b: z.string().required('B 를 입력해주세요'),
    d: z.string().required('A 를 입력해주세요'),
    /*eLeaning: z.string().label('이러닝').required(),
    lowerGubun: z.object({
      // 'gubun' 필드는 문자열로, 필수이며 빈 값이 아닌 경우 검증
      gubun: z.string().required(),
      // 'select' 필드는 체크박스 그룹이므로 문자열 배열로 처리 (선택 사항이라면 optional)
      select: z.array(z.string()).optional(),
      url: z.string().required(),
    }),*/
  },
}
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
  )
}
