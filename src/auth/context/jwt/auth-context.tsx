import { JWTContextType } from '@/auth/types';
import { createContext } from 'react';

export const AuthContext = createContext({} as JWTContextType);
