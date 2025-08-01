import { BookDeliveryInfo, LangLevelTest } from '@types';
import { create } from 'zustand';

const bookDeliveryInfo: BookDeliveryInfo = {
  recipientName: '김지훈',
  countryCode: '+82',
  telNo: '01011111111',
  postalCode: '06123',
  address: '서울 강남구 테헤란로 5길 7 위워크',
  addressDetail: '10층 빅데이터기술팀 김지훈',
};

const langLevelTest: LangLevelTest = {
  familyName: 'Kim',
  firstName: 'Ji Hun',
  countryCode: '+82',
  telNo: '01011111111',
  preferGender: 'FEMALE',
  availableTestDate1: '2025-07-21T07:51:26.236Z',
  availableTestDate2: '2025-07-21T07:51:26.236Z',
  preferLearnDate1: '2025-07-21T07:51:26.236Z',
  preferLearnDate2: '2025-07-21T07:51:26.236Z',
};

type CourseRegistration = {
  bookDeliveryInfo: BookDeliveryInfo;
  langLevelTest: LangLevelTest;
};

const initalData: CourseRegistration = {
  bookDeliveryInfo,
  langLevelTest,
};

interface CourseRegistrationStore extends CourseRegistration {
  setBookDeliveryInfo: (newState: BookDeliveryInfo) => void;
  reset: () => void;
}

export const useCourseRegistrationStore = create<CourseRegistrationStore>((set, get) => ({
  bookDeliveryInfo,
  langLevelTest,
  setBookDeliveryInfo: (newState) => set((_state) => ({ bookDeliveryInfo: newState })),
  reset: () => {
    set({ ...initalData });
  },
}));
