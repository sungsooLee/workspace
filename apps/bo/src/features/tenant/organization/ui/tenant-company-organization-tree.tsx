import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { useRouter } from '@tanstack/react-router';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { t } from 'i18next';

import { SectionLayout } from '@widgets/layout/ui/container/section-layout/section-layout';

import styles from '@learnway/styles/bo/features/role/role-info.module.css';
import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css'; // 화면 내 컨텐츠 레이아웃 css
import boxStyles from '@learnway/styles/bo/assets/styles/modules/wrap-box.module.css'; // 하단 layout style - line

import { Tabs } from '@learnway/ui';
import { cn, DATE_TIME_FORMAT, getDateToString } from '@learnway/shared';
import { useSearchBox, SearchBoxConfig, CODE_GROUP } from '@learnway/hooks';

import {
  Button,
  ChipListModalSelectorFormField,
  ContentsRow,
  Input,
  RadioGroupFormField,
  TextareaFormField,
  TreeBox,
  TreeType,
  TreeNode,
} from '@learnway/ui';

import { ContentsHistoryInfoFormField, FormRow, FormSubTitle, SwitchFormField } from '@shared/ui';
import { SearchBox } from '@shared/ui/search-box';
import { BaseComponentProps } from '@types';

export enum EnOrganizationShowType {
  check = 'check',
  origin = 'origin',
  platform = 'platform',
}
enum EnTabKeys {
  organization = 'organization',
  user = 'user',
}
/**
 * 화면번호: NLP_BO_TMS_1111_03 테넌트-회사조직
 * @returns
 */
const TenantCompanyOrganizationTreeComponent = ({ showType }: { showType: string }) => {
  const [roleTreeData, setRoleTreeData] = useState([]);
  const router = useRouter();

  const handleTreeAction = (events: any) => {
    switch (events.type) {
      case 'NODE_MOVE':
        break;
    }
  };

  const tabItems = [
    {
      title: '조직',
      key: EnTabKeys.organization,
      content: '조직',
    },
    {
      title: '유저',
      key: EnTabKeys.user,
      content: '유저',
    },
  ];
  return (
    <SectionLayout contentsRatio={'thirty'}>
      <TreeBox
        data={roleTreeData}
        treeId="1"
        type="SHUTTLE_LIST"
        showSearchKeyword
        initLevel={2}
        title={t('조직-원본')}
      />

      <div className={cn(styles.start, styles.wrap)}>
        <div className={cn(layoutStyles.inner)}>
          <FormSubTitle
            label={t('조직 대상자')}
            titleNode={'현대자동차>경영지원본부'}
            lineType={'light'}
          ></FormSubTitle>
          <div className={styles.contents_wrap}>
            <Tabs items={tabItems} type="round" size={'sm'} className={styles.tab_wrap} />
          </div>
        </div>
      </div>
    </SectionLayout>
  );
};

export const TenantCompanyOrganizationTree = TenantCompanyOrganizationTreeComponent;
