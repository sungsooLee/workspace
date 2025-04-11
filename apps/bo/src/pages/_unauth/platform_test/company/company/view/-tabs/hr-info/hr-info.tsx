import { useTranslation } from 'react-i18next';
import { Tabs } from '@learnway/ui';
import React from 'react';
import { Organization } from './-tabs/organization/organization';
import { Position } from './-tabs/position/position';
import { Group } from './-tabs/group/group';
import { Designation } from './-tabs/designation/designation';
import { Role } from './-tabs/role/role';
import { NoticeBox } from '../../../../../../../../shared/ui';

const HrInfoComponent = () => {
  const { t } = useTranslation();
  const tabItems = [
    {
      title: '조직',
      key: '조직',
      content: <Organization />,
    },
    {
      title: '보직',
      key: '보직',
      content: <Position />,
    },
    {
      title: '직군',
      key: '직군',
      content: <Group />,
    },
    {
      title: '호칭',
      key: '호칭',
      content: <Designation />,
    },
    {
      title: '직무',
      key: '직무',
      content: <Role />,
    },
  ];
  return (
    <div className={'flex flex-col'}>
      <NoticeBox
        descriptions={[
          t('자동 유저그룹은 인사 DB를 기준으로 특정 시간에 배치로 자동 매핑됩니다.'),
          t('회사별로 자동 매핑되며, 유저그룹 설정 시 사용할 수 있습니다.'),
        ]}
      />
      <Tabs type={'line'} size={'sm'} items={tabItems} />
    </div>
  );
};

export const HrInfo = HrInfoComponent;
