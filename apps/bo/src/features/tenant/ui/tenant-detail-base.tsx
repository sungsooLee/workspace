import { FC, useEffect, useRef, useState } from 'react';

import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';
import { Tabs, Button } from '@learnway/ui';
import { ContentsButtons } from '@widgets/layout/ui/container/slot/contents-buttons';
import { LinkBox } from '@widgets/layout/ui/container/slot/link-box';
import { TenantDetailMenuTree } from './tenant-detail-menu-tree';

const TenantDetailBaseComponent: FC<any> = () => {
  return 'base info';
};

export const TenantDetailBase = TenantDetailBaseComponent;
