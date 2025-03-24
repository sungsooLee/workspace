import React, { useState, useEffect } from 'react';
import { createFileRoute, useRouter, Link } from '@tanstack/react-router';
import { Button } from '@learnway/ui';
import { guideData } from '../../../config'; // 퍼블 목록 데이터
// eslint-disable-next-line @nx/enforce-module-boundaries
import '../../../../../../../libs/styles/src/lib/fo/assets/styles/guide.css';

export const Route = createFileRoute('/_guide/guide/')({
  component: RouteComponent,
});

function RouteComponent() {
  // 데이터 아이템의 타입 정의
  interface ListItem {
    layoutType?: string;
    screenName: string;
    pageId: string;
    screenId?: string;
    completionDate: string;
    lastUpdateDate: string;
    remarks: string;
  }

  // 통계 상태의 타입 정의
  interface Stats {
    total: number;
    completed: number;
    remaining: number;
  }

  const [data, setData] = useState<ListItem[]>(guideData); // 데이터를 상태로 저장
  const [isSorted, setIsSorted] = useState<boolean>(false);

  const [stats, setStats] = useState<Stats>({
    total: 0,
    completed: 0,
    remaining: 0,
  });

  const getLayoutType = (screenId: string): string => {
    if (screenId.includes('_MR_')) return '반응형(모바일)';
    if (screenId.includes('_MA_')) return '적응형(모바일)';
    if (screenId.includes('_M_')) return '모바일';
    return 'PC';
  };

  // guideData 변경 시 data 업데이트
  useEffect(() => {
    setData(guideData);
  }, []);

  // data 변경 시 통계 계산
  useEffect(() => {
    const total = data.length;
    const completed = data.filter((item) => item.completionDate).length;
    const remaining = total - completed;

    setStats({ total, completed, remaining });
  }, [data]);

  // 레이아웃 타입 자동계산
  useEffect(() => {
    // layoutType을 추가한 새로운 데이터 생성
    const updatedData = guideData.map((item) => ({
      ...item,
      layoutType: getLayoutType(item.screenId),
    }));

    setData(updatedData);
  }, []);

  // 버튼 클릭 시 정렬 토글
  const handleSort = () => {
    setIsSorted(!isSorted); // 정렬 상태 반전
  };

  // 데이터 정렬 함수
  const sortedData = isSorted
    ? [...guideData].sort((a, b) => {
        const statusA = a.completionDate ? '완료' : '진행예정';
        const statusB = b.completionDate ? '완료' : '진행예정';

        if (statusA === statusB) return 0;
        return statusA < statusB ? -1 : 1;
      })
    : guideData; // 정렬하지 않으면 원본 그대로 사용

  return (
    <div>
      <h2 className="guide_tit2">퍼블 리스트 현황 (학습자)</h2>
      <div className="stats_box">
        <span className="total">
          총 : <strong>{stats.total}</strong>본
        </span>
        <span className="completed">
          완료 : <strong>{stats.completed}</strong>본 <button onClick={handleSort}> [보기]</button>
        </span>
        <span className="remaining">
          남은본수 : <strong>{stats.remaining}</strong>본
        </span>
        <span className="progress">
          완료율 :{' '}
          <strong>
            {stats.total > 0 ? ((stats.completed / stats.total) * 100).toFixed(1) : 0}%
          </strong>
        </span>
      </div>
      <div className="stats_graph">
        <div
          className="graph_bar completed"
          style={{
            width: `${stats.total > 0 ? (stats.completed / stats.total) * 100 : 0}%`,
          }}>
          완료 : {stats.completed}본
        </div>
        <div
          className="graph_bar remaining"
          style={{
            width: `${stats.total > 0 ? (stats.remaining / stats.total) * 100 : 0}%`,
          }}>
          남은본수 : {stats.remaining}본
        </div>
      </div>
      <table className="pub_table">
        <thead>
          <tr>
            <th scope="col">번호</th>
            <th scope="col">구분</th>
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
          {sortedData.map((item, index) => (
            <tr key={index + 1}>
              <td>{index + 1}</td>
              <td>{getLayoutType(item.screenId)}</td>
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
  );
}
