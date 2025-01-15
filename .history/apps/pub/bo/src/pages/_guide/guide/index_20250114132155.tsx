import { createFileRoute, useRouter, Link } from '@tanstack/react-router';
import { Button } from '@learnway/ui';
import { guideData } from '../../../config'; // 퍼블 목록 데이터
import '../../../assets/styles/guide.css';

export const Route = createFileRoute('/_guide/guide/')({
  component: RouteComponent,
});

function RouteComponent() {
  interface ListItem {
    id: number;
    title: string;
    completionDate?: string; // 완료 날짜가 있을 수도, 없을 수도 있음
  }
  
  interface Stats {
    total: number;
    completed: number;
    remaining: number;
  }
  
  const MyComponent: React.FC<{ initialListData: ListItem[] }> = ({ initialListData }) => {
    const [data, setData] = useState<ListItem[]>(initialListData);
  
    const [stats, setStats] = useState<Stats>({
      total: 0,
      completed: 0,
      remaining: 0,
    });
  
    useEffect(() => {
      setData(initialListData);
    }, [initialListData]);
  
    // 데이터 통계 계산
    useEffect(() => {
      const total = data.length;
      const completed = data.filter((item) => item.completionDate).length;
      const remaining = total - completed;
  
      setStats({ total, completed, remaining });
    }, [data]);
  return (
    <div>
      <h2 className="guide_tit2">퍼블 리스트 현황</h2>
      <div className="stats-box">
        <span className="total">
          총 : <strong>{stats.total}</strong>본
        </span>
        <span className="completed">
          완료 : <strong>{stats.completed}</strong>본
        </span>
        <span className="remaining">
          남은본수 : <strong>{stats.remaining}</strong>본
        </span>
      </div>
      <div className="stats-graph">
        <div
          className="graph-bar completed"
          style={{
            width: `${stats.total > 0 ? (stats.completed / stats.total) * 100 : 0}%`,
          }}>
          완료 : {stats.completed}본
        </div>
        <div
          className="graph-bar remaining"
          style={{
            width: `${stats.total > 0 ? (stats.remaining / stats.total) * 100 : 0}%`,
          }}>
          남은본수 : {stats.remaining}본
        </div>
      </div>
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
              <td className="pages">
                <a href={item.pageId} target="_blank" rel="noopener noreferrer">
                  {item.pageId}
                </a>
              </td>
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
