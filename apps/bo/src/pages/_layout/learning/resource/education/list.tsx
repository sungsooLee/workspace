import { createFileRoute, useRouter } from '@tanstack/react-router';
import useSearchBox from '../../../../../shared/ui/search-box/use-search-box';
import { useCallback } from 'react';
import { PageContainer } from '../../../../../widgets/layout/ui/container/page-container';
import { ContentsButtons } from '../../../../../widgets/layout/ui/container/slot/contents-buttons';
import { Button, useModalContext, useModalControl } from '@learnway/ui';
import { MainContents } from '../../../../../widgets/layout/ui/container/slot/main-contents';
import { SearchBox, SearchBoxConfig } from '../../../../../shared/ui/search-box';
import { t } from 'i18next';

export const Route = createFileRoute('/_layout/learning/resource/education/list')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const { config: sConfig } = useSearchBox(searchConfig);
  const { open } = useModalControl();

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
    open(
      <EducationListPopup />,
      {
        width: 'lg',
      },
      handleClose,
    );
  };

  return (
    <PageContainer>
      <ContentsButtons>
        <Button type="button" variant="point" size="sm" onClick={handleNewTranslation}>
          등록
        </Button>
      </ContentsButtons>
      <MainContents>
        <SearchBox config={sConfig} onSearch={handleOnSearch} />
      </MainContents>
    </PageContainer>
  );
}

const EducationListPopup = () => {
  const { closeModal } = useModalContext();

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
      name: 'channel',
      type: 'dropdown',
      label: t('채널'),
      value: '',
      options: [{ value: '', label: t('전체') }],
    },
    {
      name: 'type',
      type: 'dropdown',
      label: t('유형'),
      value: '',
      options: [{ value: '', label: t('전체') }],
    },
    {
      name: 'managerName',
      type: 'text',
      label: t('담당자'),
      value: '',
    },
    {
      name: 'educationResourceName',
      type: 'text',
      label: t('학습자원명'),
      value: '',
    },
    {
      name: 'externalPartner',
      type: 'dropdown',
      label: t('출처/외주개발업체'),
      value: '',
      options: [{ value: '', label: t('전체') }],
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
      name: 'qualityInspection',
      type: 'dropdown',
      label: t('검수'),
      value: '',
      options: [{ value: '', label: t('전체') }],
    },
  ],
};
