import { createContext } from 'react';
import { JWTContextType } from '../../model/auth';

export const AuthContext = createContext({} as JWTContextType);
