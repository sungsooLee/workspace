import { createFileRoute, useRouter } from '@tanstack/react-router';
import { CODE_GROUP, useSearchBox } from '@learnway/hooks';
import { Button, Checkbox, TableBox, useGridBox, useModal } from '@learnway/ui';
import { LearningResourceFileUploadModal, LearningTypeChoiceModal } from '@features/learning';
import { LEARNING_TYPE } from '@learnway/config';
import { PageContainer } from '@widgets/layout/ui/container/page-container';
import { ContentsButtons } from '@widgets/layout/ui/container/slot/contents-buttons';
import { MainContents } from '@widgets/layout/ui/container/slot/main-contents';
import { SearchBox } from '@shared/ui/search-box';
import { useState } from 'react';
import { t } from 'i18next';
import { ChannelChoiceModal } from '@features/shared';
import { translationQueryOptions } from '@entities/translation/service/translation.queries';
import { cn } from '@learnway/shared';
import boxStyles from '@learnway/styles/bo/assets/styles/modules/wrap-box.module.css'; // 하단 layout style - line
import { IcoDownload, IcoFile01 } from '@learnway/icons';
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
                { type: '동영상', learningResourceName: '학습자원명' },
                { type: '설문지', learningResourceName: '학습자원명' },
                { type: '동영상', learningResourceName: '학습자원명' },
                { type: '외부링크', learningResourceName: '학습자원명' },
              ]}
              multiple
              customButtonNode={
                <>
                  <Checkbox size="sm" label={t('나의 학습자원')} />
                  <Button
                    variant="outline"
                    size="sm"
                    label={t('프로그램/가이드 다운로드')}
                    icon={<IcoDownload width={16} height={16} stroke="#131C30" />}
                    // onClick GET /pms-module/admin/api/v1/file/s3/download - 가이드 파일 올라간 후 다운로드 (하드코딩?)
                  />
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
                </>
              }
              onTableInstanceChange={(table: Table<any>) => setTableInstance(table)}
            />
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
        label: t('LABEL.contents.learning.resource.tenantName'),
        value: '',
        optionsConfig: {
          options: [{ value: '', label: t('선택') }],
          codeGroup: CODE_GROUP['manual.tenant.tenantId'],
        },
      },
      {
        name: 'channel',
        type: 'dropdown',
        label: t('LABEL.contents.learning.resource.channelName'),
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
        label: t('LABEL.contents.learning.resource.contentType'),
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
        label: t('LABEL.contents.learning.resource.isCourseUsed'),
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
        label: t('LABEL.contents.learning.resource.coordinatorName'),
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
      name: 'no',
      label: 'NO.',
      type: 'numbering',
    },
    {
      name: 'contentType',
      label: t('LABEL.contents.learning.resource.contentType'),
    },
    {
      name: 'contentName',
      label: t('LABEL.contents.learning.resource.contentName'),
    },
    {
      name: 'tenantName',
      label: t('LABEL.contents.learning.resource.tenantName'),
    },
    {
      name: 'channelName',
      label: t('LABEL.contents.learning.resource.channelName'),
    },
    {
      name: 'coordinatorName',
      label: t('LABEL.contents.learning.resource.coordinatorName'),
    },
    {
      name: 'detailInfo',
      label: t('LABEL.contents.learning.resource.detailInfo'),
    },
    {
      nawme: 'util',
      label: t('LABEL.contents.learning.resource.util'),
    },
    {
      name: 'isCourceUsed',
      label: t('LABEL.contents.learning.resource.isCourseUsed'),
    },
    {
      name: 'courceCount',
      label: t('LABEL.contents.learning.resource.courseCount'),
    },
    {
      name: 'isUseEnabled',
      label: t('LABEL.contents.learning.resource.isUseEnabled'),
    },
    {
      name: 'localization',
      label: t('LABEL.contents.learning.resource.localization'),
    },
    {
      name: 'updatedInfo',
      label: t('LABEL.contents.learning.resource.updatedInfo'),
    },
  ],
  data: [],
  pagination: {
    pageSize: 20,
    pageIndex: 0,
    totalRows: 0,
  },
};
