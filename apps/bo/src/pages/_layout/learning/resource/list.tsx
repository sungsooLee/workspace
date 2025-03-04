import { createFileRoute, Link, useRouter } from '@tanstack/react-router';
import useSearchBox from '../../../../shared/ui/search-box/use-search-box';
import { useCallback, useEffect } from 'react';
import { PageContainer } from '../../../../widgets/layout/ui/container/page-container';
import { ContentsButtons } from '../../../../widgets/layout/ui/container/slot/contents-buttons';
import { Button, useModal } from '@learnway/ui';
import { MainContents } from '../../../../widgets/layout/ui/container/slot/main-contents';
import { SearchBox, SearchBoxConfig } from '../../../../shared/ui/search-box';
import { t } from 'i18next';
import { GridBox, useGridBox } from '../../../../shared/ui/grid-box';
import { translationQueryOptions } from '../../../../entities/translation/service/translation.queries';
import { leaningResourceQueryOptions } from '../../../../entities/leaning-resource';
import TestForm from '../../../../widgets/test/ui/test-form';
import { MappingCoursePopup } from '../../../../features/learning/ui/resource/mapping-course-popup';
import { SharedHistoryPopup } from '../../../../features/learning/ui/resource/shared-history-popup';
import { ProgramGuideDownloadPopup } from '../../../../features/learning/ui/resource/program-guide-download-popup';
import { RegistrantPopup } from '../../../../features/learning/ui/resource/registrant-popup';

export const Route = createFileRoute('/_layout/learning/resource/list')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const { config: sConfig, getData } = useSearchBox(searchConfig);
  const { open } = useModal();
  const { config: gConfig, gridFetch } = useGridBox(gridConfig, getData);

  /**
   * @param data
   */
  const handleOnSearch = useCallback((data: any) => {
    console.log(data);
  }, []);

  const handleClose = (data: any) => {
    console.log('data => ', data);
    if (data) {
      router.navigate({ to: `/learning/resource/education/register/video?type=${data}` });
    }
  };

  /**
   * 등록화면 이동
   */
  const handleNewTranslation = () => {
    //router.navigate({ to: '/learning/resource/education/view' });
    open({
      content: <EducationListPopup />,
      width: 'lg',
      onClose: handleClose,
    });
  };

  useEffect(() => {
    gridFetch({});
  }, []);

  return (
    <PageContainer>
      <ContentsButtons>
        <Button type="button" variant="point" size="sm" onClick={handleNewTranslation}>
          등록
        </Button>
      </ContentsButtons>
      <MainContents>
        <SearchBox config={sConfig} onSearch={handleOnSearch} />
        <GridBox config={gConfig} />

        <Button
          type="button"
          variant="point"
          size="sm"
          onClick={() =>
            open({ content: <MappingCoursePopup />, width: 'md', height: 'md', title: '맵핑과정' })
          }>
          매핑과정팝업
        </Button>

        <Button
          type="button"
          variant="point"
          size="sm"
          onClick={() =>
            open({ content: <SharedHistoryPopup />, width: 'sm', height: 'md', title: '공유이력' })
          }>
          공유이력팝업
        </Button>
        <Button
          type="button"
          variant="point"
          size="sm"
          onClick={() =>
            open({
              content: <ProgramGuideDownloadPopup />,
              width: 'sm',
              height: 'sm',
              title: '프로그램/가이드 다운로드',
            })
          }>
          프로그램가이드다운로드 팝업
        </Button>
        <Button
          type="button"
          variant="point"
          size="sm"
          onClick={() =>
            open({
              content: (
                <RegistrantPopup
                  name={'김현대'}
                  employeeNumber={'8883721'}
                  email={'hd@hd.com'}
                  contact={'+82 1011112222'}
                />
              ),
              width: 'sm',
              height: 'sm',
              title: '등록자',
            })
          }>
          등록자 팝업 (연락처있음)
        </Button>
        <Button
          type="button"
          variant="point"
          size="sm"
          onClick={() =>
            open({
              content: (
                <RegistrantPopup name={'김현대'} employeeNumber={'8883721'} email={'hd@hd.com'} />
              ),
              width: 'sm',
              height: 'sm',
              title: '등록자 정보',
            })
          }>
          등록자 팝업 (연락처없음)
        </Button>
      </MainContents>
    </PageContainer>
  );
}

const EducationListPopup = () => {
  const { close: closeModal } = useModal();

  return (
    <div className="w-full p-8">
      <h2 className="mb-6 text-center text-xl font-bold">등록할 학습자원의 유형을 선택하세요.</h2>

      <div className="grid grid-cols-4 gap-4">
        <div className="flex flex-col items-center rounded-lg border bg-blue-50 p-4">
          <button type={'button'} className={'h-full w-full'} onClick={() => closeModal('video')}>
            <i className="fas fa-video mb-2 text-2xl text-blue-400"></i>
            <p className="font-semibold">동영상(자체)</p>
            <p className="text-center text-sm text-gray-500">1개 동영상 업로드</p>
          </button>
        </div>

        <div className="flex flex-col items-center rounded-lg border bg-blue-50 p-4">
          <button
            type={'button'}
            className={'h-full w-full'}
            onClick={() => closeModal('multi-video')}>
            <i className="fas fa-film mb-2 text-2xl text-blue-400"></i>
            <p className="font-semibold">멀티 동영상</p>
            <p className="text-center text-sm text-gray-500">
              설명 문구는 최대 2줄까지 노출됩니다. 설명문구2줄
            </p>
          </button>
        </div>

        <div className="flex flex-col items-center rounded-lg border bg-blue-50 p-4">
          <button
            type={'button'}
            className={'h-full w-full'}
            onClick={() => closeModal('html-video')}>
            <i className="fas fa-code mb-2 text-2xl text-blue-400"></i>
            <p className="font-semibold">HTML 동영상</p>
            <p className="text-center text-sm text-gray-500">
              설명 문구는 최대 2줄까지 노출됩니다. 설명문구2줄
            </p>
          </button>
        </div>

        <div className="flex flex-col items-center rounded-lg border bg-blue-50 p-4">
          <button
            type={'button'}
            className={'h-full w-full'}
            onClick={() => closeModal('external-link')}>
            <i className="fas fa-link mb-2 text-2xl text-blue-400"></i>
            <p className="font-semibold">외부 링크</p>
            <p className="text-center text-sm text-gray-500">
              설명 문구는 최대 2줄까지 노출됩니다. 설명문구2줄
            </p>
          </button>
        </div>

        <div className="flex flex-col items-center rounded-lg border bg-blue-50 p-4">
          <button type={'button'} className={'h-full w-full'} onClick={() => closeModal('e-book')}>
            <i className="fas fa-book mb-2 text-2xl text-blue-400"></i>
            <p className="font-semibold">이북</p>
            <p className="text-center text-sm text-gray-500">
              설명 문구는 최대 2줄까지 노출됩니다. 설명문구2줄
            </p>
          </button>
        </div>

        <div className="flex flex-col items-center rounded-lg border bg-blue-50 p-4">
          <button type={'button'} className={'h-full w-full'} onClick={() => closeModal('image')}>
            <i className="fas fa-image mb-2 text-2xl text-blue-400"></i>
            <p className="font-semibold">이미지</p>
            <p className="text-center text-sm text-gray-500">
              설명 문구는 최대 2줄까지 노출됩니다. 설명문구2줄
            </p>
          </button>
        </div>

        <div className="flex flex-col items-center rounded-lg border bg-blue-50 p-4">
          <button type={'button'} className={'h-full w-full'} onClick={() => closeModal('etc')}>
            <i className="fas fa-ellipsis-h mb-2 text-2xl text-blue-400"></i>
            <p className="font-semibold">기타</p>
            <p className="text-center text-sm text-gray-500">
              설명 문구는 최대 2줄까지 노출됩니다. 설명문구2줄
            </p>
          </button>
        </div>

        <div className="flex flex-col items-center rounded-lg border bg-blue-50 p-4">
          <button type={'button'} className={'h-full w-full'} onClick={() => closeModal('blog')}>
            <i className="fab fa-blogger mb-2 text-2xl text-blue-400"></i>
            <p className="font-semibold">블로그</p>
            <p className="text-center text-sm text-gray-500">
              설명 문구는 최대 2줄까지 노출됩니다. 설명문구2줄
            </p>
          </button>
        </div>

        <div className="flex flex-col items-center rounded-lg border bg-blue-50 p-4">
          <button
            type={'button'}
            className={'h-full w-full'}
            onClick={() => closeModal('external-consignment')}>
            <i className="fas fa-file-alt mb-2 text-2xl text-blue-400"></i>
            <p className="font-semibold">외부 위탁</p>
            <p className="text-center text-sm text-gray-500">
              설명 문구는 최대 2줄까지 노출됩니다. 설명문구2줄
            </p>
          </button>
        </div>

        <div className="relative flex flex-col items-center rounded-lg border bg-blue-50 p-4">
          <button type={'button'} className={'h-full w-full'} onClick={() => closeModal('scorm')}>
            <i className="fas fa-file mb-2 text-2xl text-blue-400"></i>
            <p className="font-semibold">스콤</p>
            <p className="text-center text-sm text-gray-500">
              설명 문구는 최대 2줄까지 노출됩니다. 설명문구2줄
            </p>
          </button>
        </div>

        <div className="relative flex flex-col items-center rounded-lg border bg-blue-50 p-4">
          <button
            type={'button'}
            className={'h-full w-full'}
            onClick={() => closeModal('multi-scorm')}>
            <i className="fab fa-blogger mb-2 text-2xl text-blue-400"></i>
            <p className="font-semibold">스콤 멀티 등록</p>
            <p className="text-center text-sm text-gray-500">
              설명 문구는 최대 2줄까지 노출됩니다. 설명문구2줄
            </p>
          </button>
        </div>

        <div className="flex flex-col items-center rounded-lg border bg-blue-50 p-4">
          <button
            type={'button'}
            className={'h-full w-full'}
            onClick={() => closeModal('examination')}>
            <i className="fas fa-file-signature mb-2 text-2xl text-blue-400"></i>
            <p className="font-semibold">시험</p>
            <p className="text-center text-sm text-gray-500">
              설명 문구는 최대 2줄까지 노출됩니다. 설명문구2줄
            </p>
          </button>
        </div>

        <div className="flex flex-col items-center rounded-lg border bg-blue-50 p-4">
          <button type={'button'} className={'h-full w-full'} onClick={() => closeModal('survey')}>
            <i className="fas fa-poll mb-2 text-2xl text-blue-400"></i>
            <p className="font-semibold">설문</p>
            <p className="text-center text-sm text-gray-500">
              설명 문구는 최대 2줄까지 노출됩니다. 설명문구2줄
            </p>
          </button>
        </div>

        <div className="flex flex-col items-center rounded-lg border bg-blue-50 p-4">
          <button
            type={'button'}
            className={'h-full w-full'}
            onClick={() => closeModal('assignment')}>
            <i className="fas fa-tasks mb-2 text-2xl text-blue-400"></i>
            <p className="font-semibold">과제</p>
            <p className="text-center text-sm text-gray-500">
              설명 문구는 최대 2줄까지 노출됩니다. 설명문구2줄
            </p>
          </button>
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <button
          onClick={() => closeModal()}
          type={'button'}
          className="rounded-lg border px-6 py-2 text-gray-600 hover:bg-gray-200">
          취소
        </button>
      </div>
    </div>
  );
};

const searchConfig: SearchBoxConfig = {
  builders: [
    {
      name: 'tenant',
      type: 'dropdown',
      label: t('테넌트'),
      value: '',
      options: [
        { value: '', label: t('전체') },
        { value: 'tenantA', label: t('테넌트A') },
        { value: 'tenantB', label: t('테넌트B') },
        { value: 'tenantC', label: t('테넌트C') },
        { value: 'tenantD', label: t('테넌트D') },
        { value: 'tenantE', label: t('테넌트E') },
        { value: 'tenantF', label: t('테넌트F') },
      ],
    },
    {
      name: 'channel',
      type: 'dropdown',
      label: t('채널'),
      value: '',
      options: [
        { value: '', label: t('전체') },
        { value: 'channelA', label: t('채널A') },
        { value: 'channelB', label: t('채널B') },
        { value: 'channelC', label: t('채널C') },
        { value: 'channelD', label: t('채널D') },
        { value: 'channelE', label: t('채널E') },
        { value: 'channelF', label: t('채널F') },
      ],
    },
    {
      name: 'type',
      type: 'dropdown',
      label: t('유형'),
      value: '',
      options: [
        { value: '', label: t('전체') },
        { value: 'video', label: t('동영상') },
        { value: 'ebook', label: t('이북') },
        { value: 'class', label: t('클래스') },
        { value: 'web', label: t('웹') },
      ],
    },
    {
      name: 'managerName',
      type: 'text',
      label: t('담당자'),
      value: '',
    },
    {
      name: 'isEducationResource',
      type: 'dropdown',
      label: t('외주여부'),
      value: '',
      options: [
        { value: '', label: t('전체') },
        { value: 'Y', label: t('외주') },
        { value: 'N', label: t('외주아님') },
      ],
    },
    {
      name: 'useYn',
      type: 'dropdown',
      label: t('사용가능'),
      value: '',
      options: [{ value: '', label: t('전체') }],
    },
    {
      name: 'educationUsage',
      type: 'dropdown',
      label: t('교육활용'),
      value: '',
      options: [{ value: '', label: t('전체') }],
    },
    {
      name: 'educationResourceName',
      type: 'text',
      label: t('학습자원명'),
      value: '',
    },
  ],
};

const gridConfig = {
  query: leaningResourceQueryOptions.getLearningResources,
  columns: [
    {
      name: 'no1',
      label: 'NO.',
      type: 'numbering',
    },
    {
      name: 'tenant',
      label: '테넌트',
    },
    { name: 'channel', label: t('채널') },
    { name: 'type', label: t('유형') },
    {
      name: 'leaningResourceName',
      label: t('학습자원명'),
      render: (info: any) => (
        <Link className={'text-blue-600'} to={'/menu/translation-detail'}>
          학습자원명
        </Link>
      ),
    },
    { name: 'fileType', label: t('파일형식') },
    { name: 'fileSize', label: t('파일용량') },
    { name: 'managerName', label: t('담당자') },
    { name: 'source', label: '출처' },
    { name: 'preview', label: '미리보기' },
    { name: 'educationConjugation', label: '교육활용' },
    { name: 'procedureCnt', label: '과정수' },
    { name: 'isSecureContents', label: '보안콘텐츠' },
    { name: 'sharedChannel', label: '공유채널' },
    { name: 'inspection', label: '검수' },
    { name: 'available', label: '사용가능' },
    { name: 'registerUser', label: '등록자' },
    { name: 'registerDateTime', label: '등록일' },
    { name: 'modifyUser', label: '수정자' },
    { name: 'modifyDateTime', label: '수정일' },
  ],
  data: [],
  pagination: {
    pageSize: 10,
    pageIndex: 0,
    totalRows: 0,
  },
};
