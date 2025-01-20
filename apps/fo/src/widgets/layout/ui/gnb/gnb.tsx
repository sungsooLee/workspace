import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Logo } from '../../../../features/layout';
import { Navigate } from './navigate/navigate';
import { Language } from '../../../../features/layout/ui/language';

function GNBComponent() {
  return (
    <div className="bg-secondary-1 flex flex-col">
      <div className="flex items-center gap-10">
        <Logo />
        <div className="flex grow"></div>
        <Navigate />
        <Language />
        {/* <Notification/>
         */}
      </div>
    </div>
  );
}

export const GNB = memo(GNBComponent);
