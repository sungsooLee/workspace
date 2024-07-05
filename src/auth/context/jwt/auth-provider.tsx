import { ActionMapType, AuthStateType, AuthUserType } from '@/auth/types';
import { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import { isValidToken, setSession } from './utils';
import axios from 'axios';
import { AuthContext } from './auth-context';
import axiosInstance from '@/lib/utils/axios';
import { useNavigate } from 'react-router-dom';

enum Types {
  INITIAL = 'INITIAL',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  LOGOUT = 'LOGOUT',
}

type Payload = {
  [Types.INITIAL]: {
    user: AuthUserType;
  };
  [Types.LOGIN]: {
    user: AuthUserType;
  };
  [Types.REGISTER]: {
    user: AuthUserType;
  };
  [Types.LOGOUT]: undefined;
};

type Props = {
  children: React.ReactNode;
};

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];

const initialState: AuthStateType = {
  user: null,
  loading: true,
};

const reducer = (state: AuthStateType, action: ActionsType) => {
  if (action.type === Types.INITIAL) {
    return {
      loading: false,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGIN || action.type === Types.REGISTER) {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGOUT) {
    return {
      ...state,
      user: null,
    };
  }
  return state;
};

const STORAGE_KEY = 'accessToken';

export function AuthProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();
  const initialize = useCallback(async () => {
    try {
      const accessToken = sessionStorage.getItem(STORAGE_KEY);
      console.log(accessToken);
      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);

        //토큰으로 다시 정보 갖고오기?
        const res = await axiosInstance.get('/users/me');

        const { user } = res.data;

        dispatch({
          type: Types.INITIAL,
          payload: {
            user: {
              ...user,
              accessToken,
            },
          },
        });
      } else {
        dispatch({
          type: Types.INITIAL,
          payload: {
            user: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: Types.INITIAL,
        payload: {
          user: null,
        },
      });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const login = useCallback((token: string, user: AuthUserType) => {
    setSession(token);
    // TODO. 삭제 필요
    // JWT 토큰 구현 이전에 유저 정보 갖고 있기 위한 임시 스토리지.
    sessionStorage.setItem('user', user?.email);
    console.log(user);
    dispatch({
      type: Types.LOGIN,
      payload: {
        user: {
          ...user,
          accessToken: token,
        },
      },
    });

    navigate('/board');
  }, []);

  const register = useCallback(async (email: string, password: string) => {
    const data = {
      email,
      password,
    };

    const res = await axios.post(
      'http://localhost:8072/pms-module/api/v1/users',
      data
    );

    const { accessToken, user } = res.data;

    sessionStorage.setItem(STORAGE_KEY, accessToken);

    dispatch({
      type: Types.REGISTER,
      payload: {
        user: {
          ...user,
          accessToken,
        },
      },
    });
  }, []);

  const logout = useCallback(async () => {
    setSession(null);
    dispatch({
      type: Types.LOGOUT,
    });
  }, []);
  console.log(state);
  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      method: 'jwt',
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      login,
      register,
      logout,
    }),
    [login, logout, register, state.user, status]
  );

  // if (error) {
  //   throw error;
  // }

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
}
