import { useState } from 'react';
import { t } from 'i18next';

import { createFileRoute, useRouter } from '@tanstack/react-router';

import { IcoCaution03 } from '@learnway/icons';
import { Button, Checkbox, useModal } from '@learnway/ui';
import { cn } from '@learnway/shared';
import { useDeleteUser, useLogoutUser } from '@learnway/auth/entities';

import { MAIN_CONTAINERS } from '@widgets/layout';
import { pageRouteConfig } from '@features/auth';
import { BrowserFooter, MobileResponsiveContainerFooter } from '@shared/m.ui';

import styles from '@learnway/styles/fo/pages/_layout/my-page/privacy/withdraw-menbership.module.css';

import { ScormPlayer } from '../../features/scorm/ui/scorm-player';

export const Route = createFileRoute('/_learning/scorm')({
  component: RouteComponent,
});

function RouteComponent() {
  return <ScormPlayer contentUuid="2f17e8a6-a160-4768-8bd0-0f5f74b2acdc" />;
}
