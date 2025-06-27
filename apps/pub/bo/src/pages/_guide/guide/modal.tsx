import { createFileRoute, Link } from '@tanstack/react-router';
import { isMobile } from 'react-device-detect';
import {
  Button,
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalTitle,
  useModal,
  Dropdown,
  Input,
  Checkbox,
  GridBox,
  Divider,
} from '@learnway/ui';
import { PageContainer } from '../../../widgets/layout/ui/container/page-container';
import { useState } from 'react';

import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { cn } from '@learnway/shared';
import {
  IcoRefresh02,
  IcoSearch,
  IcoClipboard,
  IcoClock01,
  IcoFormRequired,
  IcoDownload,
  IcoCopy,
} from '@learnway/icons';

/* style */
import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';
import searchStyles from '@learnway/styles/bo/assets/styles/modules/search-box.module.css'; // search-box.module.css

const ContentModal = () => {
  const { close: closeModal } = useModal();
  return (
    <ModalContainer>
      <ModalTitle>{'타이틀'}</ModalTitle>
      <ModalBody>
        <p>컨텐츠 영역</p>
      </ModalBody>
      <ModalFooter>
        <Button label={'취소'} variant={'gray'} size={'lg'} onClick={() => closeModal()} />
        <Button label={'확인'} variant={'primary'} size={'lg'} onClick={() => closeModal()} />
      </ModalFooter>
    </ModalContainer>
  );
};

const ResponModal = () => {
  // grid
  const [pageNumber, setpageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const data: any[] = [
    {
      type: '동영상',
      name: (
        // <Link to={'/'} className="link">
        //   학습자원명
        // </Link>
        <Button className="link" label={'학습자원명'} />
      ),
      tenant: '테넌트',
      channel: '채널',
      owner: '김현대',
      detailInfo: (
        <span className="icon_wrap">
          <IcoClock01 width={'16'} height={'16'} stroke={'#4c515e'} />
          {'02:00:00'}
        </span>
      ),
      function: (
        <>
          <Link to={'/'} className="link">
            미리보기
          </Link>
          <Link to={'/'} className="link">
            문항관리
          </Link>
        </>
      ),
      education: 'Y',
      course: (
        <Link to={'/'} className="link">
          2
        </Link>
      ),
    },
    {
      type: '동영상',
      name: (
        // <Link to={'/'} className="link">
        //   학습자원명
        // </Link>
        <Button className="link" label={'학습자원명'} />
      ),
      tenant: '테넌트',
      channel: '채널',
      owner: '김현대',
      detailInfo: (
        <span className="icon_wrap">
          <IcoClipboard width={'16'} height={'16'} />
          {'20개'}
        </span>
      ),
      function: (
        <>
          <Link to={'/'} className="link">
            미리보기
          </Link>
          <Link to={'/'} className="link">
            문항관리
          </Link>
        </>
      ),
      education: 'Y',
      course: (
        <Link to={'/'} className="link">
          2
        </Link>
      ),
    },
  ];

  const columnHelper = createColumnHelper<any>();

  const columns = [
    columnHelper.accessor('type', {
      cell: (info) => info.getValue(),
      header: '구분',
      size: 60,
      enableGrouping: false,
    }),
    columnHelper.accessor('name', {
      cell: (info) => info.getValue(),
      header: '학습자원명',
      size: 380,
      enableGrouping: false,
    }),
    columnHelper.accessor('tenant', {
      cell: (info) => info.getValue(),
      header: '테넌트',
      enableGrouping: false,
      size: 120,
    }),
    columnHelper.accessor('channel', {
      cell: (info) => info.getValue(),
      header: '채널',
      size: 180,
      enableGrouping: false,
    }),

    columnHelper.accessor('owner', {
      cell: (info) => info.getValue(),
      header: '담당자',
      size: 104,
      enableGrouping: false,
    }),
    columnHelper.accessor('detailInfo', {
      cell: (info) => info.getValue(),
      header: '세부정보',
      enableGrouping: false,
      size: 120,
    }),
    columnHelper.accessor('function', {
      cell: (info) => info.getValue(),
      header: '기능',
      enableGrouping: false,
      size: 150,
    }),
    columnHelper.accessor('education', {
      cell: (info) => info.getValue(),
      header: '교육활용',
      size: 104,
      enableGrouping: false,
    }),
    columnHelper.accessor('course', {
      cell: (info) => info.getValue(),
      header: '과정수',
      enableGrouping: false,
      size: 104,
    }),
  ] as ColumnDef<any, unknown>[];

  // dropdown
  const [selectedValues, setSelectedValues] = useState<null>(null);
  const [selectedValues2, setSelectedValues2] = useState<null>(null);
  const [selectedValues3, setSelectedValues3] = useState<null>(null);
  const [selectedValues4, setSelectedValues4] = useState<null>(null);
  const [selectedValues5, setSelectedValues5] = useState<null>(null);
  const [selectedValues6, setSelectedValues6] = useState<null>(null);
  const options = [
    { value: 'option1', label: '전체' },
    { value: 'option2', label: '옵션 2' },
    { value: 'option3', label: '옵션 3' },
  ];
  return (
    <ModalContainer>
      <ModalBody>
        <form className="form_row">
          <PageContainer>
            {/* main_contents */}
            <div className={styles.main_contents}>
              <div className={cn(searchStyles.start, searchStyles.wrap)}>
                <div className={searchStyles.contents}>
                  <div className={searchStyles.item_row}>
                    <div className={searchStyles.item_wrap}>
                      <div className={searchStyles.inner}>
                        <div className={searchStyles.item}>
                          <label htmlFor="name-1" className={searchStyles.label}>
                            <span className={searchStyles.text}>테넌트</span>
                            {/* 필수 케이스 */}
                            <span className={cn(searchStyles.status, searchStyles.required)}>
                              <IcoFormRequired width={8} height={8} />
                            </span>
                          </label>
                          <div className={searchStyles.box}>
                            <Dropdown
                              options={options}
                              value={selectedValues}
                              onChange={(selected) => setSelectedValues(selected)}
                              variant="default"
                              placeholder="선택"
                              size={'sm'}
                            />
                          </div>
                        </div>
                      </div>
                      <div className={searchStyles.inner}>
                        <div className={searchStyles.item}>
                          <label htmlFor="name-2" className={searchStyles.label}>
                            <span className={searchStyles.text}>채널</span>
                            {/* 필수 케이스 */}
                            <span className={cn(searchStyles.status, searchStyles.required)}>
                              <IcoFormRequired width={8} height={8} />
                            </span>
                          </label>
                          <div className={searchStyles.box}>
                            <Dropdown
                              options={options}
                              value={selectedValues2}
                              onChange={(selected) => setSelectedValues2(selected)}
                              variant="default"
                              placeholder="선택"
                              size={'sm'}
                            />
                          </div>
                        </div>
                      </div>
                      <div className={searchStyles.inner}>
                        <div className={searchStyles.item}>
                          <label htmlFor="name-3" className={searchStyles.label}>
                            <span className={searchStyles.text}>유형</span>
                          </label>
                          <div className={searchStyles.box}>
                            <Dropdown
                              options={options}
                              value={selectedValues3}
                              onChange={(selected) => setSelectedValues3(selected)}
                              variant={'text'}
                              placeholder="선택"
                              size={'sm'}
                              isMulti
                            />
                          </div>
                        </div>
                      </div>
                      <div className={searchStyles.inner}>
                        <div className={searchStyles.item}>
                          <label htmlFor="name-4" className={searchStyles.label}>
                            <span className={searchStyles.text}>학습자원명</span>
                          </label>
                          <div className={searchStyles.box}>
                            <Input type={'text'} placeholder={'입력'} id={'name-4'} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={searchStyles.item_wrap}>
                      <div className={searchStyles.inner}>
                        <div className={searchStyles.item}>
                          <label htmlFor="name-5" className={searchStyles.label}>
                            <span className={searchStyles.text}>외주여부</span>
                            {/* 필수 케이스 */}
                            <span className={cn(searchStyles.status, searchStyles.required)}>
                              <IcoFormRequired width={8} height={8} />
                            </span>
                          </label>
                          <div className={searchStyles.box}>
                            <Dropdown
                              options={options}
                              value={selectedValues4}
                              onChange={(selected) => setSelectedValues4(selected)}
                              variant="default"
                              placeholder="선택"
                              size={'sm'}
                            />
                          </div>
                        </div>
                      </div>
                      <div className={searchStyles.inner}>
                        <div className={searchStyles.item}>
                          <label htmlFor="name-6" className={searchStyles.label}>
                            <span className={searchStyles.text}>사용가능</span>
                            {/* 필수 케이스 */}
                            <span className={cn(searchStyles.status, searchStyles.required)}>
                              <IcoFormRequired width={8} height={8} />
                            </span>
                          </label>
                          <div className={searchStyles.box}>
                            <Dropdown
                              options={options}
                              value={selectedValues5}
                              onChange={(selected) => setSelectedValues5(selected)}
                              variant="default"
                              placeholder="선택"
                              size={'sm'}
                            />
                          </div>
                        </div>
                      </div>
                      <div className={searchStyles.inner}>
                        <div className={searchStyles.item}>
                          <label htmlFor="name-7" className={searchStyles.label}>
                            <span className={searchStyles.text}>교육활용</span>
                          </label>
                          <div className={searchStyles.box}>
                            <Dropdown
                              options={options}
                              value={selectedValues6}
                              onChange={(selected) => setSelectedValues6(selected)}
                              variant="default"
                              placeholder="선택"
                              size={'sm'}
                            />
                          </div>
                        </div>
                      </div>
                      <div className={searchStyles.inner}>
                        <div className={searchStyles.item}>
                          <label htmlFor="name-8" className={searchStyles.label}>
                            <span className={searchStyles.text}>담당자</span>
                          </label>
                          <div className={searchStyles.box}>
                            <Input type={'text'} placeholder={'입력'} id={'name-8'} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={searchStyles.btn_box}>
                    <Button
                      type="button"
                      className={searchStyles.btn_refresh}
                      variant="search"
                      size="sm"
                      onlyIcon
                    >
                      <IcoRefresh02 className={searchStyles.icon_refresh} />
                    </Button>
                    <Button
                      type="button"
                      variant="search"
                      size="sm"
                      className={searchStyles.btn_search}
                    >
                      <IcoSearch className={searchStyles.icon_sm_search} />
                      조회
                    </Button>
                  </div>
                </div>
              </div>
              <Divider />
              <GridBox
                data={data}
                columns={columns}
                showColumnSettings={false}
                showNumberingColumn
                showExcelDownload
                columnPinning={{ columns: ['type', 'name'] }}
                pagination={{
                  pageSize,
                  pageNumber,
                  totalPages: 100,
                  onPageChange: setpageNumber,
                  onPageSizeChange: setPageSize,
                }}
                title="목록"
                customButtonNode={
                  <>
                    <Checkbox label={'나의 학습자원'} size={'md'} />
                    <Button
                      label={'프로그램/가이드 다운로드'}
                      icon={<IcoDownload width={16} height={16} stroke={'#4C515E'} />}
                    />
                    <Button label={'일괄설정'} variant={'text'} />
                    <Button
                      label={'복사'}
                      icon={<IcoCopy width={16} height={16} stroke={'#131c30'} />}
                    />
                  </>
                }
              />
            </div>
          </PageContainer>
        </form>
      </ModalBody>
    </ModalContainer>
  );
};

export const Route = createFileRoute('/_guide/guide/modal')({
  component: RouteComponent,
});

function RouteComponent() {
  const { open: openModal } = useModal();
  return (
    <div className="content">
      <h2 className="guide_tit2">Modal Component Guide</h2>
      <p className="loc react">/libs/ui/src/lib/modal/modal.tsx (공통)</p>
      <p className="info">
        모달 size(가로 기준) : sm(600px), md(800px), lg(1024px), xl(1400px), respon(해상도에 따라
        자동 변경) width 속성 적용
      </p>

      <div className="code_example">
        <pre className="code_block">
          <code>
            {`// 초기 import
import { ModalBody, ModalContainer, ModalFooter, ModalTitle, ModalDescription, useModal  } from '@learnway/ui';
// Modal open, close
const { open: openModal,  close: closeModal } = useModal();

<ModalContainer>
  <ModalTitle>{'타이틀'}</ModalTitle>
  <ModalDescription>{'텍스트'}</ModalDescription>
  <ModalBody>
    <p>컨텐츠 영역</p>
  </ModalBody>
  <ModalFooter>
    <Button label={'취소'} variant={'gray'} size={'lg'} onClick={() => closeModal()} />
    <Button label={'확인'} variant={'primary'} size={'lg'} onClick={() => closeModal()} />
  </ModalFooter>
</ModalContainer>

// 실행 함수
openModal({
  width: 'md', // sm(600px), md(800px), lg(1024px), xl(1400px)
  // width: isMobile ? 'm_full' : 'sm', // 반응형일때
  content: <ContentModal />,
})`}
          </code>
        </pre>
      </div>

      <div className="group">
        <h3 className="guide_tit3">Modal</h3>
        <div className="flex_box">
          <div className="desc">
            <Button
              onClick={() =>
                openModal({
                  width: 'md', // sm(600px), md(800px), lg(1024px), xl(1400px)
                  height: 'fix',
                  content: <ContentModal />,
                })
              }
            >
              모달 팝업 열기
            </Button>
          </div>
        </div>
        <div className="code_example">
          <pre className="code_block">
            <code>{`
import { Button, useModal } from '@learnway/ui';
const CustomFooter = () => {
    const { close: closeModal } = useModal();
    return (
      <>
        <Button variant="gray" size="lg" onClick={() => closeModal()}>
          취소버튼입니다
        </Button>
        <Button variant="primary" size="lg" onClick={() => closeModal()}>
          확인
        </Button>
      </>
    );
  };          
<Button
onClick={() =>
  openModal(<BasicModalContent />, {
    width: 'sm', // sm(600px), md(800px), lg(1024px), xl(1400px)
    footer: true,
  })
}>
모달 팝업 열기
</Button>`}</code>
          </pre>
        </div>
        <h3 className="guide_tit3">Modal(반응형-모바일) 띄울때</h3>
        <div className="flex_box">
          <div className="desc">
            <Button
              onClick={() =>
                openModal({
                  width: isMobile ? 'm_full' : 'sm',
                  content: <ContentModal />,
                })
              }
            >
              모달 팝업 열기
            </Button>
          </div>
        </div>
        <div className="code_example">
          <pre className="code_block">
            <code>{`const CustomFooter = () => {
  const { close: closeModal } = useModal();
  return (
    <>   
    // 예시
    <Button
      onClick={() =>
        openModal({
          width: isMobile ? 'm_full' : 'sm',
          content: <BasicModalContent />,
        })
      }>
      모달 팝업 열기
    </Button>
    </>
`}</code>
          </pre>
        </div>

        <h3 className="guide_tit3">Modal (외부페이지)</h3>

        <div className="code_example">
          <pre className="code_block">
            <code>{`
// 팝업띄울 페이지에 아래코드
import { MpassPopup } from '../../features/auth'; // 팝업 불러오기

// 모달(팝업) 코드 샘플  (mpass-popup.jsx)
import { memo } from 'react';
import styles from './mpass-popup.module.css'; // 외부페이지 모달css

const MpassPopupCompoment = () => {
  return (
    <div className={styles.start}>
      외부페이지 예시
    </div>
  );
};

export const MpassPopup = memo(MpassPopupCompoment);
`}</code>
          </pre>
        </div>
        <div className="info">
          팝업 파일(.tsx)는 따로 만들어주며 위에 예시코드(샘플)을 참고한다.
          <br />
          모달은 popup 이름으로 생성한다. ex)mpass-popup.tsx
          <br />각 팝업마다 모듈css를 생성한다.
        </div>

        <h3 className="guide_tit3">Modal (두개일경우 닫고+열기)</h3>

        <div className="code_example">
          <pre className="code_block">
            <code>{`// import
import { Button, useModal } from '@learnway/ui';

// 호출
const { open: openModal } = useModal();
const { close: closeModal } = useModal();

<Button
  onClick={() => {
    closeModal(); // 모달 닫기 함수 호출
    setTimeout(() => {
      openModal({
        width: 'sm',
        content: <GoogleCert2Popup />,
      });
    });
  }}>
  스캔할 수 없나요?
</Button>`}</code>
          </pre>
        </div>

        <h3 className="guide_tit3">Modal (자동으로 띄우기)</h3>

        <div className="code_example">
          <pre className="code_block">
            <code>{`// import
import { useEffect } from 'react';
import { Button, useModal } from '@learnway/ui';

// 호출
const { open: openModal, close: closeModal } = useModal();

// 자동모달 띄우기
useEffect(() => {
  openModal({
    width: 'xl', // sm(600px), md(800px), lg(1024px), xl(1400px)
    content: <NoticeDetailPopup />, // 페이지 팝업 콤포넌트 or 팝업 내용
  });
}, [openModal]);`}</code>
          </pre>
        </div>

        <div className="info">페이지 접근시 모달팝업 자동실행(퍼블확인용)</div>

        <h3 className="guide_tit3">Modal(해상도에 따라 자동 사이즈 조절) 띄울때</h3>
        <div className="flex_box">
          <div className="desc">
            <Button
              onClick={() =>
                openModal({
                  width: 'respon', // respon
                  hideCloseButton: true, // close 버튼 가림
                  content: <ResponModal />,
                })
              }
            >
              모달 팝업 열기
            </Button>
          </div>
        </div>
        <div className="code_example">
          <pre className="code_block">
            <code>{`// 팝업 내용
const ResponModal = () => {
  return (
    <ModalContainer>
      <ModalBody>
        <p>컨텐츠 영역</p>
      </ModalBody>
    </ModalContainer>
  );
};

// 실행 코드
<Button
  onClick={() =>
    openModal({
      width: 'respon',
      hideCloseButton: true,
      content: <ResponModal />,
    })
  }
>
  모달 팝업 열기
</Button>
`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
