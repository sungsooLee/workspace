import { createFileRoute, useRouter } from '@tanstack/react-router';
import { CODE_GROUP, useSearchBox } from '@learnway/hooks';
import { Button, Checkbox, Pagination, TableBox, useGridBox, useModal } from '@learnway/ui';
import { LearningResourceFileUploadModal, LearningTypeChoiceModal } from '@features/learning';
import { LEARNING_TYPE } from '@learnway/config';
import { PageContainer } from '@widgets/layout/ui/container/page-container';
import { ContentsButtons } from '@widgets/layout/ui/container/slot/contents-buttons';
import { MainContents } from '@widgets/layout/ui/container/slot/main-contents';
import { SearchBox } from '@shared/ui/search-box';
import { useState } from 'react';
import { t } from 'i18next';
import { ChannelChoiceModal } from '@features/shared';
import { cn } from '@learnway/shared';
import boxStyles from '@learnway/styles/bo/assets/styles/modules/wrap-box.module.css'; // 하단 layout style - line
import { IcoClock01, IcoDownload, IcoFile01 } from '@learnway/icons';
import { Table } from '@tanstack/react-table';

export const Route = createFileRoute('/_layout/learning/learning-resource/')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const { provider: searchProvider, getValues } = useSearchBox(searchConfig);
  const { config: gConfig, gridFetch, data } = useGridBox(gridConfig, getValues);
  const { open: openModal } = useModal();
  // 등록 팝업 호출 여부
  const [displayContent, setDisplayContent] = useState(true);
  const [tableInstance, setTableInstance] = useState<Table<any>>(); // Grid 로부터 받을 table 인스턴스를 저장할 상태

  /**
   * 학습 컨텐츠를 등록하기 위한 Dialog 호출
   */
  const handleRegister = async () => {
    setDisplayContent(false);
    let canceled = false;

    //router.navigate({ to: '/learning/resource/education/view' });
    const typeResult = (await openModal({
      content: <LearningTypeChoiceModal />,
      width: 'lg',
    })) as LEARNING_TYPE;

    switch (typeResult) {
      // 동영상
      case LEARNING_TYPE.VIDEO: {
        const channelInfo = await openModal({
          content: <ChannelChoiceModal />,
        });
        if (channelInfo) {
          const videoUploadResult = await openModal({
            content: (
              <LearningResourceFileUploadModal channel={channelInfo} type={LEARNING_TYPE.VIDEO} />
            ),
            width: 'lg',
          });
          if (videoUploadResult) {
            router.navigate({ to: '/learning_test/resource/view/video' });
            break;
          }
        }

        setTimeout(() => handleRegister(), 5);
        canceled = true;
        break;
      }
      // HTML 동영상
      case LEARNING_TYPE.HTML_VIDEO: {
        router.navigate({ to: '/learning/resource/html-video/view' });
        break;
      }
      // 이미지
      case LEARNING_TYPE.IMAGE: {
        router.navigate({ to: '/learning/resource/image/view' });
        break;
      }
      // 기타
      case LEARNING_TYPE.ETC: {
        router.navigate({ to: '/learning/resource/etc/view' });
        break;
      }
      // 외부링크
      case LEARNING_TYPE.EXTERNAL_LINK: {
        router.navigate({ to: '/learning/resource/external-link/view' });
        break;
      }
      // 외부위탁
      case LEARNING_TYPE.EXTERNAL_CONSIGNMENT: {
        router.navigate({ to: '/learning/resource/external_consignment/view' });
        break;
      }
      // 블로그
      case LEARNING_TYPE.BLOG: {
        router.navigate({ to: '/learning/resource/blog/view' });
        break;
      }
      // 이북
      case LEARNING_TYPE.E_BOOK: {
        router.navigate({ to: '/learning/resource/e-book/view' });
        break;
      }
      // 스콤
      case LEARNING_TYPE.SCORM: {
        router.navigate({ to: '/learning/resource/scorm/view' });
        break;
      }
      // 설문

      case LEARNING_TYPE.SURVEY: {
        router.navigate({ to: '/learning/resource/survey/view' });
        break;
      }
      // 설문
      case LEARNING_TYPE.TEST_PAGER: {
        router.navigate({ to: '/learning/resource/test-paper/view' });
        break;
      }
      // 설문
      case LEARNING_TYPE.ASSIGNMENT: {
        router.navigate({ to: '/learning/resource/assignment/view' });
        break;
      }
      default: {
        canceled = true;
      }
    }
    if (canceled) setDisplayContent(true);
  };

  const handleOnSearch = (data: Record<string, any>) => {
    console.log('search', data);
  };

  return (
    <PageContainer displayContent={displayContent}>
      <ContentsButtons>
        <Button type="button" variant="point" size="sm" onClick={handleRegister}>
          등록
        </Button>
      </ContentsButtons>
      <MainContents>
        <SearchBox provider={searchProvider} onSearch={handleOnSearch} />
        <div className={cn(boxStyles.start, boxStyles.inner)}>
          <div className="grid_wrap">
            <TableBox
              config={gConfig}
              data={[
                // mock -> api로 변경 필요
                {
                  contentType: 'VIDEO',
                  contentName: '학습자원명',
                  tenantName: '테넌트',
                  channelName: '채널',
                  coordinatorName: '담당자',
                  isCourseUsed: true,
                  isUseEnabled: true,
                  localization: 'ko',
                },
                {
                  contentType: 'VIDEO',
                  contentName: '학습자원명',
                  tenantName: '테넌트',
                  channelName: '채널',
                  coordinatorName: '담당자',
                  isCourseUsed: false,
                  isUseEnabled: true,
                  localization: 'ko',
                },
                {
                  contentType: 'IMAGE',
                  contentName: '학습자원명',
                  tenantName: '테넌트',
                  channelName: '채널',
                  coordinatorName: '담당자',
                  isCourseUsed: true,
                  isUseEnabled: false,
                  localization: 'ko',
                },
              ]}
              multiple
              customButtonNode={
                <>
                  <Checkbox size="sm" label={t('나의 학습자원')} />{' '}
                  {/* 필터기능인듯? 글씨 크기가 혼자 작게 나옴 */}
                  <Button
                    variant="outline"
                    size="sm"
                    label={t('프로그램/가이드 다운로드')}
                    icon={<IcoDownload width={16} height={16} stroke="#131C30" />}
                  />
                  {/* onClick GET /pms-module/admin/api/v1/file/s3/download - 가이드 파일 올라간 후 다운로드 (하드코딩?) */}
                  <Button variant="outline" size="sm" label={t('일괄설정')} />
                  <Button
                    variant="outline"
                    size="sm"
                    label={t('엑셀다운로드')}
                    icon={<IcoDownload width={16} height={16} stroke="#131C30" />}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    label={t('복사')}
                    icon={<IcoFile01 width={16} height={16} stroke="#131C30" />}
                  />
                  {/* 디자인과 다른 아이콘 - 변경 필요 */}
                </>
              }
              onTableInstanceChange={(table: Table<any>) => setTableInstance(table)}
            />
            <Pagination totalPages={1} pageNumber={0} />
          </div>
        </div>
      </MainContents>
    </PageContainer>
  );
}
const searchConfig: any = {
  builders: [
    [
      {
        name: 'tenant',
        type: 'dropdown',
        label: t('LABEL.content.learning-resource.tenantName'),
        value: '',
        optionsConfig: {
          options: [{ value: '', label: t('선택') }],
          codeGroup: CODE_GROUP['manual.tenant.tenantId'],
        },
      },
      {
        name: 'channel',
        type: 'dropdown',
        label: t('LABEL.content.learning-resource.channelName'),
        value: '',
        optionsConfig: {
          options: [
            { value: '', label: t('선택') },
            { value: 'channelA', label: t('채널A') },
            { value: 'channelB', label: t('채널B') },
            { value: 'channelC', label: t('채널C') },
            { value: 'channelD', label: t('채널D') },
            { value: 'channelE', label: t('채널E') },
            { value: 'channelF', label: t('채널F') },
          ],
        },
      },
      {
        name: 'contentType',
        type: 'dropdown',
        label: t('LABEL.content.learning-resource.contentType'),
        value: '',
        optionsConfig: {
          options: [{ value: '', label: t('전체') }],
          codeGroup: CODE_GROUP['cms.content.ContentType'],
        },
      },
      {
        name: 'contentName',
        type: 'text',
        label: t('학습자원명'),
        value: '',
      },
    ],
    [
      {
        name: 'isVendored',
        type: 'dropdown',
        label: t('외주여부'),
        value: '',
        optionsConfig: {
          options: [
            { value: '', label: t('전체') },
            { value: 'Y', label: 'Y' },
            { value: 'N', label: 'N' },
          ],
        },
      },
      {
        name: 'isUseEnabled',
        type: 'dropdown',
        label: t('사용가능'),
        value: '',
        options: [
          { value: '', label: t('전체') },
          { value: 'available', label: t('사용가능') },
          { value: 'expired', label: t('사용기한 만료') },
          { value: 'unavailable', label: t('사용불가') },
        ],
      },
      {
        name: 'isCourseUsed',
        type: 'dropdown',
        label: t('LABEL.content.learning-resource.isCourseUsed'),
        value: '',
        optionsConfig: {
          options: [
            { value: '', label: t('전체') },
            { value: 'Y', label: 'Y' },
            { value: 'N', label: 'N' },
          ],
        },
      },
      {
        name: 'coordinatorName',
        type: 'text',
        label: t('LABEL.content.learning-resource.coordinatorName'),
        value: '',
      },
    ],
  ],
  validator: {
    tenant: true,
    channel: true,
    config: MainContents,
  },
};

const gridConfig = {
  excel: {
    download: '/learning-resource/exportExcel',
    form: {
      xlsx: '',
      csv: '',
    },
  },
  query: () => {},
  columns: [
    {
      size: 64,
      name: 'no',
      label: 'NO.',
      type: 'numbering',
    },
    {
      size: 79,
      name: 'contentType',
      label: t('LABEL.content.learning-resource.contentType'),
      render: (_: any) => t(`cms.content.ContentType.${_.getValue()}`),
    },
    {
      size: 338,
      meta: { size: 'auto' },
      name: 'contentName',
      label: t('LABEL.content.learning-resource.contentName'),
    },
    {
      size: 127,
      name: 'tenantName',
      label: t('LABEL.content.learning-resource.tenantName'),
    },
    {
      size: 153,
      name: 'channelName',
      label: t('LABEL.content.learning-resource.channelName'),
    },
    {
      size: 104,
      name: 'coordinatorName',
      label: t('LABEL.content.learning-resource.coordinatorName'),
    },
    {
      size: 125,
      name: 'detailInfo',
      label: t('LABEL.content.learning-resource.detailInfo'),
      render: (_: any) => (
        <>
          <IcoClock01 width={16} height={16} stroke="#131C30" /> 02:00:00
          {/* 컨텐츠 타입 별로 다르게 나오는듯 - 비디오 러닝타임 */}
        </>
      ),
    },
    {
      size: 137,
      name: 'util',
      label: t('LABEL.content.learning-resource.util'),
      render: () => '미리보기',
    },
    {
      size: 95,
      name: 'isUseEnabled',
      label: t('LABEL.content.learning-resource.isUseEnabled'),
      render: (_: any) => (_.getValue() ? 'Y' : 'N'),
    },
    {
      size: 100,
      name: 'localization',
      label: t('LABEL.content.learning-resource.localization'),
      render: (_: any) => t(`CODE.LANGUAGE_CODE.${_.getValue()}`),
    },
    {
      size: 79,
      name: 'updatedInfo',
      label: t('LABEL.content.learning-resource.updatedInfo'),
      render: () => '보기',
    },
  ],
  data: [],
  pagination: {
    pageSize: 20,
    pageIndex: 0,
    totalRows: 0,
  },
};
