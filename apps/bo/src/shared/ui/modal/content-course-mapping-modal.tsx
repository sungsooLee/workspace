// IA105 / NLP_BO_CMS_1038	매핑과정보기(팝업)

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
import { t } from 'i18next';
import {
  SearchBox,
  TenantByRoleDropdownFormField,
  TenantChannelDropdownFormField,
} from '@shared/ui';
import { CODE_GROUP, getCodeLabel, SearchBoxConfig, useSearchBox } from '@learnway/hooks';
import { useEffect } from 'react';
import { useRouter } from '@tanstack/react-router';

interface Props {
  channelUuid: string;
}

const ContentCourseMappingModalComponent = ({ channelUuid }: Props) => {
  const router = useRouter();
  const { close, confirm } = useModal();

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
    query: (param: any) => {
      return {
        queryKey: ['get-content-course-mapping'],
        queryFn: () => {
          console.log('🚀 ~ ContentCourseMappingModalComponent ~ param:', param);
          return { data: returnExample.courses };
        },
      };
    },
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
                  to: '/learning/course/detail/view',
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
        <Button label={t('확인')} variant="primary" size="lg" onClick={() => close()} />
      </ModalFooter>
    </ModalContainer>
  );
};

export const ContentCourseMappingModal = ContentCourseMappingModalComponent;

const returnExample: returnSchema = {
  hasMapping: true,
  courses: [
    {
      courseId: 5,
      courseUuid: '5677fa3a-39fb-43c2-888d-4232e718d9f6',
      courseName: 'string',
      courseType: 'ELEARNING1',
      courseContent: '예제',
      channelId: 0,
      channelUuid: '2b946c7f-abd1-4aef-a440-5d7670e4db75',
      channelName: 'string',
      openingYear: 0,
      courseValidityStartDate: '2025-07-15T05:11:31.934Z',
      courseValidityEndDate: '2025-07-15T05:11:31.934Z',
    },
  ],
};

interface returnSchema {
  hasMapping: boolean;
  courses: {
    courseId: number; //	과정 ID integer($int64)
    courseUuid: string; //	과정 UUID string
    courseName: string; //	과정명 string
    courseType: string; //	과정 타입 string enum ELEARNING, ELEARNING1, ELEARNING2, CLASS, LIVE, EXAM, SURVEY
    courseContent: string; //	과정내용 string
    channelId: number; //	채널Id integer($int64)
    channelUuid: string; //	채널 UUID string
    channelName: string; //	채널명 string
    openingYear: number; //	개설년도 integer($int32)
    courseValidityStartDate: string; //	노출기간 시작일 string($date-time)
    courseValidityEndDate: string; //	노출기간 종료일 string($date-time)
  }[];
}
