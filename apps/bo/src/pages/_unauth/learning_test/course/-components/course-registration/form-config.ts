import { DynamicFormConfig } from '@learnway/hooks';

export const formConfig: DynamicFormConfig = {
  builders: [
    // 승인 결재 라인
    {
      name: '승인 결재 라인',
      type: 'custom',
      label: '승인 결재 라인',
      value: '',
    },
    // 정원
    {
      name: '정원',
      type: 'custom',
      label: '정원',
      value: '',
    },
    // 수강신청 대기
    {
      name: '수강신청 대기',
      type: 'custom',
      label: '수강신청 대기',
      value: '',
    },
    // 차수 중복수강
    {
      name: '차수 중복수강',
      type: 'custom',
      label: '차수 중복수강',
      value: '',
    },
    // 사전 레벨테스트
    {
      name: '사전 레벨테스트',
      type: 'custom',
      label: '사전 레벨테스트',
      value: '',
    },
    // 교재 배송지 수집
    {
      name: '교재 배송지 수집',
      type: 'custom',
      label: '교재 배송지 수집',
      value: '',
    },
  ],
};
