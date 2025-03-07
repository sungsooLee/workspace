import { memo } from 'react';
import { OptionCard } from '@/libs/ui/src';
import { getRandomId } from '@learnway/shared';
import { cn } from '@learnway/shared';
import { ChipList } from '@learnway/ui';

import styles from './filter-popup.module.css';

const filter = [
  { label: '클래스', value: getRandomId() },
  { label: '동영상', value: getRandomId() },
  { label: '이북', value: getRandomId() },
  { label: '웹', value: getRandomId() },
];
const filter2 = [
  { label: '수강신청 교육', value: getRandomId() },
  { label: '수강신청 가능', value: getRandomId() },
  { label: '수강신청 마감', value: getRandomId() },
];
const filter3 = [
  { label: '10분 이내', value: getRandomId() },
  { label: '10분 ~1시간', value: getRandomId() },
  { label: '1 ~ 4시간', value: getRandomId() },
  { label: '12시간 이상', value: getRandomId() },
];
const filter4 = [
  { label: '1일 ~ 2일', value: getRandomId() },
  { label: '3일 ~ 5일', value: getRandomId() },
  { label: '6일 ~ 11일', value: getRandomId() },
  { label: '1개월 이상', value: getRandomId() },
];
const filter5 = [
  { label: '초급', value: getRandomId() },
  { label: '중급', value: getRandomId() },
  { label: '고급', value: getRandomId() },
];
const filter6 = [
  { label: '한국어', value: getRandomId() },
  { label: '영어', value: getRandomId() },
  { label: '일본어', value: getRandomId() },
  { label: '중국어', value: getRandomId() },
  { label: '기타 언어', value: getRandomId() },
];

const options: any[] = [
  { label: '클래스', value: 'A' },
  { label: '동영상', value: 'B' },
  { label: '이북', value: 'C' },
  { label: '웹', value: 'E' },
  { label: '시험', value: 'F' },
];

const CategoryPopupComponent = () => {
  return <div></div>;
};

export const CategoryPopup = memo(CategoryPopupComponent);
