import React from 'react';
import { t } from 'i18next';
import { createFileRoute } from '@tanstack/react-router';
import {
  Button,
  ChipListModalSelectorFormField,
  ContentsRow,
  EditDropdownCell,
  EditInputCell,
  EditSwitchCell,
  GridFormField,
  Input,
  InputModalSelectorFormField,
  ListModalSelectorFormField,
  useModal,
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
import { CellContext } from '@tanstack/react-table';

export const Route = createFileRoute('/_unauth/operation_detail_test/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { open: openModal } = useModal();
  const { provider, onSubmit, control, getValues } = useDynamicForm(formConfig);

  const handleOnSubmit = (data: any) => {
    console.log('data {} => ', data);
  };

  const handleValidate = () => {
    console.log('getValues => ', getValues());
  };

  return (
    <form onSubmit={onSubmit(handleOnSubmit)}>
      <PageContainer>
        <ContentsButtons>
          <Button type="submit" variant="point" size="sm" label={'과정복사'} />
          <Button type={'button'} variant="point" size="sm" label={'임시저장'} />
          <Button type={'button'} variant="point" size="sm" label={'작성완료'} />
          <Button type={'button'} variant="point" size="sm" label={'미리보기'} />
          <Button type={'button'} variant="primary" size="sm" label={'게시하기'} />
          <Button
            type={'submit'}
            variant="point"
            size="sm"
            label={'Form submit'}
            onClick={handleOnSubmit}
          />
          <Button
            type={'button'}
            variant="point"
            size="sm"
            label={'Form 유효성 체크'}
            onClick={handleValidate}
          />
        </ContentsButtons>
        <MainContents>
          <ContentsRow>
            <FormRow
              provider={provider}
              name={'channelName'}
              element={
                <InputModalSelectorFormField
                  modalConfig={{
                    content: <ChannelListModal />,
                  }}
                />
              }
            />
          </ContentsRow>
          {/* 강의유형 */}
          <ContentsRow>
            <FormRow provider={provider} name={'강의유형'} element={<LectureTypeSiteUrl />} />
          </ContentsRow>
          {/* 그리드 */}
          <ContentsRow>
            <FormRow
              provider={provider}
              name={'그리드'}
              element={
                <GridFormField
                  gridProps={{
                    multiple: true,
                    showAdd: true,
                    showRemove: true,
                    showTotalCount: false,
                    columns: [
                      {
                        header: 'text',
                        accessorKey: 'text',
                        size: 150,
                        cell: (info: CellContext<any, string>) => (
                          <EditInputCell info={info} input={{ type: 'text' }} />
                        ),
                      },
                      {
                        header: 'switch',
                        accessorKey: 'switch',
                        size: 150,
                        cell: (info: CellContext<any, boolean>) => <EditSwitchCell info={info} />,
                      },
                      {
                        header: 'dropdown',
                        accessorKey: 'dropdown',
                        size: 100,
                        cell: (info: CellContext<any, string>) => (
                          <EditDropdownCell
                            info={info}
                            dropdown={{
                              options: [
                                { value: `value1`, label: `label1` },
                                { value: `value2`, label: `label2` },
                              ],
                            }}
                          />
                        ),
                      },
                    ],
                  }}
                />
              }
            />
          </ContentsRow>
          {/* 과정명 */}
          <ContentsRow>
            <FormRow provider={provider} name={'과정명'} />
          </ContentsRow>
          {/* 과정내용 */}
          <ContentsRow>
            <FormRow provider={provider} name={'과정내용'} />
          </ContentsRow>
          {/* 대표이미지 */}
          {/* TODO: className 제거 */}
          <ContentsRow>
            <FormRow provider={provider} name={'대표이미지'} />
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider} name={'태그'} />
          </ContentsRow>
          {/* 강사 */}
          <ContentsRow>
            <FormRow
              provider={provider}
              name={'강사'}
              element={
                <ChipListModalSelectorFormField
                  modalConfig={{ content: <TeacherListModal channelId={getValues()?.channelId} /> }}
                  chipList={{
                    labelField: 'name',
                    valueField: 'id',
                    wordwrap: true,
                  }}
                />
              }
            />
          </ContentsRow>
          {/* 강사2 */}
          <ContentsRow>
            <FormRow
              provider={provider}
              name={'강사2'}
              element={
                <ChipListModalSelectorFormField
                  showAddButton
                  modalConfig={{ content: <TeacherListModal channelId={getValues()?.channelId} /> }}
                  chipList={{
                    labelField: 'name',
                    valueField: 'id',
                    wordwrap: true,
                  }}
                  actionNode={
                    <Button
                      variant="text"
                      size="sm"
                      label={t('대상자')}
                      onClick={() => openModal({ content: <ManagerListModal /> })}
                    />
                  }
                />
              }
            />
          </ContentsRow>
          {/* 난이도 */}
          <ContentsRow>
            <FormRow provider={provider} name={'난이도'} />
          </ContentsRow>
          {/* 강의실설정 */}
          <ContentsRow>
            <FormRow provider={provider} name={'강의실설정'} />
          </ContentsRow>
          {/* 운영자 & 연락처 */}
          <ContentsRow>
            <FormRow
              provider={provider}
              name={'managerName'}
              element={
                <InputModalSelectorFormField
                  modalConfig={{
                    content: <ManagerListModal />,
                  }}
                  transformModalData={(modalData: any) => ({
                    managerId: modalData?.id,
                    managerName: modalData?.name,
                  })}
                />
              }
            />
          </ContentsRow>
          {/* 테넌트 */}
          <ContentsRow>
            <FormRow provider={provider} name={'테넌트'} />
          </ContentsRow>
          {/* 공개범위 */}
          <ContentsRow>
            <FormRow
              provider={provider}
              name={'공개범위'}
              element={
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
              }
            />
          </ContentsRow>
          {/* 썸네일 리스트 */}
          <ContentsRow>
            <FormRow provider={provider} name={'썸네일'} />
          </ContentsRow>
        </MainContents>
        <SubContents>
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
      name: '그리드',
      type: 'custom',
      label: t('그리드'),
      value: [
        { text: 'text', dropdown: 'value1', id: '1' },
        { text: 'text2', dropdown: 'value1', id: '2' },
      ],
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
        emptyMessage: 'XCXC',
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
      name: '강사2',
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
    {
      name: '썸네일',
      type: 'thumbnail-list',
      label: t('ThumbnailListFormField'),
      format: 'array',
      value: [
        'https://lodash.com/assets/img/lodash.svg',
        'https://lodash.com/assets/img/lodash.svg',
      ],
    },
  ],
};
