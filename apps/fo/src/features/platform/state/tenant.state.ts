import { Tenant } from '@entities/tenant';
import { atom } from 'jotai';

export const activeTenantAtom = atom<Tenant>();
