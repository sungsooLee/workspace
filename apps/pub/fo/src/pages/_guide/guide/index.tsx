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
    screenId: string;
    completionDate: string;
    lastUpdateDate: string;
    remarks: string;
    native?: boolean;
    cancel?: boolean;
    result: string;
  }

  // 통계 상태의 타입 정의
  interface Stats {
    total: number;
    completed: number;
    remaining: number;
    native: number;
    cancel: number;
    result: number;
  }

  const [data, setData] = useState<ListItem[]>(guideData); // 데이터를 상태로 저장
  const [isSorted, setIsSorted] = useState<boolean>(false);

  const [stats, setStats] = useState<Stats>({
    total: 0,
    completed: 0,
    remaining: 0,
    native: 0,
    cancel: 0,
    result: 0,
  });

  const getLayoutType = (
    screenId: string,
    native?: boolean,
    cancel?: boolean | undefined,
  ): string => {
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
    const native = data.filter((item) => item.native).length;
    const cancel = data.filter((item) => item.cancel).length;
    const completed = data.filter((item) => item.completionDate).length;
    const remaining = total - completed - native - cancel;
    const result = total - cancel;

    setStats({ total, completed, remaining, native, cancel, result });
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

  const [mobileCount, setMobileCount] = useState(0);
  const [pcCount, setPcCount] = useState(0);
  const [nativeCount, setNativeCount] = useState(0);
  const [cancelCount, setCancelCount] = useState(0);

  useEffect(() => {
    let mobile = 0;
    let pc = 0;
    let native = 0;
    let cancel = 0;
    let result = 0;

    data.forEach((item) => {
      const layout = getLayoutType(item.screenId, item.native, item.cancel);
      if (layout === '모바일' || layout === '반응형(모바일)' || layout === '적응형(모바일)') {
        mobile++;
        if (item.cancel) mobile--;
      } else if (layout === 'PC') {
        pc++;
        if (item.cancel) pc--;
      }
    });

    setMobileCount(mobile);
    setPcCount(pc);
    setNativeCount(native);
    setCancelCount(cancel);
  }, [data]);

  return (
    <div>
      <h2 className="guide_tit2">퍼블 리스트 현황 (학습자)</h2>
      <div className="info">
        모바일 : 브라우저 개발자 도구(디바이스 툴바)에서 모바일로 변경 후 확인가능.
      </div>
      <div className="stats_box">
        <span className="total">
          총 : <strong>{stats.result}</strong>본 (PC:{pcCount} / Mobile:
          {mobileCount - stats.native} / Native:
          {stats.native} / 취소 {stats.cancel})
        </span>
        <span className="completed">
          완료 : <strong>{stats.completed}</strong>본
          <button onClick={handleSort}> [리스트 정렬]</button>
        </span>

        <span className="native">
          Native : <strong>{stats.native}</strong>본
        </span>

        <span className="cancel">
          취소 : <strong>{stats.cancel}</strong>본
        </span>

        <span className="remaining">
          남은본수 : <strong>{stats.remaining - stats.cancel}</strong>본
        </span>
        <span className="progress">
          완료율 :
          <strong>
            {stats.total > 0
              ? (((stats.completed + stats.native) / stats.result) * 100).toFixed(1)
              : 0}
            %
          </strong>
        </span>
      </div>

      <div className="stats_graph">
        <div
          className="graph_bar completed"
          style={{
            width: `${stats.result > 0 ? ((stats.completed + stats.native) / stats.result) * 100 : 0}%`,
          }}
        >
          완료 : {stats.completed}본
        </div>
        <div
          className="graph_bar remaining"
          style={{
            width: `${stats.result > 0 ? ((stats.remaining + stats.cancel) / stats.result) * 100 : 0}%`,
          }}
        >
          남은본수 : {stats.remaining - stats.cancel}본(취소:{stats.cancel}본)
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
            <tr
              key={index + 1}
              className={`${item.native ? 'native' : ''} ${item.cancel ? 'cancel' : ''}`}
            >
              <td>{index + 1}</td>
              <td>{getLayoutType(item.screenId)}</td>
              <td className="text-left">{item.screenName}</td>
              <td className="pages">
                <a href={item.pageId} target="_blank" rel="noreferrer">
                  {item.pageId}
                </a>
                <div className="screen">{item.screenId ? `(${item.screenId})` : ''}</div>
              </td>
              <td>{item.native ? 'Native' : item.pageType}</td>
              <td>{item.completionDate || '-'}</td>
              <td className="last-date">{item.lastUpdateDate || '-'}</td>
              <td className="remarks">
                {item.cancel ? '삭제됨' : item.native ? '퍼블영역 아님' : item.remarks}
              </td>
              <td
                className={`${item.native ? 'native' : ''} ${item.cancel ? 'cancel' : ''} ${item.completionDate ? 'completed' : 'status'}`}
              >
                {item.cancel
                  ? '취소'
                  : item.native
                    ? '-'
                    : item.completionDate
                      ? '완료'
                      : '진행예정'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
