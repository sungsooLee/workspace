import React from 'react';
import { t } from 'i18next';
import { createFileRoute } from '@tanstack/react-router';
import {
  Button,
  ChipListModalSelectorFormField,
  ContentsRow,
  DynamicFormField,
  Input,
  InputModalSelectorFormField,
  ListModalSelectorFormField,
} from '@learnway/ui';
import { PageContainer } from '../../../widgets/layout/ui/container/page-container';
import { ContentsButtons } from '../../../widgets/layout/ui/container/slot/contents-buttons';
import { MainContents } from '../../../widgets/layout/ui/container/slot/main-contents';
import { SubContents } from '../../../widgets/layout/ui/container/slot/sub-contents';
import { FormRow } from '../../../shared/ui/form';
import { DynamicFormConfig, useDynamicForm } from '@learnway/hooks';
import {
  ChannelListModal,
  LectureTypeSiteUrl,
  ManagerListModal,
  TeacherListModal,
} from '@features/learning/course';

export const Route = createFileRoute('/_unauth/operation_detail_test/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { provider, onSubmit, control, getValues } = useDynamicForm(formConfig);

  const handleOnSubmit = (data: any) => {
    console.log('data {} => ', data);
  };

  const handleValidate = (data: any) => {
    console.log('data {} => ', data);
  };

  return (
    <form onSubmit={onSubmit(handleOnSubmit)}>
      <PageContainer>
        <ContentsButtons>
          <Button type="submit" variant="point" size="sm">
            과정복사
          </Button>
          <Button type={'button'} variant="point" size="sm">
            임시저장
          </Button>
          <Button type={'button'} variant="point" size="sm">
            작성완료
          </Button>
          <Button type={'button'} variant="point" size="sm">
            미리보기
          </Button>
          <Button type={'button'} variant="primary" size="sm">
            게시하기
          </Button>
          <Button type={'button'} variant="point" size="sm" onClick={handleOnSubmit}>
            Form submit
          </Button>
          <Button type={'button'} variant="point" size="sm" onClick={handleValidate}>
            Form 유효성 체크
          </Button>
        </ContentsButtons>
        <MainContents>
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'channelName'}>
                <InputModalSelectorFormField
                  modalConfig={{
                    content: <ChannelListModal />,
                  }}
                />
              </DynamicFormField>
            </FormRow>
          </ContentsRow>
          {/* 강의유형 */}
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'강의유형'}>
                <LectureTypeSiteUrl />
              </DynamicFormField>
            </FormRow>
          </ContentsRow>
          {/* 과정명 */}
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'과정명'} />
            </FormRow>
          </ContentsRow>
          {/* 과정내용 */}
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'과정내용'} />
            </FormRow>
          </ContentsRow>
          {/* 대표이미지 */}
          {/* TODO: className 제거 */}
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'대표이미지'} />
            </FormRow>
          </ContentsRow>
          {/* 강의유형 */}
          {/*<ContentsRow>*/}
          {/*  <FormRow provider={provider}>*/}
          {/*    <DynamicFormField name={'강의유형'} />*/}
          {/*  </FormRow>*/}
          {/*</ContentsRow>*/}
          {/*/!* 태그 *!/*/}
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'태그'} />
            </FormRow>
          </ContentsRow>
          {/* 강사 */}
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'강사'}>
                <ChipListModalSelectorFormField
                  modalConfig={{ content: <TeacherListModal channelId={getValues()?.channelId} /> }}
                  chipList={{
                    labelField: 'name',
                    valueField: 'id',
                    wordwrap: true,
                  }}
                  actionNode={<Button variant="text" size="sm" label={t('추가')} />}
                />
              </DynamicFormField>
            </FormRow>
          </ContentsRow>
          {/* 난이도 */}
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'난이도'} />
            </FormRow>
          </ContentsRow>
          {/* 강의실설정 */}
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'강의실설정'} />
            </FormRow>
          </ContentsRow>
          {/* 운영자 & 연락처 */}
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'managerName'}>
                <InputModalSelectorFormField
                  modalConfig={{
                    content: <ManagerListModal />,
                  }}
                  transformModalData={(modalData: any) => ({
                    managerId: modalData?.id,
                    managerName: modalData?.name,
                  })}
                />
              </DynamicFormField>
              {/*<DynamicFormField name={'연락처'}>/!*<CourseDetailForm />*!/</DynamicFormField>*/}
            </FormRow>
          </ContentsRow>
          {/* 테넌트 */}
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'테넌트'} />
            </FormRow>
          </ContentsRow>
          {/* 공개범위 */}
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'공개범위'}>
                <ListModalSelectorFormField
                  modalConfig={{
                    content: <ManagerListModal />,
                  }}
                  transformModalData={(modalData: any) => ({
                    targetId: modalData?.id,
                    targetName: modalData?.name,
                  })}
                  button={{
                    label: t('공개범위 설정'),
                  }}
                  list={{
                    labelField: 'targetName',
                    valueField: 'targetId',
                  }}
                />
              </DynamicFormField>
            </FormRow>
          </ContentsRow>
        </MainContents>
        <SubContents>
          {/*<CourseDetailForm setForm={setForm2} />*/}
          <Input />
        </SubContents>
      </PageContainer>
    </form>
  );
}

/**
 * 필수값 : name, type
 */
const formConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'channelId',
      type: 'hidden',
      value: '',
    },
    {
      name: 'channelName',
      type: 'custom',
      label: '채널 - InputModalSelectorFormField',
      value: '',
    },
    {
      name: '강의유형',
      type: 'custom',
      label: t('강의유형 - 라디오버튼 + 체크박스2 + 인풋 + 라벨'),
      value: {},
      placeholder: '',
      description: '',
    },
    {
      name: '과정명',
      type: 'text',
      label: t('과정명'),
      value: '',
      placeholder: '',
      description: '',
      maxLength: 10,
    },
    {
      name: '과정내용',
      type: 'textarea',
      label: t('과정내용'),
      value: '',
      placeholder: '',
      description: '',
    },
    {
      name: '대표이미지',
      type: 'thumbnail-image-upload',
      label: t('대표이미지'),
      format: 'array',
      value: [
        { id: '1', path: 'https://lodash.com/assets/img/lodash.svg' },
        { id: '2', path: 'https://lodash.com/assets/img/lodash.svg' },
        { id: '3', path: 'https://lodash.com/assets/img/lodash.svg' },
        { id: '4', path: 'https://lodash.com/assets/img/lodash.svg' },
      ],
      placeholder: '',
      description: '',
    },
    {
      name: '태그',
      type: 'chip-list',
      label: t('태그 - 인풋 칩 리스트'),
      format: 'array',
      value: ['현대자동차 A', '현대자동차 B', '현대자동차 C'],
      // placeholder: '',
      description: '',
      chipListConfig: {
        showInput: true,
      },
    },
    {
      name: '강사',
      type: 'custom',
      label: t('강사 - ChipListModalSelectorFormField'),
      format: 'array',
      value: [],
      placeholder: '',
      description: '',
    },
    {
      name: '난이도',
      type: 'radio-group',
      label: t('난이도'),
      format: 'string',
      options: [
        {
          label: '없음',
          value: '',
        },
        {
          label: '초급',
          value: '1',
        },
        {
          label: '중급',
          value: '2',
        },
        {
          label: '고급',
          value: '3',
        },
      ],
      value: [],
      placeholder: '',
      description: '',
    },
    {
      name: '강의실설정',
      type: 'checkbox-group',
      label: t('강의실 설정'),
      format: 'array',
      options: Array(10)
        .fill(null)
        .map((d, i) => ({ value: `value${i}`, label: `label${i}`, disabled: i === 1 })),
      value: ['value1'],
      placeholder: '',
      description: '',
      showSelectAll: true,
      cols: 4,
    },
    {
      name: 'managerId',
      type: 'hidden',
      value: '',
    },
    {
      name: 'managerName',
      type: 'custom',
      label: t('운영자 - InputModalSelectorFormField'),
      format: 'string',
      value: '',
      placeholder: '',
      description: '',
    },
    {
      name: '연락처',
      type: 'custom',
      label: t('연락처 - 인풋 + label + 인풋'),
      value: '',
      placeholder: '',
      description: '',
    },
    {
      name: '테넌트',
      type: 'chip-list',
      label: t('테넌트 - 우측 액션버튼 + chip list'),
      format: 'array',
      value: [{ label: 'AA', value: 'value1' }],
      placeholder: '',
      description: '',
      chipListConfig: {},
    },
    {
      name: '공개범위',
      type: 'custom',
      label: t('공개범위 - ListModalSelectorFormField'),
      format: 'array',
      value: [{ targetId: 'target1', targetName: 'targetname1' }],
      placeholder: '',
      description: '',
    },
  ],
};
