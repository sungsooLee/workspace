import { createFileRoute, useRouter, Link } from '@tanstack/react-router';
import { Button } from '@learnway/ui';
import { guideData } from '../../../config'; // 퍼블 목록 데이터
import '../../../assets/styles/guide.css';

export const Route = createFileRoute('/_guide/guide/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h2 className="guide_tit2">퍼블 리스트 현황</h2>
      <table className="pub_table">
        <thead>
          <tr>
            <th scope="col">메뉴명 (1depth)</th>
            <th scope="col">메뉴명 (2depth)</th>
            <th scope="col">메뉴명 (3depth)</th>
            <th scope="col">화면아이디</th>
            <th scope="col">완료일</th>
            <th scope="col">최종수정일</th>
            <th scope="col">비고</th>
            <th scope="col">작업</th>
          </tr>
        </thead>
        <tbody>
          {guideData.map((item, index) => (
            <tr key={index}>
              <td>{item.depth1}</td>
              <td>{item.depth2}</td>
              <td>{item.depth3}</td>
              <td className="pages">{item.pageId}</td>
              <td>{item.completionDate || '-'}</td>
              <td>{item.lastUpdateDate || '-'}</td>
              <td>{item.remarks || '-'}</td>
              <td className={`${item.completionDate ? 'completed' : ''}`}>
                {item.completionDate ? '완료' : '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
