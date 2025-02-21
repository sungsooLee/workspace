import { atom } from 'jotai';
import { Tenant } from '../../../entities/tenant';

export const activeTenantAtom = atom<Tenant>();
