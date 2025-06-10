import { createFileRoute } from '@tanstack/react-router';

import { PageContainer } from '@widgets/layout/ui/container/page-container';
import { MainContents } from '@widgets/layout/ui/container/slot/main-contents';
import style from './index.module.css';

export const Route = createFileRoute('/_layout/')({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <PageContainer showFavoriteButton={false}>
      <MainContents>
        <h3>Dash Board</h3>
        <div className={style.guide_wrap}>
          <div className={style.preview}>
            <div className={style.guide_box}>
              <div style={{ marginBottom: 10 }}>
                <h3>M0</h3>
              </div>
              <table className={style.pub_table} style={{ width: '100%' }}>
                <thead>
                  <tr>
                    <th scope="col">스크린 명</th>
                    <th scope="col">페이지링크(화면아이디)</th>
                    <th scope="col">페이지타입</th>
                    <th scope="col">완료일</th>
                    <th scope="col">비고</th>
                    <th scope="col">상태</th>
                  </tr>
                </thead>
                <tbody>
                  {munu.map((item, index) => (
                    <tr key={index} className="h-[20px]">
                      <td className="text-left">{item.screenName}</td>
                      <td className={style.pages}>
                        <a href={item.pageId} target="_blank" rel="noopener noreferrer">
                          {item.pageId}
                        </a>
                        <span className={style.screen}>
                          {item.screenId ? `(${item.screenId})` : ''}
                        </span>
                      </td>
                      <td>{item.pageType}</td>
                      <td>{item.completionDate || '-'}</td>
                      <td className={style.remarks}>{item.memo}</td>
                      <td className={`${item.end ? style.completed : style.status}`}>
                        {item.end ? '완료' : '진행중'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ marginBottom: 10, marginTop: 40 }}>
                <h3>Guide</h3>
              </div>
              <table className={style.pub_table} style={{ width: '100%' }}>
                <thead>
                  <tr>
                    <th scope="col">스크린 명</th>
                    <th scope="col">페이지링크(화면아이디)</th>
                    <th scope="col">페이지타입</th>
                    <th scope="col">비고</th>
                  </tr>
                </thead>
                <tbody>
                  {guide.map((item, index) => (
                    <tr key={index} className="h-[20px]">
                      <td className="text-left">{item.screenName}</td>
                      <td className={style.pages}>
                        <a href={item.pageId} target="_blank" rel="noopener noreferrer">
                          {item.pageId}
                        </a>
                      </td>
                      <td>{item.pageType}</td>
                      <td className={style.remarks}>{item.memo}</td>
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
// memo: 비고
// end: true, false
export const munu = [
  {
    screenName: '로그인',
    pageId: 'login',
    screenId: 'NLP_BO_LOG_1000',
    pageType: 'Page',
    completionDate: '-',
    memo: '회원,회사,역할,로그인프로세스 정의필요', // 비고
    end: false,
  },
  {
    screenName: '회원가입 진행현황',
    pageId: 'signup-progress',
    screenId: 'NLP_BO_LOG_1000',
    pageType: 'Page',
    completionDate: '-',
    memo: '작업 중 api X', // 비고
    end: false,
  },
  {
    screenName: '관리자 회원가입',
    pageId: 'signup',
    screenId: 'NLP_BO_LOG_1000',
    pageType: 'Page',
    completionDate: '-',
    memo: '작업 중 api X', // 비고
    end: false,
  },
  {
    screenName: '나의 정보',
    pageId: 'my-page/info',
    screenId: 'NLP_BO_COM_1000',
    pageType: 'Page',
    completionDate: '-',
    memo: '작업중 apiX', // 비고
    end: false,
  },
  {
    screenName: '나의 권한',
    pageId: 'my-page/role',
    screenId: 'NLP_BO_COM_1000',
    pageType: 'Page',
    completionDate: '-',
    memo: '작업중 apiX', // 비고
    end: false,
  },
  {
    screenName: '나의 권한 상세',
    pageId: 'my-page/role/detail',
    screenId: 'NLP_BO_COM_1000',
    pageType: 'Page',
    completionDate: '-',
    lastUpdateDate: '-',
    memo: '작업중 apiX', // 비고
    end: false,
  },
  {
    screenName: '나의 학습자원 조회',
    pageId: 'learning/learning-resource',
    screenId: 'NLP_BO_CMS_1001',
    pageType: 'Page',
    completionDate: '-',
    lastUpdateDate: '-',
    memo: '작업중', // 비고
    end: false,
  },
  {
    screenName: '공통 카테고리',
    pageId: 'platform/category',
    screenId: 'NLP_BO_TMS_1120',
    pageType: 'Page',
    completionDate: '-',
    memo: '작업 완료', // 비고
    end: false,
  },
  {
    screenName: '시스템 공통코드 그룹관리',
    pageId: 'platform/code/system-code',
    screenId: 'NLP_BO_PMS_1401_01',
    pageType: 'Page',
    completionDate: '-',
    memo: '작업 완료', // 비고
    end: false,
  },
  {
    screenName: '메뉴 관리',
    pageId: 'platform/menu',
    screenId: 'NLP_BO_PMS_1200',
    pageType: 'Page',
    completionDate: '-',
    memo: '작업 완료', // 비고
    end: false,
  },
  {
    screenName: '위젯 관리',
    pageId: 'platform/widget',
    screenId: 'NLP_BO_PMS_1310',
    pageType: 'Page',
    completionDate: '-',
    memo: '작업 완료', // 비고
    end: false,
  },
  {
    screenName: '라벨/메시지 관리',
    pageId: 'platform/label-message',
    screenId: 'NLP_BO_PMS_1406',
    pageType: 'Page',
    completionDate: '-',
    memo: '작업 완료', // 비고
    end: true,
  },
  {
    screenName: '프로그램 관리',
    pageId: 'platform/program',
    screenId: 'NLP_BO_PMS_1403',
    pageType: 'Page',
    completionDate: '-',
    memo: '작업 완료', // 비고
    end: false,
  },
  {
    screenName: '시스템 번역',
    pageId: 'platform/system/multilingual',
    screenId: 'NLP_BO_PMS_1421',
    pageType: 'Page',
    completionDate: '-',
    memo: '작업 완료', // 비고
    end: false,
  },
  {
    screenName: '테넌트 관리',
    pageId: 'tenant/management',
    screenId: 'NLP_BO_TMS_1000',
    pageType: 'Page',
    completionDate: '-',
    memo: '작업 중(조회옵션)', // 비고
    end: false,
  },
  {
    screenName: '테넌트 상세',
    pageId: 'tenant/management/detail',
    screenId: 'NLP_BO_TMS_1003_00_04, NLP_BO_TMS_1003_02 등등',
    pageType: 'Page',
    completionDate: '-',
    memo: '작업 중 - /tenant/management 에서 조회 후 테넌트명 클릭',
    end: false,
  },
  {
    screenName: '플렛폼 테넌트 관리',
    pageId: 'platform/tenant/management',
    screenId: 'NLP_BO_TMS_1000',
    pageType: 'Page',
    completionDate: '-',
    memo: '작업 중',
    end: false,
  },
  {
    screenName: '테넌트 상세(플렛폼)',
    pageId: 'platform/tenant/management/detail',
    screenId: 'NLP_BO_TMS_1002,NLP_BO_TMS_1002_01 등등',
    pageType: 'Page',
    completionDate: '-',
    memo: '작업 중 - /platform/tenant/management 에서 조회 후 테넌트명 클릭',
    end: false,
  },
  {
    screenName: '플렛폼 테넌트 등록',
    pageId: 'platform/tenant/management/regist',
    screenId: 'NLP_BO_TMS_1001',
    pageType: 'Page',
    completionDate: '-',
    memo: '작업 중 (등록 가능)',
    end: false,
  },
  {
    screenName: '플렛폼 테넌트 유저 관리',
    pageId: 'platform/tenant/management/user-management',
    screenId: 'NLP_BO_TMS_1111_07, NLP_BO_TMS_1111_15',
    pageType: 'Page',
    completionDate: '-',
    memo: '작업 중',
    end: false,
  },
  {
    screenName: '플렛폼 테넌트 조직 관리',
    pageId: 'platform/tenant/organization',
    screenId: 'NLP_BO_TMS_1111_01',
    pageType: 'Page',
    completionDate: '-',
    memo: '작업 중 (api - 회사목록api사용)',
    end: false,
  },
  {
    screenName: '플렛폼 테넌트 조직 관리 - 상세',
    pageId: 'platform/tenant/organization/detail',
    screenId: 'NLP_BO_TMS_1111_03',
    pageType: 'Page',
    completionDate: '-',
    memo: '작업 중 (api x)- /platform/tenant/organization 검색 후 회사명 클릭',
    end: false,
  },
  {
    screenName: '교육 장소 ',
    pageId: 'learning/training-place',
    screenId: 'NLP_BO_EDO_1601',
    pageType: 'Page',
    completionDate: '-',
    memo: '작업 중',
    end: false,
  },
  {
    screenName: '교육 장소 등록',
    pageId: 'learning/training-place/regist',
    screenId: 'NLP_BO_EDO_1603',
    pageType: 'Page',
    completionDate: '-',
    memo: '작업 중',
    end: false,
  },
  {
    screenName: '회사 관리',
    pageId: 'platform/company/management',
    screenId: 'NLP_BO_TMS_1300',
    pageType: 'Page',
    completionDate: '-',
    memo: '작업 중',
    end: false,
  },
  {
    screenName: '회사 조직 관리',
    pageId: 'platform/company/organization',
    screenId: 'NLP_BO_TMS_1301',
    pageType: 'Page',
    completionDate: '-',
    memo: '작업 중',
    end: false,
  },
  {
    screenName: '회사 유저 관리',
    pageId: 'platform/company/user',
    screenId: 'NLP_BO_TMS_1303',
    pageType: 'Page',
    completionDate: '-',
    memo: '작업 중',
    end: false,
  },
];

export const guide = [
  {
    screenName: '폼타입3',
    pageId: 'menu/type3',
    pageType: 'Page',
    memo: '', // 비고
  },
  {
    screenName: '폼타입4',
    pageId: 'menu/type4',
    pageType: 'Page',
    memo: '', // 비고
  },
  {
    screenName: '폼타입5',
    pageId: 'menu/type5',
    pageType: 'Page',
    memo: '', // 비고
  },
  {
    screenName: '폼타입6',
    pageId: 'menu/type6',
    pageType: 'Page',
    memo: '', // 비고
  },
  {
    screenName: '공통팝업',
    pageId: 'common-popup',
    pageType: 'Page',
    memo: '공통 팝업', // 비고
  },
  {
    screenName: '영상 플레이어',
    pageId: 'player-demo',
    pageType: 'Page',
    memo: '영상 플레이어', // 비고
  },
];
