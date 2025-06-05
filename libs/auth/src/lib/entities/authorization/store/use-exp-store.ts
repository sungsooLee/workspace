import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type State = {
  // accessToken?: string;
  // refreshToken?: string;
  // setToken: (token: any) => void;
  exp?: string;
  showAlert: boolean;
  // timeLeft: number;
  setExp: (exp: string) => void;
  // setTimeLeft: (time: number) => void;
  setShowAlert: (alertState: boolean) => void;
  reset: () => void;
};

export const useExpStore = create<State>()(
  persist(
    (set, get) => ({
      // accessToken: undefined,
      // refreshToken: undefined,
      exp: undefined,
      showAlert: false,
      // timeLeft: 1 * 60 * 60, // 1 시간
      // setToken: (token: any) => {
      //   set((prev) => ({
      //     ...prev,
      //     accessToken: token?.accessToken,
      //     refreshToken: token?.refreshToken,
      //   }));
      // },
      setExp: (exp: string) => {
        set((prev) => ({
          ...prev,
          exp,
        }));
      },
      // setTimeLeft: (time: number) => {
      //   set((prev) => ({ ...prev, timeLeft: time }));
      // },
      setShowAlert: (alertState: boolean) => {
        set((prev) => ({ ...prev, showAlert: alertState }));
      },
      reset: () => {
        set({
          // accessToken: undefined,
          // refreshToken: undefined,
          exp: undefined,
          showAlert: false,
          // timeLeft: 1 * 60 * 60,
        });
      },
    }),
    {
      name: 'exp-storage', // 로컬 스토리지에 저장될 키
    },
  ),
);
