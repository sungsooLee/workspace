// IA105 / NLP_BO_CMS_1038	매핑과정보기(팝업)

import { learningResourceQueryOptions } from '@entities/learning-resource';
import { CODE_GROUP, getCodeLabel, SearchBoxConfig, useSearchBox } from '@learnway/hooks';
import {
  Button,
  Divider,
  GridBox,
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalTitle,
  useGridBox,
  useGridBoxConfig,
  useModal,
} from '@learnway/ui';
import {
  SearchBox,
  TenantByRoleDropdownFormField,
  TenantChannelDropdownFormField,
} from '@shared/ui';
import { useRouter } from '@tanstack/react-router';
import { ContentCourseMappingParams } from '@types';
import { t } from 'i18next';
import { omit } from 'lodash';
import { useEffect } from 'react';

interface Props {
  contentUuid: string;
  channelUuid: string;
  lastVisitedBoRoleId: number;
}

const ContentCourseMappingModalComponent = ({
  contentUuid,
  channelUuid,
  lastVisitedBoRoleId,
}: Props) => {
  const router = useRouter();
  const { closeModal, confirm } = useModal();

  const searchBoxConfig = (): SearchBoxConfig => ({
    builders: [
      [
        {
          name: 'tenantId',
          type: 'custom',
          label: t('테넌트'),
          value: '',
          format: 'object',
          element: <TenantByRoleDropdownFormField />,
          readOnly: true,
        },
        {
          name: 'channelUuid',
          type: 'custom',
          label: t('채널'),
          value: '',
          format: 'object',
          element: <TenantChannelDropdownFormField enableFilter />,
          readOnly: true,
        },
        {
          name: 'courseType',
          type: 'dropdown',
          label: t('유형'),
          value: '',
          variant: 'text',
          format: 'string',
          presetOptionLabel: t('LABEL.form.label.all', '전체'),
          optionsConfig: {
            codeGroup: CODE_GROUP['lms.course.CourseType'],
          },
        },
        {
          name: 'courseName',
          label: t('과정명'),
          type: 'text',
          value: '',
        },
      ],
    ],
    validator: {
      tenantId: true,
      channelUuid: true,
    },
  });

  const gridBoxConfig: useGridBoxConfig = {
    query: (params: ContentCourseMappingParams) =>
      learningResourceQueryOptions.getContentCourseMapping(contentUuid, {
        ...omit(params, 'tenantId', 'channelUuid'),
        lastVisitedBoRoleId,
      }),
    gridState: {
      page: 0,
      size: 10,
    },
    // query: (param: any) => {
    //   return {
    //     queryKey: ['get-content-course-mapping'],
    //     queryFn: () => {
    //       console.log('🚀 ~ ContentCourseMappingModalComponent ~ param:', param);
    //       return { data: contentsMock };
    //     },
    //   };
    // },
    columns: [
      {
        width: 104,
        name: 'courseType',
        label: t('유형'),
        render: (_: any) => getCodeLabel(CODE_GROUP['lms.course.CourseType'], _.getValue()),
      },
      { width: 571, name: 'courseName', label: t('과정명') },
      { width: 104, name: 'language', label: t('언어') },
      {
        width: 118,
        label: t('과정상세보기'),
        render: ({ row }: any) => (
          <Button
            className="link"
            label={t('광정상세보기')}
            onClick={async () => {
              const confirmed = await confirm({
                title: t('이동하시겠습니까?'),
                content: t('입력중인 항목이 초기화됩니다.'),
              });
              if (confirmed)
                router.navigate({
                  to: '/learning/course/detail',
                  state: { courseId: row.original.courseId },
                });
            }}
          />
        ),
      },
    ],
  };

  const { provider, getValues, onFormChange } = useSearchBox(searchBoxConfig());
  const { config, gridFetch } = useGridBox(gridBoxConfig, getValues);
  useEffect(() => {
    if (!channelUuid) return;
    onFormChange({ channelUuid });
  }, [channelUuid]);

  return (
    <ModalContainer>
      <ModalTitle>{t('매핑과정')}</ModalTitle>
      <ModalBody>
        <SearchBox provider={provider} onSearch={gridFetch} />
        <Divider />
        <GridBox config={config} showNumberingColumn />
      </ModalBody>
      <ModalFooter>
        <Button label={t('확인')} variant="primary" size="lg" onClick={() => closeModal()} />
      </ModalFooter>
    </ModalContainer>
  );
};

export const ContentCourseMappingModal = ContentCourseMappingModalComponent;

// const contentsMock: any = [
//   {
//     courseId: 5,
//     courseUuid: '5677fa3a-39fb-43c2-888d-4232e718d9f6',
//     courseName: 'string',
//     courseType: 'ELEARNING1',
//     courseContent: '예제',
//     channelId: 0,
//     channelUuid: '2b946c7f-abd1-4aef-a440-5d7670e4db75',
//     channelName: 'string',
//     openingYear: 0,
//     courseValidityStartDate: '2025-07-15T05:11:31.934Z',
//     courseValidityEndDate: '2025-07-15T05:11:31.934Z',
//   },
// ];
