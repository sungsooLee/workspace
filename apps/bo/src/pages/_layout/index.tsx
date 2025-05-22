import { createFileRoute } from '@tanstack/react-router';

import { PageContainer } from '@widgets/layout/ui/container/page-container';
import { MainContents } from '@widgets/layout/ui/container/slot/main-contents';
// import '@learnway/styles/src/lib/bo/assets/styles/guide.css';

export const Route = createFileRoute('/_layout/')({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <PageContainer
    // scrollHidden={true}
    >
      <MainContents>
        <h3>Dash Board</h3>
        <div className="guide_wrap">
          <div className="preview">
            <div className="guide_box">
              <div style={{ marginBottom: 10 }}>
                <h3>M0</h3>
              </div>
              <table className="pub_table">
                <thead>
                  <tr>
                    <th scope="col">스크린 명</th>
                    <th scope="col">페이지링크(화면아이디)</th>
                    <th scope="col">페이지타입</th>
                    <th scope="col">완료일</th>
                    <th scope="col">최종수정일</th>
                    <th scope="col">비고</th>
                    <th scope="col">상태</th>
                  </tr>
                </thead>
                <tbody>
                  {munu.map((item, index) => (
                    <tr key={index} className="h-[20px]">
                      <td className="text-left">{item.screenName}</td>
                      <td className="pages">
                        <a href={item.pageId} target="_blank" rel="noopener noreferrer">
                          {item.pageId}
                        </a>
                        <span className="screen">{item.screenId ? `(${item.screenId})` : ''}</span>
                      </td>
                      <td>{item.pageType}</td>
                      <td>{item.completionDate || '-'}</td>
                      <td>{item.lastUpdateDate || '-'}</td>
                      <td className="remarks">{item.remarks}</td>
                      <td className={`${item.completionDate ? 'completed' : 'status'}`}>
                        {item.completionDate ? '완료' : '진행예정'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ marginBottom: 10, marginTop: 40 }}>
                <h3>Guide</h3>
              </div>
              <table className="pub_table">
                <thead>
                  <tr>
                    <th scope="col">스크린 명</th>
                    <th scope="col">페이지링크(화면아이디)</th>
                    <th scope="col">페이지타입</th>
                    <th scope="col">완료일</th>
                    <th scope="col">최종수정일</th>
                    <th scope="col">비고</th>
                    <th scope="col">상태</th>
                  </tr>
                </thead>
                <tbody>
                  {guide.map((item, index) => (
                    <tr key={index} className="h-[20px]">
                      <td className="text-left">{item.screenName}</td>
                      <td className="pages">
                        <a href={item.pageId} target="_blank" rel="noopener noreferrer">
                          {item.pageId}
                        </a>
                        <span className="screen">{item.screenId ? `(${item.screenId})` : ''}</span>
                      </td>
                      <td>{item.pageType}</td>
                      <td>{item.completionDate || '-'}</td>
                      <td>{item.lastUpdateDate || '-'}</td>
                      <td className="remarks">{item.remarks}</td>
                      <td className={`${item.completionDate ? 'completed' : 'status'}`}>
                        {item.completionDate ? '완료' : '진행예정'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </MainContents>
    </PageContainer>
  );
}

// 완료시 completionDate 에 날짜를 기입해주세요. (ex.2024-12.31)

// screenName: 스크린 명
// pageId: 화면 경로(파일명) .tsx 생략
// screenId: 스크린아이디
// pageType: 페이지 타입 Page,Pop-up
// completionDate: 완료일
// lastUpdateDate: 수정일
// remarks: 비고
export const munu = [
  {
    screenName: '로그인',
    pageId: 'login',
    screenId: 'NLP_BO_LOG_1000',
    pageType: 'Page',
    completionDate: '-',
    lastUpdateDate: '-',
    remarks: '작업 완료', // 비고
  },
  {
    screenName: '나의 정보',
    pageId: 'my-page/info',
    screenId: 'NLP_BO_COM_1000',
    pageType: 'Page',
    completionDate: '-',
    lastUpdateDate: '-',
    remarks: '작업중 apiX', // 비고
  },
  {
    screenName: '나의 권한',
    pageId: 'my-page/role',
    screenId: 'NLP_BO_COM_1000',
    pageType: 'Page',
    completionDate: '-',
    lastUpdateDate: '-',
    remarks: '작업중 apiX', // 비고
  },
  {
    screenName: '나의 권한 상세',
    pageId: 'my-page/role/detail',
    screenId: 'NLP_BO_COM_1000',
    pageType: 'Page',
    completionDate: '-',
    lastUpdateDate: '-',
    remarks: '작업중 apiX', // 비고
  },
  {
    screenName: '공통 카테고리',
    pageId: 'platform/category',
    screenId: '-',
    pageType: 'Page',
    completionDate: '-',
    lastUpdateDate: '-',
    remarks: '작업 완료', // 비고
  },
  {
    screenName: '메뉴 관리',
    pageId: 'platform/menu',
    screenId: '-',
    pageType: 'Page',
    completionDate: '-',
    lastUpdateDate: '-',
    remarks: '작업 완료', // 비고
  },
  {
    screenName: '위젯 관리',
    pageId: 'platform/widget',
    screenId: '-',
    pageType: 'Page',
    completionDate: '-',
    lastUpdateDate: '-',
    remarks: '작업 완료', // 비고
  },
  {
    screenName: '라벨/메시지 관리',
    pageId: 'platform/label-message',
    screenId: '-',
    pageType: 'Page',
    completionDate: '-',
    lastUpdateDate: '-',
    remarks: '작업 완료', // 비고
  },
  {
    screenName: '프로그램 관리',
    pageId: 'platform/program',
    screenId: '-',
    pageType: 'Page',
    completionDate: '-',
    lastUpdateDate: '-',
    remarks: '작업 완료', // 비고
  },
  {
    screenName: '시스템 변역',
    pageId: 'platform/system/multilingual',
    screenId: '-',
    pageType: 'Page',
    completionDate: '-',
    lastUpdateDate: '-',
    remarks: '작업 완료', // 비고
  },
  {
    screenName: '테넌트 관리',
    pageId: 'tenant/management',
    screenId: '-',
    pageType: 'Page',
    completionDate: '-',
    lastUpdateDate: '-',
    remarks: '작업 중(조회옵션)', // 비고
  },
  {
    screenName: '플렛폼 테넌트 관리',
    pageId: 'platform/tenant/management',
    screenId: '-',
    pageType: 'Page',
    completionDate: '-',
    lastUpdateDate: '-',
    remarks: '작업 중',
  },
  {
    screenName: '플렛폼 테넌트 등록',
    pageId: 'platform/tenant/management/regist',
    screenId: '-',
    pageType: 'Page',
    completionDate: '-',
    lastUpdateDate: '-',
    remarks: '작업 중',
  },
  {
    screenName: '교육 장소 ',
    pageId: 'learning/training-place',
    screenId: '-',
    pageType: 'Page',
    completionDate: '-',
    lastUpdateDate: '-',
    remarks: '작업 중',
  },
  {
    screenName: '교육 장소 등록',
    pageId: 'learning/training-place/regist',
    screenId: '-',
    pageType: 'Page',
    completionDate: '-',
    lastUpdateDate: '-',
    remarks: '작업 중', // 비고
  },
];

export const guide = [
  {
    screenName: '폼타입3',
    pageId: 'menu/type3',
    screenId: '-',
    pageType: 'Page',
    completionDate: '-',
    lastUpdateDate: '-',
    remarks: '작업 완료', // 비고
  },
  {
    screenName: '폼타입4',
    pageId: 'menu/type4',
    screenId: '-',
    pageType: 'Page',
    completionDate: '-',
    lastUpdateDate: '-',
    remarks: '작업 완료', // 비고
  },
  {
    screenName: '폼타입5',
    pageId: 'menu/type5',
    screenId: '-',
    pageType: 'Page',
    completionDate: '-',
    lastUpdateDate: '-',
    remarks: '작업 완료', // 비고
  },
  {
    screenName: '폼타입6',
    pageId: 'menu/type6',
    screenId: '-',
    pageType: 'Page',
    completionDate: '-',
    lastUpdateDate: '-',
    remarks: '작업 완료', // 비고
  },
  {
    screenName: '공통팝업',
    pageId: 'common-popup',
    screenId: '-',
    pageType: 'Page',
    completionDate: '-',
    lastUpdateDate: '-',
    remarks: '작업 완료', // 비고
  },
];
